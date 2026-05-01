import type { CategoryBundle, CategoryI18n, CategoryId } from "./types";
import type { Locale } from "@/lib/i18n";

export const categoryOrder: CategoryId[] = [
  "compression",
  "conversion",
  "editing",
  "ai",
  "generation",
  "metadata",
  "pdf",
  "media",
  "design",
  "developer",
  "api",
  "security",
  "network"
];

const tr: CategoryBundle = {
  compression: {
    name: "Sıkıştırma",
    short: "Daha küçük dosyalar",
    description: "Görseli, SVG'yi ve PDF'i kaliteden ödün vermeden küçültün."
  },
  conversion: {
    name: "Dönüştürme",
    short: "Format değiştirme",
    description: "Bir formattan diğerine: PNG, JPG, WebP, AVIF, HEIC, PDF, ICO, SVG."
  },
  editing: {
    name: "Düzenleme",
    short: "Boyut, kesim, efekt",
    description: "Yeniden boyutlandırın, kesin, döndürün, pixelart üretin, filtre uygulayın."
  },
  ai: {
    name: "AI Araçları",
    short: "Tarayıcıda yapay zekâ",
    description: "Arkaplan kaldırma, upscale, OCR — model tarayıcınıza inip orada çalışır."
  },
  generation: {
    name: "Üretim",
    short: "Yeni içerik üret",
    description: "QR kod, palet, mockup, ASCII art, OG görsel."
  },
  metadata: {
    name: "Meta & Animasyon",
    short: "EXIF ve GIF",
    description: "EXIF okuma/temizleme, GIF üretme/parçalama."
  },
  developer: {
    name: "Geliştirici",
    short: "JSON, Base64, hash, regex",
    description: "JSON formatla, Base64 / URL / JWT decode et, hash & UUID üret, regex test et, renkleri çevir."
  },
  pdf: {
    name: "PDF Araçları",
    short: "Birleştir, böl, döndür",
    description: "PDF'leri birleştir, böl, döndür, sırala, kilit kaldır, metin çıkart — hepsi tarayıcıda."
  },
  design: {
    name: "Tasarım Yardımcıları",
    short: "Gradient, gölge, kontrast",
    description: "Gradient / box-shadow / radius / cubic-bezier üret, WCAG kontrast & renk körlüğü simülasyonu."
  },
  media: {
    name: "Video & Ses",
    short: "ffmpeg.wasm tarayıcıda",
    description: "Video sıkıştır, kırp, GIF'e dönüştür; ses ayıkla, sesi mp3'e çevir — hepsi ffmpeg.wasm ile cihazında."
  },
  api: {
    name: "API & HTTP",
    short: "Postman-lite tarayıcıda",
    description: "HTTP request builder, cURL ↔ fetch converter, GraphQL playground, WebSocket tester ve status code referansı."
  },
  security: {
    name: "Güvenlik",
    short: "Şifre, TOTP, AES",
    description: "Password generator + güç metresi, TOTP/2FA, bcrypt hash, AES-GCM şifreleme — Web Crypto'yla tarayıcıda."
  },
  network: {
    name: "Ağ & Sysadmin",
    short: "IP, DNS, cron",
    description: "IP/CIDR hesaplayıcı, DoH üzerinden DNS lookup, cron expression builder, Unix timestamp dönüştürücü."
  }
};

const en: CategoryBundle = {
  compression: {
    name: "Compression",
    short: "Smaller files",
    description: "Shrink images, SVG and PDF without losing quality."
  },
  conversion: {
    name: "Conversion",
    short: "Format swap",
    description: "Move between PNG, JPG, WebP, AVIF, HEIC, PDF, ICO, SVG."
  },
  editing: {
    name: "Editing",
    short: "Resize, crop, filter",
    description: "Resize, crop, rotate, build pixelart, apply filters and watermarks."
  },
  ai: {
    name: "AI Tools",
    short: "On-device intelligence",
    description: "Background removal, upscaling, OCR — the model runs in your browser."
  },
  generation: {
    name: "Generation",
    short: "Generate new content",
    description: "QR codes, palettes, device mockups, ASCII art, OG images."
  },
  metadata: {
    name: "Meta & Animation",
    short: "EXIF and GIF",
    description: "Inspect/strip EXIF, build/extract animated GIFs."
  },
  developer: {
    name: "Developer",
    short: "JSON, Base64, hash, regex",
    description: "Format JSON, decode Base64 / URL / JWT, hash & UUID, test regex, convert colors."
  },
  pdf: {
    name: "PDF Tools",
    short: "Merge, split, rotate",
    description: "Merge, split, rotate, reorder, unlock and extract text from PDFs — fully in-browser."
  },
  design: {
    name: "Design Helpers",
    short: "Gradient, shadow, contrast",
    description: "Generate gradients, box shadows, radii and cubic-beziers; check WCAG contrast and simulate colour blindness."
  },
  media: {
    name: "Video & Audio",
    short: "ffmpeg.wasm in your browser",
    description: "Compress video, trim, convert to GIF; extract audio, transcode to mp3 — all via ffmpeg.wasm on-device."
  },
  api: {
    name: "API & HTTP",
    short: "Postman-lite in the browser",
    description: "HTTP request builder, cURL ↔ fetch converter, GraphQL playground, WebSocket tester and a status-code reference."
  },
  security: {
    name: "Security",
    short: "Password, TOTP, AES",
    description: "Password generator + strength meter, TOTP/2FA, bcrypt hashing, AES-GCM encryption — all in-browser via Web Crypto."
  },
  network: {
    name: "Network & Sysadmin",
    short: "IP, DNS, cron",
    description: "IP/CIDR calculator, DNS lookup over DoH, cron expression builder, Unix timestamp converter."
  }
};

const de: CategoryBundle = {
  compression: {
    name: "Komprimierung",
    short: "Kleinere Dateien",
    description: "Bilder, SVG und PDF ohne Qualitätsverlust verkleinern."
  },
  conversion: {
    name: "Konvertierung",
    short: "Format wechseln",
    description: "Zwischen PNG, JPG, WebP, AVIF, HEIC, PDF, ICO und SVG wechseln."
  },
  editing: {
    name: "Bearbeitung",
    short: "Größe, Zuschnitt, Effekt",
    description: "Skalieren, zuschneiden, drehen, Pixelart, Filter und Wasserzeichen."
  },
  ai: {
    name: "KI-Werkzeuge",
    short: "Intelligenz im Browser",
    description: "Hintergrund entfernen, Hochskalieren, OCR — Modell läuft im Browser."
  },
  generation: {
    name: "Generierung",
    short: "Neue Inhalte",
    description: "QR-Codes, Paletten, Geräte-Mockups, ASCII-Art, OG-Bilder."
  },
  metadata: {
    name: "Meta & Animation",
    short: "EXIF und GIF",
    description: "EXIF lesen/entfernen, animierte GIFs erstellen/zerlegen."
  },
  developer: {
    name: "Entwickler",
    short: "JSON, Base64, Hash, Regex",
    description: "JSON formatieren, Base64 / URL / JWT dekodieren, Hash & UUID, Regex testen, Farben konvertieren."
  },
  pdf: {
    name: "PDF-Werkzeuge",
    short: "Zusammenführen, teilen, drehen",
    description: "PDFs zusammenführen, teilen, drehen, neu ordnen, entsperren und Text extrahieren — alles im Browser."
  },
  design: {
    name: "Design-Helfer",
    short: "Gradient, Schatten, Kontrast",
    description: "Gradient / Box-Shadow / Radius / Cubic-Bezier erzeugen, WCAG-Kontrast & Farbenblindheit simulieren."
  },
  media: {
    name: "Video & Audio",
    short: "ffmpeg.wasm im Browser",
    description: "Video komprimieren, schneiden, in GIF wandeln; Audio extrahieren oder als mp3 transkodieren — alles via ffmpeg.wasm."
  },
  api: {
    name: "API & HTTP",
    short: "Postman-lite im Browser",
    description: "HTTP-Request-Builder, cURL↔fetch-Konverter, GraphQL-Playground, WebSocket-Tester und Status-Code-Referenz."
  },
  security: {
    name: "Sicherheit",
    short: "Passwort, TOTP, AES",
    description: "Passwort-Generator + Stärke-Meter, TOTP/2FA, Bcrypt-Hash, AES-GCM-Verschlüsselung — im Browser via Web Crypto."
  },
  network: {
    name: "Netzwerk & Sysadmin",
    short: "IP, DNS, Cron",
    description: "IP/CIDR-Rechner, DNS-Lookup via DoH, Cron-Builder, Unix-Timestamp-Konverter."
  }
};

const ar: CategoryBundle = {
  compression: {
    name: "الضغط",
    short: "ملفات أصغر",
    description: "قلّص الصور وSVG وPDF دون فقدان الجودة."
  },
  conversion: {
    name: "التحويل",
    short: "تبديل الصيغ",
    description: "بين PNG وJPG وWebP وAVIF وHEIC وPDF وICO وSVG."
  },
  editing: {
    name: "التعديل",
    short: "حجم، قص، فلتر",
    description: "تغيير الحجم، القص، التدوير، البكسل آرت، الفلاتر، العلامات المائية."
  },
  ai: {
    name: "أدوات الذكاء الاصطناعي",
    short: "الذكاء داخل المتصفح",
    description: "إزالة الخلفية، رفع الجودة، OCR — النموذج يعمل في متصفحك."
  },
  generation: {
    name: "التوليد",
    short: "محتوى جديد",
    description: "رموز QR، لوحات الألوان، نماذج الأجهزة، ASCII، صور OG."
  },
  metadata: {
    name: "الميتا والرسوم",
    short: "EXIF وGIF",
    description: "قراءة/تنظيف EXIF، إنشاء/تفكيك GIF متحرك."
  },
  developer: {
    name: "أدوات المطورين",
    short: "JSON وBase64 وHash وRegex",
    description: "تنسيق JSON، فك Base64 / URL / JWT، Hash وUUID، اختبار Regex، تحويل الألوان."
  },
  pdf: {
    name: "أدوات PDF",
    short: "دمج، تقسيم، تدوير",
    description: "دمج، تقسيم، تدوير، إعادة ترتيب، فتح، واستخراج نص من PDF — كل ذلك في المتصفح."
  },
  design: {
    name: "مساعدات التصميم",
    short: "تدرج، ظل، تباين",
    description: "توليد تدرجات / ظلال / نصف قطر / cubic-bezier، فحص تباين WCAG ومحاكاة عمى الألوان."
  },
  media: {
    name: "فيديو وصوت",
    short: "ffmpeg.wasm في المتصفح",
    description: "ضغط الفيديو، قصّ، تحويل إلى GIF؛ استخراج الصوت أو تحويله إلى mp3 — كل ذلك عبر ffmpeg.wasm على جهازك."
  },
  api: {
    name: "API و HTTP",
    short: "Postman-lite في المتصفح",
    description: "بناء طلبات HTTP، تحويل cURL ↔ fetch، ساحة GraphQL، اختبار WebSocket ومرجع رموز الحالة."
  },
  security: {
    name: "الأمان",
    short: "كلمات السر، TOTP، AES",
    description: "مولّد كلمات السر + مقياس القوة، TOTP/2FA، تجزئة Bcrypt، تشفير AES-GCM — كله في المتصفح عبر Web Crypto."
  },
  network: {
    name: "الشبكة والإدارة",
    short: "IP، DNS، cron",
    description: "حاسبة IP/CIDR، بحث DNS عبر DoH، باني cron، محوّل Unix timestamp."
  }
};

export const categoryContent: Record<Locale, CategoryBundle> = { tr, en, de, ar };

export function localizedCategory(locale: Locale, id: CategoryId): CategoryI18n {
  return categoryContent[locale][id];
}

export type { CategoryI18n };
