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
  "compress-image": dynamic(() => import("./compress-image"), { ssr: false, loading: Loader }),
  "convert-format": dynamic(() => import("./convert-format"), { ssr: false, loading: Loader }),
  "favicon-generator": dynamic(() => import("./favicon-generator"), { ssr: false, loading: Loader }),
  "resize-image": dynamic(() => import("./resize-image"), { ssr: false, loading: Loader }),
  "rotate-flip": dynamic(() => import("./rotate-flip"), { ssr: false, loading: Loader }),
  pixelart: dynamic(() => import("./pixelart"), { ssr: false, loading: Loader }),
  "adjust-color": dynamic(() => import("./adjust-color"), { ssr: false, loading: Loader }),
  "apply-filter": dynamic(() => import("./apply-filter"), { ssr: false, loading: Loader }),
  "qr-generator": dynamic(() => import("./qr-generator"), { ssr: false, loading: Loader }),
  "palette-extractor": dynamic(() => import("./palette-extractor"), { ssr: false, loading: Loader }),
  "ascii-art": dynamic(() => import("./ascii-art"), { ssr: false, loading: Loader })
};

export function getToolComponent(slug: string): ComponentType<ToolComponentProps> | null {
  return TOOL_COMPONENTS[slug] ?? null;
}
