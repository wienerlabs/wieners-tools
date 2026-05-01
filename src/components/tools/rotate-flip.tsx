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

type Rotation = "0" | "90" | "180" | "270";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function RotateFlipTool({
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
  const [rotation, setRotation] = useState<Rotation>("90");
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);
    const angle = (Number(rotation) * Math.PI) / 180;

    const out: ResultEntry[] = [];
    for (const file of files) {
      const image = await readFileAsImage(file);
      const w = image.naturalWidth;
      const h = image.naturalHeight;
      const swapped = rotation === "90" || rotation === "270";
      const canvas = document.createElement("canvas");
      canvas.width = swapped ? h : w;
      canvas.height = swapped ? w : h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("ctx");
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle);
      ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
      ctx.drawImage(image, -w / 2, -h / 2, w, h);

      const type = file.type && file.type.startsWith("image/") ? file.type : "image/png";
      const blob = await canvasToBlob(canvas, type, type === "image/png" ? undefined : 0.95);
      const ext = type.split("/")[1].replace("jpeg", "jpg");
      const suffix = `-rot${rotation}${flipX ? "-flipX" : ""}${flipY ? "-flipY" : ""}`;
      out.push({ blob, filename: inferOutputName(file.name, suffix, ext), meta: { width: canvas.width, height: canvas.height } });
    }
    setResults(out);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label={opt.rotation ?? "Angle"}>
          <Select<Rotation>
            value={rotation}
            options={[
              { value: "0", label: "0°" },
              { value: "90", label: "90°" },
              { value: "180", label: "180°" },
              { value: "270", label: "270°" }
            ]}
            onChange={setRotation}
          />
        </FieldRow>
        <FieldRow label="Flip">
          <Toggle value={flipX} onChange={setFlipX} label={opt.flipX ?? "Flip horizontal"} />
        </FieldRow>
        <FieldRow label=" ">
          <Toggle value={flipY} onChange={setFlipY} label={opt.flipY ?? "Flip vertical"} />
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
