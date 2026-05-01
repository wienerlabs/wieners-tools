"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, type Easing } from "motion/react";

type SplitType = "chars" | "words" | "lines";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: Easing;
  splitType?: SplitType;
  from?: { opacity?: number; x?: number; y?: number; scale?: number };
  to?: { opacity?: number; x?: number; y?: number; scale?: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
};

const FROM_DEFAULT = { opacity: 0, y: 40 };
const TO_DEFAULT = { opacity: 1, y: 0 };

export default function SplitText({
  text,
  className,
  delay = 50,
  duration = 1.25,
  ease = "easeOut" as Easing,
  splitType = "chars",
  from = FROM_DEFAULT,
  to = TO_DEFAULT,
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  const tokens = useMemo(() => {
    if (splitType === "words") return text.split(/(\s+)/);
    if (splitType === "lines") return text.split(/\n/);
    return Array.from(text);
  }, [text, splitType]);

  const fromState = { ...FROM_DEFAULT, ...from };
  const toState = { ...TO_DEFAULT, ...to };
  const totalMs = (tokens.length - 1) * delay + duration * 1000;

  useEffect(() => {
    if (!inView || !onLetterAnimationComplete) return;
    const t = window.setTimeout(onLetterAnimationComplete, totalMs);
    return () => window.clearTimeout(t);
  }, [inView, onLetterAnimationComplete, totalMs]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", textAlign, whiteSpace: "pre-wrap" }}
      aria-label={text}
    >
      {tokens.map((token, i) =>
        /^\s+$/.test(token) ? (
          <span key={`${i}-ws`} aria-hidden="true">{token}</span>
        ) : (
          <motion.span
            key={`${i}-${token}`}
            aria-hidden="true"
            style={{ display: "inline-block", willChange: "transform, opacity" }}
            initial={reduced ? toState : fromState}
            animate={inView ? toState : fromState}
            transition={{ duration, ease, delay: (i * delay) / 1000 }}
          >
            {token === " " ? " " : token}
          </motion.span>
        )
      )}
    </span>
  );
}
