"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Select, NumberInput, ColorInput } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, readFileAsImage } from "@/lib/tools/utils";

type Layout = "grid-2" | "grid-3" | "grid-4" | "row" | "column";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function CollageMakerTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [layout, setLayout] = useState<Layout>("grid-2");
  const [tileSize, setTileSize] = useState(800);
  const [gap, setGap] = useState(8);
  const [bg, setBg] = useState("#ffffff");
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const computeGrid = (count: number): { cols: number; rows: number } => {
    if (layout === "row") return { cols: count, rows: 1 };
    if (layout === "column") return { cols: 1, rows: count };
    if (layout === "grid-2") {
      const cols = 2;
      return { cols, rows: Math.ceil(count / cols) };
    }
    if (layout === "grid-3") {
      const cols = 3;
      return { cols, rows: Math.ceil(count / cols) };
    }
    const cols = 4;
    return { cols, rows: Math.ceil(count / cols) };
  };

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const { cols, rows } = computeGrid(files.length);
    const tileW = tileSize;
    const tileH = tileSize;
    const totalW = cols * tileW + gap * (cols + 1);
    const totalH = rows * tileH + gap * (rows + 1);
    const canvas = document.createElement("canvas");
    canvas.width = totalW;
    canvas.height = totalH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, totalW, totalH);

    for (let i = 0; i < files.length; i += 1) {
      const image = await readFileAsImage(files[i]);
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = gap + col * (tileW + gap);
      const cy = gap + row * (tileH + gap);
      const ratio = Math.min(tileW / image.naturalWidth, tileH / image.naturalHeight);
      const drawW = image.naturalWidth * ratio;
      const drawH = image.naturalHeight * ratio;
      ctx.drawImage(image, cx + (tileW - drawW) / 2, cy + (tileH - drawH) / 2, drawW, drawH);
    }

    const blob = await canvasToBlob(canvas, "image/png");
    setResults([
      {
        blob,
        filename: `collage-${cols}x${rows}.png`,
        meta: { width: totalW, height: totalH }
      }
    ]);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Layout">
          <Select<Layout>
            value={layout}
            options={[
              { value: "grid-2", label: "Grid 2 cols" },
              { value: "grid-3", label: "Grid 3 cols" },
              { value: "grid-4", label: "Grid 4 cols" },
              { value: "row", label: "Single row" },
              { value: "column", label: "Single column" }
            ]}
            onChange={setLayout}
          />
        </FieldRow>
        <FieldRow label="Tile size">
          <NumberInput value={tileSize} min={100} max={3000} step={50} onChange={setTileSize} suffix="px" />
        </FieldRow>
        <FieldRow label="Gap">
          <NumberInput value={gap} min={0} max={120} step={2} onChange={setGap} suffix="px" />
        </FieldRow>
        <FieldRow label="Background">
          <ColorInput value={bg} onChange={setBg} />
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
