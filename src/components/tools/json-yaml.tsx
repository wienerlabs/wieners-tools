"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Select } from "@/components/options-panel";

type Direction = "json-to-yaml" | "yaml-to-json";

export default function JsonYamlTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [dir, setDir] = useState<Direction>("json-to-yaml");
  const [indent, setIndent] = useState(2);
  const [src, setSrc] = useState('{\n  "name": "Wiener Tools",\n  "stack": ["next", "ts", "tailwind"],\n  "version": 0.2\n}');
  const [out, setOut] = useState<{ ok: boolean; value: string }>({ ok: true, value: "" });
  const [copied, setCopied] = useState(false);

  useMemo(() => {
    if (!src.trim()) {
      setOut({ ok: true, value: "" });
      return;
    }
    (async () => {
      try {
        const yaml = await import("js-yaml");
        if (dir === "json-to-yaml") {
          const data = JSON.parse(src);
          setOut({ ok: true, value: yaml.dump(data, { indent }) });
        } else {
          const data = yaml.load(src);
          setOut({ ok: true, value: JSON.stringify(data, null, indent) });
        }
      } catch (e) {
        setOut({ ok: false, value: e instanceof Error ? e.message : String(e) });
      }
    })();
  }, [src, dir, indent]);

  const copy = async () => {
    if (!out.ok) return;
    await navigator.clipboard?.writeText(out.value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.direction ?? "Direction"}>
          <Select<Direction>
            value={dir}
            options={[
              { value: "json-to-yaml", label: "JSON → YAML" },
              { value: "yaml-to-json", label: "YAML → JSON" }
            ]}
            onChange={setDir}
          />
        </FieldRow>
        <FieldRow label={opt.indent ?? "Indent"}>
          <NumberInput value={indent} min={1} max={8} step={1} onChange={setIndent} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>{dir === "json-to-yaml" ? "JSON" : "YAML"}</span></header>
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
            <span>{dir === "json-to-yaml" ? "YAML" : "JSON"}</span>
            <div className="ws-text-io-actions">
              <button type="button" className="ws-icon-button" onClick={copy} disabled={!out.ok}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </header>
          <textarea
            className={`ws-textarea ws-textarea-mono ${!out.ok ? "is-error" : ""}`}
            value={out.value}
            readOnly
            rows={14}
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}
