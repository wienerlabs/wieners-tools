"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextArea, TextInput, ColorInput, Select, NumberInput } from "@/components/options-panel";
import { content } from "@/lib/content";
import { canvasToBlob, downloadBlob } from "@/lib/tools/utils";

type Preset = "og" | "twitter" | "linkedin" | "square";

const SIZES: Record<Preset, { width: number; height: number; label: string }> = {
  og: { width: 1200, height: 630, label: "OG 1200×630" },
  twitter: { width: 1200, height: 675, label: "Twitter 1200×675" },
  linkedin: { width: 1200, height: 627, label: "LinkedIn 1200×627" },
  square: { width: 1080, height: 1080, label: "Square 1080×1080" }
};

export default function OgImageGeneratorTool({
  locale
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [preset, setPreset] = useState<Preset>("og");
  const [bg, setBg] = useState("#0a0a0a");
  const [fg, setFg] = useState("#eee9e4");
  const [accent, setAccent] = useState("#c8a247");
  const [eyebrow, setEyebrow] = useState("WIENER'S TOOLS");
  const [title, setTitle] = useState("Browser-native image toolkit");
  const [description, setDescription] = useState("Compress, convert, edit and generate — entirely in your browser.");
  const [titleSize, setTitleSize] = useState(72);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ui = content[locale].workbench;

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = SIZES[preset];
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const stripeH = 18;
    const stripeY = height - stripeH * 4;
    [accent, "#a06636", "#b63a3a", "#5b1f27"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(0, stripeY + i * stripeH, width, stripeH);
    });

    const padX = 72;
    const padY = 72;

    ctx.fillStyle = accent;
    ctx.font = "600 22px Host Grotesk, system-ui, sans-serif";
    ctx.fillText(eyebrow, padX, padY + 22);

    ctx.fillStyle = fg;
    ctx.font = `700 ${titleSize}px Host Grotesk, system-ui, sans-serif`;
    const lines = wrap(ctx, title, width - padX * 2);
    let y = padY + 80;
    for (const line of lines) {
      ctx.fillText(line, padX, y);
      y += titleSize * 1.05;
    }

    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "400 26px Host Grotesk, system-ui, sans-serif";
    const dlines = wrap(ctx, description, width - padX * 2);
    y += 8;
    for (const line of dlines) {
      ctx.fillText(line, padX, y);
      y += 34;
    }
  };

  const wrap = (ctx: CanvasRenderingContext2D, text: string, max: number): string[] => {
    const words = text.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const probe = current ? `${current} ${word}` : word;
      if (ctx.measureText(probe).width > max && current) {
        lines.push(current);
        current = word;
      } else {
        current = probe;
      }
    }
    if (current) lines.push(current);
    return lines;
  };

  useEffect(() => {
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, bg, fg, accent, eyebrow, title, description, titleSize]);

  const onDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const blob = await canvasToBlob(canvas, "image/png");
    downloadBlob(blob, `og-${preset}.png`);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label="Preset">
          <Select<Preset>
            value={preset}
            options={Object.entries(SIZES).map(([v, p]) => ({ value: v as Preset, label: p.label }))}
            onChange={setPreset}
          />
        </FieldRow>
        <FieldRow label="Eyebrow">
          <TextInput value={eyebrow} onChange={setEyebrow} placeholder="BRAND" />
        </FieldRow>
        <FieldRow label="Title">
          <TextArea value={title} onChange={setTitle} rows={2} />
        </FieldRow>
        <FieldRow label="Description">
          <TextArea value={description} onChange={setDescription} rows={2} />
        </FieldRow>
        <FieldRow label="Title size">
          <NumberInput value={titleSize} min={32} max={140} step={2} onChange={setTitleSize} suffix="px" />
        </FieldRow>
        <FieldRow label="Background">
          <ColorInput value={bg} onChange={setBg} />
        </FieldRow>
        <FieldRow label="Foreground">
          <ColorInput value={fg} onChange={setFg} />
        </FieldRow>
        <FieldRow label="Accent">
          <ColorInput value={accent} onChange={setAccent} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={onDownload}>
          <Download size={14} /> {ui.download}
        </button>
        <button type="button" className="ws-button ws-button-ghost" onClick={render}>
          <Wand2 size={14} /> Re-render
        </button>
      </div>

      <div className="ws-options">
        <canvas ref={canvasRef} style={{ width: "100%", maxWidth: 800, borderRadius: 12, display: "block" }} />
      </div>
    </>
  );
}
