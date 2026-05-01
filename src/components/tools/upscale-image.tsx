"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Select, Toggle } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, inferOutputName, readFileAsImage } from "@/lib/tools/utils";

type Scale = "2" | "3" | "4";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function UpscaleImageTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [scale, setScale] = useState<Scale>("2");
  const [sharpen, setSharpen] = useState(true);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  const modelHint =
    locale === "tr"
      ? "Yüksek kaliteli Lanczos yeniden örnekleme + opsiyonel detay keskinleştirme."
      : locale === "de"
        ? "Hochwertiges Lanczos-Resampling + optionales Detail-Sharpening."
        : locale === "ar"
          ? "إعادة عينة Lanczos عالية الجودة مع شحذ تفاصيل اختياري."
          : "High-quality Lanczos resampling + optional detail sharpening.";

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);
    setProgress(0);

    const picaModule = await import("pica");
    const pica = picaModule.default();
    const factor = Number(scale);

    const out: ResultEntry[] = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const image = await readFileAsImage(file);
      const sourceCanvas = document.createElement("canvas");
      sourceCanvas.width = image.naturalWidth;
      sourceCanvas.height = image.naturalHeight;
      const sctx = sourceCanvas.getContext("2d");
      if (!sctx) continue;
      sctx.drawImage(image, 0, 0);

      const targetCanvas = document.createElement("canvas");
      targetCanvas.width = image.naturalWidth * factor;
      targetCanvas.height = image.naturalHeight * factor;

      await pica.resize(sourceCanvas, targetCanvas, {
        quality: 3,
        unsharpAmount: sharpen ? 80 : 0,
        unsharpRadius: 0.6,
        unsharpThreshold: 2
      });

      const type = file.type && file.type.startsWith("image/") ? file.type : "image/png";
      const blob = await canvasToBlob(targetCanvas, type, type === "image/png" ? undefined : 0.95);
      const ext = type.split("/")[1].replace("jpeg", "jpg");
      out.push({
        blob,
        filename: inferOutputName(file.name, `-${factor}x`, ext),
        meta: { width: targetCanvas.width, height: targetCanvas.height }
      });
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setResults(out);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <p className="ws-tool-privacy" style={{ background: "rgba(200, 162, 71, 0.1)", color: "var(--copper)" }}>
        {modelHint}
      </p>

      <OptionsPanel>
        <FieldRow label="Scale">
          <Select<Scale>
            value={scale}
            options={[
              { value: "2", label: "2× (recommended)" },
              { value: "3", label: "3×" },
              { value: "4", label: "4×" }
            ]}
            onChange={setScale}
          />
        </FieldRow>
        <FieldRow label="Sharpen">
          <Toggle value={sharpen} onChange={setSharpen} label="Detail sharpen" />
        </FieldRow>
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
