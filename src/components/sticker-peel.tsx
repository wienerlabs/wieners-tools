"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type StickerPeelProps = {
  imageSrc: string;
  width?: number;
  rotate?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  initialPosition?: { x: number; y: number };
  peelDirection?: number;
  className?: string;
  alt?: string;
};

export default function StickerPeel({
  imageSrc,
  width = 200,
  rotate = 0,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  shadowIntensity = 0.5,
  lightingIntensity = 0.1,
  initialPosition = { x: 0, y: 0 },
  peelDirection = 0,
  className,
  alt = ""
}: StickerPeelProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [pos, setPos] = useState(initialPosition);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onUp = () => {
      setDrag(null);
      setActive(false);
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      setPos({
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y
      });
    };
    if (drag) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [drag]);

  const peelPct = active ? peelBackActivePct : hover ? peelBackHoverPct : 0;
  const peelRad = (peelDirection * Math.PI) / 180;

  const wrapStyle: CSSProperties = {
    width,
    transform: `translate(${pos.x}px, ${pos.y}px) rotate(${rotate}deg)`,
    cursor: drag ? "grabbing" : "grab",
    filter: `drop-shadow(0 ${10 + peelPct * 0.4}px ${20 + peelPct * 0.6}px rgba(0,0,0,${0.18 * shadowIntensity + peelPct * 0.004}))`
  };

  const peelTriH = peelPct;
  const peelTriW = peelPct * 1.2;

  const peelClip = `polygon(0 0, 100% 0, 100% 100%, ${peelTriW}% 100%, 0 ${100 - peelTriH}%)`;

  const stickerStyle: CSSProperties = {
    width: "100%",
    display: "block",
    clipPath: peelClip,
    WebkitClipPath: peelClip,
    transition: "clip-path 220ms cubic-bezier(0.2, 0.8, 0.2, 1)"
  };

  const flapStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: `${peelTriW}%`,
    height: `${peelTriH}%`,
    transformOrigin: "100% 0%",
    transform: `rotate(${peelDirection - 30}deg) scale(${peelPct > 0 ? 1 : 0})`,
    transition: "transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1)",
    pointerEvents: "none"
  };

  const flapImgStyle: CSSProperties = {
    width: `${100 / Math.max(peelTriW, 1) * 100}%`,
    height: `${100 / Math.max(peelTriH, 1) * 100}%`,
    transform: `scale(-1, -1) translate(${-(100 - peelTriW)}%, ${-(100 - peelTriH)}%)`,
    filter: `brightness(${1 - lightingIntensity * 2}) blur(${peelPct * 0.04}px)`,
    opacity: 0.85
  };

  return (
    <div
      ref={wrapRef}
      className={`ws-sticker-peel ${className ?? ""}`}
      style={wrapStyle}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onPointerDown={(e) => {
        if (!wrapRef.current) return;
        const r = wrapRef.current.getBoundingClientRect();
        offsetRef.current = { x: e.clientX - r.left - pos.x, y: e.clientY - r.top - pos.y };
        offsetRef.current = { x: e.clientX - (r.left), y: e.clientY - (r.top) };
        setActive(true);
        setDrag({ x: e.clientX, y: e.clientY });
      }}
    >
      <img src={imageSrc} alt={alt} style={stickerStyle} draggable={false} />
      <div style={flapStyle}>
        <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 4 }}>
          <img src={imageSrc} alt="" style={flapImgStyle} draggable={false} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(${135 + peelDirection}deg, rgba(255,255,255,${lightingIntensity * 0.35}) 0%, transparent 40%)`,
          pointerEvents: "none",
          mixBlendMode: "overlay",
          opacity: hover ? 1 : 0,
          transition: "opacity 200ms ease"
        }}
      />
    </div>
  );
}
