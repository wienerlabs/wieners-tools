"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileUp, FilePlus2, Trash2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { content } from "@/lib/content";

type DropzoneProps = {
  locale: Locale;
  accept: string;
  multiple?: boolean;
  files: File[];
  onChange: (files: File[]) => void;
  maxSizeMB?: number;
  pasteEnabled?: boolean;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function Dropzone({
  locale,
  accept,
  multiple = false,
  files,
  onChange,
  maxSizeMB,
  pasteEnabled = true
}: DropzoneProps) {
  const ui = content[locale].workbench;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filterAndAccept = useCallback(
    (incoming: File[]) => {
      setError(null);
      const filtered: File[] = [];
      for (const file of incoming) {
        if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
          setError(`${file.name}: > ${maxSizeMB} MB`);
          continue;
        }
        filtered.push(file);
      }
      const next = multiple ? [...files, ...filtered] : filtered.slice(0, 1);
      onChange(next);
    },
    [files, multiple, maxSizeMB, onChange]
  );

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files.length > 0) {
      filterAndAccept(Array.from(event.dataTransfer.files));
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      filterAndAccept(Array.from(event.target.files));
      event.target.value = "";
    }
  };

  useEffect(() => {
    if (!pasteEnabled) return;
    const onPaste = (event: ClipboardEvent) => {
      if (!event.clipboardData) return;
      const pasted: File[] = [];
      for (const item of Array.from(event.clipboardData.items)) {
        if (item.kind === "file") {
          const f = item.getAsFile();
          if (f) pasted.push(f);
        }
      }
      if (pasted.length > 0) {
        filterAndAccept(pasted);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [pasteEnabled, filterAndAccept]);

  const removeFile = (index: number) => {
    const next = files.slice();
    next.splice(index, 1);
    onChange(next);
  };

  return (
    <div className="ws-dropzone-wrap">
      <div
        className={`ws-dropzone ${dragActive ? "is-active" : ""}`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <FileUp size={28} strokeWidth={1.5} aria-hidden="true" />
        <p className="ws-dropzone-title">{ui.dropTitle}</p>
        <p className="ws-dropzone-hint">{ui.dropHint}</p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleSelect}
          hidden
        />
      </div>

      {error ? <p className="ws-dropzone-error">{error}</p> : null}

      {files.length > 0 ? (
        <div className="ws-file-list">
          {files.map((file, index) => (
            <div className="ws-file-row" key={`${file.name}-${index}-${file.size}`}>
              <span className="ws-file-name">{file.name}</span>
              <span className="ws-file-size">{formatBytes(file.size)}</span>
              <button
                type="button"
                className="ws-file-remove"
                aria-label="Remove"
                onClick={() => removeFile(index)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {multiple ? (
            <button
              type="button"
              className="ws-file-add"
              onClick={() => inputRef.current?.click()}
            >
              <FilePlus2 size={14} /> {ui.addMore}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
