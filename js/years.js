/* ============================================================
   لوحات السنوات — لوحة جدارية مستقلة لكل محطة.
   السنة (هجري/ميلادي) + العنوان + الصورة + وصف الصورة + النص بالعربي والإنجليزي،
   وفي الأسفل شريط السنوات يبيّن موقع اللوحة في المسيرة.
   لوحة 70×90 تستخدم S.timeline، ولوحة 60×80 تستخدم S.timeline68 — منفصلتان.
   ============================================================ */

const YEARS_SIZE = [1400, 1800], YEARS_M_SIZE = [1350, 1800];   // طولي 70×90 سم / طولي 60×80 سم

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

/* نسبة عرض/ارتفاع الصورة الأصلية */
function photoAspect(src){
  return new Promise(res => { const im = new Image(); im.onload = () => res(im.naturalWidth / im.naturalHeight || 0); im.onerror = () => res(0); im.src = src; });
}
/* صور محفوظة قبل هذه الميزة: تُقاس مرة واحدة ثم يُعاد الرسم */
const measuring = new Set();
function ensureAspect(e){
  if(!e.photo || e.ar || measuring.has(e.photo)) return;
  measuring.add(e.photo);
  photoAspect(e.photo).then(ar => { measuring.delete(e.photo); if(ar){ e.ar = ar; save(); render(); } });
}

/* مواضع العناصر: 70×90 سم (tall) و60×80 سم (mid) */
const YL = {
  tall: { logo:{x:70, y:60, s:170}, yr:{y:110, fs:44}, ti:{x:270, w:860, y:180, h:110, ts:40},
          box:{x:100, y:320, w:1200, h:960}, tx:{y:1342, h:262, l:100, r:1300}, sy:1660 },
  // طولي 60×80 سم: نفس مواصفات الطولي وارتفاعه، أضيق فقط
  mid:  { logo:{x:70, y:60, s:170}, yr:{y:110, fs:44}, ti:{x:270, w:810, y:180, h:110, ts:40},
          box:{x:75, y:320, w:1200, h:960}, tx:{y:1342, h:262, l:90, r:1260}, sy:1660 },
};
const isYears = t => t === 'years' || t === 'years68';
/* كل مقاس له محطاته الخاصة: 70×90 ← S.timeline و60×80 ← S.timeline68 (لا تكرار بينهما) */
const TK = (t = S.template) => t === 'years68' ? 'timeline68' : 'timeline';

/* السنة الهجرية: المكتوبة في المحطة، وإلا تُحسب تقريبياً من الميلادية */
function hijriYear(e){
  const h = String(e.hy || '').trim();
  if(h) return h;
  const g = String(e.year || '').trim();
  return /^\d{4}$/.test(g) ? String(Math.round((+g - 622) * 33 / 32)) : '';
}

/* تحويل تقريبي للسنة: الهجري ← الميلادي (السنة الميلادية التي بدأت فيها السنة الهجرية) */
const hijriToGreg = h => /^\d{4}$/.test(h) ? String(Math.floor(+h * 0.970229 + 621.5643)) : '';
const gregToHijri = g => /^\d{4}$/.test(g) ? String(Math.round((+g - 622) * 33 / 32)) : '';

/* الشعار بنفس لون العنوان (#7a1c1c): نلوّن الأجزاء الداكنة ونجعل الفاتحة شفافة — مرة واحدة لكل شعار */
const YEARS_INK = [122, 28, 28];
let yLogo = { src: null, out: null };
function yearsLogo(){
  const src = logoSrc();
  if(yLogo.src === src) return yLogo.out || src;
  yLogo = { src, out: null };
  const im = new Image();
  im.onload = () => {
    if(yLogo.src !== src) return;
    const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight;
    const x = c.getContext('2d'); x.drawImage(im, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height), p = d.data;
    for(let i = 0; i < p.length; i += 4){
      const L = (0.299 * p[i] + 0.587 * p[i+1] + 0.114 * p[i+2]) / 255;
      p[i+3] = Math.round(p[i+3] * Math.min(1, Math.max(0, (0.85 - L) / 0.35)));
      [p[i], p[i+1], p[i+2]] = YEARS_INK;
    }
    x.putImageData(d, 0, 0);
    yLogo.out = c.toDataURL('image/png');
    if(isYears(S.template)) render();
  };
  im.src = src;
  return src;
}

/* مدى شريط السنوات: من/إلى المكتوبين، وإلا من أول محطة إلى آخرها */
function stripRange(T){
  let a = parseInt(T.sfrom), b = parseInt(T.sto);
  if(!(a > 0 && b >= a && b - a <= 80)){
    const ys = T.entries.map(x => parseInt(x.year)).filter(v => v > 0);
    a = Math.min(...ys); b = Math.max(...ys);
  }
  return [a, b];
}
function yearOutOfStrip(T, e){
  const v = parseInt(e && e.year), [a, b] = stripRange(T);
  return v > 0 && isFinite(a) && (v < a || v > b);
}

function renderYears(tpl = 'years'){
  const T = S[TK(tpl)], [W, H] = tpl === 'years68' ? YEARS_M_SIZE : YEARS_SIZE, ents = T.entries, n = ents.length;
  const i = Math.min(Math.max(S.yr | 0, 0), Math.max(n - 1, 0)), e = ents[i] || E('','','','','','','');
  const fs = T.yfs, L = tpl === 'years68' ? YL.mid : YL.tall;

  ensureAspect(e);
  // إطار الصورة بعرض المساحة كاملاً وارتفاعه حسب نسبة الصورة. الصورة تبقى كاملة بلا قص،
  // والفراغ حولها (إن وُجد) يُملأ بنسخة مموّهة منها بدل خلفية فارغة
  let fr = L.box;
  if(e.photo){
    const h = e.ar ? Math.min(L.box.h, Math.round(L.box.w / e.ar)) : L.box.h;
    fr = {x: L.box.x, w: L.box.w, h, y: L.box.y};
  }
  // رفع/تنزيل الصورة لكل لوحة (poff) — بين العنوان ومساحة النص فقط، فلا يتغير التصميم
  const base = fr.y + fr.h;   // أسفل الصورة قبل تحريكها: النص يُحسب منه فلا يتبع الصورة
  { const lo = L.ti.y + L.ti.h + 10, hi = L.tx.y + L.tx.h - 110 - fr.h;
    fr = {...fr, y: Math.round(Math.max(lo, Math.min(Math.max(lo, hi), fr.y + (+e.poff || 0))))}; }
  const img = e.photo
    ? `<img class="ybg" src="${e.photo}" alt="">` + `<img class="ymain" src="${e.photo}" style="${imgStyle(e, 'contain')}">`
    : `<div class="ph-empty-in">＋ أضف صورة<small>${esc(e.year)}</small></div>`;

  // شريط المسيرة: كل السنوات من سنة البداية إلى سنة النهاية (مثلاً 1954 → 1981) من اليمين إلى اليسار،
  // سنوات المحطات بنقطة أوضح، وسنة اللوحة الحالية مميزة
  const cur = parseInt(e.year), stations = new Set(ents.map(x => parseInt(x.year)));
  let [yFrom, yTo] = stripRange(T);
  if(!isFinite(yFrom)){ yFrom = yTo = cur || 0; }
  const years = []; for(let v = yFrom; v <= yTo; v++) years.push(v);
  const m = years.length, x0 = 150, x1 = W - 150, sy = L.sy;
  const sx = k => m > 1 ? x1 - k * (x1 - x0) / (m - 1) : W / 2;   // من اليمين إلى اليسار
  const step = (x1 - x0) / Math.max(m - 1, 1), lfs = Math.max(11, Math.min(21, step * .36));
  let strip = `<line x1="${x0 - 40}" y1="${sy}" x2="${x1 + 50}" y2="${sy}" stroke="#7a1c1c" stroke-width="3"/>
    <path d="M${x0 - 34},${sy - 10} L${x0 - 56},${sy} L${x0 - 34},${sy + 10} Z" fill="#7a1c1c"/>`;
  let labels = '';
  years.forEach((v, k) => {
    const on = v === cur, st = stations.has(v);
    strip += on
      ? `<circle cx="${sx(k)}" cy="${sy}" r="14" fill="#7a1c1c" stroke="#f3e8d2" stroke-width="5"/>`
      : `<circle cx="${sx(k)}" cy="${sy}" r="${st ? 7 : 4}" fill="#7a1c1c" ${st ? '' : 'opacity=".6"'}/>`;
    labels += `<div class="ylab ${on ? 'on' : ''}" style="left:${sx(k)}px;top:${sy + 18}px;font-size:${(on ? Math.min(27, lfs * 1.55) : lfs).toFixed(1)}px">${v}</div>`;
  });

  // تحت الصورة: العربي يميناً والإنجليزي يساراً، بينهما فاصل
  const has = s => String(s || '').trim();
  const col = (c, d) => (has(c) ? `<div class="c">${txt(c)}</div>` : '') + (has(c) && has(d) ? '<div class="sep"></div>' : '') + (has(d) ? `<div class="t">${txt(d)}</div>` : '');
  const tx = L.tx, mid = (tx.l + tx.r) / 2, cw = (tx.r - tx.l) / 2 - 50;
  // النصوص تبدأ مباشرة تحت الصورة وتمتد حتى نهاية مساحتها
  // الموضع يتحكم به المستخدم لكل لوحة (toff): سالب = أقرب للصورة، موجب = أنزل
  const ty = Math.max(fr.y + fr.h + 10, Math.min(tx.y + tx.h - 100, base + 60 + (+e.toff || 0))), th = tx.y + tx.h - ty;
  const t = `top:${ty}px;height:${th}px;width:${cw}px;--fs:${fs}px`;

  return `<div class="d years ${T.bg==='plain'?'plain':''}" style="width:${W}px;height:${H}px">
    ${T.bg==='plain' ? '' : wallPaper(W, H)}
    <div class="frame"></div>
    <img class="logo ylogo" src="${yearsLogo()}" style="left:${L.logo.x}px;top:${L.logo.y}px;width:${L.logo.s}px;height:${L.logo.s}px">
    <div class="yyr" style="top:${L.yr.y}px;font-size:${L.yr.fs}px"><span></span><div class="yd">${hijriYear(e) ? `<b>${esc(hijriYear(e))}</b><em>هـ</em><i></i>` : ''}<b>${esc(e.year)}</b>${hijriYear(e) ? '<em>م</em>' : ''}</div><span></span></div>
    <div class="yti fit" data-var="--ts" data-max="${L.ti.ts}" style="left:${L.ti.x}px;width:${L.ti.w}px;top:${L.ti.y}px;height:${L.ti.h}px;--ts:${L.ti.ts}px">
      <div class="ti-ar">${esc(e.t_ar)}</div>
      <div class="ti-en">${esc(e.t_en)}</div>
    </div>
    <div class="yph ${T.sepia?'old':''} ${e.photo?'':'ph-empty'}" data-entry="${i}" style="left:${fr.x}px;top:${fr.y}px;width:${fr.w}px;height:${fr.h}px">${img}</div>
    <div class="ycol en fit" data-group="ycols" data-strict data-max="${fs}" style="left:${tx.l}px;${t}">${col(e.c_en, e.d_en)}</div>
    <div class="ydiv" style="left:${mid - 1}px;top:${ty + 6}px;height:${th - 12}px"></div>
    <div class="ycol ar fit" data-group="ycols" data-strict data-max="${fs}" style="left:${tx.r - cw}px;${t}">${col(e.c_ar, e.d_ar)}</div>
    <svg class="ystrip" width="${W}" height="${H}">${strip}</svg>
    ${labels}
  </div>`;
}

/* محاذاة الطرفين تفتح فراغات كبيرة بين الكلمات في الأسطر القصيرة.
   لكل فقرة: نقيس الأسطر، وإذا كان التوزيع سيضيف أكثر من عُشر حرف تقريباً بين الكلمات
   نكتفي بالمحاذاة العادية (يمين للعربي، يسار للإنجليزي) لتلك الفقرة فقط */
function fixJustify(){
  const els = document.querySelectorAll('#design .years .ycol .c, #design .years .ycol .t');
  for(const el of els){
    el.style.textAlign = 'start'; el.style.textAlignLast = 'auto';
    // المعاينة مصغّرة على الشاشة: نحوّل القياس إلى مقاس التصميم الحقيقي
    const k0 = el.getBoundingClientRect().width / (el.offsetWidth || 1) || 1;
    const fs = parseFloat(getComputedStyle(el).fontSize) * k0, W = el.clientWidth * k0;
    const lines = new Map(), walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let para = 0, bad = false, node;
    while((node = walker.nextNode())){
      const t = node.textContent, re = /\S+/g; let m, last = 0;
      while((m = re.exec(t))){
        if(t.slice(last, m.index).includes('\n')) para++;
        last = m.index + m[0].length;
        const r = document.createRange(); r.setStart(node, m.index); r.setEnd(node, last);
        const b = r.getClientRects()[0]; if(!b) continue;
        const k = Math.round(b.top);
        const L = lines.get(k) || {l: Infinity, r: -Infinity, n: 0, p: para};
        L.l = Math.min(L.l, b.left); L.r = Math.max(L.r, b.right); L.n++; lines.set(k, L);
      }
    }
    const arr = [...lines.values()];
    arr.forEach((L, i) => {
      const next = arr[i + 1];
      if(!next || next.p !== L.p || L.n < 2) return;   // آخر سطر في الفقرة لا يُوزّع
      if((W - (L.r - L.l)) / (L.n - 1) > fs * .12) bad = true;
    });
    if(!bad){ el.style.textAlign = ''; el.style.textAlignLast = ''; }
  }
}
