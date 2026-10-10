"use client";

import { useEffect, useRef, useState } from "react";
import { Eraser, Loader2, Signature } from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { Dropzone } from "@/components/dropzone";
import { JobNotice } from "@/components/job-notice";
import { OptionsPanel, FieldRow, NumberInput, Select, Slider } from "@/components/options-panel";
import { ResultGrid } from "@/components/result-grid";
import { content } from "@/lib/content";
import { pdfBlob, visualFrame } from "@/lib/pdf-tools";
import { openPdfJs, renderPagePreview } from "@/lib/pdf-preview";
import { canvasToBlob, inferOutputName } from "@/lib/tools/utils";
import { useFileJob } from "@/lib/tools/use-file-job";

type Source = "draw" | "upload";

function trimCanvas(source: HTMLCanvasElement) {
  const ctx = source.getContext("2d");
  if (!ctx) return null;
  const { width, height } = source;
  const pixels = ctx.getImageData(0, 0, width, height).data;
  let top = height;
  let left = width;
  let right = -1;
  let bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (pixels[(y * width + x) * 4 + 3] === 0) continue;
      if (x < left) left = x;
      if (x > right) right = x;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
    }
  }
  if (right < 0) return null;
  const pad = 8;
  const out = document.createElement("canvas");
  out.width = right - left + pad * 2;
  out.height = bottom - top + pad * 2;
  out.getContext("2d")?.drawImage(source, left - pad, top - pad, out.width, out.height, 0, 0, out.width, out.height);
  return out;
}

function SignaturePad({ onChange, clearLabel }: { onChange: (blob: Blob | null) => void; clearLabel: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = Math.max(2, window.devicePixelRatio || 1);
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.6;
    ctx.strokeStyle = "#101828";
  }, []);

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const stroke = (to: { x: number; y: number }) => {
    const ctx = canvasRef.current?.getContext("2d");
    const from = last.current;
    if (!ctx || !from) return;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    last.current = to;
  };

  const finish = async () => {
    if (!last.current) return;
    last.current = null;
    const trimmed = canvasRef.current ? trimCanvas(canvasRef.current) : null;
    onChange(trimmed ? await canvasToBlob(trimmed, "image/png") : null);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    onChange(null);
  };

  return (
    <div className="ws-sign-pad">
      <canvas
        ref={canvasRef}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          last.current = point(event);
          stroke({ x: last.current.x + 0.1, y: last.current.y + 0.1 });
        }}
        onPointerMove={(event) => {
          if (last.current) stroke(point(event));
        }}
        onPointerUp={finish}
        onPointerCancel={finish}
      />
      <button type="button" className="ws-button ws-button-ghost" onClick={clear}>
        <Eraser size={14} /> {clearLabel}
      </button>
    </div>
  );
}

export default function PdfSignTool({ locale, tool, i18n }: { locale: Locale; tool: ToolDefinition; i18n: ToolI18n }) {
  const ui = content[locale].workbench;
  const opt = i18n.options ?? {};
  const job = useFileJob();
  const [source, setSource] = useState<Source>("draw");
  const [signature, setSignature] = useState<Blob | null>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<unknown>(null);
  const [spot, setSpot] = useState({ x: 0.75, y: 0.85 });
  const [width, setWidth] = useState(0.28);

  const urlRef = useRef<string | null>(null);

  const updateSignature = (blob: Blob | null) => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = blob ? URL.createObjectURL(blob) : null;
    setSignature(blob);
    setSignatureUrl(urlRef.current);
  };

  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    []
  );

  const onFiles = (next: File[]) => {
    job.setFiles(next);
    setPdf(null);
    setPreview(null);
    setPreviewError(null);
  };

  useEffect(() => {
    const file = job.files[0];
    if (!file) return;
    let cancelled = false;
    file
      .arrayBuffer()
      .then(openPdfJs)
      .then((doc) => {
        if (cancelled) return;
        setPdf(doc);
        setPageNumber(doc.numPages);
      })
      .catch((error) => !cancelled && setPreviewError(error));
    return () => {
      cancelled = true;
    };
  }, [job.files]);

  useEffect(() => {
    if (!pdf) return;
    let cancelled = false;
    renderPagePreview(pdf, Math.min(Math.max(1, pageNumber), pdf.numPages), 640)
      .then((url) => !cancelled && setPreview(url))
      .catch((error) => !cancelled && setPreviewError(error));
    return () => {
      cancelled = true;
    };
  }, [pdf, pageNumber]);

  const place = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSpot({ x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height });
  };

  const process = () =>
    job.run(async (file) => {
      if (!signature) return [];
      const { PDFDocument, degrees } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const bytes = new Uint8Array(await signature.arrayBuffer());
      const image = signature.type === "image/jpeg" ? await doc.embedJpg(bytes) : await doc.embedPng(bytes);
      const page = doc.getPage(Math.min(Math.max(1, pageNumber), doc.getPageCount()) - 1);
      const frame = visualFrame(page);
      const w = frame.width * width;
      const h = w * (image.height / image.width);
      const origin = frame.toUser(spot.x * frame.width - w / 2, (1 - spot.y) * frame.height - h / 2);
      page.drawImage(image, { x: origin.x, y: origin.y, width: w, height: h, rotate: degrees(frame.angle) });
      return [{ blob: pdfBlob(await doc.save()), filename: inferOutputName(file.name, "-signed", "pdf") }];
    });

  return (
    <>
      <Dropzone locale={locale} accept={tool.accept} files={job.files} onChange={onFiles} />

      <OptionsPanel>
        <FieldRow label={opt.source ?? "Signature"}>
          <Select<Source>
            value={source}
            options={[
              { value: "draw", label: opt.draw ?? "Draw it" },
              { value: "upload", label: opt.upload ?? "Upload an image" }
            ]}
            onChange={(next) => {
              setSource(next);
              updateSignature(null);
            }}
          />
        </FieldRow>
        <FieldRow label={opt.page ?? "Page"}>
          <NumberInput value={pageNumber} min={1} max={pdf?.numPages ?? 1} onChange={(value) => setPageNumber(Math.round(value) || 1)} />
        </FieldRow>
        <FieldRow label={opt.width ?? "Width"}>
          <Slider value={width} min={0.1} max={0.6} step={0.01} onChange={setWidth} format={(v) => `${Math.round(v * 100)}%`} />
        </FieldRow>
      </OptionsPanel>

      {source === "draw" ? (
        <SignaturePad onChange={updateSignature} clearLabel={opt.clear ?? "Clear"} />
      ) : (
        <input
          className="ws-text-input"
          type="file"
          accept="image/png,image/jpeg"
          onChange={(event) => updateSignature(event.target.files?.[0] ?? null)}
        />
      )}

      {preview ? (
        <>
          <p className="ws-field-hint">{opt.placeHint ?? "Click on the page to place the signature."}</p>
          <div className="ws-sign-stage" onClick={place}>
            <img src={preview} alt="" draggable={false} />
            {signatureUrl ? (
              <img
                className="ws-sign-mark"
                src={signatureUrl}
                alt=""
                draggable={false}
                style={{ left: `${spot.x * 100}%`, top: `${spot.y * 100}%`, width: `${width * 100}%` }}
              />
            ) : null}
          </div>
        </>
      ) : null}

      <p className="ws-notice">{opt.legal ?? "This places an image of your signature. It is not a certificate-based digital signature."}</p>

      <div className="ws-actions">
        <button type="button" className="ws-button ws-button-primary" onClick={process} disabled={!signature || !pdf || job.busy}>
          {job.busy ? <Loader2 className="ws-spin" size={16} /> : <Signature size={16} />}
          {job.busy ? ui.processing : ui.process}
        </button>
      </div>

      <JobNotice locale={locale} error={job.error ?? previewError} />
      <ResultGrid locale={locale} results={job.results} />
    </>
  );
}
