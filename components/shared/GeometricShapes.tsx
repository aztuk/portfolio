"use client";

import { useEffect, useRef } from "react";
import { colorToRgba, colorToRgbTuple } from "@/lib/color";
import {
  geometricConfig,
  generateShapes,
  drawShape,
} from "@/lib/geometric-shapes";

// Generate once at module level — deterministic, no re-computation on re-render

/**
 * Full-screen canvas that renders subtle geometric outlines (triangles, circles,
 * crosses, diamonds, squares) scattered across the background.
 *
 * Each shape:
 *  - moves on scroll at its own parallax speed (creates depth)
 *  - rotates slowly over time
 *  - tiles seamlessly in the Y axis so shapes are always visible
 *  - respects prefers-reduced-motion (static, no parallax, no rotation)
 */
export const GeometricShapes = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const dpr = window.devicePixelRatio || 1;
    let viewW = 0;
    let viewH = 0;
    let scrollY = 0;
    let rafId: number;
    const rootStyles = getComputedStyle(document.documentElement);
    const formatRgb = (token: string, fallback: string) =>
      colorToRgbTuple(rootStyles.getPropertyValue(token).trim() || fallback);
    const shapes = generateShapes([
      formatRgb("--color-accent", "#859be7"),
      formatRgb("--color-primary", "#00feb6"),
      formatRgb("--color-green", "#84ff00"),
      formatRgb("--color-ink", "#ffffff"),
    ]);

    // Mouse: target = raw normalised position [-1,1], current = lerped
    let targetMX = 0;
    let targetMY = 0;
    let currentMX = 0;
    let currentMY = 0;
    const MOUSE_EASE = 0.045;

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = () => {
      viewW = window.innerWidth;
      viewH = window.innerHeight;
      canvas.width = viewW * dpr;
      canvas.height = viewH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // ── Mouse ─────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // ── Scroll ────────────────────────────────────────────────────────────
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    // ── Draw loop ─────────────────────────────────────────────────────────
    const tick = (timestamp: number) => {
      ctx.clearRect(0, 0, viewW, viewH);

      const elapsed = reducedMotion ? 0 : timestamp / 1000; // seconds
      const sy = reducedMotion ? 0 : scrollY;

      // Lerp mouse toward target
      if (!reducedMotion) {
        currentMX += (targetMX - currentMX) * MOUSE_EASE;
        currentMY += (targetMY - currentMY) * MOUSE_EASE;
      }

      ctx.lineWidth = geometricConfig.lineWidth;

      for (const shape of shapes) {
        const mouseOffsetX = currentMX * shape.mouseParallaxX;
        const mouseOffsetY = currentMY * shape.mouseParallaxY;
        const x = shape.xFrac * viewW + mouseOffsetX;

        // Scroll + mouse parallax
        const rawY = shape.yFrac * viewH - sy * shape.parallaxSpeed + mouseOffsetY;

        // Tile vertically so shapes remain distributed at all scroll depths
        const tileY = ((rawY % viewH) + viewH) % viewH;

        // Slow rotation over time
        const angle = shape.rotationOffset + elapsed * shape.rotationSpeed;

        const paint = (px: number, py: number) => {
          // Skip shapes fully outside the viewport (with a small margin)
          if (py < -shape.size || py > viewH + shape.size) return;

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(angle);
          ctx.strokeStyle = colorToRgba(shape.colorRgb, shape.opacity);
          drawShape(ctx, shape.kind, shape.size);
          ctx.restore();
        };

        paint(x, tileY);

        // Draw at the adjacent tile positions to eliminate seam pop-in
        if (tileY < shape.size) paint(x, tileY + viewH);
        if (tileY > viewH - shape.size) paint(x, tileY - viewH);
      }

      rafId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
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
