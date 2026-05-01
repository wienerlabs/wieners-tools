// Shared client-side helpers (no SSR-only imports here).

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

export async function readFileAsImage(file: File | Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("image-load-failed"));
    });
    return image;
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

export function imageToCanvas(image: HTMLImageElement, width?: number, height?: number) {
  const w = width ?? image.naturalWidth;
  const h = height ?? image.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("canvas-2d-unavailable");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, w, h);
  return { canvas, context };
}

export function canvasToBlob(canvas: HTMLCanvasElement, type = "image/png", quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("canvas-encode-failed"));
        }
      },
      type,
      quality
    );
  });
}

export function inferOutputName(input: string, suffix: string, ext: string) {
  const base = input.replace(/\.[^./]+$/, "");
  return `${base}${suffix}.${ext}`;
}

export function bytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export const SOCIAL_PRESETS: Record<string, { width: number; height: number; label: string }> = {
  "instagram-square": { width: 1080, height: 1080, label: "Instagram Square 1080" },
  "instagram-portrait": { width: 1080, height: 1350, label: "Instagram Portrait 1080×1350" },
  "instagram-story": { width: 1080, height: 1920, label: "Instagram Story 1080×1920" },
  "x-post": { width: 1200, height: 675, label: "X Post 1200×675" },
  "linkedin-post": { width: 1200, height: 627, label: "LinkedIn Post 1200×627" },
  "facebook-cover": { width: 1640, height: 924, label: "Facebook Cover 1640×924" },
  "youtube-thumb": { width: 1280, height: 720, label: "YouTube Thumb 1280×720" },
  "og-default": { width: 1200, height: 630, label: "OpenGraph 1200×630" }
};

export const FAVICON_SIZES = [16, 32, 48, 64, 96, 128, 192, 256, 512];
