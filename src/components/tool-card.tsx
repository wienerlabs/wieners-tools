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

function getIcon(name: string) {
  const candidate = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>>)[name];
  if (candidate) return candidate;
  return (Icons as unknown as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>>)[FALLBACK_ICON];
}

export function ToolCard({ locale, tool, i18n }: ToolCardProps) {
  const Icon = getIcon(tool.icon);
  const ui = content[locale];
  const status = tool.status;
  const disabled = status === "soon";

  const statusLabel =
    status === "ready"
      ? ui.toolsSection.statusReady
      : status === "beta"
        ? ui.toolsSection.statusBeta
        : ui.toolsSection.statusSoon;

  const badgeLabel = (b: string) => {
    if (b === "ai") return ui.toolsSection.badgeAi;
    if (b === "new") return ui.toolsSection.badgeNew;
    if (b === "fast") return ui.toolsSection.badgeFast;
    if (b === "clientside") return ui.toolsSection.badgeClientSide;
    if (b === "beta") return ui.toolsSection.badgeBeta;
    return b;
  };

  const Wrapper = disabled ? "div" : Link;
  const wrapperProps = disabled ? {} : { href: `/${locale}/tools/${tool.slug}/` };

  return (
    <Wrapper
      {...(wrapperProps as { href: string })}
      className={`ws-tool-card ${disabled ? "is-soon" : ""} ws-status-${status}`}
      data-status={status}
    >
      <div className="ws-tool-card-head">
        <span className="ws-tool-icon" aria-hidden="true">
          {Icon ? <Icon size={20} strokeWidth={1.6} /> : null}
        </span>
        <span className="ws-tool-status">{statusLabel}</span>
      </div>
      <h3 className="ws-tool-name">{i18n.name}</h3>
      <p className="ws-tool-short">{i18n.short}</p>
      {tool.badges && tool.badges.length > 0 ? (
        <div className="ws-tool-badges">
          {tool.badges.map((b) => (
            <span key={b} className={`ws-badge ws-badge-${b}`}>
              {badgeLabel(b)}
            </span>
          ))}
        </div>
      ) : null}
    </Wrapper>
  );
}
