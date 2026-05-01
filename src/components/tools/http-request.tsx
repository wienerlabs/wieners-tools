"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select, TextInput, TextArea } from "@/components/options-panel";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

type ResponseInfo = {
  ok: boolean;
  status: number;
  statusText: string;
  ms: number;
  size: number;
  headers: Record<string, string>;
  body: string;
};

export default function HttpRequestTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [method, setMethod] = useState<Method>("GET");
  const [url, setUrl] = useState("https://httpbin.org/get?ping=wiener");
  const [headers, setHeaders] = useState<string>('{\n  "Accept": "application/json"\n}');
  const [body, setBody] = useState<string>("");
  const [resp, setResp] = useState<ResponseInfo | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const send = async () => {
    setBusy(true);
    setErr(null);
    setResp(null);
    let parsedHeaders: Record<string, string> = {};
    if (headers.trim()) {
      try {
        parsedHeaders = JSON.parse(headers);
      } catch (e) {
        setBusy(false);
        setErr(`Invalid headers JSON: ${e instanceof Error ? e.message : String(e)}`);
        return;
      }
    }
    const opts: RequestInit = { method, headers: parsedHeaders };
    if (method !== "GET" && method !== "HEAD" && body.trim()) opts.body = body;
    const start = performance.now();
    try {
      const r = await fetch(url, opts);
      const text = await r.text();
      const ms = performance.now() - start;
      const hdr: Record<string, string> = {};
      r.headers.forEach((v, k) => (hdr[k] = v));
      setResp({
        ok: r.ok,
        status: r.status,
        statusText: r.statusText,
        ms,
        size: new Blob([text]).size,
        headers: hdr,
        body: text
      });
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.method ?? "Method"}>
          <Select<Method>
            value={method}
            options={(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"] as Method[]).map((m) => ({ value: m, label: m }))}
            onChange={setMethod}
          />
        </FieldRow>
        <FieldRow label={opt.url ?? "URL"}>
          <TextInput value={url} onChange={setUrl} placeholder="https://api.example.com/endpoint" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>{opt.headers ?? "Headers (JSON)"}</span></header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            rows={6}
            spellCheck={false}
          />
        </div>
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>{opt.body ?? "Body"}</span></header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            spellCheck={false}
            placeholder={method === "GET" || method === "HEAD" ? "(no body for this method)" : '{"key":"value"}'}
            disabled={method === "GET" || method === "HEAD"}
          />
        </div>
      </div>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={send} disabled={busy || !url}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Send size={14} />}
          {busy ? "Sending…" : "Send"}
        </button>
      </div>

      {err ? <p className="ws-text-io-note ws-text-io-error">{err}</p> : null}

      {resp ? (
        <div className="ws-http-response">
          <div className="ws-http-meta">
            <span className={`ws-http-status ${resp.ok ? "is-ok" : "is-bad"}`}>{resp.status} {resp.statusText}</span>
            <span className="ws-mono">{resp.ms.toFixed(0)} ms</span>
            <span className="ws-mono">{(resp.size / 1024).toFixed(2)} KB</span>
          </div>
          <details className="ws-http-headers" open={false}>
            <summary>Headers ({Object.keys(resp.headers).length})</summary>
            <pre className="ws-mono">{Object.entries(resp.headers).map(([k, v]) => `${k}: ${v}`).join("\n")}</pre>
          </details>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={resp.body}
            readOnly
            rows={14}
            spellCheck={false}
          />
        </div>
      ) : null}
    </>
  );
}
