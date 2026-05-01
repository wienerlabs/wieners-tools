"use client";

import { useEffect, useState } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Select } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, inferOutputName, readFileAsImage } from "@/lib/tools/utils";

type AspectKey = "free" | "1:1" | "4:3" | "16:9" | "9:16" | "3:2";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

const ASPECT_MAP: Record<AspectKey, number | undefined> = {
  free: undefined,
  "1:1": 1,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
  "9:16": 9 / 16,
  "3:2": 3 / 2
};

export default function CropImageTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [aspectKey, setAspectKey] = useState<AspectKey>("free");
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImgUrl(url);
      setCrop({ unit: "%", x: 10, y: 10, width: 80, height: 60 });
      return () => URL.revokeObjectURL(url);
    }
    setImgUrl(null);
  }, [files]);

  const run = async () => {
    if (files.length === 0 || !crop) return;
    setBusy(true);
    setResults([]);

    const file = files[0];
    const image = await readFileAsImage(file);
    const pc: PixelCrop =
      crop.unit === "%"
        ? {
            unit: "px",
            x: (crop.x / 100) * image.naturalWidth,
            y: (crop.y / 100) * image.naturalHeight,
            width: (crop.width / 100) * image.naturalWidth,
            height: (crop.height / 100) * image.naturalHeight
          }
        : (crop as PixelCrop);

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(pc.width);
    canvas.height = Math.round(pc.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(
      image,
      Math.round(pc.x),
      Math.round(pc.y),
      Math.round(pc.width),
      Math.round(pc.height),
      0,
      0,
      Math.round(pc.width),
      Math.round(pc.height)
    );

    const type = file.type && file.type.startsWith("image/") ? file.type : "image/png";
    const blob = await canvasToBlob(canvas, type, type === "image/png" ? undefined : 0.95);
    const ext = type.split("/")[1].replace("jpeg", "jpg");
    setResults([
      {
        blob,
        filename: inferOutputName(file.name, "-cropped", ext),
        meta: { width: canvas.width, height: canvas.height }
      }
    ]);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Aspect ratio">
          <Select<AspectKey>
            value={aspectKey}
            options={[
              { value: "free", label: "Free" },
              { value: "1:1", label: "1 : 1" },
              { value: "4:3", label: "4 : 3" },
              { value: "16:9", label: "16 : 9" },
              { value: "9:16", label: "9 : 16" },
              { value: "3:2", label: "3 : 2" }
            ]}
            onChange={setAspectKey}
          />
        </FieldRow>
      </OptionsPanel>

      {imgUrl ? (
        <div className="ws-crop-stage">
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={ASPECT_MAP[aspectKey]}>
            <img src={imgUrl} alt="" style={{ maxWidth: "100%", display: "block" }} />
          </ReactCrop>
        </div>
      ) : null}

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
