"use client";

import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select, TextInput } from "@/components/options-panel";

type RType = "A" | "AAAA" | "MX" | "TXT" | "CNAME" | "NS" | "SOA" | "CAA";

type Answer = { name: string; type: number; TTL: number; data: string };

const TYPE_NAMES: Record<number, string> = {
  1: "A", 2: "NS", 5: "CNAME", 6: "SOA", 15: "MX", 16: "TXT", 28: "AAAA", 257: "CAA"
};

export default function DnsLookupTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [name, setName] = useState("wienerstools.com");
  const [type, setType] = useState<RType>("A");
  const [busy, setBusy] = useState(false);
  const [resp, setResp] = useState<{ Status: number; Answer?: Answer[]; Authority?: Answer[] } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const lookup = async () => {
    setBusy(true);
    setErr(null);
    setResp(null);
    try {
      const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`, {
        headers: { Accept: "application/dns-json" }
      });
      const data = await r.json();
      setResp(data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label="Name">
          <TextInput value={name} onChange={setName} placeholder="example.com" />
        </FieldRow>
        <FieldRow label={opt.type ?? "Record type"}>
          <Select<RType>
            value={type}
            options={(["A", "AAAA", "MX", "TXT", "CNAME", "NS", "SOA", "CAA"] as RType[]).map((t) => ({ value: t, label: t }))}
            onChange={setType}
          />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={lookup} disabled={busy || !name}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Search size={14} />}
          {busy ? "Querying…" : "Lookup"}
        </button>
        <span className="ws-text-io-note">via cloudflare-dns.com (DoH)</span>
      </div>

      {err ? <p className="ws-text-io-note ws-text-io-error">{err}</p> : null}

      {resp ? (
        <div>
          <p className="ws-text-io-note ws-mono">status: {resp.Status} ({resp.Status === 0 ? "NOERROR" : resp.Status === 3 ? "NXDOMAIN" : resp.Status})</p>
          {(resp.Answer || resp.Authority || []).length === 0 ? (
            <p className="ws-text-io-note">no records</p>
          ) : (
            <ul className="ws-pdf-list">
              {(resp.Answer ?? []).map((a, i) => (
                <li key={`a-${i}`} className="ws-pdf-row">
                  <span className="ws-pdf-row-name">{a.name}</span>
                  <span className="ws-pdf-row-meta">{TYPE_NAMES[a.type] ?? a.type} · TTL {a.TTL}</span>
                  <code className="ws-mono" style={{ wordBreak: "break-all" }}>{a.data}</code>
                </li>
              ))}
              {(resp.Authority ?? []).map((a, i) => (
                <li key={`auth-${i}`} className="ws-pdf-row" style={{ opacity: 0.7 }}>
                  <span className="ws-pdf-row-name">{a.name}</span>
                  <span className="ws-pdf-row-meta">authority · {TYPE_NAMES[a.type] ?? a.type}</span>
                  <code className="ws-mono" style={{ wordBreak: "break-all" }}>{a.data}</code>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </>
  );
}
