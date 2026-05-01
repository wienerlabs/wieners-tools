"use client";

import { useState } from "react";
import { Eraser, Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { downloadBlob, inferOutputName } from "@/lib/tools/utils";

type ExifRow = { tag: string; value: string };
type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function ExifViewerTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<ExifRow[]>([]);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const inspect = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setTags([]);
    setResults([]);

    const ExifReader = (await import("exifreader")).default;
    const arrayBuffer = await files[0].arrayBuffer();
    const meta = ExifReader.load(arrayBuffer, { expanded: false });
    const rows: ExifRow[] = Object.entries(meta as Record<string, { description?: string; value?: unknown }>)
      .filter(([key]) => key !== "Thumbnail" && key !== "Images")
      .map(([key, val]) => ({
        tag: key,
        value: String(val?.description ?? val?.value ?? "")
      }))
      .filter((r) => r.value && r.value.length < 200)
      .slice(0, 200);
    setTags(rows);
    setBusy(false);
  };

  const strip = async () => {
    if (files.length === 0) return;
    setBusy(true);

    const piexifMod = (await import("piexifjs")) as unknown as {
      default?: { remove: (s: string) => string };
      remove: (s: string) => string;
    };
    const piexif = (piexifMod.default ?? piexifMod) as { remove: (s: string) => string };
    const file = files[0];
    if (!file.type.includes("jpeg")) {
      setBusy(false);
      return;
    }
    const dataURL = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("read"));
      reader.readAsDataURL(file);
    });
    const cleaned = piexif.remove(dataURL);
    const res = await fetch(cleaned);
    const blob = await res.blob();
    setResults([
      {
        blob,
        filename: inferOutputName(file.name, "-no-exif", "jpg")
      }
    ]);
    setBusy(false);
  };

  const exportJson = () => {
    if (tags.length === 0) return;
    const blob = new Blob([JSON.stringify(tags, null, 2)], { type: "application/json" });
    downloadBlob(blob, "exif.json");
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={inspect} disabled={files.length === 0 || busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {ui.process}
        </button>
        {tags.length > 0 ? (
          <button type="button" className="ws-button ws-button-ghost" onClick={exportJson}>
            .json
          </button>
        ) : null}
        <button type="button" className="ws-button ws-button-ghost" onClick={strip} disabled={files.length === 0 || busy}>
          <Eraser size={14} /> Strip EXIF (JPEG)
        </button>
        {(files.length > 0 || tags.length > 0 || results.length > 0) && (
          <button type="button" className="ws-button ws-button-ghost" onClick={() => { setFiles([]); setTags([]); setResults([]); }}>
            {ui.reset}
          </button>
        )}
      </div>

      {tags.length > 0 ? (
        <section className="ws-options">
          <div className="ws-exif-grid">
            {tags.map((row) => (
              <div key={`${row.tag}-${row.value}`} className="ws-exif-row">
                <span className="ws-exif-tag">{row.tag}</span>
                <span className="ws-exif-value">{row.value}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <ResultGrid locale={locale} results={results} />
    </>
  );
}
