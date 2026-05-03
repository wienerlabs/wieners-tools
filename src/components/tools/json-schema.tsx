"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";

const SAMPLE = `{
  "id": 42,
  "name": "Wiener Tools",
  "active": true,
  "tags": ["browser", "client-side", "open-source"],
  "owner": { "email": "you@example.com", "verified": false },
  "scores": [9.2, 8.7, null]
}`;

type Schema = {
  type?: string | string[];
  properties?: Record<string, Schema>;
  required?: string[];
  items?: Schema;
  examples?: unknown[];
  format?: string;
};

function jsType(v: unknown): string {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}

function looksLikeIso(v: string) {
  return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})/.test(v);
}

function looksLikeEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function looksLikeUri(v: string) {
  return /^https?:\/\//.test(v);
}

function looksLikeUuid(v: string) {
  return /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(v);
}

function infer(value: unknown): Schema {
  const t = jsType(value);
  if (t === "string") {
    const s = value as string;
    if (looksLikeIso(s)) return { type: "string", format: "date-time" };
    if (looksLikeEmail(s)) return { type: "string", format: "email" };
    if (looksLikeUri(s)) return { type: "string", format: "uri" };
    if (looksLikeUuid(s)) return { type: "string", format: "uuid" };
    return { type: "string" };
  }
  if (t === "number") {
    return Number.isInteger(value) ? { type: "integer" } : { type: "number" };
  }
  if (t === "boolean") return { type: "boolean" };
  if (t === "null") return { type: "null" };
  if (t === "array") {
    const arr = value as unknown[];
    if (arr.length === 0) return { type: "array" };
    const first = infer(arr[0]);
    return { type: "array", items: first };
  }
  if (t === "object") {
    const obj = value as Record<string, unknown>;
    const properties: Record<string, Schema> = {};
    const required: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
      properties[k] = infer(v);
      if (v !== null && v !== undefined) required.push(k);
    }
    return { type: "object", properties, ...(required.length ? { required } : {}) };
  }
  return {};
}

export default function JsonSchemaTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [src, setSrc] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  const out = useMemo(() => {
    if (!src.trim()) return { ok: true as const, value: "" };
    try {
      const parsed = JSON.parse(src);
      const inferred = infer(parsed);
      const schema = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        ...inferred
      };
      return { ok: true as const, value: JSON.stringify(schema, null, 2) };
    } catch (e) {
      return { ok: false as const, value: e instanceof Error ? e.message : String(e) };
    }
  }, [src]);

  const copy = async () => {
    if (!out.ok) return;
    await navigator.clipboard?.writeText(out.value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="ws-text-io">
      <div className="ws-text-io-pane">
        <header className="ws-text-io-head"><span>JSON sample</span></header>
        <textarea
          className="ws-textarea ws-textarea-mono"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          rows={16}
          spellCheck={false}
        />
      </div>
      <div className="ws-text-io-pane">
        <header className="ws-text-io-head">
          <span>Draft 2020-12 schema</span>
          <div className="ws-text-io-actions">
            <button type="button" className="ws-icon-button" onClick={copy} disabled={!out.ok}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </header>
        <textarea
          className={`ws-textarea ws-textarea-mono ${!out.ok ? "is-error" : ""}`}
          value={out.value}
          readOnly
          rows={16}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
