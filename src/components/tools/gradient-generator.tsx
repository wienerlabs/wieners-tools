"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Plus, Trash2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Select, ColorInput } from "@/components/options-panel";

type Type = "linear" | "radial" | "conic";
type Stop = { color: string; pos: number };

export default function GradientGeneratorTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [type, setType] = useState<Type>("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>([
    { color: "#000000", pos: 0 },
    { color: "#fff4dd", pos: 100 }
  ]);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => {
    const s = stops
      .slice()
      .sort((a, b) => a.pos - b.pos)
      .map((stop) => `${stop.color} ${stop.pos}%`)
      .join(", ");
    if (type === "linear") return `linear-gradient(${angle}deg, ${s})`;
    if (type === "radial") return `radial-gradient(circle at center, ${s})`;
    return `conic-gradient(from ${angle}deg, ${s})`;
  }, [type, angle, stops]);

  const updateStop = (idx: number, key: keyof Stop, value: string | number) => {
    setStops((prev) => prev.map((s, i) => (i === idx ? { ...s, [key]: value } : s)));
  };
  const addStop = () => setStops((prev) => [...prev, { color: "#888888", pos: 50 }]);
  const removeStop = (idx: number) => setStops((prev) => prev.filter((_, i) => i !== idx));

  const onCopy = async () => {
    await navigator.clipboard?.writeText(`background: ${css};`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.type ?? "Type"}>
          <Select<Type>
            value={type}
            options={[
              { value: "linear", label: "linear" },
              { value: "radial", label: "radial" },
              { value: "conic", label: "conic" }
            ]}
            onChange={setType}
          />
        </FieldRow>
        {type !== "radial" ? (
          <FieldRow label={opt.angle ?? "Angle"}>
            <NumberInput value={angle} min={0} max={360} step={1} onChange={setAngle} suffix="°" />
          </FieldRow>
        ) : null}
      </OptionsPanel>

      <div className="ws-design-stage" style={{ background: css }} aria-hidden="true" />

      <div className="ws-stop-list">
        {stops.map((stop, i) => (
          <div key={i} className="ws-stop-row">
            <ColorInput value={stop.color} onChange={(v) => updateStop(i, "color", v)} />
            <NumberInput value={stop.pos} min={0} max={100} step={1} onChange={(v) => updateStop(i, "pos", v)} suffix="%" />
            <button type="button" className="ws-icon-button" disabled={stops.length <= 2} onClick={() => removeStop(i)}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button type="button" className="ws-button ws-button-ghost" onClick={addStop}>
          <Plus size={14} /> Stop
        </button>
      </div>

      <div className="ws-css-out">
        <code className="ws-mono">background: {css};</code>
        <button type="button" className="ws-icon-button" onClick={onCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </>
  );
}
