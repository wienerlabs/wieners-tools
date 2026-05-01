"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Slider } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

function autoLevels(data: Uint8ClampedArray) {
  let min = 255, max = 0;
  for (let i = 0; i < data.length; i += 4) {
    const v = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  if (max - min < 8) return;
  const scale = 255 / (max - min);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.max(0, Math.min(255, (data[i] - min) * scale));
    data[i + 1] = Math.max(0, Math.min(255, (data[i + 1] - min) * scale));
    data[i + 2] = Math.max(0, Math.min(255, (data[i + 2] - min) * scale));
  }
}

function unsharpMask(src: ImageData, amount: number) {
  const { data, width: w, height: h } = src;
  const blur = new Uint8ClampedArray(data);
  const k = 1;
  for (let y = k; y < h - k; y++) {
    for (let x = k; x < w - k; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let dy = -k; dy <= k; dy++) {
          for (let dx = -k; dx <= k; dx++) {
            sum += data[((y + dy) * w + (x + dx)) * 4 + c];
          }
        }
        blur[(y * w + x) * 4 + c] = sum / 9;
      }
    }
  }
  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      const orig = data[i + c];
      const b = blur[i + c];
      data[i + c] = Math.max(0, Math.min(255, orig + (orig - b) * amount));
    }
  }
}

export default function PhotoRestoreTool({
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
  const beforeRef = useRef<HTMLCanvasElement | null>(null);
  const afterRef = useRef<HTMLCanvasElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [strength, setStrength] = useState(60);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      processImage(im, strength);
      URL.revokeObjectURL(url);
    };
    im.src = url;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, strength]);

  const processImage = (im: HTMLImageElement, str: number) => {
    setBusy(true);
    const max = 720;
    const scale = Math.min(max / im.naturalWidth, max / im.naturalHeight, 1);
    const w = Math.round(im.naturalWidth * scale);
    const h = Math.round(im.naturalHeight * scale);
    if (beforeRef.current) {
      beforeRef.current.width = w;
      beforeRef.current.height = h;
      beforeRef.current.getContext("2d")?.drawImage(im, 0, 0, w, h);
    }
    if (afterRef.current) {
      afterRef.current.width = w;
      afterRef.current.height = h;
      const ctx = afterRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(im, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h);
        autoLevels(data.data);
        unsharpMask(data, str / 100);
        ctx.putImageData(data, 0, 0);
      }
    }
    setBusy(false);
  };

  const exportImg = () => {
    if (!file || !afterRef.current) return;
    afterRef.current.toBlob((blob) => {
      if (blob) downloadBlob(blob, file.name.replace(/\.[^.]+$/, "") + "-restored.png");
    }, "image/png");
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.strength ?? "Strength"}>
          <Slider value={strength} min={0} max={100} step={5} onChange={setStrength} format={(v) => `${v}%`} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={() => inputRef.current?.click()}>
          <Upload size={14} /> {ui.pickFile}
        </button>
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="button" className="ws-button ws-button-ghost" onClick={exportImg} disabled={!file || busy}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? ui.processing : ui.download}
        </button>
      </div>

      {file ? (
        <div className="ws-restore-grid">
          <figure>
            <figcaption>before</figcaption>
            <canvas ref={beforeRef} className="ws-restore-canvas" />
          </figure>
          <figure>
            <figcaption>after</figcaption>
            <canvas ref={afterRef} className="ws-restore-canvas" />
          </figure>
        </div>
      ) : (
        <p className="ws-text-io-note">{ui.dropHint}</p>
      )}
    </>
  );
}
