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
  "contrast-checker": { name: "فاحص التباين", short: "حكم WCAG AA/AAA", description: "فحص نسبة التباين بين لونين مع حكم WCAG AA / AAA.", keywords: ["contrast", "wcag"] },

  // ------------- وسائط
  "video-compress": { name: "ضاغط الفيديو", short: "تصغير MP4/MOV/WebM", description: "ضغط الفيديو محلياً عبر ffmpeg.wasm.", keywords: ["video", "ffmpeg"], options: { crf: "الجودة (CRF)", maxHeight: "أقصى ارتفاع", preset: "Preset" } },
  "video-trim": { name: "قاص الفيديو", short: "اقتطاع مقطع", description: "اختر بداية ونهاية لاستخراج مقطع.", keywords: ["video", "trim"], options: { start: "البداية", end: "النهاية" } },
  "video-to-gif": { name: "فيديو → GIF", short: "GIF متكرر من مقطع", description: "حوّل مقطع فيديو إلى GIF متكرر. FPS وعرض ونافذة.", keywords: ["video", "gif"], options: { fps: "FPS", width: "العرض", start: "البداية", duration: "المدة" } },
  "extract-audio": { name: "استخراج الصوت", short: "صوت من فيديو", description: "احفظ المسار الصوتي للفيديو كـ MP3 أو WAV.", keywords: ["audio"], options: { format: "الصيغة" } },
  "audio-convert": { name: "محوّل الصوت", short: "MP3 / WAV / OGG", description: "تحويل ملف صوتي بين MP3 وWAV وOGG.", keywords: ["audio"], options: { format: "الصيغة", bitrate: "Bitrate" } },
  "mute-video": { name: "كتم الفيديو", short: "إزالة المسار الصوتي", description: "إزالة المسار الصوتي وتنزيل ملف صامت.", keywords: ["video", "mute"] },

  // ------------- توسعة الذكاء الاصطناعي
  "smart-crop": { name: "قص ذكي", short: "قص بناءً على البروز", description: "قص تلقائي إلى أبرز منطقة عبر خريطة saliency.", keywords: ["crop"], options: { aspect: "النسبة", padding: "التبطين" } },
  "photo-restore": { name: "ترميم الصور", short: "تقليل الضوضاء + الحدّة", description: "تحسين التباين والحبيبات والحدة عبر convolution داخل المتصفح.", keywords: ["restore"], options: { strength: "القوة" } },
  "face-anonymizer": { name: "تشويش الوجوه", short: "تشويش الوجوه تلقائياً", description: "تحديد الوجوه على الجهاز وتشويشها. قريباً — تنزيل النموذج عند الطلب.", keywords: ["face", "blur"] },
  "object-detection": { name: "كشف الكائنات", short: "YOLO في المتصفح", description: "كشف كائنات يومية بنموذج YOLO صغير. قريباً — تنزيل النموذج بعد الموافقة.", keywords: ["yolo"] },

  // ------------- API & HTTP
  "http-request": { name: "باني طلبات HTTP", short: "أرسل طلباً وشاهد الرد", description: "Postman-lite في المتصفح. GET/POST/PUT/PATCH/DELETE، headers، JSON body.", keywords: ["http", "rest"], options: { method: "الطريقة", url: "الرابط", headers: "الترويسات", body: "الجسم" } },
  "curl-converter": { name: "cURL ↔ كود", short: "curl → fetch / axios", description: "ألصق سطر cURL واحصل على كود fetch أو axios.", keywords: ["curl"], options: { target: "الهدف" } },
  "graphql-tester": { name: "ساحة GraphQL", short: "endpoint + استعلام → رد", description: "أرسل استعلام GraphQL مع variables إلى أي endpoint وافحص JSON.", keywords: ["graphql"], options: { endpoint: "Endpoint", query: "الاستعلام", variables: "Variables" } },
  "websocket-tester": { name: "اختبار WebSocket", short: "اتصل، أرسل، استقبل", description: "افتح WebSocket إلى wss:// أو ws://، أرسل رسائل، شاهد سجل الإطارات.", keywords: ["websocket"] },
  "http-status": { name: "رموز HTTP", short: "مرجع 100→599 قابل للبحث", description: "كل رموز HTTP باسمها ومعناها. ابحث بالرقم أو الكلمة.", keywords: ["http", "status"] },

  // ------------- الأمان
  "totp-generator": { name: "مولد TOTP / 2FA", short: "كود حي 6 أرقام من otpauth", description: "ألصق رابط otpauth:// أو سر Base32. الكود الحالي مع عداد 30 ثانية.", keywords: ["totp", "2fa"], options: { input: "السر أو رابط otpauth", digits: "الأرقام", period: "المدة" } },
  "password-generator": { name: "مولد كلمات السر", short: "قواعد مخصصة، إخراج كثير", description: "كلمات سر crypto-random؛ الطول والرموز والأرقام واستبعاد الملتبس قابلة للتعديل.", keywords: ["password"], options: { length: "الطول", count: "العدد", uppercase: "A-Z", lowercase: "a-z", digits: "0-9", symbols: "الرموز", excludeAmbiguous: "استبعاد المتشابه" } },
  "password-strength": { name: "مقياس قوة كلمة السر", short: "Entropy + زمن الكسر", description: "تقييم بـ بتات entropy وتنوع الفئات وزمن brute-force.", keywords: ["password"] },
  "bcrypt-tool": { name: "Bcrypt تجزئة + تحقق", short: "جزّئ كلمة سر، تحقق من تجزئة", description: "إنشاء bcrypt hash لكلمة سر أو التحقق من كلمة سر مقابل hash.", keywords: ["bcrypt"], options: { mode: "الوضع", rounds: "Rounds" } },
  "aes-gcm": { name: "AES-GCM تشفير / فك", short: "تشفير متماثل موثّق", description: "AES-256-GCM عبر Web Crypto. توليد مفتاح، تشفير نص بـ IV عشوائي.", keywords: ["aes", "gcm"], options: { mode: "الوضع", key: "المفتاح (base64)" } },

  // ------------- مطورون (تحويل بيانات)
  "csv-json": { name: "CSV ↔ JSON", short: "محوّل ثنائي الاتجاه", description: "كشف الترويسات والفواصل؛ CSV إلى JSON أو العكس.", keywords: ["csv", "json"], options: { direction: "الاتجاه", delimiter: "الفاصل", header: "الصف الأول ترويسة" } },
  "json-yaml": { name: "JSON ↔ YAML", short: "محوّل ثنائي الاتجاه", description: "تحويل JSON ↔ YAML بدون فقد. مع ضبط المسافات لـ YAML.", keywords: ["json", "yaml"], options: { direction: "الاتجاه", indent: "المسافات" } },
  "sql-formatter": { name: "منسّق SQL", short: "تنسيق SQL", description: "تنسيق SQL بمسافات متّسقة وحالة كلمات مفتاحية موحدة.", keywords: ["sql"], options: { keywordCase: "حالة الكلمات", indent: "المسافات" } },
  "slug-generator": { name: "مولد Slug", short: "Slug آمن للـ URL", description: "تحويل أي نص إلى slug آمن للـ URL مع ترجمة الأحرف غير ASCII.", keywords: ["slug", "url"], options: { separator: "الفاصل", lowercase: "أحرف صغيرة" } },
  "case-converter": { name: "محوّل الحالة", short: "camel ↔ snake ↔ kebab ↔ pascal", description: "تحويل نص بين camelCase وsnake_case وkebab-case وPascalCase وCONSTANT_CASE وTitle Case.", keywords: ["case"] },

  // ------------- شبكة / Sysadmin
  "ip-cidr": { name: "حاسبة IP / CIDR", short: "Subnet، broadcast، عدد الأجهزة", description: "IPv4 مع CIDR (مثلاً 10.0.0.0/24). Network، broadcast، أول/آخر host، mask.", keywords: ["ip", "cidr"] },
  "dns-lookup": { name: "بحث DNS (DoH)", short: "A / AAAA / MX / TXT / CNAME", description: "DNS عبر HTTPS من Cloudflare. A, AAAA, MX, TXT, CNAME, NS, SOA, CAA.", keywords: ["dns", "doh"], options: { type: "نوع السجل" } },
  "cron-builder": { name: "باني Cron", short: "بناء + شرح cron", description: "تأليف cron من 5 حقول، معناه بالنص، الـ 5 تشغيلات التالية.", keywords: ["cron"], options: { expression: "Cron expression" } },
  "timestamp": { name: "محوّل Timestamp", short: "Unix ↔ ISO ↔ نسبي", description: "تحويل بين Unix epoch (s/ms)، ISO 8601، RFC 1123 ووقت نسبي مقروء.", keywords: ["timestamp", "unix"], options: { input: "المدخل" } },
  "token-counter": { name: "عدّاد Tokens", short: "تقدير tokens + التكلفة بالـ USD", description: "ألصق برومبت واحصل على عدد tokens تقريبي + تكلفة لـ Claude / GPT / Gemini.", keywords: ["token", "تكلفة", "llm"] },
  "llm-compare": { name: "LLM جنباً إلى جنب", short: "برومبت واحد لعدة نماذج", description: "قارن مخرجات Claude / GPT / Gemini. قريباً — بمفاتيح API الخاصة بك.", keywords: ["llm"] },
  "mcp-tester": { name: "فاحص MCP", short: "تحقق JSON لـ Model Context Protocol", description: "ألصق إعداد MCP server؛ تحقق هيكلي + ملخص.", keywords: ["mcp"] },
  "json-schema": { name: "مولّد JSON Schema", short: "اشتق Schema من عينة", description: "ألصق JSON واحصل على Draft 2020-12 schema.", keywords: ["json", "schema"] },
  "openapi-viewer": { name: "متصفح OpenAPI", short: "Paths + methods + parameters", description: "ألصق OpenAPI 3 YAML/JSON واحصل على جدول endpoints مع parameters وresponses.", keywords: ["openapi", "swagger"] },
  "video-downloader": {
    name: "محمّل الفيديو (macOS)",
    short: "ألصق رابطاً، احصل على MP4",
    description:
      "حمّل الفيديو من YouTube و TikTok و Instagram و Twitter و Reddit و1800+ موقع. تطبيق macOS صغير — yt-dlp + ffmpeg مضمّنين، كل شيء يبقى على Mac الخاص بك، بدون سيرفر.",
    keywords: ["فيديو", "تحميل", "youtube", "tiktok", "mp4", "yt-dlp", "macos"],
    options: {
      tagline: "ألصق الرابط → MP4. ليس في المتصفح — في تطبيق macOS صغير.",
      whyNotBrowser: "لماذا ليس في المتصفح مباشرة؟",
      whyNotBrowserBody:
        "YouTube و TikTok و Instagram تحجب طلبات fetch من المتصفح عبر CORS. الرابط الذي تلصقه ليس الفيديو نفسه — الـ MP4 الفعلي خلف manifests موقّعة بالتشفير. حلّ ذلك يحتاج ~5000 سطر Python في yt-dlp. لذلك Wiener DL تطبيق native صغير.",
      installTitle: "التثبيت",
      step1: "↓ حمّل ملف .dmg",
      step2: "افتحه، اسحب Wiener DL.app إلى Applications",
      step3: "أول تشغيل: انقر باليمين → فتح → فتح (التطبيق غير موثّق notarized بعد)",
      step4: "ألصق الرابط، اضغط تحميل.",
      cta: "تحميل Wiener DL.app",
      ctaSecondary: "الكود المصدري على GitHub",
      whatsInside: "ما بداخله",
      bundleYtdlp: "yt-dlp (دعم 1800+ موقع)",
      bundleFfmpeg: "ffmpeg + ffprobe (تحويل codec)",
      bundleNative: "Tauri + Rust (~5 MB native binary)",
      bundleNoServer: "بدون سيرفرات، بدون telemetry",
      sizeHint: "~135 MB · Apple Silicon و Intel · macOS 11+",
      privacyTitle: "الخصوصية",
      privacyBody:
        "الروابط، بيانات الفيديو، أي شيء — لا شيء يغادر Mac الخاص بك. Wiener Labs فقط يخدم الـ .dmg عبر GitHub Releases.",
      licenseTitle: "الترخيص والاستخدام المسؤول",
      licenseBody:
        "كود التطبيق MIT. yt-dlp بترخيص Unlicense، ffmpeg LGPL. هذه الأداة ليست لإعادة نشر محتوى محمي بحقوق الطبع — ذلك غير قانوني وغير أخلاقي."
    }
  },
  architect: {
    name: "Architect",
    short: "حوّل وصف النص إلى مخطط معماري",
    description:
      "صف نظامك؛ يولّد الذكاء الاصطناعي مخطط Mermaid هرمي ونظيف. أوضاع C4 / flowchart / sequence / ER / state، معاينة حية، تصدير SVG/PNG.",
    keywords: ["معمارية", "مخطط", "mermaid", "ai", "c4", "تدفق"],
    options: {
      describe: "صف النظام",
      stack: "Tech stack",
      scale: "الحجم / القيود",
      kind: "نوع المخطط",
      generate: "توليد",
      refine: "تحسين",
      simpler: "أبسط",
      addMonitoring: "إضافة Monitoring",
      addFailure: "إضافة مسارات الفشل",
      reformat: "تنظيف Mermaid",
      editSource: "تعديل المصدر",
      copyMermaid: "نسخ Mermaid",
      downloadSvg: "تحميل SVG",
      downloadPng: "تحميل PNG",
      preview: "معاينة",
      diagramAuto: "تلقائي",
      diagramFlowchart: "Flowchart",
      diagramC4: "C4 Container",
      diagramSequence: "Sequence",
      diagramEr: "ER",
      diagramState: "State",
      diagramDeployment: "Deployment",
      placeholderDescribe:
        "مثال: 'تطبيق TWAP execution على Solana. واجهة Next.js مع محفظة Solflare. DFlow swap routing، إيداع/سحب Kamino lending vault، Quicknode RPC + Streams لـ price feed وتأكيد المعاملات. يختار المستخدم نافذة 30د-2س ويُقسَّم إلى 3-6 شرائح، كل شريحة: سحب من Kamino + DFlow swap.'",
      placeholderStack: "Next.js · TypeScript · Solana web3.js · Tailwind",
      placeholderScale: "10k DAU، 500 execution متزامن",
      emptyTitle: "لا يوجد مخطط بعد",
      emptyHint: "صف النظام على اليسار واضغط توليد. يعيد الذكاء الاصطناعي Mermaid ويُعرَض هنا.",
      streaming: "جارٍ التوليد…",
      rateLimit: "تم بلوغ حد الطلبات. حاول بعد دقائق.",
      errorGeneric: "حدث خطأ.",
      sourceTitle: "مصدر Mermaid",
      copied: "تم النسخ"
    }
  }
};
