"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Slider, NumberInput } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob } from "@/lib/tools/utils";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function CompressPdfTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.7);
  const [scale, setScale] = useState(1.5);
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

    const { PDFDocument } = await import("pdf-lib");
    const file = files[0];
    const buffer = await file.arrayBuffer();
    const sourceDoc = await pdfjs.getDocument({ data: buffer }).promise;
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
      await page.render({
        canvas,
        canvasContext: ctx,
        viewport
      } as Parameters<typeof page.render>[0]).promise;

      const jpegBlob = await canvasToBlob(canvas, "image/jpeg", quality);
      const jpegBuffer = await jpegBlob.arrayBuffer();
      const embedded = await outDoc.embedJpg(new Uint8Array(jpegBuffer));
      const newPage = outDoc.addPage([viewport.width, viewport.height]);
      newPage.drawImage(embedded, {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height
      });
      setProgress(Math.round((i / pageCount) * 100));
    }
    await sourceDoc.destroy();

    const bytes = await outDoc.save();
    const pdfBlob = new Blob([bytes as unknown as ArrayBuffer], { type: "application/pdf" });
    setResults([
      {
        blob: pdfBlob,
        filename: file.name.replace(/\.pdf$/i, "-compressed.pdf"),
        meta: { originalSize: buffer.byteLength, compressedSize: pdfBlob.size, pages: pageCount }
      }
    ]);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="JPEG quality" hint="Lower = smaller file, lossy.">
          <Slider value={quality} min={0.3} max={0.95} step={0.01} onChange={setQuality} format={(v) => `${Math.round(v * 100)}%`} />
        </FieldRow>
        <FieldRow label="Render scale" hint="Higher scale = sharper, larger.">
          <NumberInput value={scale} min={0.5} max={3} step={0.1} onChange={setScale} suffix="×" />
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
