import type { ToolI18nBundle } from "../types";

export const toolsDE: ToolI18nBundle = {
  "compress-image": {
    name: "Bildkomprimierer",
    short: "JPEG/PNG/WebP/AVIF verkleinern",
    description:
      "Bilder im Browser nach Zielgröße oder Qualität komprimieren. Mehrere Dateien, individuelle Maximalbreite, EXIF beibehalten.",
    keywords: ["komprimieren", "verkleinern", "image", "jpeg", "png", "webp"],
    cta: "Bild hinzufügen",
    options: {
      targetSize: "Zielgröße (MB)",
      maxWidth: "Max. Breite (px)",
      quality: "Qualität",
      format: "Ausgabeformat",
      keepEXIF: "EXIF beibehalten",
      keepOriginalFormat: "Originalformat"
    }
  },
  "optimize-svg": { name: "SVG-Optimierer", short: "SVG verkleinern", description: "Mit SVGO entrümpeln.", keywords: ["svg"] },
  "compress-pdf": { name: "PDF-Komprimierer", short: "PDF verkleinern", description: "Bilder neu samplen, Größe reduzieren.", keywords: ["pdf"] },
  "convert-format": {
    name: "Format-Konverter",
    short: "PNG ↔ JPG ↔ WebP ↔ AVIF",
    description: "Zwischen PNG, JPEG, WebP und AVIF im Browser wechseln.",
    keywords: ["konvertieren", "format"],
    options: { format: "Zielformat", quality: "Qualität (JPEG/WebP/AVIF)" }
  },
  "heic-to-jpg": { name: "HEIC → JPG", short: "iPhone HEIC umwandeln", description: "Apple HEIC/HEIF in JPEG/PNG.", keywords: ["heic"] },
  "image-to-pdf": { name: "Bild → PDF", short: "Mehrere Bilder, ein PDF", description: "Bilder zu einem PDF zusammenfassen.", keywords: ["pdf"] },
  "pdf-to-image": { name: "PDF → Bild", short: "Seiten als PNG", description: "Jede PDF-Seite als PNG/JPG.", keywords: ["pdf"] },
  "svg-to-png": { name: "SVG → PNG", short: "Vektor rastern", description: "SVG in PNG.", keywords: ["svg"] },
  "png-to-svg": { name: "PNG → SVG", short: "Raster vektorisieren", description: "Schwarz-weiß-Raster mit Potrace.", keywords: ["png"] },
  "favicon-generator": {
    name: "Favicon-Generator",
    short: "Alle Größen aus einem Bild",
    description: "16/32/48/64/96/128/192/256/512 px Favicon-Set.",
    keywords: ["favicon"],
    options: { sizes: "Größen" }
  },
  "resize-image": {
    name: "Größenanpasser",
    short: "Breite / Höhe einstellen",
    description: "Per Pixel, Prozent oder Social-Media-Vorlage skalieren.",
    keywords: ["resize", "größe"],
    options: {
      mode: "Modus",
      width: "Breite",
      height: "Höhe",
      keepAspect: "Seitenverhältnis halten",
      preset: "Vorlage",
      modePixel: "Pixel",
      modePercent: "Prozent",
      modePreset: "Vorlage"
    }
  },
  "crop-image": { name: "Zuschneider", short: "Mit Griffen kürzen", description: "Drag-Crop.", keywords: ["crop"] },
  "rotate-flip": {
    name: "Drehen & Spiegeln",
    short: "90°/180°/270° + Spiegel",
    description: "Drehen oder horizontal/vertikal spiegeln.",
    keywords: ["rotate", "flip"],
    options: { rotation: "Winkel", flipX: "Horizontal spiegeln", flipY: "Vertikal spiegeln" }
  },
  pixelart: {
    name: "Pixelart-Maker",
    short: "Bild zu Pixelart",
    description: "Auf Pixelraster reduzieren und Palette anwenden.",
    keywords: ["pixel", "art"],
    options: {
      pixelSize: "Pixelgröße",
      palette: "Palette",
      paletteFull: "Voll (256 Farben)",
      palette16: "16 Farben",
      palette8: "8 Farben",
      palette4: "4 Farben",
      paletteGameboy: "Gameboy"
    }
  },
  "adjust-color": {
    name: "Farbanpassung",
    short: "Helligkeit/Kontrast/Sättigung",
    description: "Helligkeit, Kontrast, Sättigung, Farbton.",
    keywords: ["farbe"],
    options: { brightness: "Helligkeit", contrast: "Kontrast", saturation: "Sättigung", hue: "Farbton" }
  },
  "apply-filter": {
    name: "Filter anwenden",
    short: "Vintage / Duotone / S&W",
    description: "Voreinstellungen: Graustufen, Sepia, Vintage, Duotone, Kalt, Warm.",
    keywords: ["filter"],
    options: {
      preset: "Filter",
      presetNone: "Keiner",
      presetGrayscale: "Graustufen",
      presetSepia: "Sepia",
      presetVintage: "Vintage",
      presetCold: "Kalt",
      presetWarm: "Warm",
      presetInvert: "Negativ"
    }
  },
  "add-watermark": { name: "Wasserzeichen", short: "Text/Bild", description: "Ecke oder Kachel.", keywords: ["watermark"] },
  "blur-region": { name: "Bereich unscharf", short: "Gesichter/Text zensieren", description: "Blur oder Pixelate.", keywords: ["blur"] },
  "collage-maker": { name: "Collage-Maker", short: "Mehrere Bilder zusammenfügen", description: "Grid oder freie Anordnung.", keywords: ["collage"] },
  "image-splitter": { name: "Bild-Teiler", short: "Instagram-Puzzle", description: "Ein Bild in Raster zerteilen.", keywords: ["split"] },
  "remove-background": { name: "Hintergrund entfernen", short: "KI-transparenter Hintergrund", description: "ONNX-Modell läuft im Browser.", keywords: ["hintergrund"] },
  "upscale-image": { name: "Bild hochskalieren", short: "KI 2x/4x", description: "Real-ESRGAN ONNX.", keywords: ["upscale"] },
  "image-ocr": { name: "Bild-OCR", short: "Text aus Bild", description: "Mehrsprachiges OCR via tesseract.js.", keywords: ["ocr"] },
  "qr-generator": {
    name: "QR-Code-Generator",
    short: "Mit Logo einbettbar",
    description: "QR für URL, Text, vCard, Telefon, E-Mail mit Farb-, Fehlerkorrektur- und Logo-Optionen.",
    keywords: ["qr"],
    options: {
      content: "Inhalt",
      level: "Fehlerkorrektur",
      size: "Größe",
      foreground: "Vordergrund",
      background: "Hintergrund",
      margin: "Rand"
    }
  },
  "palette-extractor": {
    name: "Palette-Extraktor",
    short: "Farbpalette aus Bild",
    description: "5–12-farbige dominante Palette.",
    keywords: ["palette"],
    options: { count: "Anzahl Farben" }
  },
  "color-picker": { name: "Farbwähler", short: "Hex/RGB aus Foto", description: "Klicken, Farbe lesen.", keywords: ["color picker"] },
  "mockup-generator": { name: "Mockup-Generator", short: "Geräte-Rahmen", description: "iPhone, MacBook, Browser.", keywords: ["mockup"] },
  "og-image-generator": { name: "OG-Bild-Generator", short: "Twitter/OG-Karte", description: "Social-Share-Karten bauen.", keywords: ["og"] },
  "ascii-art": {
    name: "ASCII-Art",
    short: "Bild zu Zeichen",
    description: "Bild in Monospace-ASCII-Block übertragen.",
    keywords: ["ascii"],
    options: { width: "Zeichenbreite", charset: "Zeichensatz", colored: "Farbige HTML-Ausgabe" }
  },
  "exif-viewer": { name: "EXIF-Viewer", short: "Foto-Metadaten", description: "EXIF lesen oder entfernen.", keywords: ["exif"] },
  "gif-maker": { name: "GIF-Maker", short: "Animation aus Frames", description: "Animiertes GIF aus Frames.", keywords: ["gif"] },
  "gif-extractor": { name: "GIF-Extraktor", short: "Frames extrahieren", description: "GIF-Frames als PNG.", keywords: ["gif"] },

  // ------------- Entwickler
  "json-formatter": {
    name: "JSON-Formatierer",
    short: "JSON formatieren / minimieren",
    description: "JSON validieren, verschönern oder minimieren. Syntaxfehler mit Zeile/Spalte.",
    keywords: ["json", "format", "minify"],
    options: { indent: "Einrückung", sortKeys: "Schlüssel sortieren", action: "Aktion" }
  },
  "base64-encoder": {
    name: "Base64-Kodierer",
    short: "Text/Datei ↔ Base64",
    description: "Text oder Datei in Base64 kodieren oder zurück. URL-safe Variante.",
    keywords: ["base64"],
    options: { mode: "Modus", urlSafe: "URL-safe", input: "Eingabe" }
  },
  "url-encoder": {
    name: "URL-Kodierer",
    short: "encodeURIComponent / decode",
    description: "Prozentkodierung für URLs oder umgekehrt.",
    keywords: ["url", "uri"],
    options: { mode: "Modus", scope: "Bereich" }
  },
  "jwt-decoder": {
    name: "JWT-Decoder",
    short: "JWT inspizieren",
    description: "Header und Payload eines JWT dekodieren. Zeigt Ablauf, Algorithmus und Claims. Signatur wird nicht geprüft.",
    keywords: ["jwt", "token"]
  },
  "hash-generator": {
    name: "Hash-Generator",
    short: "MD5 / SHA-1 / SHA-256 / SHA-512",
    description: "Hash für Text oder Datei lokal via Web Crypto. SHA-1 / 256 / 384 / 512 plus MD5.",
    keywords: ["hash", "sha", "md5"],
    options: { algorithm: "Algorithmus", input: "Eingabe" }
  },
  "uuid-generator": {
    name: "UUID-Generator",
    short: "Bulk UUID v4 / nanoid",
    description: "UUID-v4-Stapel oder kurze nanoid-Style-IDs. Länge und Alphabet einstellbar.",
    keywords: ["uuid", "guid", "nanoid"],
    options: { count: "Anzahl", kind: "Typ", length: "Länge" }
  },
  "lorem-ipsum": {
    name: "Lorem-Ipsum-Generator",
    short: "Platzhaltertext",
    description: "Wörter, Sätze oder Absätze klassisches Lorem Ipsum. Optional in <p> verpackt.",
    keywords: ["lorem", "ipsum"],
    options: { unit: "Einheit", count: "Anzahl", html: "Mit <p> umhüllen" }
  },
  "regex-tester": {
    name: "Regex-Tester",
    short: "JS-Regex testen",
    description: "Regex gegen Testtext probieren. Markiert Treffer, Captures und Gruppen.",
    keywords: ["regex"],
    options: { pattern: "Muster", flags: "Flags", subject: "Testtext" }
  },
  "color-converter": {
    name: "Farbkonvertierer",
    short: "hex ↔ rgb ↔ hsl ↔ oklch",
    description: "Farbe zwischen hex, rgb, hsl und oklch umwandeln. Inkl. Kontrast vs. Weiß/Schwarz.",
    keywords: ["color", "farbe"],
    options: { input: "Eingabe" }
  },
  "diff-viewer": {
    name: "Text-Diff",
    short: "Zwei Texte vergleichen",
    description: "Side-by-side Diff zweier Texte — Zeilen- und Wortebene. Kein Upload, alles im Browser.",
    keywords: ["diff", "vergleich"],
    options: { left: "Links", right: "Rechts", mode: "Modus" }
  }
};
