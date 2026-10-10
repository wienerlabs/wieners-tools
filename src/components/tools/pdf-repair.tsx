"use client";

import { useState } from "react";
import { Loader2, Wrench } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { JobNotice } from "@/components/job-notice";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { pdfBlob } from "@/lib/pdf-tools";
import { runQpdf } from "@/lib/qpdf";
import { inferOutputName } from "@/lib/tools/utils";
import { useFileJob } from "@/lib/tools/use-file-job";

export default function PdfRepairTool({ locale, tool, i18n }: { locale: Locale; tool: ToolDefinition; i18n: ToolI18n }) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const job = useFileJob();
  const [warnings, setWarnings] = useState<string[] | null>(null);

  const process = () =>
    job.run(async (file) => {
      setWarnings(null);
      const result = await runQpdf(new Uint8Array(await file.arrayBuffer()), (input, output) => [input, output]);
      setWarnings(result.warnings);
      return [{ blob: pdfBlob(result.bytes), filename: inferOutputName(file.name, "-repaired", "pdf") }];
    });

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} files={job.files} onChange={(next) => { setWarnings(null); job.setFiles(next); }} />

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={process} disabled={job.files.length === 0 || job.busy}>
          {job.busy ? <Loader2 className="ws-spin" size={16} /> : <Wrench size={16} />}
          {job.busy ? ui.processing : ui.process}
        </button>
      </div>

      {warnings !== null && job.results.length > 0 ? (
        <p className="ws-notice" data-tone={warnings.length > 0 ? "warn" : undefined}>
          {warnings.length > 0
            ? (opt.fixed ?? "The file was damaged and has been rebuilt. qpdf reported {count} warnings; open the result and check the pages.").replace(
                "{count}",
                String(warnings.length)
              )
            : opt.clean ?? "No structural problems found. The file was rewritten cleanly."}
        </p>
      ) : null}

      {warnings && warnings.length > 0 && job.results.length > 0 ? (
        <details className="ws-notice-log">
          <summary>{opt.details ?? "Details"}</summary>
          <pre>{warnings.join("\n")}</pre>
        </details>
      ) : null}

      <JobNotice locale={locale} error={job.error} />
      <ResultGrid locale={locale} results={job.results} />
    </>
  );
}
