/* ============================================================
   التصميم الجداري — مستوحى من OPTION 4
   خط متدرّج صاعد، المحطات العلوية صورها فوق الخط،
   والسفلية صورها تحت النص، مع خطوط عمودية نازلة.
   يستخدم نفس بيانات الخط الزمني (S.timeline).
   ============================================================ */

const WALL_SIZE = [3600, 2800];

/* خلفية ورق قديم (SVG) */
function wallPaper(W, H){
  return `<svg class="paper" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <filter id="wgrain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .22  0 0 0 0 .1  0 0 0 .2 0"/></filter>
      <filter id="wmottle" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".003 .005" numOctaves="4" seed="3"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .3  0 0 0 0 .12  0 0 0 .8 -.3"/></filter>
      <radialGradient id="wvig" cx="50%" cy="50%" r="75%"><stop offset="55%" stop-color="#5a3510" stop-opacity="0"/><stop offset="100%" stop-color="#5a3510" stop-opacity=".4"/></radialGradient>
      <radialGradient id="wglow" cx="40%" cy="35%" r="65%"><stop offset="0%" stop-color="#fff8e6" stop-opacity=".55"/><stop offset="100%" stop-color="#fff8e6" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#wglow)"/>
    <rect width="100%" height="100%" filter="url(#wmottle)"/>
    <rect width="100%" height="100%" filter="url(#wgrain)"/>
    <rect width="100%" height="100%" fill="url(#wvig)"/>
  </svg>`;
}

/* مسار بزوايا دائرية من مجموعة نقاط */
function roundedPath(P, r){
  let d = `M${P[0][0]},${P[0][1]}`;
  for(let i = 1; i < P.length; i++){
    const [x, y] = P[i], nx = P[i+1];
    if(!nx){ d += ` L${x},${y}`; break; }
    const [px, py] = P[i-1];
    const d1 = Math.hypot(x-px, y-py), d2 = Math.hypot(nx[0]-x, nx[1]-y);
    const rr = Math.min(r, d1/2, d2/2);
    if(rr < 1){ d += ` L${x},${y}`; continue; }
    const ax = x - (x-px)/d1*rr, ay = y - (y-py)/d1*rr;
    const bx = x + (nx[0]-x)/d2*rr, by = y + (nx[1]-y)/d2*rr;
    d += ` L${ax},${ay} Q${x},${y} ${bx},${by}`;
  }
  return d;
}

function renderWall(){
  const T = S.timeline, [W, H] = WALL_SIZE;
  const ents = T.entries, n = ents.length;
  const x0 = 200, step = n > 1 ? (W - x0 - 680) / (n - 1) : 0;
  const yU = 1200, yT = 680, yL = 1900, phH = 270, bottom = H - 120;
  const fs = +(T.fs * 1.45).toFixed(1);   // الخط أكبر لأن اللوحة الجدارية كبيرة
  const narrow = step - 78;
  const isUp = i => (i === n - 1) || i % 2 === 0;

  // حساب موضع كل محطة
  const M = ents.map((e, i) => {
    const up = isUp(i), last = i === n - 1 && n > 1;
    const below = !up || i === 0;   // صورة تحت النص: المحطات السفلية + الأولى (الرأس فوقها)
    const y = !up ? yL - (i/2) * 14 : (last ? yT : yU - (i/2) * 22);
    return { e, i, up, last, below, x: x0 + i * step, y };
  });
  M.forEach((m, i) => {
    const nx = M[i + 1];
    if(m.last) m.w = Math.min(W - 110 - (m.x + 24), 540);
    else if(m.up) m.w = narrow;
    else m.w = Math.min(step * 1.25, 500);
  });

  // نهاية الخط "المستقبل مستمر"
  let endX = M.length ? M[M.length - 1].x + 24 : x0;
  M.forEach(m => { if(m.below) endX = Math.max(endX, m.x + 24 + m.w + 50); });
  endX = Math.min(endX, W - 620);
  const endY = 2120;

  // المسار المتدرّج
  const lines = [];
  if(M.length){
    const P = [[x0 - 90, M[0].y]];
    M.forEach((m, i) => {
      if(i === 0){ P.push([m.x, m.y]); return; }
      const cx = m.x - 28;
      P.push([cx, M[i-1].y], [cx, m.y], [m.x, m.y]);
    });
    lines.push(`<path d="${roundedPath(P, 26)}" fill="none" stroke="#7a1c1c" stroke-width="6" stroke-linecap="round"/>`);
    lines.push(`<circle cx="${x0 - 90}" cy="${M[0].y}" r="10" fill="#7a1c1c"/>`);
  }

  let blocks = '';
  M.forEach(m => {
    const { e, x, y } = m;
    const left = x + 24;
    // السنة فوق الخط
    blocks += `<div class="wyr" style="left:${left}px;top:${y - 112}px">${esc(e.year)}</div>`;
    // النقطة
    lines.push(`<circle cx="${x}" cy="${y}" r="16" fill="#7a1c1c" stroke="${T.bg==='plain'?'#efe6d6':'#ecdfc4'}" stroke-width="6"/>`);

    const textTop = y + 24;
    let textBottom;
    if(m.last)            textBottom = endY - 90;
    else if(m.below)      textBottom = bottom - phH - 28;
    else                  textBottom = yL - 130;

    // الصورة
    {
      // إطار الصورة يظهر دائماً — فارغ = مكان لإضافة صورة
      const img = e.photo
        ? `<img src="${e.photo}" style="object-fit:cover;object-position:${e.px}% ${e.py}%">`
        : `<div class="ph-empty-in">＋ أضف صورة<small>${esc(e.year)}</small></div>`;
      const cls = `wph ${T.sepia?'old':''} ${e.photo?'':'ph-empty'}`;
      if(m.below){
        const pw = m.up ? m.w : Math.min(m.w, step * 1.35);
        blocks += `<div class="${cls}" data-entry="${m.i}" style="left:${left}px;top:${bottom - phH}px;width:${pw}px;height:${phH}px">${img}</div>`;
      } else {
        const nx = M[m.i + 1];
        // إذا كانت المحطة التالية علوية أيضاً فالخط الصاعد قريب: الصورة بعرض العمود فقط
        const pw = m.last ? Math.min(m.w, 480) : (nx && nx.up ? narrow : Math.min(step * 1.3, 460));
        const top = y - 130 - phH;
        blocks += `<div class="${cls}" data-entry="${m.i}" style="left:${x + 16}px;top:${top}px;width:${pw}px;height:${phH}px">${img}</div>`;
        lines.push(`<line x1="${x}" y1="${top}" x2="${x}" y2="${y}" stroke="#7a1c1c" stroke-width="4"/>`);
      }
    }
    // خط عمودي نازل بجانب المحطات السفلية
    if(!m.up){
      const dropEnd = bottom;
      lines.push(`<line x1="${x - 28}" y1="${y}" x2="${x - 28}" y2="${dropEnd}" stroke="#7a1c1c" stroke-width="4"/>`);
    }

    // data-group: كل المحطات تأخذ نفس حجم الخط (أصغر حجم يناسب الجميع)
    blocks += `<div class="wtc fit" data-group="wall" data-max="${fs}" style="left:${left}px;top:${textTop}px;width:${m.w}px;height:${textBottom - textTop}px;--fs:${fs}px">
        <div class="ti-ar">${esc(e.t_ar)}</div>
        <div class="ti-en">${esc(e.t_en)}</div>
        <div class="ti-fr">${esc(e.t_fr)}</div>
        <div class="sep"></div>
        <div class="t ar">${esc(e.d_ar)}</div>
        <div class="t en">${esc(e.d_en)}</div>
        <div class="t fr">${esc(e.d_fr)}</div>
      </div>`;
  });

  // سهم النهاية
  const ex = endX, ey = endY;
  lines.push(`<path d="M${ex},${ey + 60} L${ex + 70},${ey + 60} Q${ex + 110},${ey + 60} ${ex + 110},${ey + 25} Q${ex + 110},${ey} ${ex + 145},${ey} L${ex + 430},${ey}" fill="none" stroke="#7a1c1c" stroke-width="6" stroke-linecap="round"/>`);
  lines.push(`<path d="M${ex + 425},${ey - 18} L${ex + 462},${ey} L${ex + 425},${ey + 18} Z" fill="#7a1c1c"/>`);

  return `<div class="d wall ${T.bg==='plain'?'plain':''}" style="--fs:${fs}px">
    ${T.bg==='plain' ? '' : wallPaper(W, H)}
    <div class="whd"><img class="logo" src="${logoSrc()}">
      <div class="n-ar">${esc(T.name_ar)}</div><div class="n-en">${esc(T.name_en)}</div>
      <div class="sl-ar">${esc(T.sl_ar)}</div><div class="sl">${esc(T.sl_en)}</div><div class="sl fr">${esc(T.sl_fr)}</div>
    </div>
    <svg class="path" width="${W}" height="${H}">${lines.join('')}</svg>
    ${blocks}
    <div class="wend" style="left:${ex + 150}px;top:${ey + 50}px;width:${W - ex - 260}px">
      <div class="e-ar">${esc(T.end_ar)}</div>
      <div class="e-en"><span></span>${esc(T.end_en)}</div>
      <div class="e-fr">${esc(T.end_fr)}</div>
    </div>
  </div>`;
}
