"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select, TextInput } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

type Angle = "90" | "180" | "270";

function parsePages(input: string, total: number): number[] {
  if (!input.trim()) return Array.from({ length: total }, (_, i) => i);
  const set = new Set<number>();
  for (const part of input.split(",")) {
    const t = part.trim();
    if (!t) continue;
    const [a, b] = t.split("-").map((s) => s.trim());
    const start = Math.max(1, parseInt(a, 10) || 1);
    const end = b === undefined ? start : b === "" ? total : Math.min(total, parseInt(b, 10) || total);
    for (let p = start; p <= end; p++) set.add(p - 1);
  }
  return Array.from(set).sort((a, b) => a - b);
}

export default function PdfRotateTool({
  locale,
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<Angle>("90");
  const [pages, setPages] = useState("");
  const [busy, setBusy] = useState(false);
  const [pageCount, setPageCount] = useState<number | null>(null);

  const onFile = async (f: File | null) => {
    setFile(f);
    if (!f) {
      setPageCount(null);
      return;
    }
    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setPageCount(doc.getPageCount());
  };

  const rotate = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const lib = await import("pdf-lib");
      const buf = await file.arrayBuffer();
      const doc = await lib.PDFDocument.load(buf);
      const total = doc.getPageCount();
      const target = parsePages(pages, total);
      const deg = parseInt(angle, 10);
      for (const idx of target) {
        const page = doc.getPage(idx);
        const cur = page.getRotation().angle ?? 0;
        page.setRotation(lib.degrees((cur + deg) % 360));
      }
      const bytes = await doc.save();
      const buffer = bytes.slice().buffer as ArrayBuffer;
      downloadBlob(new Blob([buffer], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, `-rot${deg}.pdf`));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.angle ?? "Angle"}>
          <Select<Angle>
            value={angle}
            options={[
              { value: "90", label: "90°" },
              { value: "180", label: "180°" },
              { value: "270", label: "270°" }
            ]}
            onChange={setAngle}
          />
        </FieldRow>
        <FieldRow label="Pages" hint="empty = all · e.g. 1-3, 5, 8-">
          <TextInput value={pages} onChange={setPages} placeholder="all" />
        </FieldRow>
      </OptionsPanel>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={() => inputRef.current?.click()}>
          <Upload size={14} /> {ui.pickFile}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          hidden
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        <button type="button" className="ws-button ws-button-ghost" onClick={rotate} disabled={!file || busy}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? ui.processing : ui.download}
        </button>
      </div>

      {file ? <p className="ws-text-io-note">{file.name} · {pageCount ?? "—"} sayfa</p> : <p className="ws-text-io-note">{ui.dropHint}</p>}
    </>
  );
}
