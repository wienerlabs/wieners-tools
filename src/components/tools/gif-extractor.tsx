"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Select } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob } from "@/lib/tools/utils";

type Format = "image/png" | "image/jpeg";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function GifExtractorTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<Format>("image/png");
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const gifuct = (await import("gifuct-js")) as unknown as {
      parseGIF: (buf: ArrayBuffer) => unknown;
      decompressFrames: (gif: unknown, buildPatch: boolean) => Array<{
        dims: { width: number; height: number; left: number; top: number };
        patch: Uint8ClampedArray;
        delay: number;
      }>;
    };

    const file = files[0];
    const buffer = await file.arrayBuffer();
    const gif = gifuct.parseGIF(buffer);
    const frames = gifuct.decompressFrames(gif, true);

    const out: ResultEntry[] = [];
    const baseName = file.name.replace(/\.gif$/i, "");

    for (let i = 0; i < frames.length; i += 1) {
      const frame = frames[i];
      const canvas = document.createElement("canvas");
      canvas.width = frame.dims.width;
      canvas.height = frame.dims.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      const buffer = new Uint8ClampedArray(frame.patch);
      const data = new ImageData(buffer, frame.dims.width, frame.dims.height);
      ctx.putImageData(data, 0, 0);
      const blob = await canvasToBlob(canvas, format, format === "image/jpeg" ? 0.92 : undefined);
      const ext = format === "image/jpeg" ? "jpg" : "png";
      out.push({
        blob,
        filename: `${baseName}-frame-${String(i + 1).padStart(3, "0")}.${ext}`,
        meta: { width: canvas.width, height: canvas.height }
      });
    }

    setResults(out);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Output format">
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
