/* ============================================================
   لوحة المتحف — 70 × 90 سم (طولي)
   الصورة تملأ أسفل اللوحة وتذوب في خلفية بنية دافئة،
   والعنوان والنص بالأبيض في الأعلى، والشعار في الزاوية.
   الخط: «ثمانية» إذا كان مثبّتاً على الجهاز، وإلا Tajawal.
   ============================================================ */

const MUSEUM_SIZE = [1400, 1800];
const MUSEUM_BG = '#947450', MUSEUM_SHADE = '#82623C';   // مأخوذ من الصورة المرجعية: الوسط + الأطراف

/* هل خط ثمانية مثبّت؟ نقارن عرض نص بالخط مع عرضه بالخط الاحتياطي */
function thmanyahInstalled(){
  try{
    const c = document.createElement('canvas').getContext('2d'), s = 'اسم وراءه حكاية Al-Faisaly 1386';
    c.font = '40px monospace'; const base = c.measureText(s).width;
    return ['Thmanyah Sans', 'thmanyah sans', 'Thmanyah', 'thmanyahsans'].some(f => { c.font = `40px "${f}", monospace`; return Math.abs(c.measureText(s).width - base) > 1; });
  }catch(e){ return false; }
}

function renderMuseum(){
  const M = S.museum, [W, H] = MUSEUM_SIZE, fs = M.fs;
  const top = Math.round(H * (1 - M.ph / 100));
  // الصورة كما هي بدون أي تأثير: تظهر كاملة داخل مساحتها، ويكبّرها أو يصغّرها المستخدم
  const img = M.photo
    ? `<img src="${M.photo}" style="${imgStyle(M, 'contain')}">`
    : `<div class="ph-empty-in" style="color:#fff">＋ أضف صورة</div>`;
  const has = s => String(s || '').trim();
  return `<div class="d museum" style="width:${W}px;height:${H}px;background:${MUSEUM_BG}">
    <div class="mshade"></div>
    <div class="mph ${M.photo ? '' : 'ph-empty'}" data-drop style="top:${top}px;height:${H - top}px">${img}</div>
    <img class="logo mlogo ${M.wlogo ? 'white' : ''}" src="${logoSrc()}">
    <div class="mtx fit" data-max="${fs}" style="--fs:${fs}px;height:${Math.max(260, top - 40 - 330)}px">
      ${has(M.t_ar) ? `<div class="mt ar">${esc(M.t_ar)}</div>` : ''}
      ${has(M.d_ar) ? `<div class="md ar">${txt(M.d_ar)}</div>` : ''}
      ${has(M.t_en) ? `<div class="mt en">${esc(M.t_en)}</div>` : ''}
      ${has(M.d_en) ? `<div class="md en">${txt(M.d_en)}</div>` : ''}
    </div>
  </div>`;
}

function museumSide(){
  const M = S.museum, ok = thmanyahInstalled();
  return `<fieldset><legend>الصورة</legend>
    <div class="row"><button class="btn pri" data-pick="museum.photo">📷 اختيار صورة</button>${M.photo ? '<button class="btn danger" data-clear="museum.photo">إزالة</button>' : ''}</div>
    <div class="hint">أو اسحب الصورة وأفلتها فوق التصميم / اضغط على الصورة.</div>
    ${M.photo ? moveCtl('museum', '.mph', 30, 300) : ''}
    ${rg('museum.ph', 'ارتفاع مساحة الصورة من اللوحة %', 40, 80)}
    <div class="hint">التكبير أقل من 100 يصغّر الصورة داخل مساحتها، وأكبر من 100 يكبّرها.</div>
  </fieldset>
  <fieldset><legend>النصوص</legend>
    ${tx('museum.t_ar', 'العنوان')}
    ${ta('museum.d_ar', 'النص العربي', 'rtl', 6)}
    <button class="btn pri" style="width:100%;margin-top:8px" data-trm>🌐 ترجم إلى الإنجليزية</button>
    ${tx('museum.t_en', 'Title (EN)', 'ltr')}
    ${ta('museum.d_en', 'English', 'ltr', 5)}
    <div class="hint">اترك الإنجليزي فارغاً إذا أردت اللوحة بالعربي فقط.</div>
    ${rg('museum.fs', 'حجم الخط', 24, 60, .5)}
    <div class="hint" style="${ok ? '' : 'color:var(--m)'}">${ok
      ? '✔ خط «ثمانية» مثبّت على هذا الجهاز ومستخدم في اللوحة.'
      : '⚠ خط «ثمانية» غير مثبّت على هذا الجهاز، فاللوحة تستخدم خط Tajawal مؤقتاً. حمّله مجاناً من موقع ثمانية الرسمي وثبّته، ثم أعد فتح الصفحة.'}</div>
  </fieldset>`;
}
