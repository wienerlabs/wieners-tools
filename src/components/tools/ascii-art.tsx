"use client";

import { useState } from "react";
import { Copy, Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, NumberInput, Select, Toggle } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob, readFileAsImage } from "@/lib/tools/utils";

type CharsetKey = "dense" | "sparse" | "blocks";

const CHARSETS: Record<CharsetKey, string> = {
  dense: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  sparse: " .:-=+*#%@",
  blocks: " ░▒▓█"
};

export default function AsciiArtTool({
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
  const [width, setWidth] = useState(120);
  const [charset, setCharset] = useState<CharsetKey>("sparse");
  const [colored, setColored] = useState(false);
  const [text, setText] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setText("");
    setHtml("");

    const file = files[0];
    const image = await readFileAsImage(file);

    const charsetStr = CHARSETS[charset];
    const aspect = image.naturalHeight / image.naturalWidth;
    const targetH = Math.max(1, Math.floor(width * aspect * 0.5)); // chars are ~2x tall

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("ctx");
    ctx.drawImage(image, 0, 0, width, targetH);
    const data = ctx.getImageData(0, 0, width, targetH).data;

    let plain = "";
    let pretty = '<pre style="font-family:ui-monospace,monospace;line-height:1;font-size:10px;background:#050505;color:#eee9e4;padding:12px;margin:0;">';
    for (let y = 0; y < targetH; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const char = charsetStr[Math.floor((1 - lum) * (charsetStr.length - 1))];
        plain += char;
        if (colored) {
          pretty += `<span style="color:rgb(${r},${g},${b})">${char === "<" ? "&lt;" : char === ">" ? "&gt;" : char}</span>`;
        }
      }
      plain += "\n";
      if (colored) pretty += "<br/>";
    }
    pretty += "</pre>";

    setText(plain);
    setHtml(colored ? pretty : "");
    setBusy(false);
  };

  const copy = () => {
    if (text) navigator.clipboard?.writeText(text);
  };

  const downloadTxt = () => {
    if (!text) return;
    downloadBlob(new Blob([text], { type: "text/plain" }), "ascii.txt");
  };

  const downloadHtml = () => {
    if (!html) return;
    const full = `<!doctype html><html><head><meta charset="utf-8"><title>ASCII</title></head><body style="margin:0;background:#050505;">${html}</body></html>`;
    downloadBlob(new Blob([full], { type: "text/html" }), "ascii.html");
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label={opt.width ?? "Width"}>
          <NumberInput value={width} min={20} max={400} step={2} onChange={setWidth} />
        </FieldRow>
        <FieldRow label={opt.charset ?? "Charset"}>
          <Select<CharsetKey>
            value={charset}
            options={[
              { value: "dense", label: "Dense" },
              { value: "sparse", label: "Sparse" },
              { value: "blocks", label: "Blocks" }
            ]}
            onChange={setCharset}
          />
        </FieldRow>
        <FieldRow label="HTML">
          <Toggle value={colored} onChange={setColored} label={opt.colored ?? "Colored HTML"} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={files.length === 0 || busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? ui.processing : ui.process}
        </button>
        {text ? (
          <>
            <button type="button" className="ws-button ws-button-ghost" onClick={copy}>
              <Copy size={14} /> Copy
            </button>
            <button type="button" className="ws-button ws-button-ghost" onClick={downloadTxt}>
              .txt
            </button>
            {html ? (
              <button type="button" className="ws-button ws-button-ghost" onClick={downloadHtml}>
                .html
              </button>
            ) : null}
          </>
        ) : null}
      </div>

      {text ? (
        <pre className="ws-ascii-output">{text}</pre>
      ) : null}
    </>
  );
}
