"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Select, ColorInput, Slider } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { canvasToBlob, inferOutputName, readFileAsImage } from "@/lib/tools/utils";

type Frame = "browser" | "macbook" | "iphone" | "ipad";
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

const FRAME_DIM: Record<Frame, { ratio: number; padding: { top: number; sides: number; bottom: number } }> = {
  browser: { ratio: 16 / 10, padding: { top: 60, sides: 24, bottom: 24 } },
  macbook: { ratio: 16 / 10, padding: { top: 40, sides: 80, bottom: 120 } },
  iphone: { ratio: 9 / 19.5, padding: { top: 24, sides: 28, bottom: 40 } },
  ipad: { ratio: 4 / 3, padding: { top: 40, sides: 40, bottom: 40 } }
};

export default function MockupGeneratorTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [frame, setFrame] = useState<Frame>("browser");
  const [bg, setBg] = useState("#efe9df");
  const [shadow, setShadow] = useState(0.4);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const drawBrowser = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    targetW: number,
    targetH: number
  ) => {
    const { padding } = FRAME_DIM.browser;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(0, 0, targetW, targetH, 16);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f4f0ea";
    ctx.fillRect(0, 0, targetW, padding.top);
    // dots
    const dots = ["#f96058", "#f8b958", "#5cd45e"];
    dots.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(24 + i * 22, padding.top / 2, 6, 0, Math.PI * 2);
      ctx.fill();
    });
    // url bar
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(targetW * 0.2, padding.top / 2 - 14, targetW * 0.6, 28, 14);
    ctx.fill();
    ctx.fillStyle = "#9b938b";
    ctx.font = "13px ui-monospace, monospace";
    ctx.fillText("wienerstools.com", targetW * 0.22, padding.top / 2 + 4);

    const innerW = targetW - padding.sides * 2;
    const innerH = targetH - padding.top - padding.bottom;
    drawFit(ctx, image, padding.sides, padding.top, innerW, innerH);
  };

  const drawMacbook = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    targetW: number,
    targetH: number
  ) => {
    const { padding } = FRAME_DIM.macbook;
    // Lid
    ctx.fillStyle = "#15181d";
    ctx.beginPath();
    ctx.roundRect(0, 0, targetW, targetH - padding.bottom + 16, 28);
    ctx.fill();
    // Screen bezel
    const innerW = targetW - padding.sides * 2;
    const innerH = targetH - padding.top - padding.bottom;
    ctx.fillStyle = "#000000";
    ctx.fillRect(padding.sides, padding.top, innerW, innerH);
    drawFit(ctx, image, padding.sides, padding.top, innerW, innerH);
    // Base
    ctx.fillStyle = "#3a3f47";
    ctx.beginPath();
    ctx.roundRect(targetW * 0.04, targetH - 60, targetW * 0.92, 40, 8);
    ctx.fill();
    ctx.fillStyle = "#23262b";
    ctx.beginPath();
    ctx.roundRect(targetW * 0.42, targetH - 60, targetW * 0.16, 12, 4);
    ctx.fill();
  };

  const drawIPhone = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    targetW: number,
    targetH: number
  ) => {
    const radius = 60;
    ctx.fillStyle = "#0a0a0a";
    ctx.beginPath();
    ctx.roundRect(0, 0, targetW, targetH, radius);
    ctx.fill();
    const innerX = 12;
    const innerY = 12;
    const innerW = targetW - 24;
    const innerH = targetH - 24;
    ctx.beginPath();
    ctx.roundRect(innerX, innerY, innerW, innerH, radius - 8);
    ctx.clip();
    drawFit(ctx, image, innerX, innerY, innerW, innerH);
    // dynamic island
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.roundRect(targetW / 2 - 60, innerY + 14, 120, 30, 18);
    ctx.fill();
  };

  const drawIPad = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    targetW: number,
    targetH: number
  ) => {
    const radius = 28;
    ctx.fillStyle = "#1d1f24";
    ctx.beginPath();
    ctx.roundRect(0, 0, targetW, targetH, radius);
    ctx.fill();
    const padding = 32;
    ctx.fillStyle = "#000";
    ctx.fillRect(padding, padding, targetW - padding * 2, targetH - padding * 2);
    drawFit(ctx, image, padding, padding, targetW - padding * 2, targetH - padding * 2);
  };

  const drawFit = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    const ratio = Math.min(w / image.naturalWidth, h / image.naturalHeight);
    const dw = image.naturalWidth * ratio;
    const dh = image.naturalHeight * ratio;
    ctx.drawImage(image, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  };

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const file = files[0];
    const image = await readFileAsImage(file);

    const padding = 80;
    const dim = FRAME_DIM[frame];
    const innerH = Math.round(image.naturalWidth / dim.ratio);
    const targetW = image.naturalWidth + dim.padding.sides * 2;
    const targetH = innerH + dim.padding.top + dim.padding.bottom;
    const totalW = targetW + padding * 2;
    const totalH = targetH + padding * 2;

    const canvas = document.createElement("canvas");
    canvas.width = totalW;
    canvas.height = totalH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, totalW, totalH);

    // shadow
    ctx.shadowColor = `rgba(0,0,0,${shadow})`;
    ctx.shadowBlur = 60;
    ctx.shadowOffsetY = 30;

    ctx.translate(padding, padding);
    if (frame === "browser") drawBrowser(ctx, image, targetW, targetH);
    else if (frame === "macbook") drawMacbook(ctx, image, targetW, targetH);
    else if (frame === "iphone") drawIPhone(ctx, image, targetW, targetH);
    else drawIPad(ctx, image, targetW, targetH);

    const blob = await canvasToBlob(canvas, "image/png");
    setResults([
      {
        blob,
        filename: inferOutputName(file.name, `-${frame}-mockup`, "png"),
        meta: { width: totalW, height: totalH }
      }
    ]);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="Frame">
          <Select<Frame>
            value={frame}
            options={[
              { value: "browser", label: "Browser window" },
              { value: "macbook", label: "MacBook" },
              { value: "iphone", label: "iPhone" },
              { value: "ipad", label: "iPad" }
            ]}
            onChange={setFrame}
          />
        </FieldRow>
        <FieldRow label="Background">
          <ColorInput value={bg} onChange={setBg} />
        </FieldRow>
        <FieldRow label="Shadow">
          <Slider value={shadow} min={0} max={1} step={0.05} onChange={setShadow} format={(v) => `${Math.round(v * 100)}%`} />
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
