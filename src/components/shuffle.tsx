"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type AnimationMode = "evenodd" | "sequential" | "random";
type Direction = "left" | "right";

type ShuffleProps = {
  text: string;
  shuffleDirection?: Direction;
  duration?: number;
  animationMode?: AnimationMode;
  shuffleTimes?: number;
  ease?: string;
  stagger?: number;
  threshold?: number;
  triggerOnce?: boolean;
  triggerOnHover?: boolean;
  respectReducedMotion?: boolean;
  loop?: boolean;
  loopDelay?: number;
  className?: string;
  charset?: string;
};

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

function pick(charset: string) {
  return charset[Math.floor(Math.random() * charset.length)] ?? "";
}

export default function Shuffle({
  text,
  shuffleDirection = "right",
  duration = 0.35,
  animationMode = "evenodd",
  shuffleTimes = 1,
  stagger = 0.03,
  threshold = 0.1,
  triggerOnce = true,
  triggerOnHover = false,
  respectReducedMotion = true,
  loop = false,
  loopDelay = 0,
  className,
  charset = DEFAULT_CHARSET
}: ShuffleProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const finalChars = useMemo(() => Array.from(text), [text]);
  const [chars, setChars] = useState(finalChars);
  const [running, setRunning] = useState(false);
  const ranOnceRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const orderFor = useCallback(
    (count: number) => {
      const idx = Array.from({ length: count }, (_, i) => i);
      if (animationMode === "evenodd") {
        return idx.sort((a, b) => (a % 2) - (b % 2) || a - b);
      }
      if (animationMode === "random") {
        return idx.sort(() => Math.random() - 0.5);
      }
      return shuffleDirection === "right" ? idx : idx.reverse();
    },
    [animationMode, shuffleDirection]
  );

  const play = useCallback(() => {
    if (respectReducedMotion && reduced) {
      setChars(finalChars);
      return;
    }
    setRunning(true);
    const order = orderFor(finalChars.length);
    const total = finalChars.length;
    const startTimes = order.map((_, position) => position * stagger * 1000);
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const next = finalChars.slice();
      let allDone = true;

      for (let i = 0; i < total; i++) {
        const charIndex = order[i];
        const localElapsed = elapsed - startTimes[i];
        const totalDur = duration * 1000;
        if (localElapsed < 0) {
          next[charIndex] = pick(charset);
          allDone = false;
        } else if (localElapsed >= totalDur) {
          next[charIndex] = finalChars[charIndex];
        } else {
          const cyclesDone = Math.floor((localElapsed / totalDur) * shuffleTimes);
          if (cyclesDone < shuffleTimes) {
            next[charIndex] = pick(charset);
            allDone = false;
          } else {
            next[charIndex] = finalChars[charIndex];
          }
        }
      }

      setChars(next);
      if (!allDone) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setChars(finalChars);
        setRunning(false);
        if (loop) {
          window.setTimeout(() => play(), Math.max(0, loopDelay * 1000));
        }
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [finalChars, orderFor, duration, stagger, shuffleTimes, charset, loop, loopDelay, reduced, respectReducedMotion]);

  useEffect(() => {
    if (triggerOnHover) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      play();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (triggerOnce && ranOnceRef.current) return;
            ranOnceRef.current = true;
            play();
            if (triggerOnce) io.disconnect();
          }
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [play, threshold, triggerOnce, triggerOnHover]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={() => {
        if (triggerOnHover && !running) play();
      }}
      style={{ display: "inline-block", fontVariantNumeric: "tabular-nums" }}
      aria-label={text}
    >
      {chars.map((c, i) => (
        <span key={i} aria-hidden="true" style={{ display: "inline-block" }}>
          {c}
        </span>
      ))}
    </span>
  );
}
