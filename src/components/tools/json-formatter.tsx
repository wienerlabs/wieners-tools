"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Select, Toggle } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

type Action = "format" | "minify";

function sortDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortDeep((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return value;
}

export default function JsonFormatterTool({
  locale,
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const [src, setSrc] = useState<string>('{\n  "hello": "world",\n  "n": [1, 2, 3]\n}');
  const [indent, setIndent] = useState(2);
  const [action, setAction] = useState<Action>("format");
  const [sortKeys, setSortKeys] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!src.trim()) return { ok: true as const, output: "" };
    try {
      const parsed = JSON.parse(src);
      const v = sortKeys ? sortDeep(parsed) : parsed;
      const output = JSON.stringify(v, null, action === "minify" ? 0 : indent);
      return { ok: true as const, output };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { ok: false as const, output: message };
    }
  }, [src, indent, action, sortKeys]);

  const onCopy = async () => {
    if (!result.ok) return;
    await navigator.clipboard?.writeText(result.output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  const onDownload = () => {
    if (!result.ok) return;
    downloadBlob(new Blob([result.output], { type: "application/json" }), "data.json");
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.action ?? "Action"}>
          <Select<Action>
            value={action}
            options={[
              { value: "format", label: "Format" },
              { value: "minify", label: "Minify" }
            ]}
            onChange={setAction}
          />
        </FieldRow>
        <FieldRow label={opt.indent ?? "Indent"}>
          <NumberInput value={indent} min={0} max={8} step={1} onChange={setIndent} />
        </FieldRow>
        <FieldRow label={opt.sortKeys ?? "Sort keys"}>
          <Toggle value={sortKeys} onChange={setSortKeys} label="alpha" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head">
            <span>Input</span>
          </header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            rows={14}
            spellCheck={false}
          />
        </div>
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head">
            <span>Output</span>
            <div className="ws-text-io-actions">
              <button type="button" className="ws-icon-button" onClick={onCopy} disabled={!result.ok}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button type="button" className="ws-icon-button" onClick={onDownload} disabled={!result.ok}>
                <Download size={14} />
                <span>{ui.download}</span>
              </button>
            </div>
          </header>
          <textarea
            className={`ws-textarea ws-textarea-mono ${!result.ok ? "is-error" : ""}`}
            value={result.output}
            readOnly
            rows={14}
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}
