"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type GradientBlindsProps = {
  gradientColors?: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  mouseDampening?: number;
  distortAmount?: number;
  shineDirection?: "left" | "right";
  mixBlendMode?: CSSProperties["mixBlendMode"];
  className?: string;
};

export default function GradientBlinds({
  gradientColors = ["#FF9FFC", "#5227FF"],
  angle = 0,
  noise = 0.3,
  blindCount = 12,
  blindMinWidth = 50,
  spotlightRadius = 0.5,
  spotlightSoftness = 1,
  spotlightOpacity = 1,
  mouseDampening = 0.15,
  distortAmount = 0,
  shineDirection = "left",
  mixBlendMode = "lighten",
  className
}: GradientBlindsProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const [size, setSize] = useState({ w: 1, h: 1 });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      targetRef.current.x = (e.clientX - r.left) / r.width;
      targetRef.current.y = (e.clientY - r.top) / r.height;
    };
    wrap.addEventListener("pointermove", onMove);
    const ro = new ResizeObserver(() => {
      setSize({ w: wrap.clientWidth, h: wrap.clientHeight });
    });
    ro.observe(wrap);
    setSize({ w: wrap.clientWidth, h: wrap.clientHeight });

    let raf = 0;
    const loop = () => {
      setPos((p) => ({
        x: p.x + (targetRef.current.x - p.x) * Math.max(0.02, 1 - mouseDampening),
        y: p.y + (targetRef.current.y - p.y) * Math.max(0.02, 1 - mouseDampening)
      }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
    };
  }, [mouseDampening]);

  const effectiveBlinds = Math.max(2, Math.min(blindCount, Math.floor(size.w / Math.max(8, blindMinWidth))));
  const blindW = size.w / effectiveBlinds;
  const stops = gradientColors.join(", ");
  const baseGrad = `linear-gradient(${angle}deg, ${stops})`;

  const spotlightGrad = `radial-gradient(circle at ${pos.x * 100}% ${pos.y * 100}%, rgba(255,255,255,${spotlightOpacity}) 0%, rgba(255,255,255,${spotlightOpacity * 0.4}) ${spotlightRadius * 30 * spotlightSoftness}%, transparent ${spotlightRadius * 100}%)`;

  return (
    <div
      ref={wrapRef}
      className={`ws-blinds ${className ?? ""}`}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0c"
      }}
    >
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, display: "flex" }}
      >
        {Array.from({ length: effectiveBlinds }).map((_, i) => {
          const phase = (i / effectiveBlinds) - 0.5;
          const bias = shineDirection === "right" ? 1 : -1;
          const tilt = pos.x * bias * distortAmount * 6;
          return (
            <div
              key={i}
              style={{
                width: blindW,
                height: "100%",
                flexShrink: 0,
                background: baseGrad,
                opacity: 0.65 + Math.abs(phase) * 0.6,
                transform: `translateX(${tilt * Math.sign(phase)}px) skewY(${tilt * 0.3}deg)`,
                transition: "transform 60ms linear"
              }}
            />
          );
        })}
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: spotlightGrad,
          mixBlendMode,
          pointerEvents: "none"
        }}
      />

      {noise > 0 ? (
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: noise * 0.3,
            mixBlendMode: "overlay",
            pointerEvents: "none"
          }}
        >
          <filter id="ws-blinds-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#ws-blinds-noise)" />
        </svg>
      ) : null}
    </div>
  );
}
