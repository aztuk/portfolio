"use client";

import { useEffect, useRef } from "react";
import { colorToRgba } from "@/lib/color";
import { heroConfig } from "@/lib/hero-animation";

type ParticleFieldProps = {
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
  alpha: number;
};

const { field: cfg } = heroConfig;

const createParticles = (width: number, height: number, count: number): Particle[] =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.8 + 0.6,
    velocityX: (Math.random() - 0.5) * 0.12,
    velocityY: (Math.random() - 0.5) * 0.16,
    alpha: Math.random() * 0.4 + 0.12,
  }));

export const ParticleField = ({ className }: ParticleFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const inkColor =
      getComputedStyle(document.documentElement).getPropertyValue("--color-ink").trim() || "#ffffff";
    let animationFrame = 0;
    let particles: Particle[] = [];
    let mx = 0;
    let my = 0;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (mx === 0 && my === 0) {
        mx = width * 0.56;
        my = height * 0.32;
      }
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height, Math.max(16, Math.floor(width / 48)));
    };

    const getLightFactor = (x: number, y: number, width: number, height: number) => {
      if (mx < 0 || my < 0 || mx > width || my > height) {
        return cfg.ambientAlphaMultiplier;
      }

      const distance = Math.hypot(mx - x, my - y);
      const normalized = Math.max(0, 1 - distance / cfg.lightRadius);
      const eased = normalized * normalized * (3 - 2 * normalized);

      return cfg.ambientAlphaMultiplier + eased * (1 - cfg.ambientAlphaMultiplier);
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];

        if (!reducedMotion) {
          particle.x += particle.velocityX;
          particle.y += particle.velocityY;

          if (particle.x < -12) particle.x = width + 12;
          if (particle.x > width + 12) particle.x = -12;
          if (particle.y < -12) particle.y = height + 12;
          if (particle.y > height + 12) particle.y = -12;
        }

        const lightFactor = getLightFactor(particle.x, particle.y, width, height);

        context.beginPath();
        context.fillStyle = colorToRgba(inkColor, particle.alpha * lightFactor);
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mx = x;
        my = y;
      }
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
