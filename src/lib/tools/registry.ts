import type { CategoryId, ToolDefinition } from "./types";

export const tools: ToolDefinition[] = [
  // ------------- Compression
  {
    slug: "compress-image",
    category: "compression",
    icon: "Archive",
    status: "ready",
    accept: "image/*",
    multiple: true,
    maxSizeMB: 100,
    badges: ["fast", "clientside"]
  },
  {
    slug: "optimize-svg",
    category: "compression",
    icon: "FileCode",
    status: "ready",
    accept: ".svg,image/svg+xml",
    multiple: true,
    badges: ["fast", "clientside"]
  },
  {
    slug: "compress-pdf",
    category: "compression",
    icon: "FileText",
    status: "ready",
    accept: ".pdf,application/pdf",
    badges: ["new", "clientside"]
  },

  // ------------- Conversion
  {
    slug: "convert-format",
    category: "conversion",
    icon: "Repeat",
    status: "ready",
    accept: "image/*",
    multiple: true,
    badges: ["fast", "clientside"]
  },
  {
    slug: "heic-to-jpg",
    category: "conversion",
    icon: "Image",
    status: "ready",
    accept: ".heic,.heif,image/heic,image/heif",
    multiple: true,
    badges: ["new", "clientside"]
  },
  {
    slug: "image-to-pdf",
    category: "conversion",
    icon: "FilePlus",
    status: "ready",
    accept: "image/*",
    multiple: true,
    badges: ["new", "clientside"]
  },
  {
    slug: "pdf-to-image",
    category: "conversion",
    icon: "FileImage",
    status: "ready",
    accept: ".pdf,application/pdf",
    badges: ["new", "clientside"]
  },
  {
    slug: "svg-to-png",
    category: "conversion",
    icon: "FileImage",
    status: "ready",
    accept: ".svg,image/svg+xml",
    multiple: true,
    badges: ["fast", "clientside"]
  },
  {
    slug: "png-to-svg",
    category: "conversion",
    icon: "Vector",
    status: "ready",
    accept: "image/png,image/jpeg",
    badges: ["new", "clientside"]
  },
  {
    slug: "favicon-generator",
    category: "conversion",
    icon: "Star",
    status: "ready",
    accept: "image/*",
    badges: ["fast", "clientside"]
  },

  // ------------- Editing
  {
    slug: "resize-image",
    category: "editing",
    icon: "Maximize2",
    status: "ready",
    accept: "image/*",
    badges: ["fast", "clientside"]
  },
  {
    slug: "crop-image",
    category: "editing",
    icon: "Crop",
    status: "ready",
    accept: "image/*",
    badges: ["new", "clientside"]
  },
  {
    slug: "rotate-flip",
    category: "editing",
    icon: "RotateCw",
    status: "ready",
    accept: "image/*",
    badges: ["fast", "clientside"]
  },
  {
    slug: "pixelart",
    category: "editing",
    icon: "Grid3x3",
    status: "ready",
    accept: "image/*",
    badges: ["new", "fast"]
  },
  {
    slug: "adjust-color",
    category: "editing",
    icon: "Sliders",
    status: "ready",
    accept: "image/*",
    badges: ["fast", "clientside"]
  },
  {
    slug: "apply-filter",
    category: "editing",
    icon: "Aperture",
    status: "ready",
    accept: "image/*",
    badges: ["fast", "clientside"]
  },
  {
    slug: "add-watermark",
    category: "editing",
    icon: "Stamp",
    status: "ready",
    accept: "image/*",
    multiple: true,
    badges: ["new", "clientside"]
  },
  {
    slug: "blur-region",
    category: "editing",
    icon: "Droplets",
    status: "ready",
    accept: "image/*",
    badges: ["new", "clientside"]
  },
  {
    slug: "collage-maker",
    category: "editing",
    icon: "LayoutGrid",
    status: "ready",
    accept: "image/*",
    multiple: true,
    badges: ["new", "clientside"]
  },
  {
    slug: "image-splitter",
    category: "editing",
    icon: "Grid2x2",
    status: "ready",
    accept: "image/*",
    badges: ["fast", "clientside"]
  },

  // ------------- AI
  {
    slug: "remove-background",
    category: "ai",
    icon: "Eraser",
    status: "ready",
    accept: "image/*",
    badges: ["ai", "clientside"]
  },
  {
    slug: "upscale-image",
    category: "ai",
    icon: "ZoomIn",
    status: "ready",
    accept: "image/*",
    badges: ["ai", "clientside"]
  },
  {
    slug: "image-ocr",
    category: "ai",
    icon: "ScanText",
    status: "ready",
    accept: "image/*",
    badges: ["ai", "clientside"]
  },

  // ------------- Generation
  {
    slug: "qr-generator",
    category: "generation",
    icon: "QrCode",
    status: "ready",
    accept: "",
    badges: ["new", "fast"]
  },
  {
    slug: "palette-extractor",
    category: "generation",
    icon: "Palette",
    status: "ready",
    accept: "image/*",
    badges: ["fast", "clientside"]
  },
  {
    slug: "color-picker",
    category: "generation",
    icon: "Pipette",
    status: "ready",
    accept: "image/*",
    badges: ["new", "fast"]
  },
  {
    slug: "mockup-generator",
    category: "generation",
    icon: "MonitorSmartphone",
    status: "ready",
    accept: "image/*",
    badges: ["new", "clientside"]
  },
  {
    slug: "og-image-generator",
    category: "generation",
    icon: "Image",
    status: "ready",
    accept: "",
    badges: ["new", "fast"]
  },
  {
    slug: "ascii-art",
    category: "generation",
    icon: "Type",
    status: "ready",
    accept: "image/*",
    badges: ["new"]
  },

  // ------------- Metadata & Animation
  {
    slug: "exif-viewer",
    category: "metadata",
    icon: "Info",
    status: "ready",
    accept: "image/jpeg,image/tiff,image/heic",
    badges: ["new", "clientside"]
  },
  {
    slug: "gif-maker",
    category: "metadata",
    icon: "Film",
    status: "ready",
    accept: "image/*",
    multiple: true,
    badges: ["new", "clientside"]
  },
  {
    slug: "gif-extractor",
    category: "metadata",
    icon: "Layers",
    status: "ready",
    accept: ".gif,image/gif",
    badges: ["new", "clientside"]
  },

  // ------------- Developer
  {
    slug: "json-formatter",
    category: "developer",
    icon: "Braces",
    status: "ready",
    accept: ".json,application/json,text/plain",
    badges: ["fast", "clientside"]
  },
  {
    slug: "base64-encoder",
    category: "developer",
    icon: "Binary",
    status: "ready",
    accept: "*",
    badges: ["fast", "clientside"]
  },
  {
    slug: "url-encoder",
    category: "developer",
    icon: "Link",
    status: "ready",
    accept: "text/plain",
    badges: ["fast", "clientside"]
  },
  {
    slug: "jwt-decoder",
    category: "developer",
    icon: "KeyRound",
    status: "ready",
    accept: "text/plain",
    badges: ["new", "clientside"]
  },
  {
    slug: "hash-generator",
    category: "developer",
    icon: "Fingerprint",
    status: "ready",
    accept: "*",
    badges: ["fast", "clientside"]
  },
  {
    slug: "uuid-generator",
    category: "developer",
    icon: "Hash",
    status: "ready",
    accept: "text/plain",
    badges: ["fast", "clientside"]
  },
  {
    slug: "lorem-ipsum",
    category: "developer",
    icon: "AlignLeft",
    status: "ready",
    accept: "text/plain",
    badges: ["fast", "clientside"]
  },
  {
    slug: "regex-tester",
    category: "developer",
    icon: "SearchCode",
    status: "ready",
    accept: "text/plain",
    badges: ["new", "clientside"]
  },
  {
    slug: "color-converter",
    category: "developer",
    icon: "Pipette",
    status: "ready",
    accept: "text/plain",
    badges: ["fast", "clientside"]
  },
  {
    slug: "diff-viewer",
    category: "developer",
    icon: "GitCompare",
    status: "ready",
    accept: "text/plain",
    badges: ["new", "clientside"]
  },

  // ------------- PDF
  {
    slug: "pdf-merge",
    category: "pdf",
    icon: "Combine",
    status: "ready",
    accept: ".pdf,application/pdf",
    multiple: true,
    badges: ["new", "clientside"]
  },
  {
    slug: "pdf-split",
    category: "pdf",
    icon: "Scissors",
    status: "ready",
    accept: ".pdf,application/pdf",
    badges: ["new", "clientside"]
  },
  {
    slug: "pdf-rotate",
    category: "pdf",
    icon: "RotateCw",
    status: "ready",
    accept: ".pdf,application/pdf",
    badges: ["new", "clientside"]
  },
  {
    slug: "pdf-reorder",
    category: "pdf",
    icon: "ArrowUpDown",
    status: "ready",
    accept: ".pdf,application/pdf",
    badges: ["new", "clientside"]
  },
  {
    slug: "pdf-metadata",
    category: "pdf",
    icon: "Info",
    status: "ready",
    accept: ".pdf,application/pdf",
    badges: ["new", "clientside"]
  },
  {
    slug: "pdf-text-extract",
    category: "pdf",
    icon: "FileText",
    status: "ready",
    accept: ".pdf,application/pdf",
    badges: ["new", "clientside"]
  },

  // ------------- Design helpers
  {
    slug: "gradient-generator",
    category: "design",
    icon: "Sparkles",
    status: "ready",
    accept: "",
    badges: ["fast", "clientside"]
  },
  {
    slug: "box-shadow",
    category: "design",
    icon: "Square",
    status: "ready",
    accept: "",
    badges: ["fast", "clientside"]
  },
  {
    slug: "border-radius",
    category: "design",
    icon: "RectangleHorizontal",
    status: "ready",
    accept: "",
    badges: ["fast", "clientside"]
  },
  {
    slug: "cubic-bezier",
    category: "design",
    icon: "Spline",
    status: "ready",
    accept: "",
    badges: ["new", "clientside"]
  },
  {
    slug: "contrast-checker",
    category: "design",
    icon: "Contrast",
    status: "ready",
    accept: "",
    badges: ["new", "clientside"]
  },

  // ------------- Media (video + audio)
  {
    slug: "video-compress",
    category: "media",
    icon: "Video",
    status: "ready",
    accept: "video/*",
    maxSizeMB: 500,
    badges: ["new", "clientside"]
  },
  {
    slug: "video-trim",
    category: "media",
    icon: "Scissors",
    status: "ready",
    accept: "video/*",
    maxSizeMB: 500,
    badges: ["new", "clientside"]
  },
  {
    slug: "video-to-gif",
    category: "media",
    icon: "Film",
    status: "ready",
    accept: "video/*",
    maxSizeMB: 200,
    badges: ["new", "clientside"]
  },
  {
    slug: "extract-audio",
    category: "media",
    icon: "Music",
    status: "ready",
    accept: "video/*",
    maxSizeMB: 500,
    badges: ["new", "clientside"]
  },
  {
    slug: "audio-convert",
    category: "media",
    icon: "AudioLines",
    status: "ready",
    accept: "audio/*",
    maxSizeMB: 200,
    badges: ["new", "clientside"]
  },
  {
    slug: "mute-video",
    category: "media",
    icon: "VolumeX",
    status: "ready",
    accept: "video/*",
    maxSizeMB: 500,
    badges: ["new", "clientside"]
  },

  // ------------- AI extension
  {
    slug: "smart-crop",
    category: "ai",
    icon: "Crop",
    status: "ready",
    accept: "image/*",
    badges: ["ai", "new", "clientside"]
  },
  {
    slug: "photo-restore",
    category: "ai",
    icon: "Wand2",
    status: "ready",
    accept: "image/*",
    badges: ["ai", "new", "clientside"]
  },
  {
    slug: "face-anonymizer",
    category: "ai",
    icon: "EyeOff",
    status: "soon",
    accept: "image/*",
    badges: ["ai", "beta", "clientside"]
  },
  {
    slug: "object-detection",
    category: "ai",
    icon: "ScanSearch",
    status: "soon",
    accept: "image/*",
    badges: ["ai", "beta", "clientside"]
  },

  // ------------- API & HTTP
  { slug: "http-request",      category: "api", icon: "Send",        status: "ready", accept: "", badges: ["new", "clientside"] },
  { slug: "curl-converter",    category: "api", icon: "Terminal",    status: "ready", accept: "", badges: ["fast", "clientside"] },
  { slug: "graphql-tester",    category: "api", icon: "Workflow",    status: "ready", accept: "", badges: ["new", "clientside"] },
  { slug: "websocket-tester",  category: "api", icon: "Plug",        status: "ready", accept: "", badges: ["new", "clientside"] },
  { slug: "http-status",       category: "api", icon: "Hash",        status: "ready", accept: "", badges: ["fast", "clientside"] },

  // ------------- Security
  { slug: "totp-generator",    category: "security", icon: "ShieldCheck",  status: "ready", accept: "", badges: ["new", "clientside"] },
  { slug: "password-generator",category: "security", icon: "KeyRound",     status: "ready", accept: "", badges: ["fast", "clientside"] },
  { slug: "password-strength", category: "security", icon: "Gauge",        status: "ready", accept: "", badges: ["fast", "clientside"] },
  { slug: "bcrypt-tool",       category: "security", icon: "Lock",         status: "ready", accept: "", badges: ["new", "clientside"] },
  { slug: "aes-gcm",           category: "security", icon: "ShieldAlert",  status: "ready", accept: "", badges: ["new", "clientside"] },

  // ------------- Developer (data conversion expansion)
  { slug: "csv-json",          category: "developer", icon: "Table",       status: "ready", accept: ".csv,text/csv,application/json", badges: ["fast", "clientside"] },
  { slug: "json-yaml",         category: "developer", icon: "FileJson",    status: "ready", accept: ".json,.yaml,.yml,text/plain",     badges: ["fast", "clientside"] },
  { slug: "sql-formatter",     category: "developer", icon: "Database",    status: "ready", accept: "text/plain",                       badges: ["fast", "clientside"] },
  { slug: "slug-generator",    category: "developer", icon: "Type",        status: "ready", accept: "text/plain",                       badges: ["fast", "clientside"] },
  { slug: "case-converter",    category: "developer", icon: "TextCursorInput", status: "ready", accept: "text/plain",                   badges: ["fast", "clientside"] },

  // ------------- Network & sysadmin
  { slug: "ip-cidr",           category: "network", icon: "Network",       status: "ready", accept: "", badges: ["fast", "clientside"] },
  { slug: "dns-lookup",        category: "network", icon: "Globe",         status: "ready", accept: "", badges: ["new", "clientside"] },
  { slug: "cron-builder",      category: "network", icon: "CalendarClock", status: "ready", accept: "", badges: ["fast", "clientside"] },
  { slug: "timestamp",         category: "network", icon: "Clock",         status: "ready", accept: "", badges: ["fast", "clientside"] }
];

export function getTool(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: CategoryId): ToolDefinition[] {
  return tools.filter((tool) => tool.category === category);
}

export function getReadySlugs(): string[] {
  return tools.filter((tool) => tool.status === "ready").map((tool) => tool.slug);
}

export function getAllSlugs(): string[] {
  return tools.map((tool) => tool.slug);
}
