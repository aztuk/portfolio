// ─── Noise Overlay Configuration ────────────────────────────────────────────
//
// Tweak these values to adjust the grain/glass effect across the whole app.

// ── Active preset ────────────────────────────────────────────────────────────
export const NOISE_CONFIG = {
  /** Which noise preset to use — see NOISE_PRESETS below */
  type: "film-grain" as NoiseType,

  /** Overall visibility of the grain layer (0 = invisible, 0.2 = heavy) */
  opacity: 0.5,

  /**
   * CSS mix-blend-mode applied to the overlay.
   * Good options: "overlay" | "soft-light" | "screen" | "color-dodge" | "multiply"
   */
  blendMode: "overlay" as React.CSSProperties["mixBlendMode"],

  /** Tile size in pixels — smaller = denser pattern, larger = coarser tiling */
  tileSize: 180,
} as const satisfies NoiseConfig;

// ── Noise presets ─────────────────────────────────────────────────────────────
//
// Each preset maps to a distinct SVG feTurbulence configuration.
// Pick one by setting NOISE_CONFIG.type above.

export const NOISE_PRESETS = {
  /**
   * Fine uniform grain — classic film stock look.
   * Best blend modes: overlay, soft-light
   */
  "film-grain": {
    label: "Film Grain",
    filterType: "fractalNoise",
    baseFrequency: "0.65",
    numOctaves: 4,
  },

  /**
   * Soft organic noise — evokes frosted or etched glass.
   * Best blend modes: soft-light, overlay
   */
  "frosted-glass": {
    label: "Frosted Glass",
    filterType: "fractalNoise",
    baseFrequency: "0.40",
    numOctaves: 6,
  },

  /**
   * Coarse grainy sand — raw texture, high visual weight.
   * Best blend modes: overlay, multiply
   */
  "coarse-sand": {
    label: "Coarse Sand",
    filterType: "fractalNoise",
    baseFrequency: "0.28",
    numOctaves: 8,
    seed: 3,
  },

  /**
   * Anisotropic paper fibers — directional horizontal/vertical grain.
   * Best blend modes: soft-light, screen
   */
  "paper": {
    label: "Paper",
    filterType: "fractalNoise",
    baseFrequency: "0.85 0.92",
    numOctaves: 3,
    seed: 7,
  },

  /**
   * Sharp turbulence — raw CRT / analogue static.
   * Best blend modes: screen, color-dodge
   */
  "static": {
    label: "Static",
    filterType: "turbulence",
    baseFrequency: "0.88",
    numOctaves: 1,
  },
} as const satisfies Record<string, NoisePreset>;

// ── Types ─────────────────────────────────────────────────────────────────────

export type NoiseType = keyof typeof NOISE_PRESETS;

type NoisePreset = {
  label: string;
  filterType: "fractalNoise" | "turbulence";
  baseFrequency: string;
  numOctaves: number;
  seed?: number;
};

type NoiseConfig = {
  type: NoiseType;
  opacity: number;
  blendMode: React.CSSProperties["mixBlendMode"];
  tileSize: number;
};
