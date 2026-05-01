"use client";

import { useState } from "react";
import { Check, Copy, KeyRound, Loader2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select, TextInput } from "@/components/options-panel";

type Mode = "encrypt" | "decrypt";

function bytesToB64(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

function b64ToBytes(b64: string): Uint8Array {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

async function importKey(b64: string): Promise<CryptoKey> {
  const raw = b64ToBytes(b64);
  if (raw.length !== 32) throw new Error("AES-256 needs a 32-byte (256-bit) key.");
  return crypto.subtle.importKey("raw", raw.slice().buffer as ArrayBuffer, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

export default function AesGcmTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [mode, setMode] = useState<Mode>("encrypt");
  const [keyB64, setKeyB64] = useState("");
  const [text, setText] = useState("Wiener Tools — local-only AES-GCM");
  const [out, setOut] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const genKey = () => {
    const k = new Uint8Array(32);
    crypto.getRandomValues(k);
    setKeyB64(bytesToB64(k));
  };

  const run = async () => {
    setBusy(true);
    setOut(null);
    try {
      const key = await importKey(keyB64);
      if (mode === "encrypt") {
        const iv = new Uint8Array(12);
        crypto.getRandomValues(iv);
        const data = new TextEncoder().encode(text);
        const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv.slice().buffer as ArrayBuffer }, key, data.slice().buffer as ArrayBuffer);
        const combined = new Uint8Array(iv.length + ct.byteLength);
        combined.set(iv, 0);
        combined.set(new Uint8Array(ct), iv.length);
        setOut({ ok: true, text: bytesToB64(combined) });
      } else {
        const combined = b64ToBytes(text);
        if (combined.length < 13) throw new Error("Ciphertext too short.");
        const iv = combined.slice(0, 12);
        const ct = combined.slice(12);
        const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv.slice().buffer as ArrayBuffer }, key, ct.slice().buffer as ArrayBuffer);
        setOut({ ok: true, text: new TextDecoder().decode(pt) });
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
            options={[{ value: "encrypt", label: "Encrypt" }, { value: "decrypt", label: "Decrypt" }]}
            onChange={setMode}
          />
        </FieldRow>
        <FieldRow label={opt.key ?? "Key (base64)"} hint="32 bytes (AES-256)">
          <TextInput value={keyB64} onChange={setKeyB64} placeholder="generate or paste a 32-byte key" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-ghost" onClick={genKey}>
          <KeyRound size={14} /> New 256-bit key
        </button>
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={busy || !keyB64 || !text}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : null}
          {mode === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
      </div>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>{mode === "encrypt" ? "Plaintext" : "Ciphertext (base64)"}</span></header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            spellCheck={false}
          />
        </div>
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head">
            <span>{mode === "encrypt" ? "Ciphertext (base64)" : "Plaintext"}</span>
            {out && out.ok ? (
              <div className="ws-text-io-actions">
                <button type="button" className="ws-icon-button" onClick={copy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            ) : null}
          </header>
          <textarea
            className={`ws-textarea ws-textarea-mono ${out && !out.ok ? "is-error" : ""}`}
            value={out?.text ?? ""}
            readOnly
            rows={10}
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}
