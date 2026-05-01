"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, TextInput } from "@/components/options-panel";

const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(s: string): Uint8Array {
  const clean = s.replace(/=+$/, "").replace(/\s+/g, "").toUpperCase();
  const out = new Uint8Array((clean.length * 5) >> 3);
  let bits = 0;
  let value = 0;
  let idx = 0;
  for (const ch of clean) {
    const v = B32.indexOf(ch);
    if (v < 0) throw new Error(`invalid base32 char: ${ch}`);
    value = (value << 5) | v;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      out[idx++] = (value >> bits) & 0xff;
    }
  }
  return out.slice(0, idx);
}

type Parsed = {
  secret: string;
  digits: number;
  period: number;
  label?: string;
};

function parseInput(input: string, fallbackDigits: number, fallbackPeriod: number): Parsed | { error: string } {
  const v = input.trim();
  if (!v) return { error: "Enter a secret or otpauth URL." };
  if (v.startsWith("otpauth://")) {
    try {
      const u = new URL(v);
      const secret = u.searchParams.get("secret");
      if (!secret) return { error: "otpauth URL missing 'secret' parameter." };
      return {
        secret,
        digits: parseInt(u.searchParams.get("digits") || String(fallbackDigits), 10) || fallbackDigits,
        period: parseInt(u.searchParams.get("period") || String(fallbackPeriod), 10) || fallbackPeriod,
        label: decodeURIComponent(u.pathname.replace(/^\//, ""))
      };
    } catch (e) {
      return { error: e instanceof Error ? e.message : String(e) };
    }
  }
  return { secret: v, digits: fallbackDigits, period: fallbackPeriod };
}

async function totp(secretBase32: string, period: number, digits: number, atSec: number): Promise<string> {
  const key = base32Decode(secretBase32);
  const counter = Math.floor(atSec / period);
  const buf = new ArrayBuffer(8);
  const dv = new DataView(buf);
  dv.setUint32(4, counter >>> 0, false);
  dv.setUint32(0, Math.floor(counter / 0x100000000), false);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key.slice().buffer as ArrayBuffer,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, buf));
  const offset = sig[sig.length - 1] & 0x0f;
  const code =
    ((sig[offset] & 0x7f) << 24) |
    ((sig[offset + 1] & 0xff) << 16) |
    ((sig[offset + 2] & 0xff) << 8) |
    (sig[offset + 3] & 0xff);
  return String(code % 10 ** digits).padStart(digits, "0");
}

export default function TotpGeneratorTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [input, setInput] = useState("JBSWY3DPEHPK3PXP");
  const [digits, setDigits] = useState(6);
  const [period, setPeriod] = useState(30);
  const [code, setCode] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => parseInput(input, digits, period), [input, digits, period]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let active = true;
    setErr(null);
    if ("error" in parsed) {
      setErr(parsed.error);
      setCode("");
      return;
    }
    totp(parsed.secret, parsed.period, parsed.digits, now)
      .then((c) => {
        if (active) setCode(c);
      })
      .catch((e) => {
        if (active) setErr(e instanceof Error ? e.message : String(e));
      });
    return () => {
      active = false;
    };
  }, [parsed, now]);

  const period_ = "error" in parsed ? period : parsed.period;
  const remaining = period_ - (now % period_);
  const pct = (remaining / period_) * 100;

  const onCopy = async () => {
    if (!code) return;
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.input ?? "Secret or otpauth URL"}>
          <TextInput value={input} onChange={setInput} placeholder="JBSW… or otpauth://totp/…" />
        </FieldRow>
        <FieldRow label={opt.digits ?? "Digits"}>
          <NumberInput value={digits} min={6} max={8} step={1} onChange={setDigits} />
        </FieldRow>
        <FieldRow label={opt.period ?? "Period"}>
          <NumberInput value={period} min={15} max={120} step={5} onChange={setPeriod} suffix="s" />
        </FieldRow>
      </OptionsPanel>

      {err ? (
        <p className="ws-text-io-note ws-text-io-error">{err}</p>
      ) : (
        <div className="ws-totp">
          <div className="ws-totp-code">{code.split("").map((d, i) => <span key={i}>{d}</span>)}</div>
          <div className="ws-totp-bar">
            <div className="ws-totp-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="ws-totp-meta">
            <span className="ws-mono">{remaining}s remaining</span>
            {!("error" in parsed) && parsed.label ? <span className="ws-mono">· {parsed.label}</span> : null}
            <button type="button" className="ws-icon-button" onClick={onCopy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
