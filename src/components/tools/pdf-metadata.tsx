"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Upload } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextInput, TextArea } from "@/components/options-panel";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

type Meta = {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  creator: string;
  producer: string;
};

const EMPTY: Meta = { title: "", author: "", subject: "", keywords: "", creator: "", producer: "" };

export default function PdfMetadataTool({
  locale
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const ui = content[locale].workbench;
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<Meta>(EMPTY);
  const [busy, setBusy] = useState(false);

  const onFile = async (f: File | null) => {
    setFile(f);
    if (!f) {
      setMeta(EMPTY);
      return;
    }
    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setMeta({
      title: doc.getTitle() ?? "",
      author: doc.getAuthor() ?? "",
      subject: doc.getSubject() ?? "",
      keywords: (doc.getKeywords() ?? "").toString(),
      creator: doc.getCreator() ?? "",
      producer: doc.getProducer() ?? ""
    });
  };

  const apply = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      doc.setTitle(meta.title);
      doc.setAuthor(meta.author);
      doc.setSubject(meta.subject);
      doc.setKeywords(meta.keywords ? meta.keywords.split(",").map((s) => s.trim()).filter(Boolean) : []);
      doc.setCreator(meta.creator);
      doc.setProducer(meta.producer);
      const bytes = await doc.save();
      const buffer = bytes.slice().buffer as ArrayBuffer;
      downloadBlob(new Blob([buffer], { type: "application/pdf" }), file.name.replace(/\.pdf$/i, "-meta.pdf"));
    } finally {
      setBusy(false);
    }
  };

  const set = <K extends keyof Meta>(key: K) => (value: string) => setMeta((prev) => ({ ...prev, [key]: value }));

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
        <button type="button" className="ws-button ws-button-ghost" onClick={apply} disabled={!file || busy}>
          {busy ? <Loader2 className="ws-spin" size={14} /> : <Download size={14} />}
          {busy ? ui.processing : ui.download}
        </button>
      </div>

      <OptionsPanel>
        <FieldRow label="Title">
          <TextInput value={meta.title} onChange={set("title")} />
        </FieldRow>
        <FieldRow label="Author">
          <TextInput value={meta.author} onChange={set("author")} />
        </FieldRow>
        <FieldRow label="Subject">
          <TextInput value={meta.subject} onChange={set("subject")} />
        </FieldRow>
        <FieldRow label="Keywords" hint="comma separated">
          <TextInput value={meta.keywords} onChange={set("keywords")} />
        </FieldRow>
        <FieldRow label="Creator">
          <TextInput value={meta.creator} onChange={set("creator")} />
        </FieldRow>
        <FieldRow label="Producer">
          <TextArea value={meta.producer} onChange={set("producer")} rows={2} />
        </FieldRow>
      </OptionsPanel>
    </>
  );
}
