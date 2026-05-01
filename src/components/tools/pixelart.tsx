"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, NumberInput, Select } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, inferOutputName, readFileAsImage } from "@/lib/tools/utils";

type Palette = "full" | "p16" | "p8" | "p4" | "gameboy";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

const GAMEBOY = [
  [15, 56, 15],
  [48, 98, 48],
  [139, 172, 15],
  [155, 188, 15]
];

const PIXEL16 = [
  [0, 0, 0],
  [29, 43, 83],
  [126, 37, 83],
  [0, 135, 81],
  [171, 82, 54],
  [95, 87, 79],
  [194, 195, 199],
  [255, 241, 232],
  [255, 0, 77],
  [255, 163, 0],
  [255, 236, 39],
  [0, 228, 54],
  [41, 173, 255],
  [131, 118, 156],
  [255, 119, 168],
  [255, 204, 170]
];

const PIXEL8 = PIXEL16.slice(0, 8);
const PIXEL4 = [
  [15, 15, 15],
  [85, 85, 85],
  [170, 170, 170],
  [240, 240, 240]
];

function paletteOf(p: Palette): number[][] | null {
  if (p === "full") return null;
  if (p === "p16") return PIXEL16;
  if (p === "p8") return PIXEL8;
  if (p === "p4") return PIXEL4;
  return GAMEBOY;
}

function nearest(rgb: [number, number, number], palette: number[][]): [number, number, number] {
  let best = palette[0];
  let bestDist = Infinity;
  for (const c of palette) {
    const dr = rgb[0] - c[0];
    const dg = rgb[1] - c[1];
    const db = rgb[2] - c[2];
    const d = dr * dr + dg * dg + db * db;
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  return [best[0], best[1], best[2]];
}

export default function PixelartTool({
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
  const [pixelSize, setPixelSize] = useState(8);
  const [palette, setPalette] = useState<Palette>("p16");
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const paletteOptions: Array<{ value: Palette; label: string }> = [
    { value: "full", label: opt.paletteFull ?? "Full" },
    { value: "p16", label: opt.palette16 ?? "16" },
    { value: "p8", label: opt.palette8 ?? "8" },
    { value: "p4", label: opt.palette4 ?? "4" },
    { value: "gameboy", label: opt.paletteGameboy ?? "Gameboy" }
  ];

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const out: ResultEntry[] = [];
    for (const file of files) {
      const image = await readFileAsImage(file);
      const w = image.naturalWidth;
      const h = image.naturalHeight;
      const downW = Math.max(1, Math.floor(w / pixelSize));
      const downH = Math.max(1, Math.floor(h / pixelSize));

      // Step 1: shrink with bilinear
      const small = document.createElement("canvas");
      small.width = downW;
      small.height = downH;
      const sctx = small.getContext("2d");
      if (!sctx) throw new Error("ctx");
      sctx.imageSmoothingEnabled = true;
      sctx.imageSmoothingQuality = "medium";
      sctx.drawImage(image, 0, 0, downW, downH);

      // Step 2: palette quantize if needed
      const pal = paletteOf(palette);
      if (pal) {
        const data = sctx.getImageData(0, 0, downW, downH);
        for (let i = 0; i < data.data.length; i += 4) {
          const [r, g, b] = nearest([data.data[i], data.data[i + 1], data.data[i + 2]], pal);
          data.data[i] = r;
          data.data[i + 1] = g;
          data.data[i + 2] = b;
        }
        sctx.putImageData(data, 0, 0);
      }

      // Step 3: scale back nearest-neighbor
      const big = document.createElement("canvas");
      big.width = downW * pixelSize;
      big.height = downH * pixelSize;
      const bctx = big.getContext("2d");
      if (!bctx) throw new Error("ctx");
      bctx.imageSmoothingEnabled = false;
      bctx.drawImage(small, 0, 0, big.width, big.height);

      const blob = await canvasToBlob(big, "image/png");
      out.push({
        blob,
        filename: inferOutputName(file.name, `-pixel${pixelSize}-${palette}`, "png"),
        meta: { width: big.width, height: big.height }
      });
    }
    setResults(out);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label={opt.pixelSize ?? "Pixel size"}>
          <NumberInput value={pixelSize} min={2} max={64} step={1} onChange={setPixelSize} suffix="px" />
        </FieldRow>
        <FieldRow label={opt.palette ?? "Palette"}>
          <Select<Palette> value={palette} options={paletteOptions} onChange={setPalette} />
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
