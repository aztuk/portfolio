"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { heroConfig } from "@/lib/hero-animation";

const { heroVisual: cfg } = heroConfig;

export const HeroVisual = () => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf: number;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1] — (0,0) = center of viewport
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = () => {
      if (!reducedMotion && !document.hidden && tiltRef.current) {
        currentX += (targetX - currentX) * cfg.mouseEase;
        currentY += (targetY - currentY) * cfg.mouseEase;

        // Mouse top-right → top-right corner presses back
        // rotateX: mouseY > 0 (bottom) → bottom goes back (positive X rotation tilts top toward viewer)
        // rotateY: mouseX > 0 (right)  → right goes back (positive Y rotation)
        const rotX = -currentY * cfg.maxDeg;
        const rotY =  currentX * cfg.maxDeg;

        tiltRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // Outer: perspective container
    <div style={{ perspective: `${cfg.perspective}px` }} aria-hidden="true">
      {/* Tilt layer: receives 3D rotations from RAF */}
      <div ref={tiltRef} style={{ transformStyle: "preserve-3d" }}>
        {/* Float layer: independent CSS levitation */}
        <div className="animate-hero-visual-float">
          <Image
            src="/assets/hero-visual.png"
            alt=""
            width={520}
            height={520}
            priority
            className="select-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};
