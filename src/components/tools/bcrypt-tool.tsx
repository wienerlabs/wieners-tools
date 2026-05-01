"use client";

import { useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Select, TextInput } from "@/components/options-panel";

type Mode = "hash" | "verify";

export default function BcryptTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [mode, setMode] = useState<Mode>("hash");
  const [pw, setPw] = useState("hello world");
  const [hash, setHash] = useState("");
  const [rounds, setRounds] = useState(10);
  const [out, setOut] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    setBusy(true);
    setOut(null);
    try {
      const bcrypt = await import("bcryptjs");
      if (mode === "hash") {
        const h = await bcrypt.hash(pw, rounds);
        setOut({ ok: true, text: h });
      } else {
        const ok = await bcrypt.compare(pw, hash);
        setOut({ ok, text: ok ? "✓ match" : "✗ no match" });
      }
    } catch (e) {
      setOut({ ok: false, text: e instanceof Error ? e.message : String(e) });
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!out) return;
    await navigator.clipboard?.writeText(out.text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.mode ?? "Mode"}>
          <Select<Mode>
            value={mode}
            options={[{ value: "hash", label: "Hash" }, { value: "verify", label: "Verify" }]}
            onChange={setMode}
          />
        </FieldRow>
        {mode === "hash" ? (
          <FieldRow label={opt.rounds ?? "Rounds"} hint="10–12 önerilir">
            <NumberInput value={rounds} min={4} max={14} step={1} onChange={setRounds} />
          </FieldRow>
        ) : null}
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>Password</span></header>
          <TextInput value={pw} onChange={setPw} placeholder="parola" />
        </div>
        {mode === "verify" ? (
          <div className="ws-text-io-pane">
            <header className="ws-text-io-head"><span>Hash</span></header>
            <TextInput value={hash} onChange={setHash} placeholder="$2a$10$…" />
          </div>
        ) : null}
      </div>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={busy || !pw || (mode === "verify" && !hash)}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : null}
          {mode === "hash" ? "Hash" : "Verify"}
        </button>
      </div>

      {out ? (
        <div className={`ws-bcrypt-out ${out.ok ? "is-ok" : "is-bad"}`}>
          <code className="ws-mono" style={{ wordBreak: "break-all" }}>{out.text}</code>
          {mode === "hash" && out.ok ? (
            <button type="button" className="ws-icon-button" onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
