"use client";

import { useRef, useState } from "react";
import { Check, Copy, Download, Loader2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

type TextItem = { str: string; transform?: number[] };

export default function PdfTextExtractTool({
  locale
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const onFile = async (f: File | null) => {
    setFile(f);
    setText("");
    if (!f) return;
    setBusy(true);
    try {
      const pdfjs = await import("pdfjs-dist");
      const lib = pdfjs as unknown as {
        GlobalWorkerOptions: { workerSrc: string };
        version: string;
        getDocument: (opts: { data: ArrayBuffer }) => { promise: Promise<{ numPages: number; getPage: (n: number) => Promise<{ getTextContent: () => Promise<{ items: TextItem[] }> }> }> };
      };
      lib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${lib.version}/pdf.worker.min.mjs`;

      const buf = await f.arrayBuffer();
      const doc = await lib.getDocument({ data: buf }).promise;
      const out: string[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const tc = await page.getTextContent();
        const items = tc.items as TextItem[];
        let lastY: number | null = null;
        let line: string[] = [];
        for (const item of items) {
          const y = item.transform?.[5] ?? 0;
          if (lastY !== null && Math.abs(y - lastY) > 1) {
            out.push(line.join(" "));
            line = [];
          }
          line.push(item.str);
          lastY = y;
        }
        if (line.length) out.push(line.join(" "));
        out.push("");
      }
      setText(out.join("\n").trim());
    } finally {
      setBusy(false);
    }
  };

  const onCopy = async () => {
    if (!text) return;
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  const onDownload = () => {
    if (!text || !file) return;
    downloadBlob(new Blob([text], { type: "text/plain" }), file.name.replace(/\.pdf$/i, ".txt"));
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
        <button type="button" className="ws-button ws-button-ghost" onClick={onCopy} disabled={!text}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button type="button" className="ws-button ws-button-ghost" onClick={onDownload} disabled={!text}>
          <Download size={14} /> .txt
        </button>
      </div>

      {busy ? (
        <p className="ws-text-io-note"><Loader2 className="ws-spin" size={14} /> {ui.processing}</p>
      ) : !file ? (
        <p className="ws-text-io-note">{ui.dropHint}</p>
      ) : (
        <textarea
          className="ws-textarea ws-textarea-mono"
          value={text}
          readOnly
          rows={20}
          spellCheck={false}
        />
      )}
    </>
  );
}
