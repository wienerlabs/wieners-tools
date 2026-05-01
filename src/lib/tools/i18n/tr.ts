import type { ToolI18nBundle } from "../types";

export const toolsTR: ToolI18nBundle = {
  "compress-image": {
    name: "Görsel Sıkıştırıcı",
    short: "JPEG/PNG/WebP/AVIF küçült",
    description:
      "Görsellerinizi tarayıcıda hedef boyut veya kaliteye göre sıkıştırır. Birden fazla dosya, ayarlanabilir hedef MB ve maks genişlik desteklenir.",
    keywords: ["sıkıştır", "küçült", "compress", "image", "jpeg", "png", "webp", "avif"],
    cta: "Görsel ekle",
    options: {
      targetSize: "Hedef boyut (MB)",
      maxWidth: "Maks. genişlik (px)",
      quality: "Kalite",
      format: "Çıktı formatı",
      keepEXIF: "EXIF verisini koru",
      keepOriginalFormat: "Orijinal format"
    },
    errors: {
      tooLarge: "Bu dosya 100 MB üzerinde."
    }
  },
  "optimize-svg": {
    name: "SVG Optimizer",
    short: "SVG küçült",
    description: "SVGO ile gereksiz path/metadata temizler.",
    keywords: ["svg", "optimize", "küçült"]
  },
  "compress-pdf": {
    name: "PDF Sıkıştırıcı",
    short: "PDF küçült",
    description: "Görselleri yeniden örnekleyerek PDF boyutunu düşürür.",
    keywords: ["pdf", "compress"]
  },
  "convert-format": {
    name: "Format Dönüştürücü",
    short: "PNG ↔ JPG ↔ WebP ↔ AVIF",
    description:
      "Görsellerinizi tarayıcıda farklı formatlara çevirir. PNG, JPEG, WebP, AVIF arası birbirine.",
    keywords: ["dönüştür", "convert", "format", "png", "jpeg", "webp"],
    options: {
      format: "Hedef format",
      quality: "Kalite (JPEG/WebP/AVIF)"
    }
  },
  "heic-to-jpg": {
    name: "HEIC → JPG",
    short: "iPhone HEIC dönüştürme",
    description: "Apple HEIC/HEIF dosyalarını JPEG/PNG'e çevirir.",
    keywords: ["heic", "iphone", "jpg"]
  },
  "image-to-pdf": {
    name: "Görsel → PDF",
    short: "Çoklu görsel tek PDF",
    description: "Sıralı görselleri tek bir PDF dosyasında birleştirir.",
    keywords: ["pdf", "birleştir"]
  },
  "pdf-to-image": {
    name: "PDF → Görsel",
    short: "PDF sayfalarını PNG yap",
    description: "PDF'in her sayfasını PNG/JPG olarak çıkartır.",
    keywords: ["pdf", "sayfa"]
  },
  "svg-to-png": {
    name: "SVG → PNG",
    short: "Vektörü raster yap",
    description: "SVG'yi belirlediğiniz boyutta PNG'e dönüştürür.",
    keywords: ["svg", "png"]
  },
  "png-to-svg": {
    name: "PNG → SVG",
    short: "Raster vektörleştirme",
    description: "Potrace ile siyah-beyaz raster görseli vektöre çevirir.",
    keywords: ["png", "svg", "vektör"]
  },
  "favicon-generator": {
    name: "Favicon Üretici",
    short: "Tüm boyutlarda favicon",
    description:
      "Tek bir görselden 16, 32, 48, 64, 96, 128, 192, 256 ve 512 px favicon paketi üretir.",
    keywords: ["favicon", "ico", "site", "logo"],
    options: {
      sizes: "Boyutlar"
    }
  },
  "resize-image": {
    name: "Boyutlandırıcı",
    short: "Genişlik/yükseklik ayarla",
    description:
      "Görseli px veya yüzde olarak yeniden boyutlandırır. Sosyal medya hazır boyutları desteklenir.",
    keywords: ["resize", "boyut", "genişlik", "yükseklik"],
    options: {
      mode: "Mod",
      width: "Genişlik",
      height: "Yükseklik",
      keepAspect: "Oranı koru",
      preset: "Hazır boyut",
      modePixel: "Piksel",
      modePercent: "Yüzde",
      modePreset: "Hazır boyut"
    }
  },
  "crop-image": {
    name: "Kesici",
    short: "Görseli kırp",
    description: "Sürükle-kes arayüzüyle görsel kırpma.",
    keywords: ["crop", "kes"]
  },
  "rotate-flip": {
    name: "Döndür & Çevir",
    short: "Yatay/dikey çevirme + 90°",
    description: "Görseli 90/180/270 derece döndürür, yatay veya dikey aynalar.",
    keywords: ["rotate", "flip", "döndür"],
    options: {
      rotation: "Açı",
      flipX: "Yatay çevir",
      flipY: "Dikey çevir"
    }
  },
  pixelart: {
    name: "Pixelart Üretici",
    short: "Görseli piksele çevir",
    description:
      "Görseli istediğiniz piksel boyutuna indirip palet uygulayarak retro pixelart üretir.",
    keywords: ["pixel", "art", "8bit", "16bit"],
    options: {
      pixelSize: "Piksel boyutu",
      palette: "Palet",
      paletteFull: "Tam (256 renk)",
      palette16: "16 renk",
      palette8: "8 renk",
      palette4: "4 renk",
      paletteGameboy: "Gameboy"
    }
  },
  "adjust-color": {
    name: "Renk Ayarı",
    short: "Parlaklık/kontrast/doygunluk",
    description: "CSS-canvas filter ile parlaklık, kontrast, doygunluk, ton.",
    keywords: ["renk", "parlaklık", "kontrast"],
    options: {
      brightness: "Parlaklık",
      contrast: "Kontrast",
      saturation: "Doygunluk",
      hue: "Ton"
    }
  },
  "apply-filter": {
    name: "Filtre Uygula",
    short: "Vintage / Duotone / B&W",
    description: "Hazır görsel filtreleri: siyah-beyaz, vintage, sepia, duotone, soğuk, sıcak.",
    keywords: ["filtre", "vintage", "siyah beyaz"],
    options: {
      preset: "Filtre",
      presetNone: "Yok",
      presetGrayscale: "Siyah-beyaz",
      presetSepia: "Sepia",
      presetVintage: "Vintage",
      presetCold: "Soğuk",
      presetWarm: "Sıcak",
      presetInvert: "Negatif"
    }
  },
  "add-watermark": {
    name: "Filigran Ekle",
    short: "Metin/görsel watermark",
    description: "Köşe veya tile filigran.",
    keywords: ["watermark", "filigran"]
  },
  "blur-region": {
    name: "Bölge Bulanıklaştır",
    short: "Yüz/yazı sansürle",
    description: "İstenen bölgeyi blur veya pixelate.",
    keywords: ["blur", "pixelate"]
  },
  "collage-maker": {
    name: "Kolaj Üretici",
    short: "Birden çok görseli birleştir",
    description: "Grid/serbest kolaj.",
    keywords: ["kolaj", "collage"]
  },
  "image-splitter": {
    name: "Görsel Parçalayıcı",
    short: "Instagram puzzle",
    description: "Bir görseli grid'e böler.",
    keywords: ["split", "parçala"]
  },
  "remove-background": {
    name: "Arkaplan Kaldır",
    short: "AI ile transparan arkaplan",
    description: "ONNX modeli tarayıcıda; foto sunucuya gitmez.",
    keywords: ["arkaplan", "transparan", "remove background"]
  },
  "upscale-image": {
    name: "Görsel Büyüt",
    short: "AI 2x/4x upscale",
    description: "Real-ESRGAN ONNX ile çözünürlük artırma.",
    keywords: ["upscale", "büyüt", "AI"]
  },
  "image-ocr": {
    name: "Görselden Yazı (OCR)",
    short: "Görseldeki metni çıkar",
    description: "tesseract.js ile çoklu dil OCR.",
    keywords: ["ocr", "metin", "yazı"]
  },
  "qr-generator": {
    name: "QR Kod Üretici",
    short: "Logo gömülebilir QR",
    description:
      "URL, metin, kart, telefon ve e-posta için QR kod. Renk, hata düzeltme ve logo opsiyonları.",
    keywords: ["qr", "barkod", "kod"],
    options: {
      content: "İçerik",
      level: "Hata düzeltme",
      size: "Boyut",
      foreground: "Çizgi rengi",
      background: "Arkaplan rengi",
      margin: "Kenar boşluğu"
    }
  },
  "palette-extractor": {
    name: "Palet Çıkartıcı",
    short: "Görselden renk paleti",
    description: "Bir görselden 5–12 renkli baskın renk paleti çıkartır.",
    keywords: ["palet", "renk", "color"],
    options: {
      count: "Renk sayısı"
    }
  },
  "color-picker": {
    name: "Renk Seçici",
    short: "Foto üzerinden hex/rgb",
    description: "Görsel üzerinden renk seçer.",
    keywords: ["renk seç", "color picker"]
  },
  "mockup-generator": {
    name: "Mockup Üretici",
    short: "Cihaz çerçeveleri",
    description: "iPhone, MacBook, browser çerçevesi içinde sunum.",
    keywords: ["mockup", "iphone", "macbook"]
  },
  "og-image-generator": {
    name: "OG Görsel Üretici",
    short: "Twitter/OG kart",
    description: "Sosyal paylaşım kartı tasarımı.",
    keywords: ["og", "twitter", "card"]
  },
  "ascii-art": {
    name: "ASCII Art",
    short: "Görseli karakterlere çevir",
    description: "Görseli ASCII karakterlerine çevirir, monospace bloka kopyala.",
    keywords: ["ascii", "art", "text"],
    options: {
      width: "Karakter genişliği",
      charset: "Karakter seti",
      colored: "Renkli HTML çıktı"
    }
  },
  "exif-viewer": {
    name: "EXIF İnceleyici",
    short: "Foto meta-verisi",
    description: "EXIF verisini gösterir, ister temizler.",
    keywords: ["exif", "meta"]
  },
  "gif-maker": {
    name: "GIF Üretici",
    short: "Frame'lerden animasyon",
    description: "Birden çok kareden animasyonlu GIF.",
    keywords: ["gif", "animasyon"]
  },
  "gif-extractor": {
    name: "GIF Parçalayıcı",
    short: "Frame'leri çıkart",
    description: "GIF'in karelerini PNG olarak çıkartır.",
    keywords: ["gif", "frame"]
  }
};
