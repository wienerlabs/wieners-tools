"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, NumberInput } from "@/components/options-panel";
import { content } from "@/lib/content";
import { readFileAsImage } from "@/lib/tools/utils";

type Swatch = { hex: string; rgb: [number, number, number] };

function rgbToHex([r, g, b]: [number, number, number]) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

// k-means++ light: sample 4096 random pixels, run 8 iterations
function quantize(image: HTMLImageElement, k: number): Swatch[] {
  const targetW = 256;
  const ratio = targetW / image.naturalWidth;
  const targetH = Math.max(1, Math.round(image.naturalHeight * ratio));

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("ctx");
  ctx.drawImage(image, 0, 0, targetW, targetH);
  const data = ctx.getImageData(0, 0, targetW, targetH).data;

  const samples: [number, number, number][] = [];
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;
    samples.push([data[i], data[i + 1], data[i + 2]]);
  }
  if (samples.length === 0) return [];

  // k-means++ init
  const centroids: [number, number, number][] = [];
  centroids.push(samples[Math.floor(Math.random() * samples.length)]);
  while (centroids.length < k) {
    const dists = samples.map((p) => {
      let minD = Infinity;
      for (const c of centroids) {
        const d = (p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2 + (p[2] - c[2]) ** 2;
        if (d < minD) minD = d;
      }
      return minD;
    });
    const sum = dists.reduce((a, b) => a + b, 0);
    let r = Math.random() * sum;
    let pick = 0;
    for (let i = 0; i < dists.length; i += 1) {
      r -= dists[i];
      if (r <= 0) {
        pick = i;
        break;
      }
    }
    centroids.push(samples[pick]);
  }

  for (let iter = 0; iter < 8; iter += 1) {
    const sums: [number, number, number, number][] = centroids.map(() => [0, 0, 0, 0]);
    for (const p of samples) {
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < centroids.length; i += 1) {
        const c = centroids[i];
        const d = (p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2 + (p[2] - c[2]) ** 2;
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      const s = sums[bestIdx];
      s[0] += p[0];
      s[1] += p[1];
      s[2] += p[2];
      s[3] += 1;
    }
    for (let i = 0; i < centroids.length; i += 1) {
      const s = sums[i];
      if (s[3] > 0) {
        centroids[i] = [Math.round(s[0] / s[3]), Math.round(s[1] / s[3]), Math.round(s[2] / s[3])];
      }
    }
  }

  return centroids.map((rgb) => ({ rgb, hex: rgbToHex(rgb) }));
}

export default function PaletteExtractorTool({
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
  const [count, setCount] = useState(8);
  const [palette, setPalette] = useState<Swatch[]>([]);
  const [busy, setBusy] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setPalette([]);
    const file = files[0];
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    try {
      const image = await readFileAsImage(file);
      const result = quantize(image, count);
      result.sort((a, b) => {
        const la = a.rgb[0] + a.rgb[1] + a.rgb[2];
        const lb = b.rgb[0] + b.rgb[1] + b.rgb[2];
        return lb - la;
      });
      setPalette(result);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label={opt.count ?? "Color count"}>
          <NumberInput value={count} min={2} max={24} step={1} onChange={setCount} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={files.length === 0 || busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? ui.processing : ui.process}
        </button>
        {(files.length > 0 || palette.length > 0) && (
          <button type="button" className="ws-button ws-button-ghost" onClick={() => { setFiles([]); setPalette([]); setImgUrl(null); }}>
            {ui.reset}
          </button>
        )}
      </div>

      {palette.length > 0 ? (
        <section className="ws-palette">
          {imgUrl ? (
            <div className="ws-palette-source">
              <img src={imgUrl} alt="" />
            </div>
          ) : null}
          <div className="ws-palette-grid">
            {palette.map((s) => (
              <button
                key={s.hex}
                type="button"
                className="ws-palette-swatch"
                style={{ background: s.hex }}
                onClick={() => navigator.clipboard?.writeText(s.hex)}
                title="Copy"
              >
                <span>{s.hex}</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
