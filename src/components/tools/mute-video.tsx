"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";
import { blobFromOutput, fetchFile, getFFmpeg } from "@/lib/ffmpeg";

export default function MuteVideoTool({
  locale
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const mute = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const ff = await getFFmpeg();
      const ext = file.name.split(".").pop() || "mp4";
      const inName = "input." + ext;
      const outName = "out." + ext;
      await ff.writeFile(inName, await fetchFile(file));
      await ff.exec(["-i", inName, "-c", "copy", "-an", outName]);
      const data = (await ff.readFile(outName)) as Uint8Array;
      downloadBlob(blobFromOutput(data, file.type || "video/mp4"), file.name.replace(/\.[^.]+$/, "") + "-muted." + ext);
      await ff.deleteFile(inName);
      await ff.deleteFile(outName);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={() => inputRef.current?.click()}>
          <Upload size={14} /> {ui.pickFile}
        </button>
        <input ref={inputRef} type="file" accept="video/*" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="button" className="ws-button ws-button-ghost" onClick={mute} disabled={!file || busy}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? ui.processing : ui.download}
        </button>
      </div>

      {file ? <p className="ws-text-io-note">{file.name}</p> : <p className="ws-text-io-note">{ui.dropHint}</p>}
    </>
  );
}
