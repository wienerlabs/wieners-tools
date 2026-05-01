"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Select, Toggle } from "@/components/options-panel";

type Unit = "words" | "sentences" | "paragraphs";

const WORDS = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt " +
  "ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco " +
  "laboris nisi ut aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate " +
  "velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident " +
  "sunt in culpa qui officia deserunt mollit anim id est laborum"
).split(/\s+/);

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function buildSentence(): string {
  const length = 6 + Math.floor(Math.random() * 12);
  const parts = Array.from({ length }, pickWord);
  parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  return parts.join(" ") + ".";
}

function buildParagraph(): string {
  const sentences = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: sentences }, buildSentence).join(" ");
}

export default function LoremIpsumTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [unit, setUnit] = useState<Unit>("paragraphs");
  const [count, setCount] = useState(3);
  const [html, setHtml] = useState(false);
  const [copied, setCopied] = useState(false);
  const [seed, setSeed] = useState(0);

  const output = useMemo(() => {
    void seed;
    if (unit === "words") {
      return Array.from({ length: count }, pickWord).join(" ");
    }
    if (unit === "sentences") {
      return Array.from({ length: count }, buildSentence).join(" ");
    }
    const paras = Array.from({ length: count }, buildParagraph);
    return html ? paras.map((p) => `<p>${p}</p>`).join("\n") : paras.join("\n\n");
  }, [unit, count, html, seed]);

  const onCopy = async () => {
    await navigator.clipboard?.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.unit ?? "Unit"}>
          <Select<Unit>
            value={unit}
            options={[
              { value: "words", label: "Words" },
              { value: "sentences", label: "Sentences" },
              { value: "paragraphs", label: "Paragraphs" }
            ]}
            onChange={setUnit}
          />
        </FieldRow>
        <FieldRow label={opt.count ?? "Count"}>
          <NumberInput value={count} min={1} max={500} step={1} onChange={setCount} />
        </FieldRow>
        {unit === "paragraphs" ? (
          <FieldRow label={opt.html ?? "HTML wrap"}>
            <Toggle value={html} onChange={setHtml} label="<p>" />
          </FieldRow>
        ) : null}
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-ghost" onClick={() => setSeed((s) => s + 1)}>
          Re-roll
        </button>
        <button type="button" className="ws-button ws-button-ghost" onClick={onCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <textarea
        className="ws-textarea ws-textarea-mono"
        value={output}
        readOnly
        rows={14}
        spellCheck={false}
      />
    </>
  );
}
