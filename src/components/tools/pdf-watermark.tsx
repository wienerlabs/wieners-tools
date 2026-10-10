"use client";

import { useState } from "react";
import { Loader2, Stamp } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { JobNotice } from "@/components/job-notice";
import { OptionsPanel, ColorInput, FieldRow, Select, Slider, TextInput } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { createStamper, parsePages, pdfBlob, visualFrame } from "@/lib/pdf-tools";
import { inferOutputName } from "@/lib/tools/utils";
import { useFileJob } from "@/lib/tools/use-file-job";

type Layout = "center" | "tile";

export default function PdfWatermarkTool({ locale, tool, i18n }: { locale: Locale; tool: ToolDefinition; i18n: ToolI18n }) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const job = useFileJob();
  const [text, setText] = useState(opt.defaultText ?? "Confidential");
  const [layout, setLayout] = useState<Layout>("center");
  const [size, setSize] = useState(56);
  const [opacity, setOpacity] = useState(0.18);
  const [angle, setAngle] = useState(45);
  const [color, setColor] = useState("#dc2626");
  const [pages, setPages] = useState("");

  const process = () =>
    job.run(async (file) => {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const stamp = await createStamper(doc);
      const style = { size, color, opacity, angle, bold: true };
      const targets = parsePages(pages, doc.getPageCount());
      for (const index of targets) {
        const page = doc.getPage(index);
        if (layout === "center") {
          await stamp(page, text, style, (frame) => ({ cx: frame.width / 2, cy: frame.height / 2 }));
          continue;
        }
        const frame = visualFrame(page);
        const step = size * 5;
        const cols = Math.ceil(frame.width / step) + 2;
        const rows = Math.ceil(frame.height / (step * 0.6)) + 2;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            await stamp(page, text, style, () => ({ cx: c * step + (r % 2 ? step / 2 : 0), cy: r * step * 0.6 }));
          }
        }
      }
      return [{ blob: pdfBlob(await doc.save()), filename: inferOutputName(file.name, "-watermarked", "pdf") }];
    });

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} files={job.files} onChange={job.setFiles} />

      <OptionsPanel>
        <FieldRow label={opt.text ?? "Text"}>
          <TextInput value={text} onChange={setText} />
        </FieldRow>
        <FieldRow label={opt.layout ?? "Layout"}>
          <Select<Layout>
            value={layout}
            options={[
              { value: "center", label: opt.center ?? "Once, centered" },
              { value: "tile", label: opt.tile ?? "Repeated across the page" }
            ]}
            onChange={setLayout}
          />
        </FieldRow>
        <FieldRow label={opt.size ?? "Font size"}>
          <Slider value={size} min={12} max={140} onChange={setSize} format={(v) => `${v} pt`} />
        </FieldRow>
        <FieldRow label={opt.opacity ?? "Opacity"}>
          <Slider value={opacity} min={0.05} max={1} step={0.01} onChange={setOpacity} format={(v) => `${Math.round(v * 100)}%`} />
        </FieldRow>
        <FieldRow label={opt.angle ?? "Angle"}>
          <Slider value={angle} min={-90} max={90} onChange={setAngle} format={(v) => `${v}°`} />
        </FieldRow>
        <FieldRow label={opt.color ?? "Color"}>
          <ColorInput value={color} onChange={setColor} />
        </FieldRow>
        <FieldRow label={opt.pages ?? "Pages"} hint={opt.pagesHint ?? "Empty means every page. Example: 1-3, 5"}>
          <TextInput value={pages} onChange={setPages} placeholder="1-3, 5, 8-" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button
          type="button"
          className="ws-button ws-button-primary"
          onClick={process}
          disabled={job.files.length === 0 || job.busy || !text.trim()}
        >
          {job.busy ? <Loader2 className="ws-spin" size={16} /> : <Stamp size={16} />}
          {job.busy ? ui.processing : ui.process}
        </button>
      </div>

      <JobNotice locale={locale} error={job.error} />
      <ResultGrid locale={locale} results={job.results} />
    </>
  );
}
