"use client";

import { useEffect, useRef, useState } from "react";

type CubesProps = {
  gridSize?: number;
  maxAngle?: number;
  radius?: number;
  borderStyle?: string;
  faceColor?: string;
  rippleColor?: string;
  rippleSpeed?: number;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
  cellSize?: number;
};

type Cell = { row: number; col: number };

export default function Cubes({
  gridSize = 8,
  maxAngle = 45,
  radius = 3,
  borderStyle = "1px solid currentColor",
  faceColor = "currentColor",
  rippleColor = "rgba(255, 255, 255, 0.4)",
  rippleSpeed = 1.5,
  autoAnimate = true,
  rippleOnClick = true,
  cellSize = 56
}: CubesProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [ripple, setRipple] = useState<Cell | null>(null);
  const [autoCell, setAutoCell] = useState<Cell | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const xRatio = (event.clientX - rect.left) / rect.width - 0.5;
      const yRatio = (event.clientY - rect.top) / rect.height - 0.5;
      const ry = xRatio * maxAngle;
      const rx = -yRatio * maxAngle;
      setTilt({ rx, ry });
    };
    const onLeave = () => setTilt({ rx: 0, ry: 0 });
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [maxAngle]);

  useEffect(() => {
    if (!autoAnimate) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const cell = {
        row: Math.floor(Math.random() * gridSize),
        col: Math.floor(Math.random() * gridSize)
      };
      setAutoCell(cell);
      timer = setTimeout(tick, 1400);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [autoAnimate, gridSize]);

  const handleCubeClick = (row: number, col: number) => {
    if (!rippleOnClick) return;
    setRipple({ row, col });
  };

  const grid = Array.from({ length: gridSize }, (_, row) =>
    Array.from({ length: gridSize }, (_, col) => ({ row, col }))
  );

  const computeRippleDelay = (origin: Cell, row: number, col: number) => {
    const dx = row - origin.row;
    const dy = col - origin.col;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > radius) return null;
    return (dist / rippleSpeed) * 90;
  };

  return (
    <div
      ref={stageRef}
      className="ws-cubes-stage"
      style={
        {
          ["--cube-size" as string]: `${cellSize}px`,
          ["--cube-half" as string]: `${cellSize / 2}px`,
          ["--cube-border" as string]: borderStyle,
          ["--cube-face" as string]: faceColor,
          ["--cube-ripple" as string]: rippleColor
        } as React.CSSProperties
      }
    >
      <div
        className="ws-cubes-board"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`
        }}
      >
        {grid.flat().map(({ row, col }) => {
          const rDelay = ripple ? computeRippleDelay(ripple, row, col) : null;
          const aDelay = autoCell ? computeRippleDelay(autoCell, row, col) : null;
          const delay = rDelay ?? aDelay;
          const triggerKey = ripple
            ? `r-${ripple.row}-${ripple.col}-${row}-${col}`
            : autoCell
              ? `a-${autoCell.row}-${autoCell.col}-${row}-${col}`
              : `idle-${row}-${col}`;
          return (
            <button
              type="button"
              key={`${row}-${col}`}
              className="ws-cube"
              onClick={() => handleCubeClick(row, col)}
            >
              <span
                key={triggerKey}
                className={`ws-cube-inner ${delay !== null ? "is-rippling" : ""}`}
                style={delay !== null ? { animationDelay: `${delay}ms` } : undefined}
              >
                <span className="ws-cube-face is-front" />
                <span className="ws-cube-face is-back" />
                <span className="ws-cube-face is-right" />
                <span className="ws-cube-face is-left" />
                <span className="ws-cube-face is-top" />
                <span className="ws-cube-face is-bottom" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
