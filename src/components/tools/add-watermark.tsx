"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Select, Slider, TextInput, ColorInput, NumberInput } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, inferOutputName, readFileAsImage } from "@/lib/tools/utils";

type Position = "tl" | "tr" | "bl" | "br" | "c" | "tile";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function AddWatermarkTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("© Wiener's Tools");
  const [size, setSize] = useState(48);
  const [opacity, setOpacity] = useState(0.6);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState<Position>("br");
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const out: ResultEntry[] = [];
    for (const file of files) {
      const image = await readFileAsImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      ctx.drawImage(image, 0, 0);

      ctx.font = `${size}px sans-serif`;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = Math.max(2, size / 16);

      const margin = Math.round(size / 1.5);
      const metrics = ctx.measureText(text);
      const tw = metrics.width;
      const th = size;

      if (position === "tile") {
        ctx.globalAlpha = opacity * 0.5;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 6);
        const stepX = tw + size * 2;
        const stepY = size * 3;
        const rangeX = canvas.width;
        const rangeY = canvas.height;
        for (let y = -rangeY; y < rangeY; y += stepY) {
          for (let x = -rangeX; x < rangeX; x += stepX) {
            ctx.fillText(text, x, y);
          }
        }
        ctx.restore();
      } else {
        let x = margin;
        let y = margin + th;
        if (position === "tr" || position === "br") x = canvas.width - tw - margin;
        if (position === "bl" || position === "br") y = canvas.height - margin;
        if (position === "c") {
          x = (canvas.width - tw) / 2;
          y = (canvas.height + th) / 2;
        }
        ctx.fillText(text, x, y);
      }

      const type = file.type && file.type.startsWith("image/") ? file.type : "image/png";
      const blob = await canvasToBlob(canvas, type, type === "image/png" ? undefined : 0.95);
      const ext = type.split("/")[1].replace("jpeg", "jpg");
      out.push({
        blob,
        filename: inferOutputName(file.name, "-watermark", ext),
        meta: { width: canvas.width, height: canvas.height }
      });
    }
    setResults(out);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Text">
          <TextInput value={text} onChange={setText} placeholder="© Brand" />
        </FieldRow>
        <FieldRow label="Position">
          <Select<Position>
            value={position}
            options={[
              { value: "br", label: "Bottom right" },
              { value: "bl", label: "Bottom left" },
              { value: "tr", label: "Top right" },
              { value: "tl", label: "Top left" },
              { value: "c", label: "Centre" },
              { value: "tile", label: "Tile (repeated)" }
            ]}
            onChange={setPosition}
          />
        </FieldRow>
        <FieldRow label="Font size">
          <NumberInput value={size} min={12} max={400} step={2} onChange={setSize} suffix="px" />
        </FieldRow>
        <FieldRow label="Opacity">
          <Slider value={opacity} min={0} max={1} step={0.01} onChange={setOpacity} format={(v) => `${Math.round(v * 100)}%`} />
        </FieldRow>
        <FieldRow label="Color">
          <ColorInput value={color} onChange={setColor} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={files.length === 0 || busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? ui.processing : ui.process}
        </button>
        {(files.length > 0 || results.length > 0) && (
          <button type="button" className="ws-button ws-button-ghost" onClick={() => { setFiles([]); setResults([]); }}>
            {ui.reset}
          </button>
        )}
      </div>

      <ResultGrid locale={locale} results={results} />
    </>
  );
}
