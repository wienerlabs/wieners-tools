import type { PDFDocumentProxy } from "pdfjs-dist";

export async function openPdfJs(data: ArrayBuffer): Promise<PDFDocumentProxy> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
  try {
    return await pdfjs.getDocument({ data: data.slice(0) }).promise;
  } catch (error) {
    if ((error as { name?: string }).name === "PasswordException") throw new Error("This PDF is encrypted.");
    throw error;
  }
}

export async function renderPagePreview(doc: PDFDocumentProxy, pageNumber: number, cssWidth: number) {
  const page = await doc.getPage(pageNumber);
  const base = page.getViewport({ scale: 1 });
  const scale = (cssWidth * Math.min(2, window.devicePixelRatio || 1)) / base.width;
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas-2d-unavailable");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvas, canvasContext: ctx, viewport } as Parameters<typeof page.render>[0]).promise;
  return canvas.toDataURL("image/png");
}
