"use client";

import { useEffect, useRef, useState } from "react";
import { EyeOff, Loader2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { JobNotice } from "@/components/job-notice";
import { OptionsPanel, FieldRow, Select, Slider } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, inferOutputName, readFileAsImage } from "@/lib/tools/utils";
import { FACE_MODEL, loadVision, mergeBoxes, type Box } from "@/lib/vision";
import type { JobResult } from "@/lib/tools/use-file-job";

type Style = "blur" | "pixelate" | "solid";
type Shape = "ellipse" | "rectangle";
type Region = Box & { on: boolean; manual?: boolean };

async function detectFaces(image: HTMLImageElement) {
  const { vision, fileset } = await loadVision();
  const detector = await vision.FaceDetector.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: FACE_MODEL, delegate: "CPU" },
    runningMode: "IMAGE",
    minDetectionConfidence: 0.4
  });
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const found: Box[] = [];
  const collect = (source: HTMLImageElement | HTMLCanvasElement, ox: number, oy: number) => {
    for (const detection of detector.detect(source).detections) {
      const b = detection.boundingBox;
      if (!b) continue;
      found.push({ x: b.originX + ox, y: b.originY + oy, w: b.width, h: b.height, score: detection.categories[0]?.score ?? 0 });
    }
  };
  try {
    collect(image, 0, 0);
    const finestGrid = Math.min(8, Math.max(3, Math.ceil(Math.max(width, height) / 320)));
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    for (let grid = 2; grid <= finestGrid && ctx; grid++) {
      const tileW = Math.min(width, Math.ceil((width / grid) * 1.25));
      const tileH = Math.min(height, Math.ceil((height / grid) * 1.25));
      canvas.width = tileW;
      canvas.height = tileH;
      for (let gy = 0; gy < grid; gy++) {
        for (let gx = 0; gx < grid; gx++) {
          const ox = Math.min(width - tileW, Math.max(0, Math.round((gx * width) / grid - tileW * 0.1)));
          const oy = Math.min(height - tileH, Math.max(0, Math.round((gy * height) / grid - tileH * 0.1)));
          ctx.clearRect(0, 0, tileW, tileH);
          ctx.drawImage(image, ox, oy, tileW, tileH, 0, 0, tileW, tileH);
          collect(canvas, ox, oy);
        }
      }
    }
  } finally {
    detector.close();
  }
  return mergeBoxes(found);
}

function paintRegion(ctx: CanvasRenderingContext2D, image: HTMLImageElement, region: Box, style: Style, shape: Shape, strength: number) {
  const { x, y, w, h } = region;
  ctx.save();
  ctx.beginPath();
  if (shape === "ellipse") ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
  else ctx.rect(x, y, w, h);
  ctx.clip();
  if (style === "solid") {
    ctx.fillStyle = "#101828";
    ctx.fillRect(x, y, w, h);
  } else {
    const factor = style === "pixelate" ? Math.max(4, strength) : Math.max(6, strength * 1.5);
    const small = document.createElement("canvas");
    small.width = Math.max(1, Math.round(w / factor));
    small.height = Math.max(1, Math.round(h / factor));
    const sctx = small.getContext("2d");
    if (sctx) {
      sctx.imageSmoothingEnabled = style === "blur";
      sctx.drawImage(image, x, y, w, h, 0, 0, small.width, small.height);
      ctx.imageSmoothingEnabled = style === "blur";
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(small, 0, 0, small.width, small.height, x, y, w, h);
    }
  }
  ctx.restore();
}

export default function FaceAnonymizerTool({ locale, tool, i18n }: { locale: Locale; tool: ToolDefinition; i18n: ToolI18n }) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const [files, setFiles] = useState<File[]>([]);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);
  const [drawing, setDrawing] = useState<Box | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [style, setStyle] = useState<Style>("blur");
  const [shape, setShape] = useState<Shape>("ellipse");
  const [padding, setPadding] = useState(0.25);
  const [strength, setStrength] = useState(14);
  const [results, setResults] = useState<JobResult[]>([]);
  const [error, setError] = useState<unknown>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const urlRef = useRef<string | null>(null);

  const onFiles = (next: File[]) => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = next[0] ? URL.createObjectURL(next[0]) : null;
    setImageUrl(urlRef.current);
    setFiles(next);
    setImage(null);
    setRegions([]);
    setResults([]);
    setError(null);
  };

  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    []
  );

  useEffect(() => {
    const file = files[0];
    if (!file) return;
    let cancelled = false;
    readFileAsImage(file)
      .then(async (loaded) => {
        if (cancelled) return;
        setImage(loaded);
        setDetecting(true);
        const faces = await detectFaces(loaded);
        if (!cancelled) setRegions(faces.map((face) => ({ ...face, on: true })));
      })
      .catch((caught) => !cancelled && setError(caught))
      .finally(() => !cancelled && setDetecting(false));
    return () => {
      cancelled = true;
    };
  }, [files]);

  const toImage = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scale = (image?.naturalWidth ?? 1) / rect.width;
    return { x: (event.clientX - rect.left) * scale, y: (event.clientY - rect.top) * scale };
  };

  const onDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).dataset.region) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    start.current = toImage(event);
    setDrawing({ ...start.current, w: 0, h: 0, score: 1 });
  };

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const point = toImage(event);
    setDrawing({
      x: Math.min(start.current.x, point.x),
      y: Math.min(start.current.y, point.y),
      w: Math.abs(point.x - start.current.x),
      h: Math.abs(point.y - start.current.y),
      score: 1
    });
  };

  const onUp = () => {
    if (drawing && drawing.w > 8 && drawing.h > 8) setRegions((current) => [...current, { ...drawing, on: true, manual: true }]);
    start.current = null;
    setDrawing(null);
  };

  const apply = async () => {
    const file = files[0];
    if (!file || !image) return;
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(image, 0, 0);
    for (const region of regions.filter((r) => r.on)) {
      const grow = region.manual ? 0 : padding;
      const expanded = {
        ...region,
        x: Math.max(0, region.x - region.w * grow),
        y: Math.max(0, region.y - region.h * grow * 1.2),
        w: Math.min(canvas.width, region.w * (1 + grow * 2)),
        h: Math.min(canvas.height, region.h * (1 + grow * 2.4))
      };
      paintRegion(ctx, image, expanded, style, shape, strength);
    }
    const type = file.type === "image/jpeg" ? "image/jpeg" : "image/png";
    const blob = await canvasToBlob(canvas, type, type === "image/jpeg" ? 0.92 : undefined);
    setResults([{ blob, filename: inferOutputName(file.name, "-anonymized", type === "image/jpeg" ? "jpg" : "png"), meta: { width: canvas.width, height: canvas.height } }]);
  };

  const active = regions.filter((r) => r.on).length;
  const percent = (value: number, total: number) => `${(value / total) * 100}%`;

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} files={files} onChange={onFiles} />

      <OptionsPanel>
        <FieldRow label={opt.style ?? "Style"}>
          <Select<Style>
            value={style}
            options={[
              { value: "blur", label: opt.blur ?? "Blur" },
              { value: "pixelate", label: opt.pixelate ?? "Pixelate" },
              { value: "solid", label: opt.solid ?? "Solid fill" }
            ]}
            onChange={setStyle}
          />
        </FieldRow>
        <FieldRow label={opt.shape ?? "Shape"}>
          <Select<Shape>
            value={shape}
            options={[
              { value: "ellipse", label: opt.ellipse ?? "Oval" },
              { value: "rectangle", label: opt.rectangle ?? "Rectangle" }
            ]}
            onChange={setShape}
          />
        </FieldRow>
        <FieldRow label={opt.padding ?? "Extra margin"}>
          <Slider value={padding} min={0} max={0.6} step={0.05} onChange={setPadding} format={(v) => `${Math.round(v * 100)}%`} />
        </FieldRow>
        {style !== "solid" ? (
          <FieldRow label={opt.strength ?? "Strength"}>
            <Slider value={strength} min={6} max={40} onChange={setStrength} />
          </FieldRow>
        ) : null}
      </OptionsPanel>

      <p className="ws-notice">{ui.modelDownload.replace("{size}", "1 MB")}</p>

      {imageUrl && image ? (
        <>
          <p className="ws-field-hint">
            {detecting
              ? opt.detecting ?? "Looking for faces..."
              : (opt.found ?? "{count} faces selected. Click a box to skip it, drag on the photo to add one.").replace("{count}", String(active))}
          </p>
          <div className="ws-face-stage" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
            <img src={imageUrl} alt="" draggable={false} />
            {regions.map((region, index) => (
              <button
                key={index}
                type="button"
                data-region="true"
                className={`ws-face-box ${region.on ? "" : "is-off"}`}
                aria-pressed={region.on}
                onClick={() => setRegions((current) => current.map((r, i) => (i === index ? { ...r, on: !r.on } : r)))}
                style={{
                  left: percent(region.x, image.naturalWidth),
                  top: percent(region.y, image.naturalHeight),
                  width: percent(region.w, image.naturalWidth),
                  height: percent(region.h, image.naturalHeight)
                }}
              />
            ))}
            {drawing ? (
              <div
                className="ws-face-box is-drawing"
                style={{
                  left: percent(drawing.x, image.naturalWidth),
                  top: percent(drawing.y, image.naturalHeight),
                  width: percent(drawing.w, image.naturalWidth),
                  height: percent(drawing.h, image.naturalHeight)
                }}
              />
            ) : null}
          </div>
        </>
      ) : null}

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={apply} disabled={!image || detecting || active === 0}>
          {detecting ? <Loader2 className="ws-spin" size={16} /> : <EyeOff size={16} />}
          {detecting ? ui.processing : ui.process}
        </button>
      </div>

      <p className="ws-notice" data-tone="warn">
        {opt.check ?? "Check the result before sharing. Small, turned or covered faces can be missed; drag over them to add a box."}
      </p>

      <JobNotice locale={locale} error={error} />
      <ResultGrid locale={locale} results={results} />
    </>
  );
}
