"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";

function b64UrlDecode(input: string): string {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

type DecodedPart = { ok: true; pretty: string; raw: unknown } | { ok: false; error: string };

function safeDecode(part: string | undefined): DecodedPart {
  if (!part) return { ok: false, error: "missing segment" };
  try {
    const json = b64UrlDecode(part);
    const parsed = JSON.parse(json);
    return { ok: true, pretty: JSON.stringify(parsed, null, 2), raw: parsed };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNzAwMDAwMDAwfQ.aGVsbG8td29ybGQtc2lnbmF0dXJl";

export default function JwtDecoderTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [token, setToken] = useState(SAMPLE);
  const [copied, setCopied] = useState<string | null>(null);

  const parts = useMemo(() => {
    const trimmed = token.trim();
    const segs = trimmed.split(".");
    const header = safeDecode(segs[0]);
    const payload = safeDecode(segs[1]);
    const signature = segs[2] ?? "";
    let exp: string | undefined;
    if (payload.ok && typeof (payload.raw as Record<string, unknown>).exp === "number") {
      const raw = (payload.raw as Record<string, number>).exp;
      exp = new Date(raw * 1000).toISOString();
    }
    return { header, payload, signature, exp };
  }, [token]);

  const copy = async (id: string, value: string) => {
    await navigator.clipboard?.writeText(value);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="ws-jwt">
      <div className="ws-text-io-pane">
        <header className="ws-text-io-head"><span>JWT</span></header>
        <textarea
          className="ws-textarea ws-textarea-mono"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={6}
          spellCheck={false}
          placeholder="paste a JWT…"
        />
      </div>

      <div className="ws-jwt-grid">
        {(["header", "payload"] as const).map((key) => {
          const part = parts[key];
          return (
            <div key={key} className="ws-text-io-pane">
              <header className="ws-text-io-head">
                <span>{key}</span>
                <div className="ws-text-io-actions">
                  <button
                    type="button"
                    className="ws-icon-button"
                    onClick={() => part.ok && copy(key, part.pretty)}
                    disabled={!part.ok}
                  >
                    {copied === key ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied === key ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </header>
              <textarea
                className={`ws-textarea ws-textarea-mono ${!part.ok ? "is-error" : ""}`}
                value={part.ok ? part.pretty : part.error}
                readOnly
                rows={10}
                spellCheck={false}
              />
            </div>
          );
        })}
      </div>

      <div className="ws-jwt-meta">
        <div><strong>signature:</strong> <code className="ws-mono">{parts.signature || "—"}</code></div>
        {parts.exp ? <div><strong>exp:</strong> <code className="ws-mono">{parts.exp}</code></div> : null}
        <p className="ws-text-io-note">⚠ Signature is not verified — this tool only decodes.</p>
      </div>
    </div>
  );
}
