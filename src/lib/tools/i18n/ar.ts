import type { ToolI18nBundle } from "../types";

export const toolsAR: ToolI18nBundle = {
  "compress-image": {
    name: "ضاغط الصور",
    short: "تصغير JPEG/PNG/WebP/AVIF",
    description: "اضغط الصور في المتصفح حسب الحجم أو الجودة. متعدد الملفات، بعرض أقصى مخصص، مع خيار الإبقاء على EXIF.",
    keywords: ["ضغط", "تصغير", "صورة"],
    cta: "إضافة صورة",
    options: {
      targetSize: "الحجم المستهدف (ميغا)",
      maxWidth: "أقصى عرض (px)",
      quality: "الجودة",
      format: "صيغة الإخراج",
      keepEXIF: "الإبقاء على EXIF",
      keepOriginalFormat: "الصيغة الأصلية"
    }
  },
  "optimize-svg": { name: "محسّن SVG", short: "تصغير SVG", description: "تنظيف عبر SVGO.", keywords: ["svg"] },
  "compress-pdf": { name: "ضاغط PDF", short: "تصغير PDF", description: "إعادة عيّنة الصور لتقليص الحجم.", keywords: ["pdf"] },
  "convert-format": {
    name: "محوّل الصيغ",
    short: "PNG ↔ JPG ↔ WebP ↔ AVIF",
    description: "تحويل بين PNG وJPEG وWebP وAVIF داخل المتصفح.",
    keywords: ["تحويل", "صيغة"],
    options: { format: "الصيغة الهدف", quality: "الجودة (JPEG/WebP/AVIF)" }
  },
  "heic-to-jpg": { name: "HEIC → JPG", short: "تحويل HEIC من iPhone", description: "تحويل HEIC/HEIF إلى JPEG/PNG.", keywords: ["heic"] },
  "image-to-pdf": { name: "صورة → PDF", short: "صور متعددة في PDF واحد", description: "دمج عدة صور في ملف PDF واحد.", keywords: ["pdf"] },
  "pdf-to-image": { name: "PDF → صورة", short: "صفحات بصيغة PNG", description: "إخراج كل صفحة كـ PNG/JPG.", keywords: ["pdf"] },
  "svg-to-png": { name: "SVG → PNG", short: "تنقيط المتجه", description: "SVG إلى PNG بأي حجم.", keywords: ["svg"] },
  "png-to-svg": { name: "PNG → SVG", short: "تحويل النقطة إلى متجه", description: "تتبع Potrace أبيض/أسود.", keywords: ["svg"] },
  "favicon-generator": {
    name: "مولد Favicon",
    short: "كل الأحجام من صورة واحدة",
    description: "حزمة Favicon بأحجام 16/32/48/64/96/128/192/256/512 px.",
    keywords: ["favicon"],
    options: { sizes: "الأحجام" }
  },
  "resize-image": {
    name: "أداة تغيير الحجم",
    short: "تعيين العرض/الارتفاع",
    description: "تغيير الحجم بالبكسل أو النسبة أو قوالب وسائل التواصل.",
    keywords: ["تغيير حجم"],
    options: {
      mode: "الوضع",
      width: "العرض",
      height: "الارتفاع",
      keepAspect: "الحفاظ على النسبة",
      preset: "قالب",
      modePixel: "بكسل",
      modePercent: "نسبة",
      modePreset: "قالب"
    }
  },
  "crop-image": { name: "أداة القص", short: "قص بمقابض", description: "واجهة سحب وقص.", keywords: ["قص"] },
  "rotate-flip": {
    name: "تدوير وعكس",
    short: "90°/180°/270° + مرآة",
    description: "تدوير أو عكس أفقي/عمودي.",
    keywords: ["تدوير"],
    options: { rotation: "الزاوية", flipX: "عكس أفقي", flipY: "عكس عمودي" }
  },
  pixelart: {
    name: "صانع بكسل آرت",
    short: "صورة إلى بكسل",
    description: "تخفيض الدقة لشبكة بكسل وتطبيق لوحة ألوان.",
    keywords: ["بكسل"],
    options: {
      pixelSize: "حجم البكسل",
      palette: "اللوحة",
      paletteFull: "كاملة (256)",
      palette16: "16 لون",
      palette8: "8 ألوان",
      palette4: "4 ألوان",
      paletteGameboy: "Gameboy"
    }
  },
  "adjust-color": {
    name: "ضبط الألوان",
    short: "السطوع/التباين/التشبع",
    description: "السطوع والتباين والتشبع والصبغة.",
    keywords: ["لون"],
    options: { brightness: "السطوع", contrast: "التباين", saturation: "التشبع", hue: "الصبغة" }
  },
  "apply-filter": {
    name: "تطبيق فلتر",
    short: "Vintage / Duotone / B&W",
    description: "فلاتر جاهزة: تدرج رمادي، sepia، vintage، duotone، بارد، دافئ.",
    keywords: ["فلتر"],
    options: {
      preset: "الفلتر",
      presetNone: "بدون",
      presetGrayscale: "تدرج رمادي",
      presetSepia: "Sepia",
      presetVintage: "Vintage",
      presetCold: "بارد",
      presetWarm: "دافئ",
      presetInvert: "سلبي"
    }
  },
  "add-watermark": { name: "علامة مائية", short: "نص/صورة", description: "زاوية أو متكرر.", keywords: ["علامة"] },
  "blur-region": { name: "تمويه منطقة", short: "تمويه الوجوه/النص", description: "Blur أو Pixelate.", keywords: ["تمويه"] },
  "collage-maker": { name: "صانع كولاج", short: "دمج عدة صور", description: "شبكة أو حر.", keywords: ["كولاج"] },
  "image-splitter": { name: "مقسّم الصور", short: "Instagram puzzle", description: "تقسيم صورة على شبكة.", keywords: ["تقسيم"] },
  "remove-background": { name: "إزالة الخلفية", short: "ذكاء اصطناعي شفاف", description: "نموذج ONNX داخل المتصفح.", keywords: ["خلفية"] },
  "upscale-image": { name: "رفع جودة الصورة", short: "ذكاء 2x/4x", description: "Real-ESRGAN ONNX.", keywords: ["upscale"] },
  "image-ocr": { name: "OCR من الصورة", short: "استخراج النص", description: "OCR متعدد اللغات.", keywords: ["ocr"] },
  "qr-generator": {
    name: "مولد QR",
    short: "قابل لتضمين شعار",
    description: "QR لرابط ونص وبطاقة وهاتف وبريد، مع ألوان وتصحيح خطأ ولوغو.",
    keywords: ["qr"],
    options: {
      content: "المحتوى",
      level: "تصحيح الخطأ",
      size: "الحجم",
      foreground: "اللون الأمامي",
      background: "الخلفية",
      margin: "الهامش"
    }
  },
  "palette-extractor": {
    name: "مستخرج اللوحة",
    short: "لوحة ألوان من صورة",
    description: "استخراج لوحة من 5-12 لون مهيمن.",
    keywords: ["لوحة"],
    options: { count: "عدد الألوان" }
  },
  "color-picker": { name: "ملتقط الألوان", short: "Hex/RGB من صورة", description: "اختيار لون من الصورة.", keywords: ["لون"] },
  "mockup-generator": { name: "مولد Mockup", short: "إطارات الأجهزة", description: "iPhone وMacBook وbrowser.", keywords: ["mockup"] },
  "og-image-generator": { name: "مولد صورة OG", short: "بطاقة Twitter/OG", description: "تصميم بطاقة مشاركة.", keywords: ["og"] },
  "ascii-art": {
    name: "ASCII Art",
    short: "صورة إلى أحرف",
    description: "تحويل الصورة إلى كتلة أحرف monospace.",
    keywords: ["ascii"],
    options: { width: "عرض الأحرف", charset: "مجموعة الأحرف", colored: "HTML ملوّن" }
  },
  "exif-viewer": { name: "عارض EXIF", short: "بيانات الصورة", description: "عرض أو تنظيف EXIF.", keywords: ["exif"] },
  "gif-maker": { name: "صانع GIF", short: "رسم متحرك من إطارات", description: "GIF متحرك من سلسلة إطارات.", keywords: ["gif"] },
  "gif-extractor": { name: "مستخرج GIF", short: "استخراج الإطارات", description: "كل إطار GIF بصيغة PNG.", keywords: ["gif"] },

  // ------------- المطورون
  "json-formatter": {
    name: "منسّق JSON",
    short: "تنسيق / تصغير JSON",
    description: "تحقق من JSON أو نسّقه أو صغّره. يبرز أخطاء الصياغة بالسطر والعمود.",
    keywords: ["json", "تنسيق"],
    options: { indent: "المسافات", sortKeys: "ترتيب المفاتيح", action: "العملية" }
  },
  "base64-encoder": {
    name: "محوّل Base64",
    short: "نص / ملف ↔ Base64",
    description: "تحويل النص أو أي ملف إلى Base64 أو فك التشفير. متغير URL-safe مدعوم.",
    keywords: ["base64"],
    options: { mode: "الوضع", urlSafe: "URL-safe", input: "المدخل" }
  },
  "url-encoder": {
    name: "محوّل URL",
    short: "encodeURIComponent / فك",
    description: "ترميز نص للـ URL أو عكسه.",
    keywords: ["url"],
    options: { mode: "الوضع", scope: "النطاق" }
  },
  "jwt-decoder": {
    name: "فك JWT",
    short: "تفقّد JWT",
    description: "فك header وpayload لرمز JWT. يعرض الانتهاء والخوارزمية والـ claims. التوقيع لا يُتحقق منه.",
    keywords: ["jwt"]
  },
  "hash-generator": {
    name: "مولّد Hash",
    short: "MD5 / SHA-1 / SHA-256 / SHA-512",
    description: "حساب hash للنص أو الملفات محلياً عبر Web Crypto.",
    keywords: ["hash", "sha", "md5"],
    options: { algorithm: "الخوارزمية", input: "المدخل" }
  },
  "uuid-generator": {
    name: "مولّد UUID",
    short: "دفعات UUID v4 / nanoid",
    description: "توليد UUID v4 أو معرّفات قصيرة بنمط nanoid. الطول والأبجدية قابلة للتعديل.",
    keywords: ["uuid", "guid", "nanoid"],
    options: { count: "العدد", kind: "النوع", length: "الطول" }
  },
  "lorem-ipsum": {
    name: "مولّد Lorem Ipsum",
    short: "نص حشو",
    description: "كلمات أو جمل أو فقرات من Lorem Ipsum الكلاسيكي. مع خيار غلاف <p>.",
    keywords: ["lorem", "ipsum"],
    options: { unit: "الوحدة", count: "العدد", html: "غلّف بـ <p>" }
  },
  "regex-tester": {
    name: "مختبر Regex",
    short: "تجربة JS regex",
    description: "تجربة تعبير منتظم على نص اختبار. يبرز التطابقات والمجموعات.",
    keywords: ["regex"],
    options: { pattern: "النمط", flags: "الأعلام", subject: "النص" }
  },
  "color-converter": {
    name: "محوّل ألوان",
    short: "hex ↔ rgb ↔ hsl ↔ oklch",
    description: "تحويل لون بين hex وrgb وhsl وoklch. مع نسبة التباين مع الأبيض/الأسود.",
    keywords: ["color", "لون"],
    options: { input: "المدخل" }
  },
  "diff-viewer": {
    name: "مقارن النصوص",
    short: "قارن نصين",
    description: "فروق جنباً إلى جنب بين نصين — على مستوى السطر والكلمة. بدون رفع.",
    keywords: ["diff"],
    options: { left: "يسار", right: "يمين", mode: "الوضع" }
  },

  // ------------- PDF
  "pdf-merge": { name: "دمج PDF", short: "ضم PDF بترتيب", description: "ضم عدة ملفات PDF بترتيب قابل للتغيير.", keywords: ["pdf"] },
  "pdf-split": { name: "تقسيم PDF", short: "صفحات أو مجالات", description: "تقسيم PDF إلى صفحات أو مجالات (مثل 1-3, 5, 8-).", keywords: ["pdf"], options: { mode: "الوضع", ranges: "المجالات" } },
  "pdf-rotate": { name: "تدوير PDF", short: "تدوير الصفحات", description: "تدوير صفحات مختارة بـ 90/180/270°.", keywords: ["pdf"], options: { angle: "الزاوية" } },
  "pdf-reorder": { name: "إعادة ترتيب PDF", short: "ترتيب الصفحات", description: "أعد ترتيب صفحات PDF بالسحب وأعد التصدير.", keywords: ["pdf"] },
  "pdf-metadata": { name: "بيانات PDF", short: "العنوان / المؤلف", description: "عرض وتعديل قاموس معلومات PDF.", keywords: ["pdf"] },
  "pdf-text-extract": { name: "استخراج نص PDF", short: "طبقة النص", description: "استخراج طبقة النص المضمّنة من PDF (ليس OCR).", keywords: ["pdf"] },

  // ------------- مساعدات التصميم
  "gradient-generator": { name: "مولّد التدرج", short: "خطي / شعاعي / مخروطي", description: "بناء CSS gradient مع stops والزاوية.", keywords: ["gradient", "css"], options: { type: "النوع", angle: "الزاوية", stops: "نقاط التوقف" } },
  "box-shadow": { name: "بناء Box Shadow", short: "ظلال متعددة", description: "تأليف CSS box-shadow بـ offset وblur وspread وطبقات متعددة.", keywords: ["shadow", "css"] },
  "border-radius": { name: "بناء Border Radius", short: "نصف قطر لكل زاوية", description: "ضبط نصف قطر كل زاوية ونسخ CSS.", keywords: ["border-radius", "css"] },
  "cubic-bezier": { name: "محرر Cubic Bezier", short: "منحنى easing", description: "اسحب نقطتي التحكم لتصميم cubic-bezier() ومعاينة الحركة.", keywords: ["bezier", "easing"] },
  "contrast-checker": { name: "فاحص التباين", short: "حكم WCAG AA/AAA", description: "فحص نسبة التباين بين لونين مع حكم WCAG AA / AAA.", keywords: ["contrast", "wcag"] }
};
