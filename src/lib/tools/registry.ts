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
  }
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
