"use client";

import { useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { content } from "@/lib/content";
import { readFileAsImage } from "@/lib/tools/utils";

type ColorReading = {
  hex: string;
  rgb: string;
  hsl: string;
};

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number) {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rN:
        h = ((gN - bN) / d + (gN < bN ? 6 : 0)) * 60;
        break;
      case gN:
        h = ((bN - rN) / d + 2) * 60;
        break;
      default:
        h = ((rN - gN) / d + 4) * 60;
    }
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorPickerTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [reading, setReading] = useState<ColorReading | null>(null);
  const [history, setHistory] = useState<ColorReading[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImgUrl(url);
      readFileAsImage(files[0]).then((image) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const maxDisplay = 720;
        const ratio = Math.min(1, maxDisplay / image.naturalWidth);
        canvas.width = Math.round(image.naturalWidth * ratio);
        canvas.height = Math.round(image.naturalHeight * ratio);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      });
      return () => URL.revokeObjectURL(url);
    }
    setImgUrl(null);
    setReading(null);
    setHistory([]);
  }, [files]);

  const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((event.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((event.clientY - rect.top) / rect.height) * canvas.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    const hsl = rgbToHsl(pixel[0], pixel[1], pixel[2]);
    const next: ColorReading = {
      hex,
      rgb,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    };
    setReading(next);
    setHistory((prev) => [next, ...prev.filter((r) => r.hex !== hex)].slice(0, 12));
  };

  const copy = (value: string) => navigator.clipboard?.writeText(value);

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      {imgUrl ? (
        <div className="ws-color-stage">
          <canvas
            ref={canvasRef}
            onClick={onClick}
            style={{ maxWidth: "100%", cursor: "crosshair", borderRadius: 12 }}
          />
        </div>
      ) : null}

      {reading ? (
        <section className="ws-options">
          <h3 className="ws-options-title">Picked color</h3>
          <div className="ws-color-readout">
            <span className="ws-color-swatch" style={{ background: reading.hex }} />
            <button type="button" className="ws-color-row" onClick={() => copy(reading.hex)}>
              <span>HEX</span>
              <strong>{reading.hex}</strong>
              <Copy size={12} />
            </button>
            <button type="button" className="ws-color-row" onClick={() => copy(reading.rgb)}>
              <span>RGB</span>
              <strong>{reading.rgb}</strong>
              <Copy size={12} />
            </button>
            <button type="button" className="ws-color-row" onClick={() => copy(reading.hsl)}>
              <span>HSL</span>
              <strong>{reading.hsl}</strong>
              <Copy size={12} />
            </button>
          </div>

          {history.length > 1 ? (
            <div className="ws-color-history">
              {history.map((row) => (
                <button
                  key={row.hex}
                  type="button"
                  onClick={() => copy(row.hex)}
                  className="ws-color-history-item"
                  style={{ background: row.hex }}
                  title={row.hex}
                />
              ))}
            </div>
          ) : null}
        </section>
      ) : (
        <p className="ws-field-hint">{ui.dropHint}</p>
      )}
    </>
  );
}
