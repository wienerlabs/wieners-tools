"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";

type ToolComponentProps = {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
};

const Loader = () => <div className="ws-tool-loading">…</div>;

export const TOOL_COMPONENTS: Record<string, ComponentType<ToolComponentProps>> = {
  // Compression
  "compress-image": dynamic(() => import("./compress-image"), { ssr: false, loading: Loader }),
  "optimize-svg": dynamic(() => import("./optimize-svg"), { ssr: false, loading: Loader }),
  "compress-pdf": dynamic(() => import("./compress-pdf"), { ssr: false, loading: Loader }),

  // Conversion
  "convert-format": dynamic(() => import("./convert-format"), { ssr: false, loading: Loader }),
  "heic-to-jpg": dynamic(() => import("./heic-to-jpg"), { ssr: false, loading: Loader }),
  "image-to-pdf": dynamic(() => import("./image-to-pdf"), { ssr: false, loading: Loader }),
  "pdf-to-image": dynamic(() => import("./pdf-to-image"), { ssr: false, loading: Loader }),
  "svg-to-png": dynamic(() => import("./svg-to-png"), { ssr: false, loading: Loader }),
  "png-to-svg": dynamic(() => import("./png-to-svg"), { ssr: false, loading: Loader }),
  "favicon-generator": dynamic(() => import("./favicon-generator"), { ssr: false, loading: Loader }),

  // Editing
  "resize-image": dynamic(() => import("./resize-image"), { ssr: false, loading: Loader }),
  "crop-image": dynamic(() => import("./crop-image"), { ssr: false, loading: Loader }),
  "rotate-flip": dynamic(() => import("./rotate-flip"), { ssr: false, loading: Loader }),
  pixelart: dynamic(() => import("./pixelart"), { ssr: false, loading: Loader }),
  "adjust-color": dynamic(() => import("./adjust-color"), { ssr: false, loading: Loader }),
  "apply-filter": dynamic(() => import("./apply-filter"), { ssr: false, loading: Loader }),
  "add-watermark": dynamic(() => import("./add-watermark"), { ssr: false, loading: Loader }),
  "blur-region": dynamic(() => import("./blur-region"), { ssr: false, loading: Loader }),
  "collage-maker": dynamic(() => import("./collage-maker"), { ssr: false, loading: Loader }),
  "image-splitter": dynamic(() => import("./image-splitter"), { ssr: false, loading: Loader }),

  // AI
  "remove-background": dynamic(() => import("./remove-background"), { ssr: false, loading: Loader }),
  "upscale-image": dynamic(() => import("./upscale-image"), { ssr: false, loading: Loader }),
  "image-ocr": dynamic(() => import("./image-ocr"), { ssr: false, loading: Loader }),

  // Generation
  "qr-generator": dynamic(() => import("./qr-generator"), { ssr: false, loading: Loader }),
  "palette-extractor": dynamic(() => import("./palette-extractor"), { ssr: false, loading: Loader }),
  "color-picker": dynamic(() => import("./color-picker"), { ssr: false, loading: Loader }),
  "mockup-generator": dynamic(() => import("./mockup-generator"), { ssr: false, loading: Loader }),
  "og-image-generator": dynamic(() => import("./og-image-generator"), { ssr: false, loading: Loader }),
  "ascii-art": dynamic(() => import("./ascii-art"), { ssr: false, loading: Loader }),

  // Metadata & Animation
  "exif-viewer": dynamic(() => import("./exif-viewer"), { ssr: false, loading: Loader }),
  "gif-maker": dynamic(() => import("./gif-maker"), { ssr: false, loading: Loader }),
  "gif-extractor": dynamic(() => import("./gif-extractor"), { ssr: false, loading: Loader }),

  // Developer
  "json-formatter": dynamic(() => import("./json-formatter"), { ssr: false, loading: Loader }),
  "base64-encoder": dynamic(() => import("./base64-encoder"), { ssr: false, loading: Loader }),
  "url-encoder": dynamic(() => import("./url-encoder"), { ssr: false, loading: Loader }),
  "jwt-decoder": dynamic(() => import("./jwt-decoder"), { ssr: false, loading: Loader }),
  "hash-generator": dynamic(() => import("./hash-generator"), { ssr: false, loading: Loader }),
  "uuid-generator": dynamic(() => import("./uuid-generator"), { ssr: false, loading: Loader }),
  "lorem-ipsum": dynamic(() => import("./lorem-ipsum"), { ssr: false, loading: Loader }),
  "regex-tester": dynamic(() => import("./regex-tester"), { ssr: false, loading: Loader }),
  "color-converter": dynamic(() => import("./color-converter"), { ssr: false, loading: Loader }),
  "diff-viewer": dynamic(() => import("./diff-viewer"), { ssr: false, loading: Loader })
};

export function getToolComponent(slug: string): ComponentType<ToolComponentProps> | null {
  return TOOL_COMPONENTS[slug] ?? null;
}
