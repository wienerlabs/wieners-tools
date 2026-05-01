"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, NumberInput } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { readFileAsImage } from "@/lib/tools/utils";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function GifMakerTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState(480);
  const [delay, setDelay] = useState(120);
  const [loops, setLoops] = useState(0);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  const run = async () => {
    if (files.length < 2) return;
    setBusy(true);
    setResults([]);
    setProgress(0);

    const { GIFEncoder, quantize, applyPalette } = await import("gifenc");
    const encoder = GIFEncoder();

    for (let i = 0; i < files.length; i += 1) {
      const image = await readFileAsImage(files[i]);
      const ratio = width / image.naturalWidth;
      const w = width;
      const h = Math.round(image.naturalHeight * ratio);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      ctx.drawImage(image, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;

      const palette = quantize(data, 256);
      const indexed = applyPalette(data, palette);
      encoder.writeFrame(indexed, w, h, { palette, delay, repeat: loops });
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    encoder.finish();
    const buffer = encoder.bytesView();
    const blob = new Blob([buffer.slice().buffer as ArrayBuffer], { type: "image/gif" });
    setResults([
      {
        blob,
        filename: "animation.gif",
        meta: { frames: files.length }
      }
    ]);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Width" hint="Frames are scaled to this width.">
          <NumberInput value={width} min={100} max={2048} step={20} onChange={setWidth} suffix="px" />
        </FieldRow>
        <FieldRow label="Delay">
          <NumberInput value={delay} min={20} max={2000} step={10} onChange={setDelay} suffix="ms" />
        </FieldRow>
        <FieldRow label="Loops" hint="0 = infinite">
          <NumberInput value={loops} min={0} max={50} step={1} onChange={setLoops} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={files.length < 2 || busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? `${ui.processing} ${progress}%` : `${ui.process} (${files.length})`}
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
