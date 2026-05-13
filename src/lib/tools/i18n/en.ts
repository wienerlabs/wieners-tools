import type { ToolI18nBundle } from "../types";

export const toolsEN: ToolI18nBundle = {
  "compress-image": {
    name: "Image Compressor",
    short: "Shrink JPEG/PNG/WebP/AVIF",
    description:
      "Compress images in your browser by target size or quality. Multiple files, custom max width, and EXIF retention supported.",
    keywords: ["compress", "shrink", "image", "jpeg", "png", "webp", "avif"],
    cta: "Add image",
    options: {
      targetSize: "Target size (MB)",
      maxWidth: "Max width (px)",
      quality: "Quality",
      format: "Output format",
      keepEXIF: "Keep EXIF data",
      keepOriginalFormat: "Original format"
    },
    errors: {
      tooLarge: "This file exceeds 100 MB."
    }
  },
  "optimize-svg": {
    name: "SVG Optimizer",
    short: "Shrink SVG",
    description: "Strip redundant paths/metadata via SVGO.",
    keywords: ["svg", "optimize"]
  },
  "compress-pdf": {
    name: "PDF Compressor",
    short: "Shrink PDF",
    description: "Resample images to reduce PDF size.",
    keywords: ["pdf", "compress"]
  },
  "convert-format": {
    name: "Format Converter",
    short: "PNG ↔ JPG ↔ WebP ↔ AVIF",
    description:
      "Convert between PNG, JPEG, WebP and AVIF in your browser. No upload, no server.",
    keywords: ["convert", "format", "png", "jpeg", "webp"],
    options: {
      format: "Target format",
      quality: "Quality (JPEG/WebP/AVIF)"
    }
  },
  "heic-to-jpg": {
    name: "HEIC → JPG",
    short: "Convert iPhone HEIC",
    description: "Turn Apple HEIC/HEIF into JPEG/PNG.",
    keywords: ["heic", "iphone", "jpg"]
  },
  "image-to-pdf": {
    name: "Image → PDF",
    short: "Bundle images into a PDF",
    description: "Combine ordered images into a single PDF.",
    keywords: ["pdf", "merge"]
  },
  "pdf-to-image": {
    name: "PDF → Image",
    short: "Extract pages as PNG",
    description: "Export each PDF page as PNG/JPG.",
    keywords: ["pdf", "page"]
  },
  "svg-to-png": {
    name: "SVG → PNG",
    short: "Rasterise vector",
    description: "Render SVG to PNG at any size.",
    keywords: ["svg", "png"]
  },
  "png-to-svg": {
    name: "PNG → SVG",
    short: "Vectorise raster",
    description: "Trace black-and-white raster to vector via Potrace.",
    keywords: ["png", "svg", "vector"]
  },
  "favicon-generator": {
    name: "Favicon Generator",
    short: "All sizes from one image",
    description:
      "Build a 16/32/48/64/96/128/192/256/512 px favicon set from a single source image.",
    keywords: ["favicon", "ico", "site", "logo"],
    options: {
      sizes: "Sizes"
    }
  },
  "resize-image": {
    name: "Resizer",
    short: "Set width / height",
    description:
      "Resize images by pixel, percent, or social media presets — entirely client-side.",
    keywords: ["resize", "width", "height"],
    options: {
      mode: "Mode",
      width: "Width",
      height: "Height",
      keepAspect: "Keep aspect ratio",
      preset: "Preset",
      modePixel: "Pixel",
      modePercent: "Percent",
      modePreset: "Preset"
    }
  },
  "crop-image": {
    name: "Cropper",
    short: "Trim with handles",
    description: "Drag-to-crop interface.",
    keywords: ["crop", "trim"]
  },
  "rotate-flip": {
    name: "Rotate & Flip",
    short: "90° turns + mirror",
    description: "Rotate by 90/180/270° or flip horizontally/vertically.",
    keywords: ["rotate", "flip"],
    options: {
      rotation: "Angle",
      flipX: "Flip horizontal",
      flipY: "Flip vertical"
    }
  },
  pixelart: {
    name: "Pixelart Maker",
    short: "Image to pixel art",
    description:
      "Downsample to a chosen pixel grid and apply a palette to create retro pixel art.",
    keywords: ["pixel", "art", "8bit", "16bit"],
    options: {
      pixelSize: "Pixel size",
      palette: "Palette",
      paletteFull: "Full (256 colors)",
      palette16: "16 colors",
      palette8: "8 colors",
      palette4: "4 colors",
      paletteGameboy: "Gameboy"
    }
  },
  "adjust-color": {
    name: "Color Adjust",
    short: "Brightness/contrast/saturation",
    description: "Brightness, contrast, saturation, hue via canvas filter.",
    keywords: ["color", "brightness", "contrast"],
    options: {
      brightness: "Brightness",
      contrast: "Contrast",
      saturation: "Saturation",
      hue: "Hue"
    }
  },
  "apply-filter": {
    name: "Apply Filter",
    short: "Vintage / Duotone / B&W",
    description: "Preset filters: grayscale, vintage, sepia, duotone, cold, warm.",
    keywords: ["filter", "vintage", "grayscale"],
    options: {
      preset: "Filter",
      presetNone: "None",
      presetGrayscale: "Grayscale",
      presetSepia: "Sepia",
      presetVintage: "Vintage",
      presetCold: "Cold",
      presetWarm: "Warm",
      presetInvert: "Invert"
    }
  },
  "add-watermark": {
    name: "Add Watermark",
    short: "Text / image watermark",
    description: "Corner or tiled watermark.",
    keywords: ["watermark"]
  },
  "blur-region": {
    name: "Blur Region",
    short: "Censor faces / text",
    description: "Blur or pixelate a chosen region.",
    keywords: ["blur", "pixelate"]
  },
  "collage-maker": {
    name: "Collage Maker",
    short: "Stitch multiple images",
    description: "Grid or freeform collage.",
    keywords: ["collage"]
  },
  "image-splitter": {
    name: "Image Splitter",
    short: "Instagram puzzle",
    description: "Split a single image into a grid.",
    keywords: ["split"]
  },
  "remove-background": {
    name: "Background Remover",
    short: "AI transparent background",
    description: "ONNX model runs in your browser; the image never leaves.",
    keywords: ["background", "transparent", "remove"]
  },
  "upscale-image": {
    name: "Image Upscaler",
    short: "AI 2x/4x upscale",
    description: "Real-ESRGAN ONNX upscaling.",
    keywords: ["upscale", "AI"]
  },
  "image-ocr": {
    name: "Image OCR",
    short: "Extract text from image",
    description: "Multilingual OCR via tesseract.js.",
    keywords: ["ocr", "text"]
  },
  "qr-generator": {
    name: "QR Code Maker",
    short: "Logo-embeddable QR",
    description:
      "QR codes for URL, text, vCard, phone and email. Color, error correction and logo options.",
    keywords: ["qr", "barcode"],
    options: {
      content: "Content",
      level: "Error correction",
      size: "Size",
      foreground: "Foreground",
      background: "Background",
      margin: "Margin"
    }
  },
  "palette-extractor": {
    name: "Palette Extractor",
    short: "Color palette from image",
    description: "Extract a 5–12 color dominant palette from any image.",
    keywords: ["palette", "color"],
    options: {
      count: "Color count"
    }
  },
  "color-picker": {
    name: "Color Picker",
    short: "Pick hex/rgb from photo",
    description: "Click anywhere on the image to read its color.",
    keywords: ["color picker"]
  },
  "mockup-generator": {
    name: "Mockup Generator",
    short: "Device frames",
    description: "Wrap your screenshot in iPhone, MacBook, or browser frame.",
    keywords: ["mockup", "iphone", "macbook"]
  },
  "og-image-generator": {
    name: "OG Image Maker",
    short: "Twitter/OG card",
    description: "Build social share cards.",
    keywords: ["og", "twitter", "card"]
  },
  "ascii-art": {
    name: "ASCII Art",
    short: "Image to characters",
    description: "Translate an image into a monospace block of ASCII characters.",
    keywords: ["ascii", "art"],
    options: {
      width: "Character width",
      charset: "Charset",
      colored: "Colored HTML"
    }
  },
  "exif-viewer": {
    name: "EXIF Viewer",
    short: "Photo metadata",
    description: "Inspect or strip EXIF data.",
    keywords: ["exif", "meta"]
  },
  "gif-maker": {
    name: "GIF Maker",
    short: "Build animation from frames",
    description: "Animated GIF from a sequence of frames.",
    keywords: ["gif", "animation"]
  },
  "gif-extractor": {
    name: "GIF Extractor",
    short: "Extract frames",
    description: "Pull every frame of a GIF as PNG.",
    keywords: ["gif", "frame"]
  },

  // ------------- Developer
  "json-formatter": {
    name: "JSON Formatter",
    short: "Pretty-print or minify JSON",
    description: "Validate, beautify or minify JSON. Highlights syntax errors with line/column.",
    keywords: ["json", "format", "minify", "pretty", "validate"],
    options: { indent: "Indent (spaces)", sortKeys: "Sort keys", action: "Action" }
  },
  "base64-encoder": {
    name: "Base64 Encoder/Decoder",
    short: "Text or file ↔ Base64",
    description: "Encode text or any file to Base64, or decode a Base64 string back. URL-safe variant supported.",
    keywords: ["base64", "encode", "decode"],
    options: { mode: "Mode", urlSafe: "URL-safe", input: "Input" }
  },
  "url-encoder": {
    name: "URL Encoder/Decoder",
    short: "encodeURIComponent / decode",
    description: "Percent-encode a string for use in URLs, or reverse it.",
    keywords: ["url", "uri", "percent", "encode"],
    options: { mode: "Mode", scope: "Scope" }
  },
  "jwt-decoder": {
    name: "JWT Decoder",
    short: "Inspect a JWT",
    description: "Decode the header and payload of a JSON Web Token. Shows expiry, algorithm and claims. Signatures are not verified.",
    keywords: ["jwt", "token", "decode"]
  },
  "hash-generator": {
    name: "Hash Generator",
    short: "MD5 / SHA-1 / SHA-256 / SHA-512",
    description: "Hash text or files locally via Web Crypto. SHA-1 / 256 / 384 / 512 plus MD5.",
    keywords: ["hash", "sha", "md5", "checksum"],
    options: { algorithm: "Algorithm", input: "Input" }
  },
  "uuid-generator": {
    name: "UUID Generator",
    short: "Bulk UUID v4 / nanoid",
    description: "Generate UUID v4 batches or short nanoid-style IDs. Customisable length and alphabet.",
    keywords: ["uuid", "guid", "nanoid", "id"],
    options: { count: "Count", kind: "Type", length: "Length" }
  },
  "lorem-ipsum": {
    name: "Lorem Ipsum Generator",
    short: "Placeholder copy",
    description: "Words, sentences or paragraphs of classic Lorem Ipsum. Optional HTML wrapping.",
    keywords: ["lorem", "ipsum", "placeholder"],
    options: { unit: "Unit", count: "Count", html: "Wrap with <p>" }
  },
  "regex-tester": {
    name: "Regex Tester",
    short: "Test a JS regex",
    description: "Try a regular expression against test input. Highlights matches, captures and groups.",
    keywords: ["regex", "regexp", "match", "test"],
    options: { pattern: "Pattern", flags: "Flags", subject: "Subject" }
  },
  "color-converter": {
    name: "Color Converter",
    short: "hex ↔ rgb ↔ hsl ↔ oklch",
    description: "Convert a colour between hex, rgb, hsl and oklch. Includes contrast vs. white/black.",
    keywords: ["color", "hex", "rgb", "hsl", "oklch"],
    options: { input: "Input" }
  },
  "diff-viewer": {
    name: "Text Diff",
    short: "Compare two strings",
    description: "Side-by-side diff of two strings — line and word level. No upload, all in your browser.",
    keywords: ["diff", "compare", "text"],
    options: { left: "Left", right: "Right", mode: "Mode" }
  },

  // ------------- PDF
  "pdf-merge": {
    name: "PDF Merge",
    short: "Combine PDFs in order",
    description: "Drop several PDFs and merge them into one. Reorder freely before exporting.",
    keywords: ["pdf", "merge", "combine"]
  },
  "pdf-split": {
    name: "PDF Split",
    short: "Split into pages or ranges",
    description: "Split a PDF into single pages or by page ranges (e.g. 1-3, 5, 8-).",
    keywords: ["pdf", "split"],
    options: { mode: "Mode", ranges: "Ranges" }
  },
  "pdf-rotate": {
    name: "PDF Rotate",
    short: "Rotate selected pages",
    description: "Rotate any subset of pages by 90/180/270°.",
    keywords: ["pdf", "rotate"],
    options: { angle: "Angle" }
  },
  "pdf-reorder": {
    name: "PDF Reorder",
    short: "Drag pages into a new order",
    description: "Reorder pages of a PDF and re-export.",
    keywords: ["pdf", "reorder", "page"]
  },
  "pdf-metadata": {
    name: "PDF Metadata Editor",
    short: "Title / author / subject",
    description: "View and edit the PDF info dictionary — title, author, subject, keywords, creator.",
    keywords: ["pdf", "metadata"]
  },
  "pdf-text-extract": {
    name: "PDF Text Extract",
    short: "Pull text from a PDF",
    description: "Extract the embedded text layer of a PDF (no OCR; for scanned PDFs use Image OCR).",
    keywords: ["pdf", "text", "extract"]
  },

  // ------------- Design helpers
  "gradient-generator": {
    name: "Gradient Generator",
    short: "Linear / radial / conic",
    description: "Build CSS gradients with stops and angle. Copies a ready-to-paste background-image string.",
    keywords: ["gradient", "css", "background"],
    options: { type: "Type", angle: "Angle", stops: "Stops" }
  },
  "box-shadow": {
    name: "Box Shadow Builder",
    short: "Stack multiple shadows",
    description: "Compose CSS box-shadow with offset, blur, spread and multiple layers.",
    keywords: ["shadow", "box-shadow", "css"]
  },
  "border-radius": {
    name: "Border Radius Builder",
    short: "Per-corner radii",
    description: "Visually adjust each corner radius and copy the CSS.",
    keywords: ["border-radius", "css"]
  },
  "cubic-bezier": {
    name: "Cubic Bezier Editor",
    short: "Easing curve preview",
    description: "Drag the two control points to design a cubic-bezier() and preview the motion.",
    keywords: ["bezier", "easing", "animation"]
  },
  "contrast-checker": {
    name: "Contrast Checker",
    short: "WCAG AA/AAA verdict",
    description: "Check the contrast ratio between two colours and see WCAG AA / AAA verdicts for normal and large text.",
    keywords: ["contrast", "wcag", "a11y"]
  },

  // ------------- Media
  "video-compress": {
    name: "Video Compressor",
    short: "Shrink MP4 / MOV / WebM",
    description: "Compress video locally with ffmpeg.wasm. Pick a CRF and resolution; the encoder runs on your device.",
    keywords: ["video", "compress", "mp4", "ffmpeg"],
    options: { crf: "Quality (CRF)", maxHeight: "Max height", preset: "Preset" }
  },
  "video-trim": {
    name: "Video Trimmer",
    short: "Cut a clip from a video",
    description: "Pick start and end timestamps to extract a clip without re-encoding when possible.",
    keywords: ["video", "trim", "cut"],
    options: { start: "Start", end: "End" }
  },
  "video-to-gif": {
    name: "Video → GIF",
    short: "Loopable GIF from a clip",
    description: "Convert a video segment into a looping GIF. Adjust fps, width and the trim window.",
    keywords: ["video", "gif", "convert"],
    options: { fps: "FPS", width: "Width", start: "Start", duration: "Duration" }
  },
  "extract-audio": {
    name: "Extract Audio",
    short: "Pull audio out of a video",
    description: "Save the audio track of a video as MP3 or WAV.",
    keywords: ["audio", "extract", "mp3"],
    options: { format: "Format" }
  },
  "audio-convert": {
    name: "Audio Converter",
    short: "MP3 / WAV / OGG",
    description: "Transcode an audio file between MP3, WAV and OGG with adjustable bitrate.",
    keywords: ["audio", "convert", "mp3"],
    options: { format: "Format", bitrate: "Bitrate" }
  },
  "mute-video": {
    name: "Mute Video",
    short: "Strip the audio track",
    description: "Remove the audio track from a video and download the silent file.",
    keywords: ["video", "mute"]
  },

  // ------------- AI extension
  "smart-crop": {
    name: "Smart Crop",
    short: "Saliency-based focal crop",
    description: "Auto-crop to the most visually interesting region using a saliency heatmap. No model download — runs on canvas.",
    keywords: ["crop", "smart", "saliency"],
    options: { aspect: "Aspect", padding: "Padding" }
  },
  "photo-restore": {
    name: "Photo Restore",
    short: "Denoise + sharpen + auto-levels",
    description: "Lift contrast, smooth grain and sharpen detail with an in-browser convolution pipeline.",
    keywords: ["restore", "sharpen", "denoise"],
    options: { strength: "Strength" }
  },
  "face-anonymizer": {
    name: "Face Anonymizer",
    short: "Auto-blur faces in photos",
    description: "Detect faces with a tiny on-device model and blur them. Coming soon — model weights are downloaded only on demand.",
    keywords: ["face", "blur", "privacy"]
  },
  "object-detection": {
    name: "Object Detection",
    short: "YOLO in your browser",
    description: "Detect everyday objects with a small YOLO-style model. Coming soon — heavy model weights are gated behind explicit opt-in.",
    keywords: ["detect", "yolo", "object"]
  },

  // ------------- API & HTTP
  "http-request": {
    name: "HTTP Request Builder",
    short: "Send any request, see the response",
    description: "Postman-lite in your browser. GET/POST/PUT/PATCH/DELETE, custom headers, JSON body, response status / time / size.",
    keywords: ["http", "request", "rest", "postman", "api"],
    options: { method: "Method", url: "URL", headers: "Headers", body: "Body" }
  },
  "curl-converter": {
    name: "cURL ↔ Code",
    short: "curl → fetch / axios",
    description: "Paste a cURL one-liner and get equivalent JavaScript fetch or axios code.",
    keywords: ["curl", "fetch", "axios", "convert"],
    options: { target: "Target" }
  },
  "graphql-tester": {
    name: "GraphQL Playground",
    short: "Endpoint + query → response",
    description: "Send a GraphQL query (with variables) to any endpoint and inspect the JSON response.",
    keywords: ["graphql", "query", "playground"],
    options: { endpoint: "Endpoint", query: "Query", variables: "Variables" }
  },
  "websocket-tester": {
    name: "WebSocket Tester",
    short: "Connect, send, receive",
    description: "Open a WebSocket to any wss:// or ws:// URL, send messages, watch the live frame log.",
    keywords: ["websocket", "ws", "wss", "test"]
  },
  "http-status": {
    name: "HTTP Status Codes",
    short: "Searchable 100→599 reference",
    description: "Every HTTP status code with its name and one-line meaning. Searchable by number or keyword.",
    keywords: ["http", "status", "code", "reference"]
  },

  // ------------- Security
  "totp-generator": {
    name: "TOTP / 2FA Generator",
    short: "Live 6-digit code from an otpauth URL",
    description: "Paste an otpauth:// URL or Base32 secret. Shows the current 6-digit code with a 30-second countdown.",
    keywords: ["totp", "2fa", "otp", "authenticator"],
    options: { input: "Secret or otpauth URL", digits: "Digits", period: "Period" }
  },
  "password-generator": {
    name: "Password Generator",
    short: "Custom rules, bulk output",
    description: "Crypto-random passwords with configurable length, symbols, digits, ambiguity exclusion. Generate one or many.",
    keywords: ["password", "generator", "random"],
    options: { length: "Length", count: "Count", uppercase: "A-Z", lowercase: "a-z", digits: "0-9", symbols: "Symbols", excludeAmbiguous: "Exclude lookalikes" }
  },
  "password-strength": {
    name: "Password Strength Meter",
    short: "Entropy + crack-time estimate",
    description: "Rate any password by entropy bits, character class diversity, and an estimated brute-force time.",
    keywords: ["password", "entropy", "strength"]
  },
  "bcrypt-tool": {
    name: "Bcrypt Hash + Verify",
    short: "Hash a password, verify a hash",
    description: "Generate a bcrypt hash (configurable rounds) for a password, or verify a password against an existing hash.",
    keywords: ["bcrypt", "hash", "verify"],
    options: { mode: "Mode", rounds: "Rounds" }
  },
  "aes-gcm": {
    name: "AES-GCM Encrypt / Decrypt",
    short: "Authenticated symmetric encryption",
    description: "AES-256-GCM via Web Crypto. Generate a key, encrypt text with random IV, decrypt back. All in-browser.",
    keywords: ["aes", "gcm", "encrypt", "decrypt", "crypto"],
    options: { mode: "Mode", key: "Key (base64)" }
  },

  // ------------- Developer (data conversion expansion)
  "csv-json": {
    name: "CSV ↔ JSON",
    short: "Two-way CSV/JSON converter",
    description: "Detect headers and delimiters; convert CSV to a JSON array of objects, or JSON back to CSV.",
    keywords: ["csv", "json", "convert"],
    options: { direction: "Direction", delimiter: "Delimiter", header: "First row is header" }
  },
  "json-yaml": {
    name: "JSON ↔ YAML",
    short: "Two-way JSON/YAML converter",
    description: "Lossless JSON ↔ YAML conversion with comments stripped. Choose indent size for the YAML output.",
    keywords: ["json", "yaml", "convert"],
    options: { direction: "Direction", indent: "Indent" }
  },
  "sql-formatter": {
    name: "SQL Formatter",
    short: "Pretty-print SQL",
    description: "Format SQL with consistent indentation and keyword casing. Supports common dialects (Postgres, MySQL, SQLite).",
    keywords: ["sql", "format", "pretty"],
    options: { keywordCase: "Keyword case", indent: "Indent" }
  },
  "slug-generator": {
    name: "Slug Generator",
    short: "URL-safe slug, multilingual",
    description: "Convert any text to a URL-safe slug. Handles Turkish, German, Arabic accents and non-ASCII via transliteration.",
    keywords: ["slug", "url", "kebab"],
    options: { separator: "Separator", lowercase: "lowercase" }
  },
  "case-converter": {
    name: "Case Converter",
    short: "camel ↔ snake ↔ kebab ↔ pascal",
    description: "Convert any string between camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, Title Case.",
    keywords: ["case", "camel", "snake", "kebab", "pascal"]
  },

  // ------------- Network & sysadmin
  "ip-cidr": {
    name: "IP / CIDR Calculator",
    short: "Subnet, broadcast, host count",
    description: "Enter an IPv4 with CIDR (e.g. 10.0.0.0/24). Get network, broadcast, first/last host, mask, total addresses.",
    keywords: ["ip", "cidr", "subnet", "mask"]
  },
  "dns-lookup": {
    name: "DNS Lookup (DoH)",
    short: "A / AAAA / MX / TXT / CNAME / NS",
    description: "Query DNS over HTTPS via Cloudflare. Resolve A, AAAA, MX, TXT, CNAME, NS, SOA, CAA — straight from your browser.",
    keywords: ["dns", "doh", "lookup", "resolve"],
    options: { type: "Record type" }
  },
  "cron-builder": {
    name: "Cron Builder",
    short: "Build & explain cron expressions",
    description: "Compose a 5-field cron, see its plain-English meaning and the next 5 firing times in your timezone.",
    keywords: ["cron", "schedule", "crontab"],
    options: { expression: "Cron expression" }
  },
  "timestamp": {
    name: "Timestamp Converter",
    short: "Unix ↔ ISO ↔ relative",
    description: "Convert between Unix epoch (s/ms), ISO 8601, RFC 1123, and a human-readable relative time.",
    keywords: ["timestamp", "unix", "epoch", "date"],
    options: { input: "Input" }
  },
  "token-counter": {
    name: "Token Counter",
    short: "Estimate tokens + USD cost across models",
    description: "Paste any prompt and get an approximate token count + USD cost for Claude, GPT, and Gemini.",
    keywords: ["token", "cost", "llm", "tokenizer"]
  },
  "llm-compare": {
    name: "LLM Side-by-side",
    short: "Send one prompt to multiple models",
    description: "Compare Claude / GPT / Gemini outputs side by side. Coming soon — bring your own API keys.",
    keywords: ["llm", "compare", "claude", "gpt"]
  },
  "mcp-tester": {
    name: "MCP Config Tester",
    short: "Validate Model Context Protocol JSON",
    description: "Paste a Claude or Cursor MCP server config; get structural validation, env-var diff, and a readable summary.",
    keywords: ["mcp", "claude", "cursor", "config"]
  },
  "json-schema": {
    name: "JSON Schema Generator",
    short: "Infer a JSON Schema from a sample",
    description: "Paste a JSON document, get a Draft 2020-12 schema you can use for validation.",
    keywords: ["json", "schema", "validate", "draft"]
  },
  "openapi-viewer": {
    name: "OpenAPI Explorer",
    short: "Browse paths + methods + params",
    description: "Paste an OpenAPI 3 YAML or JSON spec; get a clean per-endpoint table with parameters and responses.",
    keywords: ["openapi", "swagger", "api", "spec"]
  },
  "video-downloader": {
    name: "Video Downloader (macOS)",
    short: "Paste URL, get MP4",
    description:
      "Download videos from YouTube, TikTok, Instagram, Twitter, Reddit and 1800+ sites. A small native macOS app — yt-dlp + ffmpeg bundled, everything stays on your Mac, no server.",
    keywords: ["video", "download", "youtube", "tiktok", "instagram", "mp4", "yt-dlp", "macos"],
    options: {
      tagline: "Paste URL → MP4. Not in your browser — in a tiny native macOS app.",
      whyNotBrowser: "Why isn't this just a web page?",
      whyNotBrowserBody:
        "YouTube/TikTok/Instagram block your browser's fetch requests via CORS. And the URL you paste isn't the video itself — the actual MP4 lives behind cipher-signed manifests. Decoding that is ~5000 lines of Python in yt-dlp. So Wiener DL ships as a tiny native app instead.",
      installTitle: "Install",
      step1: "↓ Download the .dmg",
      step2: "Open it, drag Wiener DL.app into Applications",
      step3: "First launch: right-click → Open → Open (the app isn't notarized yet)",
      step4: "Paste a URL, hit Download.",
      cta: "Download Wiener DL.app",
      ctaSecondary: "Source on GitHub",
      whatsInside: "What's inside",
      bundleYtdlp: "yt-dlp (1800+ sites supported)",
      bundleFfmpeg: "ffmpeg + ffprobe (codec conversion)",
      bundleNative: "Tauri + Rust (~5 MB native binary)",
      bundleNoServer: "Zero servers, zero telemetry",
      sizeHint: "~135 MB · Apple Silicon and Intel · macOS 11+",
      privacyTitle: "Privacy",
      privacyBody:
        "URLs, video data, anything — nothing ever leaves your Mac. Wiener Labs only ships the .dmg via GitHub Releases.",
      licenseTitle: "License & responsible use",
      licenseBody:
        "App code is MIT. yt-dlp is Unlicense, ffmpeg is LGPL. This tool is not for ripping and redistributing copyrighted content — doing so is both illegal and unethical."
    }
  },
  architect: {
    name: "Architect",
    short: "Turn a description into a system diagram",
    description:
      "Describe your system in plain text; AI produces a clean, hierarchical Mermaid diagram. C4 / flowchart / sequence / ER / state modes, live preview, SVG/PNG export.",
    keywords: ["architecture", "diagram", "mermaid", "ai", "c4", "flowchart", "sequence"],
    options: {
      describe: "Describe the system",
      stack: "Tech stack",
      scale: "Scale / constraints",
      kind: "Diagram type",
      generate: "Generate",
      refine: "Refine",
      simpler: "Simpler",
      addMonitoring: "Add monitoring",
      addFailure: "Add failure paths",
      reformat: "Clean up Mermaid",
      editSource: "Edit source",
      copyMermaid: "Copy Mermaid",
      downloadSvg: "Download SVG",
      downloadPng: "Download PNG",
      preview: "Preview",
      diagramAuto: "Auto",
      diagramFlowchart: "Flowchart",
      diagramC4: "C4 Container",
      diagramSequence: "Sequence",
      diagramEr: "ER",
      diagramState: "State",
      diagramDeployment: "Deployment",
      placeholderDescribe:
        "e.g. 'Solana TWAP execution app. Next.js frontend with Solflare wallet. DFlow swap routing, Kamino lending vault deposit/withdraw, Quicknode RPC + Streams for price feed and tx confirmation. User picks a 30m-2h window; split into 3-6 slices and execute each via Kamino withdraw + DFlow swap.'",
      placeholderStack: "Next.js · TypeScript · Solana web3.js · Tailwind",
      placeholderScale: "10k DAU, 500 concurrent executions",
      emptyTitle: "No diagram yet",
      emptyHint: "Describe your system on the left, hit Generate. AI returns Mermaid and we render it here.",
      streaming: "Generating…",
      rateLimit: "Rate limit reached. Try again in a few minutes.",
      errorGeneric: "Something went wrong.",
      sourceTitle: "Mermaid source",
      copied: "Copied"
    }
  }
};
