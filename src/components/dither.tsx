"use client";

import { useEffect, useRef } from "react";

type DitherProps = {
  waveColor?: [number, number, number];
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
  colorNum?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  waveSpeed?: number;
  className?: string;
};

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uTime;
uniform vec3 uColor;
uniform float uMouseRadius;
uniform float uMouseEnabled;
uniform float uColorNum;
uniform float uAmp;
uniform float uFreq;

float bayer4(vec2 p) {
  int x = int(mod(p.x, 4.0));
  int y = int(mod(p.y, 4.0));
  int idx = x + y * 4;
  if (idx == 0) return 0.0/16.0;
  if (idx == 1) return 8.0/16.0;
  if (idx == 2) return 2.0/16.0;
  if (idx == 3) return 10.0/16.0;
  if (idx == 4) return 12.0/16.0;
  if (idx == 5) return 4.0/16.0;
  if (idx == 6) return 14.0/16.0;
  if (idx == 7) return 6.0/16.0;
  if (idx == 8) return 3.0/16.0;
  if (idx == 9) return 11.0/16.0;
  if (idx == 10) return 1.0/16.0;
  if (idx == 11) return 9.0/16.0;
  if (idx == 12) return 15.0/16.0;
  if (idx == 13) return 7.0/16.0;
  if (idx == 14) return 13.0/16.0;
  return 5.0/16.0;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;
  vec2 c = uv - 0.5;

  float t = uTime;
  float w1 = sin(c.x * uFreq + t) * 0.5;
  float w2 = sin(c.y * uFreq * 1.3 - t * 0.7) * 0.5;
  float w3 = sin((c.x + c.y) * uFreq * 0.6 + t * 0.5) * 0.5;
  float v = 0.5 + (w1 + w2 + w3) * uAmp / 1.5;

  if (uMouseEnabled > 0.5) {
    float md = distance(uv, uMouse);
    if (md < uMouseRadius) {
      v += (uMouseRadius - md) / uMouseRadius * 0.6;
    }
  }

  v = clamp(v, 0.0, 1.0);

  float steps = max(2.0, uColorNum);
  float d = bayer4(frag);
  float quant = floor(v * steps + d) / steps;
  quant = clamp(quant, 0.0, 1.0);

  gl_FragColor = vec4(uColor * quant, 1.0);
}
`;

export default function Dither({
  waveColor = [0.5, 0.5, 0.5],
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.3,
  colorNum = 4,
  waveAmplitude = 0.3,
  waveFrequency = 3,
  waveSpeed = 0.05,
  className
}: DitherProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef({
    waveColor,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius,
    colorNum,
    waveAmplitude,
    waveFrequency,
    waveSpeed
  });
  propsRef.current = {
    waveColor,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius,
    colorNum,
    waveAmplitude,
    waveFrequency,
    waveSpeed
  };

  useEffect(() => {
    const canvas = ref.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;

    const compile = (src: string, type: number) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(VERT, gl.VERTEX_SHADER));
    gl.attachShader(prog, compile(FRAG, gl.FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aLoc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const U = {
      uRes: u("uRes"),
      uMouse: u("uMouse"),
      uTime: u("uTime"),
      uColor: u("uColor"),
      uMouseRadius: u("uMouseRadius"),
      uMouseEnabled: u("uMouseEnabled"),
      uColorNum: u("uColorNum"),
      uAmp: u("uAmp"),
      uFreq: u("uFreq")
    };

    const mouse = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
    };
    wrap.addEventListener("pointermove", onMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = (wrap.clientWidth | 0) * dpr;
      canvas.height = (wrap.clientHeight | 0) * dpr;
      canvas.style.width = wrap.clientWidth + "px";
      canvas.style.height = wrap.clientHeight + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let raf = 0;
    let t = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const p = propsRef.current;
      const dt = (now - last) / 1000;
      last = now;
      if (!p.disableAnimation) t += dt * p.waveSpeed * 60;

      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform2f(U.uMouse, mouse.x, mouse.y);
      gl.uniform1f(U.uTime, t);
      gl.uniform3f(U.uColor, p.waveColor[0], p.waveColor[1], p.waveColor[2]);
      gl.uniform1f(U.uMouseRadius, p.mouseRadius);
      gl.uniform1f(U.uMouseEnabled, p.enableMouseInteraction ? 1 : 0);
      gl.uniform1f(U.uColorNum, p.colorNum);
      gl.uniform1f(U.uAmp, p.waveAmplitude);
      gl.uniform1f(U.uFreq, p.waveFrequency);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`ws-dither ${className ?? ""}`} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas ref={ref} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
