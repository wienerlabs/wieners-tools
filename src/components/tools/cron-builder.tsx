"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextInput } from "@/components/options-panel";

type Field = number[];

function expandField(part: string, min: number, max: number): Field {
  const result = new Set<number>();
  for (const piece of part.split(",")) {
    let p = piece.trim();
    let step = 1;
    const slash = p.indexOf("/");
    if (slash >= 0) {
      step = parseInt(p.slice(slash + 1), 10) || 1;
      p = p.slice(0, slash);
    }
    let from = min;
    let to = max;
    if (p === "*") {
      from = min;
      to = max;
    } else if (p.includes("-")) {
      const [a, b] = p.split("-").map((n) => parseInt(n, 10));
      from = a;
      to = b;
    } else {
      const n = parseInt(p, 10);
      if (Number.isNaN(n)) throw new Error(`invalid token: ${piece}`);
      from = n;
      to = n;
    }
    for (let v = from; v <= to; v += step) {
      if (v < min || v > max) throw new Error(`out of range (${min}-${max}): ${v}`);
      result.add(v);
    }
  }
  return Array.from(result).sort((a, b) => a - b);
}

function parseCron(expr: string) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("cron must have 5 fields: m h dom mon dow");
  return {
    minute: expandField(parts[0], 0, 59),
    hour: expandField(parts[1], 0, 23),
    dom: expandField(parts[2], 1, 31),
    month: expandField(parts[3], 1, 12),
    dow: expandField(parts[4], 0, 6)
  };
}

function nextFires(expr: string, count: number, from: Date): Date[] {
  const c = parseCron(expr);
  const out: Date[] = [];
  const d = new Date(from);
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);
  let safety = 0;
  while (out.length < count && safety++ < 60_000) {
    if (
      c.month.includes(d.getMonth() + 1) &&
      c.dom.includes(d.getDate()) &&
      c.dow.includes(d.getDay()) &&
      c.hour.includes(d.getHours()) &&
      c.minute.includes(d.getMinutes())
    ) {
      out.push(new Date(d));
    }
    d.setMinutes(d.getMinutes() + 1);
  }
  return out;
}

function describe(expr: string): string {
  try {
    const c = parseCron(expr);
    const everyMin = c.minute.length === 60;
    const everyHour = c.hour.length === 24;
    const everyDom = c.dom.length === 31;
    const everyMonth = c.month.length === 12;
    const everyDow = c.dow.length === 7;
    const minStr = everyMin ? "every minute" : c.minute.length === 1 ? `at minute ${c.minute[0]}` : `minutes ${c.minute.join(",")}`;
    const hourStr = everyHour ? "" : c.hour.length === 1 ? `hour ${c.hour[0]}` : `hours ${c.hour.join(",")}`;
    const dowDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dowStr = everyDow ? "" : "on " + c.dow.map((d) => dowDays[d]).join(",");
    const domStr = everyDom ? "" : `day-of-month ${c.dom.join(",")}`;
    const monthStr = everyMonth ? "" : `month ${c.month.join(",")}`;
    return [minStr, hourStr, domStr, monthStr, dowStr].filter(Boolean).join(" · ");
  } catch (e) {
    return e instanceof Error ? e.message : String(e);
  }
}

export default function CronBuilderTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [expr, setExpr] = useState("0 9 * * 1-5");
  const [presets] = useState([
    { label: "Every minute", value: "* * * * *" },
    { label: "Hourly", value: "0 * * * *" },
    { label: "Daily 9am", value: "0 9 * * *" },
    { label: "Weekdays 9am", value: "0 9 * * 1-5" },
    { label: "Weekly Mon 8am", value: "0 8 * * 1" },
    { label: "First of month", value: "0 0 1 * *" },
    { label: "Every 15 min", value: "*/15 * * * *" }
  ]);

  const desc = useMemo(() => describe(expr), [expr]);
  const nexts = useMemo(() => {
    try {
      return nextFires(expr, 5, new Date());
    } catch {
      return [];
    }
  }, [expr]);

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.expression ?? "Cron expression"} hint="m h dom mon dow">
          <TextInput value={expr} onChange={setExpr} placeholder="* * * * *" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-chip-row">
        {presets.map((p) => (
          <button
            key={p.value}
            type="button"
            className={`ws-chip ${expr === p.value ? "is-selected" : ""}`}
            onClick={() => setExpr(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="ws-css-out">
        <code className="ws-mono" style={{ wordBreak: "break-all" }}>{desc}</code>
      </div>

      {nexts.length > 0 ? (
        <ul className="ws-uuid-list" style={{ marginTop: 16 }}>
          {nexts.map((d, i) => (
            <li key={i}>
              <code className="ws-mono">
                {i + 1}. {d.toLocaleString()} <span style={{ opacity: 0.5 }}>· in {Math.round((d.getTime() - Date.now()) / 60_000)} min</span>
              </code>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
