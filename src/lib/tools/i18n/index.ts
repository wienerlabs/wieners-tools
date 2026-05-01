import type { Locale } from "@/lib/i18n";
import type { ToolI18n, ToolI18nBundle } from "../types";
import { toolsTR } from "./tr";
import { toolsEN } from "./en";
import { toolsDE } from "./de";
import { toolsAR } from "./ar";

const bundles: Record<Locale, ToolI18nBundle> = {
  tr: toolsTR,
  en: toolsEN,
  de: toolsDE,
  ar: toolsAR
};

export function getToolI18n(slug: string, locale: Locale): ToolI18n {
  const bundle = bundles[locale];
  return (
    bundle[slug] ?? toolsEN[slug] ?? {
      name: slug,
      short: slug,
      description: slug,
      keywords: []
    }
  );
}

export function getBundle(locale: Locale): ToolI18nBundle {
  return bundles[locale];
}
