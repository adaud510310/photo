/* اختبارات صانع لوحات النادي الفيصلي — تُشغَّل قبل كل رفع:
     node tests/run-tests.mjs
   تفتح التطبيق في Chrome مخفي (بدون إنترنت ولا ملفات خارجية) وتتحقق من:
   عرض وتصدير كل اللوحات، حفظ الإعدادات، استقلال لوحتي السنوات، المكتبة، والمشاريع القديمة.
   مسار Chrome يمكن تغييره بمتغير البيئة CHROME. */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || ({
  win32: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
}[process.platform] || 'google-chrome');
const PORT = 9400 + Math.floor(Math.random() * 400);
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'panels-test-'));

const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`, `--user-data-dir=${TMP}/prof`, '--window-size=1500,950', 'about:blank']);
let ws;
for (let i = 0; i < 60 && !ws; i++) {
  try { const l = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); const p = l.find(t => t.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch {}
  if (!ws) await new Promise(r => setTimeout(r, 250));
}
if (!ws) { console.error('تعذّر تشغيل Chrome — حدّد مساره بالمتغير CHROME'); process.exit(2); }
await new Promise(r => ws.onopen = r);
let id = 0; const wait = new Map(); const jsErrors = [];
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && wait.has(d.id)) { wait.get(d.id)(d); wait.delete(d.id); }
  if (d.method === 'Runtime.exceptionThrown') jsErrors.push(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text); };
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; wait.set(i, d => d.error ? rej(new Error(d.error.message)) : res(d.result)); ws.send(JSON.stringify({ id: i, method, params })); });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ev = async e => { const r = await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result.value; };
const setFile = async (sel, file) => { const doc = await send('DOM.getDocument'); const q = await send('DOM.querySelector', { nodeId: doc.root.nodeId, selector: sel }); await send('DOM.setFileInputFiles', { nodeId: q.nodeId, files: [file] }); };

let fails = 0;
const check = (name, ok, info = '') => { console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${ok ? '' : '  → ' + info}`); if (!ok) fails++; };

await send('Page.enable'); await send('Runtime.enable'); await send('DOM.enable');
const URL_ = pathToFileURL(path.join(ROOT, 'index.html')).href;
const go = async () => { await send('Page.navigate', { url: URL_ }); await sleep(2500); await hooks(); };
const hooks = () => ev(`window.prompt=(m,d)=>window.__name||d;window.confirm=()=>true;
  const o=URL.createObjectURL;URL.createObjectURL=b=>{if(b.type.startsWith('image/'))window.__img=b;if(b.type==='application/json')window.__json=b;return o.call(URL,b)}`);
const tab = async t => { await ev(`document.querySelector('[data-tpl="${t}"]').click()`); await sleep(400); };
const typ = (sel, v) => ev(`(()=>{const i=document.querySelector('${sel}');i.value=${JSON.stringify(v)};i.dispatchEvent(new Event('input',{bubbles:true}))})()`);
const wipe = async () => { await ev(`(async()=>{for(const it of [...LIB]) await libRemove(it.id); LIB=[]; S=DEFAULTS(); refresh(); libUpdateCount();})()`); await sleep(600); };
await go();

// صورة تجريبية مولّدة (بدون ملفات خارجية)
const png = await ev(`(()=>{const c=document.createElement('canvas');c.width=900;c.height=600;const x=c.getContext('2d');x.fillStyle='#456';x.fillRect(0,0,900,600);x.fillStyle='#fc0';x.fillRect(100,100,300,300);return c.toDataURL('image/png')})()`);
fs.writeFileSync(path.join(TMP, 'photo.png'), Buffer.from(png.split(',')[1], 'base64'));

// 1) كل اللوحات تُعرض وتُصدَّر بدون خطأ ولا نص مقصوص
const tabs = await ev(`[...document.querySelectorAll('[data-tpl]')].map(b=>b.dataset.tpl)`);
check('1 tabs are the four panels', JSON.stringify(tabs) === JSON.stringify(['portrait', 'landscape', 'years', 'years68']), tabs);
for (const t of tabs) {
  await tab(t);
  await ev(`window.__img=null;document.getElementById('ratio').value='1';document.getElementById('exp').click()`);
  let ok = false; for (let i = 0; i < 80 && !ok; i++) { await sleep(250); ok = await ev('!!window.__img'); }
  const over = await ev(`[...document.querySelectorAll('#design .fit')].filter(f=>f.scrollHeight>f.clientHeight+1||f.scrollWidth>f.clientWidth+1).length`);
  check(`1 ${t} exports, no clipped text`, ok && over === 0, `export=${ok} overflow=${over}`);
}

// 2) إعدادات لوحات السنوات تبقى بعد إعادة الفتح
await tab('years');
await ev(`(()=>{const s=document.querySelector('[data-b="timeline.bg"]');s.value='plain';s.dispatchEvent(new Event('input',{bubbles:true}));const c=document.querySelector('[data-b="timeline.sepia"]');c.checked=false;c.dispatchEvent(new Event('change',{bubbles:true}))})()`);
await sleep(900); await go();
check('2 background + sepia survive reload', await ev(`S.timeline.bg==='plain' && S.timeline.sepia===false`), await ev(`JSON.stringify({bg:S.timeline.bg,sepia:S.timeline.sepia})`));
check('2 sepia on by default', await ev(`DEFAULTS().timeline.sepia===true && DEFAULTS().timeline.bg==='old'`));

// 3) لوحتا 70×90 و60×80 مستقلتان
await wipe(); await tab('years'); await typ('[data-b$=".t_ar"]', 'عنوان 70');
await tab('years68'); await typ('[data-b$=".t_ar"]', 'عنوان 60'); await sleep(300);
check('3 sizes keep separate stations', await ev(`S.timeline.entries[0].t_ar==='عنوان 70' && S.timeline68.entries[0].t_ar==='عنوان 60'`), await ev(`S.timeline.entries[0].t_ar+' / '+S.timeline68.entries[0].t_ar`));
await typ('[data-b$=".hy"]', '1396'); await sleep(200);
check('3 hijri → gregorian', await ev(`S.timeline68.entries[0].year`) === '1976');

// 4) المكتبة: الحفظ باسم، الكتابة في اللوحة المفتوحة فقط، عدم التكرار
await wipe(); await tab('landscape');
await ev(`S.landscape.ar='لوحة أ';render();save()`); await sleep(600);
await ev(`window.__name='أ';libSaveCurrent()`); await sleep(800);
await tab('portrait'); await ev(`S.portrait.ar='لوحة ب';render();save()`); await sleep(600);
await ev(`window.__name='ب';libSaveCurrent()`); await sleep(800);
const [A, B] = await ev(`LIB.map(x=>x.id)`);
await ev(`S.portrait.ar='ب معدلة';S.capfs=22;render();save()`); await sleep(1500);
const dat = id => ev(`libGetData('${id}').then(d=>(d.landscape||d.portrait).ar)`);
check('4 edit reaches only the open panel', await dat(A) === 'لوحة أ' && await dat(B) === 'ب معدلة', (await dat(A)) + ' / ' + (await dat(B)));
await ev(`libOpen('${A}')`); await sleep(1200);
check('4 open restores panel', await ev(`S.landscape.ar`) === 'لوحة أ');
await ev(`document.getElementById('saveProj').click()`); await sleep(2000);
await ev(`document.getElementById('saveProj').click()`); await sleep(2000);
check('4 save-all twice: no duplicates', await ev(`LIB.length`) === 2, await ev(`LIB.map(x=>x.name).join(',')`));

// 5) ملف «حفظ الكل»: كل صورة مرة واحدة، ويُفتح في متصفح فارغ
await tab('landscape'); await ev(`pickTarget='landscape.photo'`); await setFile('#hiddenImg', path.join(TMP, 'photo.png')); await sleep(1200);
await ev(`window.__json=null;document.getElementById('saveProj').click()`); await sleep(2500);
const file = await ev(`window.__json.text()`); fs.writeFileSync(path.join(TMP, 'all.json'), file);
const j = JSON.parse(file);
const photo = await ev(`S.landscape.photo`);
check('5 file stores each image once', file.split(photo).length - 1 === 1, `copies=${file.split(photo).length - 1}`);
await wipe(); await setFile('#projFile', path.join(TMP, 'all.json')); await sleep(2500);
check('5 import restores library + photo', await ev(`LIB.length===2 && !!S.landscape.photo`), await ev(`LIB.length+' '+!!S.landscape.photo`));

// 6) مشاريع قديمة: تصاميم محذوفة تُفتح على لوحة موجودة، ومحطات 60×80 تُنسخ من 70×90
check('6 legacy templates map', await ev(`['timeline','yearsw','museum'].map(t=>normalize({...DEFAULTS(),template:t}).template).join()`) === 'years,years,portrait');
check('6 old project gets its own 60×80 copy', await ev(`(()=>{const o=structuredClone(DEFAULTS());delete o.timeline68;o.timeline.entries[0].t_ar='قديم';const n=normalize(o);return n.timeline68.entries[0].t_ar==='قديم'&&n.timeline68!==n.timeline})()`));

check('no JS errors', jsErrors.length === 0, jsErrors.join(' | '));
console.log(fails ? `\n${fails} FAILED` : '\nALL PASSED');
proc.kill(); await sleep(800);
try{ fs.rmSync(TMP, { recursive: true, force: true }); }catch{}   // Chrome قد يبقي الملفات مقفلة لحظة
process.exit(fails ? 1 : 0);
