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

const DEFAULTS = () => ({
  template: 'landscape',
  logo: null,
  capfs: 18,   // حجم خط المربع السفلي — مشترك بين الطولي والعرضي
  portrait: {
    photo: null, fit: 'cover', px: 50, py: 50, zoom: 100, fs: 16.5, sfs: 30,
    side_ar: "رحلة النادي\nإلى الكويت والعراق\n1395 هـ",
    side_en: "Club trip\nto Kuwait and Iraq\n1395 AH",
    side_fr: "Voyage du club\nau Koweït et en Irak\n1395 H",
    ar: "صورة من رحلة النادي إلى دولتي الكويت والعراق لإقامة مباريات دولية ودية في سنة 1395 هـ ويظهر في الصورة :\nرئيس النادي الأستاذ/ محمد بن خريف الناشي (رحمه الله)\nوالأستاذ/ عبدالله بن ناصر العميم ،\nوالأستاذ/ عبدالمحسن بن حمد العميم (رحمه الله) ، والأستاذ/ حسن بن حمد بن حسن ، والأستاذ/ أحمد بن خريف الناشي",
    en: "Photo from the club's trip to Kuwait and Iraq to play international friendly matches in 1395 AH. The photo features:\n• Club President, Mr. Mohammed bin Kharif Al-Nashi (may Allah have mercy on him)\n• Mr. Abdullah bin Nasser Al-Omaim\n• Mr. Abdulmohsen bin Hamad Al-Omaim (may Allah have mercy on him)\n• Mr. Hassan bin Hamad bin Hassan\n• Mr. Ahmed bin Kharif Al-Nashi",
    fr: "Photo du voyage du club au Koweït et en Irak pour disputer des matches amicaux internationaux en 1395 H. Sont présents sur la photo :\n• Le président du club, M. Mohammed bin Kharif Al-Nashi (que Dieu lui fasse miséricorde)\n• M. Abdullah bin Nasser Al-Omaim\n• M. Abdulmohsen bin Hamad Al-Omaim (que Dieu lui fasse miséricorde)\n• M. Hassan bin Hamad bin Hassan\n• M. Ahmed bin Kharif Al-Nashi"
  },
  landscape: {
    photo: null, fit: 'cover', px: 50, py: 50, zoom: 100, fs: 23, gray: false,
    ar: "صورة من زيارة صاحب السمو الملكي الأمير / فيصل بن فهد بن عبدالعزيز (رحمه الله) الرئيس العام لرعاية الشباب لمقر النادي الفيصلي بحرمة في حفل أقيم بهذه المناسبة سنة 1396 هـ\nويظهر في الصورة الأستاذ / عبدالله بن ناصر العميم وهدية النادي الى سموه",
    en: "Photo from the visit of His Royal Highness Prince Faisal bin Fahd bin Abdulaziz (may Allah have mercy on him), General President of Youth Welfare, to the headquarters of Al-Faisaly Club in Harmah, during a ceremony held on this occasion in 1396 AH. The photo shows Mr. Abdullah bin Nasser Al-Omaim and the commemorative gift presented by the club to His Highness.",
    fr: "Photo de la visite de Son Altesse Royale le Prince Faisal bin Fahd bin Abdulaziz (que Dieu lui fasse miséricorde), Président général du Bien-être de la Jeunesse, au siège du club Al-Faisaly à Harmah, lors d’une cérémonie organisée à cette occasion en 1396 H. La photo montre également M. Abdullah bin Nasser Al-Omaim ainsi que le cadeau commémoratif offert par le club à Son Altesse."
  },
  timeline: {
    fs: 18, bg: 'old', sepia: true,
    end_ar: "المستقبل .. مستمر", end_en: "The journey continues", end_fr: "Le parcours continue",
    name_ar: "النادي الفيصلي السعودي", name_en: "AL FAISALY SAUDI CLUB",
    sl_ar: "أكثر من ناد .. هوية وانتماء", sl_en: "More than a club .. a belonging", sl_fr: "Plus qu’un club .. une appartenance",
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
function E(year, tar, ten, tfr, dar, den, dfr){ return {year, t_ar:tar, t_en:ten, t_fr:tfr, d_ar:dar, d_en:den, d_fr:dfr, photo:null, px:50, py:50}; }

const KEY = 'faisaly-museum-panels-v1';
const TEMPLATES = ['portrait','landscape','timeline','wall','wall4'];
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
  if(TEMPLATES.includes(o.template)) out.template = o.template;
  out.logo = safeImg(o.logo);
  out.capfs = cleanVal(o.capfs, out.capfs, 'capfs');
  for(const t of ['portrait','landscape','timeline']){
    if(!isObj(o[t])) continue;
    for(const k in out[t]) if(k !== 'entries') out[t][k] = cleanVal(o[t][k], out[t][k], k);
  }
  if(o.timeline){
    const blank = E('','','','','','','');
    out.timeline.entries = o.timeline.entries.filter(isObj).map(e => {
      const n = {...blank};
      for(const k in n) n[k] = cleanVal(e[k], blank[k], k);
      return n;
    });
  }
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
    try{ await idbSet(S); try{ localStorage.removeItem(KEY); }catch(e){} }
    catch(e){
      try{ localStorage.setItem(KEY, JSON.stringify(S)); }
      catch(e2){ showError('تعذّر الحفظ التلقائي — آخر تعديلاتك غير محفوظة، استخدم "حفظ المشروع"'); }
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

function photoBlock(t){
  const P = S[t];
  return `<fieldset><legend>الصورة</legend>
    <div class="row"><button class="btn pri" data-pick="${t}.photo">📷 اختيار صورة</button>${P.photo?`<button class="btn danger" data-clear="${t}.photo">إزالة</button>`:''}</div>
    <div class="hint">أو اسحب الصورة وأفلتها فوق التصميم / اضغط على إطار الصورة.</div>
    <label>طريقة العرض</label>
    <select data-b="${t}.fit"><option value="cover" ${P.fit==='cover'?'selected':''}>ملء الإطار (قص)</option><option value="contain" ${P.fit==='contain'?'selected':''}>الصورة كاملة بدون قص</option></select>
    ${rg(t+'.zoom','تكبير %',100,250)}
    ${rg(t+'.px','تحريك أفقي',0,100)}
    ${rg(t+'.py','تحريك رأسي',0,100)}
    ${!isTL(t) ? `<label><input type="checkbox" data-b="${t}.gray" data-chk ${P.gray?'checked':''}> أبيض وأسود</label>`:''}
  </fieldset>`;
}
function textBlock(t){
  const side = t!=='portrait' ? '' : `<fieldset><legend>العمود الجانبي (بجانب الصورة)</legend>
    ${ta(t+'.side_ar','النص العربي','rtl',4)}
    <button class="btn pri" style="width:100%;margin-top:8px" data-trside>🌐 ترجم إلى الإنجليزية والفرنسية</button>
    ${ta(t+'.side_en','English','ltr',4)}
    ${ta(t+'.side_fr','Français','ltr',4)}

    <div class="hint">مناسب للعنوان أو التاريخ أو المناسبة. حجم خطه نفس حجم المربع السفلي.</div>
  </fieldset>`;
  return side + `<fieldset><legend>${t==='portrait'?'نصوص الصندوق السفلي':'النصوص'}</legend>
    ${ta(t+'.ar','النص العربي','rtl',6)}
    <button class="btn pri" style="width:100%;margin-top:8px" data-tr="${t}">🌐 ترجم إلى الإنجليزية والفرنسية</button>
    ${ta(t+'.en','English','ltr',6)}
    ${ta(t+'.fr','Français','ltr',6)}
    ${rg('capfs','حجم الخط (نفس الحجم في الطولي والعرضي)',12,40,.5)}
    <div class="hint">الترجمة آلية — يمكنك تعديلها مباشرة.</div>
  </fieldset>`;
}
function buildSide(){
  const t = S.template;
  let h = `<h1>صانع لوحات المتحف</h1><div class="sub">النادي الفيصلي السعودي — صورة + نص عربي + ترجمة إنجليزي وفرنسي</div>
  <div class="tabs">
    <button data-tpl="portrait" class="${t==='portrait'?'on':''}">▯ طولي</button>
    <button data-tpl="landscape" class="${t==='landscape'?'on':''}">▭ عرضي</button>
    <button data-tpl="timeline" class="${t==='timeline'?'on':''}">⟿ خط زمني</button>
    <button data-tpl="wall" class="${t==='wall'?'on':''}">▦ جداري</button>
    <button data-tpl="wall4" class="${t==='wall4'?'on':''}">▤ OPTION 4</button>
  </div>`;
  if(!isTL(t)){ h += photoBlock(t) + textBlock(t); }
  else{
    const T = S.timeline;
    h += `<fieldset><legend>العنوان</legend>
      ${tx('timeline.name_ar','اسم النادي')}${tx('timeline.name_en','Club name (EN)','ltr')}
      ${tx('timeline.sl_ar','الشعار')}
      <button class="btn sm" style="margin-top:8px" data-trhead>🌐 ترجم الشعار</button>
      ${tx('timeline.sl_en','Slogan (EN)','ltr')}${t==='wall4'?'':tx('timeline.sl_fr','Devise (FR)','ltr')}
      ${rg('timeline.fs','حجم الخط',12,28,.5)}
    </fieldset>
    <fieldset><legend>الشكل والنهاية</legend>
      ${t==='wall4' ? `${T.entries.length!==8?`<div class="hint" style="color:var(--m)">هذا التصميم مخصص لـ 8 محطات بالضبط (الحالية ${T.entries.length}).</div>`:''}` : `<label>الخلفية</label>
      <select data-b="timeline.bg"><option value="old" ${T.bg==='old'?'selected':''}>ورق تاريخي قديم</option><option value="plain" ${T.bg==='plain'?'selected':''}>بيج سادة</option></select>`}
      <label><input type="checkbox" data-b="timeline.sepia" data-chk ${T.sepia?'checked':''}> صور بلون قديم (سيبيا)</label>
      ${tx('timeline.end_ar','عبارة النهاية')}
      <button class="btn sm" style="margin-top:8px" data-trend>🌐 ترجم العبارة</button>
      ${tx('timeline.end_en','End (EN)','ltr')}${t==='wall4'?'':tx('timeline.end_fr','Fin (FR)','ltr')}
    </fieldset>
    <fieldset><legend>المحطات (${T.entries.length})</legend>
    <button class="btn pri" style="width:100%;margin-bottom:10px" data-trall>🌐 ترجم جميع المحطات</button>`;
    T.entries.forEach((e,i)=>{
      const b = `timeline.entries.${i}`;
      h += `<div class="entry"><h4><span>محطة ${i+1}</span><span>
        ${i>0?`<button class="btn sm" data-mv="${i}" data-d="-1" title="تقديم">▲</button>`:''}
        ${i<T.entries.length-1?`<button class="btn sm" data-mv="${i}" data-d="1" title="تأخير">▼</button>`:''}
        <button class="btn sm danger" data-del="${i}">حذف</button></span></h4>
        ${tx(b+'.year','السنة','ltr')}
        ${tx(b+'.t_ar','العنوان')}
        ${ta(b+'.d_ar','الوصف','rtl',2)}
        <div class="row" style="margin-top:8px"><button class="btn sm pri" data-pick="${b}.photo">📷 صورة</button>${e.photo?`<button class="btn sm danger" data-clear="${b}.photo">إزالة الصورة</button>`:''}<button class="btn sm" data-tre="${i}">🌐 ترجم</button></div>
        ${e.photo?`<img class="thumb" src="${e.photo}">${rg(b+'.px','تحريك الصورة أفقياً',0,100)}${rg(b+'.py','تحريك الصورة رأسياً',0,100)}`:''}
        ${tx(b+'.t_en','Title (EN)','ltr')}${ta(b+'.d_en','Description (EN)','ltr',2)}
        ${t==='wall4'?'':tx(b+'.t_fr','Titre (FR)','ltr')+ta(b+'.d_fr','Description (FR)','ltr',2)}
      </div>`;
    });
    h += `${t==='wall4'&&T.entries.length>=8?'':'<button class="btn" style="width:100%" data-add>＋ إضافة محطة</button>'}
      <button class="btn sm" style="width:100%;margin-top:6px" data-resettl>↺ استعادة المحطات الافتراضية (8)</button>
      <div class="hint">يُفضّل من 5 إلى 9 محطات. الصورة لكل محطة اختيارية.</div></fieldset>`;
  }
  h += `<fieldset><legend>الشعار</legend><div class="row"><button class="btn sm" data-pick="logo">تغيير الشعار</button>${S.logo?'<button class="btn sm danger" data-clear="logo">الشعار الافتراضي</button>':''}</div></fieldset>`;
  document.getElementById('side').innerHTML = h;
}

/* ---------- Design rendering ---------- */
function photoHTML(P, cls=''){
  if(!P.photo) return `<div class="ph ${cls}" data-drop><div class="empty">＋ أضف صورة</div></div>`;
  const st = `object-fit:${P.fit||'cover'};object-position:${P.px}% ${P.py}%;transform:scale(${(P.zoom||100)/100});transform-origin:${P.px}% ${P.py}%;${P.gray?'filter:grayscale(1)':''}`;
  return `<div class="ph ${cls}" data-drop><img src="${P.photo}" style="${st}"></div>`;
}
const logoSrc = () => S.logo || LOGO;

const SIZES = {portrait:[1200,1800], landscape:[2100,1500], timeline:[3200,1800], wall:WALL_SIZE, wall4:[2520,2610]};
const isTL = t => t==='timeline' || t==='wall' || t==='wall4';   // التصميمان يستخدمان نفس بيانات المحطات

function render(){
  const t = S.template, el = document.getElementById('design');
  let h = '';
  if(t==='portrait'){
    const P = S.portrait;
    h = `<div class="d portrait" style="--fs:${S.capfs}px">
      <div class="top">
        <div class="card side fit" data-growx="480" data-max="${S.capfs}" style="--fs:${S.capfs}px">
          <div class="t ar">${txt(P.side_ar)}</div>
          <div class="hr"></div><div class="t">${txt(P.side_en)}</div>
          <div class="hr"></div><div class="t"><i>${txt(P.side_fr)}</i></div>
        </div>
        ${photoHTML(P,'card')}
      </div>
      <div class="card cap">
        <div style="display:flex;justify-content:center"><img class="logo" src="${logoSrc()}"></div>
        <div class="col"><div class="t">${txt(P.fr)}</div></div>
        <div class="col"><div class="t">${txt(P.en)}</div></div>
        <div class="col ar"><div class="t ar">${txt(P.ar)}</div></div>
      </div></div>`;
  } else if(t==='landscape'){
    const P = S.landscape;
    h = `<div class="d landscape" style="--fs:${S.capfs}px">
      ${photoHTML(P,'card')}
      <div class="card cap">
        <div style="display:flex;justify-content:center"><img class="logo" src="${logoSrc()}"></div>
        <div class="col"><div class="t">${txt(P.fr)}</div></div>
        <div class="col"><div class="t">${txt(P.en)}</div></div>
        <div class="col ar"><div class="t ar">${txt(P.ar)}</div></div>
      </div>
    </div>`;
  } else if(t==='wall'){
    h = renderWall();
  } else if(t==='wall4'){
    h = renderWall4();
  } else {
    const T = S.timeline, [W,H] = SIZES.timeline, n = Math.max(T.entries.length,1);
    // خط شبه مستقيم بدرجات صغيرة، والمحطات تتناوب تحت الخط وفوقه بنفس المقاس
    const x0 = 170, phH = 200, gapPh = 18, txtH = 330, cardH = phH + gapPh + txtH;
    const slot = n > 1 ? Math.min((W - 80 - 340 - 520 - x0) / (n - 1), 700) : 0;
    const cw = n > 1 ? Math.min(2*slot - 60, 520) : 520;
    // درجات واضحة: أكبر ارتفاع يسمح به المكان (حتى 60) مع بقاء المحطات العليا والسفلى داخل اللوحة
    // الدرجة تصعد قبل المحطة مباشرة؛ النص العلوي يعلو كل درجة تقع تحته (kUp) فيبقى بنفس البعد عن الخط
    const stepX = j => x0 + j*slot - 30;
    let kUp = 0;
    for(let i=1;i<n;i+=2){ let k = 0; for(let j=i+1;j<n;j++) if(stepX(j) <= x0 + i*slot + 22 + cw + 10) k++; kUp = Math.max(kUp, k); }
    const rise = n > 1 ? Math.min(60, (H - 160 - 2*cardH - 90) / (n - 1 + kUp)) : 0;
    const upGap = 40 + kUp*rise;          // بعد النص العلوي عن نقطة محطته
    const yBase = H - 80 - 50 - cardH;
    const pts = T.entries.map((e,i)=>({x: x0 + i*slot, y: yBase - i*rise, up: i%2===1}));
    const y0 = pts.length ? pts[0].y : 1000;
    const last = pts[pts.length-1] || {x:x0, y:1000};
    const xe = Math.min(last.x + cw + 60, W - 380), ye = last.y;
    const P = [[x0-110, y0]];
    pts.forEach((p,i)=>{ if(i===0){ P.push([p.x,p.y]); return; } const mx = stepX(i); P.push([mx, pts[i-1].y],[mx, p.y],[p.x, p.y]); });
    P.push([xe + 250, ye]);
    const r = 0; let d = `M${P[0][0]},${P[0][1]}`;   // خط مستقيم بزوايا حادة
    for(let i=1;i<P.length;i++){
      const [x,y] = P[i], nx = P[i+1];
      if(!nx){ d += ` L${x},${y}`; break; }
      const [px,py] = P[i-1];
      const d1 = Math.hypot(x-px,y-py), d2 = Math.hypot(nx[0]-x,nx[1]-y);
      const rr = Math.min(r, d1/2, d2/2);
      if(rr < 1){ d += ` L${x},${y}`; continue; }
      const ax = x - (x-px)/d1*rr, ay = y - (y-py)/d1*rr, bx = x + (nx[0]-x)/d2*rr, by = y + (nx[1]-y)/d2*rr;
      d += ` L${ax},${ay} Q${x},${y} ${bx},${by}`;
    }
    const paper = T.bg==='plain' ? '' : `<svg class="paper" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <defs>
        <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .22  0 0 0 0 .1  0 0 0 .22 0"/></filter>
        <filter id="mottle" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".0035 .006" numOctaves="4" seed="9"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .3  0 0 0 0 .12  0 0 0 .9 -.32"/></filter>
        <radialGradient id="vig" cx="50%" cy="50%" r="75%"><stop offset="55%" stop-color="#5a3510" stop-opacity="0"/><stop offset="100%" stop-color="#5a3510" stop-opacity=".45"/></radialGradient>
        <radialGradient id="glow" cx="45%" cy="40%" r="60%"><stop offset="0%" stop-color="#fff8e6" stop-opacity=".55"/><stop offset="100%" stop-color="#fff8e6" stop-opacity="0"/></radialGradient>
        <radialGradient id="stain" r="50%"><stop offset="0%" stop-color="#8a5a24" stop-opacity=".03"/><stop offset="86%" stop-color="#8a5a24" stop-opacity=".05"/><stop offset="96%" stop-color="#8a5a24" stop-opacity=".1"/><stop offset="100%" stop-color="#8a5a24" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#glow)"/>
      <rect width="100%" height="100%" filter="url(#mottle)"/>
      <circle cx="${W*.83}" cy="${H*.18}" r="190" fill="url(#stain)"/>
      <circle cx="${W*.36}" cy="${H*.86}" r="140" fill="url(#stain)"/>
      <circle cx="${W*.07}" cy="${H*.78}" r="110" fill="url(#stain)"/>
      <rect width="100%" height="100%" filter="url(#grain)"/>
      <rect width="100%" height="100%" fill="url(#vig)"/>
    </svg><div class="frame"></div>`;
    h = `<div class="d timeline ${T.bg==='plain'?'plain':''}" style="--fs:${T.fs}px">
      ${paper}
      <div class="hd"><img class="logo" src="${logoSrc()}"></div>
      <svg class="path" width="${W}" height="${H}">
        <path d="${d}" fill="none" stroke="#7a1c1c" stroke-width="6" stroke-linecap="round"/>
        <circle cx="${x0-90}" cy="${y0}" r="9" fill="#7a1c1c"/>
        ${pts.map(p=>`<line x1="${p.x}" y1="${p.y}" x2="${p.x}" y2="${p.up ? p.y-upGap : p.y+50}" stroke="#7a1c1c" stroke-width="3"/>`).join('')}
        ${pts.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="17" fill="#7a1c1c" stroke="#efe2c8" stroke-width="6"/>`).join('')}
        <path d="M${xe+244},${ye-18} L${xe+278},${ye} L${xe+244},${ye+18} Z" fill="#7a1c1c"/>
      </svg>
      <div class="end" style="left:${xe}px;top:${ye+44}px;width:${W-xe-80}px">
        <div class="e-ar">${esc(T.end_ar)}</div><div class="e-en">${esc(T.end_en)}</div><div class="e-fr">${esc(T.end_fr)}</div>
        <div style="width:120px;height:4px;background:#7a1c1c;margin-top:16px"></div>
      </div>`;
    T.entries.forEach((e,i)=>{
      const p = pts[i], left = p.x + 22;
      // فوق الخط: الصورة في الأعلى والنص قرب الخط — تحت الخط: النص قرب الخط والصورة في الأسفل
      const top = p.up ? p.y - upGap - cardH : p.y + 50;
      const phTop = p.up ? top : top + txtH + gapPh, txtTop = p.up ? top + phH + gapPh : top;
      const img = e.photo ? `<img src="${e.photo}" style="object-fit:cover;object-position:${e.px}% ${e.py}%">` : `<div class="ph-empty-in">＋ أضف صورة<small>${esc(e.year)}</small></div>`;
      h += `<div class="tph ${T.sepia?'old':''} ${e.photo?'':'ph-empty'}" data-entry="${i}" style="left:${left}px;top:${phTop}px;width:${cw}px;height:${phH}px">${img}</div>`;
      h += `<div class="tc fit ${p.up?'up':''}" data-group="tl" data-max="${T.fs}" style="left:${left}px;top:${txtTop}px;width:${cw}px;height:${txtH}px;--fs:${T.fs}px">
          <div class="yr">${esc(e.year)}</div>
          <div class="ti-ar">${esc(e.t_ar)}</div><div class="ti-en">${esc(e.t_en)}</div><div class="ti-fr">${esc(e.t_fr)}</div>
          <div class="t ar">${txt(e.d_ar)}</div><div class="t">${txt(e.d_en)}</div><div class="t"><i>${txt(e.d_fr)}</i></div>
        </div>`;
    });
    h += `</div>`;
  }
  el.innerHTML = h;
  autoFit(); fitStage();
}
const HEADER_MAX = {hd:760, whd:980, w4hd:780};   // أقصى عرض لنصوص الشعار في كل تصميم
function fitHeaders(){
  document.querySelectorAll('.hd,.whd,.w4hd').forEach(h => {
    h.style.removeProperty('--u');
    const u = parseFloat(getComputedStyle(h).getPropertyValue('--u'));
    const w = Math.max(0, ...[...h.querySelectorAll('.n-ar,.n-en,.sl-ar,.sl')].map(e => e.offsetWidth));
    const max = HEADER_MAX[h.className.split(' ')[0]];
    if(w > max) h.style.setProperty('--u', (u * max / w) + 'px');
  });
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
  fitHeaders();
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
  setP(S, p, v); render(); save();
});
side.addEventListener('change', e=>{ if(e.target.dataset.chk !== undefined){ setP(S, e.target.dataset.b, e.target.checked); render(); save(); } });
side.addEventListener('click', e=>{
  const b = e.target.closest('button'); if(!b) return;
  const d = b.dataset;
  if(d.tpl){ S.template = d.tpl; buildSide(); render(); save(); }
  else if(d.pick){ pick(d.pick); }
  else if(d.clear){ setP(S, d.clear, null); buildSide(); render(); save(); }
  else if(d.tr){ const t = d.tr; doTranslate(b, [[t+'.ar', t+'.en','en'],[t+'.ar', t+'.fr','fr']]); }
  else if(d.tre !== undefined){ const p = 'timeline.entries.'+d.tre; doTranslate(b, ['t','d'].flatMap(k=>[[`${p}.${k}_ar`,`${p}.${k}_en`,'en'],[`${p}.${k}_ar`,`${p}.${k}_fr`,'fr']])); }
  else if(d.trall !== undefined){ const pairs = []; S.timeline.entries.forEach((_,i)=>{ const p='timeline.entries.'+i; ['t','d'].forEach(k=>{ pairs.push([`${p}.${k}_ar`,`${p}.${k}_en`,'en'],[`${p}.${k}_ar`,`${p}.${k}_fr`,'fr']); }); }); doTranslate(b, pairs); }
  else if(d.trside !== undefined){ doTranslate(b, [['portrait.side_ar','portrait.side_en','en'],['portrait.side_ar','portrait.side_fr','fr']]); }
  else if(d.trend !== undefined){ doTranslate(b, [['timeline.end_ar','timeline.end_en','en'],['timeline.end_ar','timeline.end_fr','fr']]); }
  else if(d.resettl !== undefined){ if(confirm('استبدال المحطات الحالية بالمحطات الافتراضية؟')){ snapshot(); S.timeline.entries = DEFAULTS().timeline.entries; buildSide(); render(); save(); } }
  else if(d.trhead !== undefined){ doTranslate(b, [['timeline.sl_ar','timeline.sl_en','en'],['timeline.sl_ar','timeline.sl_fr','fr']]); }
  else if(d.add !== undefined){ S.timeline.entries.push(E('','','','','','','')); buildSide(); render(); save(); side.scrollTop = side.scrollHeight; }
  else if(d.del !== undefined){ if(confirm('حذف هذه المحطة؟')){ snapshot(); S.timeline.entries.splice(+d.del,1); buildSide(); render(); save(); } }
  else if(d.mv !== undefined){ const a = S.timeline.entries, i = +d.mv, j = i + +d.d; [a[i],a[j]] = [a[j],a[i]]; buildSide(); render(); save(); }
});
const designEl = document.getElementById('design');
designEl.addEventListener('click', e=>{
  const fr = e.target.closest('[data-entry]');
  if(fr){ pick('timeline.entries.'+fr.dataset.entry+'.photo'); return; }
  if(e.target.closest('[data-drop]') && !isTL(S.template)) pick(S.template+'.photo');
});
const stage = document.getElementById('stage');
stage.addEventListener('dragover', e=>{ e.preventDefault(); });
stage.addEventListener('drop', e=>{
  e.preventDefault(); const f = e.dataTransfer.files[0]; if(!f) return;
  if(isTL(S.template)){
    const fr = e.target.closest('[data-entry]');
    if(fr) setImage('timeline.entries.'+fr.dataset.entry+'.photo', f);
    else toast('أفلت الصورة فوق إطار المحطة المطلوبة');
    return;
  }
  setImage(S.template+'.photo', f);
});

/* ---------- Export ---------- */
document.getElementById('exp').addEventListener('click', async e=>{
  const b = e.currentTarget; b.disabled = true; b.textContent = '... جاري التصدير'; clearError();
  try{
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
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const name = {portrait:'لوحة-طولية', landscape:'لوحة-عرضية', timeline:'خط-زمني', wall:'تصميم-جداري', wall4:'جداري-option4'}[S.template];
    a.download = `${name}-${new Date().toISOString().slice(0,16).replace(/[T:]/g,'-')}.${fmt}`; a.href = url;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 60000);
    canvas.width = canvas.height = 0;   // تحرير الذاكرة
    const lowRes = S.template==='wall4' ? S.timeline.entries.slice(0,8).filter(e=>!e.photo).length : 0;
    toast(lowRes ? `تم التصدير ✔ لكن ${lowRes} من الصور عينات منخفضة الدقة — استبدلها بالأصلية قبل الطباعة` : `تم التصدير ✔ (${(blob.size/1048576).toFixed(1)} MB)`);
  }catch(err){ console.error(err); toast('تعذّر التصدير'); showError('تعذّر التصدير: '+(err && err.message || err) + ' — جرّب جودة أقل (×2) أو صيغة JPG'); }
  b.disabled = false; b.textContent = '⬇ تصدير';
});

/* ---------- Project files ---------- */
function downloadJSON(data, name){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], {type:'application/json'}));
  a.download = name; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 60000);
}
const refresh = () => { buildSide(); render(); save(); };
document.getElementById('saveProj').onclick = ()=> downloadJSON(S, `مشروع-لوحات-${new Date().toISOString().slice(0,10)}.json`);
document.getElementById('openProj').onclick = ()=> document.getElementById('projFile').click();
document.getElementById('projFile').addEventListener('change', async e=>{
  const f = e.target.files[0]; if(!f) return;
  e.target.value = '';
  let next = null;
  try{ next = normalize(JSON.parse(await f.text())); }catch(err){}
  if(!next){ toast('هذا الملف ليس مشروع لوحات — لم يتغير عملك'); return; }
  snapshot(); S = next; refresh();
  toast('تم فتح المشروع — يمكنك التراجع بزر "تراجع"');
});
document.getElementById('undo').onclick = ()=>{
  if(!undoS) return;
  S = undoS; undoS = null;
  document.getElementById('undo').hidden = true;
  refresh(); toast('تم التراجع');
};
document.getElementById('clearCur').onclick = ()=>{
  const t = S.template;
  const msg = isTL(t)
    ? 'تفريغ كل المحطات وصورها؟\nالمحطات مشتركة، فسيشمل ذلك التصاميم الثلاثة: خط زمني، جداري، OPTION 4.'
    : 'تفريغ اللوحة الحالية (الصورة والنصوص)؟';
  if(!confirm(msg)) return;
  snapshot();
  if(isTL(t)) S.timeline.entries = S.timeline.entries.map(()=>E('','','','','','',''));
  else{
    Object.assign(S[t], {photo:null, ar:'', en:'', fr:'', px:50, py:50, zoom:100, fit:'cover', gray:false});
    if(t==='portrait') Object.assign(S[t], {side_ar:'', side_en:'', side_fr:''});
  }
  refresh();
  toast('تم التفريغ — يمكنك التراجع بزر "تراجع"');
};

/* ---------- Init ---------- */
(async ()=>{
  if(!window.htmlToImage) showError('مكتبة التصدير لم تُحمّل — تأكد أن مجلد js/vendor موجود بجانب index.html');
  LOGO = await prepLogo(LOGO);
  let saved = null;
  try{ saved = normalize(await idbGet()); }catch(e){}
  if(saved) S = saved;
  else if(localStorage.getItem(KEY)) save();     // نقل الحفظ القديم إلى IndexedDB
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
