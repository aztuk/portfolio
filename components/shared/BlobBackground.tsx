"use client";

import { useEffect, useRef } from "react";
import { heroConfig } from "@/lib/hero-animation";

const { blobs: cfg } = heroConfig;

const BLOB_POSITIONS = [
  { top: "-10%", left: "-5%" },
  { top: "10%", right: "-10%" },
  { bottom: "-5%", left: "20%" },
] as const;

const BLOB_ANIM_CLASSES = ["animate-blob-1", "animate-blob-2", "animate-blob-3"] as const;

export const BlobBackground = () => {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapperRefs = [blob1Ref, blob2Ref, blob3Ref];
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollY = 0;
    let raf: number;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1] based on viewport
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const animate = () => {
      if (!reducedMotion) {
        currentX += (targetX - currentX) * cfg.mouseEase;
        currentY += (targetY - currentY) * cfg.mouseEase;

        wrapperRefs.forEach((ref, i) => {
          if (ref.current) {
            const mouseOffsetX = currentX * cfg.parallax[i].x;
            const mouseOffsetY = currentY * cfg.parallax[i].y;
            const scrollOffset = scrollY * cfg.scrollParallax[i];
            ref.current.style.transform =
              `translate(${mouseOffsetX}px, ${mouseOffsetY + scrollOffset}px)`;
          }
        });
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {BLOB_POSITIONS.map((position, i) => (
        <div
          key={i}
          ref={[blob1Ref, blob2Ref, blob3Ref][i]}
          className="blob-wrapper"
          style={position}
        >
          <div
            className={`blob-shape ${BLOB_ANIM_CLASSES[i]}`}
            style={{
              width: cfg.sizes[i],
              height: cfg.sizes[i],
              background: cfg.gradients[i],
              opacity: cfg.opacities[i],
              filter: `blur(${cfg.blur}px)`,
              animationDuration: cfg.floatDuration[i],
            }}
          />
        </div>
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgb(var(--blob-vignette-rgb) / var(--blob-vignette-alpha)) 100%)",
        }}
      />
    </div>
  );
};
