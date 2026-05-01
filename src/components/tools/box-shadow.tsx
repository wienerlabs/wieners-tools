"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Plus, Trash2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, ColorInput, Toggle } from "@/components/options-panel";

type Layer = { x: number; y: number; blur: number; spread: number; color: string; inset: boolean };

const DEFAULT_LAYER: Layer = { x: 0, y: 8, blur: 24, spread: -4, color: "#00000033", inset: false };

export default function BoxShadowTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [layers, setLayers] = useState<Layer[]>([DEFAULT_LAYER]);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const css = useMemo(
    () =>
      layers
        .map((l) => `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`)
        .join(", "),
    [layers]
  );

  const set = <K extends keyof Layer>(key: K, value: Layer[K]) =>
    setLayers((prev) => prev.map((l, i) => (i === active ? { ...l, [key]: value } : l)));

  const addLayer = () => {
    setLayers((prev) => [...prev, { ...DEFAULT_LAYER }]);
    setActive(layers.length);
  };
  const removeLayer = (idx: number) => {
    setLayers((prev) => prev.filter((_, i) => i !== idx));
    setActive(0);
  };

  const onCopy = async () => {
    await navigator.clipboard?.writeText(`box-shadow: ${css};`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  const layer = layers[active] ?? layers[0];

  return (
    <>
      <div className="ws-design-stage ws-design-stage-light">
        <div className="ws-design-target" style={{ boxShadow: css }} />
      </div>

      <div className="ws-layer-tabs">
        {layers.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`ws-chip ${i === active ? "is-selected" : ""}`}
            onClick={() => setActive(i)}
          >
            Layer {i + 1}
          </button>
        ))}
        <button type="button" className="ws-chip" onClick={addLayer}><Plus size={12} /> add</button>
        {layers.length > 1 ? (
          <button type="button" className="ws-chip" onClick={() => removeLayer(active)}><Trash2 size={12} /> remove</button>
        ) : null}
      </div>

      <OptionsPanel>
        <FieldRow label="x"><NumberInput value={layer.x} min={-100} max={100} onChange={(v) => set("x", v)} suffix="px" /></FieldRow>
        <FieldRow label="y"><NumberInput value={layer.y} min={-100} max={100} onChange={(v) => set("y", v)} suffix="px" /></FieldRow>
        <FieldRow label="blur"><NumberInput value={layer.blur} min={0} max={200} onChange={(v) => set("blur", v)} suffix="px" /></FieldRow>
        <FieldRow label="spread"><NumberInput value={layer.spread} min={-100} max={100} onChange={(v) => set("spread", v)} suffix="px" /></FieldRow>
        <FieldRow label="color"><ColorInput value={layer.color.slice(0, 7)} onChange={(v) => set("color", v)} /></FieldRow>
        <FieldRow label="inset"><Toggle value={layer.inset} onChange={(v) => set("inset", v)} label="inset" /></FieldRow>
      </OptionsPanel>

      <div className="ws-css-out">
        <code className="ws-mono">box-shadow: {css};</code>
        <button type="button" className="ws-icon-button" onClick={onCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </>
  );
}
