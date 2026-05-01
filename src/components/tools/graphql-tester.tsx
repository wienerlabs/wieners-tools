"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextInput } from "@/components/options-panel";

export default function GraphqlTesterTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [endpoint, setEndpoint] = useState("https://countries.trevorblades.com/graphql");
  const [query, setQuery] = useState(`query Country($code: ID!) {\n  country(code: $code) {\n    name\n    capital\n    currency\n    languages { name }\n  }\n}`);
  const [variables, setVariables] = useState('{\n  "code": "TR"\n}');
  const [resp, setResp] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const send = async () => {
    setBusy(true);
    setErr(null);
    setResp("");
    let vars: unknown = {};
    if (variables.trim()) {
      try {
        vars = JSON.parse(variables);
      } catch (e) {
        setBusy(false);
        setErr(`Invalid variables JSON: ${e instanceof Error ? e.message : String(e)}`);
        return;
      }
    }
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ query, variables: vars })
      });
      const text = await r.text();
      try {
        setResp(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setResp(text);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.endpoint ?? "Endpoint"}>
          <TextInput value={endpoint} onChange={setEndpoint} placeholder="https://example.com/graphql" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>{opt.query ?? "Query"}</span></header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={12}
            spellCheck={false}
          />
        </div>
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>{opt.variables ?? "Variables (JSON)"}</span></header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={variables}
            onChange={(e) => setVariables(e.target.value)}
            rows={12}
            spellCheck={false}
          />
        </div>
      </div>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={send} disabled={busy || !endpoint}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Send size={14} />}
          {busy ? "Sending…" : "Run"}
        </button>
      </div>

      {err ? <p className="ws-text-io-note ws-text-io-error">{err}</p> : null}

      {resp ? (
        <textarea
          className="ws-textarea ws-textarea-mono"
          value={resp}
          readOnly
          rows={16}
          spellCheck={false}
        />
      ) : null}
    </>
  );
}
