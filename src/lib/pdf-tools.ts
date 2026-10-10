import type { PDFDocument, PDFFont, PDFImage, PDFPage } from "pdf-lib";

export function parsePages(input: string, total: number): number[] {
  if (!input.trim()) return Array.from({ length: total }, (_, i) => i);
  const set = new Set<number>();
  for (const part of input.split(",")) {
    const t = part.trim();
    if (!t) continue;
    const [a, b] = t.split("-").map((s) => s.trim());
    const start = Math.max(1, parseInt(a, 10) || 1);
    const end = b === undefined ? start : b === "" ? total : Math.min(total, parseInt(b, 10) || total);
    for (let p = start; p <= end; p++) if (p <= total) set.add(p - 1);
  }
  return Array.from(set).sort((a, b) => a - b);
}

export function pdfBlob(bytes: Uint8Array) {
  return new Blob([bytes.slice().buffer as ArrayBuffer], { type: "application/pdf" });
}

export function isEncryptedPdfError(error: unknown) {
  return error instanceof Error && /encrypted/i.test(error.message);
}

export function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value.padEnd(6, "0");
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255) as [number, number, number];
}

export type VisualFrame = {
  width: number;
  height: number;
  angle: number;
  toUser: (x: number, y: number) => { x: number; y: number };
};

export function visualFrame(page: PDFPage): VisualFrame {
  const { x: bx, y: by, width: w, height: h } = page.getCropBox();
  const rotation = (((page.getRotation().angle ?? 0) % 360) + 360) % 360;
  if (rotation === 90) return { width: h, height: w, angle: 90, toUser: (vx, vy) => ({ x: bx + w - vy, y: by + vx }) };
  if (rotation === 180) return { width: w, height: h, angle: 180, toUser: (vx, vy) => ({ x: bx + w - vx, y: by + h - vy }) };
  if (rotation === 270) return { width: h, height: w, angle: 270, toUser: (vx, vy) => ({ x: bx + vy, y: by + h - vx }) };
  return { width: w, height: h, angle: 0, toUser: (vx, vy) => ({ x: bx + vx, y: by + vy }) };
}

export type StampStyle = {
  size: number;
  color: string;
  opacity: number;
  angle: number;
  bold?: boolean;
};

type Placement = (frame: VisualFrame, width: number, height: number) => { cx: number; cy: number };

function rotate(x: number, y: number, degrees: number) {
  const r = (degrees * Math.PI) / 180;
  return { x: x * Math.cos(r) - y * Math.sin(r), y: x * Math.sin(r) + y * Math.cos(r) };
}

async function textImage(doc: PDFDocument, text: string, style: StampStyle, cache: Map<string, PDFImage>) {
  const key = `${text}|${style.size}|${style.color}|${style.bold}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const scale = 4;
  const fontSpec = `${style.bold ? 600 : 400} ${style.size * scale}px Sora, "IBM Plex Sans Arabic", sans-serif`;
  await document.fonts.load(fontSpec, text);
  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) throw new Error("canvas-2d-unavailable");
  probe.font = fontSpec;
  const width = Math.ceil(probe.measureText(text).width) + 4;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = Math.ceil(style.size * scale * 1.35);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas-2d-unavailable");
  ctx.font = fontSpec;
  ctx.fillStyle = style.color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, 2, canvas.height / 2);
  const png = await new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode-failed"))), "image/png"));
  const image = await doc.embedPng(new Uint8Array(await png.arrayBuffer()));
  cache.set(key, image);
  return image;
}

export async function createStamper(doc: PDFDocument) {
  const lib = await import("pdf-lib");
  const fonts = new Map<boolean, PDFFont>();
  const images = new Map<string, PDFImage>();

  const fontFor = async (bold: boolean) => {
    const existing = fonts.get(bold);
    if (existing) return existing;
    const font = await doc.embedFont(bold ? lib.StandardFonts.HelveticaBold : lib.StandardFonts.Helvetica);
    fonts.set(bold, font);
    return font;
  };

  return async (page: PDFPage, text: string, style: StampStyle, place: Placement) => {
    const frame = visualFrame(page);
    const font = await fontFor(Boolean(style.bold));
    const [r, g, b] = hexToRgb(style.color);
    let encodable = true;
    try {
      font.encodeText(text);
    } catch {
      encodable = false;
    }

    if (encodable) {
      const width = font.widthOfTextAtSize(text, style.size);
      const height = font.heightAtSize(style.size, { descender: false });
      const { cx, cy } = place(frame, width, height);
      const offset = rotate(-width / 2, -height / 2, style.angle);
      const origin = frame.toUser(cx + offset.x, cy + offset.y);
      page.drawText(text, {
        x: origin.x,
        y: origin.y,
        size: style.size,
        font,
        color: lib.rgb(r, g, b),
        opacity: style.opacity,
        rotate: lib.degrees(style.angle + frame.angle)
      });
      return;
    }

    const image = await textImage(doc, text, style, images);
    const height = style.size * 1.35;
    const width = (image.width / image.height) * height;
    const { cx, cy } = place(frame, width, height);
    const offset = rotate(-width / 2, -height / 2, style.angle);
    const origin = frame.toUser(cx + offset.x, cy + offset.y);
    page.drawImage(image, {
      x: origin.x,
      y: origin.y,
      width,
      height,
      opacity: style.opacity,
      rotate: lib.degrees(style.angle + frame.angle)
    });
  };
}
