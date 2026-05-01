"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Select } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, inferOutputName, readFileAsImage } from "@/lib/tools/utils";

type Preset = "none" | "grayscale" | "sepia" | "vintage" | "cold" | "warm" | "invert";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

const FILTERS: Record<Preset, string> = {
  none: "none",
  grayscale: "grayscale(100%)",
  sepia: "sepia(100%)",
  vintage: "sepia(60%) contrast(120%) saturate(80%) brightness(95%)",
  cold: "saturate(85%) hue-rotate(180deg) brightness(105%)",
  warm: "saturate(120%) hue-rotate(-12deg) brightness(105%)",
  invert: "invert(100%)"
};

export default function ApplyFilterTool({
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
  const [preset, setPreset] = useState<Preset>("vintage");
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const presetOptions: Array<{ value: Preset; label: string }> = [
    { value: "none", label: opt.presetNone ?? "None" },
    { value: "grayscale", label: opt.presetGrayscale ?? "Grayscale" },
    { value: "sepia", label: opt.presetSepia ?? "Sepia" },
    { value: "vintage", label: opt.presetVintage ?? "Vintage" },
    { value: "cold", label: opt.presetCold ?? "Cold" },
    { value: "warm", label: opt.presetWarm ?? "Warm" },
    { value: "invert", label: opt.presetInvert ?? "Invert" }
  ];

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
      if (!ctx) throw new Error("ctx");
      ctx.filter = FILTERS[preset];
      ctx.drawImage(image, 0, 0);

      const type = file.type && file.type.startsWith("image/") ? file.type : "image/png";
      const blob = await canvasToBlob(canvas, type, type === "image/png" ? undefined : 0.95);
      const ext = type.split("/")[1].replace("jpeg", "jpg");
      out.push({
        blob,
        filename: inferOutputName(file.name, `-${preset}`, ext),
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
        <FieldRow label={opt.preset ?? "Filter"}>
          <Select<Preset> value={preset} options={presetOptions} onChange={setPreset} />
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
