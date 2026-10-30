var Skyline = (function () {
const H = 700;
const f = n => Math.round(n * 10) / 10;
const f2 = n => Math.round(n * 1000) / 1000;
function seedOf(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) % 2147483646 + 1; }
function RNG(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; }
const at = (fl, id) => (id ? ` id="${id}"` : '') + (fl ? ` data-f="${fl}"` : '');
const R = (x, y, w, h, fl, id) => `<rect${at(fl, id)} x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}"/>`;
const P = (d, fl, id) => `<path${at(fl, id)} d="${d}"/>`;
const C = (cx, cy, r, fl) => `<circle${at(fl)} cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}"/>`;
const arches = (x0, b, n, w, h, st) => { let d = ''; const r = w / 2; for (let i = 0; i < n; i++) { const x = x0 + i * st; d += `M${f(x)},${b} L${f(x)},${f(b - h + r)} A${f(r)},${f(r)} 0 0 1 ${f(x + w)},${f(b - h + r)} L${f(x + w)},${b} `; } return d.trim(); };
const grid = (x0, y0, cols, rows, dx, dy) => { const p = []; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) p.push([x0 + c * dx, y0 + r * dy]); return p; };
const keep = (rng, pts, skip) => pts.filter(() => rng() > skip);
function cub(a, b, c, d, t) { const u = 1 - t; return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d; }
function yAtX(Q, x) { let lo = 0, hi = 1; for (let i = 0; i < 32; i++) { const m = (lo + hi) / 2; (cub(Q[0], Q[2], Q[4], Q[6], m) < x) ? lo = m : hi = m; } return cub(Q[1], Q[3], Q[5], Q[7], (lo + hi) / 2); }

function palm(x, h, lean) { const tx = x + lean, ty = H - h; let d = `M${f(x)},700 Q${f(x + lean * .15)},${f(H - h * .55)} ${f(tx)},${f(ty)}`; for (const [dx, dy] of [[-36, 14], [-26, 0], [-10, -9], [10, -8], [26, 2], [38, 15]]) d += ` M${f(tx)},${f(ty)} Q${f(tx + dx * .55)},${f(ty + dy - 16)} ${f(tx + dx)},${f(ty + dy)}`; return d; }
function arauc(x, h) { const top = H - h; let d = `M${x},700 L${x},${top + 16}`; for (const [dy, w] of [[0, 48], [15, 40], [29, 30], [41, 18]]) { const y = top + 6 + dy; d += ` M${x},${y + 10} Q${f(x - w * .6)},${y + 8} ${f(x - w)},${y - 4} M${x},${y + 10} Q${f(x + w * .6)},${y + 8} ${f(x + w)},${y - 4} M${f(x - w - 7)},${y - 4} L${f(x - w + 7)},${y - 4} M${f(x + w - 7)},${y - 4} L${f(x + w + 7)},${y - 4}`; } return d; }
function jangada(x, s) { return [P(`M${x},700 L${f(x + 30 * s)},700 L${f(x + 27 * s)},${f(700 - 5 * s)} L${f(x + 3 * s)},${f(700 - 5 * s)} Z`), P(`M${f(x + 14 * s)},${f(700 - 5 * s)} L${f(x + 14 * s)},${f(700 - 62 * s)}`), P(`M${f(x + 15 * s)},${f(700 - 60 * s)} Q${f(x + 42 * s)},${f(700 - 34 * s)} ${f(x + 34 * s)},${f(700 - 7 * s)} L${f(x + 15 * s)},${f(700 - 7 * s)} Z`, 'd')]; }
function canopyD(rng, x0, w, hAt) { let x = x0, d = `M${f(x0)},700 L${f(x0)},${f(700 - hAt(0) * (0.95 + rng() * 0.1))}`; while (x < x0 + w - 1) { const r = 9 + rng() * 12; const nx = Math.min(x0 + w, x + r * 2); const ny = 700 - hAt(nx - x0) * (0.85 + rng() * 0.3); d += ` A${f(r)},${f(r)} 0 0 1 ${f(nx)},${f(ny)}`; x = nx; } return d + ` L${f(x0 + w)},700`; }
function casario(rng, specs, base, x0) {
  let x = x0; const els = [], win = []; const roles = ['a', 'b', 'd'];
  specs.forEach(([w, h, roof], i) => {
    const top = base - h; els.push(R(x, top, w, h, roles[i % 3]));
    if (roof === 'gable') els.push(P(`M${x},${top} L${f(x + w / 2)},${top - 12} L${x + w},${top}`));
    else if (roof === 'parapet' || roof === 'mirante') els.push(P(`M${x + 3},${top} L${x + 3},${top - 5} L${x + w - 3},${top - 5} L${x + w - 3},${top}`));
    else if (roof === 'telha') els.push(P(`M${x - 2},${top} L${f(x + w / 2)},${top - 8} L${x + w + 2},${top}`));
    if (roof === 'mirante') els.push(R(x + w / 2 - 6, top - 17, 12, 12));
    els.push(R(x + w / 2 - 3, base - 11, 6, 11));
    const cols = Math.max(1, Math.floor((w - 8) / 8)), rows = Math.max(1, Math.floor((h - 18) / 12));
    const sx = x + (w - (cols - 1) * 8) / 2;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (rng() > 0.2) win.push([sx + c * 8, top + 9 + r * 12]);
    x += w;
  });
  return { els, win, x1: x };
}

const LIB = {
  // ---------- A (coordenadas originais) ----------
  'pao-de-acucar': (rng, o) => {
    const els = [P('M150,700 C165,660 190,615 225,612 C252,610 272,642 292,664', 'a'), P('M280,700 C300,640 318,520 345,480 C362,456 384,460 394,492 C406,532 412,620 422,700', 'a'), P('M372,478 C379,520 384,600 380,664')]; let win = [];
    if (o.cable !== false) { els.push(R(110, 688, 16, 12), P('M118,688 Q170,662 222,606'), R(214, 600, 24, 12), R(352, 452, 22, 12), P('M232,603 Q300,566 360,455'), P('M232,608 Q302,572 364,458'), P('M290,563 L290,574'), `<rect x="280" y="574" width="20" height="16" rx="4" data-f="b"/>`); win = [[285, 581], [290, 581], [295, 581]]; }
    return { x0: o.cable === false ? 148 : 108, x1: 424, top: [365, 456], els, win };
  },
  'masp': (rng) => ({ x0: 426, x1: 554, top: [490, 578], els: [R(426, 578, 128, 12, 'c'), P('M432,590 L432,700 M444,590 L444,700 M536,590 L536,700 M548,590 L548,700'), R(444, 590, 92, 44, 'b'), P('M467,590 L467,634 M490,590 L490,634 M513,590 L513,634'), R(426, 634, 128, 10, 'c')], win: keep(rng, grid(450, 598, 9, 4, 10.5, 10), 0.3) }),
  'edificio-copan': (rng) => {
    const lx = y => 576 + 9 * Math.sin((y - 420) / 280 * Math.PI * 1.6), W = 78; const Lp = [], Rp = [];
    for (let y = 700; y >= 420; y -= 10) Lp.push(`${f(lx(y))},${y}`); for (let y = 420; y <= 700; y += 10) Rp.push(`${f(lx(y) + W)},${y}`);
    let b = ''; for (let y = 434; y <= 686; y += 14) b += `M${f(lx(y))},${y} L${f(lx(y) + W)},${y} `;
    const cw = []; for (let y = 441; y <= 686; y += 14) for (let x = lx(y) + 8; x < lx(y) + W - 4; x += 9) cw.push([x, y]);
    return { x0: 565, x1: 665, top: [f(lx(420) + 39), 410], els: [P(`M${Lp.join(' L')} L${Rp.join(' L')}`, 'b'), P(b.trim()), R(lx(420) + 24, 410, 30, 10)], win: keep(rng, cw, 0.4) };
  },
  'elevador-lacerda': (rng) => {
    const lw = []; for (let y = 560; y <= 690; y += 14) for (const x of [696.3, 704.8, 713.3, 721.8]) lw.push([x, y]);
    return { x0: 686, x1: 790, top: [715, 487], els: [R(692, 540, 34, 160, 'a'), P('M700.5,548 L700.5,700 M709,548 L709,700 M717.5,548 L717.5,700'), R(686, 506, 60, 34, 'b'), P('M694,506 L694,496 L702,496 L702,487 L728,487 L728,496 L738,496 L738,506'), R(746, 514, 24, 10), P('M772,700 C768,650 776,590 772,519 L790,519')], win: [...keep(rng, grid(692, 516, 7, 2, 8, 10), 0.2), ...keep(rng, lw, 0.55)] };
  },
  'congresso-nacional': (rng) => {
    const tw = []; for (const x0 of [918, 968]) for (let y = 396; y <= 640; y += 9) for (let c = 0; c < 5; c++) tw.push([x0 + 5 + c * 6, y]);
    const pw = []; for (let x = 800; x <= 1120; x += 10) pw.push([x, 681]);
    return { x0: 790, x1: 1130, top: [960, 385], glow: [1062, 589], els: [R(792, 650, 336, 50), P('M792,660 L1128,660'), P('M806,650 C808,610 892,610 894,650', 'd', 'senado-cupula-convexa'), `<ellipse id="camara-cupula-concava" cx="1062" cy="598" rx="60" ry="7"/>`, P('M1002,598 C1008,640 1116,640 1122,598', 'd'), P('M1054,630 L1050,650 M1070,630 L1074,650'), R(918, 385, 34, 265, 'a'), R(968, 385, 34, 265, 'a'), R(952, 498, 16, 30)], win: [...keep(rng, tw, 0.22), [960, 506], [960, 513], [960, 520], ...keep(rng, pw, 0.3)] };
  },
  'ponte-dos-ingleses': () => {
    let posts = ''; for (let x = 1150; x <= 1300; x += 10) posts += `M${x},660 L${x},668 `;
    let piles = ''; for (let i = 0; i < 7; i++) { const x = 1155 + i * 24; piles += `M${x},668 L${x},700 `; if (i < 6) piles += `M${x},672 L${x + 24},696 M${x + 24},672 L${x},696 `; }
    return { x0: 1148, x1: 1304, top: [1286, 630], els: [P('M1150,668 L1300,668 M1150,660 L1300,660'), P(posts.trim()), P(piles.trim()), P('M1270,642 L1286,630 L1302,642 Z', 'd'), P('M1274,642 L1274,660 M1298,642 L1298,660 M1190,660 L1190,645 M1230,660 L1230,645')], win: [[1190, 642], [1230, 642], [1286, 650]] };
  },
  'estatua-iracema': () => ({ x0: 0, x1: 146, top: [82, 558], els: [P('M0,700 L8,663 L135,663 L139,700 Z', 'a'), P('M38.6,662.6 L90.3,662.6 L97.4,625.6 L94.9,619.3 L75.6,636.1 L72.2,629.8 L74.8,608.8 L72.2,594.1 L46.2,568.9 L39.9,571 L52.5,580.2 L58.8,598.3 L55.4,602.5 L60.9,606.7 L63.8,623.5 L67.2,640.3 L71.4,650.8 L67.2,657.1 L42,658.4 Z', 'b'), C(64, 587, 4.6), P('M42,572 A61.7,61.7 0 0 1 126,663', 'd')], win: [] }),
  'teatro-amazonas': (rng) => {
    let ar = ''; for (const x of [1451, 1463.5, 1476, 1488.5]) ar += `M${x},700 L${x},689 A5,5 0 0 1 ${x + 10},689 L${x + 10},700 `;
    let wg = ''; const tdw = []; for (const x of [1400, 1414, 1428, 1512, 1526, 1540]) { for (const [b, t] of [[648, 636], [692, 680]]) wg += `M${x},${b} L${x},${t} A4,4 0 0 1 ${x + 8},${t} L${x + 8},${b} `; tdw.push([x + 4, 642], [x + 4, 686]); }
    return { x0: 1390, x1: 1560, top: [1475, 506], glow: [1475, 499], els: [P('M1446,700 L1446,612 L1392,612 L1392,700 M1504,700 L1504,612 L1558,612 L1558,700', 'a'), P('M1392,622 L1446,622 M1504,622 L1558,622'), P('M1446,700 L1446,600 L1504,600 L1504,700', 'a'), P('M1440,600 L1475,588 L1510,600 Z', 'd'), P('M1446,608 L1504,608 M1446,660 L1504,660'), P('M1455,608 L1455,660 M1465,608 L1465,660 M1475,608 L1475,660 M1485,608 L1485,660 M1495,608 L1495,660'), P(ar.trim()), P(wg.trim()), R(1452, 566, 46, 22), P('M1446,566 C1448,521 1502,521 1504,566', 'b', 'cupula-teatro'), P('M1475,532 L1475,566 M1462,536 C1459,546 1459,556 1460,566 M1488,536 C1491,546 1491,556 1490,566'), R(1470, 520, 10, 13), P('M1475,520 L1475,506')], win: [...keep(rng, tdw, 0.2), ...keep(rng, [[1460, 634], [1470, 634], [1480, 634], [1490, 634]], 0.25), ...keep(rng, [[1460, 577], [1468, 577], [1476, 577], [1484, 577], [1492, 577]], 0.2)] };
  },
  'ponte-hercilio-luz': (rng) => {
    let tw = ''; for (const T of [1650, 1770]) tw += `M${T - 6},700 L${T - 5},545 M${T + 6},700 L${T + 5},545 M${T - 9},545 L${T + 9},545 M${T - 5},556 L${T + 5},578 M${T + 5},556 L${T - 5},578 M${T - 5},582 L${T + 5},604 M${T + 5},582 L${T - 5},604 `;
    const pt = t => [1650 + 120 * t, 545 + 440 * t * (1 - t)]; let tr = '';
    for (let i = 1; i < 12; i++) { const [x, y] = pt(i / 12); tr += `M${f(x)},${f(y)} L${f(x)},668 `; }
    for (let i = 0; i < 12; i++) { const [x0, y0] = pt(i / 12), [x1, y1] = pt((i + 1) / 12); tr += i < 6 ? `M${f(x0)},${f(y0)} L${f(x1)},668 ` : `M${f(x0)},668 L${f(x1)},${f(y1)} `; }
    const hl = []; for (let x = 1600; x <= 1820; x += 20) hl.push([x, 662]);
    return { x0: 1584, x1: 1836, top: [1650, 538], els: [P('M1588,668 L1832,668 M1588,675 L1832,675'), P(tw.trim()), P('M1650,545 Q1710,765 1770,545'), P(tr.trim()), P('M1650,545 Q1622,612 1592,668 M1770,545 Q1798,612 1828,668'), P('M1631.3,587.9 L1631.3,668 M1612.2,628.7 L1612.2,668 M1788.7,587.9 L1788.7,668 M1807.8,628.7 L1807.8,668'), P('M1600,675 L1600,700 M1820,675 L1820,700')], win: [...keep(rng, hl, 0.3), [1650, 537], [1770, 537]] };
  },
  // ---------- Sudeste ----------
  'cristo-redentor': () => ({ x0: 0, x1: 300, top: [160, 404], glow: [160, 395], els: [P('M0,700 C50,690 90,650 115,590 C130,552 140,520 150,512 L170,512 C180,520 192,560 210,610 C230,660 260,690 300,700', 'a'), P('M60,684 C88,664 108,632 124,598 M222,640 C236,662 252,680 272,692'), R(151, 497, 18, 15), P('M154,497 L156.5,431 L117,431 L115,427 L117,423 L155,421 L157,417 L163,417 L165,421 L203,423 L205,427 L203,431 L163.5,431 L166,497 Z', 'd'), C(160, 410, 5.5)], win: [] }),
  'arcos-da-lapa': () => ({ x0: 0, x1: 200, top: [133, 612], els: [P('M0,700 L0,636 L200,636 L200,700', 'b'), P('M0,666 L200,666 M0,643 L200,643'), P(arches(6, 700, 10, 13, 30, 19)), P(arches(6, 666, 10, 13, 19, 19)), `<rect x="120" y="622" width="26" height="12" rx="2" data-f="d"/>`, P('M133,622 L128,614 L138,610')], win: [[126, 628], [133, 628], [140, 628]] }),
  'museu-do-amanha': (rng) => {
    const U = [0, 664, 60, 672, 90, 640, 120, 636], U2 = [120, 636, 150, 640, 180, 672, 240, 664], L = [0, 664, 60, 676, 180, 676, 240, 664]; let fins = '';
    for (let x = 24; x <= 216; x += 12) { const yl = yAtX(L, x), yu = x <= 120 ? yAtX(U, x) : yAtX(U2, x); if (yl - yu > 2) fins += `M${x},${f(yl)} L${x},${f(yu)} `; }
    return { x0: 0, x1: 240, top: [120, 636], els: [P('M20,700 L28,676 L212,676 L220,700', 'b'), P('M0,664 C60,672 90,640 120,636 C150,640 180,672 240,664 C180,676 60,676 0,664 Z', 'a'), P(fins.trim())], win: keep(rng, grid(36, 686, 15, 2, 12, 8), 0.4) };
  },
  'ponte-estaiada': () => {
    let cab = ''; for (let i = 0; i < 8; i++) { const y = 478 + i * 12, k = (700 - y) / 230 * 30; cab += `M${f(130 - k)},${y} L${10 + i * 11},668 M${f(100 + k)},${y} L${220 - i * 11},668 `; }
    const lights = []; for (let x = 20; x <= 210; x += 24) lights.push([x, 663]);
    return { x0: 0, x1: 230, top: [115, 470], els: [P('M0,668 L230,668 M0,675 L230,675'), P('M100,700 L130,470 M130,700 L100,470 M96,470 L104,470 M126,470 L134,470'), P(cab.trim())], win: [[100, 463], [130, 463], ...lights] };
  },
  'edificio-italia': (rng) => ({ x0: 0, x1: 64, top: [32, 404], els: [R(0, 650, 64, 50), R(10, 440, 44, 210, 'a'), R(14, 426, 36, 14), P('M32,426 L32,404'), P('M21,446 L21,650 M32,446 L32,650 M43,446 L43,650')], win: [...keep(rng, grid(15.5, 452, 4, 22, 11, 9), 0.3), ...keep(rng, grid(8, 668, 7, 2, 8, 12), 0.3)] }),
  'igreja-pampulha': () => ({ x0: 0, x1: 250, top: [234, 602], els: [P('M0,700 Q45,560 90,700', 'b'), P('M12,700 Q45,590 78,700'), P('M90,700 Q105,630 120,700 Q135,630 150,700 Q165,630 180,700 Q195,630 210,700', 'b'), P('M228,700 L222,618 L246,618 L240,700 Z', 'd'), P('M223.6,640 L244.4,640 M225.2,662 L242.8,662 M226.8,684 L241.2,684'), P('M234,618 L234,602 M229,608 L239,608')], win: [] }),
  'igreja-ouro-preto': (rng) => ({ x0: 0, x1: 110, top: [55, 550], els: [R(10, 590, 20, 110, 'b'), R(80, 590, 20, 110, 'b'), P('M30,700 L30,600 C30,588 44,588 47,580 L55,566 L63,580 C66,588 80,588 80,600 L80,700', 'a'), P('M10,590 C10,575 30,575 30,590 M80,590 C80,575 100,575 100,590', 'd'), P('M20,579 L20,566 M16,571 L24,571 M90,579 L90,566 M86,571 L94,571 M55,566 L55,550 M50,556 L60,556'), P(arches(14, 616, 1, 12, 16, 0) + ' ' + arches(84, 616, 1, 12, 16, 0)), P('M48,700 L48,680 A7,7 0 0 1 62,680 L62,700'), C(55, 618, 5), R(47, 632, 16, 18)], win: keep(rng, [[20, 640], [90, 640], [20, 664], [90, 664], [38, 650], [72, 650], [38, 676], [72, 676]], 0.15) }),
  'convento-da-penha': (rng) => ({ x0: 0, x1: 250, top: [168, 482], els: [P('M0,700 C40,690 70,640 90,600 C100,580 110,566 122,562 L178,562 C190,566 200,590 212,630 C224,668 236,690 250,700', 'a'), P('M40,686 C62,668 78,640 92,612 M214,646 C224,668 234,684 244,692'), R(128, 532, 34, 30, 'd'), P('M128,532 L145,520 L162,532'), R(162, 500, 12, 62, 'd'), P('M162,500 L168,490 L174,500 M168,490 L168,482')], win: [...keep(rng, grid(134, 542, 4, 2, 7, 9), 0.2), [168, 512], [168, 526]] }),
  // ---------- Nordeste ----------
  'casario-pelourinho': (rng) => { const b = 519; const c = casario(rng, [[26, 48, 'gable'], [30, 60, 'parapet'], [24, 44, 'gable'], [30, 54, 'parapet']], b, 4); return { x0: 0, x1: 140, top: [45, b - 60], els: [P(`M0,${b} L130,${b} C136,${b + 40} 130,${f(b + (H - b) * 0.66)} 138,700`), ...c.els], win: c.win }; },
  'casario-sao-luis': (rng) => { const c = casario(rng, [[30, 62, 'parapet'], [34, 74, 'mirante'], [28, 56, 'telha'], [34, 70, 'parapet']], 700, 0); return { x0: -2, x1: 128, top: [47, 609], els: c.els, win: c.win }; },
  'casario-goias': (rng) => { const c = casario(rng, [[36, 34, 'telha'], [30, 30, 'telha'], [40, 38, 'telha'], [32, 32, 'telha']], 700, 0); return { x0: -2, x1: 182, top: [174, 604], els: [...c.els, R(140, 640, 28, 60, 'd'), P('M140,640 C142,632 150,632 152,626 L154,622 L156,626 C158,632 166,632 168,640'), R(168, 622, 12, 78, 'b'), P('M168,622 L174,612 L180,622 M154,622 L154,612 M150,616 L158,616 M174,612 L174,604'), P('M149,700 L149,688 A5,5 0 0 1 159,688 L159,700')], win: [...c.win, [148, 656], [160, 656], [174, 640], [174, 660]] }; },
  'igrejas-olinda': () => ({ x0: 0, x1: 175, top: [75, 566], els: [P('M0,700 C25,690 40,650 55,630 L140,630 C150,650 160,690 175,700', 'a'), P('M60,630 L60,598 C62,590 70,590 72,584 L75,578 L78,584 C80,590 88,590 90,598 L90,630', 'd'), R(90, 584, 10, 46, 'd'), P('M90,584 L95,574 L100,584 M75,578 L75,566 M71,571 L79,571 M95,574 L95,566'), P('M70,630 L70,618 A5,5 0 0 1 80,618 L80,630'), R(110, 606, 24, 24, 'b'), P('M110,606 L122,596 L134,606 M113,606 L113,598 M131,606 L131,598 M122,596 L122,588 M119,591 L125,591')], win: [[66, 606], [84, 606], [95, 598], [95, 612], [116, 614], [128, 614]] }),
  'marco-zero-recife': () => ({ x0: 0, x1: 40, top: [20, 540], els: [R(10, 680, 20, 20), P('M16,680 L17,600 M24,680 L23,600'), P('M17,600 C8,585 14,560 20,548 C26,560 32,585 23,600 Z', 'd'), P('M20,548 L20,540 M20,598 L20,562')], win: [[20, 690]] }),
  'catedral-fortaleza': () => ({ x0: 0, x1: 90, top: [13, 490], els: [P('M20,700 L20,610 L45,588 L70,610 L70,700', 'a'), C(45, 630, 8), P('M38,700 L38,676 L45,666 L52,676 L52,700'), R(6, 560, 14, 140, 'b'), R(70, 560, 14, 140, 'b'), P('M6,560 L13,500 L20,560', 'd'), P('M70,560 L77,500 L84,560', 'd'), P('M13,500 L13,490 M77,500 L77,490 M45,588 L45,578'), P('M10,600 L10,588 L13,582 L16,588 L16,600 M74,600 L74,588 L77,582 L80,588 L80,600')], win: [[13, 620], [13, 640], [13, 660], [77, 620], [77, 640], [77, 660], [30, 650], [60, 650], [30, 670], [60, 670]] }),
  'jangadas': () => ({ x0: 0, x1: 96, top: [15, 640], els: [...jangada(0, 1), ...jangada(54, 0.75)], win: [] }),
  'forte-reis-magos': (rng) => ({ x0: 0, x1: 130, top: [100, 636], els: [P('M0,700 L12,668 L40,668 L48,660 L82,660 L90,668 L118,668 L130,700', 'a'), R(56, 644, 20, 16, 'd'), P('M56,644 L66,636 L76,644'), R(14, 660, 8, 8), P('M14,660 C14,654 22,654 22,660'), R(108, 660, 8, 8), P('M108,660 C108,654 116,654 116,660'), P('M100,668 L100,636 M100,636 L112,640 L100,644')], win: keep(rng, [[20, 684], [35, 684], [50, 684], [65, 684], [80, 684], [95, 684], [110, 684]], 0.2) }),
  'morro-do-careca': () => ({ x0: 0, x1: 200, top: [100, 582], els: [P('M0,700 C35,690 60,600 100,582 C140,600 165,690 200,700', 'a'), P('M70,700 C80,650 90,608 100,594 C110,608 120,650 130,700', 'd'), P('M22,690 a5,5 0 0 1 10,0 M36,676 a5,5 0 0 1 10,0 M154,676 a5,5 0 0 1 10,0 M168,690 a5,5 0 0 1 10,0')], win: [] }),
  'farol-cabo-branco': () => ({ x0: 0, x1: 40, top: [20, 553], els: [P('M16,700 C6,680 4,640 14,600 L17,580 L23,580 L26,600 C36,640 34,680 24,700 Z', 'a'), P('M20,700 L20,584'), R(15, 566, 10, 14, 'd'), P('M15,566 C15,560 25,560 25,566 M20,561 L20,553 M11,580 L29,580')], win: [[20, 573]] }),
  'farol-da-barra': (rng) => {
    let bands = ''; for (const y of [610, 570, 530, 490]) { const k = (650 - y) / 180 * 4; bands += `M${f(98 + k)},${y} L${f(122 - k)},${y} `; }
    return { x0: 0, x1: 220, top: [110, 416], glow: [110, 450], els: [P('M0,700 L14,660 L60,660 L60,650 L160,650 L160,660 L206,660 L220,700', 'a'), R(14, 648, 10, 12), P('M14,648 C14,641 24,641 24,648'), R(196, 648, 10, 12), P('M196,648 C196,641 206,641 206,648'), P('M100,700 L100,686 A10,10 0 0 1 120,686 L120,700'), P('M98,650 L102,470 L118,470 L122,650 Z', 'd'), P(bands.trim()), P('M94,470 L126,470 M96,462 L124,462 M96,462 L96,470 M103,462 L103,470 M117,462 L117,470 M124,462 L124,470'), R(102, 438, 16, 24, 'b'), P('M106,438 L106,462 M114,438 L114,462'), P('M100,438 C100,424 120,424 120,438 M110,427 L110,416')], win: [...keep(rng, [[30, 678], [46, 678], [62, 678], [78, 678], [142, 678], [158, 678], [174, 678], [190, 678]], 0.15), [110, 590], [110, 550], [110, 510]] };
  },
  'coqueiros': () => ({ x0: -30, x1: 116, top: [28, 550], els: [P(palm(0, 120, 8)), P(palm(34, 150, -6)), P(palm(66, 100, 10))], win: [] }),
  // ---------- Norte ----------
  'ver-o-peso': (rng) => {
    const tw = (cx, y0, h, w) => [R(cx - w / 2, y0, w, h, 'b'), P(`M${cx - w / 2 - 1},${y0} L${cx},${y0 - 20} L${cx + w / 2 + 1},${y0} M${cx},${y0 - 20} L${cx},${y0 - 27}`)];
    return { x0: 0, x1: 170, top: [12, 577], els: [...tw(48, 600, 28, 10), ...tw(122, 600, 28, 10), R(18, 640, 134, 60, 'a'), P('M18,640 L30,628 L140,628 L152,640'), ...tw(12, 604, 96, 12), ...tw(158, 604, 96, 12), P(arches(26, 700, 6, 14, 30, 21))], win: [...keep(rng, [[12, 620], [12, 640], [12, 660], [158, 620], [158, 640], [158, 660], [48, 612], [122, 612]], 0.1), ...keep(rng, grid(33, 652, 6, 1, 21, 0), 0.2)] };
  },
  'theatro-da-paz': (rng) => ({ x0: 0, x1: 150, top: [75, 584], els: [P('M40,700 L40,620 L0,620 L0,700 M110,700 L110,620 L150,620 L150,700', 'a'), P('M14,620 L22,604 L47,604 M103,604 L128,604 L136,620'), P('M40,700 L40,612 L110,612 L110,700', 'b'), P('M36,612 L75,584 L114,612 Z', 'd'), P('M40,620 L110,620 M40,676 L110,676'), P('M50,620 L50,676 M60,620 L60,676 M70,620 L70,676 M80,620 L80,676 M90,620 L90,676 M100,620 L100,676'), P(arches(47, 700, 3, 14, 20, 20)), P(arches(8, 662, 3, 8, 22, 11) + ' ' + arches(117, 662, 3, 8, 22, 11) + ' ' + arches(8, 694, 3, 8, 22, 11) + ' ' + arches(117, 694, 3, 8, 22, 11))], win: keep(rng, [[12, 654], [23, 654], [34, 654], [121, 654], [132, 654], [143, 654], [12, 686], [23, 686], [34, 686], [121, 686], [132, 686], [143, 686], [55, 648], [65, 648], [75, 648], [85, 648], [95, 648]], 0.2) }),
  'marco-zero-equador': () => ({ x0: 0, x1: 44, top: [22, 520], els: [P('M4,700 L4,692 L40,692 L40,700'), P('M10,692 L16,520 L28,520 L34,692 Z', 'a'), C(22, 546, 6)], win: [] }),
  'caixas-dagua-madeira-mamore': () => {
    const t = cx => [R(cx - 12, 560, 24, 36, 'b'), P(`M${cx - 12},560 L${cx},548 L${cx + 12},560`), P(`M${cx - 10},596 L${cx - 14},700 M${cx + 10},596 L${cx + 14},700 M${cx - 10.3},604 L${cx + 11.7},640 M${cx + 10.3},604 L${cx - 11.7},640 M${cx - 11.7},640 L${cx + 11.7},640 M${cx - 12},646 L${cx + 13.6},694 M${cx + 12},646 L${cx - 13.6},694`)];
    return { x0: 0, x1: 110, top: [55, 548], els: [...t(18), ...t(55), ...t(92)], win: [[18, 578], [55, 578], [92, 578]] };
  },
  'ponte-rio-negro': (rng) => {
    let cab = ''; for (let i = 0; i < 8; i++) { const y = 526 + i * 9, k = (700 - y) / 180 * 10; cab += `M${f(136 + k)},${y} L${14 + i * 14},672 M${f(164 - k)},${y} L${286 - i * 14},672 `; }
    const lights = []; for (let x = 15; x <= 290; x += 25) lights.push([x, 667]);
    return { x0: 0, x1: 300, top: [150, 510], els: [P('M0,672 L300,672 M0,678 L300,678'), P('M136,700 L146,520 L150,510 L154,520 L164,700'), P('M139.5,640 L160.5,640'), P(cab.trim()), P('M40,678 L40,700 M80,678 L80,700 M220,678 L220,700 M260,678 L260,700')], win: keep(rng, lights, 0.25) };
  },
  'monte-roraima': () => ({ x0: 0, x1: 320, top: [160, 560], els: [P('M0,700 C30,690 50,670 60,640 L70,600 L72,566 L80,562 L120,561 L126,565 L180,560 L240,560 L250,566 L254,600 L264,640 C274,672 290,690 320,700', 'a'), P('M90,566 L88,612 M130,566 L128,604 M190,562 L193,606 M226,562 L229,614 M108,563 L107,590 M160,561 L160,596')], win: [] }),
  'floresta': (rng, o) => {
    const w = o.w || 210, side = o.side || 'left'; const hAt = x => { const u = side === 'left' ? 1 - x / w : x / w; return 40 + u * 100; };
    const d = canopyD(rng, 0, w, hAt); const ex = side === 'left' ? w * 0.3 : w * 0.7; const eh = hAt(ex) + 44;
    let tr = ''; for (let i = 0; i < 7; i++) { const x = 10 + rng() * (w - 20); tr += `M${f(x)},700 L${f(x)},${f(700 - 6 - rng() * 8)} `; }
    return { x0: 0, x1: w, top: [ex, 700 - eh - 18], els: [P(d, 'a'), P(`M${f(ex - 34)},${f(700 - eh)} C${f(ex - 24)},${f(700 - eh - 22)} ${f(ex + 24)},${f(700 - eh - 22)} ${f(ex + 34)},${f(700 - eh)} Z`, 'a'), P(`M${f(ex)},${f(700 - eh)} L${f(ex)},${f(700 - hAt(ex) + 6)}`), P(tr.trim())], win: [] };
  },
  // ---------- Sul ----------
  'araucarias': (rng, o) => { const tr = o.side === 'right' ? [[56, 120], [108, 150], [166, 190]] : [[56, 190], [114, 150], [166, 120]]; return { x0: 0, x1: 224, top: [tr[0][0], 700 - tr[0][1]], els: tr.map(([x, h]) => P(arauc(x, h))), win: [] }; },
  'cataratas-iguacu': (rng) => { let d = ''; for (let x = 8; x <= 122; x += 5) { const y0 = x > 40 && x < 90 ? 612 : 606; d += `M${x},${y0} L${x},${f(Math.min(694, y0 + 40 + rng() * 50))} `; } return { x0: 0, x1: 130, top: [65, 604], els: [P('M0,700 L0,604 L40,604 L46,610 L84,610 L90,604 L130,604 L130,700'), P(d.trim()), P('M8,698 a8,5 0 0 1 16,0 M40,698 a10,6 0 0 1 20,0 M76,698 a9,5 0 0 1 18,0 M106,698 a8,5 0 0 1 16,0')], win: [] }; },
  'estufa-jardim-botanico': (rng) => ({ x0: 0, x1: 160, top: [80, 582], els: [R(0, 656, 50, 44, 'b'), P('M0,656 C10,640 40,640 50,656'), R(110, 656, 50, 44, 'b'), P('M110,656 C120,640 150,640 160,656'), R(50, 640, 60, 60, 'b'), P('M50,640 C50,600 110,600 110,640', 'd'), P('M65,616 C62,624 62,632 62,640 M95,616 C98,624 98,632 98,640 M80,610 L80,640'), R(74, 598, 12, 14), P('M74,598 L80,590 L86,598 M80,590 L80,582'), P('M10,656 L10,700 M20,656 L20,700 M30,656 L30,700 M40,656 L40,700 M120,656 L120,700 M130,656 L130,700 M140,656 L140,700 M150,656 L150,700 M60,640 L60,700 M70,640 L70,700 M80,640 L80,700 M90,640 L90,700 M100,640 L100,700 M0,678 L160,678')], win: keep(rng, [[15, 668], [35, 668], [125, 668], [145, 668], [65, 660], [95, 660], [85, 690], [25, 690], [135, 690]], 0.3) }),
  'opera-de-arame': (rng) => {
    let tubes = ''; for (let x = 28; x <= 172; x += 12) tubes += `M${x},622 L${x},700 `;
    let ribs = ''; for (const bx of [32, 56, 80, 120, 144, 168]) ribs += `M100,490 Q${f(100 + (bx - 100) * 1.05)},${bx < 60 || bx > 140 ? 530 : 515} ${bx},620 `;
    return { x0: 0, x1: 200, top: [100, 456], glow: [100, 449], els: [P('M20,700 L20,620 L180,620 L180,700', 'b'), P('M20,640 L180,640'), P(tubes.trim()), P('M10,620 C20,520 70,490 100,488 C130,490 180,520 190,620 Z', 'd'), P(ribs.trim()), R(95, 472, 10, 16), P('M100,472 L100,456')], win: keep(rng, grid(34, 656, 12, 3, 12, 14), 0.4) };
  },
  'usina-gasometro': (rng) => ({ x0: 0, x1: 150, top: [134, 430], els: [R(0, 640, 118, 60, 'a'), P('M0,640 L20,624 L98,624 L118,640'), P(arches(8, 690, 8, 8, 20, 13)), P('M124,700 L128,438 L140,438 L144,700 Z', 'b'), R(125, 430, 18, 8), P('M127.5,470 L140.5,470 M126.7,520 L141.3,520')], win: keep(rng, grid(12, 681, 8, 1, 13, 0), 0.2) }),
  'catedral-porto-alegre': () => ({ x0: 0, x1: 140, top: [70, 512], els: [P('M34,700 L34,610 L106,610 L106,700', 'a'), P('M34,610 L70,596 L106,610'), R(50, 572, 40, 22), P('M46,572 C48,528 92,528 94,572', 'd'), R(66, 526, 8, 14), P('M70,526 L70,512 M65,518 L75,518'), R(10, 560, 24, 140, 'b'), R(106, 560, 24, 140, 'b'), P('M10,560 C10,544 34,544 34,560 M106,560 C106,544 130,544 130,560', 'd'), P('M22,548 L22,536 M118,548 L118,536'), P('M60,700 L60,686 A10,10 0 0 1 80,686 L80,700'), C(70, 632, 7), P(arches(16, 600, 1, 12, 18, 0) + ' ' + arches(112, 600, 1, 12, 18, 0))], win: [[22, 630], [118, 630], [22, 656], [118, 656], [46, 650], [94, 650], [46, 676], [94, 676]] }),
  'ruinas-sao-miguel': () => ({ x0: 0, x1: 150, top: [135, 552], els: [P('M0,700 L0,640 L10,640 L10,600 L28,600 L36,590 L44,594 L52,586 L80,586 L86,594 L96,592 L110,600 L110,640 L120,640 L120,700', 'a'), P(arches(5, 700, 5, 16, 40, 22)), P('M0,646 L120,646'), P('M48,640 L48,612 A7,7 0 0 1 62,612 L62,640'), R(120, 560, 30, 140, 'b'), P('M120,560 L126,552 L144,552 L150,560'), P(arches(127, 600, 1, 16, 24, 0)), P('M20,610 L24,622 L21,630 M96,606 L92,618')], win: [] }),
  // ---------- Centro-Oeste ----------
  'catedral-brasilia': () => { let cols = ''; for (let i = 0; i <= 8; i++) { const u = i / 4 - 1; cols += `M${f(60 + u * 60)},700 Q${f(60 + u * 16)},630 ${f(60 + u * 54)},562 L${f(60 + u * 58)},552 `; } return { x0: 0, x1: 120, top: [60, 540], els: [P('M0,700 Q44,630 6,562 L114,562 Q76,630 120,700 Z', 'b!'), P(cols.trim()), P('M60,600 L60,544 M53,552 L67,552')], win: [] }; },
  'palacio-da-alvorada': () => { let cols = ''; for (let i = 0; i < 7; i++) { const x = 22 + i * 36; cols += `M${x - 16},640 C${x - 12},660 ${x - 3},680 ${x},700 C${x + 3},680 ${x + 12},660 ${x + 16},640 `; } const win = []; for (let i = 0; i < 6; i++) win.push([40 + i * 36, 668], [40 + i * 36, 654]); return { x0: 0, x1: 260, top: [130, 630], els: [R(16, 640, 228, 40, 'a'), R(0, 630, 260, 10), P(cols.trim(), 'd')], win }; },
  'ponte-jk': () => { let arc = '', hang = ''; for (let i = 0; i < 3; i++) { const x0 = 15 + i * 90, cx = x0 + 45; arc += `M${x0},700 Q${cx},540 ${x0 + 90},700 `; for (let t = 0.2; t < 0.81; t += 0.1) { const x = x0 + 90 * t, y = 700 - 2 * t * (1 - t) * 160; if (y < 666) hang += `M${f(x)},${f(y)} L${f(x + 8)},668 `; } } return { x0: 0, x1: 300, top: [150, 620], els: [P('M0,668 L300,668 M0,675 L300,675'), P(arc.trim()), P(hang.trim())], win: [] }; },
  'chapada-dos-guimaraes': () => ({ x0: 0, x1: 220, top: [62, 590], els: [P('M0,700 L10,680 L24,660 L30,620 L34,592 L90,590 L94,598 L150,596 L158,604 L190,604 L196,630 L206,670 L220,700', 'a'), P('M36,612 L80,612 M40,632 L72,632 M160,622 L188,622 M154,644 L196,644'), P('M92,600 L92,662 M96,600 L96,666'), P('M84,670 a6,4 0 0 1 12,0 M94,672 a6,4 0 0 1 12,0')], win: [] }),
  'tuiuiu-pantanal': () => ({ x0: 0, x1: 152, top: [45, 520], els: [P('M33,561 C38,557 52,557 57,562 C52,566 38,566 33,561 Z', 'd'), P('M33,561 L18,557'), C(16, 556, 2.5), P('M14,556 L2,559'), P('M57,563 L84,566 M57,564 L82,570'), P('M40,559 C42,540 56,526 76,520 C68,532 60,546 52,560'), P('M42,559 C36,544 24,534 6,530 C18,540 28,550 36,560'), P(palm(104, 74, 4)), P('M10,700 L13,690 M14,700 L14,688 M18,700 L15,690 M60,700 L63,692 M64,700 L64,690 M68,700 L65,692')], win: [] }),
  // ---------- Natureza ----------
  'morro-dois-irmaos': () => ({ x0: 0, x1: 230, top: [90, 422], glow: [118, 446], els: [P('M0,700 C35,690 55,600 68,520 C76,460 82,424 90,422 C100,420 106,452 110,486 C113,505 115,518 118,520 C121,516 124,500 127,482 C132,452 138,428 148,428 C158,428 164,466 172,530 C182,610 200,690 230,700', 'a'), P('M40,690 C55,660 62,620 68,580 M190,690 C178,650 172,610 168,570')], win: [] }),
  'dunas-lencois': () => ({ x0: 0, x1: 260, top: [195, 646], els: [P('M0,700 C25,680 55,656 85,656 C105,656 118,668 128,676 C145,660 170,646 195,646 C225,646 245,680 260,700', 'd'), P('M85,656 C93,672 97,688 100,700 M195,646 C201,666 206,686 210,700'), P('M30,696 L62,696 M140,697 L170,697 M222,697 L240,697')], win: [] }),
  // ---------- Boston ----------
  'zakim-bridge': () => { const tw = cx => P(`M${cx - 14},700 L${cx - 4},610 L${cx - 3},520 L${cx},500 L${cx + 3},520 L${cx + 4},610 L${cx + 14},700 M${cx - 7},700 L${cx},630 L${cx + 7},700`); let cab = ''; for (const cx of [70, 190]) for (let i = 0; i < 6; i++) { const y = 528 + i * 12; cab += `M${cx - 3},${y} L${cx - 60 + i * 8},668 M${cx + 3},${y} L${cx + 60 - i * 8},668 `; } return { x0: 0, x1: 260, top: [70, 500], els: [P('M0,668 L260,668 M0,675 L260,675'), tw(70), tw(190), P(cab.trim())], win: [[70, 494], [190, 494]] }; },
  'custom-house': (rng) => ({ x0: 0, x1: 60, top: [30, 422], els: [R(0, 640, 60, 60, 'a'), R(14, 470, 32, 170, 'b'), R(12, 462, 36, 8), P('M14,462 L30,432 L46,462 M30,432 L30,422'), C(30, 486, 7)], win: [...keep(rng, grid(20, 504, 3, 14, 10, 9), 0.25), ...keep(rng, grid(7, 652, 6, 3, 9.5, 14), 0.3)] }),
  'prudential-tower': (rng) => ({ x0: 0, x1: 54, top: [27, 350], els: [R(2, 420, 50, 280, 'a'), R(10, 404, 34, 16), P('M27,404 L27,350'), P('M14,428 L14,700 M40,428 L40,700')], win: keep(rng, grid(8, 430, 5, 29, 9.5, 9), 0.3) }),
  'hancock-tower': (rng) => ({ x0: 0, x1: 48, top: [24, 396], els: [P('M0,700 L0,396 L20,396 L24,404 L28,396 L48,396 L48,700', 'b'), P('M24,404 L24,700')], win: keep(rng, [...grid(6, 410, 2, 32, 9, 9), ...grid(33, 410, 2, 32, 9, 9)], 0.45) }),
  'harvard-memorial-hall': (rng) => ({ x0: 0, x1: 220, top: [170, 430], els: [R(0, 620, 150, 80, 'a'), P('M0,620 L20,596 L130,596 L150,620'), P(arches(10, 684, 7, 10, 34, 20)), R(152, 520, 36, 180, 'b'), R(156, 490, 28, 30), P('M154,490 L170,430 L186,490 Z', 'd'), P('M152,520 L152,506 M188,520 L188,506 M170,430 L170,420'), P(arches(162, 516, 2, 7, 20, 9)), R(188, 640, 32, 60, 'a'), P('M188,640 L204,626 L220,640'), C(204, 662, 7)], win: [...keep(rng, grid(162, 540, 2, 14, 16, 11), 0.25), ...keep(rng, grid(15, 608, 6, 1, 20, 0), 0.2)] }),
  'harvard-memorial-church': (rng) => ({ x0: 0, x1: 140, top: [70, 434], els: [R(0, 620, 140, 80, 'a'), P('M36,620 L70,598 L104,620 Z', 'd'), P('M44,620 L44,700 M56,620 L56,700 M84,620 L84,700 M96,620 L96,700'), R(56, 562, 28, 36, 'b'), R(60, 528, 20, 34), P(arches(65, 556, 1, 10, 20, 0)), R(63, 506, 14, 22), P('M63,506 L70,446 L77,506 Z', 'd'), P('M70,446 L70,434'), P(arches(8, 690, 2, 10, 40, 14) + ' ' + arches(108, 690, 2, 10, 40, 14))], win: keep(rng, [[13, 640], [27, 640], [113, 640], [127, 640], [70, 576], [70, 516]], 0.1) }),
  'harvard-widener': (rng) => { let cols = ''; for (let x = 42; x <= 138; x += 16) cols += `M${x},612 L${x},692 `; return { x0: -4, x1: 184, top: [90, 580], els: [R(0, 600, 180, 100, 'a'), R(-4, 592, 188, 8), R(30, 580, 120, 12, 'b'), P('M20,700 L28,692 L152,692 L160,700'), P('M34,606 L146,606'), P(cols.trim(), 'd')], win: [...keep(rng, grid(8, 616, 2, 5, 10, 15), 0.2), ...keep(rng, grid(162, 616, 2, 5, 10, 15), 0.2)] }; },
  'harvard-eliot-house': (rng) => ({ x0: 0, x1: 100, top: [50, 500], els: [R(0, 620, 100, 80, 'a'), P('M0,620 L8,612 L92,612 L100,620'), R(36, 560, 28, 52, 'b'), R(40, 530, 20, 30), P('M40,530 C40,512 60,512 60,530', 'd'), P('M50,515 L50,500'), P(arches(45, 556, 1, 10, 18, 0))], win: [...keep(rng, grid(7, 632, 3, 4, 9, 16), 0.2), ...keep(rng, grid(75, 632, 3, 4, 9, 16), 0.2), [50, 580], [50, 596]] }),
  'mit-green-building': (rng) => ({ x0: 0, x1: 60, top: [30, 402], els: [R(6, 430, 48, 270, 'a'), C(30, 416, 14, 'd'), P('M22,428 L22,430 M38,428 L38,430'), P('M6,690 L54,690')], win: keep(rng, grid(12, 440, 5, 25, 9, 10), 0.3) }),
  'mit-stata-center': () => ({ x0: 0, x1: 110, top: [60, 560], els: [P('M0,700 L4,620 L30,600 L40,640 L60,560 L84,580 L80,640 L100,630 L110,700', 'b'), P('M40,640 L44,700 M60,560 L66,700 M80,640 L84,700'), P('M84,580 L74,604 L82,614')], win: [[20, 650], [30, 670], [70, 610], [96, 664]] }),
  'longfellow-bridge': (rng) => { let ar = ''; for (let i = 0; i < 5; i++) { const x = i * 60; ar += `M${x},700 Q${x + 30},674 ${x + 60},700 `; } const lights = []; for (let x = 15; x <= 290; x += 25) lights.push([x, 659]); const tw = cx => [R(cx - 8, 618, 16, 46, 'b'), P(`M${cx - 8},618 L${cx},598 L${cx + 8},618`)]; return { x0: 0, x1: 300, top: [120, 598], els: [P('M0,664 L300,664 M0,670 L300,670'), P(ar.trim()), ...tw(120), ...tw(180)], win: [...keep(rng, lights, 0.3), [120, 634], [180, 634]] }; },
  'boston-light': () => ({ x0: 0, x1: 50, top: [25, 560], els: [P('M0,700 C8,688 14,684 22,684 L30,684 C38,684 44,690 50,700', 'a'), P('M16,684 L20,592 L30,592 L34,684 Z', 'b'), P('M15,592 L35,592 M17.5,640 L32.5,640'), R(19, 576, 12, 16, 'd'), P('M18,576 L25,566 L32,576 M25,566 L25,560')], win: [[25, 584], [25, 616], [25, 662]] }),
  'veleiro': () => ({ x0: 0, x1: 70, top: [32, 598], els: [P('M0,690 L70,690 L60,700 L10,700 Z', 'b'), P('M32,690 L32,598'), P('M35,602 L35,684 L64,684 Z', 'd'), P('M29,612 L6,684 L29,684 Z', 'a')], win: [] }),
  'ondas-mar': () => ({ x0: 0, x1: 90, top: [45, 684], els: [P('M0,696 q7.5,-8 15,0 t15,0 t15,0'), P('M42,688 q7.5,-8 15,0 t15,0 t15,0')], win: [] }),
  'mit-great-dome': (rng) => { let cols = ''; for (let x = 66; x <= 114; x += 8) cols += `M${x},618 L${x},694 `; return { x0: 0, x1: 180, top: [90, 550], glow: [90, 543], els: [R(0, 632, 60, 68, 'a'), R(120, 632, 60, 68, 'a'), P('M0,640 L60,640 M120,640 L180,640'), P('M56,700 L56,694 L124,694 L124,700'), P(cols.trim()), R(60, 606, 60, 12, 'b'), R(64, 596, 52, 10), R(68, 584, 44, 12), P('M64,584 C68,556 84,550 90,550 C96,550 112,556 116,584 Z', 'd'), P('M65.5,576 L114.5,576 M68,568 L112,568')], win: keep(rng, [...grid(8, 650, 6, 3, 9, 14), ...grid(128, 650, 6, 3, 9, 14)], 0.25) }; },
};

function fundoGen(rng, type, Wd) {
  const els = [], win = []; let x = 30; const types = type.split('+'); let i = 0;
  while (x < Wd - 60) {
    const t = types[i++ % types.length];
    if (t === 'cidade') { const w = 26 + rng() * 28, h = 90 + rng() * 150; els.push(R(x, H - h, w, h)); if (rng() < .3) els.push(P(`M${f(x + w / 2)},${f(H - h)} L${f(x + w / 2)},${f(H - h - 24)}`)); else if (rng() < .3) els.push(R(x + 5, H - h - 12, w - 10, 12)); for (let yy = H - h + 10; yy < H - 8; yy += 11) for (let xx = x + 6; xx < x + w - 4; xx += 8) if (rng() > .6) win.push([xx, yy]); x += w + 4 + rng() * 26; }
    else if (t === 'baixa') { const w = 30 + rng() * 40, h = 40 + rng() * 60; els.push(R(x, H - h, w, h)); for (let yy = H - h + 10; yy < H - 8; yy += 11) for (let xx = x + 6; xx < x + w - 4; xx += 8) if (rng() > .6) win.push([xx, yy]); x += w + 2 + rng() * 14; }
    else if (t === 'morros') { const w = 170 + rng() * 140, h = 80 + rng() * 110; els.push(P(`M${f(x)},700 C${f(x + w * .3)},${f(H - h * .9)} ${f(x + w * .4)},${f(H - h)} ${f(x + w * .5)},${f(H - h)} C${f(x + w * .6)},${f(H - h)} ${f(x + w * .75)},${f(H - h * .6)} ${f(x + w)},700`)); x += w * .9; }
    else if (t === 'floresta') { const w = 160 + rng() * 80; const hb = 50 + rng() * 50; els.push(P(canopyD(rng, x, w, () => hb))); x += w + 10; }
    else if (t === 'coqueiros') { els.push(P(palm(x + 30, 90 + rng() * 60, (rng() - .5) * 16))); x += 60 + rng() * 50; }
    else if (t === 'araucarias') { els.push(P(arauc(x + 55, 120 + rng() * 70))); x += 100 + rng() * 40; }
  }
  return { x0: 0, x1: Wd, top: [Wd / 2, 500], els, win };
}

const REGIONS = {
  'a-brasil-panorama': { nome: 'A · Brasil Panorama', left: ['pao-de-acucar', 'masp', 'edificio-copan', 'elevador-lacerda'], hero: 'congresso-nacional', right: ['ponte-dos-ingleses', 'estatua-iracema', 'teatro-amazonas', 'ponte-hercilio-luz'], prio: ['pao-de-acucar', 'teatro-amazonas', 'elevador-lacerda', 'ponte-hercilio-luz', 'edificio-copan', 'masp', 'ponte-dos-ingleses', 'estatua-iracema'], extras: ['cristo-redentor', 'farol-da-barra', 'opera-de-arame', 'catedral-brasilia'], fundo: 'cidade+morros' },
  'b-sudeste': { nome: 'B · Sudeste', left: ['igreja-ouro-preto', 'igreja-pampulha', 'edificio-italia', 'edificio-copan', 'ponte-estaiada'], hero: 'cristo-redentor', heroK: 1.1, right: ['pao-de-acucar', 'arcos-da-lapa', 'museu-do-amanha', 'convento-da-penha'], prio: ['pao-de-acucar', 'edificio-copan', 'igreja-ouro-preto', 'museu-do-amanha', 'arcos-da-lapa', 'ponte-estaiada', 'igreja-pampulha', 'edificio-italia', 'convento-da-penha'], extras: ['masp'], fundo: 'cidade+morros' },
  'c-nordeste': { nome: 'C · Nordeste', left: ['casario-sao-luis', 'catedral-fortaleza', 'ponte-dos-ingleses', 'estatua-iracema', 'jangadas', ['elevador-lacerda', 'casario-pelourinho']], hero: 'farol-da-barra', right: ['igrejas-olinda', 'marco-zero-recife', 'farol-cabo-branco', 'forte-reis-magos', 'morro-do-careca', 'coqueiros'], prio: ['elevador-lacerda', 'igrejas-olinda', 'ponte-dos-ingleses', 'estatua-iracema', 'catedral-fortaleza', 'farol-cabo-branco', 'forte-reis-magos', 'jangadas', 'casario-sao-luis', 'morro-do-careca', 'marco-zero-recife', 'coqueiros'], keep: ['estatua-iracema'], fundo: 'baixa+coqueiros' },
  'd-norte': { nome: 'D · Norte', left: ['marco-zero-equador', 'ver-o-peso', 'theatro-da-paz'], hero: 'teatro-amazonas', heroK: 1.45, right: ['ponte-rio-negro', 'caixas-dagua-madeira-mamore'], prio: ['ver-o-peso', 'ponte-rio-negro', 'theatro-da-paz', 'marco-zero-equador', 'caixas-dagua-madeira-mamore'], edgeL: { n: 'floresta', o: { side: 'left', w: 210 } }, edgeR: { n: 'floresta', o: { side: 'right', w: 210 } }, back: [{ n: 'monte-roraima', at: 0.24, k: 1.3 }], river: true, fundo: 'floresta' },
  'e-sul': { nome: 'E · Sul', left: ['ruinas-sao-miguel', 'usina-gasometro', 'catedral-porto-alegre'], hero: 'opera-de-arame', heroK: 1.15, right: ['estufa-jardim-botanico', 'ponte-hercilio-luz'], prio: ['ponte-hercilio-luz', 'estufa-jardim-botanico', 'usina-gasometro', 'ruinas-sao-miguel', 'catedral-porto-alegre'], edgeL: { n: 'araucarias', o: { side: 'left' } }, edgeR: [{ n: 'cataratas-iguacu' }, { n: 'araucarias', o: { side: 'right' } }], fundo: 'morros+araucarias' },
  'f-centro-oeste': { nome: 'F · Centro-Oeste', left: ['chapada-dos-guimaraes', 'tuiuiu-pantanal', 'casario-goias'], hero: 'congresso-nacional', right: ['catedral-brasilia', 'palacio-da-alvorada', 'ponte-jk'], prio: ['catedral-brasilia', 'palacio-da-alvorada', 'ponte-jk', 'chapada-dos-guimaraes', 'tuiuiu-pantanal', 'casario-goias'], fundo: 'baixa+cidade' },
  'g-brasil-natureza': { nome: 'G · Brasil Natureza', left: ['pao-de-acucar', 'coqueiros', 'dunas-lencois'], hero: 'morro-dois-irmaos', right: ['jangadas', 'morro-do-careca', 'coqueiros', 'monte-roraima'], prio: ['pao-de-acucar', 'monte-roraima', 'dunas-lencois', 'jangadas', 'morro-do-careca', 'coqueiros'], opts: { 'pao-de-acucar': { cable: false } }, stars: true, fundo: 'morros+coqueiros' },
  'h-boston-brasil': { nome: 'H · Boston ↔ Brasil', split: 0.24, center: ['boston-light', 'ondas-mar', 'veleiro', 'ondas-mar', 'jangadas'], left: ['zakim-bridge', 'custom-house', 'prudential-tower', 'hancock-tower', 'mit-great-dome'], right: ['congresso-nacional', 'cristo-redentor', 'teatro-amazonas', 'elevador-lacerda'], routeFrom: 'mit-great-dome', routeTo: 'congresso-nacional', keep: ['mit-great-dome', 'congresso-nacional'], prio: ['mit-great-dome', 'congresso-nacional', 'cristo-redentor', 'prudential-tower', 'zakim-bridge', 'teatro-amazonas', 'custom-house', 'hancock-tower', 'elevador-lacerda'], opts: { 'mit-great-dome': { k: 1.5 } }, fundo: 'cidade' },
  'i-boston': { nome: 'I · Boston', left: ['harvard-eliot-house', 'harvard-widener', 'harvard-memorial-church', 'harvard-memorial-hall'], hero: 'mit-great-dome', heroK: 1.5, right: ['mit-green-building', 'longfellow-bridge', 'prudential-tower', 'hancock-tower', 'custom-house', 'zakim-bridge'], keep: ['harvard-memorial-hall', 'harvard-memorial-church', 'mit-green-building'], opts: { 'harvard-memorial-hall': { k: 1.3 }, 'harvard-memorial-church': { k: 1.15 } }, prio: ['harvard-memorial-hall', 'harvard-memorial-church', 'mit-green-building', 'prudential-tower', 'zakim-bridge', 'harvard-widener', 'longfellow-bridge', 'hancock-tower', 'custom-house', 'harvard-eliot-house'], extras: ['mit-stata-center'], fundo: 'cidade' },
};
for (const k in REGIONS) REGIONS[k].id = k;

const FORMATS = {
  '16x9': { nome: '16:9', w: 1920, h: 1080, y: 700, s: 1, sMin: 0.68 },
  '1x1': { nome: '1:1', w: 1080, h: 1080, y: 720, s: 0.92, sMin: 0.82 },
  '4x5': { nome: '4:5', w: 1080, h: 1350, y: 880, s: 0.92, sMin: 0.82 },
  '3x1': { nome: '3:1', w: 1920, h: 640, y: 452, s: 0.8, sMin: 0.8 },
};
const BASE = { bg: '#0D6139', bgType: 'panels', panelFill: '#FFFFFF', grain: .22, grainBlend: 'overlay', st: '#34D27F', win: '#EDE58A', route: '#EDE58A', glow: '#EDE58A', halo: true, fills: null, reflect: true, ring: false, sky: false };
const ALPHA = { bg: null, bgType: null, grain: 0, st: '#FFFFFF', win: '#FFFFFF', route: '#FFFFFF', glow: '#FFFFFF', halo: false, alpha: true, ring: true };
const STYLES = {
  'original': { nome: 'Original' },
  'amarelo': { nome: 'Amarelo', bg: '#FBF59A', bgType: 'waves', waves: ['#C6F29B', '#DCE29E'], grain: .14, st: '#0B4A2E', fills: { a: '#3DDC84', b: '#2B86D9', c: '#0B4A2E', d: '#2B86D9' }, win: '#0B4A2E', route: '#0B4A2E', glow: '#3DDC84', ring: true, sky: true, reflect: false },
  'azul': { nome: 'Azul', bg: '#1C5FC4', bgType: 'waves', waves: ['#2B70D6', '#1853B0'], grain: .18, st: '#FFF3A0', fills: { a: '#12A05A', b: '#0E3A80', c: '#0E3A80', d: '#F4E46A' }, win: '#FFF3A0', route: '#FFF3A0', glow: '#F4E46A', ring: true, sky: true, reflect: false },
  'verde-colorido': { nome: 'Verde colorido', fills: { a: '#1A8A52', b: '#2B86D9', c: '#0A4A2B', d: '#EDE58A' }, ring: true },
  'alpha': Object.assign({ nome: 'Branco (traço)' }, ALPHA),
  'alpha-sem-arco': Object.assign({ nome: 'Alpha sem arco' }, ALPHA, { route: null }),
  'noite-azul': { nome: 'Noite azul', bg: '#0A2A3F', st: '#3FD6E0', win: '#FFC85A', route: '#FFC85A', glow: '#FFC85A' },
  'bandeira': { nome: 'Bandeira', bg: '#0B6B3A', st: '#FFD54A', win: '#FFFFFF', route: '#4A90E2', glow: '#FFD54A' },
  'positivo-claro': { nome: 'Positivo claro', bg: '#F4F1E8', panelFill: '#0B5A36', st: '#0B5A36', win: '#34D27F', route: '#0B5A36', glow: '#34D27F', grain: .55 },
  'amanhecer': { nome: 'Amanhecer', sun: true },
  'convergencia': { nome: 'Convergência', converge: true },
  'minimal': { nome: 'Minimal', minimal: true },
  'maximal': { nome: 'Maximal', maximal: true },
  'sem-reflexo': { nome: 'Sem reflexo', reflect: false, ground: true },
};

function layout(reg, Wd, st, fm) {
  const mk = e => {
    const arr = Array.isArray(e) ? e : [e];
    const parts = arr.map(p => { const n = typeof p === 'string' ? p : p.n; const o = Object.assign({}, (reg.opts && reg.opts[n]) || {}, (typeof p === 'object' && p.o) || {}); if (!LIB[n]) throw new Error('LIB sem ' + n); const g = LIB[n](RNG(seedOf(reg.id + ':' + n + ':' + (o.side || ''))), o); const k = o.k || 1; return { n, o, g, k, w: (g.x1 - g.x0) * k }; });
    return { key: parts[0].n, parts, w: parts.reduce((a, p) => a + p.w, 0) };
  };
  let L = reg.left.map(mk), Rr = reg.right.map(mk);
  const hero = reg.hero ? mk({ n: reg.hero, o: { k: reg.heroK || 1 } }) : null;
  const keepSet = new Set([...(reg.keep || []), reg.hero].filter(Boolean));
  if (st.minimal) { const allowed = new Set(reg.prio.filter(k => k !== reg.hero).slice(0, reg.hero ? 4 : 5)); keepSet.forEach(k => allowed.add(k)); L = L.filter(i => allowed.has(i.key)); Rr = Rr.filter(i => allowed.has(i.key)); }
  if (st.maximal && reg.extras) reg.extras.forEach((n, i) => { const it = mk(n); if (i % 2 === 0) L.unshift(it); else Rr.push(it); });
  const gap0 = st.maximal ? 8 : 24, sMin = st.maximal ? fm.sMin - 0.12 : fm.sMin;
  const eL = reg.edgeL ? mk(reg.edgeL) : null, eR = reg.edgeR ? mk(reg.edgeR) : null;
  const mL = eL ? eL.w + 16 : 70, mR = eR ? eR.w + 16 : 70;
  const sum = a => a.reduce((s, i) => s + i.w, 0);
  let s, availL, availR;
  for (;;) {
    if (reg.split) { const cg = reg.split * Wd; availL = Wd / 2 - cg / 2 - mL; availR = Wd / 2 - cg / 2 - mR; s = Math.min(1, availL / (sum(L) + Math.max(0, L.length - 1) * gap0), availR / (sum(Rr) + Math.max(0, Rr.length - 1) * gap0)); }
    else { availL = Wd / 2 - mL; availR = Wd / 2 - mR; const need = a => hero.w / 2 + sum(a) + a.length * gap0; s = Math.min(1, availL / need(L), availR / need(Rr)); }
    if (s >= sMin) break;
    const present = [...L, ...Rr].map(i => i.key).filter(k => !keepSet.has(k)); if (!present.length) break;
    const victim = [...reg.prio].reverse().find(k => present.includes(k)) || present[present.length - 1];
    L = L.filter(i => i.key !== victim); Rr = Rr.filter(i => i.key !== victim);
  }
  const placed = [], ids = {};
  const put = (item, x, sc, isHero) => { for (const p of item.parts) { let id = p.n + (p.o.side ? '-' + (p.o.side === 'left' ? 'esquerda' : 'direita') : ''); if (ids[id]) { ids[id]++; id += '-' + ids[id]; } else ids[id] = 1; placed.push({ n: p.n, id, g: p.g, sc: sc * p.k, tx: x, key: item.key, hero: !!isHero, side: 0 }); x += p.w * sc; } };
  if (reg.split) {
    const cg = reg.split * Wd;
    const gl = L.length > 1 ? (availL - s * sum(L)) / (L.length - 1) : 0; let x = L.length === 1 ? mL + (availL - s * L[0].w) / 2 : mL; for (const it of L) { put(it, x, s); x += it.w * s + gl; }
    const gr = Rr.length > 1 ? (availR - s * sum(Rr)) / (Rr.length - 1) : 0; x = Rr.length === 1 ? Wd / 2 + cg / 2 + (availR - s * Rr[0].w) / 2 : Wd / 2 + cg / 2; for (const it of Rr) { put(it, x, s); placed[placed.length - 1].side = 1; x += it.w * s + gr; }
    if (reg.center) { const Cc = reg.center.map(mk); const cs = Math.max(s, 0.85); const g = (cg - sum(Cc) * cs) / (Cc.length + 1); let cx2 = Wd / 2 - cg / 2 + g; for (const it of Cc) { put(it, cx2, cs); placed[placed.length - 1].side = 2; cx2 += it.w * cs + g; } }
  } else {
    const cx = Wd / 2; put(hero, cx - hero.w * s / 2, s, true);
    const side = (arr, avail, dir) => { if (!arr.length) return; let gap = (avail - s * (hero.w / 2 + sum(arr))) / arr.length; if (st.minimal) gap = Math.min(gap, 170); let cur = dir < 0 ? cx - hero.w * s / 2 : cx + hero.w * s / 2; const seq = dir < 0 ? [...arr].reverse() : arr; for (const it of seq) { if (dir < 0) { cur -= gap + it.w * s; put(it, cur, s); } else { cur += gap; put(it, cur, s); cur += it.w * s; } } };
    side(L, availL, -1); side(Rr, availR, 1);
  }
  if (eL) put(eL, 0, 1); if (eR) put(eR, Wd - eR.w, 1);
  placed.sort((a, b) => a.tx - b.tx);
  return { placed, s };
}

function renderMon(it, st, S, mode) {
  const k = S * it.sc;
  const tr = `translate(${f2(it.tx - it.g.x0 * it.sc)},${f2(700 * (1 - it.sc))}) scale(${f2(it.sc)})`;
  if (mode === 'mask') { let s = ''; for (const el of it.g.els) { const m = / data-f="[a-d]!?"/.test(el); let c = el.replace(/ data-f="[^"]*"/, '').replace(/ id="[^"]*"/, ''); if (m) c = c.replace(/^<(\w+)/, '<$1 fill="#000"'); s += c; } return `<g transform="${tr}" stroke-width="${f2(12 / k)}">${s}</g>`; }
  let fills = '', strokes = '';
  for (const el of it.g.els) {
    const m = el.match(/ data-f="([a-d])(!?)"/); const c = el.replace(/ data-f="[^"]*"/, '');
    if (m && st.fills && mode === 'front') { const o = f2(3 / k); fills += c.replace(/ id="[^"]*"/, '').replace(/^<(\w+)/, `<$1 class="preenchimento" fill="${st.fills[m[1]]}" stroke="none" transform="translate(${o},${o})"`); }
    if (!(m && m[2])) strokes += c;
  }
  const r = Math.min(1.7 / k, 2.6); let w = '';
  if (it.g.win.length) w = st.alpha ? `<g class="janelas" fill="none" stroke="${st.win}" stroke-width="${f2(2 * r)}">` + it.g.win.map(([x, y]) => `<path d="M${f(x)},${f(y)} h0"/>`).join('') + '</g>' : `<g class="janelas" fill="${st.win}" stroke="none">` + it.g.win.map(([x, y]) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f2(r)}"/>`).join('') + '</g>';
  return `<g id="${it.id}" class="monumento" transform="${tr}" stroke-width="${f2(2 / k)}">${fills}${strokes}${w}</g>`;
}

function curve(a, b, split, Hc) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  if (split) { const top = Math.max(24, Math.min(a[1], b[1]) - Math.abs(dx) * 0.45); return `M${f(a[0])},${f(a[1])} C${f(a[0] + dx * 0.2)},${f(top)} ${f(b[0] - dx * 0.2)},${f(top)} ${f(b[0])},${f(b[1])}`; }
  return `M${f(a[0])},${f(a[1])} C${f(a[0] + dx * 0.148)},${f(a[1] + dy * 0.342)} ${f(a[0] + dx * 0.449)},${f(a[1] + dy * 0.808)} ${f(b[0])},${f(b[1])}`;
}

function applyMods(st, m) {
  if (!m) return st;
  if (m.comp === 'minimal') { st.minimal = true; st.maximal = false; } else if (m.comp === 'maximal') { st.maximal = true; st.minimal = false; }
  if (m.semFundo) { st.bg = null; st.bgType = null; st.grain = 0; st.sky = false; }
  if (m.semReflexo) { st.reflect = false; st.ground = true; }
  if (m.semArco) st.route = null;
  if (m.sol) st.sun = true;
  if (m.converge) st.converge = true;
  return st;
}
function build(rid, sid, fid, mods) {
  const reg = REGIONS[rid], st = applyMods(Object.assign({}, BASE, STYLES[sid]), mods), fm = FORMATS[fid];
  const W = fm.w, Hc = fm.h, Y = fm.y, S = fm.s, Wd = W / S;
  const { placed } = layout(reg, Wd, st, fm);
  const toC = (it, p) => [(it.tx + (p[0] - it.g.x0) * it.sc) * S, Y + (p[1] - 700) * it.sc * S];
  const back = [];
  if (reg.back) for (const b of reg.back) { const g = LIB[b.n](RNG(seedOf(reg.id + b.n)), {}); const k = (b.k || 1); back.push({ n: b.n, id: b.n, g, sc: k, tx: b.at * Wd - (g.x1 - g.x0) * k / 2 }); }
  if (st.maximal && reg.fundo) back.unshift({ n: 'fundo', id: 'fundo-generico', g: fundoGen(RNG(seedOf(reg.id + 'fundo')), reg.fundo, Wd), sc: 1, tx: 0 });
  const heroIt = placed.find(p => p.hero) || placed.find(p => p.n === reg.routeFrom);
  const G = toC(heroIt, heroIt.g.glow || heroIt.g.top);
  let E; if (reg.routeTo) { const t = placed.find(p => p.n === reg.routeTo); E = toC(t, t.g.glow || t.g.top); } else E = [W - 60, Math.max(46, Hc * 0.088)];
  const routes = [];
  if (st.route) {
    if (st.converge) {
      const T = reg.split ? G : [W * 1.12, -Hc * 0.18];
      const cands = placed.filter(p => !p.hero && reg.prio.includes(p.key) && (!reg.split || p.side === 1) && p.n !== reg.routeFrom).sort((a, b) => reg.prio.indexOf(a.key) - reg.prio.indexOf(b.key)).slice(0, reg.split ? 4 : 4);
      if (!reg.split) routes.push({ a: G, b: T, main: true });
      for (const c of cands) routes.push({ a: toC(c, c.g.top), b: T });
    } else routes.push({ a: G, b: E, main: true, ring: st.ring });
  }
  const needMask = st.sun || back.length;
  let defs = '';
  if (st.grain) defs += `<filter id="filtro-grao" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>`;
  if (st.halo) defs += `<filter id="filtro-brilho" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="7"/></filter>`;
  const reflH = reg.river ? 66 * S : Hc - Y;
  defs += `<clipPath id="abaixo-horizonte"><rect x="0" y="${Y}" width="${W}" height="${f(reflH)}"/></clipPath><linearGradient id="fade-reflexo" gradientUnits="userSpaceOnUse" x1="0" y1="${Y}" x2="0" y2="${f(Y + reflH * 0.9)}"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="mascara-reflexo" maskUnits="userSpaceOnUse" x="0" y="${Y}" width="${W}" height="${f(reflH)}"><rect x="0" y="${Y}" width="${W}" height="${f(reflH)}" fill="url(#fade-reflexo)"/></mask>`;
  routes.forEach((r, i) => { const sfx = i ? '-' + i : ''; r.d = curve(r.a, r.b, !!reg.split, Hc); r.sfx = sfx; defs += `<mask id="rota-mascara${sfx}" maskUnits="userSpaceOnUse" x="-500" y="-500" width="${W + 1000}" height="${Hc + 1000}"><path id="rota-mascara-traco${sfx}" d="${r.d}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/></mask>`; });
  if (needMask) defs += `<mask id="mascara-frente" maskUnits="userSpaceOnUse" x="-300" y="-2000" width="${f(Wd + 600)}" height="4000"><rect x="-300" y="-2000" width="${f(Wd + 600)}" height="4000" fill="#fff"/><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">${placed.map(p => renderMon(p, st, S, 'mask')).join('')}</g></mask>`;
  if (st.sun) defs += `<clipPath id="acima-horizonte"><rect x="-300" y="-2000" width="${f(Wd + 600)}" height="2700"/></clipPath>`;
  let o = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${W} ${Hc}" width="${W}" height="${Hc}">\n<defs>${defs}</defs>\n`;
  if (st.bg) o += `<rect id="fundo" width="${W}" height="${Hc}" fill="${st.bg}"/>\n`;
  if (st.bgType === 'panels') o += `<g id="paineis-de-luz" fill="${st.panelFill}">` + [[.047, .111, .323, .519, .035], [.271, .037, .469, .648, .03], [.615, .167, .344, .481, .035], [.156, .278, .698, .444, .025]].map(([x, y, w, h, op]) => `<rect x="${f(x * W)}" y="${f(y * Hc)}" width="${f(w * W)}" height="${f(h * Hc)}" opacity="${op}"/>`).join('') + '</g>\n';
  if (st.bgType === 'waves') { let s = `<g id="ondas" fill="none" stroke-width="22" stroke-linecap="round">`; let i = 0; for (let y = -10; y <= Hc + 30; y += 92, i++) { let d = `M-150,${y} Q-75,${y - 28} 0,${y}`; for (let x = 150; x <= W + 180; x += 150) d += ` T${x},${y}`; s += `<path d="${d}" stroke="${st.waves[i % 2]}"/>`; } o += s + '</g>\n'; }
  if (st.sky) { const pts = [[.203, .139], [.271, .162], [.229, .204], [.052, .245], [.135, .315], [.396, .296], [.333, .343], [.448, .37], [.75, .231], [.833, .306], [.719, .389], [.896, .435], [.094, .435], [.615, .231]].filter(([x, y]) => y * Hc < Y - 300 * S || y < .3); let s = `<g id="ceu" fill="none" stroke="${st.st}" stroke-width="1.5" stroke-linecap="round" opacity="0.7">`; pts.forEach(([x, y], i) => { const r = i % 3 ? 4 : 6, X = f(x * W), Yy = f(y * Hc); s += `<path class="estrela" d="M${X},${Yy - r} L${X},${Yy + r} M${X - r},${Yy} L${X + r},${Yy}"/>`; }); const cx = W * .625, cy = Hc * .3; s += `<path id="nuvem" d="M${f(cx)},${f(cy)} l92,0 c6,-12 -6,-23 -19,-18 c-5,-17 -30,-19 -38,-4 c-10,-6 -24,0 -22,13 c-10,0 -14,6 -13,9 z"/>`; o += s + '</g>\n'; }
  if (reg.stars) { const rr = RNG(seedOf(rid + 'estrelas')); let s = ''; const y0 = Hc * 0.04, y1 = Math.max(y0 + 60, Y - 360 * S); for (let i = 0; i < 70; i++) { const x = rr() * W, y = y0 + rr() * (y1 - y0), r = 1.2 + rr() * 1.4; s += st.alpha ? `<path d="M${f(x)},${f(y)} h0" stroke-width="${f2(2 * r)}"/>` : `<circle cx="${f(x)}" cy="${f(y)}" r="${f2(r)}"/>`; } o += `<g id="estrelas" ${st.alpha ? `fill="none" stroke="${st.win}" stroke-linecap="round"` : `fill="${st.win}"`}>${s}</g>\n`; }
  if (st.reflect) o += `<g id="reflexo" clip-path="url(#abaixo-horizonte)" mask="url(#mascara-reflexo)"><use href="#cena" xlink:href="#cena" transform="matrix(1 0 0 -1 0 ${2 * Y})" opacity="0.13"/></g>\n`;
  if (reg.river) { const b = Y + 70 * S; const rr = RNG(seedOf(rid + 'rio')); let rp = ''; for (let i = 0; i < 34; i++) { const x = rr() * W, y = Y + (12 + rr() * 48) * S, l = (18 + rr() * 50) * S; rp += `M${f(x)},${f(y)} L${f(x + l)},${f(y)} `; } o += `<g id="rio" fill="none" stroke="${st.st}" stroke-linecap="round"><path id="margem" d="M0,${f(b)} C${f(W * .3)},${f(b - 6 * S)} ${f(W * .7)},${f(b + 8 * S)} ${W},${f(b + 2 * S)}" stroke-width="2"/><path id="ondas-rio" d="${rp.trim()}" stroke-width="1.4" opacity="0.55"/></g>\n`; }
  else if (st.ground) o += `<g id="chao" fill="none" stroke="${st.st}" stroke-linecap="round"><path d="M0,${f(Y + 16 * S)} L${W},${f(Y + 16 * S)}" stroke-width="1.5" opacity="0.45"/><path d="M0,${f(Y + 36 * S)} L${W},${f(Y + 36 * S)}" stroke-width="1.5" stroke-dasharray="2 12" opacity="0.35"/></g>\n`;
  o += `<g id="cena" transform="translate(0,${f2(Y - 700 * S)}) scale(${S})">\n`;
  if (st.sun) {
    const gp = heroIt.g.glow || heroIt.g.top; const hx = heroIt.tx + (gp[0] - heroIt.g.x0) * heroIt.sc; const topY = 700 + (heroIt.g.top[1] - 700) * heroIt.sc; const Rs = (700 - topY) * 1.18;
    let rays = ''; for (let i = 0; i < 13; i++) { const a = Math.PI * (12 + i * 13) / 180, r0 = Rs + 16, r1 = r0 + (i % 2 ? 40 : 70); rays += `M${f(hx - Math.cos(a) * r0)},${f(700 - Math.sin(a) * r0)} L${f(hx - Math.cos(a) * r1)},${f(700 - Math.sin(a) * r1)} `; }
    o += `<g id="sol" fill="none" stroke="${st.glow}" stroke-linecap="round" clip-path="url(#acima-horizonte)" mask="url(#mascara-frente)"><circle id="sol-disco" cx="${f(hx)}" cy="700" r="${f(Rs)}" stroke-width="${f2(1.8 / S)}"/><path id="sol-raios" d="${rays.trim()}" stroke-width="${f2(1.4 / S)}" stroke-dasharray="${f2(5 / S)} ${f2(7 / S)}"/></g>\n`;
  }
  if (back.length) o += `<g id="camada-fundo" fill="none" stroke="${st.st}" stroke-linecap="round" stroke-linejoin="round" opacity="0.5" mask="url(#mascara-frente)">${back.map(b => renderMon(b, st, S, 'back')).join('\n')}</g>\n`;
  o += `<g id="skyline" fill="none" stroke="${st.st}" stroke-width="${f2(2 / S)}" stroke-linecap="round" stroke-linejoin="round">\n<path id="horizonte" d="M0,700 L${f(Wd)},700"/>\n${placed.map(p => renderMon(p, st, S, 'front')).join('\n')}\n</g>\n</g>\n`;
  if (routes.length || st.glow) {
    o += `<g id="rota-de-voo">`;
    routes.forEach(r => { o += `<path id="rota-tracejada${r.sfx}" d="${r.d}" fill="none" stroke="${st.route}" stroke-width="2" stroke-dasharray="7 10" stroke-linecap="round" mask="url(#rota-mascara${r.sfx})"/>`; });
    const dot = (p, id, big) => st.alpha ? `<path id="${id}" d="M${f(p[0])},${f(p[1])} h0" fill="none" stroke="${st.glow}" stroke-width="${big ? 10 : 7}" stroke-linecap="round"/>` : `<circle id="${id}" cx="${f(p[0])}" cy="${f(p[1])}" r="${big ? 4.5 : 3.2}" fill="${st.glow}"/>`;
    if (st.halo) o += `<circle id="ponto-brilho-halo" cx="${f(G[0])}" cy="${f(G[1])}" r="14" fill="${st.glow}" opacity="0.55" filter="url(#filtro-brilho)"/>`;
    o += dot(G, 'ponto-brilho', true);
    routes.forEach((r, i) => { if (!r.main) o += dot(r.a, 'ponto-brilho-' + i, false); if (r.ring) o += `<circle id="ponto-final" cx="${f(r.b[0])}" cy="${f(r.b[1])}" r="6" fill="none" stroke="${st.route}" stroke-width="2"/>`; });
    o += `</g>\n`;
  }
  if (st.grain) o += `<rect id="grao" width="${W}" height="${Hc}" filter="url(#filtro-grao)" opacity="${st.grain}" style="mix-blend-mode:${st.grainBlend}" pointer-events="none"/>\n`;
  return o + '</svg>\n';
}

const STANDARD = [];
for (const s in STYLES) STANDARD.push([s, '16x9']);
for (const fm of ['1x1', '4x5', '3x1']) STANDARD.push(['original', fm]);
const fileName = (rid, sid, fid) => `${rid}__${sid}__${fid}.svg`;

const PALETTES = ['original', 'amarelo', 'azul', 'verde-colorido', 'noite-azul', 'bandeira', 'positivo-claro', 'alpha'];
const comboName = (rid, pal, fid, m) => { m = m || {}; const t = [pal]; if (m.comp && m.comp !== 'padrao') t.push(m.comp); if (m.semFundo) t.push('sem-fundo'); if (m.semReflexo) t.push('sem-reflexo'); if (m.semArco) t.push('sem-arco'); if (m.sol) t.push('amanhecer'); if (m.converge) t.push('convergencia'); return rid + '__' + t.join('-') + '__' + fid; };
const api = { REGIONS, STYLES, FORMATS, STANDARD, PALETTES, build, fileName, comboName };
if (typeof window !== 'undefined') window.Skyline = api;
return api;
})();
