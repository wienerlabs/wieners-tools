"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { inferOutputName } from "@/lib/tools/utils";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function RemoveBackgroundTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<string>("");

  const modelHint =
    locale === "tr"
      ? "İlk açılışta ~14 MB model tarayıcınıza inecek. Sonraki kullanımlarda anında çalışır."
      : locale === "de"
        ? "Beim ersten Mal werden ~14 MB Modell heruntergeladen, danach läuft alles sofort."
        : locale === "ar"
          ? "في المرة الأولى يُنزَّل نموذج بحجم ~14 ميجابايت، ثم يعمل فوراً لاحقاً."
          : "On first run, a ~14 MB model downloads to your browser. Cached for next time.";

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);
    setProgress(0);
    setPhase("loading model");

    const { removeBackground } = await import("@imgly/background-removal");

    const out: ResultEntry[] = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      setPhase(`processing ${i + 1}/${files.length}`);
      const result = await removeBackground(file, {
        progress: (key, current, total) => {
          if (total) setProgress(Math.round((current / total) * 100));
        }
      });
      out.push({
        blob: result,
        filename: inferOutputName(file.name, "-no-bg", "png")
      });
      setProgress(0);
    }

    setResults(out);
    setBusy(false);
    setPhase("");
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <p className="ws-tool-privacy" style={{ background: "rgba(200, 162, 71, 0.1)", color: "var(--copper)" }}>
        {modelHint}
      </p>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={run} disabled={files.length === 0 || busy}>
          {busy ? <Loader2 className="ws-spin" size={16} /> : <Wand2 size={16} />}
          {busy ? `${ui.processing} ${phase} ${progress}%` : ui.process}
        </button>
        {(files.length > 0 || results.length > 0) && (
          <button type="button" className="ws-button ws-button-ghost" onClick={() => { setFiles([]); setResults([]); }} disabled={busy}>
            {ui.reset}
          </button>
        )}
      </div>

      <ResultGrid locale={locale} results={results} />
    </>
  );
}
