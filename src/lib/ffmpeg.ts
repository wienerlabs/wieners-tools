"use client";

import type { FFmpeg } from "@ffmpeg/ffmpeg";

let instance: FFmpeg | null = null;
let loaderPromise: Promise<FFmpeg> | null = null;

const CORE_VERSION = "0.12.6";
const BASE = `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/umd`;

export async function getFFmpeg(onLog?: (line: string) => void): Promise<FFmpeg> {
  if (instance) return instance;
  if (loaderPromise) return loaderPromise;

  loaderPromise = (async () => {
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { toBlobURL } = await import("@ffmpeg/util");
    const ff = new FFmpeg();
    if (onLog) ff.on("log", ({ message }) => onLog(message));
    await ff.load({
      coreURL: await toBlobURL(`${BASE}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${BASE}/ffmpeg-core.wasm`, "application/wasm")
    });
    instance = ff;
    return ff;
  })();

  return loaderPromise;
}

export async function fetchFile(file: File): Promise<Uint8Array> {
  const buf = await file.arrayBuffer();
  return new Uint8Array(buf);
}

export function blobFromOutput(data: Uint8Array, mime: string): Blob {
  const buffer = data.slice().buffer as ArrayBuffer;
  return new Blob([buffer], { type: mime });
}
