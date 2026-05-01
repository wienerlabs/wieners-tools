"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Copy, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select, Toggle } from "@/components/options-panel";
import { content } from "@/lib/content";

type Mode = "encode" | "decode";

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return typeof btoa === "function" ? btoa(binary) : Buffer.from(bytes).toString("base64");
}

function fromBase64(input: string): Uint8Array {
  const trimmed = input.trim().replace(/\s+/g, "");
  const normalized = trimmed.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = typeof atob === "function" ? atob(padded) : Buffer.from(padded, "base64").toString("binary");
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

function makeUrlSafe(b64: string): string {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export default function Base64EncoderTool({
  locale,
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const [mode, setMode] = useState<Mode>("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [text, setText] = useState("");
  const [fileMeta, setFileMeta] = useState<{ name: string; size: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const result = useMemo(() => {
    if (!text) return { ok: true as const, output: "" };
    try {
      if (mode === "encode") {
        const enc = new TextEncoder().encode(text);
        const b64 = toBase64(enc);
        return { ok: true as const, output: urlSafe ? makeUrlSafe(b64) : b64 };
      }
      const bytes = fromBase64(text);
      const dec = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
      return { ok: true as const, output: dec };
    } catch (err) {
      return { ok: false as const, output: err instanceof Error ? err.message : String(err) };
    }
  }, [text, mode, urlSafe]);

  const onFile = async (file: File) => {
    setFileMeta({ name: file.name, size: file.size });
    const buf = new Uint8Array(await file.arrayBuffer());
    const b64 = toBase64(buf);
    setMode("encode");
    setText(`data:${file.type || "application/octet-stream"};base64,${urlSafe ? makeUrlSafe(b64) : b64}`);
  };

  const onCopy = async () => {
    if (!result.ok) return;
    await navigator.clipboard?.writeText(result.output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.mode ?? "Mode"}>
          <Select<Mode>
            value={mode}
            options={[
              { value: "encode", label: "Encode" },
              { value: "decode", label: "Decode" }
            ]}
            onChange={setMode}
          />
        </FieldRow>
        <FieldRow label={opt.urlSafe ?? "URL-safe"}>
          <Toggle value={urlSafe} onChange={setUrlSafe} label="-_ no padding" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head">
            <span>{mode === "encode" ? "Plain text / file" : "Base64"}</span>
            <div className="ws-text-io-actions">
              <button type="button" className="ws-icon-button" onClick={() => fileInputRef.current?.click()}>
                <Upload size={14} />
                <span>{ui.pickFile}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFile(f);
                }}
              />
            </div>
          </header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            spellCheck={false}
            placeholder={mode === "encode" ? "type or pick a file" : "paste base64"}
          />
          {fileMeta ? <p className="ws-text-io-note">{fileMeta.name} · {fileMeta.size.toLocaleString()} bytes</p> : null}
        </div>
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head">
            <span>{mode === "encode" ? "Base64" : "Decoded text"}</span>
            <div className="ws-text-io-actions">
              <button type="button" className="ws-icon-button" onClick={onCopy} disabled={!result.ok || !result.output}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </header>
          <textarea
            className={`ws-textarea ws-textarea-mono ${!result.ok ? "is-error" : ""}`}
            value={result.output}
            readOnly
            rows={12}
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}
