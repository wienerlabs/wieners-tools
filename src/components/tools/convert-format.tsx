"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Slider, Select } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, imageToCanvas, inferOutputName, readFileAsImage } from "@/lib/tools/utils";

type Format = "image/jpeg" | "image/webp" | "image/png" | "image/avif";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

const FORMATS: Array<{ value: Format; label: string }> = [
  { value: "image/png", label: "PNG" },
  { value: "image/jpeg", label: "JPEG" },
  { value: "image/webp", label: "WebP" },
  { value: "image/avif", label: "AVIF" }
];

export default function ConvertFormatTool({
  locale,
  tool,
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<Format>("image/webp");
  const [quality, setQuality] = useState(0.92);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const out: ResultEntry[] = [];
    for (const file of files) {
      const image = await readFileAsImage(file);
      const { canvas } = imageToCanvas(image);
      const blob = await canvasToBlob(
        canvas,
        format,
        format === "image/png" ? undefined : quality
      );
      const ext = format.split("/")[1].replace("jpeg", "jpg");
      out.push({
        blob,
        filename: inferOutputName(file.name, "", ext),
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
        <FieldRow label={opt.format ?? "Format"}>
          <Select value={format} options={FORMATS} onChange={setFormat} />
        </FieldRow>
        {format !== "image/png" ? (
          <FieldRow label={opt.quality ?? "Quality"}>
            <Slider value={quality} min={0.1} max={1} step={0.01} onChange={setQuality} format={(v) => `${Math.round(v * 100)}%`} />
          </FieldRow>
        ) : null}
      </OptionsPanel>

      <div className="ws-actions">
        <button
          type="button"
          className="ws-button ws-button-primary"
          onClick={run}
          disabled={files.length === 0 || busy}
        >
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
