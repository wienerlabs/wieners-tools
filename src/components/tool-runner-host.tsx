"use client";

import { Construction } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { content } from "@/lib/content";
import { getToolComponent } from "@/components/tools";

type ToolRunnerHostProps = {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
};

export function ToolRunnerHost({ locale, tool, i18n }: ToolRunnerHostProps) {
  const ui = content[locale].workbench;
  const Component = getToolComponent(tool.slug);

  if (!Component || tool.status === "soon") {
    return (
      <div className="ws-soon">
        <span className="ws-soon-icon" aria-hidden="true">
          <Construction size={20} />
        </span>
        <h2>{ui.soonTitle}</h2>
        <p>{ui.soonText}</p>
      </div>
    );
  }

  return <Component locale={locale} tool={tool} i18n={i18n} />;
}
