"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type HoverMode = "speedUp" | "slowDown" | "pause" | "goBonkers" | "none";

type CircularTextProps = {
  text: string;
  spinDuration?: number;
  onHover?: HoverMode;
  className?: string;
  size?: number;
  fontSize?: number;
  textColor?: string;
  letterSpacing?: number;
};

export default function CircularText({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className,
  size = 200,
  fontSize = 16,
  textColor = "currentColor",
  letterSpacing = 4
}: CircularTextProps) {
  const reduced = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  const baseDuration = spinDuration;
  let activeDuration = baseDuration;
  let direction: "normal" | "reverse" = "normal";
  let paused = false;

  if (hovering) {
    switch (onHover) {
      case "speedUp": activeDuration = Math.max(2, baseDuration / 4); break;
      case "slowDown": activeDuration = baseDuration * 2.5; break;
      case "pause": paused = true; break;
      case "goBonkers": activeDuration = 1.6; direction = "reverse"; break;
    }
  }

  const radius = size / 2 - fontSize;
  const chars = Array.from(text);
  const stepDeg = 360 / chars.length;

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: "relative",
        color: textColor,
        userSelect: "none"
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-label={text}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0
        }}
        animate={reduced || paused ? { rotate: 0 } : { rotate: direction === "reverse" ? -360 : 360 }}
        transition={{
          duration: activeDuration,
          ease: "linear",
          repeat: reduced || paused ? 0 : Infinity
        }}
      >
        {chars.map((ch, i) => {
          const angle = stepDeg * i;
          return (
            <span
              key={`${ch}-${i}`}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                fontSize,
                letterSpacing: `${letterSpacing}px`,
                fontFamily: "var(--font-host), system-ui, sans-serif",
                fontWeight: 600,
                transform: `rotate(${angle}deg) translate(0, -${radius}px)`,
                transformOrigin: "0 0",
                lineHeight: 1
              }}
            >
              {ch}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
