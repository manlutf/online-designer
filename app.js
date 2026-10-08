// ---------- setup ----------
// fabric measures Arabic glyph-by-glyph (unshaped), so RTL lines come out narrower than they render and
// left/center-aligned text drifts. Measure unstyled lines with the real shaped width instead.
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
// fabric 5.3.1 only re-applies ctx.direction/textAlign when the canvas 'dir' attribute changes, so mixed RTL/LTR text
// drifts after the first line. Force the re-apply on every line.
{ const orig = fabric.Text.prototype._renderChars;
  fabric.Text.prototype._renderChars = function (method, ctx, line, left, top, lineIndex) { ctx.canvas.setAttribute('dir', 'reset'); return orig.call(this, method, ctx, line, left, top, lineIndex); }; }
// fabric 5.3.1 sets ctx.textBaseline = 'alphabetical' (typo) and floods the console; map it to the valid value.
{ const d = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'textBaseline');
  Object.defineProperty(CanvasRenderingContext2D.prototype, 'textBaseline', { get: d.get, set(v) { d.set.call(this, v === 'alphabetical' ? 'alphabetic' : v); } }); }

const qs = new URLSearchParams(location.search);
const productKey = PRODUCTS[qs.get('product')] ? qs.get('product') : null;
const P = PRODUCTS[productKey || 'cards'];
const MM = P.pxPerMm, B = P.bleed * MM, SAFE = 3 * MM;
const W = Math.round((P.w + 2 * P.bleed) * MM), H = Math.round((P.h + 2 * P.bleed) * MM);
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const $ = id => document.getElementById(id);
const FONTS = ['Cairo', 'Tajawal', 'Almarai', 'Amiri', 'Poppins', 'Montserrat', 'Playfair Display'];
const JSON_PROPS = ['data'];

const toast = msg => { const t = document.createElement('div'); t.id = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2500); };
// load every weight we use before measuring text: fabric caches glyph widths per font, so measuring with a fallback font would stick
const fontsReady = () => Promise.all(FONTS.flatMap(f => ['400', '700', '900'].map(w => document.fonts.load(w + ' 16px "' + f + '"')))).then(() => { fabric.charWidthsCache = {}; }).catch(() => {});
const show = id => { ['catalog', 'gallery', 'editor'].forEach(s => $(s).classList.toggle('hidden', s !== id)); $('nav').classList.toggle('hidden', id === 'editor'); };

// ---------- catalog ----------
function renderCatalog() {
  const total = Object.values(TEMPLATE_COUNT).reduce((a, b) => a + b, 0);
  $('st-products').textContent = Object.keys(PRODUCTS).length;
  $('st-templates').textContent = total + '+';
  Object.entries(PRODUCTS).forEach(([k, v]) => {
    const el = document.createElement('a');
    el.className = 'pcard'; el.href = '?product=' + k;
    el.innerHTML = `<div class="ic">${v.icon}</div><b>${v.name}</b><small>${v.w} × ${v.h} مم${v.sides > 1 ? ' · وجهان' : ''}</small><span class="cnt">${TEMPLATE_COUNT[k]} قالباً</span>`;
    $('pgrid').appendChild(el);
  });
}

// ---------- gallery ----------
let TEMPLATES = [], paletteFilter = null, styleFilter = null;
Object.entries(PRODUCTS).forEach(([k, v]) => $('g-product').add(new Option(v.icon + ' ' + v.name, k, false, k === productKey)));
$('g-product').onchange = e => location.search = '?product=' + e.target.value;
$('g-back').onclick = () => location.search = '';

async function renderGallery() {
  await fontsReady();
  TEMPLATES = templatesFor(P);
  $('g-title').textContent = P.name;
  $('g-count').textContent = `${TEMPLATES.length} قالباً · ${P.w}×${P.h} مم`;
  document.querySelectorAll('.tpl .th').forEach(t => t.style.setProperty('--ar', W + '/' + H));
  // palette chips
  const chips = $('g-chips');
  const mk = (label, pal, sw) => { const c = document.createElement('button'); c.className = 'chip' + (pal === paletteFilter ? ' on' : ''); c.innerHTML = (sw ? `<i style="background:${sw}"></i>` : '') + label; c.onclick = () => { paletteFilter = pal; renderGallery(); }; chips.appendChild(c); };
  chips.innerHTML = ''; mk('كل الألوان', null);
  PALETTES.forEach(p => mk(p.name, p.name, p.accent));
  // style chips (one per layout, named after the design style)
  const styles = $('g-styles'); styles.innerHTML = '';
  const mkS = (label, st) => { const c = document.createElement('button'); c.className = 'chip' + (st === styleFilter ? ' on' : ''); c.textContent = label; c.onclick = () => { styleFilter = st; renderGallery(); }; styles.appendChild(c); };
  mkS('كل الستايلات', null); [...new Set(TEMPLATES.map(t => t.name))].forEach(n => mkS(n, n));
  // thumbnails, chunked so the UI stays responsive
  document.querySelectorAll('#g-grid .tpl:not(.blank):not(.ai)').forEach(e => e.remove());
  const list = TEMPLATES.filter(t => (!paletteFilter || t.palette === paletteFilter) && (!styleFilter || t.name === styleFilter));
  const sc = new fabric.StaticCanvas(null, { width: W, height: H });
  const mult = Math.min(360 / W, 360 / H);
  const run = ++renderGallery.run;
  for (let i = 0; i < list.length; i++) {
    if (run !== renderGallery.run) return;
    const t = list[i];
    const { bg, objects } = t.build(W, H, B);
    sc.clear(); sc.backgroundColor = bg; sc.add(...objects); sc.renderAll();
    const el = document.createElement('div');
    el.className = 'tpl';
    el.innerHTML = `<div class="th" style="--ar:${W}/${H}"><img src="${sc.toDataURL({ multiplier: mult })}"></div><div class="n"><span>${t.name}</span><span><i style="background:${t.swatch[0]}"></i><i style="background:${t.swatch[1]}"></i></span></div>`;
    el.onclick = () => openEditor(t);
    $('g-grid').appendChild(el);
    if (i % 4 === 3) await new Promise(r => setTimeout(r, 0));
  }
}
renderGallery.run = 0;
$('g-blank').onclick = () => openEditor(null);
$('g-ai').onclick = () => toast('التصميم بالذكاء الاصطناعي: المرحلة القادمة ✨');

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
  ['object:added', 'object:modified', 'object:removed'].forEach(ev => canvas.on(ev, pushHistory));
  ['selection:created', 'selection:updated', 'selection:cleared'].forEach(ev => canvas.on(ev, syncProps));
  new ResizeObserver(fit).observe(document.querySelector('.stage'));
}

function fit() {
  const st = document.querySelector('.stage');
  const z = Math.min((st.clientWidth - 48) / W, (st.clientHeight - 48) / H, 3);
  canvas.setZoom(z); canvas.setDimensions({ width: W * z, height: H * z });
}

async function openEditor(tpl) {
  await fontsReady();
  show('editor');
  initCanvas();
  $('t-name').textContent = P.name + (tpl ? ' — ' + tpl.name : '');
  $('t-size').textContent = `${P.w}×${P.h} مم + ${P.bleed} مم bleed`;
  $('legend-fold').classList.toggle('hidden', !P.folds);
  sides = Array.from({ length: P.sides }, () => null);
  side = 0; history = []; redoStack = [];
  loading = true; canvas.clear(); canvas.backgroundColor = '#fff';
  if (tpl) { const { bg, objects } = tpl.build(W, H, B); canvas.backgroundColor = bg; canvas.add(...objects); }
  canvas.renderAll(); loading = false; pushHistory();
  renderSideButtons(); fit();
}

function renderSideButtons() {
  const el = $('t-sides'); el.innerHTML = '';
  if (P.sides < 2) return;
  ['الوجه الأمامي', 'الوجه الخلفي'].forEach((n, i) => {
    const b = document.createElement('button'); b.textContent = n; b.className = i === side ? 'on' : '';
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
$('a-heading').onclick = () => centerAdd(new fabric.Textbox('عنوان', { fontFamily: 'Cairo', fontSize: 10 * U, fontWeight: 700, direction: 'rtl', textAlign: 'right', width: W * 0.5, fill: '#111' }));
$('a-text').onclick = () => centerAdd(new fabric.Textbox('نص جديد', { fontFamily: 'Cairo', fontSize: 4.5 * U, direction: 'rtl', textAlign: 'right', width: W * 0.4, fill: '#333' }));
$('a-rect').onclick = () => centerAdd(new fabric.Rect({ width: W * 0.3, height: H * 0.3, fill: '#1d4ed8' }));
$('a-circle').onclick = () => centerAdd(new fabric.Circle({ radius: 15 * U, fill: '#c9a227' }));
$('a-line').onclick = () => centerAdd(new fabric.Rect({ width: W * 0.3, height: 0.8 * U, fill: '#111' }));
$('a-image').onclick = () => $('a-file').click();
$('a-file').onchange = e => { const f = e.target.files[0]; if (f) addImage(URL.createObjectURL(f)); e.target.value = ''; };
$('a-bg').onclick = () => { $('a-bgcolor').value = toHex(canvas.backgroundColor); $('a-bgcolor').click(); };
$('a-bgcolor').oninput = e => { canvas.backgroundColor = e.target.value; canvas.renderAll(); };
$('a-bgcolor').onchange = pushHistory;

function addImage(url) {
  const ph = canvas.getActiveObject();
  const isPh = ph && ph.data && ph.data.placeholder;
  fabric.Image.fromURL(url, img => {
    if (!img.width) return toast('تعذّر تحميل الصورة');
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

// ---------- QR upload from phone ----------
const session = crypto.randomUUID();
let qrMade = false;
sb.channel('upload:' + session).on('broadcast', { event: 'image' }, ({ payload }) => {
  addImage(payload.url); $('m-qr').classList.add('hidden'); toast('وصلت الصورة من الجوال ✓');
}).subscribe();
$('a-qr').onclick = () => {
  const url = new URL('upload.html?s=' + session, location.href).href;
  if (!qrMade) { new QRCode($('qr'), { text: url, width: 220, height: 220 }); $('qr-url').textContent = url; qrMade = true; }
  $('m-qr').classList.remove('hidden');
};

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
  await eachSide(i => { if (i) pdf.addPage([wmm, hmm], or); pdf.addImage(renderPNG(EXPORT_MULT, 'jpeg'), 'JPEG', 0, 0, wmm, hmm); });   // jpeg q0.92 at 300dpi: ~1MB/page instead of ~18MB
  pdf.save(`${productKey}-print.pdf`);
};

// ---------- save / load ----------
$('t-save').onclick = async () => {
  $('t-save').disabled = true; toast('جاري الحفظ…');
  try {
    const id = crypto.randomUUID();
    const data = { sides: allSides().map(JSON.parse) };
    const blob = await (await fetch(renderPNG(Math.min(1, 800 / W)))).blob();
    const path = `previews/${id}.png`;
    const up = await sb.storage.from(BUCKET).upload(path, blob, { contentType: 'image/png' });
    if (up.error) throw up.error;
    const preview_url = sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    const ins = await sb.from('designer_designs').insert({ id, product: productKey, data, preview_url });
    if (ins.error) throw ins.error;
    const url = new URL(`?product=${productKey}&design=${id}`, location.href).href;
    $('s-id').textContent = id; $('s-url').textContent = url;
    $('s-copy').onclick = () => { navigator.clipboard.writeText(url); toast('تم النسخ'); };
    $('m-saved').classList.remove('hidden');
  } catch (e) { toast('فشل الحفظ: ' + e.message); }
  $('t-save').disabled = false;
};

async function loadDesign(id) {
  const { data, error } = await sb.from('designer_designs').select('data').eq('id', id).single();
  if (error || !data) return toast('التصميم غير موجود');
  await openEditor(null);
  sides = data.data.sides.map(JSON.stringify);
  await loadJSON(sides[0]); history = []; pushHistory();
  $('t-name').textContent = P.name + ' — تصميم محفوظ';
}

$('t-back').onclick = () => { if (confirm('الرجوع للقوالب؟ التعديلات غير المحفوظة ستضيع.')) show('gallery'); };

// ---------- boot ----------
renderCatalog();
if (!productKey) show('catalog');
else { show('gallery'); renderGallery(); if (qs.get('design')) loadDesign(qs.get('design')); }
