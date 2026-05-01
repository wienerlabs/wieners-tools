"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { OptionsPanel, FieldRow, Toggle } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { inferOutputName } from "@/lib/tools/utils";

type ResultEntry = { blob: Blob; filename: string; meta?: Record<string, string | number> };

export default function OptimizeSvgTool({
  locale,
  tool
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const [files, setFiles] = useState<File[]>([]);
  const [removeViewBox, setRemoveViewBox] = useState(false);
  const [removeIds, setRemoveIds] = useState(true);
  const [results, setResults] = useState<ResultEntry[]>([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setResults([]);

    const svgoMod = (await import("svgo/dist/svgo.browser.js")) as unknown as {
      optimize?: (svg: string, opts: Record<string, unknown>) => { data: string };
      default?: { optimize: (svg: string, opts: Record<string, unknown>) => { data: string } };
    };
    const optimize = svgoMod.optimize ?? svgoMod.default?.optimize;
    if (!optimize) throw new Error("svgo unavailable");

    const out: ResultEntry[] = [];
    for (const file of files) {
      const text = await file.text();
      const result = optimize(text, {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: removeViewBox,
                cleanupIds: removeIds ? {} : false
              }
            }
          }
        ]
      });
      const optimised = result.data;
      const blob = new Blob([optimised], { type: "image/svg+xml" });
      out.push({
        blob,
        filename: inferOutputName(file.name, "-min", "svg"),
        meta: { originalSize: text.length, optimisedSize: optimised.length }
      });
    }
    setResults(out);
    setBusy(false);
  };

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} />

      <OptionsPanel>
        <FieldRow label="ViewBox">
          <Toggle value={removeViewBox} onChange={setRemoveViewBox} label="Remove viewBox (smaller, may break scaling)" />
        </FieldRow>
        <FieldRow label="IDs">
          <Toggle value={removeIds} onChange={setRemoveIds} label="Cleanup unused IDs" />
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
