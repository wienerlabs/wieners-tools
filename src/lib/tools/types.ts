import type { Locale } from "@/lib/i18n";

export type CategoryId =
  | "compression"
  | "conversion"
  | "editing"
  | "ai"
  | "generation"
  | "metadata"
  | "developer"
  | "pdf"
  | "design";

export type ToolStatus = "ready" | "beta" | "soon";

export type ToolBadge = "ai" | "beta" | "new" | "fast" | "clientside";

export type ToolDefinition = {
  slug: string;
  category: CategoryId;
  icon: string;
  status: ToolStatus;
  accept: string;
  multiple?: boolean;
  maxSizeMB?: number;
  badges?: ToolBadge[];
};

export type ToolI18n = {
  name: string;
  short: string;
  description: string;
  keywords: string[];
  cta?: string;
  options?: Record<string, string>;
  optionGroups?: Record<string, string>;
  errors?: Record<string, string>;
  emptyHint?: string;
  successHint?: string;
};

export type ToolI18nBundle = Record<string, ToolI18n>;

export type CategoryI18n = {
  name: string;
  short: string;
  description: string;
};

export type CategoryBundle = Record<CategoryId, CategoryI18n>;

export type RunnerInput = {
  files: File[];
};

export type RunnerOutput = {
  blobs: Array<{
    blob: Blob;
    filename: string;
    meta?: Record<string, string | number>;
  }>;
  text?: string;
  notes?: string[];
};

export type RunnerProgress = {
  phase: "preparing" | "processing" | "encoding" | "finalizing";
  current: number;
  total: number;
  message?: string;
};

export type ToolRunner<O = Record<string, unknown>> = (
  input: RunnerInput,
  options: O,
  onProgress?: (progress: RunnerProgress) => void
) => Promise<RunnerOutput>;

export type ToolWithLocale = {
  tool: ToolDefinition;
  i18n: ToolI18n;
  locale: Locale;
};
