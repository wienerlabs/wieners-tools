"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput } from "@/components/options-panel";

type Price = { input: number; output: number };

type Model = {
  id: string;
  label: string;
  provider: string;
  perTokenChar: number;
  price: Price;
  long?: Price & { above: number };
  from?: { date: string; price: Price };
};

const PRICES_CHECKED = "2026-10-10";

const SOURCES = [
  { label: "Anthropic", href: "https://platform.claude.com/docs/en/about-claude/pricing" },
  { label: "OpenAI", href: "https://developers.openai.com/api/docs/pricing" },
  { label: "Google", href: "https://ai.google.dev/gemini-api/docs/pricing" }
];

const MODELS: Model[] = [
  { id: "claude-fable-5-1", label: "Claude Fable 5.1", provider: "Anthropic", perTokenChar: 3.6, price: { input: 10, output: 50 } },
  { id: "claude-opus-5-5", label: "Claude Opus 5.5", provider: "Anthropic", perTokenChar: 3.6, price: { input: 4, output: 20 } },
  { id: "claude-sonnet-5-5", label: "Claude Sonnet 5.5", provider: "Anthropic", perTokenChar: 3.6, price: { input: 2, output: 10 } },
  {
    id: "claude-haiku-5-5",
    label: "Claude Haiku 5.5",
    provider: "Anthropic",
    perTokenChar: 3.6,
    price: { input: 0.1, output: 0.5 },
    long: { above: 100_000, input: 0.5, output: 2.5 }
  },
  { id: "gpt-6-astra", label: "gpt-6-astra", provider: "OpenAI", perTokenChar: 4, price: { input: 10, output: 50 } },
  { id: "gpt-6.1-sol", label: "gpt-6.1-sol", provider: "OpenAI", perTokenChar: 4, price: { input: 2, output: 10 } },
  { id: "gpt-6-luna", label: "gpt-6-luna", provider: "OpenAI", perTokenChar: 4, price: { input: 0.1, output: 0.5 } },
  {
    id: "gemini-3.1-pro",
    label: "gemini-3.1-pro",
    provider: "Google",
    perTokenChar: 4,
    price: { input: 2, output: 12 },
    long: { above: 200_000, input: 4, output: 18 }
  },
  {
    id: "gemini-3.8-flash",
    label: "gemini-3.8-flash",
    provider: "Google",
    perTokenChar: 4,
    price: { input: 0.75, output: 3.75 },
    from: { date: "2027-01-01", price: { input: 1.5, output: 7.5 } }
  }
];

function priceFor(model: Model, inputTokens: number, now: Date) {
  if (model.long && inputTokens > model.long.above) return model.long;
  if (model.from && now >= new Date(model.from.date)) return model.from.price;
  return model.price;
}

function estimateTokens(text: string, perTokenChar: number) {
  if (!text) return 0;
  return Math.ceil(text.length / perTokenChar);
}

function fmtUsd(n: number) {
  if (n === 0) return "$0";
  if (n < 0.01) return `$${n.toFixed(5)}`;
  if (n < 1) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(2)}`;
}

export default function TokenCounterTool({ i18n }: { locale: Locale; tool: ToolDefinition; i18n: ToolI18n }) {
  const opt = i18n.options ?? {};
  const [text, setText] = useState(opt.sample ?? "Paste any prompt to estimate tokens and cost across current models.");
  const [outputTokens, setOutputTokens] = useState(500);
  const [custom, setCustom] = useState<Price>({ input: 1, output: 5 });

  const rows = useMemo(() => {
    const now = new Date();
    const customModel: Model = { id: "custom", label: opt.custom ?? "Your own price", provider: "", perTokenChar: 3.8, price: custom };
    return [...MODELS, customModel].map((model) => {
      const inputTokens = estimateTokens(text, model.perTokenChar);
      const price = priceFor(model, inputTokens, now);
      const inputCost = (inputTokens / 1_000_000) * price.input;
      const outputCost = (outputTokens / 1_000_000) * price.output;
      return { ...model, inputTokens, inputCost, outputCost, total: inputCost + outputCost };
    });
  }, [text, outputTokens, custom, opt.custom]);

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.outputTokens ?? "Expected output tokens"} hint={opt.outputHint ?? "Used for the cost estimate"}>
          <NumberInput value={outputTokens} min={0} max={1_000_000} step={100} onChange={setOutputTokens} />
        </FieldRow>
        <FieldRow label={opt.customInput ?? "Your input price"} hint="USD / 1M">
          <NumberInput value={custom.input} min={0} step={0.05} onChange={(input) => setCustom((c) => ({ ...c, input }))} />
        </FieldRow>
        <FieldRow label={opt.customOutput ?? "Your output price"} hint="USD / 1M">
          <NumberInput value={custom.output} min={0} step={0.05} onChange={(output) => setCustom((c) => ({ ...c, output }))} />
        </FieldRow>
      </OptionsPanel>

      <textarea
        className="ws-textarea ws-textarea-mono"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        spellCheck={false}
        placeholder={opt.placeholder ?? "Paste any prompt or text"}
      />

      <div className="ws-text-io-note ws-mono" style={{ marginTop: 8 }}>
        {charCount.toLocaleString()} {opt.chars ?? "chars"} · {wordCount.toLocaleString()} {opt.words ?? "words"} ·{" "}
        {opt.estimate ?? "estimates only, real tokenizers differ by about 10%"}
      </div>

      <ul className="ws-pdf-list" style={{ marginTop: 16 }}>
        {rows.map((r) => (
          <li key={r.id} className="ws-pdf-row" style={{ gridTemplateColumns: "1fr auto auto auto" }}>
            <span className="ws-pdf-row-name">
              <strong>{r.label}</strong>
              {r.id === "custom" ? null : <span className="ws-pdf-row-meta" style={{ marginLeft: 8 }}>{r.provider}</span>}
            </span>
            <span className="ws-mono">{r.inputTokens.toLocaleString()} tok</span>
            <span className="ws-mono">
              {opt.inputCost ?? "in"} {fmtUsd(r.inputCost)}
            </span>
            <span className="ws-mono">
              + {opt.outputCost ?? "out"} {fmtUsd(r.outputCost)} = <strong>{fmtUsd(r.total)}</strong>
            </span>
          </li>
        ))}
      </ul>

      <p className="ws-field-hint">
        {(opt.checked ?? "Standard API prices per 1M tokens, checked on {date}:").replace("{date}", PRICES_CHECKED)}{" "}
        {SOURCES.map((source, index) => (
          <span key={source.href}>
            {index > 0 ? ", " : null}
            <a href={source.href} target="_blank" rel="noreferrer">
              {source.label}
            </a>
          </span>
        ))}
      </p>
    </>
  );
}
