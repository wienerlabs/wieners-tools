"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextInput, Toggle } from "@/components/options-panel";

const TR_MAP: Record<string, string> = {
  ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i", ö: "o", Ö: "o",
  ş: "s", Ş: "s", ü: "u", Ü: "u"
};
const DE_MAP: Record<string, string> = {
  ä: "ae", Ä: "ae", ö: "oe", Ö: "oe", ü: "ue", Ü: "ue", ß: "ss"
};

function transliterate(input: string): string {
  let out = "";
  for (const ch of input) {
    if (TR_MAP[ch]) out += TR_MAP[ch];
    else if (DE_MAP[ch]) out += DE_MAP[ch];
    else out += ch;
  }
  // strip remaining diacritics (NFD + combining-mark removal)
  return out.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function slug(text: string, separator: string, lower: boolean): string {
  let s = transliterate(text);
  if (lower) s = s.toLowerCase();
  s = s.replace(/[^a-zA-Z0-9]+/g, separator);
  s = s.replace(new RegExp(`^${separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}+|${separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}+$`, "g"), "");
  return s;
}

export default function SlugGeneratorTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [text, setText] = useState("Wiener's Tools — Tarayıcıda Görsel Atölyesi (Über uns)");
  const [sep, setSep] = useState("-");
  const [lower, setLower] = useState(true);
  const [copied, setCopied] = useState(false);

  const out = useMemo(() => slug(text, sep, lower), [text, sep, lower]);

  const copy = async () => {
    await navigator.clipboard?.writeText(out);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label="Input">
          <TextInput value={text} onChange={setText} placeholder="Type any text" />
        </FieldRow>
        <FieldRow label={opt.separator ?? "Separator"}>
          <TextInput value={sep} onChange={setSep} placeholder="-" />
        </FieldRow>
        <FieldRow label={opt.lowercase ?? "lowercase"}>
          <Toggle value={lower} onChange={setLower} label="aa" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-css-out">
        <code className="ws-mono" style={{ wordBreak: "break-all" }}>{out || "(empty)"}</code>
        <button type="button" className="ws-icon-button" onClick={copy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </>
  );
}
