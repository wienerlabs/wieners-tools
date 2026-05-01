"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";
import { OptionsPanel, FieldRow, ColorInput } from "@/components/options-panel";

function srgb(c: number) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relLum(hex: string) {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return 0;
  const r = srgb(parseInt(m[1], 16));
  const g = srgb(parseInt(m[2], 16));
  const b = srgb(parseInt(m[3], 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a: string, b: string) {
  const la = relLum(a);
  const lb = relLum(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

function verdict(r: number, large: boolean) {
  const aa = large ? 3 : 4.5;
  const aaa = large ? 4.5 : 7;
  if (r >= aaa) return "AAA";
  if (r >= aa) return "AA";
  return "Fail";
}

export default function ContrastCheckerTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#fff4dd");

  const { r, vNormal, vLarge } = useMemo(() => {
    const r = ratio(fg, bg);
    return { r, vNormal: verdict(r, false), vLarge: verdict(r, true) };
  }, [fg, bg]);

  return (
    <>
      <OptionsPanel>
        <FieldRow label="Foreground"><ColorInput value={fg} onChange={setFg} /></FieldRow>
        <FieldRow label="Background"><ColorInput value={bg} onChange={setBg} /></FieldRow>
      </OptionsPanel>

      <div className="ws-contrast-stage" style={{ background: bg, color: fg }}>
        <p style={{ fontSize: 18 }}>The quick brown fox · normal text</p>
        <p style={{ fontSize: 28, fontWeight: 700 }}>Large bold heading</p>
      </div>

      <div className="ws-contrast-grid">
        <div className="ws-contrast-card">
          <span className="ws-color-label">ratio</span>
          <strong className="ws-contrast-num">{r.toFixed(2)}:1</strong>
        </div>
        <div className="ws-contrast-card">
          <span className="ws-color-label">normal</span>
          <strong className={`ws-contrast-verdict is-${vNormal.toLowerCase()}`}>{vNormal}</strong>
          <span className="ws-text-io-note">≥ 4.5 AA · ≥ 7 AAA</span>
        </div>
        <div className="ws-contrast-card">
          <span className="ws-color-label">large</span>
          <strong className={`ws-contrast-verdict is-${vLarge.toLowerCase()}`}>{vLarge}</strong>
          <span className="ws-text-io-note">≥ 3 AA · ≥ 4.5 AAA</span>
        </div>
      </div>
    </>
  );
}
