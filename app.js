// ---------- fabric patches ----------
// 5.3.1 sets ctx.textBaseline = 'alphabetical' (typo) and floods the console; map it to the valid value.
{ const d = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'textBaseline');
  Object.defineProperty(CanvasRenderingContext2D.prototype, 'textBaseline', { get: d.get, set(v) { d.set.call(this, v === 'alphabetical' ? 'alphabetic' : v); } }); }
// fabric only re-applies ctx.direction/textAlign when the canvas 'dir' attribute changes, so mixed RTL/LTR text drifts. Force it per line.
{ const orig = fabric.Text.prototype._renderChars;
  fabric.Text.prototype._renderChars = function (method, ctx, line, left, top, lineIndex) { ctx.canvas.setAttribute('dir', 'reset'); return orig.call(this, method, ctx, line, left, top, lineIndex); }; }
// fabric measures Arabic glyph-by-glyph (unshaped); measure unstyled RTL lines with the real shaped width.
{ const mctx = document.createElement('canvas').getContext('2d');
  const orig = fabric.Text.prototype.measureLine;
  fabric.Text.prototype.measureLine = function (lineIndex) {
    const info = orig.call(this, lineIndex);
    if (this.direction === 'rtl' && this.isEmptyStyles(lineIndex) && !this.charSpacing) {
      mctx.font = this._getFontDeclaration(); mctx.direction = 'rtl';
      info.width = mctx.measureText(this._textLines[lineIndex].join('')).width;
    }
    return info;
  }; }

// ---------- setup ----------
const qs = new URLSearchParams(location.search);
const productKey = PRODUCTS[qs.get('product')] ? qs.get('product') : null;
const P = PRODUCTS[productKey || 'cards'];
const dims = prod => { const mm = prod.pxPerMm, b = prod.bleed * mm; return { MM: mm, B: b, W: Math.round((prod.w + 2 * prod.bleed) * mm), H: Math.round((prod.h + 2 * prod.bleed) * mm) }; };
const { MM, B, W, H } = dims(P);
const SAFE = 3 * MM;
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const $ = id => document.getElementById(id);
const FONTS = ['Cairo', 'Tajawal', 'Almarai', 'Amiri', 'Poppins', 'Montserrat', 'Playfair Display'];
const JSON_PROPS = ['data'];
if (window.pdfjsLib) pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// crypto.randomUUID is unavailable on plain-http LAN addresses (non-secure context) → fallback
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)));
const toast = msg => { const t = document.createElement('div'); t.id = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2600); };
const busy = on => $('busy').classList.toggle('hidden', !on);
// load every weight we use before measuring text: fabric caches glyph widths per font
const fontsReady = async () => {
  try {
    // Google Fonts split each family into unicode-range subsets; load() must be given Arabic text or only the Latin subset loads
    const sample = 'محمد العلي شركة الأفق 0123 Horizon Tech';
    await Promise.all(FONTS.flatMap(f => ['400', '700', '900'].map(w => document.fonts.load(w + ' 16px "' + f + '"', sample))));
    await document.fonts.ready;
    for (let i = 0; i < 30 && !(document.fonts.check('700 16px "Cairo"', sample) && document.fonts.check('400 16px "Amiri"', sample)); i++) await new Promise(r => setTimeout(r, 100));
  } catch (e) {}
  fabric.charWidthsCache = {};
};
const show = id => { ['catalog', 'gallery', 'editor'].forEach(s => $(s).classList.toggle('hidden', s !== id)); $('nav').classList.toggle('hidden', id === 'editor'); };

// ---------- custom fonts (bucket: fonts/) ----------
function registerFont(name) {
  if (!FONTS.includes(name)) FONTS.push(name);
  if (![...$('p-font').options].some(o => o.value === name)) $('p-font').add(new Option(name + ' ★', name));
}
async function loadCustomFonts() {
  const { data } = await sb.storage.from(BUCKET).list('fonts', { limit: 200 });
  for (const f of data || []) {
    const name = f.name.replace(/\.[^.]+$/, '');
    try { const face = new FontFace(name, `url(${sb.storage.from(BUCKET).getPublicUrl('fonts/' + f.name).data.publicUrl})`); await face.load(); document.fonts.add(face); registerFont(name); } catch (e) { console.warn('font', name, e); }
  }
}
async function uploadFont(file) {
  const name = file.name.replace(/\.[^.]+$/, '');
  const face = new FontFace(name, await file.arrayBuffer());
  await face.load(); document.fonts.add(face); registerFont(name);
  const up = await sb.storage.from(BUCKET).upload('fonts/' + file.name, file, { contentType: 'application/octet-stream', upsert: true });
  if (up.error) throw up.error;
  return name;
}

// ---------- catalog ----------
async function renderCatalog() {
  const total = Object.values(TEMPLATE_COUNT).reduce((a, b) => a + b, 0);
  $('st-products').textContent = Object.keys(PRODUCTS).length;
  $('st-templates').textContent = total + '+';
  const cards = {};
  Object.entries(PRODUCTS).forEach(([k, v]) => {
    const el = document.createElement('a');
    el.className = 'pcard'; el.href = '?product=' + k;
    el.innerHTML = `<div class="thumb"></div><div class="meta"><b>${v.icon} ${pname(v)}</b><small>${v.w} × ${v.h} ${t('مم')}${v.sides > 1 ? t(' · وجهان') : ''}</small><span class="cnt">${TEMPLATE_COUNT[k]} ${t('قالباً')}</span></div>`;
    $('pgrid').appendChild(el); cards[k] = el;
  });
  if ($('catalog').classList.contains('hidden')) return;
  await fontsReady();
  // one real template preview per product
  const PICK = { cards: 'شريط جانبي', flyer_a5: 'نيون داكن', flyer_a4: 'باوهاوس', poster_a3: 'طباعي ضخم', brochure: 'كتل ملوّنة', rollup: 'داكن', letterhead: 'رسمي', menu: 'سبورة', invitation: 'زخرفة إسلامية', certificate: 'رسمي ذهبي', voucher: 'داكن', badge: 'رأس ملوّن', postcard: 'شكراً', sticker: 'شعار دائري', sticker_sq: 'جديد', mug: 'دوائر', tshirt: 'شعار دائري' };
  let pi = 0;
  for (const [k, v] of Object.entries(PRODUCTS)) {
    const d = dims(v), all = templatesFor(v), pal = PALETTES[pi++ % PALETTES.length].name;
    const t = all.find(x => x.name === PICK[k] && x.palette === pal) || all.find(x => x.name === PICK[k]) || all[0];
    const sc = new fabric.StaticCanvas(null, { width: d.W, height: d.H });
    const { bg, objects } = t.build(d.W, d.H, d.B);
    sc.backgroundColor = bg; sc.add(...objects); sc.renderAll();
    cards[k].querySelector('.thumb').innerHTML = `<img src="${sc.toDataURL({ multiplier: Math.min(300 / d.W, 300 / d.H) })}">`;
    sc.dispose();
    await new Promise(r => setTimeout(r, 0));
  }
}

// ---------- simple mode: one form drives every template ----------
let simpleMode = true, currentTpl = null, backManual = false, rebuildTimer = null, galleryTimer = null;
const fileToImage = file => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = r.result; }; r.readAsDataURL(file); });
const urlToImage = url => new Promise((res, rej) => { const im = new Image(); im.crossOrigin = 'anonymous'; im.onload = () => res(im); im.onerror = rej; im.src = url; });

// customer data survives navigation between products (text fields only; images stay in the session)
try { Object.assign(S, JSON.parse(localStorage.getItem('designer_data') || '{}')); } catch (e) {}
const persistData = () => { try { const o = {}; Object.keys(DEFAULTS).forEach(k => { if (typeof S[k] === 'string') o[k] = S[k]; }); localStorage.setItem('designer_data', JSON.stringify(o)); } catch (e) {} };
function renderForm(root, onChange) {
  const fields = FORM_FIELDS[P.family] || FORM_FIELDS.card;
  root.innerHTML = '';
  fields.forEach(([key, label]) => {
    const wrap = document.createElement('label'); wrap.className = 'field';
    const long = LONG_FIELDS.includes(key);
    wrap.innerHTML = `<span>${t(label)}</span>` + (long ? `<textarea rows="3" data-key="${key}"></textarea>` : `<input type="text" data-key="${key}">`);
    const inp = wrap.querySelector('[data-key]'); inp.value = S[key] || '';
    inp.oninput = () => { S[key] = inp.value; persistData(); onChange(); };
    root.appendChild(wrap);
  });
  // logo + photo
  const media = document.createElement('div'); media.className = 'media-row';
  media.innerHTML = `<button type="button" class="btn" data-media="logo"><svg class="i"><use href="#i-image"/></svg> ${t(S.logoImg ? 'تغيير الشعار' : 'رفع الشعار')}</button>
    <button type="button" class="btn" data-media="photo"><svg class="i"><use href="#i-image"/></svg> ${t(S.photoImg ? 'تغيير الصورة' : 'رفع صورة')}</button>`;
  media.querySelectorAll('[data-media]').forEach(b => b.onclick = () => openUpload(b.dataset.media));
  const reset = document.createElement('button'); reset.className = 'btn ghost'; reset.type = 'button'; reset.textContent = t('إعادة البيانات الافتراضية');
  reset.onclick = () => { Object.keys(DEFAULTS).forEach(k => { S[k] = DEFAULTS[k]; }); persistData(); syncForms(); renderForm(root, onChange); onChange(); };
  media.appendChild(reset);
  root.appendChild(media);
}
function syncForms() {   // keep both forms (gallery + editor) showing the same values
  document.querySelectorAll('[data-key]').forEach(i => { if (i.value !== (S[i.dataset.key] || '')) i.value = S[i.dataset.key] || ''; });
}
function buildInto(tpl) {
  loading = true; canvas.clear(); canvas.backgroundColor = '#fff';
  const { bg, objects } = tpl.build(W, H, B); canvas.backgroundColor = bg; canvas.add(...objects);
  canvas.forEachObject(o => { o.selectable = !simpleMode; o.evented = !simpleMode; });
  canvas.renderAll(); loading = false;
}
function rebuild() {   // simple mode: regenerate the current side(s) from S
  if (!simpleMode || !currentTpl) return;
  if (side !== 0) { sides[side] = snapshot(); }
  const cur = side;
  if (P.sides > 1 && !backManual) { side = 1; buildInto({ build: (w, h, b) => buildBack(w, h, b, currentTpl.paletteObj) }); sides[1] = snapshot(); }
  side = 0; buildInto(currentTpl); sides[0] = snapshot();
  if (cur !== 0) { side = cur; loadJSON(sides[cur]); }
  renderSideButtons(); history = []; pushHistory();
}
const scheduleRebuild = () => { clearTimeout(rebuildTimer); rebuildTimer = setTimeout(rebuild, 120); };
function renderPaletteChips() {
  const root = $('f-palettes'); root.innerHTML = '';
  if (!currentTpl) return;
  PALETTES.forEach(p => {
    const c = document.createElement('button'); c.className = 'chip' + (p.name === currentTpl.palette ? ' on' : ''); c.title = t(p.name);
    c.innerHTML = `<i style="background:${p.accent}"></i><i style="background:${p.dark}"></i>`;
    c.onclick = () => { const tp = TEMPLATES.find(x => x.name === currentTpl.name && x.palette === p.name); if (tp) { currentTpl = tp; $('t-name').textContent = pname(P) + ' — ' + t(tp.name); renderPaletteChips(); rebuild(); } };
    root.appendChild(c);
  });
}
function setMode(simple) {
  simpleMode = simple;
  $('form-panel').classList.toggle('hidden', !simple);
  $('p-none').classList.toggle('hidden', simple || !!canvas.getActiveObject());
  if (simple) $('p-obj').classList.add('hidden');
  document.querySelectorAll('.rail .adv').forEach(b => b.classList.toggle('hidden', simple));
  $('a-advanced').classList.toggle('hidden', !simple);
  $('a-simple').classList.toggle('hidden', simple || !currentTpl);
  canvas.selection = !simple;
  canvas.forEachObject(o => { o.selectable = !simple; o.evented = !simple; });
  canvas.discardActiveObject(); canvas.renderAll();
}

// ---------- gallery ----------
let TEMPLATES = [], paletteFilter = null, styleFilter = null;
const pname = v => (LANG === 'en' && v.nameEn) ? v.nameEn : v.name;
Object.entries(PRODUCTS).forEach(([k, v]) => $('g-product').add(new Option(v.icon + ' ' + pname(v), k, false, k === productKey)));
$('g-product').onchange = e => location.search = '?product=' + e.target.value;
$('g-back').onclick = () => location.search = '';

async function renderMine() {
  const { data } = await sb.from('designer_designs').select('id,name,preview_url,created_at').eq('product', productKey).eq('is_template', true).order('created_at', { ascending: false }).limit(40);
  $('g-mine-wrap').classList.toggle('hidden', !data || !data.length);
  $('g-mine').innerHTML = '';
  (data || []).forEach(d => {
    const el = document.createElement('div'); el.className = 'tpl';
    el.innerHTML = `<div class="th" style="--ar:${W}/${H}"><img src="${d.preview_url}"></div><div class="n"><span>${d.name || t('قالب المطبعة')}</span><span class="tag">${t('مرفوع')}</span></div>`;
    el.onclick = () => loadDesign(d.id, true);
    $('g-mine').appendChild(el);
  });
}

async function renderGallery() {
  await fontsReady();
  if (!$('g-form').children.length) renderForm($('g-form'), () => { clearTimeout(galleryTimer); galleryTimer = setTimeout(() => renderGallery(), 400); });
  TEMPLATES = templatesFor(P);
  $('g-title').textContent = pname(P);
  $('g-count').textContent = `${TEMPLATES.length} ${t('قالباً')} · ${P.w}×${P.h} ${t('مم')}`;
  document.querySelectorAll('.tpl .th').forEach(t => t.style.setProperty('--ar', W + '/' + H));
  const chips = $('g-chips');
  const mk = (label, pal, sw) => { const c = document.createElement('button'); c.className = 'chip' + (pal === paletteFilter ? ' on' : ''); c.innerHTML = (sw ? `<i style="background:${sw}"></i>` : '') + label; c.onclick = () => { paletteFilter = pal; renderGallery(); }; chips.appendChild(c); };
  chips.innerHTML = `<span class="lbl">${t('اللون')}</span>`; mk(t('الكل'), null);
  PALETTES.forEach(p => mk(t(p.name), p.name, p.accent));
  const styles = $('g-styles'); styles.innerHTML = `<span class="lbl">${t('الستايل')}</span>`;
  const mkS = (label, st) => { const c = document.createElement('button'); c.className = 'chip' + (st === styleFilter ? ' on' : ''); c.textContent = label; c.onclick = () => { styleFilter = st; renderGallery(); }; styles.appendChild(c); };
  mkS(t('الكل'), null); [...new Set(TEMPLATES.map(x => x.name))].forEach(n => mkS(t(n), n));
  document.querySelectorAll('#g-grid .tpl:not(.blank):not(.ai):not(.up)').forEach(e => e.remove());
  // one card per layout, with a colour dot per palette (click a dot = live re-render of that variant)
  const layouts = [...new Set(TEMPLATES.map(x => x.name))].filter(n => !styleFilter || n === styleFilter);
  $('g-count').textContent = `${layouts.length} ${t('ستايل')} × ${PALETTES.length} ${t('ألوان')} = ${TEMPLATES.length} ${t('قالباً')} · ${P.w}×${P.h} ${t('مم')}`;
  const sc = new fabric.StaticCanvas(null, { width: W, height: H });
  const mult = Math.min(360 / W, 360 / H);
  const thumb = tpl => { const { bg, objects } = tpl.build(W, H, B); sc.clear(); sc.backgroundColor = bg; sc.add(...objects); sc.renderAll(); return sc.toDataURL({ multiplier: mult }); };
  const run = ++renderGallery.run;
  for (let i = 0; i < layouts.length; i++) {
    if (run !== renderGallery.run) return;
    const name = layouts[i];
    const variants = TEMPLATES.filter(x => x.name === name);
    let cur = variants.find(v => v.palette === paletteFilter) || variants[0];
    const el = document.createElement('div');
    el.className = 'tpl';
    el.innerHTML = `<div class="th" style="--ar:${W}/${H}"><img src="${thumb(cur)}"></div><div class="n"><span>${t(name)}</span></div><div class="dots"></div>`;
    const img = el.querySelector('img'), dots = el.querySelector('.dots');
    variants.forEach(v => {
      const d = document.createElement('button'); d.className = 'dot' + (v === cur ? ' on' : ''); d.title = t(v.palette);
      d.style.background = `linear-gradient(90deg, ${v.paletteObj.dark} 50%, ${v.paletteObj.accent} 50%)`;
      d.onclick = e => { e.stopPropagation(); cur = v; img.src = thumb(v); dots.querySelectorAll('.dot').forEach(x => x.classList.toggle('on', x === d)); };
      dots.appendChild(d);
    });
    el.querySelector('.th').onclick = () => openEditor(cur);
    el.querySelector('.n').onclick = () => openEditor(cur);
    $('g-grid').appendChild(el);
    if (i % 3 === 2) await new Promise(r => setTimeout(r, 0));
  }
}
renderGallery.run = 0;
$('g-blank').onclick = () => openEditor(null);
$('g-ai').onclick = () => toast(t('التصميم بالذكاء الاصطناعي: المرحلة القادمة ✨'));
$('g-upload').onclick = () => { $('a-importfile').dataset.fresh = '1'; $('a-importfile').click(); };

// ---------- editor ----------
let canvas, side = 0, sides = [], history = [], redoStack = [], loading = false;

function initCanvas() {
  if (canvas) return;
  canvas = new fabric.Canvas('c', { width: W, height: H, preserveObjectStacking: true, backgroundColor: '#fff' });
  // print guides (bleed, safe area, folds, round cut), drawn on top, never exported
  canvas.on('after:render', () => {
    const ctx = canvas.getContext(), z = canvas.getZoom();
    ctx.save(); ctx.setLineDash([6, 4]); ctx.lineWidth = 1;
    if (P.shape === 'circle') {
      const cx = W / 2 * z, cy = H / 2 * z;
      ctx.strokeStyle = '#ef4444'; ctx.beginPath(); ctx.arc(cx, cy, (W / 2 - B) * z, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#22c55e'; ctx.beginPath(); ctx.arc(cx, cy, (W / 2 - B - SAFE) * z, 0, Math.PI * 2); ctx.stroke();
    } else {
      ctx.strokeStyle = '#ef4444'; ctx.strokeRect(B * z, B * z, (W - 2 * B) * z, (H - 2 * B) * z);
      ctx.strokeStyle = '#22c55e'; ctx.strokeRect((B + SAFE) * z, (B + SAFE) * z, (W - 2 * B - 2 * SAFE) * z, (H - 2 * B - 2 * SAFE) * z);
    }
    if (P.folds) { ctx.strokeStyle = '#9ca3af'; for (let i = 1; i < P.folds; i++) { const x = W * i / P.folds * z; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H * z); ctx.stroke(); } }
    ctx.restore();
  });
  ['object:added', 'object:modified', 'object:removed'].forEach(ev => canvas.on(ev, () => { pushHistory(); if (!loading && !simpleMode && side === 1) backManual = true; }));
  ['selection:created', 'selection:updated', 'selection:cleared'].forEach(ev => canvas.on(ev, syncProps));
  new ResizeObserver(fit).observe(document.querySelector('.stage'));
}

function fit() {
  const st = document.querySelector('.stage');
  const z = Math.min((st.clientWidth - 56) / W, (st.clientHeight - 56) / H, 3);
  if (!(z > 0)) return;
  canvas.setZoom(z); canvas.setDimensions({ width: W * z, height: H * z });
  $('t-zoom').textContent = Math.round(z * MM / 3.78 * 100) + '%';   // 100% = real print size on a 96dpi screen (3.78 px/mm)
}

async function openEditor(tpl) {
  await fontsReady();
  show('editor');
  initCanvas();
  $('t-name').textContent = pname(P) + (tpl ? ' — ' + t(tpl.name) : '');
  $('t-size').textContent = `${P.w}×${P.h} ${t('مم')} + ${P.bleed} ${t('مم')} bleed`;
  $('legend-fold').classList.toggle('hidden', !P.folds);
  sides = Array.from({ length: P.sides }, () => null);
  side = 0; history = []; redoStack = []; backManual = false; currentTpl = tpl;
  loading = true; canvas.clear(); canvas.backgroundColor = '#fff'; canvas.renderAll(); loading = false;
  if (!$('f-fields').children.length) renderForm($('f-fields'), scheduleRebuild);
  syncForms(); renderPaletteChips(); translateDOM($('editor'));
  setMode(!!tpl);
  if (tpl) rebuild(); else pushHistory();
  renderSideButtons(); fit();
}
$('a-advanced').onclick = () => setMode(false);
$('a-simple').onclick = () => { if (confirm(t('الرجوع للوضع البسيط يعيد بناء التصميم من بياناتك ويلغي التعديلات اليدوية. متابعة؟'))) { backManual = false; setMode(true); rebuild(); } };

function renderSideButtons() {
  const el = $('t-sides'); el.innerHTML = '';
  if (P.sides < 2) return;
  ['الوجه الأمامي', 'الوجه الخلفي'].forEach((n, i) => {
    const b = document.createElement('button'); b.textContent = t(n); b.className = i === side ? 'on' : '';
    b.onclick = () => switchSide(i); el.appendChild(b);
  });
}

function snapshot() { return JSON.stringify(canvas.toJSON(JSON_PROPS)); }
function loadJSON(json) {
  return new Promise(res => { loading = true; canvas.loadFromJSON(json, () => { canvas.renderAll(); loading = false; res(); }); });
}
async function switchSide(i) {
  if (i === side) return;
  sides[side] = snapshot(); side = i; history = []; redoStack = [];
  if (sides[i]) await loadJSON(sides[i]); else { loading = true; canvas.clear(); canvas.backgroundColor = '#fff'; canvas.renderAll(); loading = false; }
  pushHistory(); renderSideButtons();
}
function allSides() { sides[side] = snapshot(); return sides.map(s => s || JSON.stringify({ version: fabric.version, objects: [], background: '#fff' })); }

// ---------- history ----------
function pushHistory() {
  if (loading) return;
  const s = snapshot();
  if (history[history.length - 1] === s) return;
  history.push(s); if (history.length > 40) history.shift(); redoStack = [];
}
async function undo() { if (history.length < 2) return; redoStack.push(history.pop()); await loadJSON(history[history.length - 1]); }
async function redo() { if (!redoStack.length) return; const s = redoStack.pop(); history.push(s); await loadJSON(s); }
$('t-undo').onclick = undo; $('t-redo').onclick = redo; $('t-fit').onclick = fit;

// ---------- add tools ----------
const centerAdd = obj => { canvas.add(obj); obj.center(); obj.setCoords(); canvas.setActiveObject(obj); canvas.renderAll(); };
const U = Math.min(W, H) / 100;
$('a-heading').onclick = () => centerAdd(new fabric.Textbox(t('عنوان'), { fontFamily: 'Cairo', fontSize: 10 * U, fontWeight: 700, direction: 'rtl', textAlign: 'right', width: W * 0.5, fill: '#111' }));
$('a-text').onclick = () => centerAdd(new fabric.Textbox(t('نص جديد'), { fontFamily: 'Cairo', fontSize: 4.5 * U, direction: 'rtl', textAlign: 'right', width: W * 0.4, fill: '#333' }));
$('a-rect').onclick = () => centerAdd(new fabric.Rect({ width: W * 0.3, height: H * 0.3, fill: '#4f46e5' }));
$('a-circle').onclick = () => centerAdd(new fabric.Circle({ radius: 15 * U, fill: '#c9a227' }));
$('a-line').onclick = () => centerAdd(new fabric.Rect({ width: W * 0.3, height: 0.8 * U, fill: '#111' }));
$('a-image').onclick = () => openUpload(simpleMode && currentTpl ? 'logo' : 'image');
$('a-file').onchange = e => { const f = e.target.files[0]; if (f) addImage(URL.createObjectURL(f)); e.target.value = ''; };
$('a-bg').onclick = () => { $('a-bgcolor').value = toHex(canvas.backgroundColor); $('a-bgcolor').click(); };
$('a-bgcolor').oninput = e => { canvas.backgroundColor = e.target.value; canvas.renderAll(); };
$('a-bgcolor').onchange = pushHistory;
$('a-font').onclick = () => $('a-fontfile').click();
$('a-fontfile').onchange = async e => {
  busy(true);
  try { for (const f of e.target.files) { const n = await uploadFont(f); toast(t('تمت إضافة الخط: ') + n); $('p-font').value = n; const o = canvas.getActiveObject(); if (o && o.fontFamily) { o.set('fontFamily', n); canvas.renderAll(); } } }
  catch (err) { toast(t('فشل رفع الخط: ') + err.message); }
  busy(false); e.target.value = '';
};
$('a-import').onclick = () => { $('a-importfile').dataset.fresh = ''; $('a-importfile').click(); };
$('a-importfile').onchange = async e => {
  const f = e.target.files[0]; e.target.value = '';
  if (!f) return;
  if (e.target.dataset.fresh) await openEditor(null);
  await importPdf(f);
};

function addImage(url) {
  const ph = canvas.getActiveObject();
  const isPh = ph && ph.data && ph.data.placeholder;
  fabric.Image.fromURL(url, img => {
    if (!img.width) return toast(t('تعذّر تحميل الصورة'));
    if (isPh) {   // fill the placeholder frame (cover + crop)
      const bw = ph.getScaledWidth(), bh = ph.getScaledHeight();
      const s = Math.max(bw / img.width, bh / img.height), cw = bw / s, ch = bh / s;
      img.set({ cropX: (img.width - cw) / 2, cropY: (img.height - ch) / 2, width: cw, height: ch, scaleX: s, scaleY: s, left: ph.left, top: ph.top });
      canvas.remove(ph); canvas.add(img); canvas.setActiveObject(img); canvas.renderAll();
      return;
    }
    img.scale(Math.min((W * 0.5) / img.width, (H * 0.5) / img.height));
    centerAdd(img);
  }, { crossOrigin: 'anonymous' });
}

// ---------- import PDF / AI (PDF-compatible) as editable background pages ----------
// ponytail: rasterised at ~300dpi, not vector; good enough for print and for editing on top.
async function importPdf(file) {
  if (!window.pdfjsLib) return toast(t('مكتبة PDF غير محمّلة'));
  busy(true);
  try {
    const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    const pages = Math.min(pdf.numPages, P.sides);
    const startSide = side;
    for (let i = 1; i <= pages; i++) {
      const page = await pdf.getPage(i);
      const vp0 = page.getViewport({ scale: 1 });
      const scale = Math.min(3200 / vp0.width, 3200 / vp0.height, (W * EXPORT_MULT) / vp0.width);
      const vp = page.getViewport({ scale });
      const c = document.createElement('canvas'); c.width = Math.ceil(vp.width); c.height = Math.ceil(vp.height);
      await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
      const url = c.toDataURL('image/png');
      if (i > 1) await switchSide(i - 1);
      await new Promise(res => fabric.Image.fromURL(url, img => {
        const s = Math.min(W / img.width, H / img.height);   // fit the page to the product (incl. bleed)
        img.set({ scaleX: s, scaleY: s, left: (W - img.width * s) / 2, top: (H - img.height * s) / 2, data: { imported: true } });
        canvas.add(img); canvas.sendToBack(img); canvas.renderAll(); res();
      }));
    }
    if (side !== startSide) await switchSide(startSide);
    canvas.renderAll();
    toast(LANG === 'en' ? `Imported ${pages} page(s) from ${file.name}` : `تم استيراد ${pages} صفحة من ${file.name}`);
  } catch (err) {
    console.error(err);
    toast(/\.ai$/i.test(file.name) ? t('ملف AI غير متوافق مع PDF. احفظه من Illustrator مع خيار "Create PDF Compatible File"') : t('تعذّر قراءة الملف: ') + err.message);
  }
  busy(false);
}

// ---------- upload modal (device / phone QR / drag-drop) + QR broadcast ----------
const session = uuid();
const UPLOADS = [];   // { url, name } newest first (session only)
let uploadKind = 'image', qrMade = false;
function openUpload(kind) {
  uploadKind = kind;
  $('u-title').textContent = t(kind === 'logo' ? 'ارفع شعارك' : kind === 'photo' ? 'ارفع صورتك' : 'ارفع صورتك');
  $('u-qr').classList.add('hidden'); $('u-actions').classList.remove('hidden');
  renderUploads(); $('m-upload').classList.remove('hidden');
}
function renderUploads() {
  const list = $('u-list'); list.innerHTML = '';
  $('u-empty').classList.toggle('hidden', UPLOADS.length > 0);
  UPLOADS.forEach(u => {
    const el = document.createElement('div'); el.className = 'u-item'; el.title = t('استخدام');
    el.innerHTML = `<div class="im"><img src="${u.url}"></div><small>${u.name}</small>`;
    el.onclick = () => useUpload(u); list.appendChild(el);
  });
}
async function useUpload(u) {
  $('m-upload').classList.add('hidden');
  if (simpleMode && currentTpl) {
    let kind = uploadKind;
    if (kind === 'image') kind = canvas.getObjects().some(o => o.data && (o.data.placeholder || o.data.photo)) ? 'photo' : 'logo';
    S[kind === 'photo' ? 'photoImg' : 'logoImg'] = await urlToImage(u.url);
    syncForms(); rebuild(); renderForm($('f-fields'), scheduleRebuild); translateDOM($('f-fields'));
  } else addImage(u.url);
}
function addUpload(url, name, use) { UPLOADS.unshift({ url, name }); renderUploads(); if (use) useUpload(UPLOADS[0]); }
const readAsDataURL = f => new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(f); });
async function filesPicked(files) { const arr = [...files].filter(f => f.type.startsWith('image/')); for (let i = 0; i < arr.length; i++) addUpload(await readAsDataURL(arr[i]), arr[i].name, i === 0); }
$('u-close').onclick = () => $('m-upload').classList.add('hidden');
$('u-device').onclick = () => $('u-file').click();
$('u-file').onchange = e => { filesPicked(e.target.files); e.target.value = ''; };
$('u-phone').onclick = () => {
  const url = new URL('upload.html?s=' + session, location.href).href;
  if (!qrMade) { new QRCode($('qr'), { text: url, width: 200, height: 200 }); $('qr-url').textContent = url; qrMade = true; }
  $('u-actions').classList.add('hidden'); $('u-qr').classList.remove('hidden');
};
const zone = $('u-zone');
['dragenter', 'dragover'].forEach(ev => zone.addEventListener(ev, e => { e.preventDefault(); zone.classList.add('over'); }));
['dragleave', 'drop'].forEach(ev => zone.addEventListener(ev, e => { e.preventDefault(); zone.classList.remove('over'); }));
zone.addEventListener('drop', e => filesPicked(e.dataTransfer.files));
sb.channel('upload:' + session).on('broadcast', { event: 'image' }, ({ payload }) => {
  toast(t('وصلت الصورة من الجوال ✓'));
  const open = !$('m-upload').classList.contains('hidden');
  addUpload(payload.url, t('من الجوال'), true);
  if (open) $('m-upload').classList.add('hidden');
}).subscribe();
$('a-qr').onclick = () => { openUpload(simpleMode && currentTpl ? 'logo' : 'image'); $('u-phone').click(); };

// ---------- properties ----------
const toHex = c => { if (!c || typeof c !== 'string') return '#000000'; if (c[0] === '#') return c.length === 4 ? '#' + [...c.slice(1)].map(x => x + x).join('') : c.slice(0, 7); const m = c.match(/\d+/g); return m ? '#' + m.slice(0, 3).map(n => (+n).toString(16).padStart(2, '0')).join('') : '#000000'; };
function syncProps() {
  const o = canvas.getActiveObject();
  $('p-none').classList.toggle('hidden', !!o); $('p-obj').classList.toggle('hidden', !o);
  if (!o) return;
  const isText = o.type === 'textbox' || o.type === 'i-text' || o.type === 'text';
  $('p-text').classList.toggle('hidden', !isText);
  $('p-fill').value = toHex(o.fill); $('p-opacity').value = Math.round((o.opacity ?? 1) * 100);
  if (isText) { $('p-font').value = o.fontFamily; $('p-size').value = Math.round(o.fontSize); }
}
const withActive = fn => () => { const o = canvas.getActiveObject(); if (!o) return; fn(o); o.setCoords(); canvas.renderAll(); canvas.fire('object:modified', { target: o }); };
$('p-fill').oninput = withActive(o => o.set('fill', $('p-fill').value));
$('p-opacity').oninput = withActive(o => o.set('opacity', +$('p-opacity').value / 100));
$('p-font').onchange = withActive(o => o.set('fontFamily', $('p-font').value));
$('p-size').oninput = withActive(o => o.set('fontSize', +$('p-size').value));
$('p-bold').onclick = withActive(o => o.set('fontWeight', o.fontWeight == 700 ? 400 : 700));
$('p-italic').onclick = withActive(o => o.set('fontStyle', o.fontStyle === 'italic' ? 'normal' : 'italic'));
$('p-right').onclick = withActive(o => o.set('textAlign', 'right'));
$('p-center').onclick = withActive(o => o.set('textAlign', 'center'));
$('p-left').onclick = withActive(o => o.set('textAlign', 'left'));
$('p-dir').onclick = withActive(o => o.set('direction', o.direction === 'rtl' ? 'ltr' : 'rtl'));
$('p-front').onclick = withActive(o => canvas.bringForward(o));
$('p-backw').onclick = withActive(o => canvas.sendBackwards(o));
$('p-del').onclick = () => { canvas.getActiveObjects().forEach(o => canvas.remove(o)); canvas.discardActiveObject(); canvas.renderAll(); };
$('p-dup').onclick = () => { const o = canvas.getActiveObject(); if (!o) return; o.clone(c => { c.set({ left: o.left + 20, top: o.top + 20 }); canvas.add(c); canvas.setActiveObject(c); canvas.renderAll(); }, JSON_PROPS); };

document.addEventListener('keydown', e => {
  if (!canvas || $('editor').classList.contains('hidden')) return;
  const o = canvas.getActiveObject();
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName) || (o && o.isEditing)) return;
  if (e.key === 'Delete' || e.key === 'Backspace') { $('p-del').onclick(); e.preventDefault(); }
  if (e.ctrlKey && e.key === 'z') { undo(); e.preventDefault(); }
  if (e.ctrlKey && e.key === 'y') { redo(); e.preventDefault(); }
  if (e.ctrlKey && e.key === 'd') { $('p-dup').onclick(); e.preventDefault(); }
});

// ---------- export ----------
// 300dpi, capped at 5000px on the long side (roll-ups are printed at lower dpi anyway)
const EXPORT_MULT = Math.min((300 / 25.4) / MM, 5000 / Math.max(W, H));
function renderPNG(mult = EXPORT_MULT, format = 'png') {
  canvas.discardActiveObject(); canvas.renderAll();
  const z = canvas.getZoom(); canvas.setZoom(1); canvas.setDimensions({ width: W, height: H });
  const url = canvas.toDataURL({ format, quality: 0.92, multiplier: mult });
  canvas.setZoom(z); canvas.setDimensions({ width: W * z, height: H * z });
  return url;
}
async function eachSide(fn) {
  const all = allSides(), cur = side;
  for (let i = 0; i < all.length; i++) { await loadJSON(all[i]); await fn(i); }
  await loadJSON(all[cur]);
}
const download = (url, name) => { const a = document.createElement('a'); a.href = url; a.download = name; a.click(); };

$('t-png').onclick = () => eachSide(i => download(renderPNG(), `${productKey}-${i + 1}.png`));
$('t-pdf').onclick = async () => {
  const wmm = P.w + 2 * P.bleed, hmm = P.h + 2 * P.bleed, or = wmm > hmm ? 'l' : 'p';
  const pdf = new jspdf.jsPDF({ unit: 'mm', format: [wmm, hmm], orientation: or });
  await eachSide(i => { if (i) pdf.addPage([wmm, hmm], or); pdf.addImage(renderPNG(EXPORT_MULT, 'jpeg'), 'JPEG', 0, 0, wmm, hmm); });   // jpeg q0.92 at 300dpi: ~1MB/page
  pdf.save(`${productKey}-print.pdf`);
};

// ---------- save / load ----------
async function saveDesign({ isTemplate = false, name = null } = {}) {
  busy(true);
  try {
    const id = uuid();
    const data = { sides: allSides().map(JSON.parse) };
    const blob = await (await fetch(renderPNG(Math.min(1, 800 / W)))).blob();
    const path = `previews/${id}.png`;
    const up = await sb.storage.from(BUCKET).upload(path, blob, { contentType: 'image/png' });
    if (up.error) throw up.error;
    const preview_url = sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    const ins = await sb.from('designer_designs').insert({ id, product: productKey, data, preview_url, is_template: isTemplate, name });
    if (ins.error) throw ins.error;
    const url = new URL(`?product=${productKey}&design=${id}`, location.href).href;
    $('s-title').textContent = t(isTemplate ? 'تم حفظ القالب ✓' : 'تم حفظ التصميم ✓');
    $('s-hint').textContent = t(isTemplate ? 'سيظهر في معرض هذا المنتج ضمن "قوالب المطبعة المرفوعة"' : 'انسخ رقم التصميم وضعه في ملاحظات الطلب، أو شارك الرابط مع المطبعة');
    $('s-id').textContent = id; $('s-url').textContent = url;
    $('s-copy').onclick = () => { navigator.clipboard.writeText(url); toast(t('تم النسخ')); };
    $('m-saved').classList.remove('hidden');
    if (isTemplate) renderMine();
  } catch (e) { toast(t('فشل الحفظ: ') + e.message); }
  busy(false);
}
$('t-save').onclick = () => saveDesign();
$('t-template').onclick = () => { const name = prompt(t('اسم القالب كما سيظهر في المعرض:'), pname(P) + t(' — قالب المطبعة')); if (name !== null) saveDesign({ isTemplate: true, name: name.trim() || null }); };

async function loadDesign(id, asTemplate = false) {
  const { data, error } = await sb.from('designer_designs').select('data,name').eq('id', id).single();
  if (error || !data) return toast(t('التصميم غير موجود'));
  await openEditor(null);
  backManual = true;
  sides = data.data.sides.map(JSON.stringify);
  await loadJSON(sides[0]); history = []; pushHistory();
  $('t-name').textContent = pname(P) + ' — ' + (asTemplate ? (data.name || t('قالب المطبعة')) : t('تصميم محفوظ'));
}

$('t-back').onclick = () => { if (confirm(t('الرجوع للقوالب؟ التعديلات غير المحفوظة ستضيع.'))) show('gallery'); };

// ---------- language ----------
document.querySelectorAll('.lang-toggle').forEach(b => { b.textContent = LANG === 'en' ? 'عربي' : 'EN'; b.onclick = () => setLang(LANG === 'en' ? 'ar' : 'en'); });
translateDOM();

// ---------- boot ----------
if (!productKey) { show('catalog'); renderCatalog(); }
else { show('gallery'); renderCatalog(); renderGallery(); renderMine(); if (qs.get('design')) loadDesign(qs.get('design')); }
loadCustomFonts();
