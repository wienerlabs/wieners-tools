"use client";

import { useState } from "react";
import { ListOrdered, Loader2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { JobNotice } from "@/components/job-notice";
import { OptionsPanel, FieldRow, NumberInput, Select, Slider, TextInput } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { createStamper, parsePages, pdfBlob } from "@/lib/pdf-tools";
import { inferOutputName } from "@/lib/tools/utils";
import { useFileJob } from "@/lib/tools/use-file-job";

type Position = "bottom-center" | "bottom-right" | "bottom-left" | "top-center" | "top-right" | "top-left";
type Format = "number" | "fraction" | "words";

export default function PdfPageNumbersTool({ locale, tool, i18n }: { locale: Locale; tool: ToolDefinition; i18n: ToolI18n }) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const job = useFileJob();
  const [position, setPosition] = useState<Position>("bottom-center");
  const [format, setFormat] = useState<Format>("fraction");
  const [start, setStart] = useState(1);
  const [pages, setPages] = useState("");
  const [size, setSize] = useState(11);
  const [margin, setMargin] = useState(28);

  const label = (n: number, total: number) => {
    if (format === "number") return String(n);
    if (format === "fraction") return `${n} / ${total}`;
    return (opt.wordsTemplate ?? "Page {n} of {total}").replace("{n}", String(n)).replace("{total}", String(total));
  };

  const process = () =>
    job.run(async (file) => {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const stamp = await createStamper(doc);
      const targets = parsePages(pages, doc.getPageCount());
      const total = start + targets.length - 1;
      for (const [i, index] of targets.entries()) {
        await stamp(doc.getPage(index), label(start + i, total), { size, color: "#1f2937", opacity: 1, angle: 0 }, (frame, w, h) => ({
          cx: position.endsWith("left") ? margin + w / 2 : position.endsWith("right") ? frame.width - margin - w / 2 : frame.width / 2,
          cy: position.startsWith("top") ? frame.height - margin - h / 2 : margin + h / 2
        }));
      }
      return [{ blob: pdfBlob(await doc.save()), filename: inferOutputName(file.name, "-numbered", "pdf") }];
    });

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} files={job.files} onChange={job.setFiles} />

      <OptionsPanel>
        <FieldRow label={opt.position ?? "Position"}>
          <Select<Position>
            value={position}
            options={[
              { value: "bottom-center", label: opt.bottomCenter ?? "Bottom center" },
              { value: "bottom-right", label: opt.bottomRight ?? "Bottom right" },
              { value: "bottom-left", label: opt.bottomLeft ?? "Bottom left" },
              { value: "top-center", label: opt.topCenter ?? "Top center" },
              { value: "top-right", label: opt.topRight ?? "Top right" },
              { value: "top-left", label: opt.topLeft ?? "Top left" }
            ]}
            onChange={setPosition}
          />
        </FieldRow>
        <FieldRow label={opt.format ?? "Format"}>
          <Select<Format>
            value={format}
            options={[
              { value: "number", label: "1" },
              { value: "fraction", label: "1 / 12" },
              { value: "words", label: (opt.wordsTemplate ?? "Page {n} of {total}").replace("{n}", "1").replace("{total}", "12") }
            ]}
            onChange={setFormat}
          />
        </FieldRow>
        <FieldRow label={opt.start ?? "First number"}>
          <NumberInput value={start} min={0} max={99999} onChange={(value) => setStart(Math.max(0, Math.round(value) || 0))} />
        </FieldRow>
        <FieldRow label={opt.pages ?? "Pages"} hint={opt.pagesHint ?? "Empty means every page. Example: 2- skips the cover."}>
          <TextInput value={pages} onChange={setPages} placeholder="1-3, 5, 8-" />
        </FieldRow>
        <FieldRow label={opt.size ?? "Font size"}>
          <Slider value={size} min={6} max={36} onChange={setSize} format={(v) => `${v} pt`} />
        </FieldRow>
        <FieldRow label={opt.margin ?? "Margin"}>
          <Slider value={margin} min={8} max={96} onChange={setMargin} format={(v) => `${v} pt`} />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={process} disabled={job.files.length === 0 || job.busy}>
          {job.busy ? <Loader2 className="ws-spin" size={16} /> : <ListOrdered size={16} />}
          {job.busy ? ui.processing : ui.process}
        </button>
      </div>

      <JobNotice locale={locale} error={job.error} />
      <ResultGrid locale={locale} results={job.results} />
    </>
  );
}
