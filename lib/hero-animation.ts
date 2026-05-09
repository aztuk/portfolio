/**
 * Central configuration for all hero section animations.
 * Tweak values here — components read from this file directly.
 */

export const heroConfig = {
  // ─── Blob background ─────────────────────────────────────────────────────

  blobs: {
    /** How quickly blobs track the mouse (0 = frozen, 1 = instant) */
    mouseEase: 0.04,

    /** Per-blob mouse parallax offset in px at full cursor travel */
    parallax: [
      { x: 90,   y: 70  },  // blob 1 — blue, top-left
      { x: -130, y: -100 }, // blob 2 — teal, right
      { x: 65,   y: -55 },  // blob 3 — amber, bottom
    ],

    /**
     * Per-blob scroll parallax speed (fraction of scrollY added to translateY).
     * Positive = moves down slower than content. Negative = moves up.
     */
    scrollParallax: [0.18, -0.22, 0.12],

    /** CSS animation duration for the organic shape morphing */
    floatDuration: ["18s", "22s", "26s"],

    /** blur(Xpx) applied on each blob shape */
    blur: 90,

    /** Per-blob diameter as a CSS value */
    sizes: ["1500px", "1300px", "1000px"],

    /** Per-blob radial gradient — edit the blob CSS variables in globals.css */
    gradients: [
      "radial-gradient(circle at 40% 40%, rgb(var(--blob-1-from-rgb) / 1) 0%, rgb(var(--blob-1-to-rgb) / 1) 45%, transparent 70%)",
      "radial-gradient(circle at 60% 45%, rgb(var(--blob-2-from-rgb) / 1) 0%, rgb(var(--blob-2-to-rgb) / 1) 50%, transparent 70%)",
      "radial-gradient(circle at 50% 55%, rgb(var(--blob-3-from-rgb) / 1) 0%, rgb(var(--blob-3-to-rgb) / 1) 50%, transparent 70%)",
    ],

    /** Per-blob opacity */
    opacities: [
      "var(--blob-1-opacity)",
      "var(--blob-2-opacity)",
      "var(--blob-3-opacity)",
    ],
  },

  // ─── Particle grid ───────────────────────────────────────────────────────

  grid: {
    /** Distance in px between grid points */
    gap: 32,

    /** Dot visual radius in px (canvas coords, pre-DPR) */
    dotRadius: 0.95,

    /** Dot base opacity */
    dotAlpha: 0.2,

    /** Fraction of scrollY applied as a vertical parallax offset. */
    scrollParallax: 0.16,

    /** Radius around the mouse where attraction activates (px) */
    pullRadius: 700,

    /**
     * Peak attraction force applied at distance 0.
     * Force falls off quadratically: f = (1 - d/R)² × pullStrength
     */
    pullStrength: .5,

    /**
     * Spring constant — how fast dots return to their rest position.
     * Higher → snappier return. Equilibrium sag = gravity / spring.
     */
    spring: 0.085,

    /**
     * Velocity damping factor applied every frame (0 = stops instantly, 1 = no damping).
     * Lower values make the spring feel heavier / overdamped.
     */
    damping: 0.72,

    /**
     * Constant downward force added to vy every frame.
     * Creates a subtle gravitational sag from the rest position.
     * Equilibrium offset ≈ gravity / spring (px).
     * Also makes upward mouse pulls feel more effortful than downward ones.
     */
    gravity: 1,

    /** Radius of the mouse-driven light pool in px */
    lightRadius: 800,

    /** Ambient visibility multiplier when particles are outside the light pool */
    ambientAlphaMultiplier: 0.04,

    /** Intensity of the soft light bloom rendered around the cursor */
    glowStrength: 0.05,

    // ── Click / pinch interaction ──────────────────────────────────────────

    /** Radius around the click center where hold attraction activates (px) */
    holdPullRadius: 700,

    /** Extra attraction force at the click epicenter (peak, at max hold) */
    holdPullStrength: .5,

    /** Hold duration (seconds) to reach maximum effect (holdFactor = 1) */
    maxHoldSec: 1,

    /**
     * Lerp factor toward a new random target each frame. Clamped to [0, 1].
     * 1 = instant snap per frame (maximum nervousness / cocaine).
     * 0.1 = slow organic drift. Values above 1 are treated as 1.
     */
    jitterSpeed: 4,

    /** Max render-offset displacement in px at the epicenter (how far dots stray visually) */
    jitterAmplitude: 2,

    /** Radius around click center where jitter is felt (px) */
    jitterRadius: 600,

    /** Max outward impulse of the released wave (at holdFactor = 1) */
    waveStrength: 5,

    /** Speed the wave ring expands each frame (px/frame) */
    waveSpeed: 8,

    /** Width of the wave band that applies force (px) */
    waveWidth: 60,

    /** Per-frame decay multiplier for wave power (< 1 → fades out) */
    waveDecay: 0.95,
  },

  // ─── Hero visual (floating image) ───────────────────────────────────────

  heroVisual: {
    /** Mouse ease — how fast the tilt tracks the cursor (0 = frozen, 1 = instant) */
    mouseEase: 0.06,

    /** CSS perspective distance in px applied to the parent */
    perspective: 900,

    /** Max rotation in degrees at full cursor travel */
    maxDeg: 7,
  },

  field: {
    /** Radius of the mouse-driven light pool in px */
    lightRadius: 200,

    /** Ambient visibility multiplier when particles are outside the light pool */
    ambientAlphaMultiplier: 0.05,

    /** Intensity of the soft light bloom rendered around the cursor */
    glowStrength: 0.04,
  },
} as const;

export type HeroConfig = typeof heroConfig;
