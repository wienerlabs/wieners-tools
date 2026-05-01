"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Select } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

type Aspect = "1:1" | "4:5" | "16:9" | "9:16" | "3:2";

const ASPECTS: Record<Aspect, number> = {
  "1:1": 1,
  "4:5": 4 / 5,
  "16:9": 16 / 9,
  "9:16": 9 / 16,
  "3:2": 3 / 2
};

function saliencyMap(img: ImageData): { map: Float32Array; w: number; h: number } {
  const { width: w, height: h, data } = img;
  const gray = new Float32Array(w * h);
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    gray[j] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  const map = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const gx = gray[i + 1] - gray[i - 1];
      const gy = gray[i + w] - gray[i - w];
      map[i] = Math.abs(gx) + Math.abs(gy);
    }
  }
  return { map, w, h };
}

function bestCrop(map: Float32Array, w: number, h: number, aspect: number, pad: number) {
  const cropW = aspect >= w / h ? w * (1 - pad) : Math.round(h * (1 - pad) * aspect);
  const cropH = Math.round(cropW / aspect);
  const cw = Math.min(w, Math.max(32, Math.round(cropW)));
  const ch = Math.min(h, Math.max(32, cropH));

  const integral = new Float32Array((w + 1) * (h + 1));
  for (let y = 1; y <= h; y++) {
    let row = 0;
    for (let x = 1; x <= w; x++) {
      row += map[(y - 1) * w + (x - 1)];
      integral[y * (w + 1) + x] = integral[(y - 1) * (w + 1) + x] + row;
    }
  }
  let bestX = 0, bestY = 0, bestSum = -1;
  const step = Math.max(2, Math.round(Math.min(w, h) / 80));
  for (let y = 0; y <= h - ch; y += step) {
    for (let x = 0; x <= w - cw; x += step) {
      const a = integral[y * (w + 1) + x];
      const b = integral[y * (w + 1) + x + cw];
      const c = integral[(y + ch) * (w + 1) + x];
      const d = integral[(y + ch) * (w + 1) + x + cw];
      const sum = d - b - c + a;
      if (sum > bestSum) {
        bestSum = sum;
        bestX = x;
        bestY = y;
      }
    }
  }
  return { x: bestX, y: bestY, w: cw, h: ch };
}

export default function SmartCropTool({
  locale,
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [aspect, setAspect] = useState<Aspect>("1:1");
  const [pad, setPad] = useState(10);
  const [busy, setBusy] = useState(false);
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!file) {
      setImgEl(null);
      setBox(null);
      return;
    }
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      setImgEl(im);
      compute(im, aspect, pad);
    };
    im.src = url;
    return () => URL.revokeObjectURL(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (imgEl) compute(imgEl, aspect, pad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aspect, pad]);

  const compute = (im: HTMLImageElement, asp: Aspect, padPct: number) => {
    setBusy(true);
    const off = document.createElement("canvas");
    const SC = 256;
    const scale = Math.min(SC / im.naturalWidth, SC / im.naturalHeight, 1);
    off.width = Math.max(1, Math.round(im.naturalWidth * scale));
    off.height = Math.max(1, Math.round(im.naturalHeight * scale));
    const ctx = off.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.drawImage(im, 0, 0, off.width, off.height);
    const data = ctx.getImageData(0, 0, off.width, off.height);
    const { map } = saliencyMap(data);
    const region = bestCrop(map, off.width, off.height, ASPECTS[asp], padPct / 100);
    const inv = 1 / scale;
    const real = {
      x: Math.round(region.x * inv),
      y: Math.round(region.y * inv),
      w: Math.round(region.w * inv),
      h: Math.round(region.h * inv)
    };
    setBox(real);
    drawPreview(im, real);
    setBusy(false);
  };

  const drawPreview = (im: HTMLImageElement, b: { x: number; y: number; w: number; h: number }) => {
    const canvas = previewRef.current;
    if (!canvas) return;
    const max = 480;
    const scale = Math.min(max / im.naturalWidth, max / im.naturalHeight, 1);
    canvas.width = Math.round(im.naturalWidth * scale);
    canvas.height = Math.round(im.naturalHeight * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(im, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(b.x * scale, b.y * scale, b.w * scale, b.h * scale);
    ctx.drawImage(im, b.x, b.y, b.w, b.h, b.x * scale, b.y * scale, b.w * scale, b.h * scale);
    ctx.strokeStyle = "#fff4dd";
    ctx.lineWidth = 2;
    ctx.strokeRect(b.x * scale, b.y * scale, b.w * scale, b.h * scale);
  };

  const exportCrop = async () => {
    if (!imgEl || !box || !file) return;
    const out = document.createElement("canvas");
    out.width = box.w;
    out.height = box.h;
    const ctx = out.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(imgEl, box.x, box.y, box.w, box.h, 0, 0, box.w, box.h);
    out.toBlob((blob) => {
      if (blob) downloadBlob(blob, file.name.replace(/\.[^.]+$/, "") + "-crop.png");
    }, "image/png");
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.aspect ?? "Aspect"}>
          <Select<Aspect>
            value={aspect}
            options={(Object.keys(ASPECTS) as Aspect[]).map((a) => ({ value: a, label: a }))}
            onChange={setAspect}
          />
        </FieldRow>
        <FieldRow label={opt.padding ?? "Padding"}>
          <NumberInput value={pad} min={0} max={30} step={1} onChange={setPad} suffix="%" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={() => inputRef.current?.click()}>
          <Upload size={14} /> {ui.pickFile}
        </button>
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="button" className="ws-button ws-button-ghost" onClick={exportCrop} disabled={!box || busy}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? ui.processing : ui.download}
        </button>
      </div>

      {file ? (
        <div className="ws-smart-crop-stage">
          <canvas ref={previewRef} className="ws-smart-crop-canvas" />
          {box ? <p className="ws-text-io-note">Best crop: {box.w}×{box.h} @ ({box.x}, {box.y})</p> : null}
        </div>
      ) : (
        <p className="ws-text-io-note">{ui.dropHint}</p>
      )}
    </>
  );
}
