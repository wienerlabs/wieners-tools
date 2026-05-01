"use client";

import type { CSSProperties } from "react";

type ShinyTextProps = {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: "left" | "right";
  yoyo?: boolean;
  pauseOnHover?: boolean;
  disabled?: boolean;
  className?: string;
};

let keyframesInjected = false;
function ensureKeyframes() {
  if (keyframesInjected || typeof document === "undefined") return;
  keyframesInjected = true;
  const style = document.createElement("style");
  style.dataset.wsShiny = "true";
  style.textContent = `
@keyframes wsShinyShift {
  0%   { background-position: 200% 0; }
  100% { background-position: -100% 0; }
}
@keyframes wsShinyShiftYoyo {
  0%   { background-position: 200% 0; }
  50%  { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}`;
  document.head.appendChild(style);
}

export default function ShinyText({
  text,
  speed = 2,
  delay = 0,
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className
}: ShinyTextProps) {
  if (typeof document !== "undefined") ensureKeyframes();

  const animation = disabled
    ? "none"
    : `${yoyo ? "wsShinyShiftYoyo" : "wsShinyShift"} ${speed}s linear ${delay}s infinite ${
        direction === "right" ? "reverse" : "normal"
      }`;

  const halfSpread = `calc(50% - ${spread / 2}px), ${shineColor} 50%, ${color} calc(50% + ${spread / 2}px)`;

  const style: CSSProperties = {
    backgroundImage: `linear-gradient(90deg, ${color} 0%, ${color} ${halfSpread}, ${color} 100%)`,
    backgroundSize: "200% 100%",
    backgroundRepeat: "no-repeat",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation,
    display: "inline-block",
    fontWeight: 700,
    letterSpacing: "-0.01em"
  };

  return (
    <span
      className={className}
      style={style}
      onMouseEnter={(e) => {
        if (pauseOnHover) (e.currentTarget as HTMLSpanElement).style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        if (pauseOnHover) (e.currentTarget as HTMLSpanElement).style.animationPlayState = "running";
      }}
    >
      {text}
    </span>
  );
}
