"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextArea } from "@/components/options-panel";

function tokens(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
}

function camel(words: string[]) {
  return words.map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())).join("");
}
function pascal(words: string[]) {
  return words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join("");
}
function snake(words: string[]) {
  return words.map((w) => w.toLowerCase()).join("_");
}
function kebab(words: string[]) {
  return words.map((w) => w.toLowerCase()).join("-");
}
function constant(words: string[]) {
  return words.map((w) => w.toUpperCase()).join("_");
}
function title(words: string[]) {
  return words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}
function sentence(words: string[]) {
  if (words.length === 0) return "";
  const lower = words.map((w) => w.toLowerCase());
  lower[0] = lower[0][0].toUpperCase() + lower[0].slice(1);
  return lower.join(" ");
}
function dot(words: string[]) {
  return words.map((w) => w.toLowerCase()).join(".");
}
function path(words: string[]) {
  return words.map((w) => w.toLowerCase()).join("/");
}

export default function CaseConverterTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [text, setText] = useState("Wiener Tools is a browser-native image workshop");
  const [copied, setCopied] = useState<string | null>(null);

  const cases = useMemo(() => {
    const w = tokens(text);
    return {
      camelCase: camel(w),
      PascalCase: pascal(w),
      snake_case: snake(w),
      "kebab-case": kebab(w),
      CONSTANT_CASE: constant(w),
      "Title Case": title(w),
      "Sentence case": sentence(w),
      "dot.case": dot(w),
      "path/case": path(w)
    };
  }, [text]);

  const copy = async (id: string, value: string) => {
    await navigator.clipboard?.writeText(value);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label="Input">
          <TextArea value={text} onChange={setText} rows={3} placeholder="anyString or something else" />
        </FieldRow>
      </OptionsPanel>

      <ul className="ws-color-formats">
        {Object.entries(cases).map(([label, value]) => (
          <li key={label}>
            <span className="ws-color-label">{label}</span>
            <code className="ws-mono" style={{ wordBreak: "break-all" }}>{value || "(empty)"}</code>
            <button type="button" className="ws-icon-button" onClick={() => copy(label, value)}>
              {copied === label ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
