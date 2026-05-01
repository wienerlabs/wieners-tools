"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, NumberInput, Select } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";
import { blobFromOutput, fetchFile, getFFmpeg } from "@/lib/ffmpeg";

type Preset = "ultrafast" | "fast" | "medium" | "slow";

export default function VideoCompressTool({
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
  const [crf, setCrf] = useState(28);
  const [maxHeight, setMaxHeight] = useState(720);
  const [preset, setPreset] = useState<Preset>("medium");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  const compress = async () => {
    if (!file) return;
    setBusy(true);
    setProgress(0);
    try {
      const ff = await getFFmpeg();
      ff.on("progress", ({ progress: p }) => setProgress(Math.round(p * 100)));
      const inName = "input." + (file.name.split(".").pop() || "mp4");
      const outName = "out.mp4";
      await ff.writeFile(inName, await fetchFile(file));
      await ff.exec([
        "-i", inName,
        "-vf", `scale='min(${maxHeight * 2},iw)':'min(${maxHeight},ih)':force_original_aspect_ratio=decrease`,
        "-c:v", "libx264",
        "-preset", preset,
        "-crf", String(crf),
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        outName
      ]);
      const data = (await ff.readFile(outName)) as Uint8Array;
      downloadBlob(blobFromOutput(data, "video/mp4"), file.name.replace(/\.[^.]+$/, "") + "-compressed.mp4");
      await ff.deleteFile(inName);
      await ff.deleteFile(outName);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.crf ?? "CRF"} hint="lower = bigger & sharper">
          <NumberInput value={crf} min={18} max={36} step={1} onChange={setCrf} />
        </FieldRow>
        <FieldRow label={opt.maxHeight ?? "Max height"}>
          <NumberInput value={maxHeight} min={240} max={2160} step={120} onChange={setMaxHeight} suffix="px" />
        </FieldRow>
        <FieldRow label={opt.preset ?? "Preset"}>
          <Select<Preset>
            value={preset}
            options={[
              { value: "ultrafast", label: "ultrafast" },
              { value: "fast", label: "fast" },
              { value: "medium", label: "medium" },
              { value: "slow", label: "slow" }
            ]}
            onChange={setPreset}
          />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={() => inputRef.current?.click()}>
          <Upload size={14} /> {ui.pickFile}
        </button>
        <input ref={inputRef} type="file" accept="video/*" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="button" className="ws-button ws-button-ghost" onClick={compress} disabled={!file || busy}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? `${ui.processing} ${progress}%` : ui.download}
        </button>
      </div>

      {file ? <p className="ws-text-io-note">{file.name} · {(file.size / 1024 / 1024).toFixed(1)} MB · ffmpeg.wasm runs on your device, first run downloads ~30 MB core</p> : <p className="ws-text-io-note">{ui.dropHint}</p>}
    </>
  );
}
