"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { JobNotice } from "@/components/job-notice";
import { OptionsPanel, FieldRow, TextInput, Toggle } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { pdfBlob } from "@/lib/pdf-tools";
import { runQpdf } from "@/lib/qpdf";
import { inferOutputName } from "@/lib/tools/utils";
import { useFileJob } from "@/lib/tools/use-file-job";

function randomSecret() {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export default function PdfProtectTool({ locale, tool, i18n }: { locale: Locale; tool: ToolDefinition; i18n: ToolI18n }) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const job = useFileJob();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [allowPrint, setAllowPrint] = useState(true);
  const [allowCopy, setAllowCopy] = useState(true);
  const [allowEdit, setAllowEdit] = useState(true);

  const mismatch = confirm.length > 0 && confirm !== password;
  const ready = job.files.length > 0 && password.length > 0 && password === confirm && !job.busy;

  const process = () =>
    job.run(async (file) => {
      const restricted = !allowPrint || !allowCopy || !allowEdit;
      const owner = restricted ? randomSecret() : password;
      const limits = [
        ...(allowPrint ? [] : ["--print=none"]),
        ...(allowCopy ? [] : ["--extract=n"]),
        ...(allowEdit ? [] : ["--modify=none"])
      ];
      const { bytes } = await runQpdf(new Uint8Array(await file.arrayBuffer()), (input, output) => [
        "--encrypt",
        password,
        owner,
        "256",
        ...limits,
        "--",
        input,
        output
      ]);
      return [{ blob: pdfBlob(bytes), filename: inferOutputName(file.name, "-protected", "pdf") }];
    });

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} files={job.files} onChange={job.setFiles} />

      <OptionsPanel>
        <FieldRow label={opt.password ?? "Password"}>
          <TextInput type="password" autoComplete="new-password" value={password} onChange={setPassword} />
        </FieldRow>
        <FieldRow label={opt.confirm ?? "Repeat password"} hint={mismatch ? opt.mismatch ?? "The passwords do not match." : undefined}>
          <TextInput type="password" autoComplete="new-password" value={confirm} onChange={setConfirm} />
        </FieldRow>
        <FieldRow label={opt.printing ?? "Printing"}>
          <Toggle value={allowPrint} onChange={setAllowPrint} label={opt.allowPrint ?? "Allow printing"} />
        </FieldRow>
        <FieldRow label={opt.copying ?? "Copying"}>
          <Toggle value={allowCopy} onChange={setAllowCopy} label={opt.allowCopy ?? "Allow copying text"} />
        </FieldRow>
        <FieldRow label={opt.editing ?? "Editing"}>
          <Toggle value={allowEdit} onChange={setAllowEdit} label={opt.allowEdit ?? "Allow editing"} />
        </FieldRow>
      </OptionsPanel>

      <p className="ws-notice">{opt.keepSafe ?? "Keep the password somewhere safe. A lost password cannot be recovered."}</p>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={process} disabled={!ready}>
          {job.busy ? <Loader2 className="ws-spin" size={16} /> : <Lock size={16} />}
          {job.busy ? ui.processing : ui.process}
        </button>
      </div>

      <JobNotice locale={locale} error={job.error} />
      <ResultGrid locale={locale} results={job.results} />
    </>
  );
}
