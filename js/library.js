/* ============================================================
   مكتبة اللوحات: كل لوحة تُحفظ مستقلة بصورها ونصوصها،
   فتُفتح لاحقاً وتُعدّل، وتُحفظ التعديلات فيها تلقائياً.
   "حفظ الكل" يضع المكتبة كاملة في ملف واحد لنقلها أو إرسالها.
   ============================================================ */

const LIB_GROUPS = ['portrait','landscape','timeline','timeline68'];
const LIB_NAMES = {portrait:'طولي', landscape:'عرضي', timeline:'لوحات السنوات 70×90', timeline68:'لوحات السنوات 60×80'};
const libGroup = t => isTL(t) ? TK(t) : t;
const isTLg = g => g === 'timeline' || g === 'timeline68';
let LIB = [];   // بيانات وصفية فقط: {id, name, group, template, saved, thumb, sig, pkey} — المحتوى في IndexedDB بمفتاح lib:<id>

/* ---------- محتوى لوحة واحدة من الحالة ---------- */
function libTemplateFor(st, g){ return g === 'timeline' ? 'years' : g === 'timeline68' ? 'years68' : g; }
/* copy=false: للمقارنة فقط بدون نسخ الصور (أسرع بكثير مع الصور الكبيرة) — لا تُعدَّل النتيجة */
function libSlice(st, t, copy = true){
  const g = libGroup(t), o = {template: t, logo: st.logo};
  if(isTLg(g)) Object.assign(o, {[g]: st[g], yr: st.yr, wlogo: st.wlogo});
  else Object.assign(o, {[g]: st[g], capfs: st.capfs, wlogo: st.wlogo});
  return copy ? structuredClone(o) : o;
}
const libPk = v => v ? v.length + ':' + v.slice(-48) : '';
/* بصمة سريعة للمحتوى: الصور تُختصر إلى طولها وآخر حروفها */
const libSig = d => JSON.stringify(d, (k, v) => k === 'template' ? undefined : (typeof v === 'string' && v.startsWith('data:') ? libPk(v) : v));
/* بصمة محتوى اللوحة نفسها فقط (بدون الإعدادات المشتركة مثل حجم الخط ولون الشعار) — لمنع التكرار */
const libCsig = d => { const g = libGroup(d.template); return libSig(d[g]); };
function libMainPhoto(d){
  const g = libGroup(d.template);
  if(isTLg(g)) return (d[g].entries.find(e => e.photo) || {}).photo || null;
  return d[g].photo || null;
}
function libSuggestName(d){
  const g = libGroup(d.template), first = s => String(s || '').trim().split('\n')[0].trim().slice(0, 50);
  if(isTLg(g)){
    const ys = d[g].entries.map(e => e.year).filter(Boolean);
    return 'المحطات' + (ys.length ? ` ${ys[0]} – ${ys[ys.length-1]}` : '');
  }
  return first(d[g].ar) || LIB_NAMES[g];
}
/* هل في اللوحة عمل يستحق الحفظ؟ (ليست فارغة ولا النصوص الافتراضية) */
function libHasContent(st, g){
  const t = libTemplateFor(st, g), d = libSlice(st, t, false);
  if(libSig(d) === libSig(libSlice(Object.assign(DEFAULTS(), {template: t}), t, false))) return false;
  if(isTLg(g)) return d[g].entries.some(e => e.photo || e.year || e.t_ar || e.d_ar);
  const P = d[g];
  return !!(P.photo || P.ar || P.en);
}
function libThumb(src){
  if(!src) return Promise.resolve(null);
  return new Promise(res => {
    const im = new Image();
    im.onload = () => {
      const s = Math.min(1, 220 / Math.max(im.width, im.height));
      const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(im.width*s)); c.height = Math.max(1, Math.round(im.height*s));
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
      res(c.toDataURL('image/jpeg', .75));
    };
    im.onerror = () => res(null);
    im.src = src;
  });
}

/* ---------- التخزين ---------- */
const libGetData = id => idbRun('readonly', st => st.get('lib:' + id));
const libWrite = (it, data) => idbRun('readwrite', st => { if(data) st.put(data, 'lib:' + it.id); return st.put(LIB, 'libmeta'); });
const libRemove = id => idbRun('readwrite', st => { st.delete('lib:' + id); return st.put(LIB, 'libmeta'); });
const libNewId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

async function libLoad(){
  try{
    const m = await idbRun('readonly', st => st.get('libmeta'));
    LIB = Array.isArray(m) ? m.filter(x => isObj(x) && typeof x.id === 'string' && LIB_GROUPS.includes(x.group)) : [];
    for(const it of LIB) if(it.group === 'timeline' && it.template !== 'years') it.template = 'years';
    // بصمة المحتوى تُحسب مرة واحدة من البيانات بعد تنظيفها (cv=2)، فلا تبدو اللوحات المحفوظة قديماً مختلفة فتتكرر
    let upd = false;
    for(const it of LIB) if(it.cv !== 2){
      try{ const d = await libGetData(it.id), n = isObj(d) && normalize({...DEFAULTS(), ...d, template: it.template});
           if(n){ it.csig = libCsig(libSlice(n, it.template, false)); it.cv = 2; upd = true; } }catch(e){}
    }
    if(upd) await idbRun('readwrite', st => st.put(LIB, 'libmeta'));
  }catch(e){ LIB = []; }
  libUpdateCount();
}

/* حفظ اللوحة الحالية (أو مجموعة أخرى من الحالة) كلوحة جديدة وربطها */
async function libSaveNew(g = libGroup(S.template), name, link = true){
  const t = libTemplateFor(S, g), data = libSlice(S, t);
  if(name === undefined) name = libSuggestName(data);
  const ph = libMainPhoto(data);
  const it = {id: libNewId(), name: String(name).trim().slice(0, 80) || libSuggestName(data), group: g, template: t,
    saved: Date.now(), sig: libSig(data), csig: libCsig(data), cv: 2, pkey: libPk(ph), thumb: await libThumb(ph)};
  LIB.push(it);
  try{ await libWrite(it, data); }
  catch(e){ LIB.pop(); showError('تعذّر الحفظ في المكتبة — مساحة المتصفح ممتلئة أو التخزين معطّل. استخدم "حفظ الكل"'); return null; }
  if(link) S.libLink = {[g]: it.id};   // لوحة مفتوحة واحدة فقط
  return it;
}
/* قبل استبدال لوحات غير محفوظة: نحفظها في المكتبة أولاً فلا يضيع شيء */
/* محتوى مجموعة موجود في المكتبة بالضبط؟ (فلا نكرره) */
const libFind = g => { const c = libCsig(libSlice(S, libTemplateFor(S, g), false)); return LIB.find(x => x.group === g && x.csig === c); };
async function libSafeguard(groups){
  const done = [];
  for(const g of groups) if(!S.libLink[g] && libHasContent(S, g) && !libFind(g)){ const it = await libSaveNew(g, undefined, false); if(it) done.push(it); }
  return done;
}
/* اللوحة المفتوحة = لوحة واحدة فقط من نوع التصميم المعروض. عند الانتقال لتصميم آخر
   لا يُكتب في أي لوحة محفوظة، إلا إذا كان محتواه مطابقاً للوحة في المكتبة فيُعاد ربطه بها */
function libRelink(){
  const g = libGroup(S.template);
  let id = S.libLink[g];
  if(!id || !LIB.some(x => x.id === id)){ const m = libFind(g); id = m ? m.id : null; }
  S.libLink = id ? {[g]: id} : {};
}

/* التعديلات على اللوحات المرتبطة تُكتب فيها تلقائياً (تُستدعى بعد كل حفظ تلقائي) */
let libQ = Promise.resolve();
function libSyncNow(){ return libQ = libQ.then(libSyncAll).catch(e => { console.warn(e); showError('تعذّر تحديث اللوحة في المكتبة — استخدم "حفظ الكل" احتياطاً'); }); }
async function libSyncAll(){
  let changed = false;
  // التعديلات تُكتب في اللوحة المفتوحة فقط (نوع التصميم المعروض الآن)
  for(const g of Object.keys(S.libLink).filter(x => x === libGroup(S.template))){
    const it = LIB.find(x => x.id === S.libLink[g]);
    if(!it){ delete S.libLink[g]; continue; }
    const t = libGroup(S.template) === g ? S.template : it.template;
    const view = libSlice(S, t, false), sig = libSig(view);
    if(sig === it.sig){ if(it.template !== t){ it.template = t; await libWrite(it); } continue; }
    const data = structuredClone(view);   // نسخة فقط عند وجود تغيير فعلي
    const ph = libMainPhoto(data);
    if(libPk(ph) !== it.pkey){ it.thumb = await libThumb(ph); it.pkey = libPk(ph); }
    Object.assign(it, {sig, csig: libCsig(data), cv: 2, template: t, saved: Date.now()});
    await libWrite(it, data); changed = true;
  }
  if(changed) libRenderDlg();
}

/* فتح لوحة من المكتبة في المحرر */
async function libOpen(id){
  const it = LIB.find(x => x.id === id); if(!it) return;
  await libSyncNow();
  let data = null;
  try{ data = await libGetData(id); }catch(e){}
  const n = isObj(data) ? normalize({...S, ...data}) : null;
  if(!n){ toast('تعذّرت قراءة هذه اللوحة'); return; }
  const saved = S.libLink[it.group] === id ? [] : await libSafeguard([it.group]);
  snapshot();
  n.libLink = {[it.group]: id};
  S = n; refresh();
  libCloseDlg();
  toast(`فُتحت «${it.name}» — تعديلاتك تُحفظ فيها تلقائياً` + (saved.length ? ` (وحُفظت اللوحة السابقة باسم «${saved[0].name}»)` : ''));
}

/* ---------- ملف واحد لكل اللوحات ---------- */
async function libExportAll(){
  await libSyncNow();
  const out = [];
  for(const it of LIB){
    let data = null;
    try{ data = await libGetData(it.id); }catch(e){}
    if(isObj(data)) out.push({id: it.id, name: it.name, group: it.group, template: it.template, saved: it.saved, data});
  }
  return out;
}
/* دمج مكتبة من ملف: الأحدث يفوز لكل لوحة */
async function libImport(arr){
  const r = {added: 0, updated: 0, kept: new Set()};
  if(!Array.isArray(arr)) return r;
  for(const x of arr){
    if(!isObj(x) || typeof x.id !== 'string' || !/^[\w-]{1,64}$/.test(x.id) || !isObj(x.data)) continue;
    if(x.data.template === 'museum' || !TEMPLATES.includes(legacyTpl(x.data.template))) continue;   // لوحات المتحف (تصميم محذوف) تُتجاهل
    const n = normalize({...DEFAULTS(), ...x.data}); if(!n || libGroup(n.template) !== libGroup(legacyTpl(x.data.template))) continue;
    const t = n.template, data = libSlice(n, t), sig = libSig(data);
    const saved = Number.isFinite(x.saved) ? x.saved : 0;
    const old = LIB.find(y => y.id === x.id);
    if(old && old.sig === sig) continue;
    if(old && old.saved >= saved){ r.kept.add(x.id); continue; }
    const ph = libMainPhoto(data), it = old || {id: x.id};
    Object.assign(it, {name: String(x.name || '').trim().slice(0, 80) || libSuggestName(data), group: libGroup(t), template: t,
      saved: saved || Date.now(), sig, csig: libCsig(data), cv: 2, pkey: libPk(ph), thumb: await libThumb(ph)});
    if(!old) LIB.push(it);
    await libWrite(it, data);
    old ? r.updated++ : r.added++;
  }
  libUpdateCount();
  return r;
}

/* ---------- الواجهة ---------- */
function libStatusHTML(){
  const g = libGroup(S.template), it = LIB.find(x => x.id === S.libLink[g]);
  return it
    ? `<div class="libbar on">📚 محفوظة في المكتبة باسم <b>${esc(it.name)}</b><br>أي تعديل يُحفظ فيها تلقائياً. <button class="btn sm" data-lib>كل اللوحات</button></div>`
    : `<div class="libbar">📚 هذه اللوحة غير محفوظة في المكتبة بعد. <button class="btn sm pri" data-libsave>＋ احفظها في المكتبة</button></div>`;
}
function libUpdateCount(){
  const b = document.getElementById('libBtn');
  if(b) b.textContent = `📚 اللوحات المحفوظة (${LIB.length})`;
}
let libFilter = '', libQuery = '';
function libRenderDlg(){
  const dlg = document.getElementById('libdlg');
  if(!dlg || !dlg.open) return;
  const cur = new Set(Object.values(S.libLink));
  const q = libQuery.trim();
  const items = LIB.filter(x => (!libFilter || x.group === libFilter) && (!q || x.name.includes(q)))
                   .sort((a, b) => b.saved - a.saved);
  const fmt = new Intl.DateTimeFormat('ar', {dateStyle: 'medium', timeStyle: 'short'});
  const chip = (g, l) => `<button class="btn sm ${libFilter === g ? 'pri' : ''}" data-libf="${g}">${l} (${g ? LIB.filter(x => x.group === g).length : LIB.length})</button>`;
  const g = libGroup(S.template), linked = LIB.find(x => x.id === S.libLink[g]);
  dlg.querySelector('.libbody').innerHTML = `
    <div class="libtop">
      ${linked ? `<div class="hint" style="margin:0">اللوحة المفتوحة الآن: <b>${esc(linked.name)}</b> — تُحفظ تلقائياً.</div>` : ''}
      <button class="btn pri" data-libsave>＋ حفظ اللوحة الحالية كلوحة جديدة</button>
    </div>
    <div class="libchips">${chip('', 'الكل')}${LIB_GROUPS.map(x => chip(x, LIB_NAMES[x])).join('')}</div>
    <input type="text" data-libq placeholder="🔍 بحث بالاسم" value="${esc(libQuery)}">
    <div class="liblist">${items.length ? items.map(it => `
      <div class="libitem ${cur.has(it.id) ? 'cur' : ''}">
        ${it.thumb ? `<img src="${it.thumb}" alt="">` : `<div class="noimg">${isTLg(it.group) ? '▣' : '▭'}</div>`}
        <div class="libinfo">
          <b>${esc(it.name)}</b>
          <small>${LIB_NAMES[it.group]} · ${fmt.format(it.saved)}${cur.has(it.id) ? ' · <em>مفتوحة الآن</em>' : ''}</small>
          <div class="row">
            <button class="btn sm pri" data-libopen="${it.id}">✏️ فتح للتعديل</button>
            <button class="btn sm" data-libren="${it.id}">إعادة تسمية</button>
            <button class="btn sm danger" data-libdel="${it.id}">حذف</button>
          </div>
        </div>
      </div>`).join('') : `<div class="hint" style="text-align:center;padding:24px 0">${LIB.length ? 'لا توجد لوحات مطابقة' : 'لا توجد لوحات محفوظة بعد — صمّم لوحة ثم اضغط «حفظ اللوحة الحالية».'}</div>`}
    </div>
    <div class="hint">💡 <b>لإرسال كل اللوحات للمدير أو نقلها لجهاز آخر:</b> اضغط «💾 حفظ الكل» في الأعلى — ملف واحد فيه كل اللوحات بصورها ونصوصها.
    وعند استلام الملف المعدّل اضغط «📂 فتح ملف»: تُدمج اللوحات، ولكل لوحة تُعتمد النسخة الأحدث.</div>`;
}
function libOpenDlg(){ const d = document.getElementById('libdlg'); if(!d.open) d.showModal(); libRenderDlg(); }
function libCloseDlg(){ const d = document.getElementById('libdlg'); if(d.open) d.close(); }

(function libInitUI(){
  const dlg = document.createElement('dialog');
  dlg.id = 'libdlg';
  dlg.innerHTML = `<div class="libhead"><b>📚 اللوحات المحفوظة</b><button class="btn sm" data-libclose title="إغلاق">✕</button></div><div class="libbody"></div>`;
  document.body.append(dlg);
  document.getElementById('libBtn').onclick = libOpenDlg;
  dlg.addEventListener('click', async e => {
    if(e.target === dlg){ dlg.close(); return; }   // الضغط خارج النافذة
    const b = e.target.closest('button'); if(!b) return;
    const d = b.dataset;
    if(d.libclose !== undefined) dlg.close();
    else if(d.libf !== undefined){ libFilter = d.libf; libRenderDlg(); }
    else if(d.libsave !== undefined) libSaveCurrent();
    else if(d.libopen) libOpen(d.libopen);
    else if(d.libren){
      const it = LIB.find(x => x.id === d.libren); if(!it) return;
      const n = prompt('الاسم الجديد للوحة:', it.name);
      if(n && n.trim()){ it.name = n.trim().slice(0, 80); await libWrite(it); libRenderDlg(); buildSide(); }
    }
    else if(d.libdel){
      const it = LIB.find(x => x.id === d.libdel); if(!it) return;
      if(!confirm(`حذف «${it.name}» من المكتبة نهائياً؟\n(اللوحة المعروضة في المحرر لا تتأثر)`)) return;
      LIB = LIB.filter(x => x !== it);
      for(const g in S.libLink) if(S.libLink[g] === it.id) delete S.libLink[g];
      await libRemove(it.id); save();
      libUpdateCount(); libRenderDlg(); buildSide();
      toast('تم الحذف من المكتبة');
    }
  });
  dlg.addEventListener('input', e => { if(e.target.dataset.libq !== undefined){ libQuery = e.target.value; const pos = e.target.selectionStart; libRenderDlg(); const i = dlg.querySelector('[data-libq]'); i.focus(); i.setSelectionRange(pos, pos); } });
})();

async function libSaveCurrent(){
  const g = libGroup(S.template), data = libSlice(S, libTemplateFor(S, g), false);
  const name = prompt('اسم اللوحة (لتجدها بسهولة لاحقاً):', libSuggestName(data));
  if(name === null) return;
  const it = await libSaveNew(g, name);
  if(!it) return;
  save(); libUpdateCount(); buildSide(); libRenderDlg();
  toast(`حُفظت «${it.name}» في المكتبة ✔ — تعديلاتك القادمة تُحفظ فيها تلقائياً`);
}
