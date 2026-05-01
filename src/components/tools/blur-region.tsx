"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Slider, Select } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, inferOutputName, readFileAsImage } from "@/lib/tools/utils";

type Mode = "blur" | "pixelate";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

type Region = { x: number; y: number; w: number; h: number };

export default function BlurRegionTool({
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
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
  const [regions, setRegions] = useState<Region[]>([]);
  const [drawing, setDrawing] = useState<Region | null>(null);
  const [mode, setMode] = useState<Mode>("blur");
  const [strength, setStrength] = useState(20);
  const [pixelSize, setPixelSize] = useState(16);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImgUrl(url);
      setRegions([]);
      const probe = new Image();
      probe.onload = () => setNaturalSize({ w: probe.naturalWidth, h: probe.naturalHeight });
      probe.src = url;
      return () => URL.revokeObjectURL(url);
    }
    setImgUrl(null);
  }, [files]);

  const onDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setDrawing({ x, y, w: 0, h: 0 });
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drawing || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setDrawing({
      x: Math.min(drawing.x, x),
      y: Math.min(drawing.y, y),
      w: Math.abs(x - drawing.x),
      h: Math.abs(y - drawing.y)
    });
  };

  const onUp = () => {
    if (drawing && drawing.w > 1 && drawing.h > 1) {
      setRegions([...regions, drawing]);
    }
    setDrawing(null);
  };

  const clearRegions = () => setRegions([]);

  const run = async () => {
    if (files.length === 0 || regions.length === 0) return;
    setBusy(true);
    setResults([]);

    const file = files[0];
    const image = await readFileAsImage(file);
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(image, 0, 0);

    for (const r of regions) {
      const x = (r.x / 100) * image.naturalWidth;
      const y = (r.y / 100) * image.naturalHeight;
      const w = (r.w / 100) * image.naturalWidth;
      const h = (r.h / 100) * image.naturalHeight;
      if (mode === "blur") {
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();
        ctx.filter = `blur(${strength}px)`;
        ctx.drawImage(image, 0, 0);
        ctx.restore();
        ctx.filter = "none";
      } else {
        const scale = Math.max(1, Math.round(pixelSize));
        const tmp = document.createElement("canvas");
        tmp.width = Math.max(1, Math.round(w / scale));
        tmp.height = Math.max(1, Math.round(h / scale));
        const tctx = tmp.getContext("2d");
        if (!tctx) continue;
        tctx.imageSmoothingEnabled = false;
        tctx.drawImage(canvas, x, y, w, h, 0, 0, tmp.width, tmp.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, x, y, w, h);
        ctx.imageSmoothingEnabled = true;
      }
    }

    const type = file.type && file.type.startsWith("image/") ? file.type : "image/png";
    const blob = await canvasToBlob(canvas, type, type === "image/png" ? undefined : 0.95);
    const ext = type.split("/")[1].replace("jpeg", "jpg");
    setResults([
      {
        blob,
        filename: inferOutputName(file.name, `-${mode}`, ext),
        meta: { width: canvas.width, height: canvas.height }
      }
    ]);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Mode">
          <Select<Mode>
            value={mode}
            options={[
              { value: "blur", label: "Blur" },
              { value: "pixelate", label: "Pixelate" }
            ]}
            onChange={setMode}
          />
        </FieldRow>
        {mode === "blur" ? (
          <FieldRow label="Strength">
            <Slider value={strength} min={2} max={80} step={1} onChange={setStrength} format={(v) => `${v}px`} />
          </FieldRow>
        ) : (
          <FieldRow label="Pixel size">
            <Slider value={pixelSize} min={4} max={64} step={1} onChange={setPixelSize} format={(v) => `${v}px`} />
          </FieldRow>
        )}
      </OptionsPanel>

      {imgUrl ? (
        <div
          ref={stageRef}
          className="ws-blur-stage"
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
        >
          <img src={imgUrl} alt="" draggable={false} />
          {regions.map((r, i) => (
            <div
              key={i}
              className="ws-blur-region"
              style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
            />
          ))}
          {drawing ? (
            <div
              className="ws-blur-region is-active"
              style={{ left: `${drawing.x}%`, top: `${drawing.y}%`, width: `${drawing.w}%`, height: `${drawing.h}%` }}
            />
          ) : null}
        </div>
      ) : null}

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={files.length === 0 || regions.length === 0 || busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? ui.processing : `${ui.process} (${regions.length})`}
        </button>
        {regions.length > 0 ? (
          <button type="button" className="ws-button ws-button-ghost" onClick={clearRegions}>
            Clear regions
          </button>
        ) : null}
        {(files.length > 0 || results.length > 0) && (
          <button type="button" className="ws-button ws-button-ghost" onClick={() => { setFiles([]); setResults([]); setRegions([]); }}>
            {ui.reset}
          </button>
        )}
      </div>

      <p className="ws-field-hint" style={{ display: naturalSize.w ? "block" : "none" }}>
        {locale === "tr" ? "Görselin üzerine sürükleyerek bölge seçin." : locale === "de" ? "Ziehen Sie über das Bild, um Bereiche zu markieren." : locale === "ar" ? "اسحب على الصورة لاختيار مناطق." : "Drag on the image to mark regions."}
      </p>

      <ResultGrid locale={locale} results={results} />
    </>
  );
}
