"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, NumberInput } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, readFileAsImage } from "@/lib/tools/utils";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function ImageSplitterTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const file = files[0];
    const image = await readFileAsImage(file);
    const cellW = Math.floor(image.naturalWidth / cols);
    const cellH = Math.floor(image.naturalHeight / rows);
    const out: ResultEntry[] = [];

    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const canvas = document.createElement("canvas");
        canvas.width = cellW;
        canvas.height = cellH;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(image, c * cellW, r * cellH, cellW, cellH, 0, 0, cellW, cellH);
        const blob = await canvasToBlob(canvas, "image/png");
        out.push({
          blob,
          filename: `${file.name.replace(/\.[^.]+$/, "")}-r${r + 1}c${c + 1}.png`,
          meta: { width: cellW, height: cellH }
        });
      }
    }
    setResults(out);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Columns">
          <NumberInput value={cols} min={1} max={12} step={1} onChange={setCols} />
        </FieldRow>
        <FieldRow label="Rows">
          <NumberInput value={rows} min={1} max={12} step={1} onChange={setRows} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={files.length === 0 || busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? ui.processing : `${ui.process} (${cols * rows})`}
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
