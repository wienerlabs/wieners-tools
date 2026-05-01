"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Slider, NumberInput, Select, Toggle } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { inferOutputName } from "@/lib/tools/utils";

type Format = "auto" | "image/jpeg" | "image/webp" | "image/png" | "image/avif";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

const FORMAT_OPTIONS = (loc: Locale, kept: string): { value: Format; label: string }[] => [
  { value: "auto", label: kept },
  { value: "image/jpeg", label: "JPEG" },
  { value: "image/webp", label: "WebP" },
  { value: "image/png", label: "PNG" },
  { value: "image/avif", label: "AVIF" }
];

export default function CompressImageTool({
  locale,
  tool,
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [targetSize, setTargetSize] = useState(1);
  const [maxWidth, setMaxWidth] = useState(2400);
  const [quality, setQuality] = useState(0.8);
  const [format, setFormat] = useState<Format>("auto");
  const [keepEXIF, setKeepEXIF] = useState(false);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  const opt = i18n.options ?? {};

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);
    setProgress(0);

    const out: ResultEntry[] = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const fileType = format === "auto" ? file.type || "image/jpeg" : format;
      const compressed = await imageCompression(file, {
        maxSizeMB: targetSize,
        maxWidthOrHeight: maxWidth,
        useWebWorker: true,
        fileType,
        initialQuality: quality,
        preserveExif: keepEXIF
      });
      const ext = fileType.split("/")[1].replace("jpeg", "jpg");
      out.push({
        blob: compressed,
        filename: inferOutputName(file.name, "-compressed", ext),
        meta: { originalSize: file.size, compressedSize: compressed.size }
      });
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setResults(out);
    setBusy(false);
  };

  const reset = () => {
    setFiles([]);
    setResults([]);
    setProgress(0);
  };

  return (
    <>
      <Dropzone
        locale={locale}
        accept={tool.accept}
        multiple={tool.multiple}
        files={files}
        onChange={setFiles}
        maxSizeMB={tool.maxSizeMB}
      />

      <OptionsPanel>
        <FieldRow label={opt.targetSize ?? "Target size (MB)"}>
          <Slider
            value={targetSize}
            min={0.05}
            max={20}
            step={0.05}
            onChange={setTargetSize}
            format={(v) => `${v.toFixed(2)} MB`}
          />
        </FieldRow>

        <FieldRow label={opt.maxWidth ?? "Max width (px)"}>
          <NumberInput value={maxWidth} min={64} max={8192} step={32} onChange={setMaxWidth} suffix="px" />
        </FieldRow>

        <FieldRow label={opt.quality ?? "Quality"}>
          <Slider value={quality} min={0.1} max={1} step={0.01} onChange={setQuality} format={(v) => `${Math.round(v * 100)}%`} />
        </FieldRow>

        <FieldRow label={opt.format ?? "Format"}>
          <Select value={format} options={FORMAT_OPTIONS(locale, opt.keepOriginalFormat ?? "Original")} onChange={setFormat} />
        </FieldRow>

        <FieldRow label="EXIF">
          <Toggle value={keepEXIF} onChange={setKeepEXIF} label={opt.keepEXIF ?? "Keep EXIF"} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button
          type="button"
          className="ws-button ws-button-primary"
          onClick={run}
          disabled={files.length === 0 || busy}
        >
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? `${ui.processing} ${progress}%` : ui.process}
        </button>
        {(files.length > 0 || results.length > 0) && (
          <button type="button" className="ws-button ws-button-ghost" onClick={reset} disabled={busy}>
            {ui.reset}
          </button>
        )}
      </div>

      <ResultGrid locale={locale} results={results} />
    </>
  );
}
