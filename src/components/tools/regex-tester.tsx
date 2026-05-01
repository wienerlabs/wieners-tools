"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextInput } from "@/components/options-panel";

type Match = {
  index: number;
  end: number;
  text: string;
  groups: string[];
};

function runRegex(pattern: string, flags: string, subject: string): { matches: Match[]; error: string | null } {
  if (!pattern) return { matches: [], error: null };
  try {
    const safeFlags = flags.includes("g") ? flags : flags + "g";
    const re = new RegExp(pattern, safeFlags);
    const matches: Match[] = [];
    let m: RegExpExecArray | null;
    let safety = 0;
    while ((m = re.exec(subject)) !== null) {
      matches.push({
        index: m.index,
        end: m.index + m[0].length,
        text: m[0],
        groups: m.slice(1)
      });
      if (m[0].length === 0) re.lastIndex += 1;
      if (++safety > 5000) break;
    }
    return { matches, error: null };
  } catch (err) {
    return { matches: [], error: err instanceof Error ? err.message : String(err) };
  }
}

function highlight(subject: string, matches: Match[]): React.ReactNode {
  if (matches.length === 0) return subject;
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    if (m.index > cursor) parts.push(subject.slice(cursor, m.index));
    parts.push(
      <mark key={`m-${i}`} className="ws-regex-match">
        {subject.slice(m.index, m.end) || "·"}
      </mark>
    );
    cursor = m.end;
  });
  if (cursor < subject.length) parts.push(subject.slice(cursor));
  return parts;
}

export default function RegexTesterTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [pattern, setPattern] = useState("\\b[A-Z][a-z]+\\b");
  const [flags, setFlags] = useState("g");
  const [subject, setSubject] = useState("Wiener Tools is a fast, browser-native Image workshop.");

  const { matches, error } = useMemo(() => runRegex(pattern, flags, subject), [pattern, flags, subject]);

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.pattern ?? "Pattern"}>
          <TextInput value={pattern} onChange={setPattern} placeholder="\\d+" />
        </FieldRow>
        <FieldRow label={opt.flags ?? "Flags"}>
          <TextInput value={flags} onChange={setFlags} placeholder="g i m s u y" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>{opt.subject ?? "Subject"}</span></header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            rows={10}
            spellCheck={false}
          />
        </div>
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head">
            <span>{error ? "Error" : `Matches: ${matches.length}`}</span>
          </header>
          {error ? (
            <div className="ws-regex-error">{error}</div>
          ) : (
            <div className="ws-regex-preview">{highlight(subject, matches)}</div>
          )}
        </div>
      </div>

      {matches.length > 0 && !error ? (
        <div className="ws-regex-list">
          {matches.map((m, i) => (
            <div key={i} className="ws-regex-row">
              <span className="ws-regex-pos">[{m.index}-{m.end}]</span>
              <code className="ws-mono">{m.text || "(empty)"}</code>
              {m.groups.length > 0 ? (
                <span className="ws-regex-groups">
                  groups: {m.groups.map((g, j) => <code key={j} className="ws-mono">{g ?? "—"}</code>)}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
