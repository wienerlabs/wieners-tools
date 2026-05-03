"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput } from "@/components/options-panel";

type Model = {
  id: string;
  label: string;
  provider: "Anthropic" | "OpenAI" | "Google";
  perTokenChar: number;
  inputUsdPerM: number;
  outputUsdPerM: number;
};

const MODELS: Model[] = [
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", provider: "Anthropic", perTokenChar: 3.6, inputUsdPerM: 3,    outputUsdPerM: 15 },
  { id: "claude-haiku-4-5",  label: "Claude Haiku 4.5",  provider: "Anthropic", perTokenChar: 3.6, inputUsdPerM: 0.8,  outputUsdPerM: 4 },
  { id: "claude-opus-4-7",   label: "Claude Opus 4.7",   provider: "Anthropic", perTokenChar: 3.6, inputUsdPerM: 15,   outputUsdPerM: 75 },
  { id: "gpt-4o",            label: "GPT-4o",            provider: "OpenAI",    perTokenChar: 4.0, inputUsdPerM: 2.5,  outputUsdPerM: 10 },
  { id: "gpt-4-1",           label: "GPT-4.1",           provider: "OpenAI",    perTokenChar: 4.0, inputUsdPerM: 2,    outputUsdPerM: 8 },
  { id: "gemini-2-5-pro",    label: "Gemini 2.5 Pro",    provider: "Google",    perTokenChar: 4.0, inputUsdPerM: 1.25, outputUsdPerM: 5 }
];

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

export default function TokenCounterTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [text, setText] = useState("Wiener Tools — paste any prompt to estimate tokens and cost across frontier models.");
  const [outputTokens, setOutputTokens] = useState(500);

  const rows = useMemo(() => {
    return MODELS.map((m) => {
      const inputTokens = estimateTokens(text, m.perTokenChar);
      const inputCost = (inputTokens / 1_000_000) * m.inputUsdPerM;
      const outputCost = (outputTokens / 1_000_000) * m.outputUsdPerM;
      return { ...m, inputTokens, inputCost, outputCost, total: inputCost + outputCost };
    });
  }, [text, outputTokens]);

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <>
      <OptionsPanel>
        <FieldRow label="Expected output tokens" hint="for cost estimate">
          <NumberInput value={outputTokens} min={0} max={100_000} step={100} onChange={setOutputTokens} />
        </FieldRow>
      </OptionsPanel>

      <textarea
        className="ws-textarea ws-textarea-mono"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        spellCheck={false}
        placeholder="paste any prompt or text"
      />

      <div className="ws-text-io-note ws-mono" style={{ marginTop: 8 }}>
        {charCount.toLocaleString()} chars · {wordCount.toLocaleString()} words · estimates only (real tokenizers vary by ±10%)
      </div>

      <ul className="ws-pdf-list" style={{ marginTop: 16 }}>
        {rows.map((r) => (
          <li key={r.id} className="ws-pdf-row" style={{ gridTemplateColumns: "1fr auto auto auto" }}>
            <span className="ws-pdf-row-name">
              <strong>{r.label}</strong>
              <span className="ws-pdf-row-meta" style={{ marginLeft: 8 }}>{r.provider}</span>
            </span>
            <span className="ws-mono">{r.inputTokens.toLocaleString()} tok</span>
            <span className="ws-mono">in {fmtUsd(r.inputCost)}</span>
            <span className="ws-mono">+ out {fmtUsd(r.outputCost)} = <strong>{fmtUsd(r.total)}</strong></span>
          </li>
        ))}
      </ul>
    </>
  );
}
