"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, Download, Loader2, Trash2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

export default function PdfReorderTool({
  locale
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);

  const onFile = async (f: File | null) => {
    setFile(f);
    if (!f) {
      setOrder([]);
      return;
    }
    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setOrder(doc.getPageIndices());
  };

  const move = (from: number, dir: -1 | 1) => {
    setOrder((prev) => {
      const clone = prev.slice();
      const to = from + dir;
      if (to < 0 || to >= clone.length) return prev;
      [clone[from], clone[to]] = [clone[to], clone[from]];
      return clone;
    });
  };
  const remove = (idx: number) => setOrder((prev) => prev.filter((_, i) => i !== idx));
  const reset = () => {
    if (!file) return;
    onFile(file);
  };

  const exportFile = async () => {
    if (!file || order.length === 0) return;
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const buf = await file.arrayBuffer();
      const src = await PDFDocument.load(buf);
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, order);
      pages.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      const buffer = bytes.slice().buffer as ArrayBuffer;
      downloadBlob(new Blob([buffer], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, "-reordered.pdf"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
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
        <button type="button" className="ws-button ws-button-ghost" onClick={reset} disabled={!file}>
          {ui.reset}
        </button>
        <button type="button" className="ws-button ws-button-ghost" onClick={exportFile} disabled={!file || order.length === 0 || busy}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? ui.processing : ui.download}
        </button>
      </div>

      {!file ? (
        <p className="ws-text-io-note">{ui.dropHint}</p>
      ) : (
        <ol className="ws-pdf-list">
          {order.map((pageIdx, i) => (
            <li key={`${pageIdx}-${i}`} className="ws-pdf-row">
              <span className="ws-pdf-row-name">Page {pageIdx + 1}</span>
              <span className="ws-pdf-row-meta">position #{i + 1}</span>
              <div className="ws-pdf-row-actions">
                <button type="button" className="ws-icon-button" disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp size={14} /></button>
                <button type="button" className="ws-icon-button" disabled={i === order.length - 1} onClick={() => move(i, 1)}><ArrowDown size={14} /></button>
                <button type="button" className="ws-icon-button" onClick={() => remove(i)}><Trash2 size={14} /></button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
