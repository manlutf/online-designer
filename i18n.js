// Bilingual UI. Arabic is the source language; this table maps every Arabic UI string to English.
// Dynamic strings go through t(); static DOM text is translated by translateDOM() on boot.
const LANG = (() => { try { return localStorage.getItem('designer_lang') === 'en' ? 'en' : 'ar'; } catch (e) { return 'ar'; } })();
const DICT = {
  // nav / catalog
  'المصمم الإلكتروني': 'Online Designer', 'نسخة تجريبية': 'Beta', 'يُربط بأي متجر إلكتروني برابط واحد لكل منتج': 'Plugs into any online store with one link per product',
  'للمطابع والمتاجر الإلكترونية': 'For print shops & online stores', 'صمّم مطبوعاتك بنفسك خلال دقائق': 'Design your print products yourself in minutes',
  'محرر تصميم داخل متجر المطبعة: قوالب احترافية لكل منتج، تعديل حر كأنك في كانفا، رفع الصور من الجوال بمسح QR، رفع خطوطك وتصاميمك الجاهزة (PDF/AI)، وملف PDF للطباعة بدقة 300dpi مع هوامش القص.': 'A design editor inside the print shop\'s store: professional templates for every product, free editing like Canva, photo upload from your phone via QR, your own fonts and ready designs (PDF/AI), and a 300dpi print-ready PDF with bleed.',
  'جرّب على الكروت': 'Try it on business cards', 'تصفّح المنتجات': 'Browse products', 'منتجاً طباعياً': 'print products', 'قالباً جاهزاً': 'ready templates', 'تصدير جاهز للطباعة': 'print-ready export', 'رفع فوري من الجوال': 'instant phone upload',
  'اختر المنتج': 'Choose a product', 'كل منتج بمقاسه الحقيقي وهوامش القص، وقوالب مصممة له خصيصاً': 'Every product at its real size with bleed, and templates designed for it',
  'كيف يعمل داخل متجر المطبعة؟': 'How does it work inside the store?', 'رابط واحد لكل منتج، بدون تغيير في منصة المتجر': 'One link per product, no change to the store platform',
  'زر "صمّم بنفسك" في صفحة المنتج': 'A "Design it yourself" button on the product page', 'يعمل مع سلة، زد، شوبيفاي، ووكومرس أو أي متجر.': 'Works with Salla, Zid, Shopify, WooCommerce or any store.',
  'العميل يختار قالباً أو يرفع تصميمه': 'The customer picks a template or uploads a design', 'يعدّل النصوص والألوان والخطوط، ويرفع شعاره من اللابتوب أو الجوال، أو يستورد ملف PDF/AI جاهزاً.': 'Edits text, colours and fonts, uploads a logo from laptop or phone, or imports a ready PDF/AI file.',
  'حفظ وإرسال للمطبعة': 'Save & send to print shop', 'رقم تصميم يُوضع في الطلب، والمطبعة تفتح الرابط وتصدّر PDF مباشرة.': 'A design number goes on the order; the print shop opens the link and exports the PDF.',
  'قريباً: التصميم بالذكاء الاصطناعي': 'Coming soon: AI design', 'يكتب العميل وصفاً ويحصل على تصميم جاهز للتعديل.': 'The customer describes it and gets an editable design.',
  'المصمم الإلكتروني · نسخة تجريبية للعرض': 'Online Designer · demo build', 'قالباً': 'templates', ' · وجهان': ' · two sides', 'مم': 'mm',
  // gallery
  'كل المنتجات': 'All products', 'اللون': 'Colour', 'الستايل': 'Style', 'الكل': 'All', 'اكتب بياناتك مرة واحدة وشاهدها على كل القوالب': 'Enter your details once and see them on every template',
  '(اختياري، تقدر تعدلها لاحقاً)': '(optional, you can change them later)', 'قوالب المطبعة المرفوعة': 'Print shop templates', 'مرفوع': 'uploaded', 'قالب المطبعة': 'Print shop template',
  'ابدأ من الصفر': 'Start from scratch', 'تصميم حر': 'Free design', 'ارفع تصميمك الجاهز': 'Upload your design', 'PDF أو AI': 'PDF or AI', 'يُستورد إلى المحرر بالمقاس': 'Imported into the editor at size',
  'تصميم بالذكاء الاصطناعي': 'AI design', 'قريباً': 'soon', 'اكتب وصفاً واحصل على تصميم': 'Describe it and get a design', 'إعادة البيانات الافتراضية': 'Reset to sample data',
  // editor
  'القوالب': 'Templates', 'الوجه الأمامي': 'Front', 'الوجه الخلفي': 'Back', 'تراجع Ctrl+Z': 'Undo Ctrl+Z', 'إعادة Ctrl+Y': 'Redo Ctrl+Y', 'ملاءمة': 'Fit', 'PDF للطباعة': 'Print PDF', 'حفظ كقالب': 'Save as template', 'يظهر في معرض هذا المنتج': 'Shows in this product\'s gallery',
  'عنوان': 'Heading', 'نص': 'Text', 'مستطيل': 'Rectangle', 'دائرة': 'Circle', 'خط': 'Line', 'الشعار': 'Logo', 'صورة': 'Image', 'من الجوال': 'From phone', 'تعديل متقدم': 'Advanced', 'الوضع البسيط': 'Simple mode', 'رفع خط': 'Upload font', 'الخلفية': 'Background',
  'بياناتك': 'Your details', 'اكتب بياناتك وسيتحدث التصميم فوراً. التنسيق والمقاسات مضبوطة للطباعة تلقائياً.': 'Type your details and the design updates instantly. Layout and sizes are print-safe automatically.', 'الألوان': 'Colours',
  'الخصائص': 'Properties', 'اختر عنصراً على التصميم لتعديله. اضغط مرتين على النص لتحريره.': 'Select an element to edit it. Double-click text to type.', 'اختر مكان الصورة ثم ارفع صورة لتحل محله.': 'Select a photo frame, then upload an image to fill it.',
  'حد القص (bleed)': 'Trim line (bleed)', 'المنطقة الآمنة للنصوص': 'Safe area for text', 'خطوط الطي': 'Fold lines', 'حذف ·': 'Delete ·', 'تراجع ·': 'Undo ·', 'نسخ': 'Duplicate',
  'اللون والشفافية': 'Colour & opacity', 'الشفافية': 'Opacity', 'النص': 'Text', 'الخط': 'Font', 'الحجم': 'Size', 'عريض': 'Bold', 'مائل': 'Italic', 'يمين': 'Right', 'وسط': 'Centre', 'يسار': 'Left', 'الترتيب': 'Arrange', 'للأمام': 'Forward', 'للخلف': 'Backward', 'حذف': 'Delete',
  'رفع الشعار': 'Upload logo', 'تغيير الشعار': 'Change logo', 'رفع صورة': 'Upload photo', 'تغيير الصورة': 'Change photo', 'نص جديد': 'New text',
  // upload modal
  'ارفع صورتك': 'Upload your image', 'ارفع شعارك': 'Upload your logo', 'ارفع تصميمك': 'Upload your design', 'رفع من هذا الجهاز': 'Upload from this device', 'رفع من الجوال': 'Upload from phone', 'أو اسحب الملف وأفلته هنا': 'or drag and drop here',
  'ستظهر ملفاتك المرفوعة هنا بعد إضافتها': 'Your uploaded files will appear here once you add them', 'استخدام': 'Use', 'امسح الكود بجوالك': 'Scan with your phone', 'ارفع الصورة من الجوال وستظهر هنا فوراً': 'Upload from your phone and it appears here instantly', 'إغلاق': 'Close',
  // save modal / toasts
  'تم حفظ التصميم ✓': 'Design saved ✓', 'تم حفظ القالب ✓': 'Template saved ✓', 'انسخ رقم التصميم وضعه في ملاحظات الطلب، أو شارك الرابط مع المطبعة': 'Copy the design number into your order notes, or share the link with the print shop',
  'سيظهر في معرض هذا المنتج ضمن "قوالب المطبعة المرفوعة"': 'It will appear in this product\'s gallery under "Print shop templates"', 'رقم التصميم:': 'Design number:', 'نسخ الرابط': 'Copy link', 'تم النسخ': 'Copied', 'جاري المعالجة…': 'Processing…',
  'التصميم بالذكاء الاصطناعي: المرحلة القادمة ✨': 'AI design: coming in the next phase ✨', 'التصميم غير موجود': 'Design not found', 'الرجوع للقوالب؟ التعديلات غير المحفوظة ستضيع.': 'Back to templates? Unsaved changes will be lost.',
  'الرجوع للوضع البسيط يعيد بناء التصميم من بياناتك ويلغي التعديلات اليدوية. متابعة؟': 'Simple mode rebuilds the design from your details and discards manual edits. Continue?',
  'اسم القالب كما سيظهر في المعرض:': 'Template name as shown in the gallery:', ' — قالب المطبعة': ' — print shop template', 'تصميم محفوظ': 'saved design', 'تعذّر تحميل الصورة': 'Could not load the image', 'تعذّر قراءة الملف: ': 'Could not read the file: ',
  'تمت إضافة الخط: ': 'Font added: ', 'فشل الحفظ: ': 'Save failed: ', 'فشل رفع الخط: ': 'Font upload failed: ', 'وصلت الصورة من الجوال ✓': 'Photo received from phone ✓', 'مكتبة PDF غير محمّلة': 'PDF library not loaded',
  'ملف AI غير متوافق مع PDF. احفظه من Illustrator مع خيار "Create PDF Compatible File"': 'This AI file is not PDF-compatible. Save it from Illustrator with "Create PDF Compatible File".',
  // form labels
  'اسم الشركة': 'Company name', 'الشعار النصي': 'Tagline', 'الاسم': 'Name', 'المسمى الوظيفي': 'Job title', 'الجوال': 'Phone', 'الإيميل': 'Email', 'الموقع': 'Website', 'العنوان': 'Address', 'القسم': 'Department', 'رقم البطاقة': 'ID number',
  'العنوان الرئيسي': 'Headline', 'العنوان الفرعي': 'Subheadline', 'نص قصير': 'Short text', 'زر الدعوة': 'Call to action', 'التاريخ / المدة': 'Date / period', 'من نحن': 'About us', 'الاسم بالإنجليزي': 'English name', 'موضوع الخطاب': 'Letter subject', 'نص الخطاب': 'Letter body',
  'اسم المطعم': 'Restaurant name', 'عنوان القائمة': 'Menu title', 'نوع المناسبة': 'Occasion', 'الأسماء': 'Names', 'نص الدعوة': 'Invitation text', 'التاريخ': 'Date', 'الوقت': 'Time', 'المكان': 'Venue', 'اسم الجهة (للمناسبات الرسمية)': 'Organisation (formal events)', 'اسم الجهة': 'Organisation',
  'عنوان الشهادة': 'Certificate title', 'اسم المكرَّم': 'Recipient name', 'سبب التكريم': 'Reason', 'التوقيع الأول': 'First signature', 'التوقيع الثاني': 'Second signature', 'عنوان القسيمة': 'Voucher title', 'القيمة': 'Value', 'الشروط': 'Terms', 'الكود': 'Code', 'الرسالة': 'Message', 'النص على الكوب': 'Mug text', 'النص على التيشيرت': 'T-shirt text',
  // palettes
  'كحلي وذهبي': 'Navy & gold', 'أسود وذهبي': 'Black & gold', 'تركوازي': 'Teal', 'عنابي كلاسيكي': 'Classic burgundy', 'أخضر زيتوني': 'Olive green', 'مرجاني': 'Coral', 'بنفسجي ملكي': 'Royal purple', 'رمادي وبرتقالي': 'Slate & orange', 'نيون حمضي': 'Acid neon', 'باستيل ناعم': 'Soft pastel',
  'صورتك': 'Your photo', 'ستايل': 'styles', 'ألوان': 'colours',
  'شريط ساتان': 'Satin ribbon', 'موجة لامعة': 'Glossy wave', 'بلاطة الشعار': 'Logo tile', 'إطار وكتلة': 'Frame & block', 'نصف صورة': 'Half photo', 'ورق كرافت': 'Kraft paper', 'أفق المدينة': 'City skyline', 'أوراق خضراء': 'Green leaves', 'أيقونات أنيقة': 'Elegant icons', 'موجة البطل': 'Hero wave',
  'راجع تصميمك': 'Review your design', 'تأكد من التالي قبل المتابعة': 'Double-check the following before you continue', 'النص واضح وسهل القراءة': 'Text is clear and easy to read', 'البيانات مكتوبة بشكل صحيح': 'Information is spelled correctly', 'الصور حادة وغير مشوشة': 'Images are sharp with no blurring',
  'بعض الحقول ما زالت بالنص التجريبي': 'Some fields still contain the sample text', 'إخفاء هذه الحقول من التصميم': 'Hide these fields from the design', 'الكمية': 'Quantity', 'نوع الورق': 'Paper', 'عادي': 'Standard', 'مميز': 'Premium', 'مميز سميك': 'Premium plus',
  'راجعت التصميم وأوافق عليه': 'I have reviewed and approve my design', 'متابعة وحفظ': 'Continue & save', 'تعديل التصميم': 'Edit my design', 'الوجه الخلفي': 'Back side', 'تلقائي (الشعار)': 'Auto (logo)', 'نسخة من الأمامي': 'Duplicate front', 'فارغ': 'Blank', 'رفع تصميم': 'Upload design',
  'اضغط على الصورة لتغييرها': 'Click the photo to change it',
  // layout / style names
  'نظيف': 'Clean', 'شريط جانبي': 'Side band', 'شريط سفلي': 'Bottom bar', 'متوسط': 'Centred', 'زاوية': 'Corner', 'داكن فاخر': 'Dark luxe', 'قطري': 'Diagonal', 'دائرة': 'Circle', 'عصري ثنائي اللغة': 'Modern bilingual', 'كلاسيكي أنيق': 'Elegant classic',
  'رأس ملوّن': 'Coloured header', 'داكن': 'Dark', 'بسيط': 'Minimal', 'صورة علوية': 'Top photo', 'عنوان ضخم': 'Big headline', 'شريط قطري': 'Diagonal band', 'إطار أنيق': 'Elegant frame', 'عمود جانبي': 'Side column', 'شارة الخصم': 'Discount badge', 'شبكة صور': 'Photo grid',
  'رسمي': 'Formal', 'عصري': 'Modern', 'كلاسيكي': 'Classic', 'عمودان': 'Two columns', 'صورة رأسية': 'Header photo', 'غلاف مصوّر': 'Photo cover', 'كتل ملوّنة': 'Colour blocks', 'صورة كاملة': 'Full photo', 'شعار دائري': 'Round emblem', 'جديد': 'New', 'ملصق منتج': 'Product label', 'شكراً': 'Thank you', 'حرف': 'Monogram',
  'ذهبي داكن': 'Dark gold', 'شريط علوي': 'Top band', 'زهري': 'Floral', 'حفل افتتاح': 'Grand opening', 'كعب جانبي': 'Side stub', 'صورة + نص': 'Photo + text', 'بوستكارد': 'Postcard', 'نص كبير': 'Big text', 'دوائر': 'Circles', 'شعار': 'Emblem', 'شعار كبير': 'Big emblem', 'طباعي': 'Typographic',
  'سويسري شبكي': 'Swiss grid', 'باوهاوس هندسي': 'Bauhaus geometric', 'خط عربي جريء': 'Bold Arabic type', 'عتيق مزخرف': 'Vintage ornate', 'تدرج ضبابي': 'Blurred gradient', 'زاوية مقصوصة': 'Cut corner', 'نقاط شبكية': 'Dot grid', 'تحريري أنيق': 'Elegant editorial',
  'سويسري دولي': 'International Swiss', 'باوهاوس': 'Bauhaus', 'طباعي ضخم': 'Giant type', 'أشكال باستيلية': 'Pastel shapes', 'نيون داكن': 'Dark neon', 'تحريري': 'Editorial', 'زخرفة إسلامية': 'Islamic ornament', 'نباتي خطي': 'Botanical line', 'عريض حديث': 'Bold modern',
  'سبورة': 'Chalkboard', 'بوهيمي بيج': 'Boho beige', 'ثنائي اللغة': 'Bilingual', 'هندسي قطري': 'Diagonal geometric', 'سويسري': 'Swiss', 'رسمي ذهبي': 'Formal gold', 'طباعي حديث': 'Modern type', 'تذكرة': 'Ticket', 'فاخر مزخرف': 'Ornate luxe', 'هندسي': 'Geometric', 'هندسي حديث': 'Modern geometric', 'شارة عتيقة': 'Vintage badge', 'نيون': 'Neon', 'زخرفي': 'Ornamental',
};
const t = s => (LANG === 'en' && DICT[s] !== undefined) ? DICT[s] : s;

// Translate static DOM text + title/placeholder attributes (idempotent; keeps the Arabic original on the node).
function translateDOM(root = document.body) {
  if (LANG !== 'en') return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => (n.parentNode && !['SCRIPT', 'STYLE'].includes(n.parentNode.tagName) && /[؀-ۿ]/.test(n.nodeValue)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n => { const raw = n.nodeValue, key = raw.trim(); if (DICT[key] !== undefined) n.nodeValue = raw.replace(key, DICT[key]); });
  root.querySelectorAll('[title],[placeholder]').forEach(el => ['title', 'placeholder'].forEach(a => { const v = el.getAttribute(a); if (v && DICT[v] !== undefined) el.setAttribute(a, DICT[v]); }));
}
function setLang(l) { try { localStorage.setItem('designer_lang', l); } catch (e) {} location.reload(); }
document.documentElement.lang = LANG; document.documentElement.dir = LANG === 'en' ? 'ltr' : 'rtl';
