"use client";

import { useState } from "react";
import { Loader2, LockOpen } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { JobNotice } from "@/components/job-notice";
import { OptionsPanel, FieldRow, TextInput } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { pdfBlob } from "@/lib/pdf-tools";
import { runQpdf } from "@/lib/qpdf";
import { inferOutputName } from "@/lib/tools/utils";
import { useFileJob } from "@/lib/tools/use-file-job";

export default function PdfUnlockTool({ locale, tool, i18n }: { locale: Locale; tool: ToolDefinition; i18n: ToolI18n }) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const job = useFileJob();
  const [password, setPassword] = useState("");

  const process = () =>
    job.run(async (file) => {
      const { bytes } = await runQpdf(new Uint8Array(await file.arrayBuffer()), (input, output) => [
        `--password=${password}`,
        "--decrypt",
        input,
        output
      ]);
      return [{ blob: pdfBlob(bytes), filename: inferOutputName(file.name, "-unlocked", "pdf") }];
    });

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} files={job.files} onChange={job.setFiles} />

      <OptionsPanel>
        <FieldRow label={opt.password ?? "Password"} hint={opt.passwordHint ?? "Leave empty if the file opens without a password but blocks printing or copying."}>
          <TextInput type="password" autoComplete="current-password" value={password} onChange={setPassword} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={process} disabled={job.files.length === 0 || job.busy}>
          {job.busy ? <Loader2 className="ws-spin" size={16} /> : <LockOpen size={16} />}
          {job.busy ? ui.processing : ui.process}
        </button>
      </div>

      <JobNotice locale={locale} error={job.error} />
      <ResultGrid locale={locale} results={job.results} />
    </>
  );
}
