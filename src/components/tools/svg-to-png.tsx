"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, NumberInput, Select } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, inferOutputName } from "@/lib/tools/utils";

type ScaleMode = "width" | "scale";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

async function rasterise(svgText: string, width: number): Promise<HTMLCanvasElement> {
  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    image.src = url;
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("svg-load"));
    });
    const ratio = image.naturalHeight / image.naturalWidth || 1;
    const w = Math.max(1, Math.round(width));
    const h = Math.max(1, Math.round(width * ratio));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("ctx");
    ctx.drawImage(image, 0, 0, w, h);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function SvgToPngTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<ScaleMode>("width");
  const [width, setWidth] = useState(1024);
  const [scale, setScale] = useState(2);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const out: ResultEntry[] = [];
    for (const file of files) {
      const text = await file.text();
      let targetW = width;
      if (mode === "scale") {
        // Read intrinsic from SVG temporarily
        const probe = await rasterise(text, 100);
        targetW = Math.round(probe.width * scale);
      }
      const canvas = await rasterise(text, targetW);
      const blob = await canvasToBlob(canvas, "image/png");
      out.push({
        blob,
        filename: inferOutputName(file.name, `-${canvas.width}`, "png"),
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
        <FieldRow label="Mode">
          <Select<ScaleMode>
            value={mode}
            options={[
              { value: "width", label: "Target width" },
              { value: "scale", label: "Scale ×" }
            ]}
            onChange={setMode}
          />
        </FieldRow>
        {mode === "width" ? (
          <FieldRow label="Width">
            <NumberInput value={width} min={16} max={8192} step={32} onChange={setWidth} suffix="px" />
          </FieldRow>
        ) : (
          <FieldRow label="Scale">
            <NumberInput value={scale} min={0.5} max={16} step={0.5} onChange={setScale} suffix="×" />
          </FieldRow>
        )}
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
