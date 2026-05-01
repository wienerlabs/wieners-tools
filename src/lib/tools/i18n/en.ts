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
  }
};
