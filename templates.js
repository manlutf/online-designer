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

// Default sample content. S is mutated by the customer form in app.js; templates rebuild from it.
const DEFAULTS = {
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
  logoImg: null, photoImg: null,   // HTMLImageElement set by the form (logo / photo uploads)
};
const S = Object.assign({}, DEFAULTS);

// Which fields the simple form shows per product family (key → label). Order matters.
const FORM_FIELDS = {
  card:        [['company', 'اسم الشركة'], ['slogan', 'الشعار النصي'], ['name', 'الاسم'], ['title', 'المسمى الوظيفي'], ['phone', 'الجوال'], ['email', 'الإيميل'], ['web', 'الموقع'], ['address', 'العنوان']],
  badge:       [['company', 'اسم الشركة'], ['name', 'الاسم'], ['role', 'المسمى الوظيفي'], ['dept', 'القسم'], ['idno', 'رقم البطاقة']],
  poster:      [['company', 'اسم الشركة'], ['slogan', 'الشعار النصي'], ['headline', 'العنوان الرئيسي'], ['sub', 'العنوان الفرعي'], ['body', 'نص قصير'], ['cta', 'زر الدعوة'], ['date', 'التاريخ / المدة'], ['phone', 'الجوال'], ['email', 'الإيميل'], ['web', 'الموقع'], ['address', 'العنوان']],
  rollup:      [['company', 'اسم الشركة'], ['headline', 'العنوان الرئيسي'], ['sub', 'العنوان الفرعي'], ['body', 'نص قصير'], ['cta', 'زر الدعوة'], ['phone', 'الجوال'], ['web', 'الموقع']],
  brochure:    [['company', 'اسم الشركة'], ['slogan', 'الشعار النصي'], ['body', 'من نحن'], ['phone', 'الجوال'], ['email', 'الإيميل'], ['web', 'الموقع'], ['address', 'العنوان']],
  letterhead:  [['company', 'اسم الشركة'], ['companyEn', 'الاسم بالإنجليزي'], ['slogan', 'الشعار النصي'], ['letterSubject', 'موضوع الخطاب'], ['letterBody', 'نص الخطاب'], ['phone', 'الجوال'], ['email', 'الإيميل'], ['web', 'الموقع'], ['address', 'العنوان']],
  menu:        [['company', 'اسم المطعم'], ['menuTitle', 'عنوان القائمة'], ['phone', 'الجوال'], ['web', 'الموقع'], ['address', 'العنوان']],
  invitation:  [['inviteTitle', 'نوع المناسبة'], ['couple', 'الأسماء'], ['inviteLine', 'نص الدعوة'], ['eventDate', 'التاريخ'], ['eventTime', 'الوقت'], ['eventPlace', 'المكان'], ['company', 'اسم الجهة (للمناسبات الرسمية)']],
  certificate: [['company', 'اسم الجهة'], ['cert', 'عنوان الشهادة'], ['name', 'اسم المكرَّم'], ['certFor', 'سبب التكريم'], ['signer', 'التوقيع الأول'], ['signer2', 'التوقيع الثاني']],
  voucher:     [['company', 'اسم الشركة'], ['voucher', 'عنوان القسيمة'], ['amount', 'القيمة'], ['voucherNote', 'الشروط'], ['code', 'الكود']],
  postcard:    [['company', 'اسم الشركة'], ['thanks', 'العنوان'], ['thanksBody', 'الرسالة'], ['web', 'الموقع'], ['address', 'العنوان']],
  sticker:     [['company', 'اسم الشركة'], ['slogan', 'الشعار النصي'], ['web', 'الموقع']],
  mug:         [['mug', 'النص على الكوب'], ['company', 'اسم الشركة'], ['slogan', 'الشعار النصي']],
  tshirt:      [['tshirt', 'النص على التيشيرت'], ['company', 'اسم الشركة'], ['slogan', 'الشعار النصي'], ['web', 'الموقع']],
};
const LONG_FIELDS = ['body', 'letterBody', 'thanksBody', 'certFor', 'inviteLine', 'voucherNote'];


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
      if (S.photoImg) {   // cover-crop the customer's photo into the frame
        const el = S.photoImg, bw = X(w), bh = Y(h), sc = Math.max(bw / el.width, bh / el.height), cw = bw / sc, ch = bh / sc;
        return new fabric.Image(el, { left: X(x), top: Y(y), cropX: (el.width - cw) / 2, cropY: (el.height - ch) / 2, width: cw, height: ch, scaleX: sc, scaleY: sc, data: { photo: true } });
      }
      const r = new fabric.Rect({ left: 0, top: 0, width: X(w), height: Y(h), fill: o.fill || p.light, rx: (o.rx || 0) * u, ry: (o.rx || 0) * u });
      const t = new fabric.Textbox('📷 صورتك هنا', { left: 0, top: Y(h) / 2 - 2.2 * u, width: X(w), fontSize: Math.min(3.2 * u, X(w) / 9), fontFamily: 'Cairo', fill: o.textFill || p.sub, textAlign: 'center', direction: 'rtl' });
      return new fabric.Group([r, t], { left: X(x), top: Y(y), data: { placeholder: true } });
    },
    logo(cx, cy, r, fill, letter = 'A', textFill = '#fff') {
      if (S.logoImg) {   // customer logo, contained in the same box the letter-mark used
        const el = S.logoImg, box = 2 * r * u, sc = Math.min(box / el.width, box / el.height);
        return [new fabric.Image(el, { left: X(cx) - el.width * sc / 2, top: Y(cy) - el.height * sc / 2, scaleX: sc, scaleY: sc, data: { logo: true } })];
      }
      return [k.circle(cx, cy, r, fill, { data: { logo: true } }), new fabric.Textbox(letter, { left: X(cx) - r * u, top: Y(cy) - r * u * 0.72, width: 2 * r * u, fontSize: r * u * 1.2, fontFamily: p.fontEn, fontWeight: 700, fill: textFill, textAlign: 'center', data: { logo: true } })];
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

// ===== Premium layer (VistaPrint-grade research, Oct 2026) =====
// Icons, ribbons, waves, textures, motifs and photo-like placeholders shared by every family.
const ICONS = {
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z',
  mail: 'M3 6h18v12H3z M3 6l9 7 9-7',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18',
  pin: 'M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z M10 10a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  image: 'M3 5h18v14H3z M3 15l5-5 4 4 3-3 6 6 M15 8a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0',
  leaf: 'M50 95 C20 70 10 40 50 5 C90 40 80 70 50 95 Z M50 90 L50 35',
  blob1: 'M50 5 C75 0 100 20 95 50 C90 80 70 100 45 95 C20 90 0 70 5 45 C10 20 30 10 50 5 Z',
  blob2: 'M40 8 C70 -5 105 25 95 55 C88 80 60 105 30 92 C5 82 -5 50 10 28 C18 16 28 12 40 8 Z',
};
const SKYLINE = [[0, 100], [0, 60], [8, 60], [8, 45], [16, 45], [16, 70], [24, 70], [24, 30], [34, 30], [34, 55], [42, 55], [42, 20], [50, 20], [50, 40], [60, 40], [60, 65], [68, 65], [68, 50], [78, 50], [78, 35], [86, 35], [86, 60], [94, 60], [94, 75], [100, 75], [100, 100]];

const _kit = kit;
kit = function (W, H, b, p) {
  const k = _kit(W, H, b, p);
  const { u, X, Y } = k;
  const sh = (c = 'rgba(0,0,0,.18)', blur = 6, oy = 2) => new fabric.Shadow({ color: c, blur: blur * u, offsetX: 0, offsetY: oy * u });
  Object.assign(k, {
    sh,
    icon(name, x, y, size, color, o = {}) {   // stroke icon from a 24-box
      const path = new fabric.Path(ICONS[name], { fill: 'transparent', stroke: color, strokeWidth: 1.8, strokeLineCap: 'round', strokeLineJoin: 'round', ...o });
      const sc = (size * u) / 24; path.set({ scaleX: sc, scaleY: sc, left: X(x), top: Y(y) }); return path;
    },
    motif(name, x, y, size, fill, o = {}) {    // filled motif from a 100-box (leaf, blob)
      const path = new fabric.Path(ICONS[name], { fill, stroke: o.stroke || null, strokeWidth: o.strokeWidth || 0, ...o });
      const sc = (size * u) / 100; path.set({ scaleX: sc, scaleY: sc, left: X(x), top: Y(y) }); return path;
    },
    skyline(x, y, w, h, fill, o = {}) {
      return new fabric.Polygon(SKYLINE.map(([px, py]) => ({ x: X(x) + px / 100 * X(w), y: Y(y) + py / 100 * Y(h) })), { fill, ...o });
    },
    // icon + text contact rows (phone / mail / web). align 'left' puts icons at the start (LTR); 'right' mirrors.
    contactRows(x, y, w, s, fill, iconColor, align = 'left', items) {
      const rows = (items || [['phone', S.phone], ['mail', S.email], ['globe', S.web]]).filter(([, text]) => text && String(text).trim());
      const out = []; const lh = s * 2.1;
      rows.forEach(([ic, text], i) => {
        const yy = y + (lh * i) * u / H * 100, isz = s * 1.25;
        if (align === 'left') { out.push(k.icon(ic, x, yy + 0.2 * s * u / H * 100, isz, iconColor), k.en(text, { x: x + isz * 1.5 * u / W * 100, y: yy, w: w - isz * 1.5 * u / W * 100, s, fill })); }
        else { out.push(k.icon(ic, x + w - isz * u / W * 100, yy + 0.2 * s * u / H * 100, isz, iconColor), k.en(text, { x, y: yy, w: w - isz * 1.5 * u / W * 100, s, fill, align: 'right' })); }
      });
      return out;
    },
    ribbon(x, y, w, h, fill, dark) {   // banner with a folded end and soft shadow
      const r = new fabric.Rect({ left: X(x), top: Y(y), width: X(w), height: Y(h), fill, shadow: sh('rgba(0,0,0,.25)', 5, 2) });
      const fold = new fabric.Polygon([{ x: X(x), y: Y(y) + Y(h) }, { x: X(x) + 3 * u, y: Y(y) + Y(h) }, { x: X(x), y: Y(y) + Y(h) + 2.2 * u }], { fill: dark });
      return [fold, r];
    },
    wave(y, amp, fill, fromTop = true, o = {}) {   // area above (or below) a smooth wave edge
      const yy = Y(y), a = amp * u;
      const d = fromTop
        ? `M 0 0 L ${W} 0 L ${W} ${yy} C ${W * 0.75} ${yy - a} ${W * 0.25} ${yy + a} 0 ${yy} Z`
        : `M 0 ${H} L ${W} ${H} L ${W} ${yy} C ${W * 0.75} ${yy + a} ${W * 0.25} ${yy - a} 0 ${yy} Z`;
      return new fabric.Path(d, { fill, ...o });
    },
    hatch(x, y, w, h, gap, stroke, opacity = 0.35, t = 0.25) {   // diagonal texture clipped to a box
      const gw = X(w), gh = Y(h), items = [];
      for (let o = -gh; o < gw; o += gap * u) items.push(new fabric.Line([o, gh, o + gh, 0], { stroke, strokeWidth: t * u }));
      const g = new fabric.Group(items, { left: X(x), top: Y(y), opacity });
      g.clipPath = new fabric.Rect({ left: -gw / 2, top: -gh / 2, width: gw, height: gh }); return g;
    },
    logoTile(cx, cy, r, fill, letter, textFill = '#fff') {   // rounded-square mark, honours the uploaded logo
      if (S.logoImg) return k.logo(cx, cy, r, fill, letter);
      return [new fabric.Rect({ left: X(cx) - r * u, top: Y(cy) - r * u, width: 2 * r * u, height: 2 * r * u, rx: 0.45 * r * u, ry: 0.45 * r * u, fill, shadow: sh('rgba(0,0,0,.15)', 4, 1.5), data: { logo: true } }),
        new fabric.Textbox(letter, { left: X(cx) - r * u, top: Y(cy) - r * u * 0.72, width: 2 * r * u, fontSize: r * u * 1.2, fontFamily: p.fontEn, fontWeight: 700, fill: textFill, textAlign: 'center', data: { logo: true } })];
    },
  });
  // contacts(): icon rows as one group so every existing layout gets icons for free
  k.contacts = (x, y, w, s, fill, o = {}) => {
    const align = o.align === 'right' ? 'right' : 'left';
    const g = new fabric.Group(k.contactRows(x, y, w, s * 0.95, fill, o.iconColor || p.accent, align), { data: { contacts: true } });
    return g;
  };
  // photo placeholder: stylised "art" so thumbnails look designed, swapped for the customer's photo
  const baseImg = k.img;
  k.img = (x, y, w, h, o = {}) => {
    if (S.photoImg) return baseImg(x, y, w, h, o);
    const gw = X(w), gh = Y(h), items = [
      new fabric.Rect({ left: 0, top: 0, width: gw, height: gh, fill: o.fill || p.light, rx: (o.rx || 0) * u, ry: (o.rx || 0) * u }),
      new fabric.Circle({ left: gw * 0.55, top: -gh * 0.35, radius: gh * 0.55, fill: p.accent, opacity: 0.22 }),
      new fabric.Circle({ left: -gw * 0.15, top: gh * 0.45, radius: gh * 0.5, fill: p.dark, opacity: 0.12 }),
    ];
    const ic = new fabric.Path(ICONS.image, { fill: 'transparent', stroke: o.textFill || p.sub, strokeWidth: 1.6, strokeLineCap: 'round', strokeLineJoin: 'round' });
    const isz = Math.min(gw, gh) * 0.22; ic.set({ scaleX: isz / 24, scaleY: isz / 24, left: gw / 2 - isz / 2, top: gh / 2 - isz / 2 - gh * 0.04 });
    items.push(ic, new fabric.Textbox(t('صورتك'), { left: 0, top: gh / 2 + isz / 2, width: gw, fontSize: Math.min(2.6 * u, gw / 10), fontFamily: 'Cairo', fill: o.textFill || p.sub, textAlign: 'center', direction: 'rtl' }));
    const g = new fabric.Group(items, { left: X(x), top: Y(y), data: { placeholder: true } });
    g.clipPath = new fabric.Rect({ left: -gw / 2, top: -gh / 2, width: gw, height: gh, rx: (o.rx || 0) * u, ry: (o.rx || 0) * u });
    return g;
  };
  return k;
};

// ---- premium business-card layouts (shown first in the gallery)
FAMILIES.card.unshift(
  { name: 'شريط ساتان', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.rect(0, 0, 9, 100, p.light), k.hatch(0, 0, 9, 100, 2.2, p.sub, 0.25),
    k.txt(S.name, { x: 14, y: my + 6, w: 86 - mx, s: 10, weight: 700, fill: p.accent, align: 'left' }),
    k.txt(S.title, { x: 14, y: my + 20, w: 86 - mx, s: 4.6, fill: p.sub, align: 'left' }),
    ...k.ribbon(11, 40, 89, 16, p.accent, p.dark),
    k.txt(S.company, { x: 14, y: 43, w: 86 - mx, s: 7, weight: 700, fill: '#fff' }),
    k.txt(S.slogan, { x: 14, y: 58, w: 86 - mx, s: 3.8, fill: p.sub }),
    ...k.contactRows(14, 68, 42, 3.4, p.sub, p.accent, 'left'),
    k.txt(S.address, { x: 56, y: 68, w: 44 - mx, s: 3.4, fill: p.sub }),
  ] }; } },
  { name: 'موجة لامعة', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.wave(38, 7, p.dark, true), k.wave(34, 7, p.accent, true, { opacity: 0.85 }),
    k.txt(S.company, { x: mx, y: my + 4, w: 100 - 2 * mx, s: 7.5, weight: 700, fill: '#fff' }),
    k.txt(S.slogan, { x: mx, y: my + 16, w: 100 - 2 * mx, s: 3.8, fill: '#ffffffcc' }),
    k.txt(S.name, { x: mx, y: 50, w: 100 - 2 * mx, s: 8, weight: 700 }),
    k.txt(S.title, { x: mx, y: 62, w: 100 - 2 * mx, s: 4.2, fill: p.accent }),
    ...k.contactRows(mx, 74, 46, 3.3, p.sub, p.accent, 'left'),
    k.txt(S.address, { x: 50, y: 74, w: 50 - mx, s: 3.3, fill: p.sub }),
  ] }; } },
  { name: 'بلاطة الشعار', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.rect(0, 0, 38, 100, p.dark),
    ...k.logoTile(19, 42, 10, p.accent, 'H'),
    k.txt(S.company, { x: 3, y: 62, w: 32, s: 5.2, weight: 700, fill: '#fff', align: 'center' }),
    k.txt(S.slogan, { x: 3, y: 73, w: 32, s: 3.2, fill: p.accent, align: 'center' }),
    k.txt(S.name, { x: 43, y: my + 8, w: 57 - mx, s: 9, weight: 700 }),
    k.txt(S.title, { x: 43, y: my + 21, w: 57 - mx, s: 4.4, fill: p.accent }),
    k.hline(100 - mx - 14, my + 32, 14, 0.6, p.light),
    ...k.contactRows(43, 50, 57 - mx, 3.4, p.sub, p.accent, 'right'),
  ] }; } },
  { name: 'إطار وكتلة', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.frame(mx - 2, my - 2, 100 - 2 * mx + 4, 36, p.dark, 0.5),
    k.txt(S.company, { x: mx, y: my + 7, w: 100 - 2 * mx, s: 6.5, weight: 700, align: 'center', }),
    k.rect(mx - 2, my + 38, 100 - 2 * mx + 4, 100 - 2 * my - 36, p.dark),
    k.txt(S.name, { x: mx + 2, y: my + 43, w: 50, s: 6.5, weight: 700, fill: '#fff', align: 'left' }),
    k.txt(S.title, { x: mx + 2, y: my + 54, w: 50, s: 3.6, fill: p.accent, align: 'left' }),
    k.en(S.phone + '\n' + S.email, { x: mx + 2, y: my + 64, w: 50, s: 3.2, fill: '#e5e7eb', lh: 1.5 }),
    k.en(S.web.toUpperCase(), { x: 52, y: my + 44, w: 48 - mx - 2, s: 3.2, fill: '#fff', align: 'right', charSpacing: 120 }),
    k.txt(S.address, { x: 52, y: my + 54, w: 48 - mx - 2, s: 3.2, fill: '#e5e7eb' }),
  ] }; } },
  { name: 'نصف صورة', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.img(0, 0, 46, 100),
    k.rect(46, 0, 1.2, 100, p.accent),
    ...k.logoTile(56, my + 12, 5, p.accent, 'H'),
    k.txt(S.company, { x: 62, y: my + 7, w: 38 - mx, s: 4.4, weight: 700 }),
    k.txt(S.name, { x: 51, y: 38, w: 49 - mx, s: 7.5, weight: 700 }),
    k.txt(S.title, { x: 51, y: 50, w: 49 - mx, s: 3.8, fill: p.sub }),
    ...k.contactRows(51, 62, 49 - mx, 3.1, p.sub, p.accent, 'right'),
  ] }; } },
  { name: 'ورق كرافت', fn: k => { const { p, mx, my } = k; return { bg: '#efe6d8', objects: [
    k.hatch(0, 0, 100, 100, 1.6, '#b9a98f', 0.18, 0.2),
    k.frame(mx - 1, my - 2, 100 - 2 * mx + 2, 100 - 2 * my + 4, '#5b4a36', 0.6, { strokeDashArray: [4, 3] }),
    k.motif('leaf', 100 - mx - 14, my + 2, 13, '#7a8c5a', { opacity: 0.9 }),
    k.txt(S.company, { x: mx, y: my + 8, w: 70, s: 7.5, weight: 700, fill: '#3f3324', align: 'left', font: 'Amiri' }),
    k.txt(S.slogan, { x: mx, y: my + 22, w: 70, s: 3.6, fill: '#7a6a55', align: 'left' }),
    k.hline(mx, 48, 30, 0.5, '#7a8c5a'),
    k.txt(S.name + '  ·  ' + S.title, { x: mx, y: 54, w: 100 - 2 * mx, s: 4.2, fill: '#3f3324', align: 'left' }),
    ...k.contactRows(mx, 66, 50, 3.3, '#7a6a55', '#7a8c5a', 'left'),
    k.txt(S.address, { x: 55, y: 66, w: 45 - mx, s: 3.3, fill: '#7a6a55' }),
  ] }; } },
  { name: 'أفق المدينة', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.rect(0, 62, 100, 38, p.dark), k.skyline(0, 40, 100, 24, p.dark, { opacity: 0.9 }), k.rect(0, 62, 100, 0.8, p.accent),
    ...k.logoTile(mx + 6, my + 10, 6, p.accent, 'H'),
    k.txt(S.company, { x: mx + 14, y: my + 5, w: 60, s: 5.5, weight: 700, align: 'left' }),
    k.txt(S.slogan, { x: mx + 14, y: my + 14, w: 60, s: 3.4, fill: p.sub, align: 'left' }),
    k.txt(S.name, { x: mx, y: 68, w: 60, s: 6.5, weight: 700, fill: '#fff', align: 'left' }),
    k.txt(S.title, { x: mx, y: 79, w: 60, s: 3.6, fill: p.accent, align: 'left' }),
    k.en(S.phone + '\n' + S.web, { x: 58, y: 70, w: 42 - mx, s: 3.3, fill: '#e5e7eb', align: 'right', lh: 1.5 }),
  ] }; } },
  { name: 'أوراق خضراء', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.motif('blob1', -10, -30, 48, p.light), k.motif('blob2', 70, 55, 44, p.accent, { opacity: 0.18 }),
    k.motif('leaf', 84, 6, 11, p.accent), k.motif('leaf', 90, 16, 8, p.dark, { opacity: 0.7, angle: 35 }),
    k.txt(S.company, { x: mx, y: my + 6, w: 60, s: 6.5, weight: 700, align: 'left' }),
    k.txt(S.slogan, { x: mx, y: my + 17, w: 60, s: 3.6, fill: p.accent, align: 'left' }),
    k.txt(S.name, { x: mx, y: 46, w: 100 - 2 * mx, s: 8, weight: 700, align: 'left' }),
    k.txt(S.title, { x: mx, y: 58, w: 100 - 2 * mx, s: 4, fill: p.sub, align: 'left' }),
    ...k.contactRows(mx, 72, 48, 3.3, p.sub, p.accent, 'left'),
    k.txt(S.address, { x: 52, y: 72, w: 48 - mx, s: 3.3, fill: p.sub }),
  ] }; } },
  { name: 'أيقونات أنيقة', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.rect(0, 0, 100, 3, p.accent),
    k.txt(S.name, { x: mx, y: my + 8, w: 100 - 2 * mx, s: 10, weight: 700 }),
    k.txt(S.title, { x: mx, y: my + 23, w: 100 - 2 * mx, s: 4.4, fill: p.accent }),
    k.hline(mx, 48, 100 - 2 * mx, 0.3, p.light),
    ...k.contactRows(mx, 54, 44, 3.4, p.sub, p.accent, 'left'),
    k.icon('pin', 100 - mx - 4.2, 54.3, 4.2, p.accent), k.txt(S.address, { x: 50, y: 54, w: 50 - mx - 6, s: 3.4, fill: p.sub }),
    k.txt(S.company, { x: 50, y: 70, w: 50 - mx, s: 4.4, weight: 700, fill: p.dark }),
  ] }; } },
);

// ---- premium flyer layouts
FAMILIES.poster.unshift(
  { name: 'موجة البطل', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.img(0, 0, 100, 46), k.wave(46, 5, p.bg, false, {}), k.wave(44, 5, p.accent, false, { opacity: 0.9 }), k.rect(0, 50, 100, 50, p.bg),
    k.txt(S.headline, { x: mx, y: 54, w: 100 - 2 * mx, s: 11, weight: 900, lh: 1.1, lines: 2 }),
    k.txt(S.sub, { x: mx, y: 68, w: 100 - 2 * mx, s: 5, fill: p.accent, weight: 700 }),
    k.txt(S.body, { x: mx, y: 75, w: 100 - 2 * mx, s: 3.8, fill: p.sub, lh: 1.5 }),
    ...k.button(100 - mx - 34, 86, 34, 6.5, S.cta, p.dark, '#fff', 4.6),
    ...k.contactRows(mx, 86, 40, 3, p.sub, p.accent, 'left', [['phone', S.phone], ['globe', S.web]]),
  ] }; } },
  { name: 'شريط ساتان', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.img(mx, 6, 100 - 2 * mx, 34, { rx: 2 }),
    ...k.ribbon(mx - 2, 36, 100 - 2 * mx + 4, 9, p.accent, p.dark),
    k.txt(S.headline, { x: mx + 2, y: 37.5, w: 100 - 2 * mx - 4, s: 6, weight: 700, fill: '#fff' }),
    k.txt(S.sub, { x: mx, y: 50, w: 100 - 2 * mx, s: 5.2, weight: 700 }),
    k.txt(S.body, { x: mx, y: 57, w: 100 - 2 * mx, s: 3.8, fill: p.sub, lh: 1.55 }),
    ...S.bullets.map((b, i) => k.txt('✓  ' + b, { x: mx, y: 69 + i * 5.5, w: 100 - 2 * mx, s: 4 })),
    k.rect(0, 90, 100, 10, p.dark),
    ...k.contactRows(mx, 92.5, 60, 3.2, '#fff', p.accent, 'left', [['phone', S.phone], ['globe', S.web]]).slice(0, 2),
    k.icon('globe', 50, 92.7, 4, p.accent), k.en(S.web, { x: 55, y: 92.5, w: 45 - mx, s: 3.2, fill: '#fff' }),
  ] }; } },
);

// ===== Premium layer 2: every other product family (VistaPrint flyers / invitations / postcards / banners research) =====
const _kit2 = kit;
kit = function (W, H, b, p) {
  const k = _kit2(W, H, b, p);
  const { u, X, Y } = k;
  const rnd = seed => () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  Object.assign(k, {
    confetti(x, y, w, h, n, colors, seed = 7) {   // deterministic gold specks
      const r = rnd(seed), items = [];
      for (let i = 0; i < n; i++) { const s = (0.5 + r() * 1.2) * u; items.push(new fabric.Circle({ left: r() * X(w), top: r() * Y(h), radius: s, fill: colors[i % colors.length], opacity: 0.55 + r() * 0.45 })); }
      return new fabric.Group(items, { left: X(x), top: Y(y) });
    },
    qr(x, y, size, fg, bg, seed = 3) {   // QR-looking placeholder block (replaced by a real QR at order time)
      const n = 21, cell = size * u / n, r = rnd(seed), items = [new fabric.Rect({ left: 0, top: 0, width: size * u, height: size * u, fill: bg })];
      const finder = (cx, cy) => { items.push(new fabric.Rect({ left: cx * cell, top: cy * cell, width: 7 * cell, height: 7 * cell, fill: fg }), new fabric.Rect({ left: (cx + 1) * cell, top: (cy + 1) * cell, width: 5 * cell, height: 5 * cell, fill: bg }), new fabric.Rect({ left: (cx + 2) * cell, top: (cy + 2) * cell, width: 3 * cell, height: 3 * cell, fill: fg })); };
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const inF = (i < 8 && j < 8) || (i < 8 && j > n - 9) || (i > n - 9 && j < 8); if (!inF && r() > 0.55) items.push(new fabric.Rect({ left: j * cell, top: i * cell, width: cell, height: cell, fill: fg })); }
      finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
      return new fabric.Group(items, { left: X(x), top: Y(y), data: { qr: true } });
    },
    collage(x, y, w, h, cols, rows, gap = 1.2) {   // grid of photo frames
      const out = [], gw = (w - gap * (cols - 1) * u / W * 100) / cols, gh = (h - gap * (rows - 1) * u / H * 100) / rows;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) out.push(k.img(x + c * (gw + gap * u / W * 100), y + r * (gh + gap * u / H * 100), gw, gh));
      return out;
    },
    wreath(cx, cy, r, fill, n = 14, seed = 5) {   // ring of leaves (botanical wreath)
      const items = [], rr = rnd(seed);
      for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, lx = Math.cos(a) * r * u, ly = Math.sin(a) * r * u; const leaf = new fabric.Path(ICONS.leaf, { fill, opacity: 0.75 + rr() * 0.25, originX: 'center', originY: 'center' }); const sc = (0.62 + rr() * 0.16) * r * u / 100; leaf.set({ scaleX: sc, scaleY: sc, left: lx, top: ly, angle: a * 180 / Math.PI + 90 }); items.push(leaf); }
      return new fabric.Group(items, { left: X(cx) - r * u * 1.15, top: Y(cy) - r * u * 1.15 });
    },
    script(text, o = {}) { return k.txt(text, { font: 'Aref Ruqaa', ...o }); },
    scriptEn(text, o = {}) { return k.en(text, { font: 'Great Vibes', ...o }); },
  });
  return k;
};

// ---------- flyers / posters ----------
FAMILIES.poster.unshift(
  { name: 'كولاج صور', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    ...k.collage(0, 0, 100, 44, 3, 1, 0.8),
    k.rect(mx, 38, 100 - 2 * mx, 24, '#fff', { shadow: k.sh('rgba(0,0,0,.14)', 6, 2) }),
    k.txt(S.company, { x: mx + 3, y: 41, w: 100 - 2 * mx - 6, s: 6.5, weight: 700, align: 'center' }),
    k.txt(S.slogan, { x: mx + 3, y: 50, w: 100 - 2 * mx - 6, s: 3.6, fill: p.accent, align: 'center' }),
    k.en(S.phone + '  ·  ' + S.web, { x: mx + 3, y: 56, w: 100 - 2 * mx - 6, s: 3, fill: p.sub, align: 'center' }),
    k.txt(S.headline, { x: mx, y: 67, w: 100 - 2 * mx, s: 9, weight: 900, lines: 2 }),
    k.txt(S.body, { x: mx, y: 79, w: 100 - 2 * mx, s: 3.6, fill: p.sub, lh: 1.5 }),
    ...k.button(100 - mx - 30, 90, 30, 6, S.cta, p.accent, '#fff', 4.2),
  ] }; } },
  { name: 'عمود من نحن', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.rect(50, 0, 50, 100, p.dark),
    k.img(mx, 8, 44 - mx, 56),
    k.en('&', { x: mx, y: 62, w: 44 - mx, s: 26, font: 'Playfair Display', fill: p.accent, align: 'center' }),
    k.txt(S.company, { x: mx, y: 88, w: 44 - mx, s: 4.2, weight: 700, align: 'center' }),
    k.txt('من نحن', { x: 54, y: 10, w: 42 - mx, s: 7, weight: 700, fill: '#fff' }),
    k.hline(100 - mx - 12, 20, 12, 0.5, p.accent),
    k.txt(S.body, { x: 54, y: 24, w: 42 - mx, s: 3.6, fill: '#e5e7eb', lh: 1.65 }),
    ...S.bullets.map((b, i) => k.txt('✓  ' + b, { x: 54, y: 52 + i * 6, w: 42 - mx, s: 3.6, fill: '#fff' })),
    ...k.contactRows(54, 78, 42 - mx, 3.1, '#e5e7eb', p.accent, 'right'),
  ] }; } },
  { name: 'إكليل الشكر', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.wreath(50, 30, 20, p.accent, 16), k.wreath(50, 30, 20, p.dark, 8, 11),
    k.script(S.headline, { x: mx, y: 22, w: 100 - 2 * mx, s: 10, fill: p.dark, align: 'center', lines: 2 }),
    k.label(S.companyEn, { x: mx, y: 56, w: 100 - 2 * mx, align: 'center', fill: p.accent }),
    k.txt(S.body, { x: mx + 8, y: 61, w: 100 - 2 * mx - 16, s: 3.8, fill: p.sub, align: 'center', lh: 1.6 }),
    k.txt(S.date, { x: mx, y: 76, w: 100 - 2 * mx, s: 4.4, weight: 700, align: 'center' }),
    k.txt(S.address, { x: mx, y: 82, w: 100 - 2 * mx, s: 3.4, fill: p.sub, align: 'center' }),
    k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 91, w: 100 - 2 * mx, s: 3.2, fill: p.sub, align: 'center' }),
  ] }; } },
  { name: 'كتلة العنوان', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.rect(mx - 2, 6, 100 - 2 * mx + 4, 50, p.dark, { shadow: k.sh('rgba(0,0,0,.2)', 8, 3) }),
    k.en('HEADLINE', { x: mx + 2, y: 11, w: 100 - 2 * mx - 4, s: 4, fill: p.accent, charSpacing: 400 }),
    k.txt(S.headline, { x: mx + 2, y: 18, w: 100 - 2 * mx - 4, s: 11, weight: 900, fill: '#fff', align: 'left', lines: 3, lh: 1.1 }),
    k.txt(S.sub, { x: mx + 2, y: 46, w: 100 - 2 * mx - 4, s: 3.8, fill: '#d1d5db', align: 'left' }),
    k.label(S.companyEn, { x: mx, y: 62, w: 60 }),
    k.txt(S.company, { x: mx, y: 66, w: 100 - 2 * mx, s: 6, weight: 700, align: 'left' }),
    k.txt(S.body, { x: mx, y: 74, w: 100 - 2 * mx, s: 3.6, fill: p.sub, align: 'left', lh: 1.55 }),
    ...k.contactRows(mx, 86, 55, 3.1, p.sub, p.accent, 'left'),
    k.qr(100 - mx - 14, 84, 14, p.dark, '#fff'),
  ] }; } },
);

// ---------- invitations ----------
FAMILIES.invitation.unshift(
  { name: 'صورة الذكرى', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.img(0, 0, 100, 62),
    k.label(S.inviteTitle === 'دعوة زفاف' ? 'Save the date' : 'Invitation', { x: mx, y: 66, w: 100 - 2 * mx, align: 'center', fill: p.accent }),
    k.txt(S.couple, { x: mx, y: 71, w: 100 - 2 * mx, s: 10, font: 'Amiri', weight: 700, align: 'center' }),
    k.txt(S.eventDate + '  ·  ' + S.eventTime, { x: mx, y: 84, w: 100 - 2 * mx, s: 3.8, fill: p.sub, align: 'center' }),
    k.txt(S.eventPlace, { x: mx, y: 90, w: 100 - 2 * mx, s: 3.6, fill: p.sub, align: 'center' }),
  ] }; } },
  { name: 'جالا كحلي', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
    k.frame(mx - 2, my - 2, 100 - 2 * mx + 4, 100 - 2 * my + 4, p.accent, 0.25),
    k.label('Please join us at', { x: mx, y: 20, w: 100 - 2 * mx, align: 'center', fill: '#cbd5e1' }),
    k.script(S.inviteTitle, { x: mx, y: 26, w: 100 - 2 * mx, s: 12, fill: '#fff', align: 'center' }),
    k.txt(S.couple, { x: mx, y: 45, w: 100 - 2 * mx, s: 7, font: 'Amiri', fill: p.accent, align: 'center' }),
    k.hline(44, 56, 12, 0.3, p.accent),
    k.txt(S.eventDate + '\n' + S.eventTime, { x: mx, y: 60, w: 100 - 2 * mx, s: 4, fill: '#e5e7eb', align: 'center', lh: 1.7 }),
    k.txt(S.eventPlace, { x: mx, y: 76, w: 100 - 2 * mx, s: 4, fill: '#e5e7eb', align: 'center' }),
    k.label('RSVP ' + S.phone, { x: mx, y: 88, w: 100 - 2 * mx, align: 'center', fill: '#94a3b8' }),
  ] }; } },
  { name: 'كونفيتي ذهبي', fn: k => { const { p, mx } = k; return { bg: '#fffdf8', objects: [
    k.confetti(0, 0, 100, 22, 90, [p.accent, '#e9d8a6', p.dark], 3), k.confetti(0, 78, 100, 22, 90, [p.accent, '#e9d8a6', p.dark], 9),
    k.scriptEn('Join us', { x: mx, y: 28, w: 100 - 2 * mx, s: 16, fill: p.dark, align: 'center' }),
    k.script(S.inviteTitle, { x: mx, y: 46, w: 100 - 2 * mx, s: 8, fill: p.accent, align: 'center' }),
    k.txt(S.couple, { x: mx, y: 56, w: 100 - 2 * mx, s: 7, font: 'Amiri', weight: 700, align: 'center' }),
    k.txt(S.eventDate + '  ·  ' + S.eventTime, { x: mx, y: 67, w: 100 - 2 * mx, s: 3.8, fill: p.sub, align: 'center' }),
    k.txt(S.eventPlace, { x: mx, y: 73, w: 100 - 2 * mx, s: 3.6, fill: p.sub, align: 'center' }),
  ] }; } },
  { name: 'حدث جريء', fn: k => { const { p, mx } = k; return { bg: p.dark, objects: [
    k.label('Please join us at', { x: mx, y: 14, w: 100 - 2 * mx, align: 'center', fill: p.accent }),
    k.txt(S.inviteTitle, { x: mx, y: 20, w: 100 - 2 * mx, s: 14, weight: 900, fill: '#fff', align: 'center', lines: 2, lh: 1.05 }),
    k.txt(S.company, { x: mx, y: 42, w: 100 - 2 * mx, s: 4, fill: p.accent, align: 'center' }),
    k.txt(S.eventDate, { x: mx, y: 52, w: 100 - 2 * mx, s: 8, weight: 900, fill: '#fff', align: 'center' }),
    k.txt(S.eventTime, { x: mx, y: 62, w: 100 - 2 * mx, s: 6, weight: 700, fill: p.accent, align: 'center' }),
    k.txt(S.eventPlace, { x: mx, y: 74, w: 100 - 2 * mx, s: 3.8, fill: '#e5e7eb', align: 'center' }),
    k.en(S.phone, { x: mx, y: 86, w: 100 - 2 * mx, s: 3.4, fill: '#94a3b8', align: 'center' }),
  ] }; } },
  { name: 'أوراق داكنة', fn: k => { const { p, mx, my } = k; return { bg: '#14241f', objects: [
    k.motif('leaf', -4, -2, 24, '#2f5d4a', { angle: -20 }), k.motif('leaf', 78, 80, 26, '#2f5d4a', { angle: 160 }), k.motif('leaf', 84, -4, 16, p.accent, { opacity: 0.9, angle: 30 }),
    k.script(S.inviteTitle, { x: mx, y: 24, w: 100 - 2 * mx, s: 11, fill: '#fff', align: 'center' }),
    k.txt(S.couple, { x: mx, y: 42, w: 100 - 2 * mx, s: 7.5, font: 'Amiri', fill: p.accent, align: 'center' }),
    k.txt(S.inviteLine, { x: mx + 4, y: 54, w: 100 - 2 * mx - 8, s: 3.6, fill: '#d1d5db', align: 'center', lh: 1.6 }),
    k.txt(S.eventDate + '  ·  ' + S.eventTime, { x: mx, y: 70, w: 100 - 2 * mx, s: 3.8, fill: '#fff', align: 'center' }),
    k.txt(S.eventPlace, { x: mx, y: 77, w: 100 - 2 * mx, s: 3.6, fill: '#d1d5db', align: 'center' }),
  ] }; } },
);

// ---------- roll-ups ----------
FAMILIES.rollup.unshift(
  { name: 'صورة وكود', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.rect(0, 0, 100, 22, p.dark),
    k.txt(S.headline, { x: mx, y: 5, w: 100 - 2 * mx, s: 11, weight: 900, fill: '#fff', lines: 2, lh: 1.1 }),
    k.txt(S.sub, { x: mx, y: 16, w: 100 - 2 * mx, s: 5, fill: p.accent }),
    k.img(0, 22, 100, 40),
    k.txt(S.body, { x: mx, y: 65, w: 100 - 2 * mx, s: 4.6, fill: p.sub, lh: 1.5 }),
    ...S.bullets.map((t, i) => k.txt('✓  ' + t, { x: mx, y: 73 + i * 4.2, w: 100 - 2 * mx, s: 4.6 })),
    k.qr(mx, 86, 11, p.dark, '#fff'),
    ...k.contactRows(mx + 14, 87, 60, 3.6, p.sub, p.accent, 'left', [['phone', S.phone], ['globe', S.web]]),
  ] }; } },
  { name: 'امسح الكود', fn: k => { const { p, mx } = k; return { bg: p.dark, objects: [
    ...k.logoTile(50, 7, 7, p.accent, 'H'),
    k.txt(S.company, { x: mx, y: 12, w: 100 - 2 * mx, s: 6.5, weight: 700, fill: '#fff', align: 'center' }),
    k.rect(18, 24, 64, 30, '#fff', { rx: 2 * k.u, ry: 2 * k.u }), k.qr(22, 25.5, 56, p.dark, '#fff'),
    k.en('SCAN ME', { x: mx, y: 58, w: 100 - 2 * mx, s: 12, weight: 700, fill: p.accent, align: 'center', charSpacing: 150 }),
    k.txt(S.headline, { x: mx, y: 66, w: 100 - 2 * mx, s: 7, weight: 700, fill: '#fff', align: 'center' }),
    k.txt(S.body, { x: mx + 6, y: 73, w: 100 - 2 * mx - 12, s: 4.2, fill: '#d1d5db', align: 'center', lh: 1.5 }),
    k.rect(0, 88, 100, 12, p.accent),
    k.en(S.web + '  ·  ' + S.phone, { x: mx, y: 92.5, w: 100 - 2 * mx, s: 4.4, fill: p.dark, align: 'center', weight: 700 }),
  ] }; } },
  { name: 'تخفيضات الموسم', fn: k => { const { p, mx } = k; return { bg: '#fbf6ee', objects: [
    k.frame(mx - 2, 3, 100 - 2 * mx + 4, 94, p.dark, 0.3),
    k.label(S.companyEn, { x: mx, y: 7, w: 100 - 2 * mx, align: 'center', fill: p.sub }),
    k.txt(S.headline, { x: mx, y: 11, w: 100 - 2 * mx, s: 12, weight: 900, align: 'center', lines: 3, lh: 1.05 }),
    k.motif('leaf', 30, 36, 14, p.accent, { angle: -30 }), k.motif('leaf', 44, 33, 16, p.dark), k.motif('leaf', 60, 36, 14, p.accent, { angle: 30 }),
    k.txt(S.sub, { x: mx, y: 56, w: 100 - 2 * mx, s: 6, weight: 700, fill: p.accent, align: 'center' }),
    k.img(mx + 8, 63, 100 - 2 * mx - 16, 20, { rx: 1 }),
    k.txt(S.company, { x: mx, y: 86, w: 100 - 2 * mx, s: 5, weight: 700, align: 'center' }),
    k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 92, w: 100 - 2 * mx, s: 4, fill: p.sub, align: 'center' }),
  ] }; } },
);

// ---------- menu ----------
FAMILIES.menu.unshift(
  { name: 'أطباق مصوّرة', fn: k => { const { p, mx } = k; const o = [
    k.rect(0, 0, 100, 14, p.dark), k.txt(S.menuTitle, { x: mx, y: 3, w: 100 - 2 * mx, s: 7.5, weight: 700, fill: '#fff', align: 'center' }), k.txt(S.company, { x: mx, y: 10, w: 100 - 2 * mx, s: 2.8, fill: p.accent, align: 'center' })];
    S.menu.slice(0, 6).forEach(([n, pr], i) => { const col = i % 2, row = Math.floor(i / 2), x = col ? mx : 51, w = 49 - mx, y = 18 + row * 24;
      o.push(k.img(x, y, w, 13, { rx: 1 }), k.txt(n, { x, y: y + 14, w: w - 10, s: 3.6, weight: 700 }), k.en(pr, { x: x + w - 10, y: y + 14, w: 10, s: 3.6, fill: p.accent, weight: 700, align: 'right' }), k.txt('وصف قصير للصنف ومكوناته', { x, y: y + 18.5, w, s: 2.4, fill: p.sub })); });
    o.push(k.rect(0, 92, 100, 8, p.accent), k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 94.5, w: 100 - 2 * mx, s: 2.6, fill: '#fff', align: 'center' }));
    return { bg: p.bg, objects: o }; } },
  { name: 'شريط صور جانبي', fn: k => { const { p, mx } = k; const o = [k.img(0, 0, 30, 33), k.img(0, 33.5, 30, 33), k.img(0, 67, 30, 33),
    k.txt(S.menuTitle, { x: 34, y: 6, w: 66 - mx, s: 7.5, weight: 700 }), k.hline(100 - mx - 14, 15, 14, 0.5, p.accent)];
    S.menu.forEach(([n, pr], i) => { const y = 20 + i * 8.2; o.push(k.txt(n, { x: 50, y, w: 50 - mx, s: 3.8, weight: 700 }), k.en(pr, { x: 34, y, w: 12, s: 3.8, fill: p.accent, weight: 700 }), k.txt('وصف قصير للصنف', { x: 50, y: y + 4, w: 50 - mx, s: 2.4, fill: p.sub }), k.hline(34, y + 7.2, 66 - mx, 0.12, p.light)); });
    o.push(...k.contactRows(34, 90, 60, 2.6, p.sub, p.accent, 'left', [['phone', S.phone], ['globe', S.web]]));
    return { bg: p.bg, objects: o }; } },
);

// ---------- brochure ----------
FAMILIES.brochure.unshift(
  { name: 'كولاج الغلاف', fn: k => { const { p, my } = k; return { bg: p.bg, objects: [
    k.img(66.7, 0, 33.3, 52), ...k.collage(66.7, 52.5, 33.3, 20, 2, 1, 0.6),
    k.rect(66.7, 73, 33.3, 27, p.dark), k.txt(S.company, { x: 69, y: 76, w: 28, s: 6.5, weight: 700, fill: '#fff' }), k.txt(S.slogan, { x: 69, y: 88, w: 28, s: 3.6, fill: p.accent }),
    k.txt('من نحن', { x: 36, y: my + 6, w: 28, s: 6, weight: 700 }), k.hline(55, my + 15, 9, 0.5, p.accent),
    k.txt(S.body, { x: 36, y: my + 20, w: 28, s: 3.4, fill: p.sub, lh: 1.6 }),
    ...S.bullets.map((t, i) => k.txt('✓  ' + t, { x: 36, y: 60 + i * 8, w: 28, s: 3.6 })),
    k.txt('تواصل معنا', { x: 3, y: my + 6, w: 28, s: 6, weight: 700 }), k.hline(22, my + 15, 9, 0.5, p.accent),
    ...k.contactRows(3, my + 22, 28, 3.2, p.sub, p.accent, 'right'),
    k.txt(S.address, { x: 3, y: 58, w: 28, s: 3.2, fill: p.sub }), k.qr(3, 70, 14, p.dark, '#fff'),
  ] }; } },
  { name: 'موجة وشريط', fn: k => { const { p, my } = k; return { bg: p.bg, objects: [
    k.rect(66.7, 0, 33.3, 100, p.light), k.img(66.7, 0, 33.3, 48),
    ...k.ribbon(64, 44, 36, 10, p.accent, p.dark), k.txt(S.company, { x: 67, y: 46, w: 31, s: 5.5, weight: 700, fill: '#fff' }),
    k.txt(S.slogan, { x: 69, y: 60, w: 28, s: 3.8, fill: p.sub, align: 'center' }), ...k.logoTile(83, 76, 7, p.dark, 'H'), k.en(S.web, { x: 69, y: 90, w: 28, s: 3.2, fill: p.sub, align: 'center' }),
    k.txt('خدماتنا', { x: 36, y: my + 6, w: 28, s: 6, weight: 700, fill: p.accent }),
    ...S.bullets.map((t, i) => k.txt('✓  ' + t, { x: 36, y: my + 18 + i * 9, w: 28, s: 3.6 })),
    k.img(36, 58, 28, 30, { rx: 1 }),
    k.txt('من نحن', { x: 3, y: my + 6, w: 28, s: 6, weight: 700, fill: p.accent }), k.txt(S.body, { x: 3, y: my + 18, w: 28, s: 3.4, fill: p.sub, lh: 1.6 }),
    ...k.contactRows(3, 68, 28, 3.2, p.sub, p.accent, 'right'),
  ] }; } },
);

// ---------- certificate ----------
FAMILIES.certificate.unshift(
  { name: 'ختم ذهبي', fn: k => { const { p, mx, my } = k; return { bg: '#fffdf7', objects: [
    k.frame(mx - 3, my - 3, 100 - 2 * mx + 6, 100 - 2 * my + 6, p.dark, 0.9), k.frame(mx - 1, my - 1, 100 - 2 * mx + 2, 100 - 2 * my + 2, p.accent, 0.25),
    k.hatch(mx - 3, my - 3, 100 - 2 * mx + 6, 100 - 2 * my + 6, 2.5, p.accent, 0.07, 0.2),
    k.label(S.companyEn, { x: mx, y: my + 4, w: 100 - 2 * mx, align: 'center', fill: p.sub }),
    k.txt(S.cert, { x: mx, y: my + 9, w: 100 - 2 * mx, s: 13, weight: 700, font: 'Amiri', align: 'center', fill: p.dark }),
    k.txt(S.certTo, { x: mx, y: 38, w: 100 - 2 * mx, s: 4, fill: p.sub, align: 'center' }),
    k.script(S.name, { x: mx, y: 43, w: 100 - 2 * mx, s: 11, fill: p.accent, align: 'center' }),
    k.hline(30, 58, 40, 0.25, p.dark),
    k.txt(S.certFor, { x: mx + 12, y: 61, w: 100 - 2 * mx - 24, s: 3.6, fill: p.sub, align: 'center', lh: 1.5 }),
    k.star8(50, 83, 8, p.accent), k.star8(50, 83, 5.5, '#fffdf7'), k.star8(50, 83, 4, p.accent), ...k.ribbon(46, 86, 8, 8, p.accent, p.dark),
    k.hline(68, 84, 18, 0.3, p.dark), k.txt(S.signer, { x: 66, y: 86, w: 22, s: 3.2, align: 'center' }),
    k.hline(14, 84, 18, 0.3, p.dark), k.txt(S.signer2, { x: 12, y: 86, w: 22, s: 3.2, align: 'center' }),
  ] }; } },
  { name: 'شريط مصوّر', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.img(0, 0, 100, 26), k.wave(26, 3, p.bg, false), k.rect(0, 29, 100, 0.6, p.accent),
    k.txt(S.cert, { x: mx, y: 33, w: 100 - 2 * mx, s: 12, weight: 900, align: 'center' }),
    k.txt(S.certTo, { x: mx, y: 47, w: 100 - 2 * mx, s: 4, fill: p.sub, align: 'center' }),
    k.txt(S.name, { x: mx, y: 52, w: 100 - 2 * mx, s: 10, weight: 700, fill: p.accent, align: 'center' }),
    k.txt(S.certFor, { x: mx + 12, y: 65, w: 100 - 2 * mx - 24, s: 3.6, fill: p.sub, align: 'center', lh: 1.5 }),
    k.hline(66, 86, 18, 0.3, p.dark), k.txt(S.signer, { x: 64, y: 88, w: 22, s: 3.2, align: 'center' }),
    k.hline(16, 86, 18, 0.3, p.dark), k.txt(S.signer2, { x: 14, y: 88, w: 22, s: 3.2, align: 'center' }),
    ...k.logoTile(50, 86, 4, p.dark, 'H'),
  ] }; } },
);

// ---------- voucher ----------
FAMILIES.voucher.unshift(
  { name: 'شريط ساتان', fn: k => { const { p, mx, my } = k; return { bg: p.bg, objects: [
    k.img(0, 0, 40, 100),
    ...k.ribbon(36, 18, 64, 18, p.accent, p.dark), k.txt(S.voucher, { x: 42, y: 21, w: 58 - mx, s: 9, weight: 700, fill: '#fff' }),
    k.txt(S.amount, { x: 44, y: 42, w: 56 - mx, s: 14, weight: 900, fill: p.dark }),
    k.txt(S.voucherNote, { x: 44, y: 68, w: 56 - mx, s: 3.4, fill: p.sub }),
    k.en(S.code, { x: 44, y: 80, w: 30, s: 4, fill: p.accent, weight: 700 }), k.qr(100 - mx - 12, 74, 12, p.dark, '#fff'),
  ] }; } },
  { name: 'كونفيتي', fn: k => { const { p, mx, my } = k; return { bg: p.dark, objects: [
    k.confetti(0, 0, 100, 100, 160, [p.accent, '#fff', '#e9d8a6'], 5),
    k.rect(mx + 2, 14, 100 - 2 * mx - 4, 72, p.dark, { opacity: 0.85, rx: 2 * k.u, ry: 2 * k.u, stroke: p.accent, strokeWidth: 0.5 * k.u }),
    k.scriptEn('Gift Voucher', { x: mx, y: 17, w: 100 - 2 * mx, s: 10, fill: p.accent, align: 'center' }),
    k.txt(S.amount, { x: mx, y: 38, w: 100 - 2 * mx, s: 16, weight: 900, fill: '#fff', align: 'center' }),
    k.txt(S.company, { x: mx, y: 62, w: 100 - 2 * mx, s: 4.4, fill: p.accent, align: 'center', weight: 700 }),
    k.en(S.code + '  ·  ' + S.voucherNote.split('•')[0].trim(), { x: mx, y: 74, w: 100 - 2 * mx, s: 3.2, fill: '#d1d5db', align: 'center' }),
  ] }; } },
);

// ---------- badge ----------
FAMILIES.badge.unshift(
  { name: 'موجة الرأس', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.wave(26, 5, p.dark, true), k.wave(22, 5, p.accent, true, { opacity: 0.9 }),
    k.txt(S.company, { x: mx, y: 6, w: 100 - 2 * mx, s: 6, weight: 700, fill: '#fff', align: 'center' }),
    k.img(27, 30, 46, 29, { rx: 50 }),
    k.txt(S.name, { x: mx, y: 63, w: 100 - 2 * mx, s: 7.5, weight: 700, align: 'center' }),
    k.txt(S.role, { x: mx, y: 72, w: 100 - 2 * mx, s: 4.8, fill: p.accent, align: 'center' }),
    k.label(S.dept, { x: mx, y: 80, w: 100 - 2 * mx, align: 'center', font: p.fontAr, charSpacing: 0 }),
    k.qr(40, 86, 20, p.dark, '#fff'),
  ] }; } },
  { name: 'صورة كاملة', fn: k => { const { p, mx } = k; return { bg: p.dark, objects: [
    k.img(0, 0, 100, 58), k.wave(58, 4, p.dark, false),
    k.txt(S.name, { x: mx, y: 64, w: 100 - 2 * mx, s: 7.5, weight: 700, fill: '#fff', align: 'center' }),
    k.txt(S.role, { x: mx, y: 73, w: 100 - 2 * mx, s: 4.8, fill: p.accent, align: 'center' }),
    k.hline(35, 81, 30, 0.4, p.accent),
    k.txt(S.company, { x: mx, y: 84, w: 100 - 2 * mx, s: 4.4, fill: '#e5e7eb', align: 'center' }),
    k.en(S.idno, { x: mx, y: 91, w: 100 - 2 * mx, s: 3.6, fill: '#94a3b8', align: 'center' }),
  ] }; } },
);

// ---------- postcard ----------
FAMILIES.postcard.unshift(
  { name: 'إكليل الشكر', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.wreath(50, 40, 22, p.accent, 16, 4), k.wreath(50, 40, 22, p.dark, 8, 12),
    k.script(S.thanks, { x: mx, y: 30, w: 100 - 2 * mx, s: 12, fill: p.dark, align: 'center' }),
    k.label('Thank you for your business', { x: mx, y: 70, w: 100 - 2 * mx, align: 'center', fill: p.dark }),
    k.txt(S.company, { x: mx, y: 78, w: 100 - 2 * mx, s: 4.2, weight: 700, fill: p.accent, align: 'center' }),
    k.en(S.phone + '  ·  ' + S.web, { x: mx, y: 86, w: 100 - 2 * mx, s: 3.2, fill: p.sub, align: 'center' }),
  ] }; } },
  { name: 'كولاج', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    ...k.collage(0, 0, 100, 58, 3, 1, 0.8),
    k.rect(30, 50, 40, 36, '#fff', { shadow: k.sh('rgba(0,0,0,.16)', 6, 2) }),
    k.txt(S.company, { x: 32, y: 56, w: 36, s: 5, weight: 700, align: 'center' }),
    k.txt(S.slogan, { x: 32, y: 66, w: 36, s: 3.2, fill: p.accent, align: 'center' }),
    k.en(S.phone, { x: 32, y: 74, w: 36, s: 3, fill: p.sub, align: 'center' }),
    k.en(S.web, { x: mx, y: 92, w: 100 - 2 * mx, s: 3.2, fill: p.sub, align: 'center' }),
  ] }; } },
  { name: 'صورة وشريط', fn: k => { const { p, mx } = k; return { bg: p.bg, objects: [
    k.img(0, 0, 100, 100), ...k.ribbon(-2, 62, 70, 16, p.accent, p.dark),
    k.txt(S.thanks, { x: 2, y: 65, w: 62, s: 8, weight: 900, fill: '#fff' }),
    k.txt(S.company + '  ·  ' + S.web, { x: 2, y: 82, w: 70, s: 3.4, fill: '#fff', weight: 700 }),
  ] }; } },
);

// ---------- letterhead ----------
FAMILIES.letterhead.unshift(
  { name: 'موجة علوية', fn: k => { const { p, mx } = k; return { bg: '#fff', objects: [
    k.wave(14, 3, p.dark, true), k.wave(12, 3, p.accent, true, { opacity: 0.9 }),
    ...k.logoTile(100 - mx - 4, 5.5, 3.5, '#fff', 'H', p.dark),
    k.txt(S.company, { x: mx, y: 3.5, w: 80, s: 4.5, weight: 700, fill: '#fff' }),
    k.en(S.companyEn, { x: mx, y: 8, w: 80, s: 2.4, fill: '#ffffffcc', align: 'right', charSpacing: 200 }),
    k.txt(S.letterSubject, { x: mx, y: 24, w: 100 - 2 * mx, s: 3.2, weight: 700 }),
    k.txt(S.letterBody, { x: mx, y: 29, w: 100 - 2 * mx, s: 2.9, lh: 1.7 }),
    k.hline(mx, 90, 100 - 2 * mx, 0.15, p.line || '#e5e7eb'),
    ...k.contactRows(mx, 92, 50, 2.2, p.sub, p.accent, 'left'),
    k.txt(S.address, { x: 55, y: 92, w: 45 - mx, s: 2.2, fill: p.sub }),
  ] }; } },
);

// ---------- stickers ----------
FAMILIES.sticker.unshift(
  { name: 'ختم مزخرف', fn: k => { const { p } = k; return { bg: p.bg, objects: [
    k.ring(50, 50, 44, p.dark, 1), k.ring(50, 50, 40, p.accent, 0.4), k.hatch(10, 10, 80, 80, 2.6, p.light, 1, 0.3),
    k.star8(50, 50, 30, p.dark), k.star8(50, 50, 26, p.bg), k.star8(50, 50, 23, p.accent, { opacity: 0.15 }),
    k.txt(S.company, { x: 15, y: 40, w: 70, s: 8, weight: 700, align: 'center' }),
    k.label('Est. 2026', { x: 15, y: 55, w: 70, align: 'center', fill: p.accent }),
  ] }; } },
  { name: 'ورقة طبيعية', fn: k => { const { p } = k; return { bg: '#f3f0e6', objects: [
    k.motif('leaf', 22, 8, 56, p.accent, { opacity: 0.25 }),
    k.txt(S.company, { x: 12, y: 36, w: 76, s: 9, weight: 700, font: 'Amiri', align: 'center', fill: p.dark }),
    k.txt(S.slogan, { x: 15, y: 54, w: 70, s: 4.4, fill: p.sub, align: 'center' }),
    k.label('100% natural', { x: 15, y: 70, w: 70, align: 'center', fill: p.accent }),
  ] }; } },
);

// ---------- mug / t-shirt ----------
FAMILIES.mug.unshift(
  { name: 'موجة', fn: k => { const { p } = k; return { bg: p.bg, objects: [
    k.wave(55, 8, p.accent, false), k.wave(62, 8, p.dark, false, { opacity: 0.9 }),
    k.txt(S.mug, { x: 8, y: 10, w: 84, s: 18, weight: 900, fill: p.dark, align: 'center' }),
    k.txt(S.company, { x: 8, y: 74, w: 84, s: 5.5, fill: '#fff', align: 'center', weight: 700 }),
  ] }; } },
);
FAMILIES.tshirt.unshift(
  { name: 'شعار بأوراق', fn: k => { const { p } = k; return { bg: '#ffffff', objects: [
    k.wreath(50, 40, 24, p.dark, 18, 6),
    k.txt(S.company, { x: 10, y: 34, w: 80, s: 9, weight: 900, fill: p.dark, align: 'center' }),
    k.label('Est. 2026', { x: 10, y: 48, w: 80, align: 'center', fill: p.accent }),
    k.txt(S.slogan, { x: 10, y: 76, w: 80, s: 6, fill: p.sub, align: 'center' }),
  ] }; } },
);

// Auto-generated back side for two-sided products: logo / company centred on the dark colour.
function buildBack(W, H, b, p) {
  const k = kit(W, H, b, p);
  const objs = S.logoImg ? k.logo(50, 42, Math.min(W, H) >= H ? 16 : 12, p.accent, 'H') : [k.txt(S.company, { x: 10, y: 36, w: 80, s: 9, weight: 900, fill: '#fff', align: 'center' })];
  if (!S.logoImg) objs.push(k.hline(42, 52, 16, 0.8, p.accent));
  objs.push(k.txt(S.slogan, { x: 10, y: S.logoImg ? 66 : 56, w: 80, s: 4.2, fill: p.accent, align: 'center' }));
  objs.push(k.en(S.web, { x: 10, y: 84, w: 80, s: 3.4, fill: '#ffffffaa', align: 'center' }));
  return { bg: p.dark, objects: objs };
}

function templatesFor(prod) {
  const fam = FAMILIES[prod.family] || FAMILIES.card;
  const out = [];
  fam.forEach(l => PALETTES.forEach(p => out.push({
    id: l.name + '|' + p.name, name: l.name, palette: p.name, paletteObj: p, swatch: [p.dark, p.accent],
    build: (W, H, b) => l.fn(kit(W, H, b, p)),
  })));
  return out;
}
const TEMPLATE_COUNT = Object.fromEntries(Object.entries(PRODUCTS).map(([k, v]) => [k, (FAMILIES[v.family] || FAMILIES.card).length * PALETTES.length]));
