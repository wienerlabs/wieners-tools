"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { FAVICON_SIZES, canvasToBlob, readFileAsImage } from "@/lib/tools/utils";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function FaviconGeneratorTool({
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
  const [selectedSizes, setSelectedSizes] = useState<number[]>(FAVICON_SIZES);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const file = files[0];
    const image = await readFileAsImage(file);
    const out: ResultEntry[] = [];

    for (const size of selectedSizes) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("ctx");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      // contain-fit
      const ratio = Math.min(size / image.naturalWidth, size / image.naturalHeight);
      const w = image.naturalWidth * ratio;
      const h = image.naturalHeight * ratio;
      const x = (size - w) / 2;
      const y = (size - h) / 2;
      ctx.drawImage(image, x, y, w, h);
      const blob = await canvasToBlob(canvas, "image/png");
      out.push({
        blob,
        filename: `favicon-${size}.png`,
        meta: { width: size, height: size }
      });
    }
    setResults(out);
    setBusy(false);
  };

  const toggleSize = (size: number) => {
    setSelectedSizes((current) =>
      current.includes(size) ? current.filter((s) => s !== size) : [...current, size].sort((a, b) => a - b)
    );
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label={opt.sizes ?? "Sizes"}>
          <div className="ws-chip-row">
            {FAVICON_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSize(s)}
                className={`ws-chip ${selectedSizes.includes(s) ? "is-selected" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={files.length === 0 || busy || selectedSizes.length === 0}>
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
