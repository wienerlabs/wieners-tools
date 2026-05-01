"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select } from "@/components/options-panel";

type Mode = "encode" | "decode";
type Scope = "component" | "uri";

export default function UrlEncoderTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [mode, setMode] = useState<Mode>("encode");
  const [scope, setScope] = useState<Scope>("component");
  const [src, setSrc] = useState("https://wienerstools.com/?q=hello world&lang=tr");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!src) return { ok: true as const, output: "" };
    try {
      const fn =
        mode === "encode"
          ? scope === "component" ? encodeURIComponent : encodeURI
          : scope === "component" ? decodeURIComponent : decodeURI;
      return { ok: true as const, output: fn(src) };
    } catch (err) {
      return { ok: false as const, output: err instanceof Error ? err.message : String(err) };
    }
  }, [src, mode, scope]);

  const onCopy = async () => {
    if (!result.ok) return;
    await navigator.clipboard?.writeText(result.output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.mode ?? "Mode"}>
          <Select<Mode>
            value={mode}
            options={[{ value: "encode", label: "Encode" }, { value: "decode", label: "Decode" }]}
            onChange={setMode}
          />
        </FieldRow>
        <FieldRow label={opt.scope ?? "Scope"}>
          <Select<Scope>
            value={scope}
            options={[
              { value: "component", label: "encodeURIComponent" },
              { value: "uri", label: "encodeURI (full)" }
            ]}
            onChange={setScope}
          />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>Input</span></header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            rows={10}
            spellCheck={false}
          />
        </div>
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head">
            <span>Output</span>
            <div className="ws-text-io-actions">
              <button type="button" className="ws-icon-button" onClick={onCopy} disabled={!result.ok || !result.output}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </header>
          <textarea
            className={`ws-textarea ws-textarea-mono ${!result.ok ? "is-error" : ""}`}
            value={result.output}
            readOnly
            rows={10}
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}
