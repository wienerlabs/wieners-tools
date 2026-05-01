"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Select, Slider } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { inferOutputName } from "@/lib/tools/utils";

type Format = "image/jpeg" | "image/png";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function HeicToJpgTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<Format>("image/jpeg");
  const [quality, setQuality] = useState(0.92);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);
    setProgress(0);

    const heic2any = (await import("heic2any")).default;

    const out: ResultEntry[] = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      try {
        const result = (await heic2any({
          blob: file,
          toType: format,
          quality: format === "image/jpeg" ? quality : undefined
        })) as Blob | Blob[];
        const blob = Array.isArray(result) ? result[0] : result;
        const ext = format === "image/jpeg" ? "jpg" : "png";
        out.push({ blob, filename: inferOutputName(file.name, "", ext) });
      } catch (error) {
        console.error("HEIC convert failed", error);
      }
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setResults(out);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Format">
          <Select<Format>
            value={format}
            options={[
              { value: "image/jpeg", label: "JPEG" },
              { value: "image/png", label: "PNG" }
            ]}
            onChange={setFormat}
          />
        </FieldRow>
        {format === "image/jpeg" ? (
          <FieldRow label="Quality">
            <Slider value={quality} min={0.3} max={1} step={0.01} onChange={setQuality} format={(v) => `${Math.round(v * 100)}%`} />
          </FieldRow>
        ) : null}
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
