"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";
import { blobFromOutput, fetchFile, getFFmpeg } from "@/lib/ffmpeg";

type Format = "mp3" | "wav";

const MIME: Record<Format, string> = { mp3: "audio/mpeg", wav: "audio/wav" };

export default function ExtractAudioTool({
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
  const [format, setFormat] = useState<Format>("mp3");
  const [busy, setBusy] = useState(false);

  const extract = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const ff = await getFFmpeg();
      const inName = "input." + (file.name.split(".").pop() || "mp4");
      const outName = "out." + format;
      await ff.writeFile(inName, await fetchFile(file));
      const args =
        format === "mp3"
          ? ["-i", inName, "-vn", "-acodec", "libmp3lame", "-b:a", "192k", outName]
          : ["-i", inName, "-vn", "-acodec", "pcm_s16le", outName];
      await ff.exec(args);
      const data = (await ff.readFile(outName)) as Uint8Array;
      downloadBlob(blobFromOutput(data, MIME[format]), file.name.replace(/\.[^.]+$/, "") + "." + format);
      await ff.deleteFile(inName);
      await ff.deleteFile(outName);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.format ?? "Format"}>
          <Select<Format>
            value={format}
            options={[
              { value: "mp3", label: "MP3 (192 kbps)" },
              { value: "wav", label: "WAV (PCM)" }
            ]}
            onChange={setFormat}
          />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={() => inputRef.current?.click()}>
          <Upload size={14} /> {ui.pickFile}
        </button>
        <input ref={inputRef} type="file" accept="video/*" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="button" className="ws-button ws-button-ghost" onClick={extract} disabled={!file || busy}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? ui.processing : ui.download}
        </button>
      </div>

      {file ? <p className="ws-text-io-note">{file.name}</p> : <p className="ws-text-io-note">{ui.dropHint}</p>}
    </>
  );
}
