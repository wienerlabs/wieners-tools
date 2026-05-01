"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, Select, TextInput } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

type Mode = "single" | "ranges";

function parseRanges(input: string, total: number): number[][] {
  return input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [a, b] = part.split("-").map((s) => s.trim());
      const start = Math.max(1, parseInt(a, 10) || 1);
      const end = b === undefined ? start : b === "" ? total : Math.min(total, parseInt(b, 10) || total);
      const range: number[] = [];
      for (let p = start; p <= end; p++) range.push(p - 1);
      return range;
    })
    .filter((r) => r.length > 0);
}

export default function PdfSplitTool({
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
  const [mode, setMode] = useState<Mode>("single");
  const [ranges, setRanges] = useState("1-3, 5, 8-");
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

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

  const split = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const buf = await file.arrayBuffer();
      const src = await PDFDocument.load(buf);
      const total = src.getPageCount();
      const groups = mode === "single" ? Array.from({ length: total }, (_, i) => [i]) : parseRanges(ranges, total);
      const baseName = file.name.replace(/\.pdf$/i, "");
      let idx = 1;
      for (const group of groups) {
        const out = await PDFDocument.create();
        const pages = await out.copyPages(src, group);
        pages.forEach((p) => out.addPage(p));
        const bytes = await out.save();
        const buffer = bytes.slice().buffer as ArrayBuffer;
        const label = group.length === 1 ? `${group[0] + 1}` : `${group[0] + 1}-${group[group.length - 1] + 1}`;
        downloadBlob(new Blob([buffer], { type: "application/pdf" }), `${baseName}-${label}.pdf`);
        idx++;
      }
      void idx;
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.mode ?? "Mode"}>
          <Select<Mode>
            value={mode}
            options={[
              { value: "single", label: "Each page → file" },
              { value: "ranges", label: "Custom ranges" }
            ]}
            onChange={setMode}
          />
        </FieldRow>
        {mode === "ranges" ? (
          <FieldRow label={opt.ranges ?? "Ranges"} hint="e.g. 1-3, 5, 8-">
            <TextInput value={ranges} onChange={setRanges} placeholder="1-3, 5, 8-" />
          </FieldRow>
        ) : null}
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
        <button type="button" className="ws-button ws-button-ghost" onClick={split} disabled={!file || busy}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? ui.processing : ui.download}
        </button>
      </div>

      {file ? (
        <p className="ws-text-io-note">
          {file.name} · {pageCount ?? "—"} sayfa
        </p>
      ) : (
        <p className="ws-text-io-note">{ui.dropHint}</p>
      )}
    </>
  );
}
