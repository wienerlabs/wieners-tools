"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Toggle } from "@/components/options-panel";

const SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digit: "0123456789",
  symbol: "!@#$%^&*()-_=+[]{};:,.<>?/~"
};
const AMBIG = /[O0Il1|`'",;]/g;

function pickFromAlphabet(alphabet: string, length: number): string {
  const out = new Array<string>(length);
  const buf = new Uint32Array(length);
  crypto.getRandomValues(buf);
  for (let i = 0; i < length; i++) out[i] = alphabet[buf[i] % alphabet.length];
  return out.join("");
}

export default function PasswordGeneratorTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [length, setLength] = useState(20);
  const [count, setCount] = useState(5);
  const [up, setUp] = useState(true);
  const [low, setLow] = useState(true);
  const [dig, setDig] = useState(true);
  const [sym, setSym] = useState(true);
  const [excludeAmb, setExcludeAmb] = useState(true);
  const [out, setOut] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = () => {
    let alphabet = "";
    if (up) alphabet += SETS.upper;
    if (low) alphabet += SETS.lower;
    if (dig) alphabet += SETS.digit;
    if (sym) alphabet += SETS.symbol;
    if (excludeAmb) alphabet = alphabet.replace(AMBIG, "");
    if (!alphabet) {
      setOut([]);
      return;
    }
    const list = Array.from({ length: count }, () => pickFromAlphabet(alphabet, length));
    setOut(list);
  };

  const copyOne = async (i: number) => {
    await navigator.clipboard?.writeText(out[i]);
    setCopiedIdx(i);
    window.setTimeout(() => setCopiedIdx(null), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.length ?? "Length"}>
          <NumberInput value={length} min={6} max={128} step={1} onChange={setLength} />
        </FieldRow>
        <FieldRow label={opt.count ?? "Count"}>
          <NumberInput value={count} min={1} max={50} step={1} onChange={setCount} />
        </FieldRow>
        <FieldRow label={opt.uppercase ?? "A-Z"}>
          <Toggle value={up} onChange={setUp} label="A-Z" />
        </FieldRow>
        <FieldRow label={opt.lowercase ?? "a-z"}>
          <Toggle value={low} onChange={setLow} label="a-z" />
        </FieldRow>
        <FieldRow label={opt.digits ?? "0-9"}>
          <Toggle value={dig} onChange={setDig} label="0-9" />
        </FieldRow>
        <FieldRow label={opt.symbols ?? "Symbols"}>
          <Toggle value={sym} onChange={setSym} label="!@#$" />
        </FieldRow>
        <FieldRow label={opt.excludeAmbiguous ?? "Exclude lookalikes"}>
          <Toggle value={excludeAmb} onChange={setExcludeAmb} label="O 0 I l 1" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={generate}>
          <RefreshCw size={14} /> Generate
        </button>
      </div>

      <ul className="ws-uuid-list">
        {out.map((p, i) => (
          <li key={i} style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
            <code className="ws-mono" style={{ wordBreak: "break-all" }}>{p}</code>
            <button type="button" className="ws-icon-button" onClick={() => copyOne(i)}>
              {copiedIdx === i ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
