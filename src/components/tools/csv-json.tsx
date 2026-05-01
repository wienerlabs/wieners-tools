"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select, Toggle, TextInput } from "@/components/options-panel";

type Direction = "csv-to-json" | "json-to-csv";

function parseCsv(text: string, delimiter: string, header: boolean): { headers: string[]; rows: string[][] } {
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === delimiter) {
      cur.push(field);
      field = "";
    } else if (c === "\n") {
      cur.push(field);
      field = "";
      rows.push(cur);
      cur = [];
    } else if (c === "\r") {
      // skip
    } else {
      field += c;
    }
  }
  if (field !== "" || cur.length) {
    cur.push(field);
    rows.push(cur);
  }
  if (header && rows.length > 0) {
    const headers = rows.shift() as string[];
    return { headers, rows };
  }
  const max = rows.reduce((m, r) => Math.max(m, r.length), 0);
  return { headers: Array.from({ length: max }, (_, i) => `col_${i + 1}`), rows };
}

function csvToJson(text: string, delimiter: string, header: boolean): string {
  const { headers, rows } = parseCsv(text, delimiter, header);
  const objs = rows.map((r) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = r[i] ?? ""));
    return obj;
  });
  return JSON.stringify(objs, null, 2);
}

function escapeCsv(v: unknown, delimiter: string): string {
  const s = v == null ? "" : String(v);
  if (s.includes(delimiter) || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function jsonToCsv(text: string, delimiter: string): string {
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error("JSON must be an array.");
  const keys = Array.from(
    data.reduce((set: Set<string>, row: unknown) => {
      if (row && typeof row === "object") for (const k of Object.keys(row as object)) set.add(k);
      return set;
    }, new Set<string>())
  );
  const lines = [keys.map((k) => escapeCsv(k, delimiter)).join(delimiter)];
  for (const row of data) {
    const r = row as Record<string, unknown>;
    lines.push(keys.map((k) => escapeCsv(r?.[k], delimiter)).join(delimiter));
  }
  return lines.join("\n");
}

export default function CsvJsonTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [dir, setDir] = useState<Direction>("csv-to-json");
  const [delimiter, setDelimiter] = useState(",");
  const [header, setHeader] = useState(true);
  const [src, setSrc] = useState("name,role\nWiener,builder\nClaude,assistant");
  const [copied, setCopied] = useState(false);

  const out = useMemo(() => {
    if (!src.trim()) return { ok: true as const, value: "" };
    try {
      return {
        ok: true as const,
        value: dir === "csv-to-json" ? csvToJson(src, delimiter, header) : jsonToCsv(src, delimiter)
      };
    } catch (e) {
      return { ok: false as const, value: e instanceof Error ? e.message : String(e) };
    }
  }, [src, dir, delimiter, header]);

  const copy = async () => {
    if (!out.ok) return;
    await navigator.clipboard?.writeText(out.value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.direction ?? "Direction"}>
          <Select<Direction>
            value={dir}
            options={[
              { value: "csv-to-json", label: "CSV → JSON" },
              { value: "json-to-csv", label: "JSON → CSV" }
            ]}
            onChange={setDir}
          />
        </FieldRow>
        <FieldRow label={opt.delimiter ?? "Delimiter"}>
          <TextInput value={delimiter} onChange={setDelimiter} placeholder="," />
        </FieldRow>
        {dir === "csv-to-json" ? (
          <FieldRow label={opt.header ?? "First row is header"}>
            <Toggle value={header} onChange={setHeader} label="header" />
          </FieldRow>
        ) : null}
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>{dir === "csv-to-json" ? "CSV" : "JSON"}</span></header>
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
            <span>{dir === "csv-to-json" ? "JSON" : "CSV"}</span>
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
            rows={14}
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}
