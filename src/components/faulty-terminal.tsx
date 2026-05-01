"use client";

import { useEffect, useRef } from "react";

type FaultyTerminalProps = {
  scale?: number;
  gridMul?: [number, number];
  digitSize?: number;
  timeScale?: number;
  pause?: boolean;
  scanlineIntensity?: number;
  glitchAmount?: number;
  flickerAmount?: number;
  noiseAmp?: number;
  chromaticAberration?: number;
  dither?: number;
  curvature?: number;
  tint?: string;
  mouseReact?: boolean;
  mouseStrength?: number;
  pageLoadAnimation?: boolean;
  brightness?: number;
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
uniform float uScale;
uniform vec2 uGridMul;
uniform float uDigitSize;
uniform float uScanline;
uniform float uGlitch;
uniform float uFlicker;
uniform float uNoise;
uniform float uChroma;
uniform float uDither;
uniform float uCurv;
uniform vec3 uTint;
uniform float uMouseReact;
uniform float uMouseStrength;
uniform float uBrightness;
uniform float uPageLoad;

float hash11(float n) { return fract(sin(n) * 43758.5453123); }
float hash21(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

vec2 curveUV(vec2 uv, float k) {
  vec2 c = uv - 0.5;
  float r = dot(c, c);
  return uv + c * r * k;
}

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

float sampleCell(vec2 cell, float t) {
  float seed = hash21(cell + floor(t));
  float blink = step(0.55, seed);
  float sub = hash21(cell * 2.13 + floor(t * 0.5));
  return blink * (0.4 + 0.6 * sub) * uDigitSize;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;
  vec2 cuv = curveUV(uv, uCurv);
  if (cuv.x < 0.0 || cuv.x > 1.0 || cuv.y < 0.0 || cuv.y > 1.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 mouseDelta = (cuv - uMouse) * uMouseReact * uMouseStrength * 0.05;
  cuv += mouseDelta;

  float t = uTime;
  vec2 grid = vec2(80.0 * uGridMul.x, 50.0 * uGridMul.y) / uScale;
  vec2 cell = floor(cuv * grid);

  float gShift = (hash11(floor(t * 8.0)) > 0.92 - uGlitch * 0.08) ? hash11(cell.y * 7.3 + t) * 0.04 * uGlitch : 0.0;
  cell.x = floor((cuv.x + gShift) * grid.x);

  float br = sampleCell(cell, t * 6.0);

  float scanY = cuv.y * uRes.y;
  float scan = 0.5 + 0.5 * sin(scanY * 1.6);
  br *= 1.0 - uScanline * (1.0 - scan) * 0.7;

  float fl = 1.0 - uFlicker * 0.18 * hash11(floor(t * 30.0));
  br *= fl;

  float nz = (hash21(frag + t) - 0.5) * uNoise * 0.18;
  br += nz;

  float load = mix(1.0, smoothstep(0.0, 1.0, t * 0.6), uPageLoad);
  br *= load;

  vec3 col = uTint * br * uBrightness;

  if (uChroma > 0.0) {
    float r = sampleCell(floor((cuv + vec2(uChroma * 0.002, 0.0)) * grid), t * 6.0);
    float b = sampleCell(floor((cuv - vec2(uChroma * 0.002, 0.0)) * grid), t * 6.0);
    col = vec3(r, br, b) * uTint * uBrightness;
  }

  if (uDither > 0.0) {
    float d = bayer4(frag) - 0.5;
    col += d * uDither * 0.08;
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace("#", "").match(/[a-f\d]{2}/gi);
  if (!m || m.length < 3) return [1, 1, 1];
  return [parseInt(m[0], 16) / 255, parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255];
}

export default function FaultyTerminal({
  scale = 1,
  gridMul = [1, 1],
  digitSize = 1,
  timeScale = 1,
  pause = false,
  scanlineIntensity = 0.5,
  glitchAmount = 1,
  flickerAmount = 1,
  noiseAmp = 1,
  chromaticAberration = 0,
  dither = 0,
  curvature = 0.1,
  tint = "#A7EF9E",
  mouseReact = true,
  mouseStrength = 0.5,
  pageLoadAnimation = true,
  brightness = 0.6,
  className
}: FaultyTerminalProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef({
    scale,
    gridMul,
    digitSize,
    timeScale,
    pause,
    scanlineIntensity,
    glitchAmount,
    flickerAmount,
    noiseAmp,
    chromaticAberration,
    dither,
    curvature,
    tint,
    mouseReact,
    mouseStrength,
    brightness
  });
  propsRef.current = {
    scale,
    gridMul,
    digitSize,
    timeScale,
    pause,
    scanlineIntensity,
    glitchAmount,
    flickerAmount,
    noiseAmp,
    chromaticAberration,
    dither,
    curvature,
    tint,
    mouseReact,
    mouseStrength,
    brightness
  };

  useEffect(() => {
    const canvas = ref.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (src: string, type: number) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
      }
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(VERT, gl.VERTEX_SHADER));
    gl.attachShader(prog, compile(FRAG, gl.FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aLoc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const U = {
      uRes: u("uRes"),
      uMouse: u("uMouse"),
      uTime: u("uTime"),
      uScale: u("uScale"),
      uGridMul: u("uGridMul"),
      uDigitSize: u("uDigitSize"),
      uScanline: u("uScanline"),
      uGlitch: u("uGlitch"),
      uFlicker: u("uFlicker"),
      uNoise: u("uNoise"),
      uChroma: u("uChroma"),
      uDither: u("uDither"),
      uCurv: u("uCurv"),
      uTint: u("uTint"),
      uMouseReact: u("uMouseReact"),
      uMouseStrength: u("uMouseStrength"),
      uBrightness: u("uBrightness"),
      uPageLoad: u("uPageLoad")
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
      const w = wrap.clientWidth | 0;
      const h = wrap.clientHeight | 0;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const start = performance.now();
    let raf = 0;
    let last = start;

    const loop = (now: number) => {
      const p = propsRef.current;
      const dt = (now - last) / 1000;
      last = now;
      const t = (now - start) / 1000;

      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform2f(U.uMouse, mouse.x, mouse.y);
      gl.uniform1f(U.uTime, p.pause ? 0 : t * p.timeScale);
      gl.uniform1f(U.uScale, p.scale);
      gl.uniform2f(U.uGridMul, p.gridMul[0], p.gridMul[1]);
      gl.uniform1f(U.uDigitSize, p.digitSize);
      gl.uniform1f(U.uScanline, p.scanlineIntensity);
      gl.uniform1f(U.uGlitch, p.glitchAmount);
      gl.uniform1f(U.uFlicker, p.flickerAmount);
      gl.uniform1f(U.uNoise, p.noiseAmp);
      gl.uniform1f(U.uChroma, p.chromaticAberration);
      gl.uniform1f(U.uDither, p.dither);
      gl.uniform1f(U.uCurv, p.curvature);
      gl.uniform3f(U.uTint, ...hexToRgb(p.tint));
      gl.uniform1f(U.uMouseReact, p.mouseReact ? 1 : 0);
      gl.uniform1f(U.uMouseStrength, p.mouseStrength);
      gl.uniform1f(U.uBrightness, p.brightness);
      gl.uniform1f(U.uPageLoad, pageLoadAnimation ? 1 : 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      void dt;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} className={`ws-faulty-terminal ${className ?? ""}`} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas ref={ref} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
