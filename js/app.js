let LOGO = window.LOGO_RAW || '';

/* show any error on screen instead of failing silently */
function clearError(){ const b = document.getElementById('errbar'); if(b) b.hidden = true; }
function showError(msg){
  const b = document.getElementById('errbar');
  if(!b) return;
  b.textContent = '⚠ ' + msg + ' ';
  const x = document.createElement('button');
  x.textContent = '✕'; x.title = 'إغلاق'; x.onclick = clearError;
  b.append(x);
  b.hidden = false;
}
window.addEventListener('error', e => showError('خطأ: ' + e.message));
window.addEventListener('unhandledrejection', e => showError('خطأ: ' + (e.reason && e.reason.message || e.reason)));

const DEFAULTS0 = () => ({
  template: 'landscape',
  logo: null,
  libLink: {},    // اللوحة المفتوحة من المكتبة لكل نوع: {portrait: id, ...}
  capfs: 18,     // حجم خط النصوص في الطولي والعرضي
  wlogo: false,   // الشعار باللون الأبيض
  yr: 0,          // المحطة المعروضة في لوحات السنوات
  portrait: {
    photo: null, fit: 'cover', px: 50, py: 50, zoom: 100,
    ar: "صورة من رحلة النادي إلى دولتي الكويت والعراق لإقامة مباريات دولية ودية في سنة 1395 هـ ويظهر في الصورة :\nرئيس النادي الأستاذ/ محمد بن خريف الناشي (رحمه الله)\nوالأستاذ/ عبدالله بن ناصر العميم ،\nوالأستاذ/ عبدالمحسن بن حمد العميم (رحمه الله) ، والأستاذ/ حسن بن حمد بن حسن ، والأستاذ/ أحمد بن خريف الناشي",
    en: "Photo from the club's trip to Kuwait and Iraq to play international friendly matches in 1395 AH. The photo features:\n• Club President, Mr. Mohammed bin Kharif Al-Nashi (may Allah have mercy on him)\n• Mr. Abdullah bin Nasser Al-Omaim\n• Mr. Abdulmohsen bin Hamad Al-Omaim (may Allah have mercy on him)\n• Mr. Hassan bin Hamad bin Hassan\n• Mr. Ahmed bin Kharif Al-Nashi",
    fr: "Photo du voyage du club au Koweït et en Irak pour disputer des matches amicaux internationaux en 1395 H. Sont présents sur la photo :\n• Le président du club, M. Mohammed bin Kharif Al-Nashi (que Dieu lui fasse miséricorde)\n• M. Abdullah bin Nasser Al-Omaim\n• M. Abdulmohsen bin Hamad Al-Omaim (que Dieu lui fasse miséricorde)\n• M. Hassan bin Hamad bin Hassan\n• M. Ahmed bin Kharif Al-Nashi"
  },
  landscape: {
    photo: null, fit: 'cover', px: 50, py: 50, zoom: 100, gray: false,
    ar: "صورة من زيارة صاحب السمو الملكي الأمير / فيصل بن فهد بن عبدالعزيز (رحمه الله) الرئيس العام لرعاية الشباب لمقر النادي الفيصلي بحرمة في حفل أقيم بهذه المناسبة سنة 1396 هـ\nويظهر في الصورة الأستاذ / عبدالله بن ناصر العميم وهدية النادي الى سموه",
    en: "Photo from the visit of His Royal Highness Prince Faisal bin Fahd bin Abdulaziz (may Allah have mercy on him), General President of Youth Welfare, to the headquarters of Al-Faisaly Club in Harmah, during a ceremony held on this occasion in 1396 AH. The photo shows Mr. Abdullah bin Nasser Al-Omaim and the commemorative gift presented by the club to His Highness.",
    fr: "Photo de la visite de Son Altesse Royale le Prince Faisal bin Fahd bin Abdulaziz (que Dieu lui fasse miséricorde), Président général du Bien-être de la Jeunesse, au siège du club Al-Faisaly à Harmah, lors d’une cérémonie organisée à cette occasion en 1396 H. La photo montre également M. Abdullah bin Nasser Al-Omaim ainsi que le cadeau commémoratif offert par le club à Son Altesse."
  },
  timeline: {   // محطات لوحات السنوات 70×90 (ولوحة 60×80 نسختها الخاصة timeline68)
    yfs: 30,                         // حجم خط النص تحت الصورة
    sfrom: '1954', sto: '1981',      // مدى سنوات شريط المسيرة
    bg: 'old', sepia: true,          // الخلفية (ورق قديم / بيج سادة) والصور بلون قديم
    entries: [
      E("1954","التأسيس","Founding","Fondation","تأسس النادي الفيصلي في مدينة حرمة ليكون مصدر فخر لأهله وجماهيره","Al Faisaly was founded in Harmah, becoming a source of pride for its people and supporters.","Al Faisaly a été fondé à Harmah, devenant une source de fierté pour les siens et pour ses supporters."),
      E("1960","البدايات الأولى","Early Years","Les premières années","بناء القاعدة الجماهيرية وتشكيل ملامح النادي","Building the foundation on passion and identity.","Bâtir les fondations avec passion et identité."),
      E("1970","بدايات التميز","Early Achievements","Premières réussites","خطوات ثابتة نحو تحقيق أولى الإنجازات","A step towards distinction.","Des pas assurés vers les premières réussites."),
      E("1980","تطور النادي","Club Development","Développement du club","مراحل من البناء والتنظيم وتعزيز الحضور الرياضي","Years of structure, organization and a stronger sporting presence.","Des années de structuration, d’organisation et d’une présence sportive renforcée."),
      E("1990","حضور أقوى","A Stronger Presence","Une présence renforcée","جماهير أوفى ..\nوحضور أكبر\nفي مختلف المسابقات","A more devoted fan base and a stronger presence in all competitions.","Des supporters plus fidèles et une présence plus forte dans toutes les compétitions."),
      E("2000","إنجازات وبطولات","Achievements","Titres et réussites","تحقيق البطولات وترسيخ مكانة النادي بين الكبار","Winning titles and establishing the club's status among the leading teams.","Des titres remportés et un club affirmé parmi les meilleures équipes."),
      E("2010","نحو المستقبل","Towards the Future","Vers l’avenir","مواصلة المسيرة وتطوير البنية التحتية والكوادر","Continuing the journey and developing the infrastructure and talents.","Poursuivre le parcours et développer les infrastructures et les talents."),
      E("2020","مسيرة مستمرة","A Continuing Journey","Un parcours qui continue","الفيصلي حاضر دائماً ..\nبجماهيره وتاريخه\nوطموحه","Al Faisaly remains present with its fans, history and ambition.","Al Faisaly reste présent avec ses supporters, son histoire et son ambition.")
    ]
  }
});
/* لوحة 60×80 تبدأ بنسخة مستقلة من محطات 70×90 */
const DEFAULTS = () => { const d = DEFAULTS0(); d.timeline68 = structuredClone(d.timeline); return d; };
function E(year, tar, ten, tfr, dar, den, dfr){ return {year, t_ar:tar, t_en:ten, t_fr:tfr, d_ar:dar, d_en:den, d_fr:dfr, c_ar:'', c_en:'', c_fr:'', date:'', hy:'', photo:null, ar:0, px:50, py:50, zoom:100, toff:0, poff:0}; }   // c_ = وصف الصورة (لوحات السنوات)

const KEY = 'faisaly-museum-panels-v1';
const TEMPLATES = ['portrait','landscape','years','years68'];
/* تصاميم حُذفت: مشاريعها القديمة تُفتح على أقرب لوحة موجودة */
const legacyTpl = t => ({timeline:'years', yearsw:'years', museum:'portrait'})[t] || t;
const isObj = o => !!o && typeof o === 'object' && !Array.isArray(o);
const safeImg = v => (typeof v === 'string' && v.startsWith('data:image/') && !/["<>]/.test(v)) ? v : null;
const ENUMS = {fit:['cover','contain'], bg:['old','plain']};
function cleanVal(v, d, k){
  if(k === 'photo') return safeImg(v);
  if(ENUMS[k]) return ENUMS[k].includes(v) ? v : d;
  if(typeof d === 'number') return Number.isFinite(v) ? v : d;
  return typeof v === typeof d ? v : d;
}
/* يبني حالة سليمة من أي بيانات محفوظة أو ملف مفتوح؛ يرجع null إذا لم تكن مشروعاً */
function normalize(o){
  if(!isObj(o) || !['portrait','landscape','timeline'].some(t => isObj(o[t]))) return null;
  if('timeline' in o && !(isObj(o.timeline) && Array.isArray(o.timeline.entries))) return null;
  const out = DEFAULTS();
  if(TEMPLATES.includes(legacyTpl(o.template))) out.template = legacyTpl(o.template);
  out.logo = safeImg(o.logo);
  out.capfs = cleanVal(o.capfs, out.capfs, 'capfs');
  out.wlogo = o.wlogo === true;
  if(isObj(o.libLink)) for(const g of ['portrait','landscape','timeline','timeline68']) if(typeof o.libLink[g] === 'string') out.libLink[g] = o.libLink[g];
  out.yr = Number.isInteger(o.yr) && o.yr >= 0 ? o.yr : 0;
  for(const t of ['portrait','landscape','timeline','timeline68']){
    if(!isObj(o[t])) continue;
    for(const k in out[t]) if(k !== 'entries') out[t][k] = cleanVal(o[t][k], out[t][k], k);
  }
  // مشاريع محفوظة قبل إضافة صورة الرئيس الافتراضية: نضعها مرة واحدة (إزالتها لاحقاً تبقى محترمة)
  if(o.timeline){
    const blank = E('','','','','','','');
    out.timeline.entries = o.timeline.entries.filter(isObj).map(e => {
      const n = {...blank};
      for(const k in n) n[k] = cleanVal(e[k], blank[k], k);
      return n;
    });
  }
  // لوحة 60×80: محطاتها الخاصة، وفي المشاريع القديمة تبدأ بنسخة من محطات 70×90
  if(isObj(o.timeline68) && Array.isArray(o.timeline68.entries)){
    const blank = E('','','','','','','');
    out.timeline68.entries = o.timeline68.entries.filter(isObj).map(e => { const n = {...blank}; for(const k in n) n[k] = cleanVal(e[k], blank[k], k); return n; });
  } else if(o.timeline) out.timeline68 = structuredClone(out.timeline);
  // صياغة المرجع — فقط إذا كان النص ما زال الافتراضي القديم
  const OLD = {"Steady steps towards the first achievements.":"A step towards distinction.","جماهير أوفى وحضور أكبر في مختلف المسابقات":"جماهير أوفى ..\nوحضور أكبر\nفي مختلف المسابقات","Winning titles and establishing the club among the leading teams.":"Winning titles and establishing the club's status among the leading teams.","الفيصلي حاضر دائماً بجماهيره وتاريخه وطموحه":"الفيصلي حاضر دائماً ..\nبجماهيره وتاريخه\nوطموحه"};
  out.timeline.entries.forEach(e => { for(const k of ['d_ar','d_en']) if(OLD[e[k]]) e[k] = OLD[e[k]]; });
  return out;
}
function load(){
  try{ return normalize(JSON.parse(localStorage.getItem(KEY))); }catch(e){ return null; }
}
let S = load() || DEFAULTS();

/* الحفظ التلقائي في IndexedDB: مساحته تتسع للصور الأصلية بخلاف localStorage (نحو 5MB) */
function idbRun(mode, fn){
  return new Promise((res, rej) => {
    const q = indexedDB.open('faisaly-panels', 1);
    q.onupgradeneeded = () => q.result.createObjectStore('state');
    q.onerror = () => rej(q.error);
    q.onsuccess = () => {
      const db = q.result, tx = db.transaction('state', mode), r = fn(tx.objectStore('state'));
      tx.oncomplete = () => { db.close(); res(r.result); };
      tx.onerror = tx.onabort = () => { db.close(); rej(tx.error); };
    };
  });
}
const idbGet = () => idbRun('readonly', st => st.get('current'));
const idbSet = v => idbRun('readwrite', st => st.put(v, 'current'));
let saveT;
function save(){
  clearTimeout(saveT);
  saveT = setTimeout(async ()=>{
    try{ await idbSet(S); try{ localStorage.removeItem(KEY); }catch(e){} libSyncNow(); }
    catch(e){
      try{ localStorage.setItem(KEY, JSON.stringify(S)); }
      catch(e2){ showError('تعذّر الحفظ التلقائي — آخر تعديلاتك غير محفوظة، استخدم "💾 حفظ الكل"'); }
    }
  }, 400);
}

/* تراجع واحد عن العمليات التي تستبدل العمل (لوحة جديدة، فتح مشروع، حذف محطة...) */
let undoS = null;
function snapshot(){ undoS = structuredClone(S); document.getElementById('undo').hidden = false; }

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// بدون أسطر فارغة في الأطراف، ولا تنفصل السنة عن علامتها (1396 هـ / AH / H)
const txt = s => esc(String(s ?? '').trim().replace(/(\d) +(هـ|ه|AH|H)(?=[\s.,،:]|$)/gm, '$1\u00A0$2'));
const getP = (o, p) => p.split('.').reduce((a,k)=>a?.[k], o);
function setP(o, p, v){ const ks = p.split('.'); const last = ks.pop(); const t = ks.reduce((a,k)=>a[k], o); t[last] = v; }
function toast(m){ const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove('show'), 2600); }

/* ---------- Logo: make white transparent + crop ---------- */
function prepLogo(src){
  return new Promise(res=>{
    const im = new Image();
    im.onload = ()=>{
      const c = document.createElement('canvas'); c.width = im.width; c.height = im.height;
      const x = c.getContext('2d'); x.drawImage(im,0,0);
      const d = x.getImageData(0,0,c.width,c.height), p = d.data;
      let minX=c.width, minY=c.height, maxX=0, maxY=0;
      for(let i=0;i<p.length;i+=4){
        const w = Math.min(p[i],p[i+1],p[i+2]);
        if(w>238){ p[i+3]=0; }
        else if(w>200){ p[i+3]=Math.round(p[i+3]*(238-w)/38); }
        if(p[i+3]>20){ const k=i/4, xx=k%c.width, yy=(k/c.width)|0; if(xx<minX)minX=xx; if(xx>maxX)maxX=xx; if(yy<minY)minY=yy; if(yy>maxY)maxY=yy; }
      }
      x.putImageData(d,0,0);
      if(maxX<=minX){ res(src); return; }
      const w = maxX-minX+1, h = maxY-minY+1, s = Math.max(w,h);
      const o = document.createElement('canvas'); o.width = s; o.height = s;
      o.getContext('2d').drawImage(c, minX, minY, w, h, (s-w)/2, (s-h)/2, w, h);
      res(o.toDataURL('image/png'));
    };
    im.onerror = ()=>res(src);
    im.src = src;
  });
}

/* ---------- Translation ---------- */
function chunkText(text, max){
  const out = []; let cur = '';
  for(const w of text.split(' ')){
    if(cur && (cur + ' ' + w).length > max){ out.push(cur); cur = w; }
    else cur = cur ? cur + ' ' + w : w;
  }
  if(cur) out.push(cur);
  return out;
}
async function translate(text, tl){
  text = (text||'').trim(); if(!text) return '';
  try{
    const r = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl='+tl+'&dt=t&q='+encodeURIComponent(text));
    if(!r.ok) throw 0;
    const j = await r.json();
    const out = j[0].map(x=>x[0]).join('');
    if(!out) throw 0;
    return out;
  }catch(e){
    const out = [];
    for(const part of text.split('\n')){
      if(!part.trim()){ out.push(''); continue; }
      const pieces = [];
      for(const chunk of chunkText(part, 480)){
        const r = await fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(chunk)+'&langpair=ar|'+tl);
        if(!r.ok) throw new Error('translation failed');
        const j = await r.json(), t = j.responseData && j.responseData.translatedText;
        if(+j.responseStatus !== 200 || !t || /MYMEMORY WARNING|INVALID/i.test(t)) throw new Error('translation failed');
        pieces.push(t);
      }
      out.push(pieces.join(' '));
    }
    return out.join('\n');
  }
}
async function doTranslate(btn, pairs){
  // لوحات السنوات بالعربي والإنجليزي فقط: لا داعي لطلب الفرنسية
  if(isYears(S.template)) pairs = pairs.filter(p => p[2] !== 'fr');
  // الهدف كائن وليس رقماً: تبقى الترجمة مع محطتها إذا نُقلت أثناء الانتظار
  const jobs = pairs.map(([src, dst, tl]) => {
    const ks = dst.split('.'), key = ks.pop();
    return {text: String(getP(S, src) || '').trim(), obj: ks.reduce((a,k)=>a[k], S), key, tl};
  }).filter(j => j.text);          // لا تمسح ترجمة يدوية إذا كان العربي فارغاً
  if(!jobs.length){ toast('اكتب النص العربي أولاً'); return; }
  btn.disabled = true; const old = btn.textContent; btn.textContent = '... جاري الترجمة';
  let done = 0;
  try{
    for(const j of jobs){ j.obj[j.key] = await translate(j.text, j.tl); done++; }
  }catch(e){ console.warn(e); }
  buildSide(); render(); save();
  toast(done === jobs.length ? 'تمت الترجمة — راجع النص قبل الطباعة'
    : done ? `تُرجم ${done} من ${jobs.length} فقط — أعد المحاولة بعد التأكد من الاتصال`
    : 'تعذّرت الترجمة — لم يتغير النص، تأكد من الاتصال بالإنترنت');
  btn.disabled = false; btn.textContent = old;
}

/* ---------- Sidebar ---------- */
const ta = (path, lbl, dir='rtl', rows=4) => `<label>${lbl}</label><textarea rows="${rows}" dir="${dir}" data-b="${path}">${esc(getP(S,path))}</textarea>`;
const tx = (path, lbl, dir='rtl') => `<label>${lbl}</label><input type="text" dir="${dir}" data-b="${path}" value="${esc(getP(S,path))}">`;
const rg = (path, lbl, min, max, step=1) => `<label>${lbl}: <b data-v="${path}">${getP(S,path)}</b></label><input type="range" min="${min}" max="${max}" step="${step}" data-b="${path}" data-num value="${getP(S,path)}">`;

/* أدوات تحريك الصورة — نفسها في كل اللوحات: تكبير + أفقي + رأسي + توسيط.
   frame = محدد إطار الصورة في التصميم، لمعرفة الاتجاه الذي يمكن التحريك فيه */
function moveCtl(p, frame, zmin = 100, zmax = 250){
  return `<div class="move" data-move="${p}" data-frame="${esc(frame)}">
    ${rg(p+'.zoom',zmin<100?'التكبير / التصغير %':'تكبير %',zmin,zmax)}
    ${rg(p+'.px','تحريك أفقي',0,100)}
    ${rg(p+'.py','تحريك رأسي',0,100)}
    <button class="btn sm" style="width:100%;margin-top:8px" data-center="${p}">⊕ توسيط الصورة</button>
    <div class="hint" data-movehint></div>
  </div>`;
}
/* بعد كل رسم: نعطّل المحور الذي لا يمكن التحريك فيه ونشرح السبب */
function updateMoveCtl(){
  side.querySelectorAll('[data-move]').forEach(box => {
    const P = getP(S, box.dataset.move), fr = designEl.querySelector(box.dataset.frame);
    const img = fr && fr.querySelector('img'), hint = box.querySelector('[data-movehint]');
    if(!img) return;
    if(!img.naturalWidth){ img.addEventListener('load', updateMoveCtl, {once:true}); return; }
    const zoomed = (P.zoom || 100) !== 100, cover = getComputedStyle(img).objectFit === 'cover';
    const ia = img.naturalWidth / img.naturalHeight, fa = img.clientWidth / img.clientHeight;
    const canX = zoomed || (cover && ia > fa * 1.01), canY = zoomed || (cover && ia < fa / 1.01);
    box.querySelector(`[data-b="${box.dataset.move}.px"]`).disabled = !canX;
    box.querySelector(`[data-b="${box.dataset.move}.py"]`).disabled = !canY;
    hint.textContent = canX && canY ? '' :
      !canX && !canY ? `الصورة ظاهرة كاملة داخل الإطار — ${+box.querySelector('[data-b$=".zoom"]').min < 100 ? 'كبّرها أو صغّرها' : 'كبّرها'} أولاً لتتمكن من تحريكها.` :
      `الصورة تملأ الإطار ${canX ? 'رأسياً' : 'أفقياً'} — للتحريك ${canX ? 'رأسياً' : 'أفقياً'} كبّرها أولاً.`;
  });
}
/* حجم الخط المختار هو الحد الأعلى؛ إذا صغّره البرنامج ليتسع النص نوضّح ذلك تحت المنزلق */
function updateFsHint(){
  const r = [...side.querySelectorAll('input[type=range][data-b]')].find(x => /(^|\.)(capfs|fs|yfs)$/.test(x.dataset.b));
  if(!r) return;
  let h = side.querySelector('[data-fshint]');
  if(!h){ h = document.createElement('div'); h.className = 'hint'; h.dataset.fshint = ''; h.style.color = 'var(--m)'; r.after(h); }
  const boxes = [...designEl.querySelectorAll('.fit')].filter(f => !f.dataset.var);
  const ratios = boxes.map(f => parseFloat(f.style.getPropertyValue('--fs')) / parseFloat(f.dataset.max));
  const small = ratios.filter(x => x < .99), ratio = Math.min(1, ...ratios);
  const applied = Math.round(parseFloat(r.value) * ratio * 2) / 2;
  const even = Math.max(...ratios) - ratio < .02;   // كل النصوص صغُرت بنفس القدر
  h.textContent = !small.length ? '' : even
    ? `⚠ الحجم المطبّق فعلياً ${applied} — النص أطول من مساحته فصغُر تلقائياً ليتسع، لذلك تكبير الخط فوق هذا الحد لا يغيّر شيئاً. لخط أكبر اختصر النص.`
    : `⚠ ${small.length} من ${ratios.length} نصوص أطول من مساحتها فصغُر خطها تلقائياً ليتسع، فلن تكبر مع المنزلق. لخط أكبر اختصر نصوصها.`;
}
/* نمط صورة داخل إطار: موضع + تكبير من نفس النقطة */
const imgStyle = (e, fit='cover') => `object-fit:${fit};object-position:${e.px}% ${e.py}%;transform:scale(${(e.zoom||100)/100});transform-origin:${e.px}% ${e.py}%`;

function photoBlock(t){
  const P = S[t];
  return `<fieldset><legend>الصورة</legend>
    <div class="row"><button class="btn pri" data-pick="${t}.photo">📷 اختيار صورة</button>${P.photo?`<button class="btn danger" data-clear="${t}.photo">إزالة</button>`:''}</div>
    <div class="hint">أو اسحب الصورة وأفلتها فوق التصميم / اضغط على إطار الصورة.</div>
    <label>طريقة العرض</label>
    <select data-b="${t}.fit"><option value="cover" ${P.fit==='cover'?'selected':''}>ملء الإطار (قص)</option><option value="contain" ${P.fit==='contain'?'selected':''}>الصورة كاملة بدون قص</option></select>
    ${P.photo ? moveCtl(t, '[data-drop]') : ''}
    ${!isTL(t) ? `<label><input type="checkbox" data-b="${t}.gray" data-chk ${P.gray?'checked':''}> أبيض وأسود</label>`:''}
  </fieldset>`;
}
function textBlock(t){
  return `<fieldset><legend>${t==='portrait'?'النصوص (تحت الصورة)':'النصوص (يسار الصورة)'}</legend>
    ${ta(t+'.ar','النص العربي','rtl',6)}
    <button class="btn pri" style="width:100%;margin-top:8px" data-tr="${t}">🌐 ترجم إلى الإنجليزية والفرنسية</button>
    ${ta(t+'.en','English','ltr',6)}
    ${ta(t+'.fr','Français','ltr',6)}
    ${rg('capfs','حجم الخط (نفس الحجم في الطولي والعرضي)',8,40,.5)}
    <div class="hint">الترجمة آلية — يمكنك تعديلها مباشرة.</div>
  </fieldset>`;
}
function buildSide(){
  const t = S.template;
  libRelink();
  let h = `<h1>صانع لوحات المتحف</h1><div class="sub">النادي الفيصلي السعودي — صورة + نص عربي + ترجمة (إنجليزي، وفرنسي في الطولي والعرضي)</div>
  ${libStatusHTML()}
  <div class="tabs">
    <button data-tpl="portrait" class="${t==='portrait'?'on':''}">▯ طولي</button>
    <button data-tpl="landscape" class="${t==='landscape'?'on':''}">▭ عرضي</button>
    <button data-tpl="years" class="${t==='years'?'on':''}">▣ لوحة لكل سنة</button>
    <button data-tpl="years68" class="${t==='years68'?'on':''}">▯ لوحة لكل سنة 60×80</button>
  </div>`;
  if(!isTL(t)){ h += photoBlock(t) + textBlock(t); }
  else{
    const K = TK(t), T = S[K];   // محطات اللوحة المفتوحة فقط (70×90 أو 60×80)
    h += `<fieldset><legend>اللوحات (${T.entries.length})</legend>
      <div class="hint" style="margin-top:0">لوحة مستقلة لكل سنة. اختر السنة لعرض لوحتها وتعديلها:</div>
      <div class="yrchips">${T.entries.map((e,i)=>`<button class="btn sm ${i===Math.min(S.yr,T.entries.length-1)?'pri':''}" data-yr="${i}">${esc(e.year)||('محطة '+(i+1))}</button>`).join('')}</div>
      ${rg(K+'.yfs','حجم الخط',18,44,.5)}
      <label>شريط السنوات (السهم الزمني) — كل السنوات من / إلى:</label>
      <div class="row"><input type="text" dir="ltr" data-b="${K}.sfrom" value="${esc(T.sfrom)}" placeholder="من سنة" style="flex:1"><input type="text" dir="ltr" data-b="${K}.sto" value="${esc(T.sto)}" placeholder="إلى سنة" style="flex:1"></div>
      <div class="hint">يظهر كل عام بين السنتين، وسنة اللوحة الحالية مميزة. اتركهما فارغتين ليمتد الشريط من أول محطة إلى آخرها.</div>
      ${yearOutOfStrip(T, T.entries[Math.min(S.yr,T.entries.length-1)]) ? `<div class="hint" style="color:var(--m)">⚠ سنة هذه اللوحة (${esc(T.entries[Math.min(S.yr,T.entries.length-1)].year)}) خارج مدى الشريط، فلن تظهر عليه مميزة. وسّع المدى إذا أردت ظهورها.</div>` : ''}
      ${rg(K+'.entries.'+Math.min(S.yr,T.entries.length-1)+'.poff','موضع الصورة (لهذه اللوحة): سالب = رفع، موجب = تنزيل',-80,150)}
      ${rg(K+'.entries.'+Math.min(S.yr,T.entries.length-1)+'.toff','موضع النص تحت الصورة (لهذه اللوحة): سالب = رفع، موجب = تنزيل',-50,150)}
      <button class="btn pri" style="width:100%;margin-top:10px" data-expall>⬇ تصدير كل اللوحات (${T.entries.length})</button>
      <div class="hint">كل لوحة في ملف مستقل بالصيغة والجودة المختارتين في الأعلى. إذا سألك المتصفح عن تنزيل عدة ملفات، اختر «السماح».</div>
    </fieldset>`;
    h += `<fieldset><legend>الشكل</legend>
      <label>الخلفية</label>
      <select data-b="${K}.bg"><option value="old" ${T.bg==='old'?'selected':''}>ورق تاريخي قديم</option><option value="plain" ${T.bg==='plain'?'selected':''}>بيج سادة</option></select>
      <label><input type="checkbox" data-b="${K}.sepia" data-chk ${T.sepia?'checked':''}> صور بلون قديم (سيبيا)</label>
    </fieldset>
    <fieldset><legend>المحطات (${T.entries.length})</legend>
    <button class="btn pri" style="width:100%;margin-bottom:10px" data-trall>🌐 ترجم جميع المحطات</button>`;
    T.entries.forEach((e,i)=>{
      const b = `${K}.entries.${i}`;
      if(i!==Math.min(S.yr,T.entries.length-1)) return;   // لوحات السنوات: نعرض محطة اللوحة الحالية فقط
      h += `<div class="entry"><h4><span>محطة ${i+1}</span><span>
        ${i>0?`<button class="btn sm" data-mv="${i}" data-d="-1" title="تقديم">▲</button>`:''}
        ${i<T.entries.length-1?`<button class="btn sm" data-mv="${i}" data-d="1" title="تأخير">▼</button>`:''}
        <button class="btn sm danger" data-del="${i}">حذف</button></span></h4>
        <div class="hint">اكتب السنة الهجرية أو الميلادية — الأخرى تُحوَّل تلقائياً</div>
        ${tx(b+'.hy','السنة الهجرية','ltr')}
        ${tx(b+'.year','السنة الميلادية','ltr')}
        ${tx(b+'.t_ar','العنوان')}
        ${ta(b+'.d_ar','الوصف','rtl',2)}
        ${ta(b+'.c_ar','وصف الصورة (من في الصورة، المكان، المناسبة)','rtl',3)}
        <div class="row" style="margin-top:8px"><button class="btn sm pri" data-pick="${b}.photo">📷 صورة</button>${e.photo?`<button class="btn sm danger" data-clear="${b}.photo">إزالة الصورة</button>`:''}<button class="btn sm" data-tre="${i}">🌐 ترجم</button></div>
        ${e.photo?`<img class="thumb" src="${e.photo}"><div class="hint">تظهر الصورة كاملة بنسبتها الأصلية بدون قص. التكبير اختياري.</div>${moveCtl(b, `[data-entry="${i}"]`)}`:''}
        ${tx(b+'.t_en','Title (EN)','ltr')}${ta(b+'.d_en','Description (EN)','ltr',2)}
        ${ta(b+'.c_en','Photo caption (EN)','ltr',3)}
      </div>`;
    });
    h += `<button class="btn" style="width:100%" data-add>＋ إضافة محطة</button>
      <button class="btn sm" style="width:100%;margin-top:6px" data-resettl>↺ استعادة المحطات الافتراضية (8)</button>
      <div class="hint">يُفضّل من 5 إلى 9 محطات. الصورة لكل محطة اختيارية.</div></fieldset>`;
  }
  h += `<fieldset><legend>الشعار</legend><div class="row"><button class="btn sm" data-pick="logo">تغيير الشعار</button>${S.logo?'<button class="btn sm danger" data-clear="logo">الشعار الافتراضي</button>':''}</div>
    <label><input type="checkbox" data-b="wlogo" data-chk ${S.wlogo?'checked':''}> الشعار باللون الأبيض</label>
    <div class="hint">الشعار الأبيض يناسب الخلفيات الداكنة أو الصور — على الخلفية البيضاء أو الفاتحة لن يظهر.</div></fieldset>`;
  document.getElementById('side').innerHTML = h;
}

/* ---------- Design rendering ---------- */
function photoHTML(P, cls=''){
  if(!P.photo) return `<div class="ph ${cls}" data-drop><div class="empty">＋ أضف صورة</div></div>`;
  const st = `${imgStyle(P, P.fit||'cover')};${P.gray?'filter:grayscale(1)':''}`;
  return `<div class="ph ${cls}" data-drop><img src="${P.photo}" style="${st}"></div>`;
}
const logoSrc = () => S.logo || LOGO;

const SIZES = {portrait:[1200,1700], landscape:[2100,1500], years:YEARS_SIZE, years68:YEARS_M_SIZE};
const isTL = t => isYears(t);   // لوحات السنوات: المحطات في S[TK(t)]

function render(){
  const t = S.template, el = document.getElementById('design');
  let h = '';
  if(t==='portrait'){
    const P = S.portrait;
    h = `<div class="d portrait" style="--fs:${S.capfs}px">
      <div class="top">${photoHTML(P,'card')}</div>
      <div class="card cap">
        <div style="display:flex;justify-content:center"><img class="logo" src="${logoSrc()}"></div>
        <div class="col fit" data-group="pcap" data-strict data-max="${S.capfs}"><div class="t">${txt(P.fr)}</div></div>
        <div class="col fit" data-group="pcap" data-strict data-max="${S.capfs}"><div class="t">${txt(P.en)}</div></div>
        <div class="col ar fit" data-group="pcap" data-strict data-max="${S.capfs}"><div class="t ar">${txt(P.ar)}</div></div>
      </div></div>`;
  } else if(t==='landscape'){
    const P = S.landscape;
    h = `<div class="d landscape" style="--fs:${S.capfs}px">
      <div class="card cap">
        <div style="display:flex;justify-content:center"><img class="logo" src="${logoSrc()}"></div>
        <div class="col ar fit" data-group="lcap" data-strict data-max="${S.capfs}"><div class="t ar">${txt(P.ar)}</div></div>
        <div class="col fit" data-group="lcap" data-strict data-max="${S.capfs}"><div class="t">${txt(P.en)}</div></div>
        <div class="col fit" data-group="lcap" data-strict data-max="${S.capfs}"><div class="t">${txt(P.fr)}</div></div>
      </div>
      ${photoHTML(P,'card')}
    </div>`;
  } else {
    h = renderYears(t);
  }
  el.innerHTML = h;
  if(el.firstElementChild) el.firstElementChild.classList.toggle('wlogo', !!S.wlogo);
  autoFit(); fixJustify(); fitStage(); updateMoveCtl(); updateFsHint();
}
let fitOverflow = 0;
function autoFit(){
  const groups = {};
  const boxes = [...document.querySelectorAll('#design .fit')];
  boxes.forEach(f=>{
    const v = f.dataset.var || '--fs';
    let fs = parseFloat(f.dataset.max);
    f.style.setProperty(v, fs+'px');
    // يتسع الصندوق أولاً (حتى data-growx) ليبقى الخط بحجمه، ثم يصغر الخط إن لزم
    if(f.dataset.growx){
      f.style.width = '';
      let w = f.offsetWidth;
      while(w < +f.dataset.growx && (f.scrollHeight > f.clientHeight+1 || f.scrollWidth > f.clientWidth+1)){ w += 10; f.style.width = w+'px'; }
    }
    while((f.scrollHeight > f.clientHeight+1 || f.scrollWidth > f.clientWidth+1) && fs > 9){ fs -= .5; f.style.setProperty(v, fs+'px'); }
    if(f.dataset.group) (groups[f.dataset.group] = groups[f.dataset.group] || []).push({f, v, fs});
  });
  // نفس حجم الخط لكل المجموعة، لكن نص طويل واحد لا يصغّر الباقي تحت 75%
  for(const g in groups){
    const first = groups[g][0].f;
    const floor = first.dataset.strict !== undefined ? 0 : parseFloat(first.dataset.max) * .75;
    const base = Math.max(Math.min(...groups[g].map(x=>x.fs)), floor);
    groups[g].forEach(x=>x.f.style.setProperty(x.v, Math.min(x.fs, base)+'px'));
  }
  if(!document.getElementById('stage').clientWidth) return;   // المعاينة مخفية: تُفحص عند ظهورها
  const over = boxes.filter(f => f.scrollHeight > f.clientHeight+1 || f.scrollWidth > f.clientWidth+1).length;
  if(over && !fitOverflow) toast('نص طويل لا يتسع في إطاره وسيُقص — اختصره قبل الطباعة');
  fitOverflow = over;
}
function fitStage(){
  const [W,H] = SIZES[S.template], st = document.getElementById('stage');
  if(!st.clientWidth) return;   // المعاينة مخفية (تبويب التعديل في الجوال)
  const pad = parseFloat(getComputedStyle(st).paddingLeft) * 2;
  const s = Math.min((st.clientWidth-pad)/W, (st.clientHeight-pad)/H, 1);
  const box = document.getElementById('box'), sc = document.getElementById('scaler');
  box.style.width = W*s+'px'; box.style.height = H*s+'px';
  sc.style.transform = `scale(${s})`;
}
window.addEventListener('resize', fitStage);

/* ---------- الجوال: تبويبا معاينة/تعديل ---------- */
document.getElementById('mobtabs').addEventListener('click', e=>{
  const b = e.target.closest('[data-view]'); if(!b) return;
  const v = b.dataset.view;
  document.body.classList.toggle('m-preview', v==='preview');
  document.body.classList.toggle('m-edit', v==='edit');
  document.querySelectorAll('#mobtabs button').forEach(x=>x.classList.toggle('on', x===b));
  if(v==='preview') render();   // ضبط حجم الخط يحتاج المعاينة ظاهرة
});
matchMedia('(max-width:900px)').addEventListener('change', ()=>render());

/* ---------- Image picking ---------- */
let pickTarget = null;
const readImg = f => new Promise((res,rej)=>{ const r = new FileReader(); r.onload = ()=>res(r.result); r.onerror = rej; r.readAsDataURL(f); });
async function setImage(path, file){
  if(!file || !file.type.startsWith('image/')) return;
  let data = await readImg(file);
  if(path==='logo') data = await prepLogo(data);
  setP(S, path, data);
  // صور المحطات: نحفظ نسبة الأبعاد الأصلية فقط — الصورة نفسها تبقى كما هي بدون تعديل
  const m = path.match(/^(timeline|timeline68)\.entries\.(\d+)\.photo$/);
  if(m) S[m[1]].entries[+m[2]].ar = await photoAspect(data);
  buildSide(); render(); save();
}
document.getElementById('hiddenImg').addEventListener('change', e=>{ if(pickTarget) setImage(pickTarget, e.target.files[0]); e.target.value=''; });
function pick(path){ pickTarget = path; document.getElementById('hiddenImg').click(); }

/* ---------- Events ---------- */
const side = document.getElementById('side');
side.addEventListener('input', e=>{
  const p = e.target.dataset.b; if(!p) return;
  let v = e.target.value;
  if(e.target.dataset.chk !== undefined) v = e.target.checked;
  else if(e.target.dataset.num !== undefined){ v = parseFloat(v); const b = side.querySelector(`[data-v="${p}"]`); if(b) b.textContent = v; }
  setP(S, p, v);
  // لوحات السنوات: كتابة إحدى السنتين تملأ الأخرى تلقائياً
  const m = /^((?:timeline|timeline68)\.entries\.\d+)\.(hy|year)$/.exec(p);
  const other = m && side.querySelector(`[data-b="${m[1]}.${m[2]==='hy'?'year':'hy'}"]`);
  if(other){
    const s = String(v).trim(), conv = m[2]==='hy' ? hijriToGreg(s) : gregToHijri(s);
    if(conv){ setP(S, other.dataset.b, conv); other.value = conv; }
  }
  renderSoon(); save();
});
/* الكتابة السريعة: رسم واحد لكل إطار شاشة بدل رسم مع كل حرف */
let renderQ = 0;
function renderSoon(){ if(!renderQ) renderQ = requestAnimationFrame(() => { renderQ = 0; render(); }); }
side.addEventListener('change', e=>{ if(e.target.dataset.chk !== undefined){ setP(S, e.target.dataset.b, e.target.checked); render(); save(); } });
side.addEventListener('click', e=>{
  const b = e.target.closest('button'); if(!b) return;
  const d = b.dataset;
  if(d.tpl){ S.template = d.tpl; buildSide(); render(); save(); }
  else if(d.yr !== undefined){ S.yr = +d.yr; buildSide(); render(); save(); }
  else if(d.expall !== undefined){ exportAll(b); }
  else if(d.lib !== undefined){ libOpenDlg(); }
  else if(d.libsave !== undefined){ libSaveCurrent(); }
  else if(d.pick){ pick(d.pick); }
  else if(d.center){ setP(S, d.center+'.px', 50); setP(S, d.center+'.py', 50); buildSide(); render(); save(); }
  else if(d.clear){ setP(S, d.clear, null); buildSide(); render(); save(); }
  else if(d.tr){ const t = d.tr; doTranslate(b, [[t+'.ar', t+'.en','en'],[t+'.ar', t+'.fr','fr']]); }
  else if(d.tre !== undefined){ const p = TK()+'.entries.'+d.tre; doTranslate(b, ['t','d','c'].flatMap(k=>[[`${p}.${k}_ar`,`${p}.${k}_en`,'en'],[`${p}.${k}_ar`,`${p}.${k}_fr`,'fr']])); }
  else if(d.trall !== undefined){ const pairs = []; S[TK()].entries.forEach((_,i)=>{ const p=TK()+'.entries.'+i; ['t','d','c'].forEach(k=>{ pairs.push([`${p}.${k}_ar`,`${p}.${k}_en`,'en'],[`${p}.${k}_ar`,`${p}.${k}_fr`,'fr']); }); }); doTranslate(b, pairs); }
  else if(d.resettl !== undefined){ if(confirm('استبدال المحطات الحالية بالمحطات الافتراضية؟')){ snapshot(); S[TK()].entries = DEFAULTS().timeline.entries; buildSide(); render(); save(); } }
  else if(d.add !== undefined){ S[TK()].entries.push(E('','','','','','','')); buildSide(); render(); save(); side.scrollTop = side.scrollHeight; }
  else if(d.del !== undefined){ if(confirm('حذف هذه المحطة؟')){ snapshot(); S[TK()].entries.splice(+d.del,1); buildSide(); render(); save(); } }
  else if(d.mv !== undefined){ const a = S[TK()].entries, i = +d.mv, j = i + +d.d; [a[i],a[j]] = [a[j],a[i]]; buildSide(); render(); save(); }
});
const designEl = document.getElementById('design');
designEl.addEventListener('click', e=>{
  const fr = e.target.closest('[data-entry]');
  if(fr){ pick(TK()+'.entries.'+fr.dataset.entry+'.photo'); return; }
  if(e.target.closest('[data-drop]') && !isTL(S.template)) pick(S.template+'.photo');
});
const stage = document.getElementById('stage');
stage.addEventListener('dragover', e=>{ e.preventDefault(); });
stage.addEventListener('drop', e=>{
  e.preventDefault(); const f = e.dataTransfer.files[0]; if(!f) return;
  if(isTL(S.template)){
    const fr = e.target.closest('[data-entry]');
    if(fr) setImage(TK()+'.entries.'+fr.dataset.entry+'.photo', f);
    else toast('أفلت الصورة فوق إطار المحطة المطلوبة');
    return;
  }
  setImage(S.template+'.photo', f);
});

/* ---------- Export ---------- */
/* يصدّر التصميم المعروض الآن إلى ملف؛ يرجع حجمه أو يرمي خطأ */
async function exportCurrent(){
  await document.fonts.ready;
  const node = designEl.firstElementChild;
  const ratio = +document.getElementById('ratio').value;
  const fmt = document.getElementById('fmt').value;   // png | jpg
  // الإطارات الفارغة لا تظهر في الصورة النهائية
  const canvas = await htmlToImage.toCanvas(node, {pixelRatio: ratio, cacheBust: true,
    filter: n => !(n.classList && (n.classList.contains('ph-empty') || n.classList.contains('empty')))});
  // ملف مباشر (Blob) بدل رابط نصي طويل — أوثق مع الصور الكبيرة
  const blob = await new Promise((res, rej) => canvas.toBlob(
    bl => bl ? res(bl) : rej(new Error('الصورة أكبر من قدرة المتصفح')),
    fmt === 'jpg' ? 'image/jpeg' : 'image/png', 0.95));
  canvas.width = canvas.height = 0;   // تحرير الذاكرة
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  let name = {portrait:'لوحة-طولية', landscape:'لوحة-عرضية', years:'لوحة-سنة', years68:'لوحة-سنة-60x80'}[S.template];
  if(isYears(S.template)){
    const i = Math.min(S.yr, S[TK()].entries.length-1), y = String(S[TK()].entries[i]?.year || '').replace(/[\\/:*?"<>|\s]+/g,'-');
    name += `-${String(i+1).padStart(2,'0')}${y?'-'+y:''}`;
  }
  a.download = `${name}-${new Date().toISOString().slice(0,16).replace(/[T:]/g,'-')}.${fmt}`; a.href = url;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 60000);
  return blob.size;
}
document.getElementById('exp').addEventListener('click', async e=>{
  const b = e.currentTarget; b.disabled = true; b.textContent = '... جاري التصدير'; clearError();
  try{
    const size = await exportCurrent();
    toast(`تم التصدير ✔ (${(size/1048576).toFixed(1)} MB)`);
  }catch(err){ console.error(err); toast('تعذّر التصدير'); showError('تعذّر التصدير: '+(err && err.message || err) + ' — جرّب جودة أقل (×2) أو صيغة JPG'); }
  b.disabled = false; b.textContent = '⬇ تصدير';
});
/* لوحات السنوات: كل لوحة في ملف مستقل */
async function exportAll(btn){
  const n = S[TK()].entries.length, keep = S.yr;
  const exp = document.getElementById('exp');
  btn.disabled = exp.disabled = true; clearError();
  let done = 0;
  try{
    for(let i = 0; i < n; i++){
      btn.textContent = `... جاري تصدير ${i+1} من ${n}`;
      S.yr = i; render();
      await new Promise(r => setTimeout(r, 120));
      await exportCurrent(); done++;
      await new Promise(r => setTimeout(r, 400));   // مهلة بين التنزيلات
    }
    toast(`تم تصدير ${done} لوحات ✔`);
  }catch(err){ console.error(err); showError(`تعذّر التصدير بعد ${done} من ${n}: `+(err && err.message || err) + ' — جرّب جودة أقل (×2) أو صيغة JPG'); }
  S.yr = keep; buildSide(); render();
  exp.disabled = false;
}

/* ---------- Project files ---------- */
function downloadJSON(data, name){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], {type:'application/json'}));
  a.download = name; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 60000);
}
const refresh = () => { buildSide(); render(); save(); };
/* الصور في ملف «حفظ الكل»: كل صورة تُكتب مرة واحدة في جدول images، وفي مكانها مرجع "@img:رقم"
   (نفس الصورة موجودة في المحرر وفي المكتبة — بدون هذا يتضاعف حجم الملف) */
function packImages(o){
  const images = {}, ids = new Map();
  const packed = JSON.parse(JSON.stringify(o, (k, v) => {
    if(typeof v !== 'string' || !v.startsWith('data:image/')) return v;
    if(!ids.has(v)){ const id = 'i' + ids.size; ids.set(v, id); images[id] = v; }
    return '@img:' + ids.get(v);
  }));
  return {...packed, images};
}
function unpackImages(o){
  if(!isObj(o) || !isObj(o.images)) return o;   // ملفات قديمة بدون جدول صور
  const T = o.images;
  const walk = v => typeof v === 'string' ? (v.startsWith('@img:') ? (typeof T[v.slice(5)] === 'string' ? T[v.slice(5)] : null) : v)
    : Array.isArray(v) ? v.map(walk) : isObj(v) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)])) : v;
  const {images, ...rest} = o;
  return walk(rest);
}
/* حفظ الكل: الحالة الحالية + كل لوحات المكتبة بصورها ونصوصها في ملف واحد */
document.getElementById('saveProj').onclick = async e=>{
  const b = e.currentTarget, old = b.textContent; b.disabled = true; b.textContent = '... جاري الحفظ';
  try{
    await libSafeguard(['portrait','landscape','timeline','timeline68']);   // ما لم يُحفظ بعد يدخل المكتبة أولاً
    save(); libUpdateCount(); buildSide();
    const library = await libExportAll();
    downloadJSON(packImages({...S, library}), `كل-لوحات-النادي-${new Date().toISOString().slice(0,10)}.json`);
    toast(`تم حفظ ${library.length} لوحة بصورها ونصوصها في ملف واحد ✔`);
  }catch(err){ console.error(err); showError('تعذّر الحفظ: '+(err && err.message || err)); }
  b.disabled = false; b.textContent = old;
};
document.getElementById('openProj').onclick = ()=> document.getElementById('projFile').click();
document.getElementById('projFile').addEventListener('change', async e=>{
  const f = e.target.files[0]; if(!f) return;
  e.target.value = '';
  let raw = null, next = null;
  try{ raw = unpackImages(JSON.parse(await f.text())); next = normalize(raw); }catch(err){}
  if(!next){ toast('هذا الملف ليس مشروع لوحات — لم يتغير عملك'); return; }
  await libSyncNow();
  await libSafeguard(['portrait','landscape','timeline','timeline68']);   // لا يضيع عمل غير محفوظ
  const r = await libImport(raw.library);
  // لوحة نسختها في المكتبة أحدث من الملف: نعرض النسخة الأحدث في المحرر ونبقيها مرتبطة،
  // بدل نسخة الملف القديمة (التي كانت تُحفظ لاحقاً كلوحة مكررة)
  for(const g in next.libLink){
    const id = next.libLink[g];
    if(!r.kept.has(id)) continue;
    let d = null; try{ d = await libGetData(id); }catch(err){}
    const m = isObj(d) ? normalize({...next, ...d, template: next.template, libLink: next.libLink}) : null;
    if(m) next = m; else delete next.libLink[g];
  }
  snapshot(); S = next; refresh();
  const parts = [r.added && `أُضيفت ${r.added}`, r.updated && `حُدّثت ${r.updated}`, r.kept.size && `بقيت ${r.kept.size} لأن نسختك أحدث`].filter(Boolean);
  toast('تم فتح الملف' + (parts.length ? ' — لوحات المكتبة: ' + parts.join('، ') : '') + ' — يمكنك التراجع بزر "تراجع"');
});
document.getElementById('undo').onclick = ()=>{
  if(!undoS) return;
  S = undoS; undoS = null;
  document.getElementById('undo').hidden = true;
  refresh(); toast('تم التراجع');
};
document.getElementById('clearCur').onclick = async ()=>{
  const t = S.template;
  const msg = isTL(t)
    ? `تفريغ كل محطات لوحات السنوات ${t==='years68'?'60×80':'70×90'} وصورها؟\n(اللوحات بالمقاس الآخر لا تتأثر)`
    : 'تفريغ اللوحة الحالية (الصورة والنصوص)؟';
  if(!confirm(msg)) return;
  const g = libGroup(t);
  await libSyncNow();
  const wasLinked = !!S.libLink[g], kept = wasLinked ? null : (await libSafeguard([g]))[0];
  delete S.libLink[g];   // اللوحة الجديدة لا تكتب فوق المحفوظة
  snapshot();
  if(isTL(t)) S[TK(t)].entries = S[TK(t)].entries.map(()=>E('','','','','','',''));
  else{
    Object.assign(S[t], {photo:null, ar:'', en:'', fr:'', px:50, py:50, zoom:100, fit:'cover', gray:false});
  }
  refresh(); libUpdateCount();
  toast('تم التفريغ' + (kept ? ` — حُفظت السابقة في المكتبة باسم «${kept.name}»` : wasLinked ? ' — اللوحة السابقة باقية في المكتبة' : '') + '، ويمكنك التراجع بزر "تراجع"');
};

/* ---------- Init ---------- */
(async ()=>{
  if(!window.htmlToImage) showError('مكتبة التصدير لم تُحمّل — تأكد أن مجلد js/vendor موجود بجانب index.html');
  LOGO = await prepLogo(LOGO);
  let saved = null;
  try{ saved = normalize(await idbGet()); }catch(e){}
  if(saved) S = saved;
  else if(localStorage.getItem(KEY)) save();     // نقل الحفظ القديم إلى IndexedDB
  await libLoad();
  const ht = location.hash.slice(1); if(Object.hasOwn(SIZES, ht)) S.template = ht;
  try{ buildSide(); render(); }
  catch(err){
    console.error(err);
    // لا نمسح المحفوظ: نجرّب تصميماً آخر، ثم نبدأ مؤقتاً مع تنزيل نسخة احتياطية
    try{ S.template = 'landscape'; buildSide(); render(); showError('تعذّر فتح التصميم المحفوظ — فُتح التصميم العرضي، وبياناتك كما هي'); }
    catch(err2){
      console.error(err2);
      downloadJSON(S, 'نسخة-احتياطية-لوحات.json');
      S = DEFAULTS(); buildSide(); render();
      showError('تعذّرت قراءة البيانات المحفوظة — نزّلنا لك نسخة احتياطية منها');
    }
  }
  document.fonts.ready.then(render);
})();
