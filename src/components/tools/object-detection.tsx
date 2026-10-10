"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { JobNotice } from "@/components/job-notice";
import { OptionsPanel, FieldRow, Slider } from "@/components/options-panel";
import { content } from "@/lib/content";
import { canvasToBlob, downloadBlob, inferOutputName, readFileAsImage } from "@/lib/tools/utils";
import { OBJECT_MODEL, loadVision, type Box } from "@/lib/vision";

const COLORS = ["#2563eb", "#dc2626", "#16a34a", "#d97706", "#7c3aed", "#0891b2", "#db2777", "#4b5563"];

function colorFor(label: string) {
  let hash = 0;
  for (const char of label) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return COLORS[Math.abs(hash) % COLORS.length];
}

async function detectObjects(image: HTMLImageElement) {
  const { vision, fileset } = await loadVision();
  const detector = await vision.ObjectDetector.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: OBJECT_MODEL, delegate: "CPU" },
    runningMode: "IMAGE",
    scoreThreshold: 0.15,
    maxResults: 100
  });
  try {
    return detector.detect(image).detections.flatMap((detection): Box[] => {
      const b = detection.boundingBox;
      const top = detection.categories[0];
      if (!b || !top) return [];
      return [{ x: b.originX, y: b.originY, w: b.width, h: b.height, score: top.score, label: top.categoryName || top.displayName || "object" }];
    });
  } finally {
    detector.close();
  }
}

function annotate(image: HTMLImageElement, boxes: Box[]) {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.drawImage(image, 0, 0);
  const line = Math.max(2, Math.round(canvas.width / 400));
  const font = Math.max(12, Math.round(canvas.width / 60));
  ctx.font = `500 ${font}px Sora, sans-serif`;
  for (const box of boxes) {
    const color = colorFor(box.label ?? "");
    const text = `${box.label} ${Math.round(box.score * 100)}%`;
    ctx.strokeStyle = color;
    ctx.lineWidth = line;
    ctx.strokeRect(box.x, box.y, box.w, box.h);
    const tw = ctx.measureText(text).width + font * 0.6;
    const ty = Math.max(0, box.y - font * 1.4);
    ctx.fillStyle = color;
    ctx.fillRect(box.x, ty, tw, font * 1.4);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, box.x + font * 0.3, ty + font * 1.05);
  }
  return canvas;
}

export default function ObjectDetectionTool({ locale, tool, i18n }: { locale: Locale; tool: ToolDefinition; i18n: ToolI18n }) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const [files, setFiles] = useState<File[]>([]);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [all, setAll] = useState<Box[]>([]);
  const [threshold, setThreshold] = useState(0.4);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onFiles = (next: File[]) => {
    setFiles(next);
    setImage(null);
    setAll([]);
    setPreview(null);
    setError(null);
  };

  useEffect(() => {
    const file = files[0];
    if (!file) return;
    let cancelled = false;
    readFileAsImage(file)
      .then(async (loaded) => {
        if (cancelled) return;
        setBusy(true);
        const boxes = await detectObjects(loaded);
        if (cancelled) return;
        setImage(loaded);
        setAll(boxes);
      })
      .catch((caught) => !cancelled && setError(caught))
      .finally(() => !cancelled && setBusy(false));
    return () => {
      cancelled = true;
    };
  }, [files]);

  const shown = useMemo(() => all.filter((box) => box.score >= threshold), [all, threshold]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const box of shown) map.set(box.label ?? "", (map.get(box.label ?? "") ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [shown]);

  useEffect(() => {
    if (!image) return;
    let cancelled = false;
    canvasToBlob(annotate(image, shown), "image/png").then((blob) => {
      if (cancelled) return;
      setPreview((previous) => {
        if (previous) URL.revokeObjectURL(previous);
        return URL.createObjectURL(blob);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [image, shown]);

  const saveImage = async () => {
    if (!image || !files[0]) return;
    downloadBlob(await canvasToBlob(annotate(image, shown), "image/png"), inferOutputName(files[0].name, "-detected", "png"));
  };

  const saveJson = () => {
    if (!files[0]) return;
    const data = shown.map((box) => ({ label: box.label, score: Number(box.score.toFixed(3)), x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.w), height: Math.round(box.h) }));
    downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }), inferOutputName(files[0].name, "-detections", "json"));
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} files={files} onChange={onFiles} />

      <OptionsPanel>
        <FieldRow label={opt.threshold ?? "Minimum confidence"}>
          <Slider value={threshold} min={0.15} max={0.9} step={0.05} onChange={setThreshold} format={(v) => `${Math.round(v * 100)}%`} />
        </FieldRow>
      </OptionsPanel>

      <p className="ws-notice">{ui.modelDownload.replace("{size}", "7 MB")}</p>

      {busy ? (
        <p className="ws-field-hint">
          <Loader2 className="ws-spin" size={14} /> {opt.detecting ?? "Looking for objects..."}
        </p>
      ) : null}

      {preview ? (
        <>
          <div className="ws-detect-stage">
            <img src={preview} alt="" />
          </div>
          <ul className="ws-detect-list">
            {counts.length === 0 ? <li>{opt.none ?? "Nothing found above this confidence."}</li> : null}
            {counts.map(([label, count]) => (
              <li key={label}>
                <span className="ws-detect-dot" style={{ background: colorFor(label) }} aria-hidden="true" />
                {label}
                <span>{count}</span>
              </li>
            ))}
          </ul>
          <div className="ws-actions">
            <button type="button" className="ws-button ws-button-primary" onClick={saveImage}>
              <Download size={16} /> {opt.saveImage ?? "Download image"}
            </button>
            <button type="button" className="ws-button ws-button-ghost" onClick={saveJson}>
              <Download size={16} /> JSON
            </button>
          </div>
        </>
      ) : null}

      <JobNotice locale={locale} error={error} />
    </>
  );
}
