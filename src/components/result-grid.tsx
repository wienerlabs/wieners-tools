"use client";

import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { content } from "@/lib/content";
import { downloadBlob } from "@/lib/tools/utils";

type ResultBlob = {
  blob: Blob;
  filename: string;
  meta?: Record<string, string | number>;
};

type ResultGridProps = {
  locale: Locale;
  results: ResultBlob[];
};

function isImage(blob: Blob) {
  return blob.type.startsWith("image/");
}

export function ResultGrid({ locale, results }: ResultGridProps) {
  const ui = content[locale].workbench;
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const created = results.map((r) => URL.createObjectURL(r.blob));
    setUrls(created);
    return () => {
      created.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [results]);

  const totalBytes = useMemo(() => results.reduce((sum, r) => sum + r.blob.size, 0), [results]);

  if (results.length === 0) return null;

  return (
    <section className="ws-result">
      <header className="ws-result-head">
        <span className="ws-result-count">
          {results.length} {results.length === 1 ? ui.file : ui.files} ·{" "}
          {(totalBytes / 1024 / 1024).toFixed(2)} MB
        </span>
        {results.length > 1 ? (
          <button
            type="button"
            className="ws-button ws-button-ghost"
            onClick={() => results.forEach((r) => downloadBlob(r.blob, r.filename))}
          >
            <Download size={14} /> {ui.downloadAll}
          </button>
        ) : null}
      </header>
      <div className="ws-result-grid">
        {results.map((r, index) => (
          <article key={`${r.filename}-${index}`} className="ws-result-card">
            {isImage(r.blob) ? (
              <div className="ws-result-thumb">
                <img src={urls[index]} alt={r.filename} />
              </div>
            ) : (
              <div className="ws-result-thumb is-file">{r.filename.split(".").pop()?.toUpperCase()}</div>
            )}
            <div className="ws-result-info">
              <span className="ws-result-name">{r.filename}</span>
              <span className="ws-result-size">
                {(r.blob.size / 1024).toFixed(1)} KB
                {r.meta?.width && r.meta?.height ? ` · ${r.meta.width}×${r.meta.height}` : ""}
              </span>
            </div>
            <button
              type="button"
              className="ws-button ws-button-primary"
              onClick={() => downloadBlob(r.blob, r.filename)}
            >
              <Download size={14} /> {ui.download}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
