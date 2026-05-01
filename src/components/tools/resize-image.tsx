"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, NumberInput, Select, Toggle } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { SOCIAL_PRESETS, canvasToBlob, imageToCanvas, inferOutputName, readFileAsImage } from "@/lib/tools/utils";

type Mode = "pixel" | "percent" | "preset";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function ResizeImageTool({
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
  const [mode, setMode] = useState<Mode>("pixel");
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(800);
  const [percent, setPercent] = useState(50);
  const [preset, setPreset] = useState<keyof typeof SOCIAL_PRESETS>("instagram-square");
  const [keepAspect, setKeepAspect] = useState(true);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const modeLabels = {
    pixel: opt.modePixel ?? "Pixel",
    percent: opt.modePercent ?? "Percent",
    preset: opt.modePreset ?? "Preset"
  } as const;

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const out: ResultEntry[] = [];
    for (const file of files) {
      const image = await readFileAsImage(file);
      const ow = image.naturalWidth;
      const oh = image.naturalHeight;
      let targetW = ow;
      let targetH = oh;

      if (mode === "pixel") {
        targetW = width;
        targetH = keepAspect ? Math.round((ow ? (width * oh) / ow : oh)) : height;
      } else if (mode === "percent") {
        targetW = Math.max(1, Math.round((ow * percent) / 100));
        targetH = Math.max(1, Math.round((oh * percent) / 100));
      } else {
        const p = SOCIAL_PRESETS[preset];
        targetW = p.width;
        targetH = p.height;
      }

      const { canvas } = imageToCanvas(image, targetW, targetH);
      const type = file.type && file.type.startsWith("image/") ? file.type : "image/png";
      const blob = await canvasToBlob(canvas, type, type === "image/png" ? undefined : 0.92);
      const ext = type.split("/")[1].replace("jpeg", "jpg");
      out.push({
        blob,
        filename: inferOutputName(file.name, `-${targetW}x${targetH}`, ext),
        meta: { width: targetW, height: targetH }
      });
    }
    setResults(out);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label={opt.mode ?? "Mode"}>
          <Select<Mode>
            value={mode}
            options={[
              { value: "pixel", label: modeLabels.pixel },
              { value: "percent", label: modeLabels.percent },
              { value: "preset", label: modeLabels.preset }
            ]}
            onChange={setMode}
          />
        </FieldRow>

        {mode === "pixel" ? (
          <>
            <FieldRow label={opt.width ?? "Width"}>
              <NumberInput value={width} min={1} max={16384} step={1} onChange={setWidth} suffix="px" />
            </FieldRow>
            <FieldRow label={opt.height ?? "Height"}>
              <NumberInput
                value={height}
                min={1}
                max={16384}
                step={1}
                onChange={setHeight}
                suffix="px"
              />
            </FieldRow>
            <FieldRow label="Aspect">
              <Toggle value={keepAspect} onChange={setKeepAspect} label={opt.keepAspect ?? "Keep aspect ratio"} />
            </FieldRow>
          </>
        ) : null}

        {mode === "percent" ? (
          <FieldRow label="%">
            <NumberInput value={percent} min={1} max={400} step={1} onChange={setPercent} suffix="%" />
          </FieldRow>
        ) : null}

        {mode === "preset" ? (
          <FieldRow label={opt.preset ?? "Preset"}>
            <Select
              value={preset}
              options={Object.entries(SOCIAL_PRESETS).map(([value, p]) => ({
                value: value as keyof typeof SOCIAL_PRESETS,
                label: p.label
              }))}
              onChange={(v) => setPreset(v as keyof typeof SOCIAL_PRESETS)}
            />
          </FieldRow>
        ) : null}
      </OptionsPanel>

      <div className="ws-actions">
        <button
          type="button"
          className="ws-button ws-button-primary"
          onClick={run}
          disabled={files.length === 0 || busy}
        >
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
