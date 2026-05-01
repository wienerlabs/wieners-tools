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
    badges: ["fast", "offline"]
  },
  {
    slug: "optimize-svg",
    category: "compression",
    icon: "FileCode",
    status: "soon",
    accept: ".svg,image/svg+xml"
  },
  {
    slug: "compress-pdf",
    category: "compression",
    icon: "FileText",
    status: "soon",
    accept: ".pdf,application/pdf"
  },

  // ------------- Conversion
  {
    slug: "convert-format",
    category: "conversion",
    icon: "Repeat",
    status: "ready",
    accept: "image/*",
    multiple: true,
    badges: ["fast", "offline"]
  },
  {
    slug: "heic-to-jpg",
    category: "conversion",
    icon: "Image",
    status: "soon",
    accept: ".heic,.heif,image/heic,image/heif"
  },
  {
    slug: "image-to-pdf",
    category: "conversion",
    icon: "FilePlus",
    status: "soon",
    accept: "image/*",
    multiple: true
  },
  {
    slug: "pdf-to-image",
    category: "conversion",
    icon: "FileImage",
    status: "soon",
    accept: ".pdf,application/pdf"
  },
  {
    slug: "svg-to-png",
    category: "conversion",
    icon: "FileImage",
    status: "soon",
    accept: ".svg,image/svg+xml"
  },
  {
    slug: "png-to-svg",
    category: "conversion",
    icon: "Vector",
    status: "soon",
    accept: "image/png,image/jpeg"
  },
  {
    slug: "favicon-generator",
    category: "conversion",
    icon: "Star",
    status: "ready",
    accept: "image/*",
    badges: ["fast"]
  },

  // ------------- Editing
  {
    slug: "resize-image",
    category: "editing",
    icon: "Maximize2",
    status: "ready",
    accept: "image/*",
    badges: ["fast", "offline"]
  },
  {
    slug: "crop-image",
    category: "editing",
    icon: "Crop",
    status: "soon",
    accept: "image/*"
  },
  {
    slug: "rotate-flip",
    category: "editing",
    icon: "RotateCw",
    status: "ready",
    accept: "image/*",
    badges: ["fast"]
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
    badges: ["fast"]
  },
  {
    slug: "apply-filter",
    category: "editing",
    icon: "Aperture",
    status: "ready",
    accept: "image/*",
    badges: ["fast"]
  },
  {
    slug: "add-watermark",
    category: "editing",
    icon: "Stamp",
    status: "soon",
    accept: "image/*"
  },
  {
    slug: "blur-region",
    category: "editing",
    icon: "Droplets",
    status: "soon",
    accept: "image/*"
  },
  {
    slug: "collage-maker",
    category: "editing",
    icon: "LayoutGrid",
    status: "soon",
    accept: "image/*",
    multiple: true
  },
  {
    slug: "image-splitter",
    category: "editing",
    icon: "Grid2x2",
    status: "soon",
    accept: "image/*"
  },

  // ------------- AI
  {
    slug: "remove-background",
    category: "ai",
    icon: "Eraser",
    status: "soon",
    accept: "image/*",
    badges: ["ai"]
  },
  {
    slug: "upscale-image",
    category: "ai",
    icon: "ZoomIn",
    status: "soon",
    accept: "image/*",
    badges: ["ai"]
  },
  {
    slug: "image-ocr",
    category: "ai",
    icon: "ScanText",
    status: "soon",
    accept: "image/*",
    badges: ["ai"]
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
    badges: ["fast"]
  },
  {
    slug: "color-picker",
    category: "generation",
    icon: "Pipette",
    status: "soon",
    accept: "image/*"
  },
  {
    slug: "mockup-generator",
    category: "generation",
    icon: "MonitorSmartphone",
    status: "soon",
    accept: "image/*"
  },
  {
    slug: "og-image-generator",
    category: "generation",
    icon: "Image",
    status: "soon",
    accept: ""
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
    status: "soon",
    accept: "image/jpeg,image/tiff,image/heic"
  },
  {
    slug: "gif-maker",
    category: "metadata",
    icon: "Film",
    status: "soon",
    accept: "image/*",
    multiple: true
  },
  {
    slug: "gif-extractor",
    category: "metadata",
    icon: "Layers",
    status: "soon",
    accept: ".gif,image/gif"
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
