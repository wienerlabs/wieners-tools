import type { CategoryBundle, CategoryI18n, CategoryId } from "./types";
import type { Locale } from "@/lib/i18n";

export const categoryOrder: CategoryId[] = [
  "compression",
  "conversion",
  "editing",
  "ai",
  "generation",
  "metadata",
  "developer"
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
  }
};

export const categoryContent: Record<Locale, CategoryBundle> = { tr, en, de, ar };

export function localizedCategory(locale: Locale, id: CategoryId): CategoryI18n {
  return categoryContent[locale][id];
}

export type { CategoryI18n };
