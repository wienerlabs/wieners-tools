"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, Download, Loader2, Plus, Trash2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

type Item = { id: string; file: File; pages: number | null };

export default function PdfMergeTool({
  locale
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);

  const addFiles = async (list: FileList | null) => {
    if (!list) return;
    const next: Item[] = [];
    const { PDFDocument } = await import("pdf-lib");
    for (const file of Array.from(list)) {
      try {
        const buf = await file.arrayBuffer();
        const doc = await PDFDocument.load(buf);
        next.push({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file,
          pages: doc.getPageCount()
        });
      } catch {
        next.push({
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file,
          pages: null
        });
      }
    }
    setItems((prev) => [...prev, ...next]);
  };

  const move = (idx: number, dir: -1 | 1) => {
    setItems((prev) => {
      const clone = prev.slice();
      const target = idx + dir;
      if (target < 0 || target >= clone.length) return prev;
      [clone[idx], clone[target]] = [clone[target], clone[idx]];
      return clone;
    });
  };
  const remove = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const merge = async () => {
    if (items.length < 2) return;
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const item of items) {
        const buf = await item.file.arrayBuffer();
        const src = await PDFDocument.load(buf);
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const bytes = await out.save();
      const buffer = bytes.slice().buffer as ArrayBuffer;
      downloadBlob(new Blob([buffer], { type: "application/pdf" }), "merged.pdf");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={() => inputRef.current?.click()}>
          <Plus size={14} /> {ui.addMore}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          hidden
          onChange={(e) => addFiles(e.target.files)}
        />
        <button
          type="button"
          className="ws-button ws-button-ghost"
          onClick={merge}
          disabled={items.length < 2 || busy}
        >
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? ui.processing : ui.download}
        </button>
      </div>

      {items.length === 0 ? (
        <p className="ws-text-io-note">{ui.dropHint}</p>
      ) : (
        <ol className="ws-pdf-list">
          {items.map((item, i) => (
            <li key={item.id} className="ws-pdf-row">
              <span className="ws-pdf-row-name">{item.file.name}</span>
              <span className="ws-pdf-row-meta">
                {item.pages != null ? `${item.pages} sayfa` : "—"} · {(item.file.size / 1024).toFixed(0)} KB
              </span>
              <div className="ws-pdf-row-actions">
                <button type="button" className="ws-icon-button" disabled={i === 0} onClick={() => move(i, -1)}>
                  <ArrowUp size={14} />
                </button>
                <button type="button" className="ws-icon-button" disabled={i === items.length - 1} onClick={() => move(i, 1)}>
                  <ArrowDown size={14} />
                </button>
                <button type="button" className="ws-icon-button" onClick={() => remove(i)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
