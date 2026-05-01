"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, TextInput } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";
import { blobFromOutput, fetchFile, getFFmpeg } from "@/lib/ffmpeg";

export default function VideoToGifTool({
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
  const [file, setFile] = useState<File | null>(null);
  const [start, setStart] = useState("00:00:00");
  const [duration, setDuration] = useState(3);
  const [fps, setFps] = useState(15);
  const [width, setWidth] = useState(480);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  const convert = async () => {
    if (!file) return;
    setBusy(true);
    setProgress(0);
    try {
      const ff = await getFFmpeg();
      ff.on("progress", ({ progress: p }) => setProgress(Math.round(p * 100)));
      const inName = "input." + (file.name.split(".").pop() || "mp4");
      const palette = "palette.png";
      const outName = "out.gif";
      await ff.writeFile(inName, await fetchFile(file));
      const filter = `fps=${fps},scale=${width}:-1:flags=lanczos`;
      await ff.exec(["-ss", start, "-t", String(duration), "-i", inName, "-vf", `${filter},palettegen`, palette]);
      await ff.exec([
        "-ss", start, "-t", String(duration),
        "-i", inName, "-i", palette,
        "-filter_complex", `${filter}[x];[x][1:v]paletteuse`,
        outName
      ]);
      const data = (await ff.readFile(outName)) as Uint8Array;
      downloadBlob(blobFromOutput(data, "image/gif"), file.name.replace(/\.[^.]+$/, "") + ".gif");
      await ff.deleteFile(inName);
      await ff.deleteFile(palette);
      await ff.deleteFile(outName);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.start ?? "Start"} hint="HH:MM:SS"><TextInput value={start} onChange={setStart} /></FieldRow>
        <FieldRow label={opt.duration ?? "Duration"}><NumberInput value={duration} min={1} max={20} step={1} onChange={setDuration} suffix="s" /></FieldRow>
        <FieldRow label={opt.fps ?? "FPS"}><NumberInput value={fps} min={5} max={30} step={1} onChange={setFps} /></FieldRow>
        <FieldRow label={opt.width ?? "Width"}><NumberInput value={width} min={120} max={1280} step={20} onChange={setWidth} suffix="px" /></FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={() => inputRef.current?.click()}>
          <Upload size={14} /> {ui.pickFile}
        </button>
        <input ref={inputRef} type="file" accept="video/*" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="button" className="ws-button ws-button-ghost" onClick={convert} disabled={!file || busy}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? `${ui.processing} ${progress}%` : ui.download}
        </button>
      </div>

      {file ? <p className="ws-text-io-note">{file.name}</p> : <p className="ws-text-io-note">{ui.dropHint}</p>}
    </>
  );
}
