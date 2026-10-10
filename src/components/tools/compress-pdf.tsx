"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { JobNotice } from "@/components/job-notice";
import { OptionsPanel, FieldRow, Slider, NumberInput, Select } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { pdfBlob } from "@/lib/pdf-tools";
import { openPdfJs } from "@/lib/pdf-preview";
import { runQpdf } from "@/lib/qpdf";
import { bytes as formatBytes, canvasToBlob } from "@/lib/tools/utils";
import type { JobResult } from "@/lib/tools/use-file-job";

type Mode = "lossless" | "raster";

async function rasterize(input: Uint8Array, quality: number, scale: number, onProgress: (percent: number) => void) {
  const { PDFDocument } = await import("pdf-lib");
  const sourceDoc = await openPdfJs(input.slice().buffer as ArrayBuffer);
  const pageCount = sourceDoc.numPages;
  const outDoc = await PDFDocument.create();

  for (let i = 1; i <= pageCount; i += 1) {
    const page = await sourceDoc.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) continue;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvas, canvasContext: ctx, viewport } as Parameters<typeof page.render>[0]).promise;

    const jpeg = await canvasToBlob(canvas, "image/jpeg", quality);
    const embedded = await outDoc.embedJpg(new Uint8Array(await jpeg.arrayBuffer()));
    const newPage = outDoc.addPage([viewport.width / scale, viewport.height / scale]);
    newPage.drawImage(embedded, { x: 0, y: 0, width: viewport.width / scale, height: viewport.height / scale });
    onProgress(Math.round((i / pageCount) * 100));
  }
  await sourceDoc.destroy();
  return outDoc.save();
}

export default function CompressPdfTool({ locale, tool, i18n }: { locale: Locale; tool: ToolDefinition; i18n: ToolI18n }) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<Mode>("lossless");
  const [quality, setQuality] = useState(0.7);
  const [scale, setScale] = useState(1.5);
  const [results, setResults] = useState<JobResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<unknown>(null);
  const [sizes, setSizes] = useState<{ before: number; after: number; mode: Mode } | null>(null);

  const reset = (next: File[]) => {
    setFiles(next);
    setResults([]);
    setError(null);
    setSizes(null);
  };

  const run = async () => {
    const file = files[0];
    if (!file) return;
    setBusy(true);
    setResults([]);
    setProgress(0);
    setError(null);
    setSizes(null);
    try {
      const input = new Uint8Array(await file.arrayBuffer());
      const output =
        mode === "lossless"
          ? (await runQpdf(input, (inPath, outPath) => ["--object-streams=generate", "--compress-streams=y", "--recompress-flate", "--compression-level=9", inPath, outPath])).bytes
          : await rasterize(input, quality, scale, setProgress);
      const blob = pdfBlob(output);
      setResults([{ blob, filename: file.name.replace(/\.pdf$/i, "") + "-compressed.pdf" }]);
      setSizes({ before: file.size, after: blob.size, mode });
    } catch (caught) {
      setError(caught);
    } finally {
      setBusy(false);
    }
  };

  const saved = sizes ? Math.round((1 - sizes.after / sizes.before) * 100) : 0;

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} files={files} onChange={reset} />

      <OptionsPanel>
        <FieldRow label={opt.mode ?? "Method"}>
          <Select<Mode>
            value={mode}
            options={[
              { value: "lossless", label: opt.lossless ?? "Lossless, text stays selectable" },
              { value: "raster", label: opt.raster ?? "Strong, pages become images" }
            ]}
            onChange={setMode}
          />
        </FieldRow>
        {mode === "raster" ? (
          <>
            <FieldRow label={opt.quality ?? "JPEG quality"}>
              <Slider value={quality} min={0.3} max={0.95} step={0.01} onChange={setQuality} format={(v) => `${Math.round(v * 100)}%`} />
            </FieldRow>
            <FieldRow label={opt.scale ?? "Sharpness"}>
              <NumberInput value={scale} min={0.5} max={3} step={0.1} onChange={setScale} suffix="×" />
            </FieldRow>
          </>
        ) : null}
      </OptionsPanel>

      {mode === "raster" ? (
        <p className="ws-notice" data-tone="warn">
          {opt.rasterWarning ?? "Strong mode turns every page into a picture: text can no longer be selected, searched or copied."}
        </p>
      ) : null}

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={files.length === 0 || busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? `${ui.processing}${mode === "raster" ? ` ${progress}%` : ""}` : ui.process}
        </button>
      </div>

      {sizes ? (
        <p className="ws-notice" data-tone={saved > 0 ? undefined : "warn"}>
          {saved > 0
            ? (opt.saved ?? "{before} to {after}, {percent}% smaller.")
                .replace("{before}", formatBytes(sizes.before))
                .replace("{after}", formatBytes(sizes.after))
                .replace("{percent}", String(saved))
            : sizes.mode === "raster"
              ? opt.rasterNoGain ?? "Strong mode made this file bigger. Keep the original, or lower the quality and sharpness."
              : opt.noGain ?? "This file is already well optimized. Strong mode can shrink it further at the cost of selectable text."}
        </p>
      ) : null}

      <JobNotice locale={locale} error={error} />
      <ResultGrid locale={locale} results={results} />
    </>
  );
}
