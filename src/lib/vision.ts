type Vision = typeof import("@mediapipe/tasks-vision");
type WasmFileset = Awaited<ReturnType<Vision["FilesetResolver"]["forVisionTasks"]>>;

const WASM_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.0/wasm";
const MODEL_BASE = "https://storage.googleapis.com/mediapipe-models";

export const FACE_MODEL = `${MODEL_BASE}/face_detector/blaze_face_full_range/float16/1/blaze_face_full_range.tflite`;
export const OBJECT_MODEL = `${MODEL_BASE}/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite`;

let fileset: Promise<WasmFileset> | null = null;

export async function loadVision() {
  const vision = await import("@mediapipe/tasks-vision");
  fileset ??= vision.FilesetResolver.forVisionTasks(WASM_BASE);
  return { vision, fileset: await fileset };
}

export type Box = { x: number; y: number; w: number; h: number; score: number; label?: string };

function overlap(a: Box, b: Box) {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.w, b.x + b.w);
  const y2 = Math.min(a.y + a.h, b.y + b.h);
  const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const smaller = Math.min(a.w * a.h, b.w * b.h);
  return smaller > 0 ? inter / smaller : 0;
}

export function mergeBoxes(boxes: Box[], threshold = 0.3) {
  const merged: Box[] = [];
  for (const box of [...boxes].sort((a, b) => b.score - a.score)) {
    const hit = merged.find((other) => other.label === box.label && overlap(other, box) >= threshold);
    if (!hit) {
      merged.push({ ...box });
      continue;
    }
    const right = Math.max(hit.x + hit.w, box.x + box.w);
    const bottom = Math.max(hit.y + hit.h, box.y + box.h);
    hit.x = Math.min(hit.x, box.x);
    hit.y = Math.min(hit.y, box.y);
    hit.w = right - hit.x;
    hit.h = bottom - hit.y;
  }
  return merged;
}
