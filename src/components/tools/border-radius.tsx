"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Toggle } from "@/components/options-panel";

export default function BorderRadiusTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [tl, setTl] = useState(20);
  const [tr, setTr] = useState(20);
  const [br, setBr] = useState(20);
  const [bl, setBl] = useState(20);
  const [linked, setLinked] = useState(true);
  const [copied, setCopied] = useState(false);

  const setAll = (v: number) => {
    setTl(v); setTr(v); setBr(v); setBl(v);
  };

  const css = useMemo(() => {
    if (tl === tr && tr === br && br === bl) return `${tl}px`;
    return `${tl}px ${tr}px ${br}px ${bl}px`;
  }, [tl, tr, br, bl]);

  const onCopy = async () => {
    await navigator.clipboard?.writeText(`border-radius: ${css};`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <div className="ws-design-stage ws-design-stage-light">
        <div className="ws-design-target" style={{ borderRadius: css, background: "var(--ink)" }} />
      </div>

      <OptionsPanel>
        <FieldRow label="link all">
          <Toggle value={linked} onChange={setLinked} label="all" />
        </FieldRow>
        {linked ? (
          <FieldRow label="radius">
            <NumberInput value={tl} min={0} max={200} onChange={setAll} suffix="px" />
          </FieldRow>
        ) : (
          <>
            <FieldRow label="top-left"><NumberInput value={tl} min={0} max={200} onChange={setTl} suffix="px" /></FieldRow>
            <FieldRow label="top-right"><NumberInput value={tr} min={0} max={200} onChange={setTr} suffix="px" /></FieldRow>
            <FieldRow label="bottom-right"><NumberInput value={br} min={0} max={200} onChange={setBr} suffix="px" /></FieldRow>
            <FieldRow label="bottom-left"><NumberInput value={bl} min={0} max={200} onChange={setBl} suffix="px" /></FieldRow>
          </>
        )}
      </OptionsPanel>

      <div className="ws-css-out">
        <code className="ws-mono">border-radius: {css};</code>
        <button type="button" className="ws-icon-button" onClick={onCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </>
  );
}
