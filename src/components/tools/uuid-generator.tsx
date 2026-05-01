"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Select } from "@/components/options-panel";

type Kind = "uuid" | "nanoid";

const NANOID_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

function uuidV4(): string {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === "function") return c.randomUUID();
  const buf = new Uint8Array(16);
  c.getRandomValues(buf);
  buf[6] = (buf[6] & 0x0f) | 0x40;
  buf[8] = (buf[8] & 0x3f) | 0x80;
  const hex = Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function nanoid(length: number): string {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  let id = "";
  for (let i = 0; i < length; i++) id += NANOID_ALPHABET[arr[i] & 63];
  return id;
}

export default function UuidGeneratorTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [count, setCount] = useState(8);
  const [kind, setKind] = useState<Kind>("uuid");
  const [length, setLength] = useState(21);
  const [items, setItems] = useState<string[]>(() => Array.from({ length: 8 }, () => uuidV4()));
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const next = Array.from({ length: count }, () => (kind === "uuid" ? uuidV4() : nanoid(length)));
    setItems(next);
  };

  const onCopy = async () => {
    await navigator.clipboard?.writeText(items.join("\n"));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.kind ?? "Type"}>
          <Select<Kind>
            value={kind}
            options={[
              { value: "uuid", label: "UUID v4" },
              { value: "nanoid", label: "nanoid" }
            ]}
            onChange={setKind}
          />
        </FieldRow>
        <FieldRow label={opt.count ?? "Count"}>
          <NumberInput value={count} min={1} max={500} step={1} onChange={setCount} />
        </FieldRow>
        {kind === "nanoid" ? (
          <FieldRow label={opt.length ?? "Length"}>
            <NumberInput value={length} min={4} max={64} step={1} onChange={setLength} />
          </FieldRow>
        ) : null}
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={generate}>
          <RefreshCw size={14} /> Generate
        </button>
        <button type="button" className="ws-button ws-button-ghost" onClick={onCopy} disabled={items.length === 0}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy all"}
        </button>
      </div>

      <ul className="ws-uuid-list">
        {items.map((id, i) => (
          <li key={`${id}-${i}`}><code className="ws-mono">{id}</code></li>
        ))}
      </ul>
    </>
  );
}
