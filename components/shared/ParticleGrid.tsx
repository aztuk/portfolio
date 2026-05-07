"use client";

import { useEffect, useRef } from "react";
import { colorToRgba } from "@/lib/color";
import { heroConfig } from "@/lib/hero-animation";

const { grid: cfg } = heroConfig;

type Dot = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  jx: number; // render-time jitter offset X (does not enter physics)
  jy: number; // render-time jitter offset Y
};

export const ParticleGrid = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inkColor =
      getComputedStyle(document.documentElement).getPropertyValue("--color-ink").trim() || "#ffffff";
    const dpr = window.devicePixelRatio || 1;

    let mx = 0;
    let my = 0;
    let dots: Dot[] = [];
    let raf: number;
    let canvasW = 0;
    let canvasH = 0;
    let gridShiftY = 0;

    // Click / pinch state
    let isPressed = false;
    let cx = 0;
    let cy = 0;
    let holdStart = 0;
    type Wave = { cx: number; cy: number; radius: number; power: number };
    let wave: Wave | null = null;

    const getSize = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();
      return {
        w: rect.width || window.innerWidth,
        h: rect.height || window.innerHeight,
      };
    };

    const build = (w: number, h: number) => {
      dots = [];
      const verticalMargin = cfg.gap;
      for (let x = cfg.gap / 2; x < w + cfg.gap; x += cfg.gap) {
        for (
          let y = cfg.gap / 2 - verticalMargin;
          y < h + cfg.gap + verticalMargin;
          y += cfg.gap
        ) {
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0, jx: 0, jy: 0 });
        }
      }
    };

    const resize = () => {
      const { w, h } = getSize();
      canvasW = w;
      canvasH = h;
      if (mx === 0 && my === 0) {
        mx = w * 0.5;
        my = h * 0.36;
      }
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build(w, h);
      gridShiftY = reducedMotion
        ? 0
        : Math.trunc((-window.scrollY * cfg.scrollParallax) / cfg.gap) * cfg.gap;
    };

    const getLightFactor = (x: number, y: number) => {
      if (mx < 0 || my < 0 || mx > canvasW || my > canvasH) {
        return cfg.ambientAlphaMultiplier;
      }

      const distance = Math.hypot(mx - x, my - y);
      const normalized = Math.max(0, 1 - distance / cfg.pullRadius);
      const eased = normalized * normalized * (3 - 2 * normalized);

      return cfg.ambientAlphaMultiplier + eased * (1 - cfg.ambientAlphaMultiplier);
    };

    const getScrollOffset = () => {
      if (reducedMotion) return 0;
      const rawOffset = -window.scrollY * cfg.scrollParallax - gridShiftY;
      const shiftSteps = Math.trunc(rawOffset / cfg.gap);
      if (shiftSteps === 0) return rawOffset;

      const shift = shiftSteps * cfg.gap;
      gridShiftY += shift;
      for (const dot of dots) {
        dot.y += shift;
        dot.oy += shift;
      }

      return rawOffset - shift;
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvasW, canvasH);

      const holdDuration = isPressed ? (performance.now() - holdStart) / 1000 : 0;
      const holdFactor = isPressed ? Math.min(holdDuration / cfg.maxHoldSec, 1) : 0;
      const scrollOffset = getScrollOffset();
      // Clamp to [0,1] — values > 1 would make the lerp diverge
      const jLerp = Math.min(1, Math.max(0, cfg.jitterSpeed));

      for (let index = 0; index < dots.length; index += 1) {
        const d = dots[index];
        const px = d.x;
        const py = d.y + scrollOffset;
        if (!reducedMotion) {
          const dx = mx - px;
          const dy = my - py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Mouse hover gravity — quadratic falloff within pullRadius
          if (dist < cfg.pullRadius && dist > 1) {
            const t = 1 - dist / cfg.pullRadius;
            const force = t * t * cfg.pullStrength;
            d.vx += (dx / dist) * force;
            d.vy += (dy / dist) * force;
          }

          // Decay jitter offset when not pressed
          if (!isPressed && (d.jx !== 0 || d.jy !== 0)) {
            d.jx *= 1 - jLerp;
            d.jy *= 1 - jLerp;
          }

          // Click pinch — extra attraction toward fixed click center
          if (isPressed) {
            const cdx = cx - px;
            const cdy = cy - py;
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
            if (cdist < cfg.holdPullRadius && cdist > 1) {
              const t = 1 - cdist / cfg.holdPullRadius;
              const force = t * t * cfg.holdPullStrength * holdFactor;
              d.vx += (cdx / cdist) * force;
              d.vy += (cdy / cdist) * force;
            }

            // Jitter — render-time offset, independent of physics
            // Uses d.x/d.y so proximity matches visual dot position
            const jdist = Math.hypot(px - cx, py - cy);
            if (jdist < cfg.jitterRadius) {
              const proximity = 1 - jdist / cfg.jitterRadius;
              const amp = holdFactor * cfg.jitterAmplitude * proximity * proximity;
              const targetX = (Math.random() - 0.5) * 2 * amp;
              const targetY = (Math.random() - 0.5) * 2 * amp;
              // jLerp = 1 → instant snap each frame (max nervousness); < 1 → smooth drift
              d.jx += (targetX - d.jx) * jLerp;
              d.jy += (targetY - d.jy) * jLerp;
            } else {
              d.jx *= 1 - jLerp;
              d.jy *= 1 - jLerp;
            }
          }

          // Wave impulse — expanding ring after release
          if (wave) {
            const wdx = px - wave.cx;
            const wdy = py - wave.cy;
            const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
            const distFromFront = Math.abs(wdist - wave.radius);
            if (distFromFront < cfg.waveWidth && wdist > 1) {
              const band = 1 - distFromFront / cfg.waveWidth;
              const force = wave.power * band * band;
              d.vx += (wdx / wdist) * force;
              d.vy += (wdy / wdist) * force;
            }
          }

          // Constant downward gravity
          d.vy += cfg.gravity;

          // Spring force toward rest position
          d.vx += (d.ox - d.x) * cfg.spring;
          d.vy += (d.oy - d.y) * cfg.spring;

          // Velocity damping
          d.vx *= cfg.damping;
          d.vy *= cfg.damping;

          d.x += d.vx;
          d.y += d.vy;
        }

        const rx = d.x + d.jx;
        const ry = d.y + d.jy + scrollOffset;
        const lightFactor = getLightFactor(rx, ry);

        ctx.beginPath();
        ctx.arc(rx, ry, cfg.dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = colorToRgba(inkColor, cfg.dotAlpha * lightFactor);
        ctx.fill();
      }

      // Advance wave each frame
      if (wave) {
        wave.radius += cfg.waveSpeed;
        wave.power *= cfg.waveDecay;
        if (wave.power < 0.005 || wave.radius > Math.hypot(canvasW, canvasH) + cfg.waveWidth) {
          wave = null;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mx = x;
        my = y;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cx = e.clientX - rect.left;
      cy = e.clientY - rect.top;
      isPressed = true;
      holdStart = performance.now();
      wave = null;
    };

    const onMouseUp = () => {
      if (!isPressed) return;
      const holdDuration = (performance.now() - holdStart) / 1000;
      const holdFactor = Math.min(holdDuration / cfg.maxHoldSec, 1);
      if (holdFactor > 0.05) {
        wave = { cx, cy, radius: 0, power: holdFactor * cfg.waveStrength };
      }
      isPressed = false;
    };

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        display: "block",
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};
