# Wiener's Tools

> Tarayıcıda çalışan görsel atölyesi. Foto, PDF veya başka bir dosyanız asla sunucumuza ulaşmaz.

Compress, convert, edit, generate — hepsi tarayıcınızda WebAssembly + WebGPU + Web Worker'lar üzerinden.

## Özellikler

- **Compression** — JPEG/PNG/WebP/AVIF, SVG, PDF
- **Conversion** — Format değiştirme (HEIC, ICO, PDF↔Image, SVG↔PNG)
- **Editing** — Resize, crop, rotate, pixelart, color adjust, watermark, blur, collage
- **AI** — Background removal, upscaling, OCR (hepsi client-side ONNX)
- **Generation** — QR code, color palette, mockup, ASCII art, OG image
- **Metadata** — EXIF viewer/cleaner, GIF maker/extractor

Toplam 32 araç, 6 kategori, 4 dil (TR/DE/EN/AR).

## Stack

- Next.js (statik export)
- TypeScript
- Tailwind CSS v4
- Cloudflare Pages

## Çalıştırma

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # → out/
npm run lint
```

## Privacy

Bu araçların hiçbiri görsellerinizi sunucuya göndermez. Tüm işleme tarayıcınızda gerçekleşir. AI modelleri tek seferlik indirilir ve `Cache Storage`'da saklanır — sonraki kullanımlar tamamen offline.

## Repo

Private — wienerlabs organization.
