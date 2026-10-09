import { Shield } from "lucide-react";
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

  return (
    <article className="ws-tool-page">
      <div className="ws-tool-head">
        <nav className="ws-crumbs" aria-label={ui.toolsSection.eyebrow}>
          <a href={`/${locale}/#tools`}>{ui.toolsSection.eyebrow}</a>
          <span aria-hidden="true">/</span>
          <a href={`/${locale}/#${tool.category}`}>{category.name}</a>
        </nav>
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
