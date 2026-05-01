import Link from "next/link";
import { ChevronLeft, Shield } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { content } from "@/lib/content";
import { localizedCategory } from "@/lib/tools/categories";

type ToolFrameProps = {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
  children: React.ReactNode;
};

export function ToolFrame({ locale, tool, i18n, children }: ToolFrameProps) {
  const ui = content[locale];
  const category = localizedCategory(locale, tool.category);
  const back = locale === "tr" ? "Galeriye dön" : locale === "de" ? "Zur Galerie" : locale === "ar" ? "العودة للمعرض" : "Back to gallery";

  return (
    <article className="ws-tool-page">
      <div className="ws-tool-head">
        <Link href={`/${locale}/`} className="ws-tool-back">
          <ChevronLeft size={16} /> {back}
        </Link>
        <p className="ws-tool-category">{category.name}</p>
        <h1 className="ws-tool-title">{i18n.name}</h1>
        <p className="ws-tool-description">{i18n.description}</p>
        <p className="ws-tool-privacy">
          <Shield size={14} aria-hidden="true" /> {ui.workbench.privacyNote}
        </p>
      </div>

      <div className="ws-tool-body">{children}</div>
    </article>
  );
}
