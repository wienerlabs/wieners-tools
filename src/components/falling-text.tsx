"use client";

import { useEffect, useRef, useState } from "react";

type FallingTextProps = {
  text: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: "auto" | "click" | "hover" | "scroll";
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  fontSize?: string;
  mouseConstraintStiffness?: number;
};

export default function FallingText({
  text,
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  fontSize = "1rem",
  mouseConstraintStiffness = 0.2
}: FallingTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [effectStarted, setEffectStarted] = useState(false);

  // Render words as inline spans
  useEffect(() => {
    if (!textRef.current) return;
    const target = textRef.current;
    const words = text.split(/\s+/).filter(Boolean);
    target.innerHTML = words
      .map((word) => {
        const stripped = word.replace(/[^\p{L}\p{N}]/gu, "");
        const isHighlight = highlightWords.some(
          (hw) => stripped.localeCompare(hw, undefined, { sensitivity: "base" }) === 0
        );
        const safe = word
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return `<span class="ft-word ${isHighlight ? highlightClass : ""}">${safe}</span>`;
      })
      .join(" ");
  }, [text, highlightWords, highlightClass]);

  // Decide when the effect kicks in
  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
    return undefined;
  }, [trigger]);

  // Run matter.js
  useEffect(() => {
    if (!effectStarted) return;
    if (!containerRef.current || !textRef.current || !canvasContainerRef.current) return;

    let raf = 0;
    let cleanup: (() => void) | null = null;

    (async () => {
      const Matter = (await import("matter-js")).default;
      const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

      const containerEl = containerRef.current;
      const textEl = textRef.current;
      const canvasEl = canvasContainerRef.current;
      if (!containerEl || !textEl || !canvasEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;
      if (width <= 0 || height <= 0) return;

      const engine = Engine.create();
      engine.world.gravity.y = gravity;

      const render = Render.create({
        element: canvasEl,
        engine,
        options: {
          width,
          height,
          background: backgroundColor,
          wireframes
        }
      });

      const boundary = { isStatic: true, render: { fillStyle: "transparent" } };
      const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundary);
      const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundary);
      const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundary);
      const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundary);

      const wordSpans = textEl.querySelectorAll<HTMLSpanElement>(".ft-word");
      const wordBodies = Array.from(wordSpans).map((elem) => {
        const rect = elem.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
          render: { fillStyle: "transparent" },
          restitution: 0.8,
          frictionAir: 0.01,
          friction: 0.2
        });
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
        elem.style.position = "absolute";
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = "translate(-50%, -50%)";
        return { elem, body };
      });

      const mouse = Mouse.create(containerEl);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: { visible: false }
        }
      });
      render.mouse = mouse;

      World.add(engine.world, [
        floor,
        leftWall,
        rightWall,
        ceiling,
        mouseConstraint,
        ...wordBodies.map((wb) => wb.body)
      ]);

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      const update = () => {
        wordBodies.forEach(({ body, elem }) => {
          const { x, y } = body.position;
          elem.style.left = `${x}px`;
          elem.style.top = `${y}px`;
          elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        });
        raf = requestAnimationFrame(update);
      };
      update();

      cleanup = () => {
        cancelAnimationFrame(raf);
        Render.stop(render);
        Runner.stop(runner);
        if (render.canvas && canvasEl.contains(render.canvas)) {
          canvasEl.removeChild(render.canvas);
        }
        World.clear(engine.world, false);
        Engine.clear(engine);
      };
    })();

    return () => {
      if (cleanup) cleanup();
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleHover = () => {
    if (!effectStarted && trigger === "hover") setEffectStarted(true);
  };
  const handleClick = () => {
    if (!effectStarted && trigger === "click") setEffectStarted(true);
  };

  return (
    <div
      ref={containerRef}
      className="ft-container"
      onMouseOver={trigger === "hover" ? handleHover : undefined}
      onClick={trigger === "click" ? handleClick : undefined}
      style={{ position: "relative", overflow: "hidden", cursor: trigger === "hover" || trigger === "click" ? "pointer" : "default" }}
    >
      <div
        ref={textRef}
        className="ft-target"
        style={{ fontSize, lineHeight: 1.4 }}
      />
      <div className="ft-canvas" ref={canvasContainerRef} />
    </div>
  );
}
