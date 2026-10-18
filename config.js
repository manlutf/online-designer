// Supabase project (heropack-price-engine). Anon key is public by design.
const SUPABASE_URL = 'https://roivxtrhgddgtdweitva.supabase.co';
const SUPABASE_KEY = 'sb_publishable_zuPDLNIxTS2jXUMNEPyM4w_-a6Gg1Pc';
const BUCKET = 'designer';

// Print catalog. Sizes in mm (trim), bleed in mm, pxPerMm = on-screen working resolution.
// family = which template family in templates.js. folds = panel count (fold guides). shape = 'circle' draws a round cut guide.
const PRODUCTS = {
  cards:       { name: 'كروت شخصية', nameEn: 'Business cards',        icon: '💳', w: 90,  h: 55,   bleed: 3, sides: 2, pxPerMm: 4,   family: 'card' },
  flyer_a5:    { name: 'فلاير A5', nameEn: 'A5 flyer',           icon: '📄', w: 148, h: 210,  bleed: 3, sides: 2, pxPerMm: 2,   family: 'poster' },
  flyer_a4:    { name: 'فلاير A4', nameEn: 'A4 flyer',           icon: '📃', w: 210, h: 297,  bleed: 3, sides: 2, pxPerMm: 1.5, family: 'poster' },
  poster_a3:   { name: 'بوستر A3', nameEn: 'A3 poster',           icon: '🖼️', w: 297, h: 420,  bleed: 3, sides: 1, pxPerMm: 1,   family: 'poster' },
  brochure:    { name: 'بروشور ثلاثي الطي', nameEn: 'Tri-fold brochure',  icon: '📑', w: 297, h: 210,  bleed: 3, sides: 2, pxPerMm: 1.5, family: 'brochure', folds: 3 },
  rollup:      { name: 'رول أب 85×200', nameEn: 'Roll-up 85×200',      icon: '🪧', w: 850, h: 2000, bleed: 5, sides: 1, pxPerMm: 0.4, family: 'rollup' },
  letterhead:  { name: 'ورق رسمي A4', nameEn: 'A4 letterhead',        icon: '✉️', w: 210, h: 297,  bleed: 3, sides: 1, pxPerMm: 1.5, family: 'letterhead' },
  menu:        { name: 'منيو مطعم A4', nameEn: 'A4 restaurant menu',        icon: '🍽️', w: 210, h: 297,  bleed: 3, sides: 2, pxPerMm: 1.5, family: 'menu' },
  invitation:  { name: 'بطاقة دعوة', nameEn: 'Invitation card',          icon: '💌', w: 105, h: 148,  bleed: 3, sides: 2, pxPerMm: 3,   family: 'invitation' },
  certificate: { name: 'شهادة تقدير', nameEn: 'Certificate',         icon: '🏅', w: 297, h: 210,  bleed: 3, sides: 1, pxPerMm: 1.5, family: 'certificate' },
  voucher:     { name: 'قسيمة هدية', nameEn: 'Gift voucher',          icon: '🎁', w: 210, h: 99,   bleed: 3, sides: 2, pxPerMm: 2,   family: 'voucher' },
  badge:       { name: 'بطاقة تعريف', nameEn: 'ID badge',         icon: '🪪', w: 54,  h: 86,   bleed: 3, sides: 2, pxPerMm: 4,   family: 'badge' },
  postcard:    { name: 'بطاقة شكر / بوستكارد', nameEn: 'Thank-you / postcard', icon: '💝', w: 148, h: 105,  bleed: 3, sides: 2, pxPerMm: 3,   family: 'postcard' },
  sticker:     { name: 'ستيكر دائري', nameEn: 'Round sticker',         icon: '⭕', w: 60,  h: 60,   bleed: 2, sides: 1, pxPerMm: 6,   family: 'sticker', shape: 'circle' },
  sticker_sq:  { name: 'ستيكر مربع', nameEn: 'Square sticker',          icon: '🟦', w: 60,  h: 60,   bleed: 2, sides: 1, pxPerMm: 6,   family: 'sticker' },
  mug:         { name: 'كوب (طباعة محيطية)', nameEn: 'Mug (wrap print)',  icon: '☕', w: 200, h: 85,   bleed: 3, sides: 1, pxPerMm: 2,   family: 'mug' },
  tshirt:      { name: 'تيشيرت (منطقة الطباعة)', nameEn: 'T-shirt (print area)', icon: '👕', w: 300, h: 400, bleed: 0, sides: 2, pxPerMm: 1, family: 'tshirt' },
};
