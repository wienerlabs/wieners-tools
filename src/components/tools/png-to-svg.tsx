"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, NumberInput, Select } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { inferOutputName, readFileAsImage } from "@/lib/tools/utils";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };
type Quality = "fast" | "balanced" | "detailed";

const PRESETS: Record<Quality, Record<string, number | string>> = {
  fast: { numberofcolors: 4, ltres: 1, qtres: 1, scale: 1, strokewidth: 0, viewbox: 1 },
  balanced: { numberofcolors: 8, ltres: 1, qtres: 1, scale: 1, strokewidth: 0, viewbox: 1 },
  detailed: { numberofcolors: 16, ltres: 0.5, qtres: 0.5, scale: 1, strokewidth: 0, viewbox: 1 }
};

export default function PngToSvgTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState<Quality>("balanced");
  const [maxWidth, setMaxWidth] = useState(512);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const tracerMod = await import("imagetracerjs");
    const tracer = (tracerMod.default ?? tracerMod) as {
      imagedataToSVG: (data: ImageData, opts: Record<string, unknown>) => string;
    };

    const out: ResultEntry[] = [];
    for (const file of files) {
      const image = await readFileAsImage(file);
      const ratio = Math.min(1, maxWidth / image.naturalWidth);
      const w = Math.max(1, Math.round(image.naturalWidth * ratio));
      const h = Math.max(1, Math.round(image.naturalHeight * ratio));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      ctx.drawImage(image, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h);
      const svg = tracer.imagedataToSVG(data, PRESETS[quality]);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      out.push({
        blob,
        filename: inferOutputName(file.name, "", "svg"),
        meta: { width: w, height: h }
      });
    }
    setResults(out);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Quality" hint="Higher quality = larger SVG and slower trace.">
          <Select<Quality>
            value={quality}
            options={[
              { value: "fast", label: "Fast (4 colors)" },
              { value: "balanced", label: "Balanced (8 colors)" },
              { value: "detailed", label: "Detailed (16 colors)" }
            ]}
            onChange={setQuality}
          />
        </FieldRow>
        <FieldRow label="Max trace width" hint="Larger source = much slower trace.">
          <NumberInput value={maxWidth} min={64} max={2048} step={32} onChange={setMaxWidth} suffix="px" />
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
