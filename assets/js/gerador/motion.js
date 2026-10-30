var Motion = (function () {
const clamp = v => v < 0 ? 0 : v > 1 ? 1 : v;
const easeIO = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
const easeOut = p => 1 - Math.pow(1 - p, 3);

function schedule(root, draw, fade, sp, pre) {
  pre = pre || ''; sp = sp || 1;
  const d = ms => ms / sp, q = s => root.querySelector(s), qa = s => [...root.querySelectorAll(s)], I = id => '#' + pre + id;
  draw(q(I('horizonte')), 0, d(1600));
  qa(`${I('ceu')} path, ${I('estrelas')} > *`).forEach((el, i) => fade(el, d(300 + i * 25), d(500)));
  qa(`${I('rio')} path, ${I('chao')} path`).forEach(el => draw(el, d(300), d(1800)));
  const mons = qa(`${I('skyline')} > .monumento`);
  const step = Math.min(260, 2600 / Math.max(1, mons.length));
  mons.forEach((g, i) => {
    const base = d(900 + i * step);
    [...g.children].forEach(el => {
      const cl = el.getAttribute('class') || '';
      if (cl.includes('janelas')) [...el.children].forEach((c, j) => fade(c, base + d(1000 + j * 4), d(300)));
      else if (cl.includes('preenchimento')) fade(el, base + d(900), d(700));
      else draw(el, base, d(1500));
    });
  });
  const end = d(900 + mons.length * step + 1200);
  fade(q(I('camada-fundo')), end - d(1400), d(1400));
  qa(`${I('sol')} circle`).forEach(el => draw(el, end - d(800), d(1600)));
  qa(`${I('sol')} path`).forEach(el => fade(el, end - d(200), d(1200)));
  fade(q(I('reflexo')), end - d(600), d(1500));
  qa(`[id^="${pre}ponto-brilho"]`).forEach((el, i) => fade(el, end + d(i * 120), d(600)));
  qa(`[id^="${pre}rota-mascara-traco"]`).forEach((el, i) => draw(el, end + d(400 + i * 150), d(2000)));
  fade(q(I('ponto-final')), end + d(2300), d(400));
}

function timeline(root, sp, pre, offset) {
  const items = []; offset = offset || 0;
  schedule(root,
    (el, delay, dur) => { if (el) items.push({ el, k: 'd', t0: offset + delay, dur, da: el.getAttribute('stroke-dasharray'), last: -1 }); },
    (el, delay, dur) => { if (el) items.push({ el, k: 'f', t0: offset + delay, dur, o: parseFloat(el.getAttribute('opacity') || '1'), last: -1 }); },
    sp, pre);
  return items;
}
const duration = items => items.reduce((m, it) => Math.max(m, it.t0 + it.dur), 0);

function applyAt(items, t) {
  for (const it of items) {
    let p = clamp((t - it.t0) / it.dur);
    const key = p >= 1 ? 2 : p <= 0 ? 0 : 1;
    if (key !== 1 && it.last === key) continue;
    it.last = key; const el = it.el;
    if (it.k === 'd') {
      if (p >= 1) { el.removeAttribute('pathLength'); el.removeAttribute('stroke-dashoffset'); if (it.da) el.setAttribute('stroke-dasharray', it.da); else el.removeAttribute('stroke-dasharray'); }
      else { el.setAttribute('pathLength', '1'); el.setAttribute('stroke-dasharray', '1 1'); el.setAttribute('stroke-dashoffset', String(1 - easeIO(p))); }
    } else el.setAttribute('opacity', String(it.o * easeOut(p)));
  }
}

function prefixIds(svg, pre) {
  return svg.replace(/ id="([^"]+)"/g, ` id="${pre}$1"`).replace(/url\(#/g, `url(#${pre}`).replace(/href="#/g, `href="#${pre}`);
}
function inner(svg) { return svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, ''); }

// ---------- Vinheta ----------
const VIN = { per: 5200, move: 1500, tail: 1800, sp: 1.6 };
function vinPlan(n, W) {
  const starts = []; for (let i = 0; i < n; i++) starts.push(i === 0 ? 0 : i * VIN.per - VIN.move);
  const total = n * VIN.per + VIN.tail - VIN.move;
  const camX = t => { const i = Math.floor(t / VIN.per); const r = t - i * VIN.per; const hold = VIN.per - VIN.move; if (i >= n - 1) return (n - 1) * W; if (r < hold) return i * W; return (i + easeIO((r - hold) / VIN.move)) * W; };
  return { starts, total, camX };
}
function vinMarkup(svgs, W, H) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    svgs.map((s, i) => `<svg x="${i * W}" y="0" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" overflow="hidden">${inner(prefixIds(s, 'r' + i + '-'))}</svg>`).join('') + '</svg>';
}

// ---------- Vídeo ----------
async function encode({ w, h, dur, fps, alpha, frame, onProgress }) {
  fps = fps || 30;
  const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d', { alpha: true });
  let muxer, mime, ext, codec;
  if (alpha) {
    codec = 'vp09.00.10.08';
    const sup = await VideoEncoder.isConfigSupported({ codec, width: w, height: h, alpha: 'keep', bitrate: 10e6 }).catch(() => ({ supported: false }));
    if (!sup.supported) alpha = false;
  }
  if (alpha) { muxer = new WebMMuxer.Muxer({ target: new WebMMuxer.ArrayBufferTarget(), video: { codec: 'V_VP9', width: w, height: h, frameRate: fps, alpha: true } }); mime = 'video/webm'; ext = 'webm'; }
  else { codec = 'avc1.640028'; muxer = new Mp4Muxer.Muxer({ target: new Mp4Muxer.ArrayBufferTarget(), video: { codec: 'avc', width: w, height: h }, fastStart: 'in-memory' }); mime = 'video/mp4'; ext = 'mp4'; }
  let err = null;
  const enc = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: e => { err = e; } });
  enc.configure(alpha ? { codec, width: w, height: h, bitrate: 10e6, framerate: fps, alpha: 'keep' } : { codec, width: w, height: h, bitrate: 12e6, framerate: fps, avc: { format: 'avc' } });
  const N = Math.ceil(dur / 1000 * fps);
  for (let i = 0; i < N; i++) {
    if (err) throw err;
    const svg = frame(i * 1000 / fps);
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const img = new Image(); img.src = url; await img.decode();
    ctx.clearRect(0, 0, w, h); if (!alpha) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h); }
    ctx.drawImage(img, 0, 0, w, h); URL.revokeObjectURL(url);
    const vf = new VideoFrame(canvas, { timestamp: Math.round(i * 1e6 / fps), duration: Math.round(1e6 / fps), alpha: alpha ? 'keep' : 'discard' });
    enc.encode(vf, { keyFrame: i % (fps * 2) === 0 }); vf.close();
    while (enc.encodeQueueSize > 8) await new Promise(r => setTimeout(r, 5));
    if (onProgress) onProgress(i + 1, N);
  }
  await enc.flush(); if (err) throw err;
  muxer.finalize();
  return { blob: new Blob([muxer.target.buffer], { type: mime }), ext, alpha };
}

function pieceVideo(svg, sp, opts) {
  const doc = new DOMParser().parseFromString(svg, 'image/svg+xml'); const root = doc.documentElement;
  const items = timeline(root, sp, '', 0); const ser = new XMLSerializer();
  const dur = duration(items) + 1200;
  return encode(Object.assign({ dur, frame: t => { applyAt(items, t); return ser.serializeToString(doc); } }, opts));
}

function vinVideo(svgs, W, H, sp, opts) {
  const plan = vinPlan(svgs.length, W); const ser = new XMLSerializer();
  const parts = svgs.map((s, i) => { const doc = new DOMParser().parseFromString(prefixIds(s, 'r' + i + '-'), 'image/svg+xml'); const root = doc.documentElement; return { root, items: timeline(root, sp, 'r' + i + '-', plan.starts[i]) }; });
  const frame = t => {
    const cx = plan.camX(t); let out = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="${cx.toFixed(2)} 0 ${W} ${H}">`;
    parts.forEach((p, i) => { if (i * W < cx + W && (i + 1) * W > cx) { applyAt(p.items, t); p.root.setAttribute('x', i * W); p.root.setAttribute('y', 0); p.root.setAttribute('overflow', 'hidden'); out += ser.serializeToString(p.root); } });
    return out + '</svg>';
  };
  return encode(Object.assign({ dur: plan.total, frame }, opts));
}

const api = { schedule, timeline, applyAt, duration, prefixIds, vinPlan, vinMarkup, pieceVideo, vinVideo, VIN };
window.Motion = api; return api;
})();
