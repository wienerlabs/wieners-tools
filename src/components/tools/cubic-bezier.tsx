"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { ToolDefinition, ToolI18n } from "@/lib/tools/types";

const SIZE = 280;
const PADDING = 30;

type Pt = { x: number; y: number };

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function CubicBezierTool({}: {
  locale: Locale;
  tool: ToolDefinition;
  i18n: ToolI18n;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [p1, setP1] = useState<Pt>({ x: 0.25, y: 0.1 });
  const [p2, setP2] = useState<Pt>({ x: 0.25, y: 1.0 });
  const [drag, setDrag] = useState<"p1" | "p2" | null>(null);
  const [tick, setTick] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => (t + 1) % 200), 16);
    return () => window.clearInterval(id);
  }, []);

  const toScreen = (p: Pt) => ({
    x: PADDING + p.x * (SIZE - PADDING * 2),
    y: PADDING + (1 - p.y) * (SIZE - PADDING * 2)
  });

  const fromScreen = (px: number, py: number, allowOverflow = true): Pt => {
    const x = clamp01((px - PADDING) / (SIZE - PADDING * 2));
    const yRaw = (py - PADDING) / (SIZE - PADDING * 2);
    const y = 1 - (allowOverflow ? Math.max(-0.5, Math.min(1.5, yRaw)) : clamp01(yRaw));
    return { x, y };
  };

  const onPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const next = fromScreen(px, py);
    if (drag === "p1") setP1(next);
    else setP2(next);
  };

  const css = `cubic-bezier(${p1.x.toFixed(2)}, ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)}, ${p2.y.toFixed(2)})`;

  const onCopy = async () => {
    await navigator.clipboard?.writeText(css);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  const start = toScreen({ x: 0, y: 0 });
  const end = toScreen({ x: 1, y: 1 });
  const c1 = toScreen(p1);
  const c2 = toScreen(p2);
  const t = (tick % 200) / 200;
  const ballX = 30 + (1 - Math.pow(1 - t, 1)) * 240;

  return (
    <div className="ws-bezier">
      <svg
        ref={svgRef}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        onPointerMove={onPointer}
        onPointerUp={() => setDrag(null)}
        onPointerLeave={() => setDrag(null)}
        className="ws-bezier-svg"
      >
        <rect x={PADDING} y={PADDING} width={SIZE - PADDING * 2} height={SIZE - PADDING * 2} fill="none" stroke="rgba(0,0,0,0.12)" />
        <line x1={c1.x} y1={c1.y} x2={start.x} y2={start.y} stroke="rgba(0,0,0,0.35)" strokeWidth={1} />
        <line x1={c2.x} y1={c2.y} x2={end.x} y2={end.y} stroke="rgba(0,0,0,0.35)" strokeWidth={1} />
        <path d={`M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`} fill="none" stroke="#000" strokeWidth={2.4} />
        <circle cx={c1.x} cy={c1.y} r={9} fill="#000" onPointerDown={() => setDrag("p1")} style={{ cursor: "grab" }} />
        <circle cx={c2.x} cy={c2.y} r={9} fill="#000" onPointerDown={() => setDrag("p2")} style={{ cursor: "grab" }} />
      </svg>

      <div className="ws-bezier-side">
        <div className="ws-bezier-runway">
          <div className="ws-bezier-ball" style={{ transform: `translateX(${ballX}px)` }} />
        </div>
        <p className="ws-text-io-note">Continuous loop · {css.replace("cubic-bezier", "ease")}</p>
        <div className="ws-css-out">
          <code className="ws-mono">{css}</code>
          <button type="button" className="ws-icon-button" onClick={onCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
