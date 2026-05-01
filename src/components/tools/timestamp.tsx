"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextInput } from "@/components/options-panel";

function parseInput(input: string): Date | null {
  const v = input.trim();
  if (!v) return null;
  if (/^\d{10}$/.test(v)) return new Date(parseInt(v, 10) * 1000);
  if (/^\d{13}$/.test(v)) return new Date(parseInt(v, 10));
  if (/^\d+$/.test(v)) {
    const n = parseInt(v, 10);
    return new Date(n > 1e11 ? n : n * 1000);
  }
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function relative(ms: number): string {
  const abs = Math.abs(ms);
  const future = ms < 0;
  const units: [number, string][] = [
    [1000, "ms"],
    [60, "saniye"],
    [60, "dakika"],
    [24, "saat"],
    [365.25, "gün"],
    [Number.POSITIVE_INFINITY, "yıl"]
  ];
  let v = abs;
  let label = "ms";
  for (const [step, next] of units) {
    if (v < step) break;
    v /= step;
    label = next;
  }
  const num = v < 10 ? v.toFixed(1) : v.toFixed(0);
  return `${future ? "+" : "-"}${num} ${label}`;
}

export default function TimestampTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [input, setInput] = useState(() => String(Math.floor(Date.now() / 1000)));
  const [now, setNow] = useState(() => Date.now());
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const result = useMemo(() => {
    const d = parseInput(input);
    if (!d) return null;
    const ms = d.getTime();
    const sec = Math.floor(ms / 1000);
    return {
      sec,
      ms,
      iso: d.toISOString(),
      rfc: d.toUTCString(),
      local: d.toLocaleString(),
      relative: relative(ms - now)
    };
  }, [input, now]);

  const copy = async (id: string, value: string) => {
    await navigator.clipboard?.writeText(value);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.input ?? "Input"} hint="unix sec/ms · ISO 8601 · 'now'">
          <TextInput value={input} onChange={setInput} placeholder="1735689600 / 2025-01-01T00:00:00Z" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-chip-row">
        <button type="button" className="ws-chip" onClick={() => setInput(String(Math.floor(Date.now() / 1000)))}>
          now (sec)
        </button>
        <button type="button" className="ws-chip" onClick={() => setInput(String(Date.now()))}>
          now (ms)
        </button>
        <button type="button" className="ws-chip" onClick={() => setInput(new Date().toISOString())}>
          now (ISO)
        </button>
      </div>

      {!result ? (
        <p className="ws-text-io-note">geçerli bir timestamp veya tarih gir</p>
      ) : (
        <ul className="ws-color-formats" style={{ marginTop: 16 }}>
          {([
            ["unix sec", String(result.sec)],
            ["unix ms", String(result.ms)],
            ["ISO 8601", result.iso],
            ["RFC 1123", result.rfc],
            ["local", result.local],
            ["relative", result.relative]
          ] as const).map(([label, value]) => (
            <li key={label}>
              <span className="ws-color-label">{label}</span>
              <code className="ws-mono" style={{ wordBreak: "break-all" }}>{value}</code>
              <button type="button" className="ws-icon-button" onClick={() => copy(label, value)}>
                {copied === label ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
