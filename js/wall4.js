/* ============================================================
   لوحة جدارية مطابقة لتصميم OPTION 4 (8 محطات) بدون عناصر الغرفة.
   كل الإحداثيات بوحدات صورة المرجع وتُضرب في WALL4_K عند الرسم،
   فالنصوص والخطوط حادة في التصدير بأي جودة.
   ============================================================ */

const WALL4_K = 3;
const WALL4_AREA = { x: 96, y: 195, w: 840, h: 870 };   // حدود اللوحة بهوامش متساوية
const WALL4_COL = '#7a1f2b', WALL4_BG = '#d6c1a3';

/* مواضع المحطات الثماني: السنة (x, منتصف y, حجم) + كتلة النص + الصورة */
const WALL4_SLOTS = [
  { yr: [150, 527, 52], big: 1, tx: [150, 555, 128, 178], ar: 104, en: 92, ph: [137, 737, 122, 98] },
  { yr: [301, 731, 29], tx: [302, 747, 125, 115], ar: 112, en: 92, ph: [296, 866, 125, 95] },
  { yr: [401, 538, 29], tx: [401, 554, 120, 122], ar: 92, en: 66, ph: [395, 429, 109, 89] },
  { yr: [462, 715, 29], tx: [462, 731, 118, 148], ar: 108, en: 78, ph: [453, 883, 117, 94] },
  { yr: [557, 488, 29], tx: [557, 504, 125, 140], ar: 108, en: 106, ph: [552, 373, 142, 92] },
  { yr: [606, 715, 29], tx: [606, 731, 105, 134], ar: 104, arF: .84, en: 86, ph: [599, 868, 108, 109] },
  { yr: [716, 549, 29], tx: [716, 565, 122, 148], ar: 98, en: 90, ph: [720, 717, 114, 97] },
  { yr: [787, 388, 29], tx: [787, 404, 130, 142], ar: 108, en: 84, ind: 11, ph: [783, 269, 113, 98] },
];

/* خطوط مفردة: [x, y1, y2] */
const WALL4_RULES = [
  [136.5, 531, 730], [388, 430, 543], [544, 372, 499], [774.5, 276, 392],
  [591.5, 807, 990], [712.5, 716, 814], [840, 657, 814],
];
/* الخط المزدوج (ثلاثة فروع) */
const WALL4_DOUBLE = [
  'M279,954 V721 Q279,701 299,701 H350 Q362,701 362,689 V556 Q362,543 375,543 H388',
  'M441,971 V700 Q441,680 461,680 H518 Q530,680 530,668 V515 Q530,498.5 547,498.5',
  'M578,971 V700 Q578,680 598,680 H676 Q690,680 690,666 V509 Q690,495 704,495 H733 Q746,495 746,482 V410 Q746,392 764,392 H774',
];
const WALL4_DOTS = [[304, 701], [388, 542.5], [478, 680], [544, 498.5], [606, 680], [692, 555], [774, 392]];

function wall4Lines(){
  const c = WALL4_COL;
  return `
    ${WALL4_DOUBLE.map(d => `<path d="${d}" fill="none" stroke="${c}" stroke-width="5.4"/><path d="${d}" fill="none" stroke="${WALL4_BG}" stroke-width="2.6"/>`).join('')}
    <path d="M256,534 H290 Q304,534 304,548 V701" fill="none" stroke="${c}" stroke-width="1.7"/>
    ${WALL4_RULES.map(([x, a, b]) => `<line x1="${x}" y1="${a}" x2="${x}" y2="${b}" stroke="${c}" stroke-width="1.5"/>`).join('')}
    <circle cx="136.5" cy="531" r="6" fill="${c}"/>
    ${WALL4_DOTS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7.5" fill="${c}"/>`).join('')}
    <path d="M714,928.5 H750 Q771,928.5 771,908 Q771,888.5 792,888.5 H838" fill="none" stroke="${c}" stroke-width="2"/>
    <circle cx="838" cy="888.5" r="5" fill="${c}"/>
    <path d="M846,881 L860,888.5 L846,896 Z" fill="${c}"/>
    <line x1="717" y1="1017" x2="767" y2="1017" stroke="${c}" stroke-width="1.6"/>`;
}

/* ---------- الرسم ---------- */
function renderWall4(){
  const T = S.timeline, k = WALL4_K, A = WALL4_AREA;
  const X = v => (v - A.x) * k, Y = v => (v - A.y) * k;
  const scale = (+T.fs || 18) / 18;
  let blocks = '';
  WALL4_SLOTS.forEach((s, i) => {
    const e = T.entries[i]; if(!e) return;
    const [yx, ycy, ysz] = s.yr, [tx, ty, tw, th] = s.tx, [px, py, pw, ph] = s.ph;
    const src = e.photo || WALL4_SAMPLES[i];
    const st = e.photo ? `object-position:${e.px}% ${e.py}%` : 'object-position:50% 50%';
    blocks += `<div class="w4ph ${T.sepia && e.photo ? 'old' : ''}" data-entry="${i}" style="left:${X(px)}px;top:${Y(py)}px;width:${pw * k}px;height:${ph * k}px"><img src="${src}" style="${st}"></div>
      <div class="w4yr" style="left:${X(yx)}px;top:${Y(ycy) - ysz * k * .6}px;font-size:${ysz * k}px;line-height:${ysz * k * 1.2}px">${esc(e.year)}</div>
      <div class="w4tx fit ${s.big ? 'big' : ''}" data-group="wall4" data-max="${(34 * scale).toFixed(1)}" style="left:${X(tx)}px;top:${Y(ty)}px;width:${tw * k}px;height:${th * k}px;--fs:${(34 * scale).toFixed(1)}px">
        <div class="ti-ar">${esc(e.t_ar)}</div>
        <div class="ti-en">${esc(e.t_en)}</div>
        <div class="ds-ar" style="width:${s.ar * k}px${s.arF ? `;font-size:calc(var(--fs)*${s.arF})` : ''}">${txt(e.d_ar)}</div>
        <div class="ds-en" style="width:${s.en * k}px;margin-left:${(s.ind || 0) * k}px">${txt(e.d_en)}</div>
      </div>`;
  });
  return `<div class="d wall4" style="width:${A.w * k}px;height:${A.h * k}px">
    <svg class="w4svg" width="${A.w * k}" height="${A.h * k}" viewBox="${A.x} ${A.y} ${A.w} ${A.h}">
      ${wall4Lines()}
    </svg>
    <div class="w4hd" style="left:${X(140)}px;top:${Y(232)}px;width:${216 * k}px">
      <img class="logo" src="${logoSrc()}">
      <div class="n-ar">${esc(T.name_ar)}</div>
      <div class="n-en">${esc(T.name_en)}</div>
      <div class="sl-ar">${esc(T.sl_ar)}</div>
      <div class="sl">${esc(T.sl_en)}</div>
    </div>
    ${blocks}
    <div class="w4end" style="right:${(A.x + A.w - 857.5) * k}px;top:${Y(937)}px">
      <div class="e-ar">${esc(T.end_ar)}</div>
      <div class="e-en">${esc(T.end_en)}</div>
    </div>
  </div>`;
}
