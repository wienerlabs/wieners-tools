"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextInput } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";
import { blobFromOutput, fetchFile, getFFmpeg } from "@/lib/ffmpeg";

export default function VideoTrimTool({
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
  const [start, setStart] = useState("00:00:02");
  const [end, setEnd] = useState("00:00:08");
  const [busy, setBusy] = useState(false);

  const trim = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const ff = await getFFmpeg();
      const ext = file.name.split(".").pop() || "mp4";
      const inName = "input." + ext;
      const outName = "out." + ext;
      await ff.writeFile(inName, await fetchFile(file));
      await ff.exec(["-ss", start, "-to", end, "-i", inName, "-c", "copy", outName]);
      const data = (await ff.readFile(outName)) as Uint8Array;
      downloadBlob(blobFromOutput(data, file.type || "video/mp4"), file.name.replace(/\.[^.]+$/, "") + "-trim." + ext);
      await ff.deleteFile(inName);
      await ff.deleteFile(outName);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.start ?? "Start"} hint="HH:MM:SS"><TextInput value={start} onChange={setStart} /></FieldRow>
        <FieldRow label={opt.end ?? "End"} hint="HH:MM:SS"><TextInput value={end} onChange={setEnd} /></FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={() => inputRef.current?.click()}>
          <Upload size={14} /> {ui.pickFile}
        </button>
        <input ref={inputRef} type="file" accept="video/*" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="button" className="ws-button ws-button-ghost" onClick={trim} disabled={!file || busy}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? ui.processing : ui.download}
        </button>
      </div>

      {file ? <p className="ws-text-io-note">{file.name}</p> : <p className="ws-text-io-note">{ui.dropHint}</p>}
    </>
  );
}
