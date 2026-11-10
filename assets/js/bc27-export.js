(function () {
  const XH = 'http://www.w3.org/1999/xhtml';
  const cache = {};
  let fontCss = null;
  const toDataURL = (url) => cache[url] || (cache[url] = fetch(url).then(r => r.blob()).then(b => new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); })));
  async function fonts() {
    if (fontCss !== null) return fontCss;
    let css = '';
    try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
    try {
      for (const l of document.querySelectorAll('link[href*="fonts.googleapis"], link[href*="fonts.css"]')) {
        const t = await (await fetch(l.href)).text();
        const blocks = t.split('/*').filter(b => /^\s*latin(-ext)?\s*\*\//.test(b)).map(b => b.replace(/^[^*]*\*\//, ''));
        for (let b of blocks) { for (const m of [...b.matchAll(/url\(([^)]+)\)/g)]) { const u = new URL(m[1].replace(/["']/g, ''), l.href).href; b = b.split(m[1]).join(await toDataURL(u)); } css += b; }
      }
    } catch (e) { css = ''; }
    return (fontCss = css);
  }
  const URL_RE = /url\("?([^")]+)"?\)/g;
  const deep = (root) => { const out = [root]; const walk = (n) => { for (const c of (n.shadowRoot || n).children) { out.push(c); walk(c); } }; walk(root); return out; };
  async function collect(root, map) {
    const els = deep(root);
    for (const el of els) {
      const cs = getComputedStyle(el);
      for (const v of [cs.backgroundImage, cs.maskImage, cs.webkitMaskImage, cs.borderImageSource]) {
        if (!v || v === 'none') continue;
        for (const m of v.matchAll(URL_RE)) if (!m[1].startsWith('data:') && !map[m[1]]) map[m[1]] = await toDataURL(m[1]);
      }
      if (el.tagName === 'IMG' && el.currentSrc && !map[el.currentSrc]) map[el.currentSrc] = await toDataURL(el.currentSrc);
      const f = cs.filter; if (f && f.includes('#')) for (const m of f.matchAll(/#([\w-]+)/g)) { const d = document.getElementById(m[1]); if (d && !map['#' + m[1]]) map['#' + m[1]] = d.outerHTML; }
    }
  }
  const defsOf = (map) => { const d = Object.keys(map).filter(k => k[0] === '#').map(k => map[k]).join(''); return d ? '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute"><defs>' + d + '</defs></svg>' : ''; };
  function clone(el, map, isRoot) {
    if (el.nodeType === 3) return document.createTextNode(el.textContent);
    if (el.nodeType !== 1 || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return null;
    if (el.namespaceURI !== XH) return el.cloneNode(true);
    const c = document.createElementNS(XH, el.tagName.toLowerCase());
    const cs = getComputedStyle(el);
    let s = '';
    for (let i = 0; i < cs.length; i++) { const p = cs[i]; if (p.startsWith('animation') || p.startsWith('transition')) continue; s += p + ':' + cs.getPropertyValue(p) + ';'; }
    if (s.includes('url(')) s = s.replace(URL_RE, (m, u) => u[0] === '#' ? `url(${u})` : map[u] ? `url("${map[u]}")` : (u.includes('#') && map['#' + u.split('#').pop()]) ? `url(#${u.split('#').pop()})` : m);
    if (isRoot) s += 'transform:none;left:0;top:0;margin:0;position:relative;';
    c.setAttribute('style', s);
    if (el.tagName === 'IMG') c.setAttribute('src', map[el.currentSrc] || el.src);
    for (const ch of (el.shadowRoot || el).childNodes) { const k = clone(ch, map, false); if (k) c.appendChild(k); }
    return c;
  }
  async function draw(root, W, H, map, css, ctx, k = 1) {
    const node = clone(root, map, true);
    const body = `<div xmlns="${XH}" style="width:${W}px;height:${H}px;overflow:hidden;margin:0"><style>${css}</style>${defsOf(map)}${new XMLSerializer().serializeToString(node)}</div>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W * k}" height="${H * k}" viewBox="0 0 ${W} ${H}"><foreignObject x="0" y="0" width="${W}" height="${H}">${body}</foreignObject></svg>`;
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    await img.decode();
    ctx.clearRect(0, 0, W * k, H * k);
    ctx.drawImage(img, 0, 0, W * k, H * k);
  }
  const blobOf = (cv, type, q) => new Promise(r => cv.toBlob(r, type, q));
  async function webpUnder(cv, maxKB) { let q = .92, b; do { b = await blobOf(cv, 'image/webp', q); q -= .1; } while (b && b.size > maxKB * 1024 && q > .3); return b; }
  function save(blob, file) { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = file; document.body.appendChild(a); a.click(); a.remove(); return { blob, file, url }; }
  // items: [{root, W, H, name}] · formats: ['png','jpg','webp'] · k: escala · bg: cor de fundo para JPG
  async function stills({ items, formats = ['png'], k = 1, bg = '#FFFFFF', zipName = 'bc27', onProgress = () => {}, webpKB = 100 }) {
    const css = await fonts(); const files = [];
    for (let i = 0; i < items.length; i++) {
      const { root, W, H, name } = items[i]; const map = {}; if (items[i].die) root.querySelectorAll('[style*="filter"]').forEach(el => { if (getComputedStyle(el).filter.includes('url')) { el.dataset.f = el.style.filter; el.style.filter = 'none'; } });
      onProgress(i, items.length, `Preparando ${i + 1}/${items.length}`);
      await collect(root, map);
      const anims = root.getAnimations({ subtree: true }); anims.forEach(a => { a.pause(); a.currentTime = a.effect?.getComputedTiming?.().endTime > 0 && isFinite(a.effect.getComputedTiming().endTime) ? a.effect.getComputedTiming().endTime - 1 : a.currentTime; });
      const cv = document.createElement('canvas'); cv.width = W * k; cv.height = H * k; const ctx = cv.getContext('2d');
      await draw(root, W, H, map, css, ctx, k);
      anims.forEach(a => a.play());
      if (items[i].die) root.querySelectorAll('[data-f]').forEach(el => { el.style.filter = el.dataset.f; delete el.dataset.f; });
      if (items[i].die) { const r = items[i].die * k, o = document.createElement('canvas'); o.width = cv.width; o.height = cv.height; const x = o.getContext('2d');
        for (const rr of [r, r * .66, r * .33]) for (let t = 0; t < 360; t += 10) x.drawImage(cv, Math.cos(t * Math.PI / 180) * rr, Math.sin(t * Math.PI / 180) * rr);
        x.globalCompositeOperation = 'source-in'; x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, o.width, o.height); x.globalCompositeOperation = 'source-over'; x.drawImage(cv, 0, 0);
        ctx.clearRect(0, 0, cv.width, cv.height); ctx.drawImage(o, 0, 0); }
      for (const f of formats) {
        if (f === 'png') files.push({ file: name + '.png', blob: await blobOf(cv, 'image/png') });
        if (f === 'webp') files.push({ file: name + '.webp', blob: await webpUnder(cv, webpKB) });
        if (f === 'jpg') { const c2 = document.createElement('canvas'); c2.width = cv.width; c2.height = cv.height; const x = c2.getContext('2d'); x.fillStyle = bg; x.fillRect(0, 0, c2.width, c2.height); x.drawImage(cv, 0, 0); files.push({ file: name + '.jpg', blob: await blobOf(c2, 'image/jpeg', .94) }); }
      }
      onProgress(i + 1, items.length, `${i + 1}/${items.length}`);
    }
    if (files.length === 1) return save(files[0].blob, files[0].file);
    if (!window.JSZip) throw new Error('Não carregou o compactador. Recarregue a página.');
    const zip = new JSZip(); files.forEach(f => zip.file(f.file, f.blob));
    onProgress(items.length, items.length, 'Compactando…');
    return save(await zip.generateAsync({ type: 'blob' }), zipName + '.zip');
  }
  const seek = (anims, ms) => anims.forEach(a => { a.pause(); a.currentTime = ms; });
  // QuickTime .mov com codec PNG (32 bits, alpha reto): abre com transparência no Premiere, After Effects, DaVinci e Final Cut.
  function movPNG(frames, W, H, fps) {
    const TS = 600 % fps === 0 ? 600 : fps * 1000, delta = Math.round(TS / fps), n = frames.length, dur = n * delta;
    const u32 = (v) => [(v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255], u16 = (v) => [(v >> 8) & 255, v & 255];
    const u64 = (v) => [...u32(Math.floor(v / 4294967296)), ...u32(v >>> 0)];
    const str = (t) => [...t].map(c => c.charCodeAt(0));
    const box = (type, ...parts) => { const body = parts.flat(); return [...u32(body.length + 8), ...str(type), ...body]; };
    const full = (type, vf, ...parts) => box(type, ...u32(vf), ...parts);
    const matrix = [...u32(0x10000), ...u32(0), ...u32(0), ...u32(0), ...u32(0x10000), ...u32(0), ...u32(0), ...u32(0), ...u32(0x40000000)];
    const pstr = (t, len) => { const a = new Array(len).fill(0); a[0] = t.length; str(t).forEach((c, i) => a[i + 1] = c); return a; };
    const ftyp = box('ftyp', str('qt  '), u32(0x20050300), str('qt  '));
    let size = 16; frames.forEach(f => size += f.size);
    const mdatHead = [...u32(1), ...str('mdat'), ...u64(size)];
    const offs = []; let o = ftyp.length + 16; frames.forEach(f => { offs.push(o); o += f.size; });
    const mvhd = full('mvhd', 0, u32(0), u32(0), u32(TS), u32(dur), u32(0x10000), u16(0x100), new Array(10).fill(0), matrix, new Array(24).fill(0), u32(2));
    const tkhd = full('tkhd', 0xF, u32(0), u32(0), u32(1), u32(0), u32(dur), new Array(8).fill(0), u16(0), u16(0), u16(0), u16(0), matrix, u32(W * 65536), u32(H * 65536));
    const mdhd = full('mdhd', 0, u32(0), u32(0), u32(TS), u32(dur), u16(0), u16(0));
    const hdlr = (ct, st, name) => full('hdlr', 0, str(ct), str(st), u32(0), u32(0), u32(0), pstr(name, name.length + 1));
    const vmhd = full('vmhd', 1, u16(0x40), u16(0x8000), u16(0x8000), u16(0x8000));
    const dinf = box('dinf', full('dref', 0, u32(1), full('alis', 1)));
    const png = box('png ', new Array(6).fill(0), u16(1), u16(0), u16(0), str('appl'), u32(0), u32(512), u16(W), u16(H), u32(0x480000), u32(0x480000), u32(0), u16(1), pstr('PNG', 32), u16(32), u16(0xFFFF));
    const stsd = full('stsd', 0, u32(1), png);
    const stts = full('stts', 0, u32(1), u32(n), u32(delta));
    const stsc = full('stsc', 0, u32(1), u32(1), u32(1), u32(1));
    const stsz = full('stsz', 0, u32(0), u32(n), ...frames.map(f => u32(f.size)));
    const co64 = full('co64', 0, u32(n), ...offs.map(u64));
    const stbl = box('stbl', stsd, stts, stsc, stsz, co64);
    const minf = box('minf', vmhd, hdlr('dhlr', 'alis', 'Apple Alias Data Handler'), dinf, stbl);
    const mdia = box('mdia', mdhd, hdlr('mhlr', 'vide', 'Apple Video Media Handler'), minf);
    const trak = box('trak', tkhd, mdia);
    const moov = box('moov', mvhd, trak);
    return new Blob([new Uint8Array(ftyp), new Uint8Array(mdatHead), ...frames, new Uint8Array(moov)], { type: 'video/quicktime' });
  }
  async function render({ root, W, H, fps = 30, dur = 3, mode = 'mp4', name = 'bc27', onProgress = () => {}, matte, k = 1 }) {
    const OW = Math.round(W * k / 2) * 2, OH = Math.round(H * k / 2) * 2; k = OW / W;
    const n = Math.round(dur * fps);
    const anims = root.getAnimations({ subtree: true });
    const map = {};
    onProgress(0, n, 'Preparando fontes e imagens…');
    const css = await fonts();
    await collect(root, map);
    const cv = document.createElement('canvas'); cv.width = OW; cv.height = OH;
    const ctx = cv.getContext('2d');
    seek(anims, 0); await draw(root, W, H, map, css, ctx, k);
    let out;
    try {
      if (mode === 'mp4') {
        if (!window.VideoEncoder || !window.Mp4Muxer) throw new Error('Este navegador não codifica MP4. Use Chrome/Edge atualizado ou escolha “PNG transparente”.');
        const muxer = new Mp4Muxer.Muxer({ target: new Mp4Muxer.ArrayBufferTarget(), video: { codec: 'avc', width: OW, height: OH, frameRate: fps }, fastStart: 'in-memory' });
        let err = null;
        const enc = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: e => { err = e; } });
        let cfg = null;
        for (const codec of ['avc1.640033', 'avc1.640028', 'avc1.4d0033', 'avc1.42003e']) { const c = { codec, width: OW, height: OH, bitrate: 24e6, framerate: fps, avc: { format: 'avc' } }; if ((await VideoEncoder.isConfigSupported(c)).supported) { cfg = c; break; } }
        if (!cfg) throw new Error('Codificador H.264 indisponível neste navegador. Escolha “PNG transparente”.');
        enc.configure(cfg);
        for (let i = 0; i < n; i++) {
          seek(anims, i * 1000 / fps);
          await draw(root, W, H, map, css, ctx, k);
          if (matte) { ctx.globalCompositeOperation = 'destination-over'; ctx.fillStyle = matte; ctx.fillRect(0, 0, OW, OH); ctx.globalCompositeOperation = 'source-over'; }
          const vf = new VideoFrame(cv, { timestamp: Math.round(i * 1e6 / fps), duration: Math.round(1e6 / fps) });
          enc.encode(vf, { keyFrame: i % fps === 0 }); vf.close();
          if (err) throw err;
          while (enc.encodeQueueSize > 6) await new Promise(r => setTimeout(r, 5));
          onProgress(i + 1, n, `Quadro ${i + 1}/${n}`);
        }
        await enc.flush(); muxer.finalize();
        out = { blob: new Blob([muxer.target.buffer], { type: 'video/mp4' }), file: name + '.mp4' };
      } else if (mode === 'mov') {
        const frames = [];
        for (let i = 0; i < n; i++) {
          seek(anims, i * 1000 / fps);
          await draw(root, W, H, map, css, ctx, k);
          frames.push(await new Promise(r => cv.toBlob(r, 'image/png')));
          onProgress(i + 1, n, `Quadro ${i + 1}/${n}`);
        }
        onProgress(n, n, 'Montando o vídeo…');
        out = { blob: movPNG(frames, OW, OH, fps), file: name + '_alpha.mov' };
      } else {
        if (!window.JSZip) throw new Error('Não carregou o compactador. Recarregue a página.');
        const zip = new JSZip();
        for (let i = 0; i < n; i++) {
          seek(anims, i * 1000 / fps);
          await draw(root, W, H, map, css, ctx, k);
          const b = await new Promise(r => cv.toBlob(r, 'image/png'));
          zip.file(`${name}_${String(i).padStart(4, '0')}.png`, b);
          onProgress(i + 1, n, `Quadro ${i + 1}/${n}`);
        }
        onProgress(n, n, 'Compactando…');
        out = { blob: await zip.generateAsync({ type: 'blob', compression: 'STORE' }), file: name + '_png.zip' };
      }
    } finally { anims.forEach(a => { a.currentTime = 0; a.play(); }); }
    out.url = URL.createObjectURL(out.blob);
    const a = document.createElement('a'); a.href = out.url; a.download = out.file; document.body.appendChild(a); a.click(); a.remove();
    return out;
  }
  async function snap({ root, W, H, k = 1 }) { const css = await fonts(); const map = {}; await collect(root, map); const cv = document.createElement('canvas'); cv.width = Math.round(W * k); cv.height = Math.round(H * k); await draw(root, W, H, map, css, cv.getContext('2d'), k); return cv; }
  window.BC27Export = { render, stills, snap, save, movPNG };
})();
