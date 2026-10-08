// Template engine: layouts per product family × colour palettes, built at runtime with fabric objects.
// Coordinates are % of canvas W/H (incl. bleed); sizes are in u = 1% of the short side.

const PALETTES = [
  { name: 'كحلي وذهبي',    dark: '#0f1f3d', accent: '#c9a227', bg: '#ffffff', light: '#eef1f7', text: '#0f1f3d', sub: '#5b6478', fontAr: 'Cairo',   fontEn: 'Poppins' },
  { name: 'أسود وذهبي',    dark: '#111111', accent: '#d4af37', bg: '#fafafa', light: '#ececec', text: '#111111', sub: '#666666', fontAr: 'Almarai', fontEn: 'Montserrat' },
  { name: 'تركوازي',       dark: '#0b4f4f', accent: '#14b8a6', bg: '#ffffff', light: '#e6f7f5', text: '#083d3d', sub: '#4a6b6b', fontAr: 'Tajawal', fontEn: 'Poppins' },
  { name: 'عنابي كلاسيكي', dark: '#4a0f22', accent: '#8b1e3f', bg: '#fbf7f2', light: '#f3e6e9', text: '#3b0a1a', sub: '#6b4b55', fontAr: 'Amiri',   fontEn: 'Playfair Display' },
  { name: 'أخضر زيتوني',   dark: '#1d3b24', accent: '#5a8a3a', bg: '#f6f7f1', light: '#e8eedf', text: '#1d3b24', sub: '#5a6b5e', fontAr: 'Cairo',   fontEn: 'Montserrat' },
  { name: 'مرجاني',        dark: '#3b2a2a', accent: '#f26d5b', bg: '#fff8f5', light: '#fde8e3', text: '#3b2a2a', sub: '#8a6a66', fontAr: 'Tajawal', fontEn: 'Poppins' },
  { name: 'بنفسجي ملكي',   dark: '#2e1065', accent: '#7c3aed', bg: '#ffffff', light: '#ede9fe', text: '#2e1065', sub: '#6b5b8a', fontAr: 'Cairo',   fontEn: 'Montserrat' },
  { name: 'رمادي وبرتقالي', dark: '#1f2937', accent: '#f97316', bg: '#ffffff', light: '#f3f4f6', text: '#1f2937', sub: '#6b7280', fontAr: 'Almarai', fontEn: 'Poppins' },
  { name: 'نيون حمضي',      dark: '#0a0a0a', accent: '#c6ff00', bg: '#111111', light: '#1f1f1f', text: '#f5f5f5', sub: '#a3a3a3', fontAr: 'Almarai', fontEn: 'Montserrat' },
  { name: 'باستيل ناعم',    dark: '#4a044e', accent: '#f472b6', bg: '#fdf2f8', light: '#fce7f3', text: '#4a044e', sub: '#86198f', fontAr: 'Tajawal', fontEn: 'Poppins' },
];

const S = {
  company: 'شركة الأفق للتقنية', companyEn: 'HORIZON TECH', slogan: 'نصنع المستقبل معاً',
  name: 'محمد العلي', title: 'المدير التنفيذي',
  phone: '+966 55 123 4567', email: 'info@horizon.sa', web: 'www.horizon.sa', address: 'الرياض، حي العليا، شارع التحلية',
  headline: 'عرض الافتتاح الكبير', sub: 'خصومات تصل إلى 50% على جميع المنتجات',
  body: 'انضم إلينا واستمتع بتجربة استثنائية مع أفضل الخدمات وأسعار لا تُنافس. العرض لفترة محدودة.',
  cta: 'اطلب الآن', date: 'من 1 إلى 15 نوفمبر 2026', pct: '50%',
  bullets: ['جودة عالية مضمونة', 'توصيل سريع لجميع المناطق', 'دعم فني على مدار الساعة'],
  couple: 'سارة & أحمد', inviteTitle: 'دعوة زفاف', inviteLine: 'يتشرف آل العلي وآل السالم بدعوتكم لحضور حفل زفاف',
  eventDate: 'الخميس 12 مارس 2027', eventPlace: 'قاعة الماسة، الرياض', eventTime: 'الساعة 8 مساءً',
  cert: 'شهادة تقدير', certTo: 'تُمنح هذه الشهادة إلى', certFor: 'تقديراً لجهوده المتميزة ومساهمته الفعّالة في إنجاح البرنامج التدريبي لعام 2026',
  signer: 'المدير العام', signer2: 'مدير التدريب',
  menuTitle: 'قائمة المشروبات', menu: [['قهوة عربية', '18'], ['لاتيه', '22'], ['كابتشينو', '20'], ['موكا', '24'], ['شاي كرك', '12'], ['عصير برتقال طازج', '16'], ['سبانش لاتيه', '25'], ['آيس أمريكانو', '19']],
  voucher: 'قسيمة هدية', amount: '500 ريال', voucherNote: 'صالحة حتى 31 ديسمبر 2026 • لا تُستبدل نقداً', code: 'GIFT-2026-0481',
  role: 'مهندس برمجيات', idno: 'ID 10482', dept: 'قسم التقنية',
  thanks: 'شكراً لك', thanksBody: 'نقدّر ثقتك بنا ونتطلع لخدمتك مجدداً. استخدم الكود THANKS10 لخصم 10% على طلبك القادم.',
  mug: 'صباح الإنجاز', tshirt: 'فريق الأفق', letterSubject: 'الموضوع: عرض سعر',
  letterBody: 'السادة / شركة النور للتجارة            المحترمين\n\nتحية طيبة وبعد،\n\nيسرّنا أن نقدّم لكم عرض السعر المرفق لتوريد وتركيب الأنظمة المطلوبة وفق المواصفات المتفق عليها.\n\nوتفضلوا بقبول فائق الاحترام،',
};

// ---------- drawing kit ----------
// fabric measures Arabic per glyph (no shaping), so check the shaped width with a real 2D context too.
const measureCtx = document.createElement('canvas').getContext('2d');
function realWidth(tb) {
  measureCtx.font = `${tb.fontStyle || 'normal'} ${tb.fontWeight || 400} ${tb.fontSize}px "${tb.fontFamily}"`;
  const real = Math.max(...tb.textLines.map(l => measureCtx.measureText(l).width));
  // RTL lines are anchored at their right end using fabric's (smaller) width, so a left/center-aligned line
  // spills left by the measurement gap; demand that much extra room.
  const gap = Math.max(0, real - tb.getLineWidth(0));
  return real + (tb.direction === 'rtl' ? (tb.textAlign === 'left' ? gap : tb.textAlign === 'center' ? gap / 2 : 0) : 0);
}
function kit(W, H, b, p) {
  const u = Math.min(W, H) / 100, X = v => W * v / 100, Y = v => H * v / 100;
  const k = {
    u, X, Y, p,
    mx: (b / W) * 100 + 7 * u / W * 100,   // margin x in % (bleed + ~7u safe)
    my: (b / H) * 100 + 7 * u / H * 100,
    txt(text, o = {}) {
      const { x = 0, y = 0, w = 100, s = 4, weight = 400, fill = p.text, align = 'right', font = p.fontAr, dir = 'rtl', lh = 1.25, lines, ...rest } = o;
      const tb = new fabric.Textbox(text, { left: X(x), top: Y(y), width: X(w), fontSize: s * u, fontWeight: weight, fill, textAlign: align, fontFamily: font, direction: dir, lineHeight: lh, ...rest });
      // auto-fit: short labels must not wrap (1 line ≤40 chars, 2 lines ≤80); shrink until they fit
      if (!text.includes('\n') && text.length <= 80) { const max = lines || (text.length <= 40 ? 1 : 2); let n = 0; while ((tb.textLines.length > max || realWidth(tb) > tb.width) && n++ < 20) tb.set('fontSize', tb.fontSize * 0.93); }
      return tb;
    },
    en(text, o = {}) { return k.txt(text, { font: p.fontEn, dir: 'ltr', align: 'left', ...o }); },
    rect(x, y, w, h, fill, o = {}) { return new fabric.Rect({ left: X(x), top: Y(y), width: X(w), height: Y(h), fill, ...o }); },
    hline(x, y, w, t, fill) { return new fabric.Rect({ left: X(x), top: Y(y), width: X(w), height: t * u, fill }); },
    vline(x, y, h, t, fill) { return new fabric.Rect({ left: X(x), top: Y(y), width: t * u, height: Y(h), fill }); },
    circle(cx, cy, r, fill, o = {}) { return new fabric.Circle({ left: X(cx) - r * u, top: Y(cy) - r * u, radius: r * u, fill, ...o }); },
    ring(cx, cy, r, stroke, t) { return k.circle(cx, cy, r, 'transparent', { stroke, strokeWidth: t * u }); },
    poly(pts, fill, o = {}) { return new fabric.Polygon(pts.map(([x, y]) => ({ x: X(x), y: Y(y) })), { fill, ...o }); },
    frame(x, y, w, h, stroke, t, o = {}) { return new fabric.Rect({ left: X(x), top: Y(y), width: X(w), height: Y(h), fill: 'transparent', stroke, strokeWidth: t * u, ...o }); },
    img(x, y, w, h, o = {}) {   // photo placeholder; app.js swaps it for an uploaded image
      const r = new fabric.Rect({ left: 0, top: 0, width: X(w), height: Y(h), fill: o.fill || p.light, rx: (o.rx || 0) * u, ry: (o.rx || 0) * u });
      const t = new fabric.Textbox('📷 صورتك هنا', { left: 0, top: Y(h) / 2 - 2.2 * u, width: X(w), fontSize: Math.min(3.2 * u, X(w) / 9), fontFamily: 'Cairo', fill: o.textFill || p.sub, textAlign: 'center', direction: 'rtl' });
      return new fabric.Group([r, t], { left: X(x), top: Y(y), data: { placeholder: true } });
    },
    logo(cx, cy, r, fill, letter = 'A', textFill = '#fff') {
      return [k.circle(cx, cy, r, fill), new fabric.Textbox(letter, { left: X(cx) - r * u, top: Y(cy) - r * u * 0.72, width: 2 * r * u, fontSize: r * u * 1.2, fontFamily: p.fontEn, fontWeight: 700, fill: textFill, textAlign: 'center' })];
    },
    contacts(x, y, w, s, fill, o = {}) { return k.en(S.phone + '\n' + S.email + '\n' + S.web, { x, y, w, s, fill, lh: 1.5, ...o }); },
    grad(x, y, w, h, c1, c2, vertical = false) {
      return new fabric.Rect({ left: X(x), top: Y(y), width: X(w), height: Y(h), fill: new fabric.Gradient({ type: 'linear', gradientUnits: 'percentage', coords: vertical ? { x1: 0, y1: 0, x2: 0, y2: 1 } : { x1: 0, y1: 0, x2: 1, y2: 1 }, colorStops: [{ offset: 0, color: c1 }, { offset: 1, color: c2 }] }) });
    },
    dots(x, y, w, h, r, gap, fill, opacity = 1) {   // dot-grid texture as one group
      const items = []; for (let yy = 0; yy < Y(h); yy += gap * u) for (let xx = 0; xx < X(w); xx += gap * u) items.push(new fabric.Circle({ left: xx, top: yy, radius: r * u, fill }));
      return new fabric.Group(items, { left: X(x), top: Y(y), opacity });
    },
    star8(cx, cy, r, fill, o = {}) {   // islamic 8-point star = two rotated squares
      const a = new fabric.Rect({ left: 0, top: 0, width: 2 * r * u, height: 2 * r * u, fill, originX: 'center', originY: 'center' });
      const b = new fabric.Rect({ left: 0, top: 0, width: 2 * r * u, height: 2 * r * u, fill, originX: 'center', originY: 'center', angle: 45 });
      return new fabric.Group([a, b], { left: X(cx) - r * u * 1.414, top: Y(cy) - r * u * 1.414, ...o });
    },
    label(text, o = {}) { return k.en(text.toUpperCase(), { s: 2.6, fill: p.sub, charSpacing: 300, weight: 600, ...o }); },
    corners(x, y, w, h, size, fill) {   // small diamonds on the four corners of a frame
      return [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].map(([cx, cy]) => new fabric.Rect({ left: X(cx), top: Y(cy), width: size * u, height: size * u, fill, angle: 45, originX: 'center', originY: 'center' }));
    },
    button(x, y, w, h, label, fill, textFill, s) {
      return [k.rect(x, y, w, h, fill, { rx: 3 * u, ry: 3 * u }), k.txt(label, { x, y: y + h / 2 - s * u / H * 100 * 0.7, w, s, weight: 700, fill: textFill, align: 'center' })];
    },
  };
  return k;
}

// Each layout: fn(k) => { bg, objects }. Use k.mx/k.my for safe margins.
const FAMILIES = {
  // ============ BUSINESS CARDS (landscape 90×55) ============
  card: [
    { name: 'نظيف', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.txt(S.name, { x: 30, y: my + 8, w: 70 - mx, s: 11, weight: 700 }),
      k.txt(S.title, { x: 30, y: my + 24, w: 70 - mx, s: 5.5, fill: p.sub }),
      k.hline(100 - mx - 22, my + 36, 22, 1, p.accent),
      k.contacts(mx, 56, 45, 4.6, p.sub),
      k.txt(S.company, { x: 50, y: 74, w: 50 - mx, s: 5.5, weight: 700, fill: p.accent }),
    ] }; } },
    { name: 'شريط جانبي', fn: k => { const { p, my } = k; return { bg: p.bg, objects: [
      k.rect(0, 0, 36, 100, p.dark),
      k.txt(S.company, { x: 3, y: 36, w: 30, s: 7, weight: 700, fill: '#fff', align: 'center' }),
      k.hline(13, 54, 10, 1.2, p.accent),
      k.txt(S.slogan, { x: 3, y: 60, w: 30, s: 4, fill: '#d9dde6', align: 'center' }),
      k.txt(S.name, { x: 40, y: my + 10, w: 54, s: 9.5, weight: 700 }),
      k.txt(S.title, { x: 40, y: my + 24, w: 54, s: 5.2, fill: p.accent }),
      k.contacts(40, 56, 50, 4.4, p.sub),
    ] }; } },
    { name: 'شريط سفلي', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.rect(0, 70, 100, 30, p.accent),
      ...k.logo(mx + 8, my + 16, 9, p.dark, 'H'),
      k.txt(S.name, { x: 30, y: my + 8, w: 70 - mx, s: 9.5, weight: 700 }),
      k.txt(S.title, { x: 30, y: my + 22, w: 70 - mx, s: 5.2, fill: p.sub }),
      k.txt(S.company, { x: 30, y: my + 34, w: 70 - mx, s: 4.6, fill: p.accent, weight: 700 }),
      k.en(S.phone + '   ·   ' + S.email + '   ·   ' + S.web, { x: mx, y: 81, w: 100 - 2 * mx, s: 4.2, fill: '#fff', align: 'center' }),
    ] }; } },
    { name: 'متوسط', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.txt(S.company, { x: mx, y: my + 4, w: 100 - 2 * mx, s: 5.5, weight: 700, fill: p.accent, align: 'center' }),
      k.txt(S.name, { x: mx, y: my + 20, w: 100 - 2 * mx, s: 11, weight: 700, align: 'center' }),
      k.txt(S.title, { x: mx, y: my + 38, w: 100 - 2 * mx, s: 5.2, fill: p.sub, align: 'center' }),
      k.hline(42, 60, 16, 0.8, p.accent),
      k.en(S.phone + '  ·  ' + S.email + '  ·  ' + S.web, { x: mx, y: 68, w: 100 - 2 * mx, s: 4.2, fill: p.sub, align: 'center' }),
      k.txt(S.address, { x: mx, y: 79, w: 100 - 2 * mx, s: 4.2, fill: p.sub, align: 'center' }),
    ] }; } },
    { name: 'زاوية', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.poly([[55, 0], [100, 0], [100, 60]], p.accent), k.poly([[72, 0], [100, 0], [100, 38]], p.dark),
      k.txt(S.company, { x: mx, y: my + 4, w: 50, s: 5.5, weight: 700, fill: p.accent, align: 'left' }),
      k.txt(S.name, { x: mx, y: my + 34, w: 62, s: 10, weight: 700, align: 'left' }),
      k.txt(S.title, { x: mx, y: my + 49, w: 62, s: 5.2, fill: p.sub, align: 'left' }),
      k.en(S.phone + ' · ' + S.email + ' · ' + S.web, { x: mx, y: 82, w: 85, s: 4.2, fill: p.sub }),
    ] }; } },
    { name: 'داكن فاخر', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
      k.frame(mx - 2, my - 3, 100 - 2 * mx + 4, 100 - 2 * my + 6, p.accent, 0.6),
      k.txt(S.name, { x: mx + 3, y: my + 10, w: 100 - 2 * mx - 6, s: 10, weight: 700, fill: '#fff' }),
      k.txt(S.title, { x: mx + 3, y: my + 25, w: 100 - 2 * mx - 6, s: 5.2, fill: p.accent }),
      k.contacts(mx + 3, 56, 45, 4.4, '#d6d6d6'),
      k.txt(S.company, { x: 50, y: 70, w: 50 - mx - 3, s: 5.5, weight: 700, fill: p.accent }),
    ] }; } },
    { name: 'قطري', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.poly([[48, 0], [100, 0], [100, 100], [38, 100]], p.dark), k.poly([[44, 0], [50, 0], [40, 100], [34, 100]], p.accent),
      k.txt(S.name, { x: 54, y: my + 12, w: 46 - mx, s: 9, weight: 700, fill: '#fff' }),
      k.txt(S.title, { x: 54, y: my + 27, w: 46 - mx, s: 5, fill: p.accent }),
      k.txt(S.company, { x: 54, y: 72, w: 46 - mx, s: 5, fill: '#d9dde6', weight: 700 }),
      k.contacts(mx, 34, 30, 4.2, p.sub),
    ] }; } },
    { name: 'دائرة', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.circle(8, 95, 52, p.light), k.circle(8, 95, 38, p.accent),
      k.en('H', { x: 2, y: 62, w: 22, s: 22, weight: 700, fill: '#fff', align: 'center' }),
      k.txt(S.name, { x: 34, y: my + 8, w: 66 - mx, s: 10, weight: 700 }),
      k.txt(S.title, { x: 34, y: my + 23, w: 66 - mx, s: 5.2, fill: p.sub }),
      k.txt(S.company, { x: 34, y: my + 36, w: 66 - mx, s: 4.6, weight: 700, fill: p.accent }),
      k.contacts(40, 60, 40, 4.4, p.sub, { align: 'right' }),
    ] }; } },
    { name: 'عصري ثنائي اللغة', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.rect(0, 0, 100, 9, p.accent),
      k.en(S.companyEn, { x: mx, y: my + 10, w: 50, s: 4.6, weight: 700, fill: p.accent, charSpacing: 250 }),
      k.txt(S.company, { x: 50, y: my + 10, w: 50 - mx, s: 4.6, weight: 700, fill: p.accent }),
      k.txt(S.name, { x: mx, y: 36, w: 100 - 2 * mx, s: 10.5, weight: 700 }),
      k.txt(S.title, { x: mx, y: 51, w: 100 - 2 * mx, s: 5, fill: p.sub }),
      k.hline(mx, 66, 100 - 2 * mx, 0.4, p.light),
      k.contacts(mx, 70, 45, 4.2, p.sub),
      k.txt(S.address, { x: 50, y: 70, w: 50 - mx, s: 4.2, fill: p.sub }),
    ] }; } },
    { name: 'كلاسيكي أنيق', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.frame(mx - 3, my - 4, 100 - 2 * mx + 6, 100 - 2 * my + 8, p.dark, 0.35),
      k.frame(mx - 1.5, my - 1.5, 100 - 2 * mx + 3, 100 - 2 * my + 3, p.accent, 0.35),
      k.txt(S.name, { x: mx, y: my + 14, w: 100 - 2 * mx, s: 10, weight: 700, font: 'Amiri', align: 'center' }),
      k.txt(S.title, { x: mx, y: my + 32, w: 100 - 2 * mx, s: 5, fill: p.accent, align: 'center', font: 'Amiri' }),
      k.hline(46, 54, 8, 0.6, p.accent),
      k.txt(S.company, { x: mx, y: 60, w: 100 - 2 * mx, s: 4.6, fill: p.sub, align: 'center' }),
      k.en(S.phone + '  |  ' + S.email, { x: mx, y: 74, w: 100 - 2 * mx, s: 4, fill: p.sub, align: 'center', font: 'Playfair Display' }),
    ] }; } },
  ],

  // ============ ID BADGE (portrait 54×86) ============
  badge: [
    { name: 'رأس ملوّن', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.rect(0, 0, 100, 30, p.dark), k.rect(0, 30, 100, 1.2, p.accent),
      k.txt(S.company, { x: mx, y: 11, w: 100 - 2 * mx, s: 7, weight: 700, fill: '#fff', align: 'center' }),
      k.circle(50, 46, 22, p.light), k.txt('📷', { x: 30, y: 40, w: 40, s: 12, align: 'center' }),
      k.txt(S.name, { x: mx, y: 64, w: 100 - 2 * mx, s: 7.5, weight: 700, align: 'center' }),
      k.txt(S.role, { x: mx, y: 73, w: 100 - 2 * mx, s: 5, fill: p.accent, align: 'center' }),
      k.en(S.idno, { x: mx, y: 84, w: 100 - 2 * mx, s: 4.5, fill: p.sub, align: 'center' }),
    ] }; } },
    { name: 'شريط جانبي', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.rect(0, 0, 14, 100, p.accent),
      k.img(26, 10, 60, 32, { rx: 2 }),
      k.txt(S.name, { x: 20, y: 48, w: 74, s: 7, weight: 700, align: 'center' }),
      k.txt(S.role, { x: 20, y: 57, w: 74, s: 5, fill: p.sub, align: 'center' }),
      k.txt(S.dept, { x: 20, y: 64, w: 74, s: 4.5, fill: p.accent, align: 'center' }),
      k.hline(30, 76, 54, 0.5, p.light),
      k.txt(S.company, { x: 20, y: 80, w: 74, s: 5, weight: 700, align: 'center' }),
      k.en(S.idno, { x: 20, y: 88, w: 74, s: 4, fill: p.sub, align: 'center' }),
    ] }; } },
    { name: 'داكن', fn: k => { const { p, mx } = k; return { bg: p.dark, objects: [
      k.rect(mx, 52, 100 - 2 * mx, 40, '#fff', { rx: 2 * k.u, ry: 2 * k.u }),
      k.txt(S.company, { x: mx, y: 6, w: 100 - 2 * mx, s: 6.5, weight: 700, fill: p.accent, align: 'center' }),
      k.circle(50, 32, 20, p.light), k.txt('📷', { x: 30, y: 27, w: 40, s: 11, align: 'center' }),
      k.txt(S.name, { x: mx, y: 57, w: 100 - 2 * mx, s: 7, weight: 700, align: 'center' }),
      k.txt(S.role, { x: mx, y: 67, w: 100 - 2 * mx, s: 5, fill: p.sub, align: 'center' }),
      k.en(S.idno, { x: mx, y: 80, w: 100 - 2 * mx, s: 4.5, fill: p.accent, align: 'center', weight: 700 }),
    ] }; } },
    { name: 'بسيط', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.hline(mx, 10, 100 - 2 * mx, 0.8, p.accent),
      k.txt(S.company, { x: mx, y: 13, w: 100 - 2 * mx, s: 6, weight: 700, align: 'center' }),
      k.img(mx + 8, 24, 100 - 2 * mx - 16, 34, { rx: 1 }),
      k.txt(S.name, { x: mx, y: 63, w: 100 - 2 * mx, s: 7, weight: 700, align: 'center' }),
      k.txt(S.role, { x: mx, y: 72, w: 100 - 2 * mx, s: 5, fill: p.accent, align: 'center' }),
      k.en(S.idno, { x: mx, y: 82, w: 100 - 2 * mx, s: 4.5, fill: p.sub, align: 'center' }),
      k.hline(mx, 90, 100 - 2 * mx, 0.8, p.accent),
    ] }; } },
  ],

  // ============ FLYERS / POSTERS (portrait) ============
  poster: [
    { name: 'صورة علوية', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.img(0, 0, 100, 48), k.rect(0, 48, 100, 1, p.accent),
      k.txt(S.headline, { x: mx, y: 53, w: 100 - 2 * mx, s: 11, weight: 700 }),
      k.txt(S.sub, { x: mx, y: 63, w: 100 - 2 * mx, s: 5.5, fill: p.accent, weight: 700 }),
      k.txt(S.body, { x: mx, y: 70, w: 100 - 2 * mx, s: 4.2, fill: p.sub, lh: 1.5 }),
      ...k.button(100 - mx - 36, 82, 36, 7, S.cta, p.dark, '#fff', 5),
      k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 93, w: 100 - 2 * mx, s: 3.6, fill: p.sub }),
    ] }; } },
    { name: 'عنوان ضخم', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.txt(S.company, { x: mx, y: 5, w: 100 - 2 * mx, s: 4.5, weight: 700, fill: p.accent }),
      k.txt(S.headline, { x: mx, y: 12, w: 100 - 2 * mx, s: 15, weight: 900, lh: 1.1 }),
      k.txt(S.sub, { x: mx, y: 36, w: 100 - 2 * mx, s: 6, fill: p.sub }),
      k.img(mx, 46, 100 - 2 * mx, 36, { rx: 2 }),
      ...k.button(mx, 85, 40, 7, S.cta, p.accent, '#fff', 5),
      k.txt(S.date, { x: 50, y: 87, w: 50 - mx, s: 4.2, fill: p.sub }),
    ] }; } },
    { name: 'داكن', fn: k => { const { p, mx } = k; return { bg: p.dark, objects: [
      k.circle(100, 0, 45, p.accent, { opacity: 0.25 }),
      k.txt(S.company, { x: mx, y: 6, w: 100 - 2 * mx, s: 4.5, weight: 700, fill: p.accent }),
      k.txt(S.headline, { x: mx, y: 14, w: 100 - 2 * mx, s: 14, weight: 900, fill: '#fff', lh: 1.1 }),
      k.txt(S.sub, { x: mx, y: 36, w: 100 - 2 * mx, s: 6, fill: p.accent }),
      ...S.bullets.map((t, i) => k.txt('✓  ' + t, { x: mx, y: 48 + i * 7, w: 100 - 2 * mx, s: 5, fill: '#e5e7eb' })),
      k.img(mx, 70, 100 - 2 * mx, 16, { rx: 2, fill: '#ffffff22', textFill: '#fff' }),
      ...k.button(mx, 89, 40, 7, S.cta, p.accent, '#fff', 5),
      k.en(S.web, { x: 55, y: 91, w: 45 - mx, s: 4, fill: '#cbd5e1', align: 'right' }),
    ] }; } },
    { name: 'شريط قطري', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.poly([[0, 0], [100, 0], [100, 22], [0, 34]], p.dark), k.poly([[0, 34], [100, 22], [100, 25], [0, 37]], p.accent),
      k.txt(S.company, { x: mx, y: 6, w: 100 - 2 * mx, s: 7, weight: 700, fill: '#fff' }),
      k.txt(S.slogan, { x: mx, y: 14, w: 100 - 2 * mx, s: 4.5, fill: p.accent }),
      k.txt(S.headline, { x: mx, y: 42, w: 100 - 2 * mx, s: 12, weight: 700 }),
      k.txt(S.body, { x: mx, y: 54, w: 100 - 2 * mx, s: 4.4, fill: p.sub, lh: 1.5 }),
      k.img(mx, 66, 100 - 2 * mx, 22, { rx: 2 }),
      k.en(S.phone + '  ·  ' + S.email + '  ·  ' + S.web, { x: mx, y: 92, w: 100 - 2 * mx, s: 3.6, fill: p.sub, align: 'center' }),
    ] }; } },
    { name: 'إطار أنيق', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.frame(mx - 2, my - 2, 100 - 2 * mx + 4, 100 - 2 * my + 4, p.accent, 0.5),
      k.frame(mx, my, 100 - 2 * mx, 100 - 2 * my, p.dark, 0.25),
      k.txt(S.company, { x: mx, y: my + 8, w: 100 - 2 * mx, s: 5, weight: 700, fill: p.accent, align: 'center' }),
      k.txt(S.headline, { x: mx + 4, y: 26, w: 100 - 2 * mx - 8, s: 12, weight: 700, font: 'Amiri', align: 'center' }),
      k.hline(42, 42, 16, 0.5, p.accent),
      k.txt(S.body, { x: mx + 6, y: 47, w: 100 - 2 * mx - 12, s: 4.6, fill: p.sub, align: 'center', lh: 1.6 }),
      k.txt(S.date, { x: mx, y: 66, w: 100 - 2 * mx, s: 5.5, weight: 700, align: 'center' }),
      k.txt(S.address, { x: mx, y: 73, w: 100 - 2 * mx, s: 4.2, fill: p.sub, align: 'center' }),
      k.en(S.web, { x: mx, y: 86, w: 100 - 2 * mx, s: 4, fill: p.accent, align: 'center' }),
    ] }; } },
    { name: 'عمود جانبي', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.rect(58, 0, 42, 100, p.dark),
      k.txt(S.headline, { x: 62, y: 10, w: 34, s: 9, weight: 700, fill: '#fff', lh: 1.2 }),
      k.hline(80, 36, 16, 0.6, p.accent),
      k.txt(S.sub, { x: 62, y: 40, w: 34, s: 4.6, fill: p.accent }),
      k.txt(S.body, { x: 62, y: 52, w: 34, s: 3.8, fill: '#d1d5db', lh: 1.5 }),
      k.contacts(62, 84, 34, 3.4, '#cbd5e1', { align: 'right' }),
      k.img(mx, 8, 54 - mx, 44, { rx: 1 }),
      ...S.bullets.map((t, i) => k.txt('●  ' + t, { x: mx, y: 58 + i * 8, w: 54 - mx, s: 4.6 })),
      ...k.button(mx, 86, 30, 6.5, S.cta, p.accent, '#fff', 4.5),
    ] }; } },
    { name: 'شارة الخصم', fn: k => { const { p, mx } = k; return { bg: p.light, objects: [
      k.rect(mx, 6, 100 - 2 * mx, 88, '#fff', { rx: 3 * k.u, ry: 3 * k.u }),
      k.circle(76, 24, 20, p.accent), k.ring(76, 24, 23, p.accent, 0.5),
      k.txt(S.pct, { x: 56, y: 15, w: 40, s: 14, weight: 900, fill: '#fff', align: 'center', font: p.fontEn }),
      k.txt('خصم', { x: 56, y: 30, w: 40, s: 5, fill: '#fff', align: 'center' }),
      k.txt(S.headline, { x: mx + 4, y: 44, w: 100 - 2 * mx - 8, s: 11, weight: 700 }),
      k.txt(S.sub, { x: mx + 4, y: 55, w: 100 - 2 * mx - 8, s: 5, fill: p.sub }),
      k.img(mx + 4, 63, 100 - 2 * mx - 8, 20, { rx: 2 }),
      k.txt(S.date, { x: mx + 4, y: 86, w: 50, s: 4.2, fill: p.accent, weight: 700 }),
      k.en(S.web, { x: mx + 4, y: 90.5, w: 40, s: 4, fill: p.sub }),
    ] }; } },
    { name: 'شبكة صور', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.rect(0, 0, 100, 36, p.dark),
      k.txt(S.company, { x: mx, y: 6, w: 100 - 2 * mx, s: 4.5, fill: p.accent, weight: 700 }),
      k.txt(S.headline, { x: mx, y: 13, w: 100 - 2 * mx, s: 11, weight: 700, fill: '#fff' }),
      k.txt(S.sub, { x: mx, y: 25, w: 100 - 2 * mx, s: 5, fill: '#d1d5db' }),
      k.img(mx, 40, (100 - 2 * mx - 4) / 3, 18, { rx: 1 }), k.img(mx + (100 - 2 * mx + 2) / 3, 40, (100 - 2 * mx - 4) / 3, 18, { rx: 1 }), k.img(mx + 2 * (100 - 2 * mx + 2) / 3, 40, (100 - 2 * mx - 4) / 3, 18, { rx: 1 }),
      ...S.bullets.map((t, i) => k.txt('✓  ' + t, { x: mx, y: 62 + i * 7, w: 100 - 2 * mx, s: 4.8 })),
      ...k.button(100 - mx - 36, 85, 36, 7, S.cta, p.accent, '#fff', 5),
      k.en(S.phone, { x: mx, y: 87, w: 40, s: 4.2, fill: p.sub }),
    ] }; } },
  ],

  // ============ LETTERHEAD (A4) ============
  letterhead: [
    { name: 'رسمي', fn: k => { const { p, mx } = k; return { bg: '#fff', objects: [
      ...k.logo(100 - mx - 5, 7, 5, p.dark, 'H'),
      k.txt(S.company, { x: 30, y: 4, w: 100 - mx - 12 - 30, s: 4.2, weight: 700 }),
      k.en(S.companyEn, { x: 30, y: 8, w: 100 - mx - 12 - 30, s: 2.4, fill: p.sub, align: 'right', charSpacing: 200 }),
      k.hline(mx, 13, 100 - 2 * mx, 0.3, p.accent),
      k.en('Ref: HT-2026-114', { x: mx, y: 17, w: 40, s: 2.6, fill: p.sub }),
      k.txt('التاريخ: 9 أكتوبر 2026', { x: 50, y: 17, w: 50 - mx, s: 2.6, fill: p.sub }),
      k.txt(S.letterSubject, { x: mx, y: 23, w: 100 - 2 * mx, s: 3.2, weight: 700 }),
      k.txt(S.letterBody, { x: mx, y: 28, w: 100 - 2 * mx, s: 2.9, lh: 1.7 }),
      k.txt(S.signer, { x: mx, y: 60, w: 30, s: 3, weight: 700 }),
      k.rect(0, 94, 100, 6, p.dark),
      k.en(S.phone + '   ·   ' + S.email + '   ·   ' + S.web, { x: mx, y: 95.8, w: 100 - 2 * mx, s: 2.4, fill: '#fff', align: 'center' }),
    ] }; } },
    { name: 'متوسط', fn: k => { const { p, mx } = k; return { bg: '#fff', objects: [
      k.rect(0, 0, 100, 2, p.accent),
      k.txt(S.company, { x: mx, y: 5, w: 100 - 2 * mx, s: 4.5, weight: 700, align: 'center' }),
      k.txt(S.address, { x: mx, y: 10, w: 100 - 2 * mx, s: 2.4, fill: p.sub, align: 'center' }),
      k.hline(35, 14, 30, 0.2, p.accent),
      k.txt(S.letterSubject, { x: mx, y: 22, w: 100 - 2 * mx, s: 3.2, weight: 700 }),
      k.txt(S.letterBody, { x: mx, y: 27, w: 100 - 2 * mx, s: 2.9, lh: 1.7 }),
      k.hline(mx, 92, 100 - 2 * mx, 0.2, p.light),
      k.en(S.phone + '   ·   ' + S.email + '   ·   ' + S.web, { x: mx, y: 94, w: 100 - 2 * mx, s: 2.4, fill: p.sub, align: 'center' }),
    ] }; } },
    { name: 'شريط جانبي', fn: k => { const { p, mx } = k; return { bg: '#fff', objects: [
      k.rect(0, 0, 7, 100, p.dark), k.rect(7, 0, 0.8, 100, p.accent),
      k.txt(S.company, { x: 14, y: 5, w: 100 - mx - 14, s: 4.5, weight: 700 }),
      k.txt(S.slogan, { x: 14, y: 10, w: 100 - mx - 14, s: 2.6, fill: p.accent }),
      k.txt(S.letterSubject, { x: 14, y: 22, w: 100 - mx - 14, s: 3.2, weight: 700 }),
      k.txt(S.letterBody, { x: 14, y: 27, w: 100 - mx - 14, s: 2.9, lh: 1.7 }),
      k.contacts(14, 90, 40, 2.4, p.sub),
      k.txt(S.address, { x: 55, y: 90, w: 45 - mx, s: 2.4, fill: p.sub }),
    ] }; } },
    { name: 'عصري', fn: k => { const { p, mx } = k; return { bg: '#fff', objects: [
      k.poly([[0, 0], [100, 0], [100, 10], [0, 16]], p.light), k.poly([[60, 0], [100, 0], [100, 9]], p.accent),
      k.txt(S.company, { x: mx, y: 4, w: 55, s: 4.5, weight: 700, align: 'left' }),
      k.en(S.web, { x: mx, y: 9, w: 55, s: 2.6, fill: p.sub }),
      k.txt(S.letterSubject, { x: mx, y: 23, w: 100 - 2 * mx, s: 3.2, weight: 700 }),
      k.txt(S.letterBody, { x: mx, y: 28, w: 100 - 2 * mx, s: 2.9, lh: 1.7 }),
      k.poly([[0, 96], [100, 92], [100, 100], [0, 100]], p.dark),
      k.en(S.phone + '   ·   ' + S.email, { x: mx, y: 96.5, w: 100 - 2 * mx, s: 2.3, fill: '#fff', align: 'center' }),
    ] }; } },
  ],

  // ============ MENU (A4) ============
  menu: [
    { name: 'كلاسيكي', fn: k => { const { p, mx } = k; const o = [
      k.frame(mx - 2, 3, 100 - 2 * mx + 4, 94, p.accent, 0.3),
      k.txt(S.company, { x: mx, y: 7, w: 100 - 2 * mx, s: 4, fill: p.accent, weight: 700, align: 'center' }),
      k.txt(S.menuTitle, { x: mx, y: 11, w: 100 - 2 * mx, s: 8, weight: 700, font: 'Amiri', align: 'center' }),
      k.hline(40, 20, 20, 0.3, p.accent)];
      S.menu.forEach(([n, pr], i) => { const y = 25 + i * 8; o.push(k.txt(n, { x: 30, y, w: 70 - mx, s: 4, weight: 700 }), k.txt('وصف قصير للصنف ومكوناته', { x: 30, y: y + 4, w: 70 - mx, s: 2.6, fill: p.sub }), k.en(pr, { x: mx, y: y + 0.5, w: 20, s: 4, weight: 700, fill: p.accent })); });
      o.push(k.txt('الأسعار بالريال السعودي  ·  ' + S.address + '  ·  ' + S.phone, { x: mx, y: 92, w: 100 - 2 * mx, s: 2.6, fill: p.sub, align: 'center' }));
      return { bg: p.bg, objects: o }; } },
    { name: 'داكن', fn: k => { const { p, mx } = k; const o = [
      k.txt(S.menuTitle, { x: mx, y: 6, w: 100 - 2 * mx, s: 9, weight: 900, fill: '#fff', align: 'center' }),
      k.txt(S.company, { x: mx, y: 15, w: 100 - 2 * mx, s: 3.4, fill: p.accent, align: 'center' }),
      k.img(mx, 20, 100 - 2 * mx, 18, { rx: 2, fill: '#ffffff18', textFill: '#fff' })];
      S.menu.forEach(([n, pr], i) => { const y = 42 + i * 6.2; o.push(k.txt(n, { x: 30, y, w: 70 - mx, s: 3.8, fill: '#fff', weight: 700 }), k.en(pr, { x: mx, y, w: 15, s: 3.8, fill: p.accent, weight: 700 }), k.hline(mx, y + 5.2, 100 - 2 * mx, 0.12, '#ffffff33')); });
      o.push(k.en(S.web + '  ·  ' + S.phone, { x: mx, y: 94, w: 100 - 2 * mx, s: 2.6, fill: '#9ca3af', align: 'center' }));
      return { bg: p.dark, objects: o }; } },
    { name: 'عمودان', fn: k => { const { p, mx } = k; const o = [
      k.rect(0, 0, 100, 18, p.accent),
      k.txt(S.menuTitle, { x: mx, y: 4, w: 100 - 2 * mx, s: 8, weight: 700, fill: '#fff', align: 'center' }),
      k.txt(S.company, { x: mx, y: 12, w: 100 - 2 * mx, s: 3, fill: '#fff', align: 'center' })];
      S.menu.forEach(([n, pr], i) => { const col = i % 2, row = Math.floor(i / 2); const x = col ? mx : 52, w = 48 - mx; const y = 24 + row * 15;
        o.push(k.txt(n, { x, y, w, s: 3.6, weight: 700 }), k.txt('وصف قصير للصنف', { x, y: y + 4, w, s: 2.4, fill: p.sub }), k.en(pr + ' SAR', { x, y: y + 7.5, w, s: 3.2, fill: p.accent, weight: 700, align: 'right' }), k.hline(x, y + 12, w, 0.15, p.light)); });
      o.push(k.img(mx, 84, 100 - 2 * mx, 12, { rx: 2 }));
      return { bg: p.bg, objects: o }; } },
    { name: 'صورة رأسية', fn: k => { const { p, mx } = k; const o = [
      k.img(0, 0, 100, 30), k.rect(0, 30, 100, 1, p.accent),
      k.txt(S.menuTitle, { x: mx, y: 33, w: 100 - 2 * mx, s: 7.5, weight: 700 })];
      S.menu.forEach(([n, pr], i) => { const y = 43 + i * 6.3; o.push(k.txt(n, { x: 30, y, w: 70 - mx, s: 3.8 }), k.en(pr, { x: mx, y, w: 15, s: 3.8, fill: p.accent, weight: 700 }), k.hline(mx, y + 5.3, 100 - 2 * mx, 0.12, p.light)); });
      o.push(k.rect(0, 94, 100, 6, p.dark), k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 95.8, w: 100 - 2 * mx, s: 2.4, fill: '#fff', align: 'center' }));
      return { bg: p.bg, objects: o }; } },
  ],

  // ============ TRI-FOLD BROCHURE (297×210, 3 panels; cover = right panel) ============
  brochure: [
    { name: 'غلاف مصوّر', fn: k => { const { p, my } = k; return { bg: p.bg, objects: [
      k.img(66.7, 0, 33.3, 58), k.rect(66.7, 58, 33.3, 42, p.dark),
      k.txt(S.company, { x: 69, y: 62, w: 28, s: 7, weight: 700, fill: '#fff' }),
      k.txt(S.slogan, { x: 69, y: 74, w: 28, s: 4, fill: p.accent }),
      k.en(S.web, { x: 69, y: 90, w: 28, s: 3.4, fill: '#cbd5e1' }),
      k.txt('من نحن', { x: 36, y: my + 6, w: 28, s: 6, weight: 700, fill: p.accent }),
      k.txt(S.body, { x: 36, y: my + 16, w: 28, s: 3.4, fill: p.sub, lh: 1.6 }),
      k.img(36, 60, 28, 26, { rx: 1 }),
      k.txt('تواصل معنا', { x: 3, y: my + 6, w: 28, s: 6, weight: 700, fill: p.accent }),
      k.txt(S.address, { x: 3, y: my + 18, w: 28, s: 3.4, fill: p.sub }),
      k.contacts(3, my + 30, 28, 3.4, p.sub, { align: 'right' }),
      ...k.logo(17, 70, 9, p.dark, 'H'),
    ] }; } },
    { name: 'كتل ملوّنة', fn: k => { const { p, my } = k; return { bg: p.bg, objects: [
      k.rect(66.7, 0, 33.3, 100, p.accent), k.circle(83, 40, 22, '#ffffff'),
      k.en('H', { x: 70, y: 29, w: 26, s: 24, weight: 700, fill: p.accent, align: 'center' }),
      k.txt(S.company, { x: 69, y: 66, w: 28, s: 7, weight: 700, fill: '#fff', align: 'center' }),
      k.txt(S.slogan, { x: 69, y: 78, w: 28, s: 4, fill: '#fff', align: 'center' }),
      k.rect(33.3, 0, 33.3, 100, p.light),
      k.txt('خدماتنا', { x: 36, y: my + 6, w: 28, s: 6, weight: 700 }),
      ...S.bullets.map((t, i) => k.txt('✓  ' + t, { x: 36, y: my + 20 + i * 10, w: 28, s: 3.8 })),
      k.img(36, 62, 28, 28, { rx: 1, fill: '#fff' }),
      k.txt(S.company, { x: 3, y: my + 6, w: 28, s: 5, weight: 700 }),
      k.txt(S.body, { x: 3, y: my + 16, w: 28, s: 3.4, fill: p.sub, lh: 1.6 }),
      k.contacts(3, 70, 28, 3.4, p.sub, { align: 'right' }),
    ] }; } },
    { name: 'داكن', fn: k => { const { p, my } = k; return { bg: p.dark, objects: [
      k.poly([[66.7, 0], [100, 0], [100, 100], [80, 100]], p.accent, { opacity: 0.9 }),
      k.txt(S.company, { x: 69, y: 30, w: 28, s: 8, weight: 900, fill: '#fff' }),
      k.txt(S.slogan, { x: 69, y: 46, w: 28, s: 4.4, fill: '#fff' }),
      k.en(S.web, { x: 69, y: 88, w: 28, s: 3.4, fill: '#fff' }),
      k.txt('لماذا نحن؟', { x: 36, y: my + 6, w: 28, s: 6, weight: 700, fill: p.accent }),
      ...S.bullets.map((t, i) => k.txt('✓  ' + t, { x: 36, y: my + 20 + i * 10, w: 28, s: 3.8, fill: '#e5e7eb' })),
      k.img(36, 60, 28, 28, { rx: 1, fill: '#ffffff18', textFill: '#fff' }),
      k.txt('تواصل معنا', { x: 3, y: my + 6, w: 28, s: 6, weight: 700, fill: p.accent }),
      k.contacts(3, my + 20, 28, 3.6, '#e5e7eb', { align: 'right' }),
      k.txt(S.address, { x: 3, y: my + 42, w: 28, s: 3.4, fill: '#cbd5e1' }),
    ] }; } },
    { name: 'بسيط', fn: k => { const { p, my } = k; return { bg: p.bg, objects: [
      k.hline(69, 10, 28, 0.6, p.accent),
      k.txt(S.company, { x: 69, y: 14, w: 28, s: 7, weight: 700, align: 'center' }),
      k.txt(S.slogan, { x: 69, y: 26, w: 28, s: 4, fill: p.sub, align: 'center' }),
      k.img(69, 36, 28, 44, { rx: 1 }),
      k.en(S.web, { x: 69, y: 88, w: 28, s: 3.4, fill: p.accent, align: 'center' }),
      k.txt('من نحن', { x: 36, y: my + 6, w: 28, s: 5.5, weight: 700 }),
      k.hline(55, my + 15, 9, 0.5, p.accent),
      k.txt(S.body, { x: 36, y: my + 20, w: 28, s: 3.4, fill: p.sub, lh: 1.6 }),
      k.txt('تواصل معنا', { x: 3, y: my + 6, w: 28, s: 5.5, weight: 700 }),
      k.hline(22, my + 15, 9, 0.5, p.accent),
      k.contacts(3, my + 20, 28, 3.4, p.sub, { align: 'right' }),
      k.txt(S.address, { x: 3, y: my + 40, w: 28, s: 3.4, fill: p.sub }),
    ] }; } },
  ],

  // ============ ROLL-UP (85×200) ============
  rollup: [
    { name: 'كلاسيكي', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.rect(0, 0, 100, 14, p.dark),
      k.txt(S.company, { x: mx, y: 4, w: 100 - 2 * mx, s: 9, weight: 700, fill: '#fff', align: 'center' }),
      k.txt(S.headline, { x: mx, y: 18, w: 100 - 2 * mx, s: 13, weight: 900, align: 'center', lh: 1.15 }),
      k.txt(S.sub, { x: mx, y: 30, w: 100 - 2 * mx, s: 6, fill: p.accent, align: 'center' }),
      k.img(mx, 36, 100 - 2 * mx, 30, { rx: 1 }),
      ...S.bullets.map((t, i) => k.txt('✓  ' + t, { x: mx, y: 69 + i * 5, w: 100 - 2 * mx, s: 5.5 })),
      k.rect(0, 88, 100, 12, p.accent),
      k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 92.5, w: 100 - 2 * mx, s: 4.6, fill: '#fff', align: 'center' }),
    ] }; } },
    { name: 'داكن', fn: k => { const { p, mx } = k; return { bg: p.dark, objects: [
      k.circle(100, 10, 60, p.accent, { opacity: 0.2 }), k.circle(0, 95, 50, p.accent, { opacity: 0.2 }),
      k.txt(S.company, { x: mx, y: 5, w: 100 - 2 * mx, s: 7, weight: 700, fill: p.accent }),
      k.txt(S.headline, { x: mx, y: 12, w: 100 - 2 * mx, s: 15, weight: 900, fill: '#fff', lh: 1.1 }),
      k.txt(S.sub, { x: mx, y: 27, w: 100 - 2 * mx, s: 6, fill: '#d1d5db' }),
      k.img(mx, 34, 100 - 2 * mx, 32, { rx: 1, fill: '#ffffff18', textFill: '#fff' }),
      ...S.bullets.map((t, i) => k.txt('✓  ' + t, { x: mx, y: 70 + i * 5, w: 100 - 2 * mx, s: 5.5, fill: '#e5e7eb' })),
      k.en(S.phone + '\n' + S.web, { x: mx, y: 90, w: 100 - 2 * mx, s: 4.8, fill: p.accent, align: 'center', lh: 1.5 }),
    ] }; } },
    { name: 'قطري', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.poly([[0, 0], [100, 0], [100, 30], [0, 42]], p.dark), k.poly([[0, 42], [100, 30], [100, 32], [0, 44]], p.accent),
      k.txt(S.company, { x: mx, y: 5, w: 100 - 2 * mx, s: 7, fill: p.accent, weight: 700 }),
      k.txt(S.headline, { x: mx, y: 12, w: 100 - 2 * mx, s: 13, weight: 900, fill: '#fff', lh: 1.15 }),
      k.txt(S.body, { x: mx, y: 48, w: 100 - 2 * mx, s: 5, fill: p.sub, lh: 1.5 }),
      k.img(mx, 58, 100 - 2 * mx, 26, { rx: 1 }),
      k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 92, w: 100 - 2 * mx, s: 4.6, fill: p.dark, align: 'center', weight: 700 }),
    ] }; } },
    { name: 'صورة كاملة', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.img(0, 0, 100, 60),
      k.poly([[0, 52], [100, 60], [100, 100], [0, 100]], p.dark),
      k.txt(S.headline, { x: mx, y: 66, w: 100 - 2 * mx, s: 13, weight: 900, fill: '#fff', align: 'center', lh: 1.15 }),
      k.txt(S.sub, { x: mx, y: 79, w: 100 - 2 * mx, s: 6, fill: p.accent, align: 'center' }),
      k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 92, w: 100 - 2 * mx, s: 4.6, fill: '#d1d5db', align: 'center' }),
    ] }; } },
    { name: 'بسيط', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      ...k.logo(50, 8, 10, p.accent, 'H'),
      k.txt(S.company, { x: mx, y: 14, w: 100 - 2 * mx, s: 8, weight: 700, align: 'center' }),
      k.txt(S.headline, { x: mx, y: 24, w: 100 - 2 * mx, s: 12, weight: 700, align: 'center', lh: 1.2 }),
      k.hline(40, 36, 20, 0.6, p.accent),
      k.txt(S.body, { x: mx + 4, y: 39, w: 100 - 2 * mx - 8, s: 5, fill: p.sub, align: 'center', lh: 1.6 }),
      k.img(mx, 50, 100 - 2 * mx, 34, { rx: 1 }),
      k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 92, w: 100 - 2 * mx, s: 4.6, fill: p.accent, align: 'center', weight: 700 }),
    ] }; } },
  ],

  // ============ STICKERS (square canvas; round guide optional) ============
  sticker: [
    { name: 'شعار دائري', fn: k => { const { p } = k; return { bg: p.dark, objects: [
      k.ring(50, 50, 40, p.accent, 1.2), k.ring(50, 50, 35, p.accent, 0.4),
      k.txt(S.company, { x: 15, y: 36, w: 70, s: 9, weight: 700, fill: '#fff', align: 'center' }),
      k.txt(S.slogan, { x: 15, y: 52, w: 70, s: 5, fill: p.accent, align: 'center' }),
      k.en(S.web, { x: 15, y: 64, w: 70, s: 4, fill: '#cbd5e1', align: 'center' }),
    ] }; } },
    { name: 'جديد', fn: k => { const { p } = k; return { bg: p.accent, objects: [
      k.circle(50, 50, 36, '#fff'),
      k.txt('جديد', { x: 15, y: 30, w: 70, s: 16, weight: 900, fill: p.accent, align: 'center' }),
      k.txt(S.company, { x: 15, y: 54, w: 70, s: 6, weight: 700, fill: p.dark, align: 'center' }),
    ] }; } },
    { name: 'ملصق منتج', fn: k => { const { p } = k; return { bg: p.bg, objects: [
      k.ring(50, 50, 42, p.dark, 0.6),
      k.txt(S.company, { x: 15, y: 22, w: 70, s: 5.5, fill: p.accent, weight: 700, align: 'center' }),
      k.txt('اسم المنتج', { x: 12, y: 38, w: 76, s: 11, weight: 700, align: 'center' }),
      k.hline(38, 54, 24, 0.8, p.accent),
      k.txt('صُنع بعناية', { x: 15, y: 58, w: 70, s: 5, fill: p.sub, align: 'center' }),
      k.en('250 g  ·  ' + S.web, { x: 15, y: 70, w: 70, s: 3.6, fill: p.sub, align: 'center' }),
    ] }; } },
    { name: 'شكراً', fn: k => { const { p } = k; return { bg: p.light, objects: [
      k.circle(50, 50, 44, p.bg), k.ring(50, 50, 44, p.accent, 0.8),
      k.txt('شكراً لطلبك', { x: 12, y: 34, w: 76, s: 11, weight: 700, align: 'center' }),
      k.txt('❤', { x: 15, y: 50, w: 70, s: 10, fill: p.accent, align: 'center' }),
      k.txt(S.company, { x: 15, y: 66, w: 70, s: 5, fill: p.sub, align: 'center' }),
    ] }; } },
    { name: 'حرف', fn: k => { const { p } = k; return { bg: p.bg, objects: [
      k.circle(50, 44, 26, p.accent),
      k.en('H', { x: 24, y: 28, w: 52, s: 30, weight: 700, fill: '#fff', align: 'center' }),
      k.txt(S.company, { x: 10, y: 74, w: 80, s: 7, weight: 700, align: 'center' }),
    ] }; } },
  ],

  // ============ INVITATION (105×148 portrait) ============
  invitation: [
    { name: 'كلاسيكي', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.frame(mx - 2, my - 2, 100 - 2 * mx + 4, 100 - 2 * my + 4, p.accent, 0.5), k.frame(mx + 1, my + 1, 100 - 2 * mx - 2, 100 - 2 * my - 2, p.accent, 0.2),
      k.txt(S.inviteTitle, { x: mx, y: my + 12, w: 100 - 2 * mx, s: 6, fill: p.accent, align: 'center', font: 'Amiri' }),
      k.txt(S.couple, { x: mx, y: my + 22, w: 100 - 2 * mx, s: 13, weight: 700, font: 'Amiri', align: 'center' }),
      k.hline(42, 44, 16, 0.4, p.accent),
      k.txt(S.inviteLine, { x: mx + 4, y: 48, w: 100 - 2 * mx - 8, s: 4.4, fill: p.sub, align: 'center', lh: 1.6 }),
      k.txt(S.eventDate, { x: mx, y: 64, w: 100 - 2 * mx, s: 5.5, weight: 700, align: 'center' }),
      k.txt(S.eventTime, { x: mx, y: 71, w: 100 - 2 * mx, s: 4.4, fill: p.sub, align: 'center' }),
      k.txt(S.eventPlace, { x: mx, y: 78, w: 100 - 2 * mx, s: 4.4, fill: p.sub, align: 'center' }),
    ] }; } },
    { name: 'ذهبي داكن', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
      k.ring(50, 30, 22, p.accent, 0.5), k.ring(50, 30, 19, p.accent, 0.2),
      k.txt('S & A', { x: mx, y: 24, w: 100 - 2 * mx, s: 9, font: 'Playfair Display', fill: p.accent, align: 'center' }),
      k.txt(S.inviteTitle, { x: mx, y: 50, w: 100 - 2 * mx, s: 5, fill: p.accent, align: 'center' }),
      k.txt(S.couple, { x: mx, y: 56, w: 100 - 2 * mx, s: 11, weight: 700, fill: '#fff', align: 'center', font: 'Amiri' }),
      k.txt(S.eventDate + '\n' + S.eventTime + '\n' + S.eventPlace, { x: mx, y: 70, w: 100 - 2 * mx, s: 4.2, fill: '#d1d5db', align: 'center', lh: 1.7 }),
    ] }; } },
    { name: 'شريط علوي', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.rect(0, 0, 100, 34, p.accent), k.circle(50, 34, 12, p.bg), k.circle(50, 34, 10, p.accent),
      k.en('S&A', { x: 30, y: 31, w: 40, s: 5.5, weight: 700, fill: '#fff', align: 'center' }),
      k.txt(S.inviteTitle, { x: mx, y: 10, w: 100 - 2 * mx, s: 6, fill: '#fff', align: 'center' }),
      k.txt(S.couple, { x: mx, y: 17, w: 100 - 2 * mx, s: 10, weight: 700, fill: '#fff', align: 'center' }),
      k.txt(S.inviteLine, { x: mx + 3, y: 50, w: 100 - 2 * mx - 6, s: 4.4, fill: p.sub, align: 'center', lh: 1.6 }),
      k.txt(S.eventDate, { x: mx, y: 66, w: 100 - 2 * mx, s: 6, weight: 700, align: 'center' }),
      k.txt(S.eventTime + '  ·  ' + S.eventPlace, { x: mx, y: 74, w: 100 - 2 * mx, s: 4.2, fill: p.sub, align: 'center' }),
    ] }; } },
    { name: 'بسيط', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.hline(mx, my + 4, 100 - 2 * mx, 0.3, p.dark),
      k.txt(S.couple, { x: mx, y: 30, w: 100 - 2 * mx, s: 12, weight: 700, align: 'center', font: 'Amiri' }),
      k.txt(S.inviteTitle, { x: mx, y: 46, w: 100 - 2 * mx, s: 5, fill: p.accent, align: 'center' }),
      k.txt(S.eventDate, { x: mx, y: 60, w: 100 - 2 * mx, s: 5.5, align: 'center' }),
      k.txt(S.eventTime + '\n' + S.eventPlace, { x: mx, y: 68, w: 100 - 2 * mx, s: 4.2, fill: p.sub, align: 'center', lh: 1.6 }),
      k.hline(mx, 100 - my - 4, 100 - 2 * mx, 0.3, p.dark),
    ] }; } },
    { name: 'زهري', fn: k => { const { p, mx } = k; return { bg: p.light, objects: [
      k.circle(0, 0, 28, p.accent, { opacity: 0.35 }), k.circle(100, 100, 32, p.accent, { opacity: 0.35 }), k.circle(100, 0, 14, p.dark, { opacity: 0.2 }),
      k.rect(mx + 2, 18, 100 - 2 * mx - 4, 64, '#fff', { rx: 2 * k.u, ry: 2 * k.u }),
      k.txt(S.inviteTitle, { x: mx, y: 24, w: 100 - 2 * mx, s: 5, fill: p.accent, align: 'center' }),
      k.txt(S.couple, { x: mx, y: 31, w: 100 - 2 * mx, s: 11, weight: 700, align: 'center', font: 'Amiri' }),
      k.txt(S.inviteLine, { x: mx + 5, y: 46, w: 100 - 2 * mx - 10, s: 4, fill: p.sub, align: 'center', lh: 1.6 }),
      k.txt(S.eventDate, { x: mx, y: 62, w: 100 - 2 * mx, s: 5.5, weight: 700, align: 'center' }),
      k.txt(S.eventTime + '  ·  ' + S.eventPlace, { x: mx, y: 70, w: 100 - 2 * mx, s: 4, fill: p.sub, align: 'center' }),
    ] }; } },
    { name: 'حفل افتتاح', fn: k => { const { p, mx } = k; return { bg: p.dark, objects: [
      k.poly([[0, 70], [100, 55], [100, 100], [0, 100]], p.accent),
      k.txt('دعوة خاصة', { x: mx, y: 10, w: 100 - 2 * mx, s: 5, fill: p.accent, align: 'center' }),
      k.txt('حفل الافتتاح', { x: mx, y: 18, w: 100 - 2 * mx, s: 12, weight: 900, fill: '#fff', align: 'center' }),
      k.txt(S.company, { x: mx, y: 34, w: 100 - 2 * mx, s: 6, fill: '#d1d5db', align: 'center' }),
      k.txt(S.eventDate + '\n' + S.eventTime, { x: mx, y: 46, w: 100 - 2 * mx, s: 4.4, fill: '#fff', align: 'center', lh: 1.6 }),
      k.txt(S.eventPlace, { x: mx, y: 80, w: 100 - 2 * mx, s: 5, weight: 700, fill: '#fff', align: 'center' }),
      k.en(S.phone, { x: mx, y: 88, w: 100 - 2 * mx, s: 4, fill: '#fff', align: 'center' }),
    ] }; } },
  ],

  // ============ CERTIFICATE (297×210 landscape) ============
  certificate: [
    { name: 'كلاسيكي', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.frame(mx - 3, my - 3, 100 - 2 * mx + 6, 100 - 2 * my + 6, p.dark, 0.8), k.frame(mx - 1, my - 1, 100 - 2 * mx + 2, 100 - 2 * my + 2, p.accent, 0.3),
      k.txt(S.company, { x: mx, y: my + 5, w: 100 - 2 * mx, s: 4, fill: p.accent, weight: 700, align: 'center' }),
      k.txt(S.cert, { x: mx, y: my + 11, w: 100 - 2 * mx, s: 13, weight: 700, font: 'Amiri', align: 'center' }),
      k.txt(S.certTo, { x: mx, y: 40, w: 100 - 2 * mx, s: 4.2, fill: p.sub, align: 'center' }),
      k.txt(S.name, { x: mx, y: 46, w: 100 - 2 * mx, s: 10, weight: 700, font: 'Amiri', align: 'center', fill: p.accent }),
      k.hline(30, 58, 40, 0.3, p.sub),
      k.txt(S.certFor, { x: mx + 10, y: 61, w: 100 - 2 * mx - 20, s: 4, fill: p.sub, align: 'center', lh: 1.6 }),
      k.hline(66, 82, 18, 0.3, p.dark), k.txt(S.signer, { x: 64, y: 84, w: 22, s: 3.4, align: 'center' }),
      k.hline(16, 82, 18, 0.3, p.dark), k.txt(S.signer2, { x: 14, y: 84, w: 22, s: 3.4, align: 'center' }),
      k.circle(50, 82, 7, p.accent), k.ring(50, 82, 5.5, '#fff', 0.3),
    ] }; } },
    { name: 'عصري', fn: k => { const { p, mx, my } = k; return { bg: '#fff', objects: [
      k.rect(0, 0, 22, 100, p.dark), k.rect(22, 0, 1.2, 100, p.accent),
      k.txt(S.company, { x: 2, y: 8, w: 18, s: 4.5, weight: 700, fill: '#fff', align: 'center' }),
      k.circle(11, 50, 8, p.accent), k.en('H', { x: 3, y: 44, w: 16, s: 9, weight: 700, fill: '#fff', align: 'center' }),
      k.en(S.web, { x: 2, y: 88, w: 18, s: 2.8, fill: '#cbd5e1', align: 'center' }),
      k.txt(S.cert, { x: 28, y: my + 8, w: 72 - mx, s: 13, weight: 900 }),
      k.txt(S.certTo, { x: 28, y: 36, w: 72 - mx, s: 4.2, fill: p.sub }),
      k.txt(S.name, { x: 28, y: 42, w: 72 - mx, s: 10, weight: 700, fill: p.accent }),
      k.txt(S.certFor, { x: 28, y: 58, w: 72 - mx, s: 4, fill: p.sub, lh: 1.6 }),
      k.hline(72, 84, 20, 0.3, p.dark), k.txt(S.signer, { x: 70, y: 86, w: 24, s: 3.4, align: 'center' }),
      k.hline(40, 84, 20, 0.3, p.dark), k.txt(S.signer2, { x: 38, y: 86, w: 24, s: 3.4, align: 'center' }),
    ] }; } },
    { name: 'داكن فاخر', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
      k.frame(mx - 2, my - 2, 100 - 2 * mx + 4, 100 - 2 * my + 4, p.accent, 0.5),
      k.poly([[0, 0], [12, 0], [0, 18]], p.accent), k.poly([[100, 100], [88, 100], [100, 82]], p.accent),
      k.txt(S.cert, { x: mx, y: my + 10, w: 100 - 2 * mx, s: 13, weight: 700, fill: p.accent, font: 'Amiri', align: 'center' }),
      k.txt(S.certTo, { x: mx, y: 40, w: 100 - 2 * mx, s: 4.2, fill: '#d1d5db', align: 'center' }),
      k.txt(S.name, { x: mx, y: 46, w: 100 - 2 * mx, s: 10, weight: 700, fill: '#fff', align: 'center', font: 'Amiri' }),
      k.txt(S.certFor, { x: mx + 12, y: 60, w: 100 - 2 * mx - 24, s: 4, fill: '#d1d5db', align: 'center', lh: 1.6 }),
      k.hline(66, 82, 18, 0.3, p.accent), k.txt(S.signer, { x: 64, y: 84, w: 22, s: 3.4, align: 'center', fill: '#fff' }),
      k.hline(16, 82, 18, 0.3, p.accent), k.txt(S.signer2, { x: 14, y: 84, w: 22, s: 3.4, align: 'center', fill: '#fff' }),
    ] }; } },
    { name: 'بسيط', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.hline(mx, my + 2, 100 - 2 * mx, 0.5, p.accent),
      k.txt(S.company, { x: mx, y: my + 6, w: 100 - 2 * mx, s: 4, weight: 700, align: 'center' }),
      k.txt(S.cert, { x: mx, y: 24, w: 100 - 2 * mx, s: 12, weight: 700, align: 'center' }),
      k.txt(S.certTo, { x: mx, y: 40, w: 100 - 2 * mx, s: 4.2, fill: p.sub, align: 'center' }),
      k.txt(S.name, { x: mx, y: 46, w: 100 - 2 * mx, s: 10, weight: 700, align: 'center', fill: p.accent }),
      k.txt(S.certFor, { x: mx + 12, y: 60, w: 100 - 2 * mx - 24, s: 4, fill: p.sub, align: 'center', lh: 1.6 }),
      k.hline(60, 84, 24, 0.3, p.dark), k.txt(S.signer, { x: 58, y: 86, w: 28, s: 3.4, align: 'center' }),
      k.hline(16, 84, 24, 0.3, p.dark), k.txt(S.signer2, { x: 14, y: 86, w: 28, s: 3.4, align: 'center' }),
      k.hline(mx, 100 - my - 2, 100 - 2 * mx, 0.5, p.accent),
    ] }; } },
  ],

  // ============ GIFT VOUCHER (210×99) ============
  voucher: [
    { name: 'كعب جانبي', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.rect(0, 0, 30, 100, p.dark), k.vline(30, 0, 100, 0.5, p.accent),
      k.txt(S.amount, { x: 2, y: 36, w: 26, s: 12, weight: 900, fill: p.accent, align: 'center' }),
      k.en(S.code, { x: 2, y: 56, w: 26, s: 4, fill: '#cbd5e1', align: 'center' }),
      k.txt(S.voucher, { x: 36, y: my + 8, w: 64 - mx, s: 12, weight: 700 }),
      k.txt(S.company, { x: 36, y: my + 28, w: 64 - mx, s: 5.5, fill: p.accent, weight: 700 }),
      k.txt(S.voucherNote, { x: 36, y: 62, w: 64 - mx, s: 4, fill: p.sub }),
      k.txt('إلى: ______________', { x: 36, y: 76, w: 64 - mx, s: 4.4, fill: p.sub }),
    ] }; } },
    { name: 'داكن', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
      k.circle(100, 50, 38, p.accent), k.circle(100, 50, 30, p.dark), k.circle(100, 50, 26, p.accent),
      k.txt(S.amount, { x: 72, y: 42, w: 28, s: 9, weight: 900, fill: '#fff', align: 'center' }),
      k.txt(S.voucher, { x: mx, y: my + 10, w: 60, s: 13, weight: 700, fill: '#fff', align: 'left' }),
      k.txt(S.company, { x: mx, y: my + 30, w: 60, s: 5.5, fill: p.accent, weight: 700, align: 'left' }),
      k.txt(S.voucherNote, { x: mx, y: 68, w: 60, s: 4, fill: '#d1d5db', align: 'left' }),
      k.en(S.code, { x: mx, y: 80, w: 60, s: 4.4, fill: p.accent }),
    ] }; } },
    { name: 'قطري', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.poly([[0, 0], [45, 0], [30, 100], [0, 100]], p.accent), k.poly([[45, 0], [49, 0], [34, 100], [30, 100]], p.dark),
      k.txt(S.amount, { x: 2, y: 36, w: 32, s: 11, weight: 900, fill: '#fff', align: 'center' }),
      k.txt(S.voucher, { x: 54, y: my + 8, w: 46 - mx, s: 12, weight: 700 }),
      k.txt(S.company, { x: 54, y: my + 28, w: 46 - mx, s: 5.5, fill: p.accent, weight: 700 }),
      k.txt(S.voucherNote, { x: 54, y: 62, w: 46 - mx, s: 3.8, fill: p.sub }),
      k.en(S.code, { x: 54, y: 78, w: 46 - mx, s: 4.4, fill: p.dark, align: 'right', weight: 700 }),
    ] }; } },
    { name: 'بسيط', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.frame(mx - 2, my - 3, 100 - 2 * mx + 4, 100 - 2 * my + 6, p.accent, 0.5),
      k.txt(S.company, { x: mx, y: my + 4, w: 100 - 2 * mx, s: 5, fill: p.accent, weight: 700, align: 'center' }),
      k.txt(S.voucher, { x: mx, y: my + 16, w: 100 - 2 * mx, s: 12, weight: 700, align: 'center' }),
      k.txt(S.amount, { x: mx, y: 48, w: 100 - 2 * mx, s: 14, weight: 900, fill: p.accent, align: 'center' }),
      k.txt(S.voucherNote, { x: mx, y: 72, w: 100 - 2 * mx, s: 3.8, fill: p.sub, align: 'center' }),
      k.en(S.code, { x: mx, y: 82, w: 100 - 2 * mx, s: 4, fill: p.sub, align: 'center' }),
    ] }; } },
  ],

  // ============ POSTCARD / THANK YOU (148×105 landscape) ============
  postcard: [
    { name: 'شكراً', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.circle(100, 0, 36, p.light), k.circle(0, 100, 28, p.accent, { opacity: 0.25 }),
      k.txt(S.thanks, { x: mx, y: my + 18, w: 100 - 2 * mx, s: 20, weight: 900, align: 'center' }),
      k.hline(44, 56, 12, 0.6, p.accent),
      k.txt(S.thanksBody, { x: mx + 8, y: 60, w: 100 - 2 * mx - 16, s: 4.6, fill: p.sub, align: 'center', lh: 1.6 }),
      k.txt(S.company, { x: mx, y: 84, w: 100 - 2 * mx, s: 5, fill: p.accent, weight: 700, align: 'center' }),
    ] }; } },
    { name: 'صورة + نص', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
      k.img(50, 0, 50, 100),
      k.txt(S.thanks, { x: mx, y: my + 14, w: 46 - mx, s: 14, weight: 900, align: 'left' }),
      k.txt(S.thanksBody, { x: mx, y: 40, w: 46 - mx, s: 4.4, fill: p.sub, align: 'left', lh: 1.6 }),
      k.en(S.web, { x: mx, y: 84, w: 46 - mx, s: 4, fill: p.accent }),
    ] }; } },
    { name: 'داكن', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
      k.frame(mx - 2, my - 3, 100 - 2 * mx + 4, 100 - 2 * my + 6, p.accent, 0.5),
      k.txt(S.thanks, { x: mx, y: my + 18, w: 100 - 2 * mx, s: 18, weight: 900, fill: '#fff', align: 'center' }),
      k.txt(S.thanksBody, { x: mx + 8, y: 56, w: 100 - 2 * mx - 16, s: 4.4, fill: '#d1d5db', align: 'center', lh: 1.6 }),
      k.txt(S.company, { x: mx, y: 82, w: 100 - 2 * mx, s: 5, fill: p.accent, weight: 700, align: 'center' }),
    ] }; } },
    { name: 'بوستكارد', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
      k.img(0, 0, 100, 62),
      k.rect(0, 62, 100, 38, p.accent),
      k.txt('تحيات من ' + S.company, { x: mx, y: 68, w: 100 - 2 * mx, s: 8, weight: 700, fill: '#fff', align: 'center' }),
      k.txt(S.address, { x: mx, y: 82, w: 100 - 2 * mx, s: 4.2, fill: '#fff', align: 'center' }),
    ] }; } },
  ],

  // ============ MUG WRAP (200×85) ============
  mug: [
    { name: 'نص كبير', fn: k => { const { p } = k; return { bg: p.bg, objects: [
      k.txt(S.mug, { x: 10, y: 30, w: 80, s: 26, weight: 900, fill: p.dark, align: 'center' }),
      k.txt(S.company, { x: 10, y: 68, w: 80, s: 6, fill: p.accent, align: 'center' }),
    ] }; } },
    { name: 'دوائر', fn: k => { const { p } = k; return { bg: p.accent, objects: [
      ...[8, 24, 40, 56, 72, 88].map((x, i) => k.circle(x, i % 2 ? 20 : 80, 9, '#ffffff', { opacity: 0.25 })),
      k.rect(30, 30, 40, 40, '#fff', { rx: 4 * k.u, ry: 4 * k.u }),
      k.txt(S.mug, { x: 30, y: 42, w: 40, s: 12, weight: 900, fill: p.accent, align: 'center' }),
    ] }; } },
    { name: 'شعار', fn: k => { const { p } = k; return { bg: p.dark, objects: [
      ...k.logo(25, 50, 24, p.accent, 'H'),
      k.txt(S.company, { x: 50, y: 32, w: 42, s: 10, weight: 700, fill: '#fff', align: 'center' }),
      k.txt(S.slogan, { x: 50, y: 56, w: 42, s: 5.5, fill: p.accent, align: 'center' }),
    ] }; } },
  ],

  // ============ T-SHIRT PRINT AREA (300×400) ============
  tshirt: [
    { name: 'شعار كبير', fn: k => { const { p } = k; return { bg: '#ffffff', objects: [
      k.txt(S.tshirt, { x: 5, y: 34, w: 90, s: 18, weight: 900, fill: p.dark, align: 'center' }),
      k.hline(30, 50, 40, 1, p.accent),
      k.en(S.companyEn, { x: 5, y: 54, w: 90, s: 6, weight: 700, fill: p.accent, align: 'center', charSpacing: 300 }),
    ] }; } },
    { name: 'شعار دائري', fn: k => { const { p } = k; return { bg: '#ffffff', objects: [
      k.circle(50, 42, 30, p.dark), k.ring(50, 42, 34, p.accent, 1.2),
      k.en('H', { x: 20, y: 26, w: 60, s: 34, weight: 700, fill: '#fff', align: 'center' }),
      k.txt(S.company, { x: 5, y: 72, w: 90, s: 9, weight: 700, fill: p.dark, align: 'center' }),
      k.en('EST. 2026', { x: 5, y: 82, w: 90, s: 4.5, fill: p.sub, align: 'center', charSpacing: 300 }),
    ] }; } },
    { name: 'طباعي', fn: k => { const { p } = k; return { bg: '#ffffff', objects: [
      k.rect(10, 20, 80, 50, p.accent),
      k.txt(S.tshirt, { x: 10, y: 30, w: 80, s: 16, weight: 900, fill: '#fff', align: 'center' }),
      k.txt(S.slogan, { x: 10, y: 50, w: 80, s: 7, fill: '#fff', align: 'center' }),
      k.en(S.web, { x: 10, y: 74, w: 80, s: 5, fill: p.dark, align: 'center' }),
    ] }; } },
  ],
};

// ===== Style layouts from the Dribbble / Behance visual research (Oct 2026) =====
// Trends seen: Swiss/International grid, Bauhaus geometry, bold Kufi wordmarks, Islamic ornament,
// acid neon on black, blurred gradients, editorial photo+column, vintage ornamental frames, dot textures.
FAMILIES.card.push(
  { name: 'سويسري شبكي', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.txt(S.name, { x: mx, y: my + 6, w: 100 - 2 * mx, s: 10, weight: 700, align: 'left' }),
    k.txt(S.title, { x: mx, y: my + 20, w: 100 - 2 * mx, s: 4.4, fill: p.sub, align: 'left' }),
    k.hline(mx, 48, 100 - 2 * mx, 0.3, p.text),
    k.label('Phone', { x: mx, y: 54, w: 28 }), k.en(S.phone, { x: mx, y: 61, w: 28, s: 3.6 }),
    k.label('Email', { x: mx + 30, y: 54, w: 28 }), k.en(S.email, { x: mx + 30, y: 61, w: 28, s: 3.6 }),
    k.label('Web', { x: mx + 60, y: 54, w: 28 }), k.en(S.web, { x: mx + 60, y: 61, w: 28, s: 3.6 }),
    k.circle(100 - mx - 5, my + 11, 5, p.accent),
    k.txt(S.company, { x: mx, y: 82, w: 100 - 2 * mx, s: 4, weight: 700, fill: p.accent, align: 'left' }),
  ] }; } },
  { name: 'باوهاوس هندسي', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.rect(62, 0, 38, 100, p.light),
    k.circle(81, 25, 17, p.accent), k.rect(62, 50, 19, 50, p.dark), k.circle(90.5, 75, 9.5, p.accent), k.rect(81, 50, 19, 25, p.text, { opacity: 0.15 }),
    k.txt(S.name, { x: mx, y: my + 10, w: 58 - mx, s: 9.5, weight: 700, align: 'left' }),
    k.txt(S.title, { x: mx, y: my + 24, w: 58 - mx, s: 4.4, fill: p.sub, align: 'left' }),
    k.contacts(mx, 58, 50, 4, p.sub),
    k.txt(S.company, { x: mx, y: 84, w: 58 - mx, s: 4.2, weight: 700, fill: p.accent, align: 'left' }),
  ] }; } },
  { name: 'خط عربي جريء', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
    k.txt(S.company.split(' ')[1] || S.company, { x: -4, y: -1, w: 108, s: 36, weight: 900, fill: p.accent, align: 'center', lh: 1 }),
    k.txt(S.name, { x: mx, y: 62, w: 100 - 2 * mx, s: 7, weight: 700, fill: '#fff' }),
    k.txt(S.title, { x: mx, y: 73, w: 100 - 2 * mx, s: 4, fill: p.accent }),
    k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 86, w: 100 - 2 * mx, s: 3.6, fill: '#d4d4d4' }),
  ] }; } },
  { name: 'عتيق مزخرف', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.frame(mx - 3, my - 4, 100 - 2 * mx + 6, 100 - 2 * my + 8, p.dark, 0.5), k.frame(mx - 1, my - 1.5, 100 - 2 * mx + 2, 100 - 2 * my + 3, p.accent, 0.3),
    ...k.corners(mx - 3, my - 4, 100 - 2 * mx + 6, 100 - 2 * my + 8, 2.2, p.accent),
    k.label('Est. 2026', { x: mx, y: my + 6, w: 100 - 2 * mx, align: 'center', fill: p.accent }),
    k.txt(S.company, { x: mx, y: my + 14, w: 100 - 2 * mx, s: 7.5, weight: 700, font: 'Amiri', align: 'center' }),
    k.txt('✦  ' + S.slogan + '  ✦', { x: mx, y: my + 30, w: 100 - 2 * mx, s: 3.8, fill: p.sub, align: 'center', font: 'Amiri' }),
    k.txt(S.name + '  ·  ' + S.title, { x: mx, y: 58, w: 100 - 2 * mx, s: 4.2, align: 'center' }),
    k.en(S.phone + '  |  ' + S.web, { x: mx, y: 72, w: 100 - 2 * mx, s: 3.6, fill: p.sub, align: 'center', font: 'Playfair Display' }),
  ] }; } },
  { name: 'تدرج ضبابي', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
    k.grad(0, 0, 100, 100, p.dark, p.accent), k.circle(85, 90, 40, p.accent, { opacity: 0.35 }),
    k.txt(S.name, { x: mx, y: my + 10, w: 100 - 2 * mx, s: 10, weight: 700, fill: '#fff' }),
    k.txt(S.title, { x: mx, y: my + 25, w: 100 - 2 * mx, s: 4.6, fill: '#ffffffcc' }),
    k.contacts(mx, 60, 50, 4, '#ffffffdd'),
    k.txt(S.company, { x: 50, y: 82, w: 50 - mx, s: 4.4, weight: 700, fill: '#fff' }),
  ] }; } },
  { name: 'زاوية مقصوصة', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.poly([[0, 0], [22, 0], [0, 40]], p.accent), k.poly([[100, 100], [78, 100], [100, 60]], p.dark),
    k.txt(S.name, { x: 26, y: my + 8, w: 74 - mx, s: 9.5, weight: 700 }),
    k.txt(S.title, { x: 26, y: my + 22, w: 74 - mx, s: 4.4, fill: p.accent }),
    k.hline(100 - mx - 14, my + 33, 14, 0.8, p.dark),
    k.contacts(mx, 56, 46, 4, p.sub),
    k.txt(S.company, { x: 50, y: 70, w: 50 - mx, s: 4.2, weight: 700 }),
  ] }; } },
  { name: 'نقاط شبكية', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
    k.dots(0, 0, 40, 100, 0.55, 3.2, p.accent, 0.9),
    k.txt(S.company, { x: 44, y: my + 8, w: 56 - mx, s: 4.4, weight: 700, fill: p.accent }),
    k.txt(S.name, { x: 44, y: my + 18, w: 56 - mx, s: 8.5, weight: 700, fill: '#fff' }),
    k.txt(S.title, { x: 44, y: my + 31, w: 56 - mx, s: 4.2, fill: '#c9c9c9' }),
    k.contacts(44, 60, 50, 3.8, '#d4d4d4', { align: 'right' }),
  ] }; } },
  { name: 'تحريري أنيق', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.hline(mx, my, 100 - 2 * mx, 0.4, p.text),
    k.label('Business card', { x: mx, y: my + 3, w: 40 }), k.label(S.companyEn, { x: 50, y: my + 3, w: 50 - mx, align: 'right' }),
    k.txt(S.name, { x: mx, y: 30, w: 100 - 2 * mx, s: 12, weight: 400, font: 'Amiri', align: 'center' }),
    k.txt(S.title, { x: mx, y: 50, w: 100 - 2 * mx, s: 4.2, fill: p.sub, align: 'center' }),
    k.hline(mx, 70, 100 - 2 * mx, 0.2, p.sub),
    k.en(S.phone, { x: mx, y: 74, w: 30, s: 3.4, fill: p.sub }), k.en(S.email, { x: 35, y: 74, w: 30, s: 3.4, fill: p.sub, align: 'center' }), k.en(S.web, { x: 70 - mx, y: 74, w: 30, s: 3.4, fill: p.sub, align: 'right' }),
    k.hline(mx, 100 - my, 100 - 2 * mx, 0.4, p.text),
  ] }; } },
);

FAMILIES.poster.push(
  { name: 'سويسري دولي', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.rect(0, 0, 100, 4, p.accent),
    k.txt(S.headline, { x: mx, y: 8, w: 100 - 2 * mx, s: 16, weight: 900, align: 'left', lh: 1.05, lines: 2 }),
    k.hline(mx, 36, 100 - 2 * mx, 0.3, p.text),
    k.label(S.companyEn, { x: mx, y: 38, w: 45 }), k.txt(S.date, { x: 50, y: 38, w: 50 - mx, s: 2.8, fill: p.sub }),
    k.txt(S.body, { x: mx, y: 46, w: 44, s: 3.8, fill: p.text, align: 'left', lh: 1.55 }),
    k.txt(S.bullets.map(b => '— ' + b).join('\n'), { x: 52, y: 46, w: 48 - mx, s: 3.2, fill: p.sub, align: 'left', lh: 1.8 }),
    k.rect(mx, 66, 100 - 2 * mx, 22, p.dark), k.rect(mx, 66, 30, 22, p.accent),
    k.txt(S.cta, { x: mx, y: 74, w: 30, s: 5, weight: 700, fill: '#fff', align: 'center' }),
    k.en(S.phone + '\n' + S.web, { x: mx + 34, y: 71, w: 60 - 2 * mx, s: 4, fill: '#fff', lh: 1.5 }),
    k.label('© ' + S.companyEn, { x: mx, y: 93, w: 100 - 2 * mx }),
  ] }; } },
  { name: 'باوهاوس', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.circle(100, 14, 30, p.accent), k.rect(0, 28, 50, 20, p.dark), k.circle(25, 48, 25, p.light), k.rect(50, 38, 50, 10, p.text, { opacity: 0.12 }),
    k.txt(S.headline, { x: mx, y: 56, w: 100 - 2 * mx, s: 13, weight: 900, lh: 1.1 }),
    k.txt(S.sub, { x: mx, y: 70, w: 100 - 2 * mx, s: 5, fill: p.accent, weight: 700 }),
    k.txt(S.body, { x: mx, y: 77, w: 100 - 2 * mx, s: 3.8, fill: p.sub, lh: 1.5 }),
    k.rect(0, 92, 100, 8, p.dark), k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 94.3, w: 100 - 2 * mx, s: 3.4, fill: '#fff', align: 'center' }),
  ] }; } },
  { name: 'طباعي ضخم', fn: k => { const { p, mx } = k; return { bg: p.accent, objects: [
    k.txt(S.headline, { x: mx - 2, y: 4, w: 100 - 2 * mx + 4, s: 26, weight: 900, fill: p.dark, align: 'center', lh: 1, lines: 3 }),
    k.txt(S.sub, { x: mx, y: 58, w: 100 - 2 * mx, s: 6, weight: 700, fill: p.dark, align: 'center' }),
    k.hline(35, 68, 30, 0.5, p.dark),
    k.txt(S.date, { x: mx, y: 72, w: 100 - 2 * mx, s: 5, fill: p.dark, align: 'center' }),
    k.txt(S.address, { x: mx, y: 79, w: 100 - 2 * mx, s: 4, fill: p.dark, align: 'center' }),
    k.en(S.web, { x: mx, y: 91, w: 100 - 2 * mx, s: 4, fill: p.dark, align: 'center', weight: 700 }),
  ] }; } },
  { name: 'أشكال باستيلية', fn: k => { const { p, mx } = k; return { bg: p.light, objects: [
    k.circle(15, 15, 34, p.accent, { opacity: 0.45 }), k.circle(95, 55, 28, p.dark, { opacity: 0.18 }), k.circle(40, 100, 30, p.accent, { opacity: 0.3 }),
    k.rect(mx + 2, 22, 100 - 2 * mx - 4, 56, p.bg, { rx: 4 * k.u, ry: 4 * k.u }),
    k.txt(S.company, { x: mx + 6, y: 27, w: 100 - 2 * mx - 12, s: 4.4, fill: p.accent, weight: 700, align: 'center' }),
    k.txt(S.headline, { x: mx + 6, y: 34, w: 100 - 2 * mx - 12, s: 11, weight: 900, align: 'center', lh: 1.1 }),
    k.txt(S.body, { x: mx + 8, y: 50, w: 100 - 2 * mx - 16, s: 3.8, fill: p.sub, align: 'center', lh: 1.6 }),
    k.txt(S.date, { x: mx + 6, y: 66, w: 100 - 2 * mx - 12, s: 4.6, weight: 700, align: 'center' }),
    k.en(S.web, { x: mx, y: 86, w: 100 - 2 * mx, s: 4, fill: p.dark, align: 'center', weight: 700 }),
  ] }; } },
  { name: 'نيون داكن', fn: k => { const { p, mx } = k; return { bg: p.dark, objects: [
    k.frame(mx - 2, 4, 100 - 2 * mx + 4, 92, p.accent, 0.4),
    k.dots(mx, 7, 100 - 2 * mx, 18, 0.35, 2.4, p.accent, 0.5),
    k.txt(S.headline, { x: mx, y: 30, w: 100 - 2 * mx, s: 15, weight: 900, fill: p.accent, align: 'center', lh: 1.05 }),
    k.txt(S.sub, { x: mx, y: 52, w: 100 - 2 * mx, s: 5, fill: '#fff', align: 'center' }),
    k.hline(30, 61, 40, 0.3, p.accent),
    k.txt(S.date + '\n' + S.address, { x: mx, y: 65, w: 100 - 2 * mx, s: 4.2, fill: '#d4d4d4', align: 'center', lh: 1.7 }),
    k.rect(30, 82, 40, 7, p.accent), k.txt(S.cta, { x: 30, y: 83.6, w: 40, s: 4.4, weight: 700, fill: p.dark, align: 'center' }),
  ] }; } },
  { name: 'تحريري', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.img(0, 0, 52, 100),
    k.label('Issue 01 — 2026', { x: 56, y: 6, w: 44 - mx }),
    k.hline(56, 10, 44 - mx, 0.25, p.text),
    k.txt(S.headline, { x: 56, y: 13, w: 44 - mx, s: 9, weight: 700, font: 'Amiri', align: 'left', lh: 1.15, lines: 3 }),
    k.txt(S.sub, { x: 56, y: 34, w: 44 - mx, s: 3.8, fill: p.accent, align: 'left', weight: 700 }),
    k.txt(S.body, { x: 56, y: 42, w: 44 - mx, s: 3.4, fill: p.sub, align: 'left', lh: 1.6 }),
    k.hline(56, 70, 44 - mx, 0.25, p.text),
    k.txt(S.bullets.join('\n'), { x: 56, y: 73, w: 44 - mx, s: 3.4, align: 'left', lh: 1.7 }),
    k.en(S.web, { x: 56, y: 93, w: 44 - mx, s: 3.4, fill: p.accent }),
  ] }; } },
);

FAMILIES.invitation.push(
  { name: 'زخرفة إسلامية', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
    k.frame(mx - 2, my - 2, 100 - 2 * mx + 4, 100 - 2 * my + 4, p.accent, 0.4), ...k.corners(mx - 2, my - 2, 100 - 2 * mx + 4, 100 - 2 * my + 4, 2.4, p.accent),
    k.star8(50, 24, 11, p.accent), k.star8(50, 24, 6, p.dark),
    k.txt(S.inviteTitle, { x: mx, y: 42, w: 100 - 2 * mx, s: 5, fill: p.accent, align: 'center', font: 'Amiri' }),
    k.txt(S.couple, { x: mx, y: 49, w: 100 - 2 * mx, s: 11, weight: 700, fill: '#fff', align: 'center', font: 'Amiri' }),
    k.txt(S.inviteLine, { x: mx + 4, y: 63, w: 100 - 2 * mx - 8, s: 3.8, fill: '#e5e5e5', align: 'center', lh: 1.6 }),
    k.txt(S.eventDate + '  ·  ' + S.eventTime, { x: mx, y: 78, w: 100 - 2 * mx, s: 4.2, fill: p.accent, align: 'center' }),
    k.txt(S.eventPlace, { x: mx, y: 85, w: 100 - 2 * mx, s: 4, fill: '#e5e5e5', align: 'center' }),
  ] }; } },
  { name: 'نباتي خطي', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.ring(8, 8, 18, p.accent, 0.3), k.ring(14, 4, 12, p.accent, 0.3), k.ring(92, 94, 20, p.accent, 0.3), k.ring(86, 98, 13, p.accent, 0.3),
    k.label('Save the date', { x: mx, y: 22, w: 100 - 2 * mx, align: 'center', fill: p.accent }),
    k.txt(S.couple, { x: mx, y: 30, w: 100 - 2 * mx, s: 12, weight: 400, font: 'Amiri', align: 'center' }),
    k.hline(44, 48, 12, 0.3, p.accent),
    k.txt(S.inviteLine, { x: mx + 5, y: 52, w: 100 - 2 * mx - 10, s: 3.8, fill: p.sub, align: 'center', lh: 1.6 }),
    k.txt(S.eventDate, { x: mx, y: 66, w: 100 - 2 * mx, s: 5, weight: 700, align: 'center' }),
    k.txt(S.eventTime + '  ·  ' + S.eventPlace, { x: mx, y: 73, w: 100 - 2 * mx, s: 3.8, fill: p.sub, align: 'center' }),
  ] }; } },
  { name: 'عريض حديث', fn: k => { const { p, mx, my } = k; return { bg: p.accent, objects: [
    k.txt(S.couple.split(' & ')[0], { x: mx, y: my + 2, w: 100 - 2 * mx, s: 22, weight: 900, fill: p.dark, align: 'left', lh: 1 }),
    k.txt('&', { x: mx, y: my + 24, w: 100 - 2 * mx, s: 18, font: 'Playfair Display', fill: '#fff', align: 'center' }),
    k.txt(S.couple.split(' & ')[1] || '', { x: mx, y: my + 44, w: 100 - 2 * mx, s: 22, weight: 900, fill: p.dark, align: 'right', lh: 1 }),
    k.hline(mx, 74, 100 - 2 * mx, 0.4, p.dark),
    k.txt(S.eventDate + '  ·  ' + S.eventTime, { x: mx, y: 77, w: 100 - 2 * mx, s: 4, fill: p.dark, align: 'center', weight: 700 }),
    k.txt(S.eventPlace, { x: mx, y: 84, w: 100 - 2 * mx, s: 3.8, fill: p.dark, align: 'center' }),
  ] }; } },
);

FAMILIES.menu.push(
  { name: 'سبورة', fn: k => { const { p, mx } = k; const o = [
    k.frame(mx - 2, 3, 100 - 2 * mx + 4, 94, '#ffffff55', 0.3),
    k.txt(S.menuTitle, { x: mx, y: 7, w: 100 - 2 * mx, s: 10, weight: 900, fill: p.accent, align: 'center' }),
    k.txt('✦ ' + S.company + ' ✦', { x: mx, y: 18, w: 100 - 2 * mx, s: 3.4, fill: '#e5e5e5', align: 'center' })];
    S.menu.forEach(([n, pr], i) => { const y = 26 + i * 7.6; o.push(k.txt(n, { x: 30, y, w: 70 - mx, s: 4.2, fill: '#fff', weight: 700 }), k.txt('وصف قصير للصنف', { x: 30, y: y + 4, w: 70 - mx, s: 2.5, fill: '#a3a3a3' }), k.en(pr, { x: mx, y, w: 16, s: 4.4, fill: p.accent, weight: 700 })); });
    o.push(k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 92, w: 100 - 2 * mx, s: 2.6, fill: '#a3a3a3', align: 'center' }));
    return { bg: '#1b1b1b', objects: o }; } },
  { name: 'بوهيمي بيج', fn: k => { const { p, mx } = k; const o = [
    k.circle(100, 0, 22, p.accent, { opacity: 0.25 }), k.circle(0, 100, 26, p.dark, { opacity: 0.12 }),
    k.txt(S.menuTitle, { x: mx, y: 6, w: 100 - 2 * mx, s: 8.5, weight: 700, font: 'Amiri', align: 'center' }),
    k.label(S.companyEn, { x: mx, y: 15, w: 100 - 2 * mx, align: 'center', fill: p.accent })];
    S.menu.forEach(([n, pr], i) => { const y = 24 + i * 7.6; o.push(k.txt(n, { x: 30, y, w: 70 - mx, s: 4, weight: 700, font: 'Amiri' }), k.txt('وصف قصير للصنف ومكوناته', { x: 30, y: y + 4, w: 70 - mx, s: 2.5, fill: p.sub }), k.en(pr, { x: mx, y, w: 16, s: 4, fill: p.accent, weight: 700, font: 'Playfair Display' })); });
    o.push(k.hline(30, 90, 40, 0.2, p.accent), k.txt(S.address, { x: mx, y: 92, w: 100 - 2 * mx, s: 2.6, fill: p.sub, align: 'center' }));
    return { bg: '#f4ede2', objects: o }; } },
  { name: 'ثنائي اللغة', fn: k => { const { p, mx } = k; const en = ['Arabic Coffee', 'Latte', 'Cappuccino', 'Mocha', 'Karak Tea', 'Fresh Orange', 'Spanish Latte', 'Iced Americano']; const o = [
    k.rect(0, 0, 100, 16, p.dark), k.rect(0, 16, 100, 0.8, p.accent),
    k.txt(S.menuTitle, { x: 50, y: 4, w: 50 - mx, s: 6.5, weight: 700, fill: '#fff' }), k.en('DRINKS MENU', { x: mx, y: 5.5, w: 45, s: 4.4, weight: 700, fill: p.accent, charSpacing: 200 })];
    S.menu.forEach(([n, pr], i) => { const y = 22 + i * 7.8; o.push(k.txt(n, { x: 50, y, w: 50 - mx, s: 4, weight: 700 }), k.en(en[i], { x: mx + 16, y: y + 0.6, w: 34, s: 3.4, fill: p.sub }), k.en(pr, { x: mx, y, w: 14, s: 4, fill: p.accent, weight: 700 }), k.hline(mx, y + 6.4, 100 - 2 * mx, 0.12, p.light)); });
    o.push(k.rect(0, 94, 100, 6, p.dark), k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 95.8, w: 100 - 2 * mx, s: 2.4, fill: '#fff', align: 'center' }));
    return { bg: p.bg, objects: o }; } },
);

FAMILIES.brochure.push(
  { name: 'هندسي قطري', fn: k => { const { p, my } = k; return { bg: p.bg, objects: [
    k.poly([[66.7, 0], [100, 0], [100, 100], [66.7, 100]], p.dark), k.poly([[66.7, 0], [100, 0], [100, 45]], p.accent),
    k.txt(S.company, { x: 69, y: 55, w: 28, s: 8, weight: 900, fill: '#fff', lh: 1.1 }),
    k.txt(S.slogan, { x: 69, y: 76, w: 28, s: 4, fill: p.accent }),
    k.en(S.web, { x: 69, y: 90, w: 28, s: 3.4, fill: '#d4d4d4' }),
    k.poly([[33.3, 0], [66.7, 0], [66.7, 14], [33.3, 22]], p.accent),
    k.txt('خدماتنا', { x: 36, y: 28, w: 28, s: 6, weight: 700 }),
    ...S.bullets.map((t, i) => k.txt('— ' + t, { x: 36, y: 40 + i * 9, w: 28, s: 3.8 })),
    k.img(36, 68, 28, 24, { rx: 1 }),
    k.txt('من نحن', { x: 3, y: my + 6, w: 28, s: 6, weight: 700, fill: p.accent }),
    k.txt(S.body, { x: 3, y: my + 18, w: 28, s: 3.4, fill: p.sub, lh: 1.6 }),
    k.contacts(3, 72, 28, 3.4, p.sub, { align: 'right' }),
  ] }; } },
  { name: 'سويسري', fn: k => { const { p, my } = k; return { bg: p.bg, objects: [
    k.rect(66.7, 0, 33.3, 6, p.accent),
    k.txt(S.company, { x: 69, y: 12, w: 28, s: 9, weight: 900, align: 'left', lh: 1.05 }),
    k.hline(69, 40, 28, 0.3, p.text),
    k.label(S.companyEn, { x: 69, y: 42, w: 28 }),
    k.txt(S.slogan, { x: 69, y: 50, w: 28, s: 4.2, align: 'left', fill: p.sub }),
    k.img(69, 62, 28, 30),
    k.label('About', { x: 36, y: my + 6, w: 28 }), k.hline(36, my + 10, 28, 0.3, p.text),
    k.txt(S.body, { x: 36, y: my + 14, w: 28, s: 3.4, align: 'left', lh: 1.6 }),
    k.label('Services', { x: 36, y: 56, w: 28 }), k.hline(36, 60, 28, 0.3, p.text),
    ...S.bullets.map((t, i) => k.txt(t, { x: 36, y: 64 + i * 8, w: 28, s: 3.6, align: 'left' })),
    k.label('Contact', { x: 3, y: my + 6, w: 28 }), k.hline(3, my + 10, 28, 0.3, p.text),
    k.contacts(3, my + 14, 28, 3.4, p.text),
    k.txt(S.address, { x: 3, y: 50, w: 28, s: 3.4, fill: p.sub, align: 'left' }),
    k.rect(3, 88, 28, 6, p.dark),
  ] }; } },
);

FAMILIES.certificate.push(
  { name: 'رسمي ذهبي', fn: k => { const { p, mx, my } = k; return { bg: '#fffdf7', objects: [
    k.frame(mx - 4, my - 4, 100 - 2 * mx + 8, 100 - 2 * my + 8, p.accent, 1.2), k.frame(mx - 1.5, my - 1.5, 100 - 2 * mx + 3, 100 - 2 * my + 3, p.accent, 0.3),
    ...k.corners(mx - 4, my - 4, 100 - 2 * mx + 8, 100 - 2 * my + 8, 3, p.dark),
    k.star8(50, 14, 5, p.accent), k.star8(50, 14, 2.6, '#fffdf7'),
    k.txt(S.cert, { x: mx, y: 22, w: 100 - 2 * mx, s: 14, weight: 700, font: 'Amiri', align: 'center', fill: p.dark }),
    k.label('Certificate of appreciation', { x: mx, y: 41, w: 100 - 2 * mx, align: 'center', fill: p.accent }),
    k.txt(S.certTo, { x: mx, y: 47, w: 100 - 2 * mx, s: 3.8, fill: p.sub, align: 'center' }),
    k.txt(S.name, { x: mx, y: 52, w: 100 - 2 * mx, s: 10, weight: 700, font: 'Amiri', align: 'center', fill: p.accent }),
    k.hline(32, 65, 36, 0.25, p.dark),
    k.txt(S.certFor, { x: mx + 12, y: 68, w: 100 - 2 * mx - 24, s: 3.6, fill: p.sub, align: 'center', lh: 1.5 }),
    k.hline(66, 84, 18, 0.3, p.dark), k.txt(S.signer, { x: 64, y: 86, w: 22, s: 3.2, align: 'center' }),
    k.hline(16, 84, 18, 0.3, p.dark), k.txt(S.signer2, { x: 14, y: 86, w: 22, s: 3.2, align: 'center' }),
  ] }; } },
  { name: 'طباعي حديث', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.rect(0, 0, 6, 100, p.accent),
    k.txt(S.cert, { x: 12, y: my + 4, w: 88 - mx, s: 20, weight: 900, align: 'left', lh: 1 }),
    k.label(S.companyEn + ' · 2026', { x: 12, y: 38, w: 60 }),
    k.txt(S.certTo + ' ' + S.name, { x: 12, y: 48, w: 88 - mx, s: 7, weight: 700, align: 'left', fill: p.accent }),
    k.txt(S.certFor, { x: 12, y: 60, w: 60, s: 3.8, fill: p.sub, align: 'left', lh: 1.6 }),
    k.hline(12, 84, 22, 0.3, p.text), k.txt(S.signer, { x: 12, y: 86, w: 22, s: 3.2, align: 'left' }),
    k.hline(40, 84, 22, 0.3, p.text), k.txt(S.signer2, { x: 40, y: 86, w: 22, s: 3.2, align: 'left' }),
    k.circle(88, 82, 8, p.dark), k.en('✓', { x: 80, y: 77, w: 16, s: 8, fill: '#fff', align: 'center' }),
  ] }; } },
);

FAMILIES.voucher.push(
  { name: 'تذكرة', fn: k => { const { p, mx, my } = k; return { bg: p.light, objects: [
    k.rect(3, 8, 94, 84, p.bg, { rx: 2 * k.u, ry: 2 * k.u }),
    k.vline(70, 8, 84, 0.4, p.sub), k.circle(70, 8, 4, p.light), k.circle(70, 92, 4, p.light),
    k.txt(S.amount, { x: 72, y: 36, w: 24, s: 9, weight: 900, fill: p.accent, align: 'center' }),
    k.en(S.code, { x: 72, y: 54, w: 24, s: 3.4, fill: p.sub, align: 'center' }),
    k.label('Admit one', { x: 72, y: 62, w: 24, align: 'center' }),
    k.txt(S.voucher, { x: 8, y: my + 6, w: 58, s: 12, weight: 900 }),
    k.txt(S.company, { x: 8, y: my + 26, w: 58, s: 5, fill: p.accent, weight: 700 }),
    k.txt(S.voucherNote, { x: 8, y: 66, w: 58, s: 3.6, fill: p.sub }),
    ...[...Array(6)].map((_, i) => k.circle(8 + i * 11, 83, 1.4, p.accent)),
  ] }; } },
  { name: 'فاخر مزخرف', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
    k.dots(0, 0, 100, 100, 0.3, 4, p.accent, 0.25),
    k.frame(mx - 2, my - 3, 100 - 2 * mx + 4, 100 - 2 * my + 6, p.accent, 0.5), ...k.corners(mx - 2, my - 3, 100 - 2 * mx + 4, 100 - 2 * my + 6, 2.4, p.accent),
    k.txt(S.voucher, { x: mx, y: my + 8, w: 100 - 2 * mx, s: 11, weight: 700, fill: '#fff', align: 'center', font: 'Amiri' }),
    k.txt(S.amount, { x: mx, y: 40, w: 100 - 2 * mx, s: 15, weight: 900, fill: p.accent, align: 'center' }),
    k.txt(S.voucherNote, { x: mx, y: 70, w: 100 - 2 * mx, s: 3.6, fill: '#d4d4d4', align: 'center' }),
    k.en(S.code, { x: mx, y: 80, w: 100 - 2 * mx, s: 3.8, fill: p.accent, align: 'center' }),
  ] }; } },
);

FAMILIES.rollup.push(
  { name: 'طباعي ضخم', fn: k => { const { p, mx } = k; return { bg: p.dark, objects: [
    k.txt(S.headline, { x: mx - 2, y: 6, w: 100 - 2 * mx + 4, s: 22, weight: 900, fill: p.accent, align: 'center', lh: 1, lines: 3 }),
    k.txt(S.sub, { x: mx, y: 40, w: 100 - 2 * mx, s: 6.5, fill: '#fff', align: 'center' }),
    k.hline(35, 48, 30, 0.5, p.accent),
    k.img(mx, 52, 100 - 2 * mx, 30, { rx: 1, fill: '#ffffff18', textFill: '#fff' }),
    k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 92, w: 100 - 2 * mx, s: 4.6, fill: p.accent, align: 'center', weight: 700 }),
  ] }; } },
  { name: 'هندسي', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.circle(100, 0, 40, p.accent), k.rect(0, 24, 60, 8, p.dark), k.circle(0, 100, 40, p.light),
    k.txt(S.company, { x: mx, y: 4, w: 60, s: 7, weight: 700, align: 'left' }),
    k.txt(S.headline, { x: mx, y: 36, w: 100 - 2 * mx, s: 13, weight: 900, lh: 1.1 }),
    k.txt(S.sub, { x: mx, y: 50, w: 100 - 2 * mx, s: 6, fill: p.accent, weight: 700 }),
    ...S.bullets.map((t, i) => k.txt('✓  ' + t, { x: mx, y: 58 + i * 5, w: 100 - 2 * mx, s: 5.5 })),
    k.rect(mx, 78, 100 - 2 * mx, 10, p.dark), k.txt(S.cta, { x: mx, y: 81, w: 100 - 2 * mx, s: 5.5, weight: 700, fill: '#fff', align: 'center' }),
    k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 92, w: 100 - 2 * mx, s: 4.4, fill: p.sub, align: 'center' }),
  ] }; } },
);

FAMILIES.letterhead.push(
  { name: 'سويسري', fn: k => { const { p, mx } = k; return { bg: '#fff', objects: [
    k.rect(mx, 4, 6, 1.2, p.accent),
    k.txt(S.company, { x: mx, y: 6, w: 50, s: 4.2, weight: 900, align: 'left' }),
    k.label(S.companyEn, { x: 55, y: 7, w: 45 - mx, align: 'right' }),
    k.hline(mx, 12, 100 - 2 * mx, 0.15, p.text),
    k.label('Ref', { x: mx, y: 15, w: 20 }), k.en('HT-2026-114', { x: mx, y: 18, w: 20, s: 2.8 }),
    k.label('Date', { x: mx + 22, y: 15, w: 20 }), k.en('09 / 10 / 2026', { x: mx + 22, y: 18, w: 20, s: 2.8 }),
    k.txt(S.letterSubject, { x: mx, y: 25, w: 100 - 2 * mx, s: 3.2, weight: 700 }),
    k.txt(S.letterBody, { x: mx, y: 30, w: 100 - 2 * mx, s: 2.9, lh: 1.7 }),
    k.hline(mx, 92, 100 - 2 * mx, 0.15, p.text),
    k.en(S.phone, { x: mx, y: 94, w: 30, s: 2.4, fill: p.sub }), k.en(S.email, { x: 35, y: 94, w: 30, s: 2.4, fill: p.sub, align: 'center' }), k.en(S.web, { x: 70 - mx, y: 94, w: 30, s: 2.4, fill: p.sub, align: 'right' }),
  ] }; } },
);

FAMILIES.badge.push(
  { name: 'هندسي حديث', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.circle(100, 0, 26, p.accent), k.rect(0, 0, 14, 100, p.dark),
    k.img(26, 14, 60, 30, { rx: 2 }),
    k.txt(S.name, { x: 20, y: 50, w: 74, s: 7, weight: 900, align: 'center' }),
    k.txt(S.role, { x: 20, y: 59, w: 74, s: 4.6, fill: p.accent, align: 'center', weight: 700 }),
    k.label(S.companyEn, { x: 20, y: 70, w: 74, align: 'center' }),
    k.en(S.idno, { x: 20, y: 84, w: 74, s: 4, fill: p.sub, align: 'center' }),
  ] }; } },
);

FAMILIES.sticker.push(
  { name: 'شارة عتيقة', fn: k => { const { p } = k; return { bg: p.bg, objects: [
    k.ring(50, 50, 44, p.dark, 1.2), k.ring(50, 50, 40, p.dark, 0.3), k.ring(50, 50, 30, p.accent, 0.4),
    k.label('★  Premium quality  ★', { x: 10, y: 14, w: 80, align: 'center', fill: p.dark }),
    k.txt(S.company, { x: 12, y: 38, w: 76, s: 9, weight: 700, font: 'Amiri', align: 'center' }),
    k.txt('منذ 2026', { x: 15, y: 55, w: 70, s: 4.5, fill: p.accent, align: 'center' }),
    k.label(S.web, { x: 10, y: 80, w: 80, align: 'center', fill: p.dark }),
  ] }; } },
  { name: 'نيون', fn: k => { const { p } = k; return { bg: '#0a0a0a', objects: [
    k.ring(50, 50, 42, p.accent, 1.5), k.ring(50, 50, 36, p.accent, 0.3),
    k.txt(S.company, { x: 15, y: 38, w: 70, s: 9, weight: 900, fill: p.accent, align: 'center' }),
    k.txt(S.slogan, { x: 15, y: 54, w: 70, s: 4.4, fill: '#fff', align: 'center' }),
  ] }; } },
);

FAMILIES.postcard.push(
  { name: 'طباعي', fn: k => { const { p, mx, my } = k; return { bg: p.accent, objects: [
    k.txt(S.thanks, { x: mx - 2, y: my, w: 100 - 2 * mx + 4, s: 30, weight: 900, fill: p.dark, align: 'center', lh: 1, lines: 2 }),
    k.txt(S.thanksBody, { x: mx + 6, y: 62, w: 100 - 2 * mx - 12, s: 4.2, fill: p.dark, align: 'center', lh: 1.6 }),
    k.label(S.companyEn + ' · ' + S.web, { x: mx, y: 88, w: 100 - 2 * mx, align: 'center', fill: p.dark }),
  ] }; } },
  { name: 'زخرفي', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.frame(mx - 2, my - 3, 100 - 2 * mx + 4, 100 - 2 * my + 6, p.accent, 0.4), ...k.corners(mx - 2, my - 3, 100 - 2 * mx + 4, 100 - 2 * my + 6, 2.2, p.accent),
    k.star8(50, 26, 6, p.accent), k.star8(50, 26, 3, p.bg),
    k.txt(S.thanks, { x: mx, y: 40, w: 100 - 2 * mx, s: 14, weight: 700, font: 'Amiri', align: 'center' }),
    k.txt(S.thanksBody, { x: mx + 8, y: 62, w: 100 - 2 * mx - 16, s: 4, fill: p.sub, align: 'center', lh: 1.6 }),
    k.txt(S.company, { x: mx, y: 84, w: 100 - 2 * mx, s: 4.4, fill: p.accent, weight: 700, align: 'center' }),
  ] }; } },
);

FAMILIES.mug.push(
  { name: 'خط عربي جريء', fn: k => { const { p } = k; return { bg: p.dark, objects: [
    k.txt(S.mug, { x: -2, y: 12, w: 104, s: 34, weight: 900, fill: p.accent, align: 'center', lh: 1 }),
    k.label(S.companyEn, { x: 10, y: 80, w: 80, align: 'center', fill: '#fff' }),
  ] }; } },
);
FAMILIES.tshirt.push(
  { name: 'خط عربي جريء', fn: k => { const { p } = k; return { bg: '#ffffff', objects: [
    k.txt(S.tshirt, { x: 2, y: 28, w: 96, s: 24, weight: 900, fill: p.dark, align: 'center', lh: 1 }),
    k.rect(20, 52, 60, 2.5, p.accent),
    k.txt(S.slogan, { x: 10, y: 58, w: 80, s: 6, fill: p.sub, align: 'center' }),
  ] }; } },
);

function templatesFor(prod) {
  const fam = FAMILIES[prod.family] || FAMILIES.card;
  const out = [];
  fam.forEach(l => PALETTES.forEach(p => out.push({
    id: l.name + '|' + p.name, name: l.name, palette: p.name, swatch: [p.dark, p.accent],
    build: (W, H, b) => l.fn(kit(W, H, b, p)),
  })));
  return out;
}
const TEMPLATE_COUNT = Object.fromEntries(Object.entries(PRODUCTS).map(([k, v]) => [k, (FAMILIES[v.family] || FAMILIES.card).length * PALETTES.length]));
