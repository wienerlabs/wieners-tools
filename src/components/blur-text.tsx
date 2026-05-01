"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, type Easing } from "motion/react";

type BlurTextProps = {
  text: string;
  delay?: number;
  animateBy?: "words" | "chars";
  direction?: "top" | "bottom" | "left" | "right";
  className?: string;
  duration?: number;
  ease?: Easing;
  onAnimationComplete?: () => void;
  threshold?: number;
  rootMargin?: string;
};

const OFFSET = 18;

export default function BlurText({
  text,
  delay = 200,
  animateBy = "words",
  direction = "top",
  className,
  duration = 0.7,
  ease = "easeOut" as Easing,
  onAnimationComplete,
  threshold = 0.1,
  rootMargin = "-80px"
}: BlurTextProps) {
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
    if (animateBy === "chars") return Array.from(text);
    return text.split(/(\s+)/);
  }, [text, animateBy]);

  const offset = useMemo(() => {
    switch (direction) {
      case "bottom": return { x: 0, y: -OFFSET };
      case "left":   return { x: OFFSET, y: 0 };
      case "right":  return { x: -OFFSET, y: 0 };
      default:       return { x: 0, y: OFFSET };
    }
  }, [direction]);

  const initialState = { opacity: 0, filter: "blur(10px)", x: offset.x, y: offset.y };
  const targetState = { opacity: 1, filter: "blur(0px)", x: 0, y: 0 };

  const totalMs = tokens.length * delay + duration * 1000;
  useEffect(() => {
    if (!inView || !onAnimationComplete) return;
    const t = window.setTimeout(onAnimationComplete, totalMs);
    return () => window.clearTimeout(t);
  }, [inView, onAnimationComplete, totalMs]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }} aria-label={text}>
      {tokens.map((token, i) =>
        /^\s+$/.test(token) ? (
          <span key={`${i}-ws`} aria-hidden="true">{token}</span>
        ) : (
          <motion.span
            key={`${i}-${token}`}
            aria-hidden="true"
            style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
            initial={reduced ? targetState : initialState}
            animate={inView ? targetState : initialState}
            transition={{ duration, ease, delay: (i * delay) / 1000 }}
          >
            {token}
          </motion.span>
        )
      )}
    </span>
  );
}
