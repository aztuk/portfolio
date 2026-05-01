import { NOISE_CONFIG, NOISE_PRESETS } from "@/lib/noise";

export const NoiseOverlay = () => {
  const { type, opacity, blendMode, tileSize } = NOISE_CONFIG;
  const preset = NOISE_PRESETS[type];
  const { filterType, baseFrequency, numOctaves } = preset;
  const seed = "seed" in preset ? preset.seed : undefined;

  const seedAttr = seed !== undefined ? ` seed="${seed}"` : "";
  const svg = `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="${filterType}" baseFrequency="${baseFrequency}" numOctaves="${numOctaves}" stitchTiles="stitch"${seedAttr}/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${tileSize}px ${tileSize}px`,
        mixBlendMode: blendMode,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
