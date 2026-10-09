import { createElement, type ComponentType } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import type { ToolDefinition } from "@/lib/tools/types";
import type { ToolI18n } from "@/lib/tools/types";
import type { Locale } from "@/lib/i18n";
import { content } from "@/lib/content";

type ToolCardProps = {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
};

const FALLBACK_ICON = "Box";
const SHOWN_BADGES = ["ai", "new", "beta"] as const;

const ICONS = Icons as unknown as Record<string, ComponentType<{ size?: number; strokeWidth?: number }>>;

export function ToolCard({ locale, tool, i18n }: ToolCardProps) {
  const ui = content[locale].toolsSection;

  const labels = {
    ai: ui.badgeAi,
    new: ui.badgeNew,
    beta: ui.badgeBeta
  };
  const tags = SHOWN_BADGES.filter((badge) => tool.badges?.includes(badge) || (badge === "beta" && tool.status === "beta")).map(
    (badge) => labels[badge]
  );

  return (
    <Link href={`/${locale}/tools/${tool.slug}/`} className="ws-tool-card">
      <div className="ws-tool-card-head">
        <span className="ws-tool-icon" aria-hidden="true">
          {createElement(ICONS[tool.icon] ?? ICONS[FALLBACK_ICON], { size: 18, strokeWidth: 1.6 })}
        </span>
        {tags.length > 0 ? (
          <span className="ws-tool-tags">
            {tags.map((tag) => (
              <span key={tag} className="ws-tool-tag">
                {tag}
              </span>
            ))}
          </span>
        ) : null}
      </div>
      <h3 className="ws-tool-name">{i18n.name}</h3>
      <p className="ws-tool-short">{i18n.short}</p>
    </Link>
  );
}
