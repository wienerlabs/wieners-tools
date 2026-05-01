"use client";

import { useEffect, useRef } from "react";

type GalaxyProps = {
  mouseRepulsion?: boolean;
  mouseInteraction?: boolean;
  density?: number;
  glowIntensity?: number;
  saturation?: number;
  hueShift?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  starSpeed?: number;
  speed?: number;
  className?: string;
};

const VERT = `
attribute vec3 aPos;
attribute float aSize;
attribute float aSeed;
uniform mat4 uProj;
uniform mat4 uView;
uniform float uTime;
uniform float uRot;
uniform float uStarSpeed;
uniform vec2 uMouse;
uniform float uRepStrength;
uniform float uRepEnabled;
uniform float uTwinkle;
varying float vSeed;
varying float vAlpha;

void main() {
  float r = length(aPos.xz);
  float a = atan(aPos.z, aPos.x) + uTime * uRot * (1.0 + uStarSpeed * 0.4) / max(r, 0.4);
  vec3 p = vec3(cos(a) * r, aPos.y, sin(a) * r);

  if (uRepEnabled > 0.5) {
    vec2 dir = p.xz - uMouse * 4.0;
    float d = length(dir) + 0.001;
    float push = uRepStrength * 0.4 / (d * d);
    push = clamp(push, 0.0, 0.5);
    p.xz += normalize(dir) * push;
  }

  gl_Position = uProj * uView * vec4(p, 1.0);

  float tw = 0.6 + 0.4 * sin(uTime * 2.0 + aSeed * 6.28);
  vAlpha = mix(1.0, tw, uTwinkle);
  vSeed = aSeed;

  float dist = -gl_Position.z;
  gl_PointSize = aSize * (24.0 / max(dist, 0.5));
}
`;

const FRAG = `
precision highp float;
uniform float uGlow;
uniform float uSat;
uniform float uHue;
varying float vSeed;
varying float vAlpha;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float core = smoothstep(0.5, 0.0, d);
  float halo = exp(-d * 6.0) * uGlow;
  float a = (core + halo) * vAlpha;

  float hue = mod(uHue / 360.0 + vSeed * 0.15, 1.0);
  vec3 col = hsv2rgb(vec3(hue, uSat, 1.0));
  col = mix(vec3(1.0), col, uSat);

  gl_FragColor = vec4(col, a);
}
`;

function mat4Identity() {
  const m = new Float32Array(16);
  m[0] = 1; m[5] = 1; m[10] = 1; m[15] = 1;
  return m;
}

function mat4Perspective(fov: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fov / 2);
  const m = new Float32Array(16);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = (far + near) / (near - far);
  m[11] = -1;
  m[14] = (2 * far * near) / (near - far);
  return m;
}

function mat4LookAt(eye: [number, number, number], target: [number, number, number], up: [number, number, number]) {
  const [ex, ey, ez] = eye;
  const [tx, ty, tz] = target;
  let zx = ex - tx, zy = ey - ty, zz = ez - tz;
  let l = Math.hypot(zx, zy, zz); zx /= l; zy /= l; zz /= l;
  let xx = up[1] * zz - up[2] * zy;
  let xy = up[2] * zx - up[0] * zz;
  let xz = up[0] * zy - up[1] * zx;
  l = Math.hypot(xx, xy, xz); xx /= l; xy /= l; xz /= l;
  const yx = zy * xz - zz * xy;
  const yy = zz * xx - zx * xz;
  const yz = zx * xy - zy * xx;
  const m = new Float32Array(16);
  m[0] = xx; m[1] = yx; m[2] = zx; m[3] = 0;
  m[4] = xy; m[5] = yy; m[6] = zy; m[7] = 0;
  m[8] = xz; m[9] = yz; m[10] = zz; m[11] = 0;
  m[12] = -(xx * ex + xy * ey + xz * ez);
  m[13] = -(yx * ex + yy * ey + yz * ez);
  m[14] = -(zx * ex + zy * ey + zz * ez);
  m[15] = 1;
  return m;
}

void mat4Identity;

export default function Galaxy({
  mouseRepulsion = false,
  mouseInteraction = false,
  density = 1,
  glowIntensity = 0.3,
  saturation = 0,
  hueShift = 140,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  repulsionStrength = 2,
  autoCenterRepulsion = 0,
  starSpeed = 0.5,
  speed = 1,
  className
}: GalaxyProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLCanvasElement | null>(null);
  const propsRef = useRef({
    mouseRepulsion,
    mouseInteraction,
    density,
    glowIntensity,
    saturation,
    hueShift,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    starSpeed,
    speed
  });
  propsRef.current = {
    mouseRepulsion,
    mouseInteraction,
    density,
    glowIntensity,
    saturation,
    hueShift,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    starSpeed,
    speed
  };

  useEffect(() => {
    const canvas = ref.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });
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

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const N = Math.floor(900 * Math.max(0.2, density));
    const positions = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    const seeds = new Float32Array(N);
    const ARMS = 4;
    for (let i = 0; i < N; i++) {
      const t = Math.random();
      const r = Math.pow(t, 0.55) * 5.5 + 0.4;
      const arm = Math.floor(Math.random() * ARMS);
      const armAngle = (arm / ARMS) * Math.PI * 2;
      const spiral = r * 0.7;
      const ang = armAngle + spiral + (Math.random() - 0.5) * 0.5;
      const yJit = (Math.random() - 0.5) * 0.4 * (1 - t * 0.6);
      positions[i * 3] = Math.cos(ang) * r;
      positions[i * 3 + 1] = yJit;
      positions[i * 3 + 2] = Math.sin(ang) * r;
      sizes[i] = 0.6 + Math.random() * Math.random() * 3.5;
      seeds[i] = Math.random();
    }

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

    const sizeBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
    const aSize = gl.getAttribLocation(prog, "aSize");
    gl.enableVertexAttribArray(aSize);
    gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

    const seedBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuf);
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
    const aSeed = gl.getAttribLocation(prog, "aSeed");
    gl.enableVertexAttribArray(aSeed);
    gl.vertexAttribPointer(aSeed, 1, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const U = {
      uProj: u("uProj"),
      uView: u("uView"),
      uTime: u("uTime"),
      uRot: u("uRot"),
      uStarSpeed: u("uStarSpeed"),
      uMouse: u("uMouse"),
      uRepStrength: u("uRepStrength"),
      uRepEnabled: u("uRepEnabled"),
      uTwinkle: u("uTwinkle"),
      uGlow: u("uGlow"),
      uSat: u("uSat"),
      uHue: u("uHue")
    };

    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    wrap.addEventListener("pointermove", onMove);

    const view = mat4LookAt([0, 2.4, 7], [0, 0, 0], [0, 1, 0]);
    let aspect = 1;
    let proj = mat4Perspective(Math.PI / 4, 1, 0.1, 100);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth | 0;
      const h = wrap.clientHeight | 0;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      aspect = w / Math.max(h, 1);
      proj = mat4Perspective(Math.PI / 4, aspect, 0.1, 100);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const p = propsRef.current;
      const t = ((now - start) / 1000) * p.speed;

      gl.clearColor(0.02, 0.02, 0.04, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniformMatrix4fv(U.uProj, false, proj);
      gl.uniformMatrix4fv(U.uView, false, view);
      gl.uniform1f(U.uTime, t);
      gl.uniform1f(U.uRot, p.rotationSpeed);
      gl.uniform1f(U.uStarSpeed, p.starSpeed);
      gl.uniform2f(U.uMouse, p.mouseInteraction ? mouse.x : 0, p.mouseInteraction ? mouse.y : 0);
      gl.uniform1f(U.uRepStrength, p.repulsionStrength + p.autoCenterRepulsion);
      gl.uniform1f(U.uRepEnabled, p.mouseRepulsion ? 1 : 0);
      gl.uniform1f(U.uTwinkle, p.twinkleIntensity);
      gl.uniform1f(U.uGlow, p.glowIntensity);
      gl.uniform1f(U.uSat, p.saturation);
      gl.uniform1f(U.uHue, p.hueShift);

      gl.drawArrays(gl.POINTS, 0, N);
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
    <div ref={wrapRef} className={`ws-galaxy ${className ?? ""}`} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas ref={ref} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
