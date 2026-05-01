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
  },

  // ------------- Geliştirici
  "json-formatter": {
    name: "JSON Düzenleyici",
    short: "JSON formatla / küçült",
    description: "JSON'u doğrula, güzelleştir veya küçült. Sözdizimi hatalarını satır/sütun ile gösterir.",
    keywords: ["json", "format", "minify", "düzenle", "doğrula"],
    options: { indent: "Girinti (boşluk)", sortKeys: "Anahtarları sırala", action: "İşlem" }
  },
  "base64-encoder": {
    name: "Base64 Kodlayıcı",
    short: "Metin / dosya ↔ Base64",
    description: "Metni veya herhangi bir dosyayı Base64'e çevir veya geri çöz. URL-safe varyant destekli.",
    keywords: ["base64", "kodla", "çöz"],
    options: { mode: "Mod", urlSafe: "URL-safe", input: "Girdi" }
  },
  "url-encoder": {
    name: "URL Kodlayıcı",
    short: "encodeURIComponent / decode",
    description: "URL'lerde kullanmak için yüzde işaretiyle kodla, ya da geri çöz.",
    keywords: ["url", "uri", "yüzde", "kodla"],
    options: { mode: "Mod", scope: "Kapsam" }
  },
  "jwt-decoder": {
    name: "JWT Çözücü",
    short: "JWT incele",
    description: "JSON Web Token başlık ve payload'unu çöz. Süre, algoritma ve claim'leri gösterir. İmza doğrulanmaz.",
    keywords: ["jwt", "token", "çöz"]
  },
  "hash-generator": {
    name: "Hash Üretici",
    short: "MD5 / SHA-1 / SHA-256 / SHA-512",
    description: "Web Crypto ile metin veya dosya hash'i. SHA-1 / 256 / 384 / 512 + MD5.",
    keywords: ["hash", "sha", "md5", "checksum"],
    options: { algorithm: "Algoritma", input: "Girdi" }
  },
  "uuid-generator": {
    name: "UUID Üretici",
    short: "Toplu UUID v4 / nanoid",
    description: "UUID v4 paketleri veya kısa nanoid tarzı ID'ler üret. Uzunluk ve alfabe özelleştirilebilir.",
    keywords: ["uuid", "guid", "nanoid", "id"],
    options: { count: "Adet", kind: "Tür", length: "Uzunluk" }
  },
  "lorem-ipsum": {
    name: "Lorem Ipsum Üretici",
    short: "Yer tutucu metin",
    description: "Klasik Lorem Ipsum'dan kelime, cümle veya paragraf üret. Opsiyonel HTML sarımı.",
    keywords: ["lorem", "ipsum", "yer tutucu"],
    options: { unit: "Birim", count: "Adet", html: "<p> ile sar" }
  },
  "regex-tester": {
    name: "Regex Test Aracı",
    short: "JS regex dene",
    description: "Bir düzenli ifadeyi test girdisine karşı dene. Eşleşmeleri, capture'ları ve grupları işaretler.",
    keywords: ["regex", "regexp", "eşleşme", "test"],
    options: { pattern: "Desen", flags: "Bayraklar", subject: "Test metni" }
  },
  "color-converter": {
    name: "Renk Dönüştürücü",
    short: "hex ↔ rgb ↔ hsl ↔ oklch",
    description: "Bir rengi hex / rgb / hsl / oklch arasında çevir. Beyaz/siyah'a göre kontrast oranını gösterir.",
    keywords: ["renk", "hex", "rgb", "hsl", "oklch"],
    options: { input: "Girdi" }
  },
  "diff-viewer": {
    name: "Metin Karşılaştırıcı",
    short: "İki metni karşılaştır",
    description: "İki metnin yan yana farkı — satır ve kelime düzeyinde. Yükleme yok, hepsi tarayıcıda.",
    keywords: ["diff", "karşılaştır", "metin"],
    options: { left: "Sol", right: "Sağ", mode: "Mod" }
  },

  // ------------- PDF
  "pdf-merge": {
    name: "PDF Birleştir",
    short: "PDF'leri sırayla birleştir",
    description: "Birden çok PDF bırak, sırayla birleştir. Dışa aktarmadan önce sırayı serbestçe değiştir.",
    keywords: ["pdf", "birleştir"]
  },
  "pdf-split": {
    name: "PDF Böl",
    short: "Sayfa veya aralıklara böl",
    description: "PDF'i tek sayfa veya aralıklara böl (örn. 1-3, 5, 8-).",
    keywords: ["pdf", "böl"],
    options: { mode: "Mod", ranges: "Aralıklar" }
  },
  "pdf-rotate": {
    name: "PDF Döndür",
    short: "Sayfaları döndür",
    description: "Seçili sayfaları 90/180/270° döndür.",
    keywords: ["pdf", "döndür"],
    options: { angle: "Açı" }
  },
  "pdf-reorder": {
    name: "PDF Sırala",
    short: "Sayfaları yeniden sırala",
    description: "PDF sayfalarını sürükle-bırak ile yeniden sırala ve dışa aktar.",
    keywords: ["pdf", "sırala", "sayfa"]
  },
  "pdf-metadata": {
    name: "PDF Metadata Düzenle",
    short: "Başlık / yazar / konu",
    description: "PDF info dictionary'sini gör ve düzenle — başlık, yazar, konu, anahtar kelimeler, üretici.",
    keywords: ["pdf", "metadata"]
  },
  "pdf-text-extract": {
    name: "PDF Metin Çıkart",
    short: "PDF'in metin katmanı",
    description: "PDF'in gömülü metin katmanını çıkart (OCR değil; taranmış PDF'ler için Image OCR'a bak).",
    keywords: ["pdf", "metin", "çıkart"]
  },

  // ------------- Tasarım yardımcıları
  "gradient-generator": {
    name: "Gradient Üretici",
    short: "Linear / radial / conic",
    description: "Stop'lar ve açı ile CSS gradient kur. Kopyalamaya hazır background-image string'i üretir.",
    keywords: ["gradient", "css"],
    options: { type: "Tür", angle: "Açı", stops: "Stop'lar" }
  },
  "box-shadow": {
    name: "Box Shadow Üretici",
    short: "Çoklu gölge",
    description: "Offset, blur, spread ve birden çok katman ile CSS box-shadow oluştur.",
    keywords: ["shadow", "css"]
  },
  "border-radius": {
    name: "Border Radius Üretici",
    short: "Köşe başına yarıçap",
    description: "Her köşenin yarıçapını görsel olarak ayarla, CSS'i kopyala.",
    keywords: ["border-radius", "css"]
  },
  "cubic-bezier": {
    name: "Cubic Bezier Editör",
    short: "Easing eğrisi önizleme",
    description: "İki kontrol noktasını sürükleyerek cubic-bezier() tasarla, hareketi önizle.",
    keywords: ["bezier", "easing", "animasyon"]
  },
  "contrast-checker": {
    name: "Kontrast Denetleyici",
    short: "WCAG AA/AAA kararı",
    description: "İki renk arasındaki kontrast oranını kontrol et, normal ve büyük metin için WCAG AA / AAA kararını gör.",
    keywords: ["kontrast", "wcag", "erişilebilirlik"]
  },

  // ------------- Medya
  "video-compress": {
    name: "Video Sıkıştırıcı",
    short: "MP4 / MOV / WebM küçült",
    description: "ffmpeg.wasm ile video'yu yerelinde sıkıştır. CRF ve çözünürlük seç; encoder cihazında çalışır.",
    keywords: ["video", "sıkıştır", "mp4", "ffmpeg"],
    options: { crf: "Kalite (CRF)", maxHeight: "Maks yükseklik", preset: "Preset" }
  },
  "video-trim": {
    name: "Video Kesici",
    short: "Klip al",
    description: "Başlangıç ve bitiş zamanı seç, mümkünse re-encode olmadan klip çıkart.",
    keywords: ["video", "kes", "trim"],
    options: { start: "Başlangıç", end: "Bitiş" }
  },
  "video-to-gif": {
    name: "Video → GIF",
    short: "Klip'ten döngü GIF",
    description: "Video parçasını döngü GIF'e çevir. FPS, genişlik ve trim penceresini ayarla.",
    keywords: ["video", "gif", "dönüştür"],
    options: { fps: "FPS", width: "Genişlik", start: "Başlangıç", duration: "Süre" }
  },
  "extract-audio": {
    name: "Ses Ayıkla",
    short: "Video'dan ses al",
    description: "Bir video'nun ses kanalını MP3 veya WAV olarak kaydet.",
    keywords: ["ses", "ayıkla", "mp3"],
    options: { format: "Format" }
  },
  "audio-convert": {
    name: "Ses Dönüştürücü",
    short: "MP3 / WAV / OGG",
    description: "Ses dosyasını MP3, WAV ve OGG arasında çevir; bitrate ayarlanabilir.",
    keywords: ["ses", "dönüştür", "mp3"],
    options: { format: "Format", bitrate: "Bitrate" }
  },
  "mute-video": {
    name: "Video Sustur",
    short: "Ses kanalını kaldır",
    description: "Video'nun ses kanalını sil, sessiz dosyayı indir.",
    keywords: ["video", "sustur", "ses"]
  },

  // ------------- AI genişletme
  "smart-crop": {
    name: "Akıllı Kırpma",
    short: "Saliency tabanlı odak",
    description: "Saliency haritası ile en ilgi çekici bölgeye otomatik kırp. Model indirme yok — canvas üzerinde çalışır.",
    keywords: ["kırp", "akıllı", "saliency"],
    options: { aspect: "Oran", padding: "Boşluk" }
  },
  "photo-restore": {
    name: "Fotoğraf Restorasyonu",
    short: "Gürültü + keskinleştirme",
    description: "Tarayıcı içi convolution boru hattı ile kontrast, gren ve keskinlik iyileştir.",
    keywords: ["restore", "keskinleştir", "denoise"],
    options: { strength: "Güç" }
  },
  "face-anonymizer": {
    name: "Yüz Bulanıklaştırıcı",
    short: "Yüzleri otomatik bulanıklaştır",
    description: "Cihazda küçük bir model ile yüzleri tespit et ve bulanıklaştır. Yakında — model ağırlıkları yalnızca talep üzerine indirilir.",
    keywords: ["yüz", "bulanıklaştır", "gizlilik"]
  },
  "object-detection": {
    name: "Nesne Tespiti",
    short: "Tarayıcıda YOLO",
    description: "Küçük YOLO tarzı modelle gündelik nesneleri tespit et. Yakında — büyük model dosyaları sadece onaydan sonra indirilir.",
    keywords: ["tespit", "yolo", "nesne"]
  }
};
