"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, NumberInput, Select } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob } from "@/lib/tools/utils";

type Format = "image/png" | "image/jpeg";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function PdfToImageTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [scale, setScale] = useState(2);
  const [format, setFormat] = useState<Format>("image/png");
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);
    setProgress(0);

    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();

    const file = files[0];
    const buffer = await file.arrayBuffer();
    const pdfDoc = await pdfjs.getDocument({ data: buffer }).promise;
    const pageCount = pdfDoc.numPages;
    const out: ResultEntry[] = [];

    for (let i = 1; i <= pageCount; i += 1) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      // pdfjs v5 expects { canvas, canvasContext, viewport }
      const renderTask = page.render({
        canvas,
        canvasContext: ctx,
        viewport
      } as Parameters<typeof page.render>[0]);
      await renderTask.promise;
      const blob = await canvasToBlob(canvas, format, format === "image/jpeg" ? 0.92 : undefined);
      const ext = format === "image/jpeg" ? "jpg" : "png";
      const baseName = file.name.replace(/\.pdf$/i, "");
      out.push({
        blob,
        filename: `${baseName}-page-${String(i).padStart(2, "0")}.${ext}`,
        meta: { width: canvas.width, height: canvas.height }
      });
      setProgress(Math.round((i / pageCount) * 100));
    }

    await pdfDoc.destroy();
    setResults(out);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Scale">
          <NumberInput value={scale} min={1} max={6} step={0.5} onChange={setScale} suffix="×" />
        </FieldRow>
        <FieldRow label="Format">
          <Select<Format>
            value={format}
            options={[
              { value: "image/png", label: "PNG" },
              { value: "image/jpeg", label: "JPEG" }
            ]}
            onChange={setFormat}
          />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={files.length === 0 || busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? `${ui.processing} ${progress}%` : ui.process}
        </button>
        {(files.length > 0 || results.length > 0) && (
          <button type="button" className="ws-button ws-button-ghost" onClick={() => { setFiles([]); setResults([]); }} disabled={busy}>
            {ui.reset}
          </button>
        )}
      </div>

      <ResultGrid locale={locale} results={results} />
    </>
  );
}
