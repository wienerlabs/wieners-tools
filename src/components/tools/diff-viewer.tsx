"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select } from "@/components/options-panel";

type Mode = "line" | "word";

type Op = "eq" | "add" | "del";

type Token = { op: Op; text: string };

function tokenize(text: string, mode: Mode): string[] {
  if (mode === "line") return text.split(/(\n)/);
  return text.split(/(\s+)/);
}

function lcsDiff(a: string[], b: string[]): Token[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: Token[] = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      out.push({ op: "eq", text: a[i] });
      i++; j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ op: "del", text: a[i] });
      i++;
    } else {
      out.push({ op: "add", text: b[j] });
      j++;
    }
  }
  while (i < m) out.push({ op: "del", text: a[i++] });
  while (j < n) out.push({ op: "add", text: b[j++] });
  return out;
}

export default function DiffViewerTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [left, setLeft] = useState("Wiener Tools is a browser-native image workshop.\nWritten in TypeScript.");
  const [right, setRight] = useState("Wiener Tools is a browser-native design workshop.\nWritten in TypeScript and React.");
  const [mode, setMode] = useState<Mode>("line");

  const tokens = useMemo(() => {
    if (mode === "line") {
      const a = left.split(/\n/);
      const b = right.split(/\n/);
      return lcsDiff(a, b);
    }
    return lcsDiff(tokenize(left, mode), tokenize(right, mode));
  }, [left, right, mode]);

  const stats = useMemo(() => {
    let add = 0, del = 0, eq = 0;
    for (const t of tokens) {
      if (t.op === "add") add++;
      else if (t.op === "del") del++;
      else eq++;
    }
    return { add, del, eq };
  }, [tokens]);

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.mode ?? "Mode"}>
          <Select<Mode>
            value={mode}
            options={[
              { value: "line", label: "Line" },
              { value: "word", label: "Word" }
            ]}
            onChange={setMode}
          />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-text-io">
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>{opt.left ?? "Left"}</span></header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            rows={12}
            spellCheck={false}
          />
        </div>
        <div className="ws-text-io-pane">
          <header className="ws-text-io-head"><span>{opt.right ?? "Right"}</span></header>
          <textarea
            className="ws-textarea ws-textarea-mono"
            value={right}
            onChange={(e) => setRight(e.target.value)}
            rows={12}
            spellCheck={false}
          />
        </div>
      </div>

      <div className="ws-diff-meta">
        <span><span className="ws-diff-add-pill">+{stats.add}</span></span>
        <span><span className="ws-diff-del-pill">−{stats.del}</span></span>
        <span><span className="ws-diff-eq-pill">={stats.eq}</span></span>
      </div>
      <pre className={`ws-diff ${mode === "line" ? "is-line" : "is-word"}`}>
        {tokens.map((t, i) => {
          if (t.op === "eq") return <span key={i}>{mode === "line" ? t.text + "\n" : t.text}</span>;
          if (t.op === "add") return <ins key={i} className="ws-diff-add">{mode === "line" ? t.text + "\n" : t.text}</ins>;
          return <del key={i} className="ws-diff-del">{mode === "line" ? t.text + "\n" : t.text}</del>;
        })}
      </pre>
    </>
  );
}
