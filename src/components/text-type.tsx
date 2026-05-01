"use client";

import { useEffect, useRef, useState } from "react";

type TextTypeProps = {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  variableSpeedEnabled?: boolean;
  variableSpeedMin?: number;
  variableSpeedMax?: number;
  className?: string;
  loop?: boolean;
  onSequenceComplete?: () => void;
};

export default function TextType({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  deletingSpeed = 50,
  showCursor = true,
  cursorCharacter = "_",
  cursorBlinkDuration = 0.5,
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  className,
  loop = true,
  onSequenceComplete
}: TextTypeProps) {
  const [index, setIndex] = useState(0);
  const [out, setOut] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "done">("typing");
  const timeoutRef = useRef<number | null>(null);

  const items = text.length > 0 ? text : [""];

  useEffect(() => {
    const target = items[index] ?? "";
    const baseTyping = variableSpeedEnabled
      ? Math.floor(variableSpeedMin + Math.random() * (variableSpeedMax - variableSpeedMin))
      : typingSpeed;

    if (phase === "typing") {
      if (out.length < target.length) {
        timeoutRef.current = window.setTimeout(
          () => setOut(target.slice(0, out.length + 1)),
          baseTyping
        );
      } else {
        timeoutRef.current = window.setTimeout(() => setPhase("pausing"), pauseDuration);
      }
    } else if (phase === "pausing") {
      const last = index === items.length - 1;
      if (last && !loop) {
        setPhase("done");
        onSequenceComplete?.();
      } else {
        setPhase("deleting");
      }
    } else if (phase === "deleting") {
      if (out.length > 0) {
        timeoutRef.current = window.setTimeout(
          () => setOut(out.slice(0, -1)),
          deletingSpeed
        );
      } else {
        const next = (index + 1) % items.length;
        setIndex(next);
        setPhase("typing");
        if (next === 0) onSequenceComplete?.();
      }
    }
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [
    out,
    phase,
    index,
    items,
    typingSpeed,
    pauseDuration,
    deletingSpeed,
    variableSpeedEnabled,
    variableSpeedMin,
    variableSpeedMax,
    loop,
    onSequenceComplete
  ]);

  return (
    <span className={className} aria-live="polite">
      <span>{out}</span>
      {showCursor ? (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            marginLeft: 2,
            animation: `wsBlink ${cursorBlinkDuration * 2}s steps(1) infinite`
          }}
        >
          {cursorCharacter}
        </span>
      ) : null}
      <style>{`@keyframes wsBlink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }`}</style>
    </span>
  );
}
