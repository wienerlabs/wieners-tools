"use client";

import { useEffect, useState } from "react";
import { FormInput, Loader2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { JobNotice } from "@/components/job-notice";
import { OptionsPanel, FieldRow, Select, TextArea, TextInput, Toggle } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { pdfBlob } from "@/lib/pdf-tools";
import { inferOutputName } from "@/lib/tools/utils";
import { useFileJob } from "@/lib/tools/use-file-job";

type FieldKind = "text" | "multiline" | "check" | "choice";
type FormField = { name: string; kind: FieldKind; options: string[] };
type Values = Record<string, string | boolean>;

async function readFields(file: File) {
  const lib = await import("pdf-lib");
  const doc = await lib.PDFDocument.load(await file.arrayBuffer());
  const fields: FormField[] = [];
  const values: Values = {};
  for (const field of doc.getForm().getFields()) {
    const name = field.getName();
    if (field instanceof lib.PDFTextField) {
      fields.push({ name, kind: field.isMultiline() ? "multiline" : "text", options: [] });
      values[name] = field.getText() ?? "";
    } else if (field instanceof lib.PDFCheckBox) {
      fields.push({ name, kind: "check", options: [] });
      values[name] = field.isChecked();
    } else if (field instanceof lib.PDFDropdown || field instanceof lib.PDFOptionList) {
      fields.push({ name, kind: "choice", options: field.getOptions() });
      values[name] = field.getSelected()[0] ?? "";
    } else if (field instanceof lib.PDFRadioGroup) {
      fields.push({ name, kind: "choice", options: field.getOptions() });
      values[name] = field.getSelected() ?? "";
    }
  }
  return { fields, values };
}

type PdfLib = typeof import("pdf-lib");

function applyValues(lib: PdfLib, form: import("pdf-lib").PDFForm, values: Values) {
  for (const field of form.getFields()) {
    const value = values[field.getName()];
    if (value === undefined) continue;
    if (field instanceof lib.PDFTextField) {
      field.setText(String(value) || undefined);
    } else if (field instanceof lib.PDFCheckBox) {
      if (value) field.check();
      else field.uncheck();
    } else if ((field instanceof lib.PDFDropdown || field instanceof lib.PDFOptionList || field instanceof lib.PDFRadioGroup) && value) {
      field.select(String(value));
    }
  }
}

export default function PdfFormFillTool({ locale, tool, i18n }: { locale: Locale; tool: ToolDefinition; i18n: ToolI18n }) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const job = useFileJob();
  const [fields, setFields] = useState<FormField[] | null>(null);
  const [values, setValues] = useState<Values>({});
  const [flatten, setFlatten] = useState(false);
  const [loadError, setLoadError] = useState<unknown>(null);
  const [kept, setKept] = useState(false);

  const onFiles = (next: File[]) => {
    job.setFiles(next);
    setFields(null);
    setValues({});
    setLoadError(null);
    setKept(false);
  };

  useEffect(() => {
    const file = job.files[0];
    if (!file) return;
    let cancelled = false;
    readFields(file)
      .then((result) => {
        if (cancelled) return;
        setFields(result.fields);
        setValues(result.values);
      })
      .catch((error) => !cancelled && setLoadError(error));
    return () => {
      cancelled = true;
    };
  }, [job.files]);

  const set = (name: string, value: string | boolean) => setValues((current) => ({ ...current, [name]: value }));

  const process = () =>
    job.run(async (file) => {
      const lib = await import("pdf-lib");
      const doc = await lib.PDFDocument.load(await file.arrayBuffer());
      const form = doc.getForm();
      applyValues(lib, form, values);

      let bytes: Uint8Array;
      try {
        if (flatten) form.flatten();
        bytes = await doc.save();
        setKept(false);
      } catch {
        const retry = await lib.PDFDocument.load(await file.arrayBuffer());
        const retryForm = retry.getForm();
        applyValues(lib, retryForm, values);
        retryForm.acroForm.dict.set(lib.PDFName.of("NeedAppearances"), lib.PDFBool.True);
        bytes = await retry.save({ updateFieldAppearances: false });
        setKept(true);
      }
      return [{ blob: pdfBlob(bytes), filename: inferOutputName(file.name, "-filled", "pdf") }];
    });

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} files={job.files} onChange={onFiles} />

      {fields && fields.length === 0 ? <p className="ws-notice">{opt.noFields ?? "This PDF has no fillable form fields."}</p> : null}

      {fields && fields.length > 0 ? (
        <OptionsPanel title={(opt.fieldCount ?? "{count} fields").replace("{count}", String(fields.length))}>
          {fields.map((field) => (
            <FieldRow key={field.name} label={field.name}>
              {field.kind === "text" ? (
                <TextInput value={String(values[field.name] ?? "")} onChange={(value) => set(field.name, value)} />
              ) : field.kind === "multiline" ? (
                <TextArea value={String(values[field.name] ?? "")} onChange={(value) => set(field.name, value)} rows={3} />
              ) : field.kind === "check" ? (
                <Toggle value={Boolean(values[field.name])} onChange={(value) => set(field.name, value)} label={opt.checked ?? "Checked"} />
              ) : (
                <Select<string>
                  value={String(values[field.name] ?? "")}
                  options={[{ value: "", label: "" }, ...field.options.map((option) => ({ value: option, label: option }))]}
                  onChange={(value) => set(field.name, value)}
                />
              )}
            </FieldRow>
          ))}
          <FieldRow label={opt.finish ?? "When saving"}>
            <Toggle value={flatten} onChange={setFlatten} label={opt.flatten ?? "Flatten, so fields can no longer be edited"} />
          </FieldRow>
        </OptionsPanel>
      ) : null}

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={process} disabled={!fields || fields.length === 0 || job.busy}>
          {job.busy ? <Loader2 className="ws-spin" size={16} /> : <FormInput size={16} />}
          {job.busy ? ui.processing : ui.process}
        </button>
      </div>

      {kept && job.results.length > 0 ? (
        <p className="ws-notice" data-tone="warn">
          {opt.keptEditable ?? "Some characters need the viewer's own font, so the fields stay editable and the viewer draws the text. Most PDF viewers show it correctly."}
        </p>
      ) : null}

      <JobNotice locale={locale} error={job.error ?? loadError} />
      <ResultGrid locale={locale} results={job.results} />
    </>
  );
}
