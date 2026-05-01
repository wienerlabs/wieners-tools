"use client";

import { useEffect, useRef, useState } from "react";

type TextPressureProps = {
  text: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  minFontSize?: number;
};

export default function TextPressure({
  text,
  fontFamily = "Compressa VF",
  fontUrl = "https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2",
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = "#ffffff",
  strokeColor = "#5227FF",
  strokeWidth = 2,
  className,
  minFontSize = 24
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight] = useState(1);
  const chars = Array.from(text);

  useEffect(() => {
    const id = `tp-font-${fontFamily.replace(/\s+/g, "-")}`;
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `@font-face { font-family: "${fontFamily}"; src: url("${fontUrl}") format("woff2"); font-display: swap; font-weight: 100 900; font-style: normal; }`;
    document.head.appendChild(style);
  }, [fontFamily, fontUrl]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        cursorRef.current.x = t.clientX;
        cursorRef.current.y = t.clientY;
      }
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    const el = containerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      mouseRef.current.x = rect.left + rect.width / 2;
      mouseRef.current.y = rect.top + rect.height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  useEffect(() => {
    const setSize = () => {
      const el = containerRef.current;
      if (!el) return;
      const { width: w, height: h } = el.getBoundingClientRect();
      const k = chars.length || 1;
      const next = Math.max(minFontSize, w / k * 1.3);
      setFontSize(next);
      setScaleY(scale ? Math.max(1, h / next) : 1);
    };
    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.18;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.18;

      const maxDist = Math.max(window.innerWidth, window.innerHeight) / 2;
      charsRef.current.forEach((node) => {
        if (!node) return;
        const r = node.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mouseRef.current.x - cx;
        const dy = mouseRef.current.y - cy;
        const dist = Math.hypot(dx, dy);
        const proximity = Math.max(0, 1 - dist / maxDist);

        const wdth = width ? Math.round(40 + proximity * 160) : 100;
        const wght = weight ? Math.round(100 + proximity * 800) : 400;
        const slnt = italic ? -proximity * 14 : 0;
        const op = alpha ? Math.max(0.18, proximity) : 1;

        node.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}, "ital" ${italic ? 1 : 0}`;
        node.style.fontStyle = italic && slnt < 0 ? `oblique ${slnt}deg` : "normal";
        node.style.opacity = String(op);
      });

      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(raf);
  }, [width, weight, italic, alpha]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        display: flex ? "flex" : "block",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        overflow: "hidden"
      }}
    >
      <h1
        style={{
          margin: 0,
          padding: 0,
          fontFamily,
          color: stroke ? "transparent" : textColor,
          WebkitTextStroke: stroke ? `${strokeWidth}px ${strokeColor}` : "0",
          fontSize,
          lineHeight,
          transform: `scaleY(${scaleY})`,
          transformOrigin: "center center",
          display: "flex",
          gap: "0.02em",
          whiteSpace: "nowrap",
          fontWeight: 400
        }}
      >
        {chars.map((c, i) => (
          <span
            key={`${i}-${c}`}
            ref={(node) => {
              if (node) charsRef.current[i] = node;
            }}
            style={{ display: "inline-block", willChange: "font-variation-settings, opacity" }}
          >
            {c === " " ? " " : c}
          </span>
        ))}
      </h1>
    </div>
  );
}
