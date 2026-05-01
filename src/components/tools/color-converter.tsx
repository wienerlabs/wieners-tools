"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, TextInput } from "@/components/options-panel";

type RGB = { r: number; g: number; b: number; a: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseColor(input: string): RGB | null {
  const v = input.trim();
  if (!v) return null;

  const hex3 = /^#?([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i;
  const hex6 = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i;
  let m = v.match(hex6);
  if (m) {
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16),
      a: m[4] ? parseInt(m[4], 16) / 255 : 1
    };
  }
  m = v.match(hex3);
  if (m) {
    return {
      r: parseInt(m[1] + m[1], 16),
      g: parseInt(m[2] + m[2], 16),
      b: parseInt(m[3] + m[3], 16),
      a: m[4] ? parseInt(m[4] + m[4], 16) / 255 : 1
    };
  }
  m = v.match(/^rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*[,/]\s*([\d.%]+))?\s*\)$/i);
  if (m) {
    const a = m[4] ? (m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4])) : 1;
    return { r: clamp(+m[1], 0, 255), g: clamp(+m[2], 0, 255), b: clamp(+m[3], 0, 255), a };
  }
  m = v.match(/^hsla?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)%\s*[, ]\s*([\d.]+)%(?:\s*[,/]\s*([\d.%]+))?\s*\)$/i);
  if (m) {
    const h = +m[1] % 360;
    const s = clamp(+m[2], 0, 100) / 100;
    const l = clamp(+m[3], 0, 100) / 100;
    const a = m[4] ? (m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4])) : 1;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hp = h / 60;
    const x = c * (1 - Math.abs((hp % 2) - 1));
    let r = 0, g = 0, b = 0;
    if (0 <= hp && hp < 1) { r = c; g = x; }
    else if (1 <= hp && hp < 2) { r = x; g = c; }
    else if (2 <= hp && hp < 3) { g = c; b = x; }
    else if (3 <= hp && hp < 4) { g = x; b = c; }
    else if (4 <= hp && hp < 5) { r = x; b = c; }
    else if (5 <= hp && hp < 6) { r = c; b = x; }
    const mlt = l - c / 2;
    return {
      r: Math.round((r + mlt) * 255),
      g: Math.round((g + mlt) * 255),
      b: Math.round((b + mlt) * 255),
      a
    };
  }
  return null;
}

function toHex(rgb: RGB): string {
  const h = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  const base = `#${h(rgb.r)}${h(rgb.g)}${h(rgb.b)}`;
  return rgb.a < 1 ? base + h(rgb.a * 255) : base;
}

function toRgbStr(rgb: RGB): string {
  if (rgb.a < 1) return `rgb(${Math.round(rgb.r)} ${Math.round(rgb.g)} ${Math.round(rgb.b)} / ${rgb.a.toFixed(3)})`;
  return `rgb(${Math.round(rgb.r)} ${Math.round(rgb.g)} ${Math.round(rgb.b)})`;
}

function toHsl(rgb: RGB): string {
  const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  const hh = Math.round(h);
  const ss = Math.round(s * 100);
  const ll = Math.round(l * 100);
  return rgb.a < 1 ? `hsl(${hh} ${ss}% ${ll}% / ${rgb.a.toFixed(3)})` : `hsl(${hh} ${ss}% ${ll}%)`;
}

function srgbToLin(c: number) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function toOklch(rgb: RGB): string {
  const r = srgbToLin(rgb.r);
  const g = srgbToLin(rgb.g);
  const b = srgbToLin(rgb.b);
  const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(a * a + b2 * b2);
  const hRad = Math.atan2(b2, a);
  const H = ((hRad * 180) / Math.PI + 360) % 360;
  return `oklch(${(L * 100).toFixed(2)}% ${C.toFixed(4)} ${H.toFixed(2)})`;
}

function relLum(rgb: RGB) {
  const r = srgbToLin(rgb.r), g = srgbToLin(rgb.g), b = srgbToLin(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: RGB, b: RGB) {
  const la = relLum(a), lb = relLum(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const WHITE: RGB = { r: 255, g: 255, b: 255, a: 1 };
const BLACK: RGB = { r: 0, g: 0, b: 0, a: 1 };

export default function ColorConverterTool({
  i18n
}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const opt = i18n.options ?? {};
  const [input, setInput] = useState("#5227ff");
  const [copied, setCopied] = useState<string | null>(null);

  const parsed = useMemo(() => parseColor(input), [input]);
  const formats = useMemo(() => {
    if (!parsed) return null;
    return {
      hex: toHex(parsed),
      rgb: toRgbStr(parsed),
      hsl: toHsl(parsed),
      oklch: toOklch(parsed),
      cw: contrast(parsed, WHITE).toFixed(2),
      cb: contrast(parsed, BLACK).toFixed(2)
    };
  }, [parsed]);

  const copy = async (id: string, value: string) => {
    await navigator.clipboard?.writeText(value);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <>
      <OptionsPanel>
        <FieldRow label={opt.input ?? "Color"} hint="hex / rgb / hsl">
          <TextInput value={input} onChange={setInput} placeholder="#000 · rgb(0 0 0) · hsl(0 0% 0%)" />
        </FieldRow>
      </OptionsPanel>

      {parsed && formats ? (
        <div className="ws-color-grid">
          <div className="ws-color-swatch" style={{ background: formats.hex }} aria-hidden="true" />
          <ul className="ws-color-formats">
            {([
              ["hex", formats.hex],
              ["rgb", formats.rgb],
              ["hsl", formats.hsl],
              ["oklch", formats.oklch]
            ] as const).map(([label, value]) => (
              <li key={label}>
                <span className="ws-color-label">{label}</span>
                <code className="ws-mono">{value}</code>
                <button type="button" className="ws-icon-button" onClick={() => copy(label, value)}>
                  {copied === label ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </li>
            ))}
            <li>
              <span className="ws-color-label">on white</span>
              <code className="ws-mono">{formats.cw}:1</code>
            </li>
            <li>
              <span className="ws-color-label">on black</span>
              <code className="ws-mono">{formats.cb}:1</code>
            </li>
          </ul>
        </div>
      ) : (
        <p className="ws-text-io-note">Enter a valid color string.</p>
      )}
    </>
  );
}
