import { BlobBackground } from "@/components/shared/BlobBackground";
import { GeometricShapes } from "@/components/shared/GeometricShapes";
import { ParticleGrid } from "@/components/shared/ParticleGrid";

/**
 * Fixed full-screen background layer rendered beneath all page content.
 * Contains animated blobs and particle grid — both react to mouse and scroll.
 */
export const SiteBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-canvas" aria-hidden="true">
      {/* Animated color blobs */}
      <BlobBackground />

      {/* Geometric shapes — subtle outlines with scroll parallax */}
      <GeometricShapes className="absolute inset-0 z-[1]" />

      {/* Particle grid — sits above blobs */}
      <ParticleGrid className="absolute inset-0 z-[1]" />

      {/* Grain — overlay layer */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
          backgroundSize: "220px 220px",
          mixBlendMode: "overlay",
          opacity: 0.09,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g2)'/%3E%3C/svg%3E\")",
          backgroundSize: "320px 320px",
          mixBlendMode: "screen",
          opacity: 0.025,
        }}
      />
    </div>
  );
};
