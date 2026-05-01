"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Select, NumberInput } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, imageToCanvas, readFileAsImage } from "@/lib/tools/utils";

type PageSize = "fit" | "a4" | "letter" | "square";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

const PAGE_DIMENSIONS: Record<Exclude<PageSize, "fit">, { width: number; height: number }> = {
  a4: { width: 595, height: 842 },
  letter: { width: 612, height: 792 },
  square: { width: 720, height: 720 }
};

export default function ImageToPdfTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("fit");
  const [margin, setMargin] = useState(24);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.create();

    for (const file of files) {
      const image = await readFileAsImage(file);
      // re-encode as JPEG to keep PDF small + universal
      const { canvas } = imageToCanvas(image);
      const jpegBlob = await canvasToBlob(canvas, "image/jpeg", 0.9);
      const buffer = await jpegBlob.arrayBuffer();
      const embedded = await doc.embedJpg(new Uint8Array(buffer));

      let pageW: number;
      let pageH: number;
      if (pageSize === "fit") {
        pageW = embedded.width + margin * 2;
        pageH = embedded.height + margin * 2;
      } else {
        pageW = PAGE_DIMENSIONS[pageSize].width;
        pageH = PAGE_DIMENSIONS[pageSize].height;
      }

      const page = doc.addPage([pageW, pageH]);
      const usableW = pageW - margin * 2;
      const usableH = pageH - margin * 2;
      const imgRatio = embedded.width / embedded.height;
      const slotRatio = usableW / usableH;
      let drawW: number;
      let drawH: number;
      if (imgRatio > slotRatio) {
        drawW = usableW;
        drawH = usableW / imgRatio;
      } else {
        drawH = usableH;
        drawW = usableH * imgRatio;
      }
      page.drawImage(embedded, {
        x: (pageW - drawW) / 2,
        y: (pageH - drawH) / 2,
        width: drawW,
        height: drawH
      });
    }

    const bytes = await doc.save();
    const pdfBlob = new Blob([bytes as unknown as ArrayBuffer], { type: "application/pdf" });
    setResults([
      {
        blob: pdfBlob,
        filename: `${files.length === 1 ? files[0].name.replace(/\.[^.]+$/, "") : "images"}.pdf`,
        meta: { pages: files.length }
      }
    ]);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Page size">
          <Select<PageSize>
            value={pageSize}
            options={[
              { value: "fit", label: "Fit to image" },
              { value: "a4", label: "A4" },
              { value: "letter", label: "Letter" },
              { value: "square", label: "Square 720" }
            ]}
            onChange={setPageSize}
          />
        </FieldRow>
        <FieldRow label="Margin">
          <NumberInput value={margin} min={0} max={120} step={4} onChange={setMargin} suffix="pt" />
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
