"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextInput } from "@/components/options-panel";

function classDiversity(pw: string) {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^A-Za-z0-9]/.test(pw)) pool += 33;
  return pool;
}

function entropyBits(pw: string) {
  if (!pw) return 0;
  const pool = classDiversity(pw);
  return pw.length * Math.log2(Math.max(pool, 1));
}

function crackTime(bits: number): string {
  // Assume 1e10 guesses/sec (modern offline GPU)
  const guesses = Math.pow(2, bits) / 2;
  const sec = guesses / 1e10;
  const units: [number, string][] = [
    [60, "saniye"],
    [60, "dakika"],
    [24, "saat"],
    [365.25, "gün"],
    [100, "yıl"],
    [10, "yüzyıl"],
    [10, "millennium"]
  ];
  let v = sec;
  let label = "saniye";
  for (const [step, next] of units) {
    if (v < step) break;
    v /= step;
    label = next;
  }
  if (sec < 1) return "anında";
  if (v > 1e6) return ">1M " + label;
  return v.toFixed(v < 10 ? 1 : 0) + " " + label;
}

function verdict(bits: number): { label: string; tone: "fail" | "weak" | "ok" | "strong" } {
  if (bits < 28) return { label: "çok zayıf", tone: "fail" };
  if (bits < 36) return { label: "zayıf", tone: "weak" };
  if (bits < 60) return { label: "orta", tone: "ok" };
  if (bits < 128) return { label: "güçlü", tone: "strong" };
  return { label: "çok güçlü", tone: "strong" };
}

const COMMON = new Set([
  "password", "123456", "qwerty", "letmein", "admin", "welcome", "monkey",
  "dragon", "sunshine", "iloveyou", "111111", "password1", "abc123"
]);

export default function PasswordStrengthTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [pw, setPw] = useState("Wiener-Tools-2026!");

  const stats = useMemo(() => {
    const bits = entropyBits(pw);
    const v = verdict(bits);
    const reasons: string[] = [];
    if (pw.length < 12) reasons.push("12 karakterden kısa");
    if (!/[A-Z]/.test(pw)) reasons.push("büyük harf yok");
    if (!/[a-z]/.test(pw)) reasons.push("küçük harf yok");
    if (!/[0-9]/.test(pw)) reasons.push("rakam yok");
    if (!/[^A-Za-z0-9]/.test(pw)) reasons.push("özel karakter yok");
    if (COMMON.has(pw.toLowerCase())) reasons.push("yaygın parola listesinde");
    if (/(.)\1\1/.test(pw)) reasons.push("3+ tekrar var");
    return { bits, verdict: v, time: crackTime(bits), pool: classDiversity(pw), reasons };
  }, [pw]);

  return (
    <>
      <OptionsPanel>
        <FieldRow label="Password">
          <TextInput value={pw} onChange={setPw} placeholder="type a password to score" />
        </FieldRow>
      </OptionsPanel>

      <div className={`ws-strength ws-strength-${stats.verdict.tone}`}>
        <div className="ws-strength-meta">
          <strong className="ws-strength-verdict">{stats.verdict.label}</strong>
          <span className="ws-mono">{stats.bits.toFixed(1)} bits</span>
          <span className="ws-mono">pool: {stats.pool}</span>
          <span className="ws-mono">~{stats.time}</span>
        </div>
        <div className="ws-strength-bar">
          <div
            className="ws-strength-bar-fill"
            style={{ width: `${Math.min(100, (stats.bits / 128) * 100)}%` }}
          />
        </div>
        {stats.reasons.length ? (
          <ul className="ws-strength-reasons">
            {stats.reasons.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        ) : null}
      </div>
    </>
  );
}
