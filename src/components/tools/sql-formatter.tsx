"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Select } from "@/components/options-panel";

type Dialect = "postgresql" | "mysql" | "sqlite" | "mariadb" | "bigquery" | "snowflake" | "sql";
type KeywordCase = "upper" | "lower" | "preserve";

const SAMPLE = `select u.id, u.email, count(o.id) as order_count from users u left join orders o on o.user_id = u.id where u.created_at >= '2026-01-01' group by u.id, u.email having count(o.id) > 5 order by order_count desc limit 100;`;

export default function SqlFormatterTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [src, setSrc] = useState(SAMPLE);
  const [dialect, setDialect] = useState<Dialect>("postgresql");
  const [keywordCase, setKeywordCase] = useState<KeywordCase>("upper");
  const [indent, setIndent] = useState(2);
  const [out, setOut] = useState<{ ok: boolean; value: string }>({ ok: true, value: "" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    if (!src.trim()) {
      setOut({ ok: true, value: "" });
      return;
    }
    (async () => {
      try {
        const { format } = await import("sql-formatter");
        const v = format(src, {
          language: dialect,
          keywordCase,
          tabWidth: indent
        });
        if (active) setOut({ ok: true, value: v });
      } catch (e) {
        if (active) setOut({ ok: false, value: e instanceof Error ? e.message : String(e) });
      }
    })();
    return () => {
      active = false;
    };
  }, [src, dialect, keywordCase, indent]);

  const copy = async () => {
    if (!out.ok) return;
    await navigator.clipboard?.writeText(out.value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label="Dialect">
          <Select<Dialect>
            value={dialect}
            options={[
              { value: "postgresql", label: "PostgreSQL" },
              { value: "mysql", label: "MySQL" },
              { value: "sqlite", label: "SQLite" },
              { value: "mariadb", label: "MariaDB" },
              { value: "bigquery", label: "BigQuery" },
              { value: "snowflake", label: "Snowflake" },
              { value: "sql", label: "Standard SQL" }
            ]}
            onChange={setDialect}
          />
        </FieldRow>
        <FieldRow label={opt.keywordCase ?? "Keyword case"}>
          <Select<KeywordCase>
            value={keywordCase}
            options={[
              { value: "upper", label: "UPPER" },
              { value: "lower", label: "lower" },
              { value: "preserve", label: "preserve" }
            ]}
            onChange={setKeywordCase}
          />
        </FieldRow>
        <FieldRow label={opt.indent ?? "Indent"}>
          <NumberInput value={indent} min={1} max={8} step={1} onChange={setIndent} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>Input SQL</span></header>
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
            <span>Formatted</span>
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
