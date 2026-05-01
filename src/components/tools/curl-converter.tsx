"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select } from "@/components/options-panel";

type Target = "fetch" | "axios";

type Parsed = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
};

function tokenize(input: string): string[] {
  const out: string[] = [];
  let cur = "";
  let quote: '"' | "'" | null = null;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quote) {
      if (c === "\\" && i + 1 < input.length) {
        cur += input[++i];
      } else if (c === quote) {
        quote = null;
      } else {
        cur += c;
      }
    } else if (c === '"' || c === "'") {
      quote = c;
    } else if (/\s/.test(c)) {
      if (cur) {
        out.push(cur);
        cur = "";
      }
    } else if (c === "\\" && /\s/.test(input[i + 1] ?? "")) {
      // line continuation
    } else {
      cur += c;
    }
  }
  if (cur) out.push(cur);
  return out;
}

function parseCurl(input: string): Parsed | { error: string } {
  const tokens = tokenize(input.trim());
  if (tokens.length === 0 || tokens[0].toLowerCase() !== "curl") {
    return { error: "Input must start with 'curl'." };
  }
  let url = "";
  let method = "GET";
  const headers: Record<string, string> = {};
  let body: string | undefined;
  for (let i = 1; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === "-X" || t === "--request") {
      method = (tokens[++i] ?? "GET").toUpperCase();
    } else if (t === "-H" || t === "--header") {
      const v = tokens[++i] ?? "";
      const idx = v.indexOf(":");
      if (idx > 0) headers[v.slice(0, idx).trim()] = v.slice(idx + 1).trim();
    } else if (t === "-d" || t === "--data" || t === "--data-raw" || t === "--data-binary") {
      body = (body ? body + "&" : "") + (tokens[++i] ?? "");
      if (method === "GET") method = "POST";
    } else if (t === "--data-urlencode") {
      const v = tokens[++i] ?? "";
      body = (body ? body + "&" : "") + encodeURIComponent(v);
      if (method === "GET") method = "POST";
    } else if (t === "-u" || t === "--user") {
      headers["Authorization"] = "Basic " + (typeof btoa === "function" ? btoa(tokens[++i] ?? "") : "");
    } else if (t === "-A" || t === "--user-agent") {
      headers["User-Agent"] = tokens[++i] ?? "";
    } else if (t === "-e" || t === "--referer") {
      headers["Referer"] = tokens[++i] ?? "";
    } else if (t === "-b" || t === "--cookie") {
      headers["Cookie"] = tokens[++i] ?? "";
    } else if (t.startsWith("-")) {
      // ignore unknown short flag, skip arg if it's not another flag
      if (tokens[i + 1] && !tokens[i + 1].startsWith("-")) i++;
    } else if (!url) {
      url = t;
    }
  }
  if (!url) return { error: "No URL found." };
  return { url, method, headers, body };
}

function emitFetch(p: Parsed): string {
  const init: Record<string, unknown> = { method: p.method };
  if (Object.keys(p.headers).length) init.headers = p.headers;
  if (p.body) init.body = p.body;
  const initStr = JSON.stringify(init, null, 2);
  return `const res = await fetch(${JSON.stringify(p.url)}, ${initStr});\nconst data = await res.json();\nconsole.log(data);`;
}

function emitAxios(p: Parsed): string {
  const cfg: Record<string, unknown> = {
    method: p.method.toLowerCase(),
    url: p.url
  };
  if (Object.keys(p.headers).length) cfg.headers = p.headers;
  if (p.body) cfg.data = p.body;
  return `import axios from "axios";\n\nconst { data } = await axios(${JSON.stringify(cfg, null, 2)});\nconsole.log(data);`;
}

export default function CurlConverterTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [target, setTarget] = useState<Target>("fetch");
  const [src, setSrc] = useState<string>(`curl -X POST 'https://api.example.com/v1/users' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer TOKEN' \\
  -d '{"name":"Wiener","role":"builder"}'`);
  const [copied, setCopied] = useState(false);

  const out = useMemo(() => {
    const r = parseCurl(src);
    if ("error" in r) return { ok: false as const, value: r.error };
    return { ok: true as const, value: target === "fetch" ? emitFetch(r) : emitAxios(r) };
  }, [src, target]);

  const onCopy = async () => {
    if (!out.ok) return;
    await navigator.clipboard?.writeText(out.value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.target ?? "Target"}>
          <Select<Target>
            value={target}
            options={[{ value: "fetch", label: "fetch" }, { value: "axios", label: "axios" }]}
            onChange={setTarget}
          />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>cURL</span></header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            rows={14}
            spellCheck={false}
          />
        </div>
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head">
            <span>{target}</span>
            <div className="ws-text-io-actions">
              <button type="button" className="ws-icon-button" onClick={onCopy} disabled={!out.ok}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </header>
          <textarea
            className={`ws-textarea ws-textarea-mono ${!out.ok ? "is-error" : ""}`}
            value={out.value}
            readOnly
            rows={14}
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}
