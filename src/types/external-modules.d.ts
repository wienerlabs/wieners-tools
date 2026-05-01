declare module "piexifjs" {
  const piexif: {
    remove(jpegDataUrl: string): string;
    load(jpegDataUrl: string): unknown;
    dump(exifObj: unknown): string;
    insert(exifBytes: string, jpegDataUrl: string): string;
  };
  export default piexif;
  export const remove: typeof piexif.remove;
  export const load: typeof piexif.load;
  export const dump: typeof piexif.dump;
  export const insert: typeof piexif.insert;
}

declare module "imagetracerjs" {
  const ImageTracer: {
    imagedataToSVG(imagedata: ImageData, options?: Record<string, unknown>): string;
    imageToSVG(input: string, callback: (svg: string) => void, options?: Record<string, unknown>): void;
  };
  export default ImageTracer;
  export const imagedataToSVG: typeof ImageTracer.imagedataToSVG;
}

declare module "gifuct-js" {
  export interface ParsedFrame {
    dims: { width: number; height: number; left: number; top: number };
    patch: Uint8ClampedArray;
    delay: number;
    disposalType: number;
  }
  export function parseGIF(input: ArrayBuffer | Uint8Array): unknown;
  export function decompressFrames(gif: unknown, buildPatches: boolean): ParsedFrame[];
}

declare module "heic2any" {
  type Options = {
    blob: Blob;
    toType?: string;
    quality?: number;
    multiple?: boolean;
  };
  function heic2any(opts: Options): Promise<Blob | Blob[]>;
  export default heic2any;
}

declare module "svgo/dist/svgo.browser.js" {
  export function optimize(svg: string, opts?: Record<string, unknown>): { data: string };
}

declare module "gifenc" {
  export type Palette = number[][];
  export interface GifEncoder {
    writeFrame(
      indexed: Uint8Array,
      width: number,
      height: number,
      opts: { palette: Palette; delay?: number; repeat?: number; transparent?: boolean }
    ): void;
    writeHeader(): void;
    finish(): void;
    bytes(): Uint8Array;
    bytesView(): Uint8Array;
    reset(): void;
  }
  export function GIFEncoder(): GifEncoder;
  export function quantize(
    rgba: Uint8Array | Uint8ClampedArray,
    maxColors: number,
    opts?: Record<string, unknown>
  ): Palette;
  export function applyPalette(
    rgba: Uint8Array | Uint8ClampedArray,
    palette: Palette,
    format?: string
  ): Uint8Array;
}
