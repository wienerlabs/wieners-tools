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
  },

  // ------------- PDF
  "pdf-merge": { name: "PDF zusammenführen", short: "PDFs in Reihenfolge", description: "Mehrere PDFs zusammenführen, Reihenfolge frei änderbar.", keywords: ["pdf", "merge"] },
  "pdf-split": { name: "PDF teilen", short: "Seiten oder Bereiche", description: "PDF in Einzelseiten oder Bereiche teilen (z. B. 1-3, 5, 8-).", keywords: ["pdf", "split"], options: { mode: "Modus", ranges: "Bereiche" } },
  "pdf-rotate": { name: "PDF drehen", short: "Seiten drehen", description: "Ausgewählte Seiten um 90/180/270° drehen.", keywords: ["pdf", "rotate"], options: { angle: "Winkel" } },
  "pdf-reorder": { name: "PDF neu ordnen", short: "Seiten umsortieren", description: "PDF-Seiten per Drag & Drop umsortieren und exportieren.", keywords: ["pdf", "reorder"] },
  "pdf-metadata": { name: "PDF-Metadaten", short: "Titel / Autor / Thema", description: "PDF-Info-Dictionary anzeigen und bearbeiten.", keywords: ["pdf", "metadata"] },
  "pdf-text-extract": { name: "PDF-Text extrahieren", short: "Text-Layer auslesen", description: "Eingebetteten Text-Layer aus einer PDF ziehen (kein OCR).", keywords: ["pdf", "text"] },

  // ------------- Design-Helfer
  "gradient-generator": { name: "Gradient-Generator", short: "Linear / radial / conic", description: "CSS-Gradient mit Stops und Winkel.", keywords: ["gradient", "css"], options: { type: "Typ", angle: "Winkel", stops: "Stops" } },
  "box-shadow": { name: "Box-Shadow-Builder", short: "Mehrere Schatten", description: "CSS box-shadow mit Offset, Blur, Spread und mehreren Layern.", keywords: ["shadow", "css"] },
  "border-radius": { name: "Border-Radius-Builder", short: "Pro-Ecke-Radius", description: "Pro Ecke Radius einstellen und CSS kopieren.", keywords: ["border-radius", "css"] },
  "cubic-bezier": { name: "Cubic-Bezier-Editor", short: "Easing-Kurve", description: "Zwei Kontrollpunkte ziehen, Bewegung vorschau.", keywords: ["bezier", "easing"] },
  "contrast-checker": { name: "Kontrast-Checker", short: "WCAG AA/AAA", description: "Kontrastverhältnis zweier Farben mit WCAG-AA/AAA-Verdikt.", keywords: ["kontrast", "wcag"] },

  // ------------- Medien
  "video-compress": { name: "Video-Kompressor", short: "MP4/MOV/WebM verkleinern", description: "Video lokal mit ffmpeg.wasm komprimieren.", keywords: ["video", "ffmpeg"], options: { crf: "Qualität (CRF)", maxHeight: "Max-Höhe", preset: "Preset" } },
  "video-trim": { name: "Video-Trimmer", short: "Clip extrahieren", description: "Start/Ende wählen, Clip extrahieren — wenn möglich ohne Re-Encode.", keywords: ["video", "trim"], options: { start: "Start", end: "Ende" } },
  "video-to-gif": { name: "Video → GIF", short: "Loop-GIF aus Clip", description: "Videoabschnitt in Loop-GIF wandeln. FPS, Breite und Fenster einstellbar.", keywords: ["video", "gif"], options: { fps: "FPS", width: "Breite", start: "Start", duration: "Dauer" } },
  "extract-audio": { name: "Audio extrahieren", short: "Tonspur eines Videos", description: "Tonspur eines Videos als MP3 oder WAV speichern.", keywords: ["audio", "mp3"], options: { format: "Format" } },
  "audio-convert": { name: "Audio-Konverter", short: "MP3 / WAV / OGG", description: "Audiodatei zwischen MP3, WAV und OGG transkodieren.", keywords: ["audio", "mp3"], options: { format: "Format", bitrate: "Bitrate" } },
  "mute-video": { name: "Video stummschalten", short: "Tonspur entfernen", description: "Tonspur entfernen, stille Datei herunterladen.", keywords: ["video", "mute"] },

  // ------------- KI-Erweiterung
  "smart-crop": { name: "Smart Crop", short: "Saliency-Crop", description: "Auto-Zuschnitt auf den visuell interessantesten Bereich.", keywords: ["crop", "saliency"], options: { aspect: "Verhältnis", padding: "Padding" } },
  "photo-restore": { name: "Foto-Restauration", short: "Entrauschen + Schärfen", description: "Kontrast / Korn / Schärfe via In-Browser-Convolution.", keywords: ["restore", "schärfen"], options: { strength: "Stärke" } },
  "face-anonymizer": { name: "Gesichts-Anonymizer", short: "Gesichter blurren", description: "Gesichter erkennen und blurren. Bald verfügbar — Modell wird nur on-demand geladen.", keywords: ["face", "blur"] },
  "object-detection": { name: "Objekterkennung", short: "YOLO im Browser", description: "Alltagsobjekte mit kleinem YOLO-Modell erkennen. Bald verfügbar — Modell wird nur opt-in geladen.", keywords: ["yolo", "objekt"] },

  // ------------- API & HTTP
  "http-request": { name: "HTTP-Request-Builder", short: "Request senden, Response sehen", description: "Postman-lite im Browser. GET/POST/PUT/PATCH/DELETE, Header, JSON-Body.", keywords: ["http", "request", "rest"], options: { method: "Methode", url: "URL", headers: "Header", body: "Body" } },
  "curl-converter": { name: "cURL ↔ Code", short: "curl → fetch / axios", description: "cURL einfügen, JS-fetch- oder axios-Code erhalten.", keywords: ["curl", "fetch", "axios"], options: { target: "Ziel" } },
  "graphql-tester": { name: "GraphQL-Playground", short: "Endpoint + Query → Response", description: "GraphQL-Query (mit Variables) an einen Endpoint senden und JSON-Response ansehen.", keywords: ["graphql"], options: { endpoint: "Endpoint", query: "Query", variables: "Variables" } },
  "websocket-tester": { name: "WebSocket-Tester", short: "Verbinden, senden, empfangen", description: "WebSocket zu wss:// oder ws:// öffnen, Nachrichten senden, Live-Frame-Log sehen.", keywords: ["websocket", "ws"] },
  "http-status": { name: "HTTP-Status-Codes", short: "100→599 Referenz", description: "Alle HTTP-Status-Codes mit Name und Bedeutung. Suche nach Nummer oder Stichwort.", keywords: ["http", "status"] },

  // ------------- Sicherheit
  "totp-generator": { name: "TOTP / 2FA-Generator", short: "Live-6-stelliger Code aus otpauth", description: "otpauth:// URL oder Base32-Secret einfügen. Aktueller Code mit 30-Sekunden-Countdown.", keywords: ["totp", "2fa"], options: { input: "Secret oder otpauth URL", digits: "Stellen", period: "Periode" } },
  "password-generator": { name: "Passwort-Generator", short: "Regeln + Bulk-Output", description: "Crypto-Random-Passwörter, konfigurierbare Länge / Symbole / Ambiguität-Filter.", keywords: ["passwort"], options: { length: "Länge", count: "Anzahl", uppercase: "A-Z", lowercase: "a-z", digits: "0-9", symbols: "Symbole", excludeAmbiguous: "Ähnliche ausschließen" } },
  "password-strength": { name: "Passwort-Stärke", short: "Entropie + Crack-Zeit", description: "Passwort nach Entropie-Bits, Klassen-Vielfalt und Brute-Force-Zeit bewerten.", keywords: ["passwort", "entropie"] },
  "bcrypt-tool": { name: "Bcrypt-Hash + Verify", short: "Hash erzeugen, prüfen", description: "Bcrypt-Hash für ein Passwort erzeugen oder ein Passwort gegen einen Hash prüfen.", keywords: ["bcrypt"], options: { mode: "Modus", rounds: "Rounds" } },
  "aes-gcm": { name: "AES-GCM Verschlüsseln / Entschlüsseln", short: "Authentifizierte sym. Verschlüsselung", description: "AES-256-GCM via Web Crypto. Schlüssel erzeugen, Text mit Random-IV verschlüsseln.", keywords: ["aes", "gcm"], options: { mode: "Modus", key: "Schlüssel (base64)" } },

  // ------------- Developer (data conv)
  "csv-json": { name: "CSV ↔ JSON", short: "Beidseitiger Konverter", description: "Header und Delimiter erkennen; CSV in JSON-Array oder zurück.", keywords: ["csv", "json"], options: { direction: "Richtung", delimiter: "Trenner", header: "Header in 1. Zeile" } },
  "json-yaml": { name: "JSON ↔ YAML", short: "Beidseitiger Konverter", description: "Verlustfreie JSON ↔ YAML. Indent für YAML einstellbar.", keywords: ["json", "yaml"], options: { direction: "Richtung", indent: "Indent" } },
  "sql-formatter": { name: "SQL-Formatierer", short: "SQL hübsch ausgeben", description: "SQL mit konsistentem Indent und Keyword-Case formatieren.", keywords: ["sql"], options: { keywordCase: "Keyword-Case", indent: "Indent" } },
  "slug-generator": { name: "Slug-Generator", short: "URL-safer Slug", description: "Beliebigen Text in URL-safen Slug; Umlaute / Akzente / Nicht-ASCII via Transliteration.", keywords: ["slug"], options: { separator: "Trenner", lowercase: "kleinbuchstaben" } },
  "case-converter": { name: "Case-Konverter", short: "camel ↔ snake ↔ kebab ↔ pascal", description: "String zwischen camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, Title Case.", keywords: ["case"] },

  // ------------- Netzwerk
  "ip-cidr": { name: "IP / CIDR-Rechner", short: "Subnet, Broadcast, Host-Anzahl", description: "IPv4 mit CIDR (z. B. 10.0.0.0/24). Network, Broadcast, erster/letzter Host, Maske.", keywords: ["ip", "cidr"] },
  "dns-lookup": { name: "DNS-Lookup (DoH)", short: "A / AAAA / MX / TXT / CNAME", description: "DNS über HTTPS via Cloudflare. A, AAAA, MX, TXT, CNAME, NS, SOA, CAA.", keywords: ["dns", "doh"], options: { type: "Record-Typ" } },
  "cron-builder": { name: "Cron-Builder", short: "Cron erstellen + erklären", description: "5-Feld-Cron komponieren, Klartext-Bedeutung, nächste 5 Trigger-Zeiten.", keywords: ["cron"], options: { expression: "Cron-Expression" } },
  "timestamp": { name: "Timestamp-Konverter", short: "Unix ↔ ISO ↔ relativ", description: "Zwischen Unix-Epoch (s/ms), ISO 8601, RFC 1123 und relativer Zeit umrechnen.", keywords: ["timestamp", "unix"], options: { input: "Eingabe" } },
  "token-counter": { name: "Token-Zähler", short: "Token + USD-Kosten schätzen", description: "Prompt einfügen, ungefähre Tokenzahl + Kosten für Claude / GPT / Gemini.", keywords: ["token", "kosten", "llm"] },
  "llm-compare": { name: "LLM Side-by-side", short: "Ein Prompt, mehrere Modelle", description: "Claude / GPT / Gemini nebeneinander vergleichen. Bald — eigene API-Keys.", keywords: ["llm", "vergleich"] },
  "mcp-tester": { name: "MCP-Config-Tester", short: "Model Context Protocol JSON validieren", description: "MCP-Server-Config einfügen; Validierung, Env-Var-Diff, lesbare Zusammenfassung.", keywords: ["mcp", "claude", "cursor"] },
  "json-schema": { name: "JSON-Schema-Generator", short: "Schema aus Beispiel ableiten", description: "JSON-Beispiel einfügen, Draft-2020-12-Schema bekommen.", keywords: ["json", "schema"] },
  "openapi-viewer": { name: "OpenAPI-Explorer", short: "Pfade + Methoden + Parameter", description: "OpenAPI-3-YAML/JSON einfügen; Endpoint-Tabelle mit Parametern und Responses.", keywords: ["openapi", "swagger"] },
  "video-downloader": {
    name: "Video-Downloader (macOS)",
    short: "URL einfügen, MP4 erhalten",
    description:
      "Lade Videos von YouTube, TikTok, Instagram, Twitter, Reddit und 1800+ Seiten herunter. Eine kleine native macOS-App — yt-dlp + ffmpeg gebündelt, alles bleibt auf deinem Mac, kein Server.",
    keywords: ["video", "download", "youtube", "tiktok", "mp4", "yt-dlp", "macos"],
    options: {
      tagline: "URL einfügen → MP4. Nicht im Browser, sondern in einer kleinen nativen macOS-App.",
      whyNotBrowser: "Warum nicht direkt im Browser?",
      whyNotBrowserBody:
        "YouTube/TikTok/Instagram blockieren Browser-fetch-Anfragen via CORS. Und die URL die du einfügst ist nicht das Video selbst — der echte MP4-Stream liegt hinter signierten Manifesten. Das aufzulösen sind ~5000 Zeilen Python in yt-dlp. Deshalb ist Wiener DL eine kleine native App.",
      installTitle: "Installation",
      step1: "↓ .dmg herunterladen",
      step2: "Öffnen, Wiener DL.app in Programme ziehen",
      step3: "Erster Start: Rechtsklick → Öffnen → Öffnen (App ist noch nicht notarisiert)",
      step4: "URL einfügen, Download drücken.",
      cta: "Wiener DL.app herunterladen",
      ctaSecondary: "Quellcode auf GitHub",
      whatsInside: "Was steckt drin",
      bundleYtdlp: "yt-dlp (1800+ Seiten unterstützt)",
      bundleFfmpeg: "ffmpeg + ffprobe (Codec-Konvertierung)",
      bundleNative: "Tauri + Rust (~5 MB native binary)",
      bundleNoServer: "Null Server, null Telemetrie",
      sizeHint: "~135 MB · Apple Silicon und Intel · macOS 11+",
      privacyTitle: "Datenschutz",
      privacyBody:
        "URLs, Videodaten, gar nichts verlässt deinen Mac. Wiener Labs liefert nur die .dmg über GitHub Releases.",
      licenseTitle: "Lizenz & verantwortlicher Gebrauch",
      licenseBody:
        "App-Code MIT. yt-dlp Unlicense, ffmpeg LGPL. Dieses Tool ist nicht dazu da, urheberrechtlich geschützte Inhalte herunterzuladen und weiterzuverbreiten — das ist illegal und unethisch."
    }
  },
  architect: {
    name: "Architect",
    short: "Text in Architekturdiagramm umwandeln",
    description:
      "Beschreibe dein System; AI erzeugt ein sauberes, hierarchisches Mermaid-Diagramm. C4 / Flowchart / Sequence / ER / State Modi, Live-Vorschau, SVG/PNG-Export.",
    keywords: ["architektur", "diagramm", "mermaid", "ai", "c4", "flowchart"],
    options: {
      describe: "System beschreiben",
      stack: "Tech-Stack",
      scale: "Skalierung / Einschränkungen",
      kind: "Diagrammtyp",
      generate: "Generieren",
      refine: "Verfeinern",
      simpler: "Einfacher",
      addMonitoring: "Monitoring hinzufügen",
      addFailure: "Fehlerpfade hinzufügen",
      reformat: "Mermaid aufräumen",
      editSource: "Quelle bearbeiten",
      copyMermaid: "Mermaid kopieren",
      downloadSvg: "SVG herunterladen",
      downloadPng: "PNG herunterladen",
      preview: "Vorschau",
      diagramAuto: "Auto",
      diagramFlowchart: "Flowchart",
      diagramC4: "C4 Container",
      diagramSequence: "Sequence",
      diagramEr: "ER",
      diagramState: "State",
      diagramDeployment: "Deployment",
      placeholderDescribe:
        "z.B. 'Solana TWAP-Execution-App. Next.js-Frontend mit Solflare-Wallet. DFlow-Swap-Routing, Kamino Lending-Vault Deposit/Withdraw, Quicknode RPC + Streams für Price-Feed und TX-Confirmation. User wählt 30min-2h Window, in 3-6 Slices aufteilen und je Slice Kamino-Withdraw + DFlow-Swap.'",
      placeholderStack: "Next.js · TypeScript · Solana web3.js · Tailwind",
      placeholderScale: "10k DAU, 500 gleichzeitige Executions",
      emptyTitle: "Noch kein Diagramm",
      emptyHint: "Beschreibe links dein System und drücke Generieren. AI liefert Mermaid, hier rendert es.",
      streaming: "Generiert…",
      rateLimit: "Rate-Limit erreicht. In wenigen Minuten erneut versuchen.",
      errorGeneric: "Etwas ist schiefgelaufen.",
      sourceTitle: "Mermaid-Quelle",
      copied: "Kopiert"
    }
  }
};
