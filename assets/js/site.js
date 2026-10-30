(function () {
  'use strict';
  // Versão do sistema: altere aqui.
  var SITE = { nome: 'BC Studio', versao: 'V.1 - October 2026' };
  var APP = 'assets/app/';
  var VIN = window.BC_VINHETAS || [];
  var PECAS = window.BC_PECAS || [], THUMBS = window.BC_THUMBS || [];
  var COR = [['verde', '#0B5E37', 'Cor principal. Fundos, faixas e textos sobre papel.'], ['vivo', '#15E888', 'Destaques, botões e detalhes. Pede texto verde por cima.'], ['amarelo', '#FBF99D', 'Títulos sobre verde e azul, selos e etiquetas.'], ['azul', '#0A7BE5', 'Apoio. Gráficos, céu e padrões.'], ['noite', '#0D3A85', 'Fundos escuros alternativos ao verde.'], ['papel', '#F5F4EC', 'Fundo claro. Substitui o branco puro.'], ['branco', '#FFFFFF', 'Logo e textos sobre fundos escuros.'], ['preto', '#121211', 'Texto corrido em impressos e interfaces.']];
  var LOGOS = [['Assinatura verde', 'wm-verde.png', '#F5F4EC', 'bc27-logo-verde.png'], ['Assinatura branca', 'wm-branco.png', '#0B5E37', 'bc27-logo-branco.png'], ['Assinatura amarela', 'wm-amarelo.png', '#0B5E37', 'bc27-logo-amarelo.png'], ['Assinatura verde-viva', 'wm-vivo.png', '#0D3A85', 'bc27-logo-verde-vivo.png'], ['Assinatura azul-noite', 'wm-navy.png', '#F5F4EC', 'bc27-logo-azul-noite.png'], ['Logo na faixa', 'logo-faixa.png', '#F5F4EC', 'bc27-logo-faixa.png'], ['Ícone BC', 'st/icone-verde.png', '#F5F4EC', 'bc27-icone.png'], ['Logo com ícone', 'st/logo-verde.png', '#F5F4EC', 'bc27-logo-com-icone.png']];
  // Programas de impacto social: nome, arquivo em assets/img/programas/
  var PROG = [['AI4Good', 'ai4good'], ['Cultura em Ação', 'cultura-em-acao'], ['Embaixadores', 'embaixadores'], ['Pesquisadores', 'pesquisadores'], ['Servindo o Brasil', 'servindo-o-brasil'], ['HackBrazil', 'hackbrazil']];
  var PATS = [['Cobogó', 'cobogo'], ['Azulejo', 'azulejo'], ['Calçadão', 'calcadao'], ['Fuxico', 'fuxico'], ['Hachura', 'hachura'], ['Alvorada', 'alvorada'], ['Serrilha', 'serrilha']];
  var VAR = [['lab', 'Lab · experimente', 'LAB'], ['vinhetas', 'Vinhetas', '01'], ['stings', 'Stings', '02'], ['gcs', 'GCs', '03'], ['posts', 'Posts e stories', '04'], ['adesivos', 'Adesivos', '05'], ['padroes', 'Padrões', '06'], ['palestrantes', 'Palestrantes', '07'], ['sponsors', 'Sponsors', '08'], ['redes', 'LinkedIn e redes', '09'], ['destaques', 'Destaques do Instagram', '10'], ['slides', 'Slides', '11'], ['impressos', 'Impressos e merch', '12'], ['time', 'Time BC27', '13'], ['logo-animada', 'Logo animada', '14'], ['figurinhas', 'Figurinhas', '15'], ['colecao', 'Coleção', '16']];
  var TOOLS = {
    estudio: { t: 'Estúdio', file: 'bc27-studio.dc.html', d: 'Editor completo para montar qualquer peça: arraste, escreva, anime e baixe.', keys: ['bc27-studio-v3', 'bc27-studio-uploads'], ic: '✦', bg: '#0B5E37', c: '#FBF99D' },
    criar: { t: 'Criar peças', file: 's3-criar.dc.html', d: 'Monte posts e stories rápidos a partir dos modelos.', keys: ['bc27-criar'], ic: '+', bg: '#FBF99D', c: '#0B5E37' },
    exportar: { t: 'Exportar', file: 's3-exportar.dc.html', d: 'Baixe peças prontas em PNG, vídeo ou sequência com transparência.', keys: [], ic: '↓', bg: '#15E888', c: '#0B5E37' },
    colecao: { t: 'Coleção', file: 's3-colecao.dc.html', d: 'Crachás, palestrantes, sponsors, adesivos, merch e vestuário.', keys: [], ic: '▦', bg: '#0D3A85', c: '#FBF99D' },
    paineis: { t: 'Painéis', file: 's3-paineis.dc.html', d: 'Capas, slides e posts de cada painel da conferência.', keys: [], ic: '▤', bg: '#0A7BE5', c: '#FFFFFF' },
    linkedin: { t: 'LinkedIn do time', file: 's3-linkedin-time.dc.html', d: 'Capas e posts de LinkedIn para quem faz parte do time.', keys: [], ic: 'in', bg: '#F5F4EC', c: '#0B5E37' },
    fundos: { t: 'Fundos de reunião', file: 's3-fundos-reuniao.dc.html', d: 'Fundos para Zoom, Meet e Teams.', keys: [], ic: '▭', bg: '#0B5E37', c: '#15E888', img: 'assets/img/panorama.png' },
    figurinhas: { t: 'Figurinhas', file: 's3-figurinhas-whatsapp.dc.html', d: 'Pacote de figurinhas de WhatsApp da BC27.', keys: [], ic: '☺', bg: '#15E888', c: '#0B5E37' },
    ilustracoes: { t: 'Ilustrações', file: 's3-ilustracoes.dc.html', d: 'Ilustrações das regiões em SVG, PNG e vídeo.', keys: [], ic: '⌂', bg: '#F5F4EC', c: '#0B5E37', img: 'assets/img/reg/panorama-claro.svg' },
    variacoes: { t: 'Variações', file: 'bc27-sistema-visual-3.dc.html', d: 'Todas as peças do sistema lado a lado, com o Lab para testar combinações.', keys: [], ic: '◆', bg: '#121211', c: '#15E888' }
  };
  var NAV = [
    { g: null, items: [{ r: 'inicio', t: 'Visão geral' }] },
    { g: 'Ferramentas', items: [{ r: 'estudio', t: 'Estúdio' }, { r: 'criar', t: 'Criar peças' }, { r: 'exportar', t: 'Exportar' }] },
    { g: 'Fundamentos', items: [{ r: 'fundamentos/cores', t: 'Cores' }, { r: 'fundamentos/tipografia', t: 'Tipografia' }, { r: 'fundamentos/logo', t: 'Logo' }, { r: 'fundamentos/padroes', t: 'Padrões' }] },
    { g: 'Peças', items: [{ r: 'pecas', t: 'Todas as peças' }].concat((window.BC_PECAS || []).map(function (p) { return { r: 'pecas/' + p.id, t: p.nome }; })) },
    { g: 'Biblioteca', items: [{ r: 'vinhetas', t: 'Vinhetas' }, { r: 'fundos', t: 'Fundos de reunião', sub: [{ r: 'fundos/ferramenta', t: 'Ferramenta completa' }] }, { r: 'colecao', t: 'Coleção' }, { r: 'paineis', t: 'Painéis' }, { r: 'linkedin', t: 'LinkedIn do time' }, { r: 'figurinhas', t: 'Figurinhas' }, { r: 'ilustracoes', t: 'Ilustrações' }, { r: 'variacoes', t: 'Variações', sub: VAR.map(function (v) { return { r: 'variacoes/' + v[0], t: v[1] }; }) }] }
  ];
  var ORDER = []; NAV.forEach(function (g) { g.items.forEach(function (it) { ORDER.push({ r: it.r, t: it.t, g: g.g }); (it.sub || []).forEach(function (s) { ORDER.push({ r: s.r, t: s.t, g: g.g, parent: it }); }); }); });

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var main = $('#conteudo'), menu = $('#menu'), burger = $('#burger'), overlay = $('#overlay');
  var cleanup = null;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, del: function (k) { try { localStorage.removeItem(k); } catch (e) {} } };

  // ---------- menu ----------
  function buildMenu() {
    var h = '';
    NAV.forEach(function (g, gi) {
      if (g.g) h += '<h2 class="menu-group" id="mg' + gi + '">' + esc(g.g) + '</h2>';
      h += '<ul' + (g.g ? ' aria-labelledby="mg' + gi + '"' : '') + '>';
      g.items.forEach(function (it) {
        if (it.sub) {
          h += '<li><div class="menu-row"><a class="menu-link" href="#/' + it.r + '" data-r="' + it.r + '">' + esc(it.t) + '</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="sub-' + it.r + '" aria-label="Mostrar seções de ' + esc(it.t) + '"><span aria-hidden="true">▸</span></button></div><ul class="menu-sub" id="sub-' + it.r + '" hidden>';
          it.sub.forEach(function (s) { h += '<li><a class="menu-link" href="#/' + s.r + '" data-r="' + s.r + '">' + esc(s.t) + '</a></li>'; });
          h += '</ul></li>';
        } else h += '<li><a class="menu-link" href="#/' + it.r + '" data-r="' + it.r + '">' + esc(it.t) + '</a></li>';
      });
      h += '</ul>';
    });
    $('#menu-lista').innerHTML = h;
    $('#menu-versao span').textContent = SITE.versao;
    menu.addEventListener('click', function (e) {
      var tg = e.target.closest('.menu-toggle');
      if (tg) { var open = tg.getAttribute('aria-expanded') !== 'true'; tg.setAttribute('aria-expanded', String(open)); document.getElementById(tg.getAttribute('aria-controls')).hidden = !open; return; }
      if (e.target.closest('a')) closeDrawer(false);
    });
  }
  function markMenu(route) {
    var best = null;
    menu.querySelectorAll('a[data-r]').forEach(function (a) { a.removeAttribute('aria-current'); var r = a.getAttribute('data-r'); if (route === r || route.indexOf(r + '/') === 0) { if (!best || r.length > best.getAttribute('data-r').length) best = a; } });
    if (best) {
      best.setAttribute('aria-current', 'page');
      var sub = best.closest('.menu-sub');
      if (sub) { sub.hidden = false; var t = menu.querySelector('[aria-controls="' + sub.id + '"]'); if (t) t.setAttribute('aria-expanded', 'true'); }
      var sc = $('.menu-scroll'); var top = best.offsetTop, h = best.offsetHeight; if (top < sc.scrollTop || top + h > sc.scrollTop + sc.clientHeight) sc.scrollTop = top - sc.clientHeight / 3;
    }
  }
  var drawerOpen = false;
  function openDrawer() {
    drawerOpen = true; menu.classList.add('open'); overlay.hidden = false; burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', 'Fechar menu');
    var sbw = window.innerWidth - document.documentElement.clientWidth; document.documentElement.style.overflow = 'hidden'; if (sbw > 0) document.body.style.paddingRight = sbw + 'px';
    var first = menu.querySelector('a'); if (first) first.focus();
  }
  function closeDrawer(returnFocus) {
    if (!drawerOpen) return; drawerOpen = false; menu.classList.remove('open'); overlay.hidden = true; burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Abrir menu');
    document.documentElement.style.overflow = ''; document.body.style.paddingRight = '';
    if (returnFocus !== false) burger.focus();
  }

  // ---------- helpers ----------
  function crumbs(list) {
    var h = '<nav class="crumbs" aria-label="Trilha de navegação"><ol><li><a href="#/inicio">BC Studio</a></li>';
    list.forEach(function (c, i) { h += i === list.length - 1 ? '<li><span aria-current="page">' + esc(c[0]) + '</span></li>' : '<li>' + (c[1] ? '<a href="#/' + c[1] + '">' + esc(c[0]) + '</a>' : '<span>' + esc(c[0]) + '</span>') + '</li>'; });
    return h + '</ol></nav>';
  }
  function pager(route) {
    var i = -1; ORDER.forEach(function (o, k) { if (route === o.r || (i < 0 && route.indexOf(o.r + '/') === 0)) i = k; });
    if (i < 0) return '';
    var p = ORDER[i - 1], n = ORDER[i + 1], h = '<nav class="pager" aria-label="Páginas vizinhas">';
    if (p) h += '<a class="prev" href="#/' + p.r + '"><small>← Anterior</small><strong>' + esc(p.t) + '</strong></a>';
    if (n) h += '<a class="next" href="#/' + n.r + '"><small>Próximo →</small><strong>' + esc(n.t) + '</strong></a>';
    return h + '</nav>';
  }
  function fmtT(ms) { var s = Math.max(0, Math.floor(ms / 1000)); return '0:' + String(s).padStart(2, '0'); }
  function inField(e) { var t = e.target; return t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable); }

  // ---------- páginas ----------
  var PATX = [['Cobogó', 'f2/cobogo.svg'], ['Azulejo', 'f2/azulejo.svg'], ['Calçadão', 'f2/calcadao.svg'], ['Fuxico', 'f2/fuxico.svg'], ['Hachura', 'f2/hachura.svg'], ['Alvorada', 'f2/alvorada.svg'], ['Serrilha', 'f2/serrilha.svg'], ['Estrelas', 'f/estrela4.svg'], ['Asteriscos', 'f/asterisco.svg']];
  var PFMT = [['Quadrado', 1080, 1080], ['Post 4:5', 1080, 1350], ['Story', 1080, 1920], ['Slide', 1920, 1080]];
  var HEX = {}; COR.forEach(function (c) { HEX[c[0]] = c[1]; });
  var KEYS = COR.map(function (c) { return c[0]; });
  var keyOf = function (hex) { var k = KEYS.find(function (x) { return HEX[x].toLowerCase() === String(hex).toLowerCase(); }); return k || 'verde'; };
  var slugify = function (s) { return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };
  function dots(attr, cur, list) { return '<div class="dots" role="group">' + list.map(function (k) { return '<button type="button" class="dot" ' + attr + '="' + k + '" aria-pressed="' + (k === cur) + '" aria-label="' + k + '" title="' + k + '" style="background:' + (k === 'transparente' ? 'repeating-conic-gradient(#999 0 25%,#ddd 0 50%) 0 0/10px 10px' : HEX[k]) + '"></button>'; }).join('') + '</div>'; }
  function chipsH(attr, cur, list) { return '<div class="chips">' + list.map(function (o) { return '<button type="button" class="chip" ' + attr + '="' + esc(o[0]) + '" aria-pressed="' + (String(o[0]) === String(cur)) + '">' + esc(o[1]) + '</button>'; }).join('') + '</div>'; }
  function press(el, attr, val) { el.querySelectorAll('[' + attr + ']').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute(attr) === String(val))); }); }
  function loadImg(src) { return new Promise(function (res, rej) { var i = new Image(); i.onload = function () { res(i); }; i.onerror = function () { rej(new Error('Imagem não carregou')); }; i.src = src; }); }
  function saveCanvas(cv, name, st) { cv.toBlob(function (b) { if (!b) { st.textContent = 'Não deu para gerar a imagem.'; st.className = 'status erro'; return; } var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000); st.textContent = 'Arquivo baixado: ' + name; st.className = 'status ok'; }, 'image/png'); }
  function secHead(num, title, desc, route, label) { return '<div class="sec-head"><span class="num" aria-hidden="true">' + num + '</span><h2>' + esc(title) + '</h2>' + (desc ? '<p>' + esc(desc) + '</p>' : '') + (route ? '<a class="btn" href="#/' + route + '">' + esc(label || 'Abrir') + ' →</a>' : '') + '</div>'; }

  // ---- widgets (usados na visão geral e nas páginas de cada área) ----
  function wCores(full) {
    var h = '<div class="mini-sw">' + COR.map(function (c) { return '<button type="button" data-copy="' + c[1] + '" aria-label="Copiar ' + c[0] + ' ' + c[1] + '"><span class="c" style="background:' + c[1] + (c[0] === 'branco' || c[0] === 'papel' ? ';border-bottom:1px solid var(--linha)' : '') + (full ? ';height:110px' : '') + '"></span><span class="t">' + esc(c[0]) + '<small>' + c[1] + '</small></span>' + (full ? '<span style="padding:0 10px 10px;font-size:13px;color:var(--suave)">' + esc(c[2]) + '</span>' : '') + '</button>'; }).join('') + '</div><p class="status" role="status" data-st></p>';
    return { html: h, mount: function (el) { var st = el.querySelector('[data-st]'); el.addEventListener('click', function (e) { var b = e.target.closest('[data-copy]'); if (!b) return; var v = b.getAttribute('data-copy'); var ok = function () { st.textContent = v + ' copiado'; st.className = 'status ok'; }; if (navigator.clipboard) navigator.clipboard.writeText(v).then(ok, function () { st.textContent = 'Código: ' + v; st.className = 'status'; }); else { st.textContent = 'Código: ' + v; } }); } };
  }
  function wTipo() {
    var s = { txt: 'O Brasil em primeira pessoa', wt: 800, wd: 85, fs: 72, up: false, cor: 'amarelo', fundo: 'verde' };
    var h = '<div class="lab"><div class="lab-prev" data-bg style="display:flex;align-items:center;padding:clamp(18px,4vw,40px)"><p data-out style="margin:0;line-height:.95;letter-spacing:-.01em;text-wrap:balance;overflow-wrap:anywhere"></p></div><div class="lab-ctrl">' +
      '<label>Texto<input type="text" data-k="txt" maxlength="80" value="' + esc(s.txt) + '"></label><span class="sr" data-cnt></span>' +
      '<label>Peso <span data-v="wt"></span><input type="range" min="200" max="800" step="100" data-k="wt" value="' + s.wt + '"></label>' +
      '<label>Largura <span data-v="wd"></span><input type="range" min="75" max="100" step="1" data-k="wd" value="' + s.wd + '"></label>' +
      '<label>Tamanho <span data-v="fs"></span><input type="range" min="24" max="140" step="2" data-k="fs" value="' + s.fs + '"></label>' +
      '<div class="lbl">Cor do texto' + dots('data-cor', s.cor, KEYS) + '</div><div class="lbl">Fundo' + dots('data-fundo', s.fundo, KEYS) + '</div>' +
      '<div class="row"><button type="button" class="chip" data-up aria-pressed="false">CAIXA ALTA</button><a class="btn" href="#/estudio">Usar no Estúdio →</a></div></div></div>';
    return { html: h, mount: function (el) {
      var out = el.querySelector('[data-out]'), bg = el.querySelector('[data-bg]');
      var draw = function () { out.textContent = s.txt || ' '; out.style.cssText += ';font-weight:' + s.wt + ';font-stretch:' + s.wd + '%;font-size:' + s.fs + 'px;color:' + HEX[s.cor] + ';text-transform:' + (s.up ? 'uppercase' : 'none'); bg.style.background = HEX[s.fundo]; ['wt', 'wd', 'fs'].forEach(function (k) { el.querySelector('[data-v="' + k + '"]').textContent = '· ' + s[k] + (k === 'wd' ? '%' : k === 'fs' ? ' px' : ''); }); };
      el.addEventListener('input', function (e) { var k = e.target.getAttribute('data-k'); if (!k) return; s[k] = k === 'txt' ? e.target.value : +e.target.value; draw(); });
      el.addEventListener('click', function (e) { var b; if ((b = e.target.closest('[data-cor]'))) { s.cor = b.getAttribute('data-cor'); press(el, 'data-cor', s.cor); } else if ((b = e.target.closest('[data-fundo]'))) { s.fundo = b.getAttribute('data-fundo'); press(el, 'data-fundo', s.fundo); } else if ((b = e.target.closest('[data-up]'))) { s.up = !s.up; b.setAttribute('aria-pressed', String(s.up)); } else return; draw(); });
      draw(); } };
  }
  function wLogo() {
    var s = { i: 2, fundo: 'verde' };
    var h = '<div class="lab"><div class="lab-prev" data-bg style="display:flex;align-items:center;justify-content:center;padding:40px"><img data-img alt="" style="max-width:70%;max-height:180px;object-fit:contain"></div><div class="lab-ctrl">' +
      '<div class="lbl">Versão' + chipsH('data-v', s.i, LOGOS.map(function (l, i) { return [i, l[0].replace('Assinatura ', '')]; })) + '</div>' +
      '<div class="lbl">Fundo' + dots('data-fundo', s.fundo, ['transparente'].concat(KEYS)) + '</div>' +
      '<div class="row"><a class="btn primary" data-dl1 download>Baixar PNG transparente</a><button type="button" class="btn" data-dl2>Baixar com este fundo</button></div><p class="status" role="status" data-st></p></div></div>';
    return { html: h, mount: function (el) {
      var img = el.querySelector('[data-img]'), bg = el.querySelector('[data-bg]'), a1 = el.querySelector('[data-dl1]'), b2 = el.querySelector('[data-dl2]'), st = el.querySelector('[data-st]');
      var draw = function () { var L = LOGOS[s.i]; img.src = 'assets/img/' + L[1]; img.alt = L[0]; bg.style.background = s.fundo === 'transparente' ? 'repeating-conic-gradient(#bbb 0 25%,#eee 0 50%) 0 0/20px 20px' : HEX[s.fundo]; a1.href = 'assets/img/' + L[1]; a1.setAttribute('download', L[3]); b2.disabled = s.fundo === 'transparente'; };
      el.addEventListener('click', function (e) { var b;
        if ((b = e.target.closest('[data-v]'))) { s.i = +b.getAttribute('data-v'); press(el, 'data-v', s.i); s.fundo = keyOf(LOGOS[s.i][2]); press(el, 'data-fundo', s.fundo); draw(); }
        else if ((b = e.target.closest('[data-fundo]'))) { s.fundo = b.getAttribute('data-fundo'); press(el, 'data-fundo', s.fundo); draw(); }
        else if (e.target.closest('[data-dl2]')) { var L = LOGOS[s.i]; st.textContent = 'Gerando…'; st.className = 'status'; loadImg('assets/img/' + L[1]).then(function (im) { var pad = Math.round(im.naturalWidth * .18), cv = document.createElement('canvas'); cv.width = im.naturalWidth + pad * 2; cv.height = im.naturalHeight + pad * 2; var x = cv.getContext('2d'); x.fillStyle = HEX[s.fundo]; x.fillRect(0, 0, cv.width, cv.height); x.drawImage(im, pad, pad); saveCanvas(cv, L[3].replace('.png', '') + '-fundo-' + s.fundo + '.png', st); }).catch(function (er) { st.textContent = 'Erro: ' + er.message; st.className = 'status erro'; }); }
      });
      draw(); } };
  }
  function wPadrao(full) {
    var s = { p: 0, cor: 'vivo', fundo: 'verde', esc: 160, f: 0, x: 1 };
    var h = '<div class="lab"><div class="lab-prev" data-box style="display:flex;align-items:center;justify-content:center;padding:16px;background:var(--fundo2)"><div data-pv style="position:relative;width:100%;max-height:440px;overflow:hidden;border-radius:6px"><div data-mask style="position:absolute;inset:0"></div></div></div><div class="lab-ctrl">' +
      '<div class="lbl">Padrão' + chipsH('data-p', s.p, PATX.map(function (p, i) { return [i, p[0]]; })) + '</div>' +
      '<div class="lbl">Cor do desenho' + dots('data-cor', s.cor, KEYS) + '</div><div class="lbl">Fundo' + dots('data-fundo', s.fundo, ['transparente'].concat(KEYS)) + '</div>' +
      '<label>Escala <span data-v></span><input type="range" min="40" max="480" step="10" data-esc value="' + s.esc + '"></label>' +
      '<div class="lbl">Formato' + chipsH('data-f', s.f, PFMT.map(function (f, i) { return [i, f[0] + ' · ' + f[1] + '×' + f[2]]; })) + '</div>' +
      (full ? '<div class="lbl">Tamanho' + chipsH('data-x', s.x, [[1, '1×'], [2, '2×']]) + '</div>' : '') +
      '<div class="row"><button type="button" class="btn primary" data-dl>Baixar PNG</button><a class="btn" data-svg download>SVG original</a>' + (full ? '' : '<a class="btn" href="#/fundamentos/padroes">Mais opções →</a>') + '</div><p class="status" role="status" data-st></p></div></div>';
    return { html: h, mount: function (el) {
      var pv = el.querySelector('[data-pv]'), mk = el.querySelector('[data-mask]'), st = el.querySelector('[data-st]'), sv = el.querySelector('[data-svg]');
      var draw = function () { var F = PFMT[s.f], u = 'assets/img/' + PATX[s.p][1]; pv.style.aspectRatio = F[1] + '/' + F[2]; pv.style.width = 'min(100%, ' + Math.round(420 * F[1] / F[2]) + 'px)'; pv.style.height = 'auto';
        var k = (pv.offsetWidth || 400) / F[1], t = Math.max(6, s.esc * k); pv.style.background = s.fundo === 'transparente' ? 'repeating-conic-gradient(#bbb 0 25%,#eee 0 50%) 0 0/16px 16px' : HEX[s.fundo];
        mk.style.background = HEX[s.cor]; mk.style.webkitMask = mk.style.mask = 'url(' + u + ') 0 0/' + t + 'px ' + t + 'px repeat'; el.querySelector('[data-v]').textContent = '· ' + s.esc + ' px'; sv.href = u; sv.setAttribute('download', 'bc27-padrao-' + slugify(PATX[s.p][0]) + '.svg'); };
      el.addEventListener('input', function (e) { if (e.target.hasAttribute('data-esc')) { s.esc = +e.target.value; draw(); } });
      el.addEventListener('click', function (e) { var b;
        if ((b = e.target.closest('[data-p]'))) { s.p = +b.getAttribute('data-p'); press(el, 'data-p', s.p); }
        else if ((b = e.target.closest('[data-cor]'))) { s.cor = b.getAttribute('data-cor'); press(el, 'data-cor', s.cor); }
        else if ((b = e.target.closest('[data-fundo]'))) { s.fundo = b.getAttribute('data-fundo'); press(el, 'data-fundo', s.fundo); }
        else if ((b = e.target.closest('[data-f]'))) { s.f = +b.getAttribute('data-f'); press(el, 'data-f', s.f); }
        else if ((b = e.target.closest('[data-x]'))) { s.x = +b.getAttribute('data-x'); press(el, 'data-x', s.x); }
        else if (e.target.closest('[data-dl]')) { var F = PFMT[s.f], u = 'assets/img/' + PATX[s.p][1]; st.textContent = 'Gerando…'; st.className = 'status';
          fetch(u).then(function (r) { if (!r.ok) throw new Error('padrão não encontrado'); return r.text(); }).then(function (svg) { return loadImg('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)); }).then(function (im) {
            var X = s.x, T = Math.round(s.esc * X), tc = document.createElement('canvas'); tc.width = tc.height = T; var tx = tc.getContext('2d'); tx.drawImage(im, 0, 0, T, T); tx.globalCompositeOperation = 'source-in'; tx.fillStyle = HEX[s.cor]; tx.fillRect(0, 0, T, T);
            var cv = document.createElement('canvas'); cv.width = F[1] * X; cv.height = F[2] * X; var x = cv.getContext('2d'); if (s.fundo !== 'transparente') { x.fillStyle = HEX[s.fundo]; x.fillRect(0, 0, cv.width, cv.height); } x.fillStyle = x.createPattern(tc, 'repeat'); x.fillRect(0, 0, cv.width, cv.height);
            saveCanvas(cv, 'bc27-padrao-' + slugify(PATX[s.p][0]) + '-' + s.cor + '-' + s.fundo + '-' + cv.width + 'x' + cv.height + '.png', st); }).catch(function (er) { st.textContent = 'Erro: ' + er.message; st.className = 'status erro'; }); return; }
        else return; draw(); });
      var ro = new ResizeObserver(draw); ro.observe(pv); draw(); return function () { ro.disconnect(); }; } };
  }
  function mountAll(root, ws) { var outs = []; ws.forEach(function (w) { var el = root.querySelector('[data-w="' + w[0] + '"]'); if (el) { var c = w[1].mount(el); if (c) outs.push(c); } }); return function () { outs.forEach(function (f) { f(); }); }; }

  function pInicio() {
    var W = { cores: wCores(false), tipo: wTipo(), logo: wLogo(), pad: wPadrao(false), fundo: wFundo(false) };
    var start = [['exportar', 'Exportar peças', 'PNG, vídeo ou sequência transparente'], ['estudio', 'Criar um post', 'Estúdio › Novo › Post 4:5'], ['fundamentos/logo', 'Baixar os logos', 'BC27 e programas de impacto social'], ['pecas', 'Editar um modelo', 'Escolha a peça e abra no Estúdio'], ['vinhetas', 'Usar uma vinheta', 'Veja, escolha e baixe em MP4'], ['linkedin', 'Fazer meu LinkedIn', 'Capa e post do time'], ['fundos', 'Fundo de reunião', 'Para Zoom, Meet e Teams'], ['figurinhas', 'Figurinhas', 'Pacote para o WhatsApp']];
    var secs = [['comece', 'Comece'], ['ferramentas', 'Ferramentas'], ['cores', 'Cores'], ['tipografia', 'Tipografia'], ['logo', 'Logo'], ['padroes', 'Padrões'], ['pecas', 'Peças'], ['adesivos', 'Adesivos e merch'], ['fundos', 'Fundos'], ['vinhetas', 'Vinhetas'], ['biblioteca', 'Biblioteca'], ['variacoes', 'Variações']];
    var card = function (k) { var T = TOOLS[k]; return '<a class="card" href="#/' + k + '"><div class="card-thumb" style="background:' + T.bg + ';color:' + T.c + '">' + (T.img ? '<img src="' + T.img + '" alt="">' : '<span aria-hidden="true">' + T.ic + '</span>') + '</div><div class="card-body"><h3>' + esc(T.t) + '</h3><p>' + esc(T.d) + '</p></div></a>'; };
    var h = '<div class="page"><div class="hero-bc"><div><p class="kicker">Brazil Conference 2027</p><h1 tabindex="-1">BC Studio</h1><p class="lead" style="margin-bottom:0">Brazil Conference Studio. O design system inteiro numa página: veja, teste e baixe. Cada bloco leva para a área completa.</p></div><div class="row"><a class="btn primary" href="#/estudio">Abrir o Estúdio</a><a class="btn" href="#/vinhetas">Ver vinhetas</a></div></div>';
    h += '<nav class="jump" aria-label="Nesta página">' + secs.map(function (x) { return '<button type="button" data-go="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</nav>';
    h += '<section class="sec" id="s-comece" style="border-top:0;margin-top:0;padding-top:0" aria-labelledby="h-comece"><div class="sec-head"><span class="num" aria-hidden="true">00</span><h2 id="h-comece">Comece por aqui</h2><p>Os usos mais comuns, direto ao ponto.</p></div><div class="start">' + start.map(function (s, i) { return '<a href="#/' + s[0] + '"><span class="n" aria-hidden="true">' + (i + 1) + '</span><span>' + esc(s[1]) + '<small>' + esc(s[2]) + '</small></span></a>'; }).join('') + '</div></section>';
    h += '<section class="sec" id="s-ferramentas">' + secHead('01', 'Ferramentas', 'Para criar e exportar peças do zero ou a partir dos modelos.') + '<div class="grid">' + ['estudio', 'criar', 'exportar'].map(card).join('') + '</div></section>';
    h += '<section class="sec" id="s-cores">' + secHead('02', 'Cores', 'Clique numa cor para copiar o código.', 'fundamentos/cores', 'Cores') + '<div data-w="cores">' + W.cores.html + '</div></section>';
    h += '<section class="sec" id="s-tipografia">' + secHead('03', 'Tipografia', 'Bricolage Grotesque, a única voz. Escreva e teste.', 'fundamentos/tipografia', 'Tipografia') + '<div data-w="tipo">' + W.tipo.html + '</div></section>';
    h += '<section class="sec" id="s-logo">' + secHead('04', 'Logo', 'Escolha a versão e o fundo, e baixe.', 'fundamentos/logo', 'Todas as versões') + '<div data-w="logo">' + W.logo.html + '</div></section>';
    h += '<section class="sec" id="s-padroes">' + secHead('05', 'Padrões', 'Troque o desenho, as cores e a escala. Baixe em PNG.', 'fundamentos/padroes', 'Padrões') + '<div data-w="pad">' + W.pad.html + '</div></section>';
    h += '<section class="sec" id="s-pecas">' + secHead('06', 'Peças', PECAS.length + ' tipos de peça. Clique para mudar as opções e baixar.', 'pecas', 'Todas as peças') + '<div class="thumbs big">' + PECAS.map(function (p) { return '<a href="#/pecas/' + p.id + '"><img src="' + p.capa + '" alt="" loading="lazy"><span>' + esc(p.nome) + '</span></a>'; }).join('') + '</div></section>';
    h += '<section class="sec" id="s-adesivos">' + secHead('07', 'Adesivos e merch', 'Formas de adesivo e peças impressas: crachá, ecobag, caderno, camiseta e backdrop.', 'pecas/merch', 'Merch') + '<div class="thumbs big">' + THUMBS.filter(function (t) { return t.c === 'adesivo' || t.c === 'merch'; }).map(function (t) { return '<a href="#/pecas/' + t.c + '?' + new URLSearchParams(t.p).toString() + '"><img src="' + t.src + '" alt="" loading="lazy"><span>' + esc(t.c === 'adesivo' ? 'Adesivo · ' + (t.p.forma || 'estrela') : 'Merch · ' + (t.p.tipo || 'crachá')) + '</span></a>'; }).join('') + '</div><div class="row" style="margin-top:14px"><a class="btn" href="#/pecas/adesivo">Criar adesivo →</a><a class="btn" href="#/pecas/merch">Criar merch →</a><a class="btn" href="#/colecao">Coleção completa →</a></div></section>';
    h += '<section class="sec" id="s-fundos">' + secHead('08', 'Fundos de reunião', 'Monte o seu fundo de reunião: cor, padrão, ilustração, logo e seu nome.', 'fundos', 'Abrir o criador') + '<div data-w="fundo">' + W.fundo.html + '</div></section>';
    h += '<section class="sec" id="s-vinhetas">' + secHead('09', 'Vinhetas', VIN.length + ' animações de 8 s. Clique para tocar e baixar em MP4.', 'vinhetas', 'Todas as vinhetas') + '<div class="strip">' + VIN.map(function (v) { return '<a href="#/vinhetas/' + v.slug + '"><img src="' + v.capa + '" alt="" loading="lazy">' + esc(v.nome) + '<span class="tags"><span class="tag uso">' + esc(v.uso) + '</span><span class="tag">' + v.formato + '</span></span></a>'; }).join('') + '</div></section>';
    h += '<section class="sec" id="s-biblioteca">' + secHead('10', 'Biblioteca', 'Peças prontas por tipo de uso.') + '<div class="grid">' + ['colecao', 'paineis', 'linkedin', 'figurinhas', 'ilustracoes'].map(card).join('') + '</div></section>';
    h += '<section class="sec" id="s-variacoes">' + secHead('11', 'Variações', 'Todas as peças do sistema, lado a lado. Escolha uma seção.', 'variacoes', 'Abrir Variações') + '<div class="chips">' + VAR.map(function (v) { return '<a class="btn" href="#/variacoes/' + v[0] + '">' + (v[2] !== 'LAB' ? '<span style="color:var(--acento)">' + v[2] + '</span> ' : '') + esc(v[1]) + '</a>'; }).join('') + '</div></section>';
    return { title: 'Visão geral', html: h + pager('inicio') + '</div>', mount: function (el) {
      var off = mountAll(el, [['cores', W.cores], ['tipo', W.tipo], ['logo', W.logo], ['pad', W.pad], ['fundo', W.fundo]]);
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches, jump = el.querySelector('.jump');
      jump.addEventListener('click', function (e) { var b = e.target.closest('[data-go]'); if (!b) return; var t = document.getElementById('s-' + b.getAttribute('data-go')); if (!t) return; var top = t.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 1024 ? 130 : 70); window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' }); var hd = t.querySelector('h2'); if (hd) { hd.setAttribute('tabindex', '-1'); hd.focus({ preventScroll: true }); } });
      var io = new IntersectionObserver(function (ents) { ents.forEach(function (en) { if (en.isIntersecting) { var id = en.target.id.slice(2); jump.querySelectorAll('[data-go]').forEach(function (b) { b.setAttribute('aria-current', String(b.getAttribute('data-go') === id)); }); } }); }, { rootMargin: '-40% 0px -55% 0px' });
      el.querySelectorAll('.sec').forEach(function (s) { io.observe(s); });
      return function () { off(); io.disconnect(); };
    } };
  }
  function pCores() { var w = wCores(true); return { title: 'Cores', html: '<div class="page">' + crumbs([['Fundamentos'], ['Cores']]) + '<h1 tabindex="-1">Cores</h1><p class="lead">A paleta da BC27. Clique numa cor para copiar o código.</p><div data-w="c">' + w.html + '</div>' + pager('fundamentos/cores') + '</div>', mount: function (el) { return mountAll(el, [['c', w]]); } }; }
  function pTipo() {
    var w = wTipo();
    var h = '<div class="page">' + crumbs([['Fundamentos'], ['Tipografia']]) + '<h1 tabindex="-1">Tipografia</h1><p class="lead">Uma família só: Bricolage Grotesque. Títulos em Extra Bold e mais estreitos; textos em Regular ou Semi Bold.</p><section><h2>Teste</h2><div data-w="t">' + w.html + '</div></section>';
    h += '<section><h2>Pesos</h2><div class="pesos"><div><b style="font-weight:800;font-stretch:80%">Aa Extra Bold</b><span>Títulos · 800 · largura 80–85%</span></div><div><b style="font-weight:600">Aa Semi Bold</b><span>Subtítulos e destaques · 600</span></div><div><b style="font-weight:400">Aa Regular</b><span>Texto corrido · 400</span></div><div><b style="font-weight:800;letter-spacing:.16em;font-size:18px;line-height:2.2">BRAZIL CONFERENCE 2027</b><span>Kicker · 800 · caixa alta · espaçado</span></div></div></section>';
    h += '<section><h2>Baixar a fonte</h2><p class="lead" style="margin-bottom:14px">Licença aberta (SIL Open Font License). Instale no computador para usar em outros programas.</p><div class="chips"><a class="btn primary" href="assets/fonts/bricolage-extrabold.ttf" download="bricolage-grotesque-extrabold.ttf">Extra Bold (TTF)</a><a class="btn" href="assets/fonts/bricolage-semibold.ttf" download="bricolage-grotesque-semibold.ttf">Semi Bold (TTF)</a><a class="btn" href="assets/fonts/bricolage-regular.ttf" download="bricolage-grotesque-regular.ttf">Regular (TTF)</a></div></section>';
    return { title: 'Tipografia', html: h + pager('fundamentos/tipografia') + '</div>', mount: function (el) { return mountAll(el, [['t', w]]); } };
  }
  function pLogo() {
    var w = wLogo();
    var h = '<div class="page">' + crumbs([['Fundamentos'], ['Logo']]) + '<h1 tabindex="-1">Logo</h1><p class="lead">Escolha a versão e o fundo. O PNG transparente serve para qualquer peça; o com fundo já sai pronto.</p><section><h2>Testar e baixar</h2><div data-w="l">' + w.html + '</div></section><section><h2>Todas as versões</h2><div class="assets">';
    LOGOS.forEach(function (l) { h += '<div class="asset"><div class="asset-prev" style="background:' + l[2] + '"><img src="assets/img/' + l[1] + '" alt="' + esc(l[0]) + '" loading="lazy"></div><div class="asset-info"><strong>' + esc(l[0]) + '</strong><a class="btn" href="assets/img/' + l[1] + '" download="' + l[3] + '" aria-label="Baixar ' + esc(l[0]) + ' em PNG">Baixar PNG</a></div></div>'; });
    h += '</div></section><section id="programas"><h2>Programas de impacto social</h2><p class="lead" style="margin-top:-6px">Ícones dos programas em PNG com fundo transparente. Funcionam melhor sobre verde, azul ou papel.</p><div class="assets">';
    PROG.forEach(function (g) { h += '<div class="asset"><div class="asset-prev" style="background:#0B5E37"><img src="assets/img/programas/' + g[1] + '.png" alt="' + esc(g[0]) + '" loading="lazy" style="max-height:78%;max-width:78%;object-fit:contain"></div><div class="asset-info"><strong>' + esc(g[0]) + '</strong><a class="btn" href="assets/img/programas/' + g[1] + '.png" download="bc27-programa-' + g[1] + '.png" aria-label="Baixar logo ' + esc(g[0]) + ' em PNG">Baixar PNG</a></div></div>'; });
    return { title: 'Logo', html: h + '</div></section><p style="margin-top:24px"><a class="btn" href="#/estudio">Usar o logo no Estúdio →</a></p>' + pager('fundamentos/logo') + '</div>', mount: function (el) { return mountAll(el, [['l', w]]); } };
  }
  function pPadroes() {
    var w = wPadrao(true);
    var h = '<div class="page">' + crumbs([['Fundamentos'], ['Padrões']]) + '<h1 tabindex="-1">Padrões</h1><p class="lead">Grafismos brasileiros do sistema. Troque o desenho, as cores, a escala e o formato, e baixe pronto para usar.</p><div data-w="p">' + w.html + '</div>';
    h += '<section><h2>Todos os padrões</h2><div class="assets">' + PATX.map(function (p, i) { var u = 'assets/img/' + p[1]; return '<div class="asset"><button type="button" class="pat" data-pick="' + i + '" aria-label="Usar ' + esc(p[0]) + ' no teste acima" style="border:0;padding:0;cursor:pointer;background:#0B5E37;position:relative"><span style="position:absolute;inset:0;background:#15E888;-webkit-mask:url(' + u + ') 0 0/90px 90px repeat;mask:url(' + u + ') 0 0/90px 90px repeat"></span></button><div class="asset-info"><strong>' + esc(p[0]) + '</strong><a class="btn" href="' + u + '" download="bc27-padrao-' + slugify(p[0]) + '.svg">SVG</a></div></div>'; }).join('') + '</div></section>';
    h += '<p style="margin-top:24px"><a class="btn" href="#/estudio">Usar padrões no Estúdio →</a></p>';
    return { title: 'Padrões', html: h + pager('fundamentos/padroes') + '</div>', mount: function (el) { var off = mountAll(el, [['p', w]]); el.addEventListener('click', function (e) { var b = e.target.closest('[data-pick]'); if (!b) return; var t = el.querySelector('[data-w="p"] [data-p="' + b.getAttribute('data-pick') + '"]'); if (t) { t.click(); window.scrollTo({ top: el.querySelector('[data-w="p"]').getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); } }); return off; } };
  }
  // ================= PEÇAS =================
  
  var SCH = {};
  var SKIPK = /^(largura|guia|pausar|tempo|slotId|\$preview)$|foto|img|src|imagem/i;
  function schema(c) { if (SCH[c]) return Promise.resolve(SCH[c]); return fetch(APP + 's3-' + c + '.dc.html').then(function (r) { if (!r.ok) throw new Error('não carregou'); return r.text(); }).then(function (t) { var m = t.match(/data-props="([^"]*)"/); var ta = document.createElement('textarea'); ta.innerHTML = m ? m[1] : '{}'; SCH[c] = JSON.parse(ta.value); return SCH[c]; }); }
  // Peças que o Estúdio abre como modelo editável
  var STUDIO_OK = ['post', 'palestrante', 'sponsor', 'redes', 'destaque', 'time', 'slide', 'gc', 'adesivo', 'merch', 'padrao'];
  var LONGK = /^(bio|texto|citacao|mensagem|painel|titulo|subtitulo)$/;
  function pecaCard(P) { return '<a class="card" href="#/pecas/' + P.id + '"><div class="card-thumb" style="background:var(--fundo2);height:170px"><img src="' + P.capa + '" alt="" loading="lazy" style="object-fit:contain"></div><div class="card-body"><h3>' + esc(P.nome) + '</h3><p>' + esc(P.desc) + '</p></div></a>'; }
  function pPecas() {
    var gr = {}; PECAS.forEach(function (p) { (gr[p.grupo] = gr[p.grupo] || []).push(p); });
    var h = '<div class="page">' + crumbs([['Peças']]) + '<h1 tabindex="-1">Peças</h1><p class="lead">Todas as peças do sistema. Abra uma para mudar as opções e baixar em PNG.</p>';
    Object.keys(gr).forEach(function (g) { h += '<section><h2>' + esc(g) + '</h2><div class="grid">' + gr[g].map(pecaCard).join('') + '</div></section>'; });
    h += '<section><h2>Exemplos</h2><div class="thumbs">' + THUMBS.map(function (t) { return '<a href="#/pecas/' + t.c + '?' + new URLSearchParams(t.p).toString() + '" title="' + esc(t.id) + '"><img src="' + t.src + '" alt="' + esc(t.id.replace(/-/g, ' ')) + '" loading="lazy"></a>'; }).join('') + '</div></section>';
    return { title: 'Peças', html: h + pager('pecas') + '</div>' };
  }
  function pPeca(id, query) {
    var P = PECAS.find(function (x) { return x.id === id; }); if (!P) return null;
    var init = {}; new URLSearchParams(query || '').forEach(function (v, k) { init[k] = v === 'true' ? true : v === 'false' ? false : (/^-?\d+(\.\d+)?$/.test(v) ? +v : v); });
    var ex = THUMBS.filter(function (t) { return t.c === P.c; });
    var i = PECAS.indexOf(P);
    var h = '<div class="page wide">' + crumbs([['Peças', 'pecas'], [P.nome]]) + '<div class="tool-head"><div><h1 tabindex="-1">' + esc(P.nome) + '</h1><p>' + esc(P.desc) + '</p></div><div class="tool-actions">' + (STUDIO_OK.indexOf(P.c) >= 0 ? '<a class="btn primary" id="ed" href="#/estudio?modelo=' + P.c + '&amp;p=' + encodeURIComponent(JSON.stringify(init)) + '" title="Abre esta peça no Estúdio com todos os textos editáveis">✎ Editar no Estúdio</a>' : '') + '<a class="btn" href="#/pecas/' + PECAS[(i - 1 + PECAS.length) % PECAS.length].id + '">← ' + esc(PECAS[(i - 1 + PECAS.length) % PECAS.length].nome) + '</a><a class="btn" href="#/pecas/' + PECAS[(i + 1) % PECAS.length].id + '">' + esc(PECAS[(i + 1) % PECAS.length].nome) + ' →</a></div></div>';
    h += '<div class="lab peca"><div><div class="lab-prev" style="background:var(--fundo2);display:flex;align-items:center;justify-content:center;padding:16px;min-height:420px"><div class="pbox" id="pp" style="--ar:1;width:min(100%,calc(64vh * var(--ar)));background:transparent"><iframe id="pf" title="Prévia: ' + esc(P.nome) + '" src="' + APP + 'peca-player.dc.html?c=' + P.c + '&amp;p=' + encodeURIComponent(JSON.stringify(init)) + '"></iframe></div></div>';
    if (ex.length > 1) h += '<div class="thumbs small" style="margin-top:12px">' + ex.map(function (t, k) { return '<button type="button" data-ex="' + k + '" aria-label="Exemplo ' + (k + 1) + '"><img src="' + t.src + '" alt="" loading="lazy"></button>'; }).join('') + '</div>';
    h += '</div><div class="lab-ctrl" id="ctrl"><p class="status">Carregando opções…</p></div></div>';
    h += '<section><h2>Outras peças</h2><div class="thumbs">' + PECAS.filter(function (x) { return x.id !== id; }).map(function (x) { return '<a href="#/pecas/' + x.id + '" title="' + esc(x.nome) + '"><img src="' + x.capa + '" alt="' + esc(x.nome) + '" loading="lazy"><span>' + esc(x.nome) + '</span></a>'; }).join('') + '</div></section>';
    return { title: P.nome + ' · Peças', html: h + pager('pecas/' + id) + '</div>', mount: function (el) {
      var fr = $('#pf', el), box = $('#pp', el), ctrl = $('#ctrl', el), st, props = Object.assign({}, init), sc = null, ready = false;
      var edLink = function () { var a = $('#ed', el); if (a) a.href = '#/estudio?modelo=' + P.c + '&p=' + encodeURIComponent(JSON.stringify(props)); };
      var send = function () { edLink(); try { fr.contentWindow.postMessage({ type: 'bcp', cmd: 'props', props: props }, '*'); } catch (e) {} var qs = new URLSearchParams(); Object.keys(props).forEach(function (k) { if (sc && sc[k] && props[k] === sc[k].default) return; qs.set(k, props[k]); }); history.replaceState(null, '', '#/pecas/' + id + (qs.toString() ? '?' + qs.toString() : '')); };
      var onMsg = function (e) { if (e.source !== fr.contentWindow || !e.data) return; var d = e.data;
        if (d.type === 'bcp-ready') { box.style.setProperty('--ar', d.ar); if (!ready) { ready = true; send(); } }
        if (d.type === 'bcp-export' && st) { if (d.status === 'inicio') { st.textContent = 'Gerando imagem…'; st.className = 'status'; } if (d.status === 'ok') { st.textContent = 'Arquivo baixado (' + d.w + ' × ' + d.h + ')'; st.className = 'status ok'; } if (d.status === 'erro') { st.textContent = 'Não deu para gerar: ' + d.msg; st.className = 'status erro'; } } };
      window.addEventListener('message', onMsg);
      var build = function () {
        var secs = {}; Object.keys(sc).forEach(function (k) { var d = sc[k]; if (!d || !d.editor || SKIPK.test(k)) return; (secs[d.section || 'Opções'] = secs[d.section || 'Opções'] || []).push(k); });
        var cur = function (k) { return props[k] !== undefined ? props[k] : sc[k].default; };
        var lab = function (k) { return k.replace(/([A-Z])/g, ' $1').replace(/^./, function (c) { return c.toUpperCase(); }); };
        var hh = '';
        Object.keys(secs).forEach(function (sn) { hh += '<details open><summary>' + esc(sn) + '</summary><div class="ctrl-grid">';
          secs[sn].forEach(function (k) { var d = sc[k], v = cur(k);
            if (d.editor === 'enum') hh += '<div class="lbl">' + esc(lab(k)) + chipsH('data-k="' + k + '" data-val', v, d.options.map(function (o) { return [o, o]; })) + '</div>';
            else if (d.editor === 'text') { var mx = LONGK.test(k) ? 320 : 60; hh += '<label>' + esc(lab(k)) + ' <span class="cnt" data-cnt="' + k + '" data-max="' + mx + '">' + String(v || '').length + '/' + mx + '</span>' + (mx > 60 ? '<textarea rows="3" maxlength="' + mx + '" data-t="' + k + '">' + esc(v || '') + '</textarea>' : '<input type="text" maxlength="60" data-t="' + k + '" value="' + esc(v || '') + '">') + '</label>'; }
            else if (d.editor === 'boolean') hh += '<div class="lbl">' + esc(lab(k)) + chipsH('data-k="' + k + '" data-val', String(!!v), [['true', 'Sim'], ['false', 'Não']]) + '</div>';
            else if (/range|int|float/.test(d.editor)) hh += '<label>' + esc(lab(k)) + ' <span data-rv="' + k + '">' + v + (d.unit || '') + '</span><input type="range" data-r="' + k + '" min="' + (d.min ?? 0) + '" max="' + (d.max ?? 100) + '" step="' + (d.step ?? 1) + '" value="' + v + '"></label>'; });
          hh += '</div></details>'; });
        hh += '<div class="row sticky-actions"><button type="button" class="btn primary" data-dl="1">Baixar PNG</button><button type="button" class="btn" data-dl="2">PNG 2×</button><button type="button" class="btn" id="cp">Copiar link</button><button type="button" class="btn" id="rs">Restaurar padrão</button></div><p class="status" role="status" id="pst"></p><div class="row">' + (STUDIO_OK.indexOf(P.c) >= 0 ? '' : '<a class="btn" href="#/estudio">Editar livre no Estúdio →</a>') + '<a class="btn" href="#/variacoes">Ver em Variações →</a></div>';
        ctrl.innerHTML = hh; st = $('#pst', ctrl); edLink();
      };
      schema(P.c).then(function (s) { sc = s; build(); if (ready) send(); }).catch(function (e) { ctrl.innerHTML = '<p class="status erro">Não deu para carregar as opções: ' + esc(e.message) + '</p>'; });
      ctrl.addEventListener('click', function (e) { var b;
        if ((b = e.target.closest('[data-val]'))) { var k = b.getAttribute('data-k'), v = b.getAttribute('data-val'); props[k] = sc[k].editor === 'boolean' ? v === 'true' : v; ctrl.querySelectorAll('[data-k="' + k + '"]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); send(); }
        else if ((b = e.target.closest('[data-dl]'))) { st.textContent = 'Gerando imagem…'; st.className = 'status'; var nm = 'bc27-' + P.id + Object.keys(props).filter(function (k) { return typeof props[k] === 'string' && sc[k] && sc[k].editor === 'enum'; }).slice(0, 3).map(function (k) { return '-' + slugify(props[k]); }).join('') + (b.getAttribute('data-dl') === '2' ? '-2x' : ''); try { fr.contentWindow.postMessage({ type: 'bcp', cmd: 'export', scale: +b.getAttribute('data-dl'), name: nm }, '*'); } catch (er) { st.textContent = 'Erro ao exportar'; st.className = 'status erro'; } }
        else if (e.target.id === 'rs') { props = {}; build(); send(); st = $('#pst', ctrl); st.textContent = 'Padrão restaurado.'; st.className = 'status ok'; }
        else if (e.target.id === 'cp') { var u = location.href; if (navigator.clipboard) navigator.clipboard.writeText(u).then(function () { st.textContent = 'Link copiado. Quem abrir vê a peça com essas opções.'; st.className = 'status ok'; }, function () { st.textContent = u; st.className = 'status'; }); }
      });
      ctrl.addEventListener('input', function (e) { var k;
        if ((k = e.target.getAttribute('data-t'))) { props[k] = e.target.value; var c = ctrl.querySelector('[data-cnt="' + k + '"]'); var mx = +c.getAttribute('data-max') || 60; c.textContent = e.target.value.length + '/' + mx; c.classList.toggle('lim', e.target.value.length >= mx * .85); send(); }
        else if ((k = e.target.getAttribute('data-r'))) { props[k] = +e.target.value; ctrl.querySelector('[data-rv="' + k + '"]').textContent = e.target.value + (sc[k].unit || ''); send(); } });
      el.addEventListener('click', function (e) { var b = e.target.closest('[data-ex]'); if (!b) return; props = Object.assign({}, ex[+b.getAttribute('data-ex')].p); build(); send(); });
      return function () { window.removeEventListener('message', onMsg); fr.src = 'about:blank'; };
    } };
  }

  // ================= FUNDOS DE REUNIÃO =================
  var FPAT = PATX.concat([['Raios', 'f/raios8.svg'], ['Estrela 5', 'f/estrela5.svg'], ['Estrela 8', 'f/estrela8.svg'], ['Explosão', 'f/burst.svg'], ['Ondas', 'f/onda-linha.svg'], ['Floreio', 'f/floreio.svg'], ['Palhinha', 'st/palhinha.png']]);
  var FILL = [['Cristo', 's/cristo.png'], ['Cristo 2', 's/cristo2.png'], ['Congresso', 's/congresso.png'], ['Capitólio', 's/capitolio.png'], ['Copan', 's/copan.png'], ['MASP', 's/masp.png'], ['Teatro', 's/teatro.png'], ['Lapa', 's/lapa.png'], ['Igreja', 's/igreja.png'], ['Farol', 's/farol.png'], ['Veleiro', 's/veleiro.png'], ['Zakim', 's/zakim.png'], ['Ponte', 's/ponte.png'], ['Pão de Açúcar', 's/pao.png'], ['Mapa', 's/mapa.png'], ['Mão', 's/mao.png'], ['Panorama', 'reg/panorama.svg'], ['Panorama claro', 'reg/panorama-claro.svg'], ['Panorama noite', 'reg/panorama-noite.svg'], ['Panorama amanhecer', 'reg/panorama-amanhecer.svg'], ['Panorama mínimo', 'reg/panorama-minimal.svg'], ['Boston', 'reg/boston.svg'], ['Boston ↔ Brasil', 'reg/boston-brasil.svg'], ['Boston ↔ Brasil amanhecer', 'reg/boston-brasil-amanhecer.svg'], ['Nordeste', 'reg/nordeste.svg'], ['Norte', 'reg/norte.svg'], ['Sudeste', 'reg/sudeste.svg'], ['Sul', 'reg/sul.svg'], ['Centro-Oeste', 'reg/centro-oeste.svg'], ['Natureza', 'reg/natureza.svg'], ['Skyline', 'st/boston-sky.png']];
  var FGRAD = [['nenhum', 'Nenhum'], ['luz', 'Luz suave'], ['profundidade', 'Profundidade'], ['aurora', 'Aurora'], ['dourado', 'Brilho dourado'], ['noite', 'Noite']];
  var FAREA = [['inteiro', 'Inteiro'], ['direita', 'Lado direito'], ['esquerda', 'Lado esquerdo'], ['base', 'Faixa de baixo'], ['faixas', 'Faixas em cima e embaixo']];
  var FILPOS = [['direita', 'Direita'], ['esquerda', 'Esquerda'], ['centro', 'Centro'], ['base', 'Base inteira']];
  var FLOGOS = [[-1, 'Sem logo'], [0, 'Verde'], [1, 'Branca'], [2, 'Amarela'], [3, 'Verde-viva'], [4, 'Azul-noite']];
  var FLPOS = [['sup-esq', 'Topo esq.'], ['sup-dir', 'Topo dir.'], ['inf-esq', 'Base esq.'], ['inf-dir', 'Base dir.']];
  var FDEF = { base: 'verde', grad: 'luz', pat: 0, patCor: 'vivo', patOp: 35, patEsc: 160, area: 'direita', il: -1, ilCor: 'original', ilPos: 'direita', ilTam: 60, logo: 2, logoPos: 'sup-esq', nome: '', cargo: '', txtCor: 'branco' };
  var FPRE = [
    {}, { base: 'noite', grad: 'aurora', pat: 1, patCor: 'azul', patOp: 45, area: 'inteiro', il: 0, ilCor: 'amarelo', ilPos: 'direita', ilTam: 78, logo: 2 },
    { base: 'papel', grad: 'nenhum', pat: 2, patCor: 'verde', patOp: 18, area: 'base', il: 17, ilCor: 'original', ilPos: 'base', ilTam: 40, logo: 0, logoPos: 'sup-esq', txtCor: 'verde' },
    { base: 'azul', grad: 'profundidade', pat: 3, patCor: 'amarelo', patOp: 30, area: 'esquerda', il: 4, ilCor: 'branco', ilPos: 'direita', ilTam: 82, logo: 1, logoPos: 'inf-esq' },
    { base: 'verde', grad: 'dourado', pat: 5, patCor: 'amarelo', patOp: 22, area: 'faixas', il: 1, ilCor: 'vivo', ilPos: 'centro', ilTam: 70, logo: 2, logoPos: 'sup-dir' },
    { base: 'preto', grad: 'aurora', pat: 7, patCor: 'vivo', patOp: 30, area: 'inteiro', il: -1, logo: 3, logoPos: 'inf-dir' },
    { base: 'noite', grad: 'noite', pat: -1, il: 18, ilCor: 'original', ilPos: 'base', ilTam: 50, logo: 2, logoPos: 'sup-esq' },
    { base: 'amarelo', grad: 'nenhum', pat: 4, patCor: 'verde', patOp: 20, area: 'direita', il: 5, ilCor: 'verde', ilPos: 'direita', ilTam: 66, logo: 0, txtCor: 'verde' },
    { base: 'verde', grad: 'profundidade', pat: 9, patCor: 'vivo', patOp: 25, area: 'inteiro', il: 22, ilCor: 'original', ilPos: 'base', ilTam: 44, logo: 1 },
    { base: 'branco', grad: 'nenhum', pat: 6, patCor: 'azul', patOp: 20, area: 'faixas', il: 2, ilCor: 'noite', ilPos: 'direita', ilTam: 70, logo: 4, txtCor: 'noite' },
    { base: 'azul', grad: 'luz', pat: 13, patCor: 'noite', patOp: 35, area: 'inteiro', il: 11, ilCor: 'branco', ilPos: 'direita', ilTam: 74, logo: 1, logoPos: 'inf-esq' },
    { base: 'noite', grad: 'dourado', pat: 15, patCor: 'amarelo', patOp: 18, area: 'esquerda', il: 9, ilCor: 'amarelo', ilPos: 'direita', ilTam: 80, logo: 2 }
  ];
  var ICACHE = {};
  function img(u) { if (!ICACHE[u]) ICACHE[u] = loadImg(u).catch(function () { delete ICACHE[u]; return null; }); return ICACHE[u]; }
  function tint(im, w, h, cor) { var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); var x = c.getContext('2d'); x.drawImage(im, 0, 0, c.width, c.height); if (cor) { x.globalCompositeOperation = 'source-in'; x.fillStyle = cor; x.fillRect(0, 0, c.width, c.height); } return c; }
  function patImg(u) { if (/\.svg$/.test(u)) return fetch(u).then(function (r) { return r.text(); }).then(function (t) { return loadImg('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(t)); }).catch(function () { return null; }); return img(u); }
  var PCACHE = {};
  async function drawFundo(cv, s, W, H) {
    var k = cv.width / W, x = cv.getContext('2d'); x.setTransform(k, 0, 0, k, 0, 0); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
    x.fillStyle = HEX[s.base]; x.fillRect(0, 0, W, H);
    if (s.pat >= 0 && FPAT[s.pat]) { var u = 'assets/img/' + FPAT[s.pat][1]; var im = await (PCACHE[u] || (PCACHE[u] = patImg(u))); if (im) { var T = Math.max(8, s.patEsc), tc = tint(im, T * k, T * k, HEX[s.patCor]); var pt = x.createPattern(tc, 'repeat'); pt.setTransform(new DOMMatrix().scale(1 / k)); x.save(); x.globalAlpha = s.patOp / 100; x.fillStyle = pt; x.beginPath();
        var A = { inteiro: [[0, 0, W, H]], direita: [[W * .58, 0, W * .42, H]], esquerda: [[0, 0, W * .42, H]], base: [[0, H * .74, W, H * .26]], faixas: [[0, 0, W, H * .14], [0, H * .86, W, H * .14]] }[s.area] || [[0, 0, W, H]];
        A.forEach(function (r) { x.rect(r[0], r[1], r[2], r[3]); }); x.fill(); x.restore(); } }
    var G = s.grad; if (G !== 'nenhum') { x.save(); var g;
      if (G === 'luz') { g = x.createRadialGradient(W * .15, 0, 0, W * .15, 0, W * .8); g.addColorStop(0, 'rgba(255,255,255,.28)'); g.addColorStop(1, 'rgba(255,255,255,0)'); }
      if (G === 'profundidade') { g = x.createLinearGradient(0, H * .35, 0, H); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.45)'); }
      if (G === 'aurora') { g = x.createRadialGradient(W * .18, H * .82, 0, W * .18, H * .82, W * .55); g.addColorStop(0, 'rgba(21,232,136,.45)'); g.addColorStop(1, 'rgba(21,232,136,0)'); x.fillStyle = g; x.fillRect(0, 0, W, H); g = x.createRadialGradient(W * .82, H * .18, 0, W * .82, H * .18, W * .55); g.addColorStop(0, 'rgba(10,123,229,.45)'); g.addColorStop(1, 'rgba(10,123,229,0)'); }
      if (G === 'dourado') { g = x.createRadialGradient(W * .85, H * .08, 0, W * .85, H * .08, W * .6); g.addColorStop(0, 'rgba(251,249,157,.45)'); g.addColorStop(1, 'rgba(251,249,157,0)'); }
      if (G === 'noite') { g = x.createLinearGradient(0, H * .2, 0, H); g.addColorStop(0, 'rgba(13,58,133,0)'); g.addColorStop(1, 'rgba(13,58,133,.75)'); }
      x.fillStyle = g; x.fillRect(0, 0, W, H); x.restore(); }
    if (s.il >= 0 && FILL[s.il]) { var ii = await img('assets/img/' + FILL[s.il][1]); if (ii) { var ar = ii.naturalWidth / ii.naturalHeight || 1, ih, iw, ix, iy; if (s.ilPos === 'base') { iw = W; ih = iw / ar; if (ih > H * s.ilTam / 100) { ih = H * s.ilTam / 100; iw = ih * ar; } ix = (W - iw) / 2; iy = H - ih; } else { ih = H * s.ilTam / 100; iw = ih * ar; if (iw > W * .55) { iw = W * .55; ih = iw / ar; } iy = H - ih; ix = s.ilPos === 'direita' ? W - iw - W * .04 : s.ilPos === 'esquerda' ? W * .04 : (W - iw) / 2; }
        x.drawImage(s.ilCor === 'original' ? ii : tint(ii, iw * k, ih * k, HEX[s.ilCor]), ix, iy, iw, ih); } }
    var lh = 0; if (s.logo >= 0) { var li = await img('assets/img/' + LOGOS[s.logo][1]); if (li) { var lw = W * .15, lhh = lw * li.naturalHeight / li.naturalWidth, m = W * .035; var lx = /esq/.test(s.logoPos) ? m : W - lw - m, ly = /sup/.test(s.logoPos) ? m : H - lhh - m; x.drawImage(li, lx, ly, lw, lhh); if (s.logoPos === 'inf-esq') lh = lhh + m * .6; } }
    var warn = '';
    if (s.nome || s.cargo) { var tx = W * .035, by = H - W * .035 - lh, maxW = W * .5; x.fillStyle = HEX[s.txtCor]; x.textBaseline = 'alphabetic';
      if (s.cargo) { x.font = '600 34px "Bricolage Grotesque", sans-serif'; if (x.measureText(s.cargo).width > maxW) warn = 'O cargo passou do espaço; encurte para caber bem.'; x.fillText(s.cargo, tx, by, maxW); by -= 50; }
      if (s.nome) { x.font = '800 68px "Bricolage Grotesque", sans-serif'; if (x.measureText(s.nome).width > maxW) warn = 'O nome passou do espaço; encurte para caber bem.'; x.fillText(s.nome, tx, by, maxW); } }
    return warn;
  }
  function wFundo(full) {
    var s = Object.assign({}, FDEF);
    var opt = function (attr, list, cur) { return chipsH(attr, cur, list); };
    var h = '<div class="lab"><div><div class="lab-prev" style="background:var(--fundo2);padding:12px;min-height:0"><canvas data-cv width="960" height="540" style="width:100%;height:auto;display:block;border-radius:8px" role="img" aria-label="Prévia do fundo de reunião"></canvas></div>' +
      '<p class="kicker" style="margin:16px 0 8px">Modelos prontos · clique para usar</p><div class="presets" data-pres>' + FPRE.map(function (p, i) { return '<button type="button" data-pre="' + i + '" aria-label="Modelo ' + (i + 1) + '"><canvas width="320" height="180"></canvas></button>'; }).join('') + '</div></div>' +
      '<div class="lab-ctrl"><details open><summary>Fundo</summary><div class="ctrl-grid"><div class="lbl">Cor' + dots('data-f-base', s.base, KEYS) + '</div><div class="lbl">Luz e gradiente' + opt('data-f-grad', FGRAD, s.grad) + '</div></div></details>' +
      '<details open><summary>Padrão</summary><div class="ctrl-grid"><div class="lbl">Desenho' + opt('data-f-pat', [[-1, 'Nenhum']].concat(FPAT.map(function (p, i) { return [i, p[0]]; })), s.pat) + '</div><div class="lbl">Cor' + dots('data-f-patCor', s.patCor, KEYS) + '</div><div class="lbl">Onde' + opt('data-f-area', FAREA, s.area) + '</div><label>Força <span data-rv="patOp"></span><input type="range" min="5" max="100" step="1" data-fr="patOp" value="' + s.patOp + '"></label><label>Escala <span data-rv="patEsc"></span><input type="range" min="40" max="480" step="10" data-fr="patEsc" value="' + s.patEsc + '"></label></div></details>' +
      '<details open><summary>Ilustração</summary><div class="ctrl-grid"><div class="lbl">Desenho' + opt('data-f-il', [[-1, 'Nenhuma']].concat(FILL.map(function (p, i) { return [i, p[0]]; })), s.il) + '</div><div class="lbl">Cor' + opt('data-f-ilCor', [['original', 'Original']].concat(KEYS.map(function (k) { return [k, k]; })), s.ilCor) + '</div><div class="lbl">Posição' + opt('data-f-ilPos', FILPOS, s.ilPos) + '</div><label>Tamanho <span data-rv="ilTam"></span><input type="range" min="20" max="100" step="1" data-fr="ilTam" value="' + s.ilTam + '"></label></div></details>' +
      '<details open><summary>Logo e nome</summary><div class="ctrl-grid"><div class="lbl">Logo' + opt('data-f-logo', FLOGOS, s.logo) + '</div><div class="lbl">Posição do logo' + opt('data-f-logoPos', FLPOS, s.logoPos) + '</div><label>Seu nome <span class="cnt" data-cnt="nome">0/32</span><input type="text" maxlength="32" data-ft="nome" placeholder="Ex.: Ana Souza"></label><label>Cargo ou área <span class="cnt" data-cnt="cargo">0/48</span><input type="text" maxlength="48" data-ft="cargo" placeholder="Ex.: Comunicação · BC27"></label><div class="lbl">Cor do texto' + dots('data-f-txtCor', s.txtCor, KEYS) + '</div></div></details>' +
      '<div class="row sticky-actions"><button type="button" class="btn primary" data-fdl="1">Baixar PNG 1920×1080</button><button type="button" class="btn" data-fdl="2">PNG 2× (4K)</button><button type="button" class="btn" data-frs>Restaurar padrão</button></div><p class="status" role="status" data-fst></p>' +
      (full ? '<div class="row"><a class="btn" href="#/fundos/ferramenta">Ferramenta completa (com vídeo) →</a><a class="btn" href="#/estudio">Montar livre no Estúdio →</a></div>' : '<div class="row"><a class="btn" href="#/fundos">Mais opções →</a></div>') + '</div></div>';
    return { html: h, mount: function (el) {
      var cv = el.querySelector('[data-cv]'), st = el.querySelector('[data-fst]'), busy = 0, alive = true;
      var sync = function () { ['patOp', 'patEsc', 'ilTam'].forEach(function (k) { var r = el.querySelector('[data-fr="' + k + '"]'); r.value = s[k]; el.querySelector('[data-rv="' + k + '"]').textContent = '· ' + s[k] + (k === 'patEsc' ? ' px' : '%'); }); ['base', 'patCor', 'txtCor'].forEach(function (k) { press(el, 'data-f-' + k, s[k]); }); ['grad', 'pat', 'area', 'il', 'ilCor', 'ilPos', 'logo', 'logoPos'].forEach(function (k) { press(el, 'data-f-' + k, s[k]); }); ['nome', 'cargo'].forEach(function (k) { var i = el.querySelector('[data-ft="' + k + '"]'); if (i.value !== s[k]) i.value = s[k]; el.querySelector('[data-cnt="' + k + '"]').textContent = s[k].length + '/' + i.maxLength; }); };
      var draw = function () { var my = ++busy; var tmp = document.createElement('canvas'); tmp.width = cv.width; tmp.height = cv.height; drawFundo(tmp, s, 1920, 1080).then(function (w) { if (my !== busy || !alive) return; cv.getContext('2d').drawImage(tmp, 0, 0); if (w) { st.textContent = w; st.className = 'status erro'; } else if (/passou/.test(st.textContent)) { st.textContent = ''; } }); };
      var fonts = document.fonts && document.fonts.load ? Promise.all([document.fonts.load('800 68px "Bricolage Grotesque"'), document.fonts.load('600 34px "Bricolage Grotesque"')]).catch(function () {}) : Promise.resolve();
      fonts.then(function () { sync(); draw(); (async function () { var bs = el.querySelectorAll('[data-pre] canvas'); for (var i = 0; i < bs.length && alive; i++) await drawFundo(bs[i], Object.assign({}, FDEF, FPRE[i]), 1920, 1080); })(); });
      el.addEventListener('click', function (e) { var b;
        if ((b = e.target.closest('[data-pre]'))) { var keep = { nome: s.nome, cargo: s.cargo }; s = Object.assign({}, FDEF, FPRE[+b.getAttribute('data-pre')], keep); sync(); draw(); return; }
        if (e.target.closest('[data-frs]')) { s = Object.assign({}, FDEF); sync(); draw(); st.textContent = 'Padrão restaurado.'; st.className = 'status ok'; return; }
        if ((b = e.target.closest('[data-fdl]'))) { var X = +b.getAttribute('data-fdl'); st.textContent = 'Gerando imagem…'; st.className = 'status'; var out = document.createElement('canvas'); out.width = 1920 * X; out.height = 1080 * X; fonts.then(function () { return drawFundo(out, s, 1920, 1080); }).then(function () { saveCanvas(out, 'bc27-fundo-reuniao-' + s.base + (s.pat >= 0 ? '-' + slugify(FPAT[s.pat][0]) : '') + (s.il >= 0 ? '-' + slugify(FILL[s.il][0]) : '') + '-' + out.width + 'x' + out.height + '.png', st); }).catch(function (er) { st.textContent = 'Erro: ' + er.message; st.className = 'status erro'; }); return; }
        var a = [].slice.call(e.target.closest('button') ? e.target.closest('button').attributes : []).find(function (x) { return /^data-f-/.test(x.name); }); if (!a) return; var key = a.name.slice(7), val = a.value; s[key] = /^(pat|il|logo)$/.test(key) ? +val : val; sync(); draw(); });
      el.addEventListener('input', function (e) { var k; if ((k = e.target.getAttribute('data-fr'))) { s[k] = +e.target.value; sync(); draw(); } else if ((k = e.target.getAttribute('data-ft'))) { s[k] = e.target.value; sync(); draw(); } });
      return function () { alive = false; };
    } };
  }
  function pFundos() {
    var w = wFundo(true);
    var h = '<div class="page wide">' + crumbs([['Biblioteca'], ['Fundos de reunião']]) + '<div class="tool-head"><div><h1 tabindex="-1">Fundos de reunião</h1><p>Monte o seu: cor, luz, ' + FPAT.length + ' padrões, ' + FILL.length + ' ilustrações, logo e seu nome. Ou comece por um dos ' + FPRE.length + ' modelos.</p></div><div class="tool-actions"><a class="btn" href="#/fundos/ferramenta">Ferramenta completa →</a></div></div><div data-w="f">' + w.html + '</div>';
    return { title: 'Fundos de reunião', html: h + pager('fundos') + '</div>', mount: function (el) { return mountAll(el, [['f', w]]); } };
  }
  function pTool(key, sub) {
    var T = TOOLS[key]; var src = APP + T.file; var mq = key === 'estudio' && /(^|&)modelo=/.test(QUERY) ? QUERY : ''; if (mq) src += '?' + mq; var label = sub ? (VAR.find(function (v) { return v[0] === sub; }) || [])[1] : null;
    if (sub && !label) return null;
    var cr = key === 'variacoes' ? (label ? [['Biblioteca'], ['Variações', 'variacoes'], [label]] : [['Biblioteca'], ['Variações']]) : [[key === 'estudio' || key === 'criar' || key === 'exportar' ? 'Ferramentas' : 'Biblioteca'], [T.t]];
    var h = '<div class="page wide">' + crumbs(cr) + '<div class="tool-head"><div><h1 tabindex="-1">' + esc(label || T.t) + '</h1><p>' + esc(T.d) + '</p></div><div class="tool-actions">';
    if (T.keys.length) h += '<button class="btn" type="button" id="reset">Restaurar padrão</button>';
    h += '<a class="btn" href="' + src + '" target="_blank" rel="noopener">Abrir em tela inteira ↗</a></div></div>';
    h += '<p class="warn" role="note">Melhor usado no computador. No celular dá para olhar, mas editar e baixar fica difícil.</p><p class="status" role="status" id="tool-st"></p>';
    h += '<div class="frame"><div class="loading" id="loading">Carregando…</div><iframe id="tool" title="' + esc(T.t) + '" src="' + src + '" allow="clipboard-read; clipboard-write; fullscreen"></iframe></div>';
    var route = key + (sub ? '/' + sub : '');
    return { title: label ? label + ' · Variações' : T.t, html: h + pager(route) + '</div>', mount: function (el) {
      var fr = $('#tool', el), ld = $('#loading', el), st = $('#tool-st', el), timer = null;
      if (mq) { history.replaceState(null, '', '#/estudio'); st.textContent = 'Modelo aberto como nova página no Estúdio. Clique num texto para editar.'; st.className = 'status ok'; src = APP + T.file; }
      fr.addEventListener('load', function () {
        ld.hidden = true;
        if (sub) { var v = VAR.find(function (x) { return x[0] === sub; }); var tries = 0; timer = setInterval(function () { tries++; try { var d = fr.contentDocument; var target = sub === 'lab' ? d.getElementById('lab') : [].slice.call(d.querySelectorAll('span')).find(function (s) { return s.textContent.trim() === v[2] && s.style.fontSize === '40px'; }); if (target) { var y = target.getBoundingClientRect().top + fr.contentWindow.scrollY - 16; fr.contentWindow.scrollTo(0, y); clearInterval(timer); } } catch (e) { clearInterval(timer); } if (tries > 60) clearInterval(timer); }, 200); }
      });
      var rb = $('#reset', el); if (rb) rb.addEventListener('click', function () { if (!window.confirm('Apagar o que você fez em ' + T.t + ' neste navegador e voltar ao padrão?')) return; T.keys.forEach(store.del); ld.hidden = false; fr.src = src; st.textContent = 'Padrão restaurado.'; st.className = 'status ok'; });
      return function () { clearInterval(timer); fr.src = 'about:blank'; };
    } };
  }
  // ---------- vinhetas ----------
  var vf = { formato: 'todos', uso: 'todos' };
  function pVinhetas() {
    var fmts = ['todos', '9:16', '16:9', '1:1'], usos = ['todos', 'abertura', 'transição', 'encerramento'];
    var chips = function (name, list, cur) { return list.map(function (v) { return '<button type="button" class="chip" data-f="' + name + '" data-v="' + esc(v) + '" aria-pressed="' + (cur === v) + '">' + esc(v === 'todos' ? 'Todos' : v[0].toUpperCase() + v.slice(1)) + '</button>'; }).join(''); };
    var h = '<div class="page">' + crumbs([['Biblioteca'], ['Vinhetas']]) + '<h1 tabindex="-1">Vinhetas</h1><p class="lead">Animações de 8 segundos para abrir, separar e fechar vídeos e transmissões. Passe o mouse para ver; clique para abrir o player e baixar em MP4.</p>';
    h += '<div class="filters"><fieldset><legend>Formato</legend><div class="chips">' + chips('formato', fmts, vf.formato) + '</div></fieldset><fieldset><legend>Uso</legend><div class="chips">' + chips('uso', usos, vf.uso) + '</div></fieldset></div><p class="sr" role="status" id="v-count"></p><div class="vgrid" id="vgrid"></div>';
    return { title: 'Vinhetas', html: h + pager('vinhetas') + '</div>', mount: function (el) {
      var grid = $('#vgrid', el), prev = null, hoverT = null;
      var draw = function () {
        var list = VIN.filter(function (v) { return (vf.formato === 'todos' || v.formato === vf.formato) && (vf.uso === 'todos' || v.uso === vf.uso); });
        grid.innerHTML = list.length ? list.map(function (v) { return '<a class="vcard" href="#/vinhetas/' + v.slug + '" data-slug="' + v.slug + '"><div class="vthumb"><img src="' + v.capa + '" alt="" loading="lazy" width="' + (v.w / 3) + '" height="' + (v.h / 3) + '"><span class="play" aria-hidden="true">▶</span></div><div class="vmeta"><h3>' + esc(v.nome) + '</h3><div class="tags"><span class="tag uso">' + esc(v.uso) + '</span><span class="tag">' + v.formato + '</span><span class="tag">0:0' + v.duracao + '</span></div></div></a>'; }).join('') : '<p class="vazio">Nenhuma vinheta com esse filtro. <button type="button" class="btn" id="limpar">Limpar filtros</button></p>';
        $('#v-count', el).textContent = list.length + ' vinheta(s)';
      };
      draw();
      el.addEventListener('click', function (e) { var b = e.target.closest('[data-f]'); if (b) { vf[b.getAttribute('data-f')] = b.getAttribute('data-v'); el.querySelectorAll('[data-f="' + b.getAttribute('data-f') + '"]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); draw(); } if (e.target.id === 'limpar') { vf = { formato: 'todos', uso: 'todos' }; el.querySelectorAll('[data-f]').forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-v') === 'todos')); }); draw(); } });
      var stop = function () { clearTimeout(hoverT); if (prev) { prev.src = 'about:blank'; prev.remove(); prev = null; } };
      if (canHover) {
        grid.addEventListener('mouseover', function (e) { var c = e.target.closest('.vcard'); if (!c || (prev && prev.parentNode === c.firstChild)) return; stop(); hoverT = setTimeout(function () { var v = VIN.find(function (x) { return x.slug === c.getAttribute('data-slug'); }); var th = c.firstChild, img = th.querySelector('img'); var f = document.createElement('iframe'); f.title = ''; f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1; f.style.width = img.offsetWidth + 'px'; f.style.height = img.offsetHeight + 'px'; f.src = APP + 'vinheta-player.dc.html?v=' + v.slug; f.addEventListener('load', function () { setTimeout(function () { f.classList.add('on'); }, 500); }); th.appendChild(f); prev = f; }, 350); });
        grid.addEventListener('mouseleave', stop);
        grid.addEventListener('mouseout', function (e) { var c = e.target.closest('.vcard'); if (c && !c.contains(e.relatedTarget)) stop(); });
      }
      return stop;
    } };
  }
  function pVinheta(slug) {
    var i = VIN.findIndex(function (v) { return v.slug === slug; }); if (i < 0) return null;
    var v = VIN[i], p = VIN[(i - 1 + VIN.length) % VIN.length], n = VIN[(i + 1) % VIN.length], ar = v.w / v.h;
    var h = '<div class="page">' + crumbs([['Biblioteca'], ['Vinhetas', 'vinhetas'], [v.nome]]) + '<h1 tabindex="-1">' + esc(v.nome) + '</h1><div class="player"><div>';
    h += '<div class="stage" id="stage"><div class="pbox" style="--ar:' + ar + '"><iframe id="pf" title="Vinheta ' + esc(v.nome) + '" src="' + APP + 'vinheta-player.dc.html?v=' + v.slug + '" tabindex="-1"></iframe><button class="hit" type="button" id="hit" aria-label="Tocar ou pausar"></button></div>';
    h += '<div class="ctrls" role="group" aria-label="Controles da vinheta"><button class="btn icon" type="button" id="b-play" aria-label="Pausar">❚❚</button><button class="btn icon" type="button" id="b-rest" aria-label="Reiniciar">↺</button><span class="time" id="time">0:00 / 0:0' + v.duracao + '</span><input type="range" id="seek" min="0" max="' + (v.duracao * 1000 - 1) + '" step="10" value="0" aria-label="Posição na vinheta"><button class="btn icon" type="button" id="b-som" aria-label="Sem som: esta vinheta não tem áudio" title="Esta vinheta não tem áudio" disabled>🔇</button><button class="btn" type="button" id="b-loop" aria-pressed="true">Repetir</button><button class="btn icon" type="button" id="b-fs" aria-label="Tela cheia">⛶</button><button class="btn primary" type="button" id="b-dl">Baixar MP4</button></div></div>';
    h += '<div class="vnav"><a class="btn" href="#/vinhetas/' + p.slug + '" aria-label="Vinheta anterior: ' + esc(p.nome) + '">← Anterior</a><span class="count">' + (i + 1) + ' de ' + VIN.length + '</span><a class="btn" href="#/vinhetas/' + n.slug + '" aria-label="Próxima vinheta: ' + esc(n.nome) + '">Próxima →</a></div></div>';
    h += '<aside class="side" aria-label="Detalhes"><dl><dt>Formato</dt><dd>' + v.formato + '</dd><dt>Resolução</dt><dd>' + v.w + ' × ' + v.h + '</dd><dt>Duração</dt><dd>' + v.duracao + ' s</dd><dt>Uso</dt><dd>' + esc(v.uso) + '</dd><dt>Arquivo</dt><dd style="word-break:break-all;font-weight:500">' + v.arquivo + '</dd></dl><div><h3>Quando usar</h3><p>' + esc(v.usar) + '</p></div><div><h3>Quando não usar</h3><p>' + esc(v.nao) + '</p></div><button class="btn primary" type="button" id="b-dl2">Baixar MP4</button><div class="prog" aria-hidden="true"><div id="dl-bar"></div></div><p class="status" role="status" id="dl-st">O MP4 é gerado no seu navegador (Chrome ou Edge) e leva cerca de um minuto. Deixe a aba aberta.</p><a class="btn" href="#/vinhetas">← Voltar à galeria</a></div></aside></div>';
    return { title: v.nome + ' · Vinhetas', html: h + pager('vinhetas') + '</div>', mount: function (el) {
      var fr = $('#pf', el), playing = true, loop = true, dur = v.duracao * 1000, busy = false;
      var send = function (o) { o.type = 'bcv'; try { fr.contentWindow.postMessage(o, '*'); } catch (e) {} };
      var bPlay = $('#b-play', el), seek = $('#seek', el), time = $('#time', el), st = $('#dl-st', el), bar = $('#dl-bar', el), dragging = false;
      var setPlay = function (on) { playing = on; bPlay.textContent = on ? '❚❚' : '▶'; bPlay.setAttribute('aria-label', on ? 'Pausar' : 'Tocar'); };
      var toggle = function () { send({ cmd: 'toggle' }); setPlay(!playing); };
      var onMsg = function (e) { if (e.source !== fr.contentWindow || !e.data) return; var d = e.data;
        if (d.type === 'bcv-state') { if (!dragging) seek.value = Math.round(d.t); time.textContent = fmtT(d.t) + ' / 0:0' + v.duracao; if (d.playing !== playing) setPlay(d.playing); }
        if (d.type === 'bcv-export') { if (d.status === 'progresso') { bar.style.width = d.pct + '%'; st.textContent = 'Gerando vídeo… ' + d.pct + '%'; st.className = 'status'; } if (d.status === 'ok') { busy = false; bar.style.width = '100%'; st.textContent = 'Arquivo baixado: ' + v.arquivo; st.className = 'status ok'; } if (d.status === 'erro') { busy = false; bar.style.width = '0'; st.textContent = 'Não deu para gerar o vídeo: ' + d.msg; st.className = 'status erro'; } if (d.status === 'inicio') { st.textContent = 'Preparando…'; st.className = 'status'; } } };
      window.addEventListener('message', onMsg);
      var dl = function () { if (busy) return; busy = true; bar.style.width = '0'; st.textContent = 'Preparando…'; st.className = 'status'; send({ cmd: 'export' }); };
      bPlay.addEventListener('click', toggle); $('#hit', el).addEventListener('click', toggle);
      $('#b-rest', el).addEventListener('click', function () { send({ cmd: 'restart' }); setPlay(true); });
      $('#b-loop', el).addEventListener('click', function (e) { loop = !loop; e.currentTarget.setAttribute('aria-pressed', String(loop)); send({ cmd: 'loop', on: loop }); });
      var fs = function () { var s = $('#stage', el); if (document.fullscreenElement) document.exitFullscreen(); else if (s.requestFullscreen) s.requestFullscreen(); else if (s.webkitRequestFullscreen) s.webkitRequestFullscreen(); };
      $('#b-fs', el).addEventListener('click', fs);
      $('#b-dl', el).addEventListener('click', dl); $('#b-dl2', el).addEventListener('click', dl);
      seek.addEventListener('input', function () { dragging = true; send({ cmd: 'seek', t: +seek.value }); time.textContent = fmtT(+seek.value) + ' / 0:0' + v.duracao; });
      seek.addEventListener('change', function () { dragging = false; });
      var onKey = function (e) { if (inField(e) || e.ctrlKey || e.metaKey || e.altKey || drawerOpen) return;
        if (e.key === ' ' || e.code === 'Space') { if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return; e.preventDefault(); toggle(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); location.hash = '#/vinhetas/' + p.slug; }
        else if (e.key === 'ArrowRight') { e.preventDefault(); location.hash = '#/vinhetas/' + n.slug; }
        else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); fs(); }
        else if (e.key === 'Escape' && !document.fullscreenElement) { location.hash = '#/vinhetas'; } };
      document.addEventListener('keydown', onKey);
      return function () { window.removeEventListener('message', onMsg); document.removeEventListener('keydown', onKey); if (document.fullscreenElement) document.exitFullscreen().catch(function () {}); fr.src = 'about:blank'; };
    } };
  }
  function pNF() { return { title: 'Página não encontrada', html: '<div class="page"><div class="nf"><span class="big" aria-hidden="true">404</span><h1 tabindex="-1">Página não encontrada</h1><p class="lead">Esse endereço não existe ou mudou de lugar.</p><div class="chips"><a class="btn primary" href="#/inicio">Ir para o início</a><a class="btn" href="#/vinhetas">Ver vinhetas</a><a class="btn" href="#/estudio">Abrir o Estúdio</a></div></div></div>' }; }

  // ---------- roteador ----------
  function resolve(parts) {
    var a = parts[0], b = parts[1];
    if (parts.length > 2) return null;
    if (a === 'inicio' && !b) return pInicio();
    if (a === 'fundamentos') { if (!b) return { redirect: 'fundamentos/cores' }; return ({ cores: pCores, tipografia: pTipo, logo: pLogo, padroes: pPadroes }[b] || function () { return null; })(); }
    if (a === 'vinhetas') return b ? pVinheta(b) : pVinhetas();
    if (a === 'pecas') return b ? pPeca(b, QUERY) : pPecas();
    if (a === 'fundos') return !b ? pFundos() : b === 'ferramenta' ? pTool('fundos') : null;
    if (TOOLS[a]) { if (b && a !== 'variacoes') return null; return pTool(a, b); }
    return null;
  }
  var QUERY = '';
  function route() {
    var h = location.hash;
    if (!h || h === '#' || h === '#/') { history.replaceState(null, '', '#/inicio'); h = '#/inicio'; }
    if (h.indexOf('#/') !== 0) return;
    var raw = h.slice(2), qi = raw.indexOf('?'); QUERY = qi >= 0 ? raw.slice(qi + 1) : ''; var path = decodeURIComponent(qi >= 0 ? raw.slice(0, qi) : raw).replace(/\/+$/, ''); var parts = path.split('/').filter(Boolean);
    var pg = resolve(parts);
    if (pg && pg.redirect) { history.replaceState(null, '', '#/' + pg.redirect); return route(); }
    if (!pg) pg = pNF();
    if (cleanup) { try { cleanup(); } catch (e) {} cleanup = null; }
    main.innerHTML = pg.html;
    document.title = pg.title + ' | ' + SITE.nome;
    if (pg.mount) cleanup = pg.mount(main.firstElementChild) || null;
    markMenu(path);
    closeDrawer(false);
    window.scrollTo(0, 0);
    var h1 = main.querySelector('h1'); if (h1) h1.focus({ preventScroll: true });
  }

  var temaBtns = document.querySelectorAll('[data-tema-btn]');
  function setTema(tm) { document.documentElement.setAttribute('data-tema', tm); try { localStorage.setItem('bc-tema', tm); } catch (e) {} temaBtns.forEach(function (b) { b.textContent = tm === 'claro' ? '☾ Escuro' : '☀ Claro'; b.setAttribute('aria-label', tm === 'claro' ? 'Mudar para tema escuro' : 'Mudar para tema claro'); }); }
  temaBtns.forEach(function (b) { b.addEventListener('click', function () { setTema(document.documentElement.getAttribute('data-tema') === 'claro' ? 'escuro' : 'claro'); }); });
  setTema(document.documentElement.getAttribute('data-tema') === 'claro' ? 'claro' : 'escuro');
  buildMenu();
  burger.addEventListener('click', function () { drawerOpen ? closeDrawer() : openDrawer(); });
  overlay.addEventListener('click', function () { closeDrawer(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawerOpen) { e.stopImmediatePropagation(); closeDrawer(); } }, true);
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches) closeDrawer(false); });
  $('#skip').addEventListener('click', function (e) { e.preventDefault(); var h1 = main.querySelector('h1'); (h1 || main).focus(); });
  window.addEventListener('hashchange', route);
  route();
})();
