"use client";

import { useEffect, useRef } from "react";

type MagnetLinesProps = {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "currentColor",
  lineWidth = "2px",
  lineHeight = "30px",
  baseAngle = -10,
  className = "",
  style = {}
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>("span");

    const onPointerMove = (event: PointerEvent) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
        item.style.setProperty("--mline-rotate", `${angle}deg`);
      });
    };

    window.addEventListener("pointermove", onPointerMove);

    // initial poke so the field looks alive on load
    if (items.length > 0) {
      const first = items[0];
      const rect = first.getBoundingClientRect();
      const fakeEvent = new PointerEvent("pointermove", {
        clientX: rect.left + rect.width / 2 + 200,
        clientY: rect.top + rect.height / 2 + 100
      });
      window.dispatchEvent(fakeEvent);
    }

    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [rows, columns]);

  const total = rows * columns;
  const items = Array.from({ length: total }, (_, i) => <span key={i} />);

  return (
    <div
      ref={containerRef}
      className={`ws-magnet-lines ${className}`.trim()}
      style={{
        ...style,
        ["--mline-color" as string]: lineColor,
        ["--mline-width" as string]: lineWidth,
        ["--mline-height" as string]: lineHeight,
        ["--mline-rotate" as string]: `${baseAngle}deg`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize
      }}
    >
      {items}
    </div>
  );
}
