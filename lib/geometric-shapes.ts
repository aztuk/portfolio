/**
 * Config, types, and draw helpers for the geometric background shapes.
 * Shape positions are generated deterministically via a seeded RNG so the
 * layout is stable across renders.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type ShapeKind = "triangle" | "plus" | "circle" | "diamond" | "square";

export type GeometricShape = {
  /** Horizontal position as fraction of viewport width (0–1) */
  xFrac: number;
  /** Vertical base position as fraction of viewport height (0–1), tiled */
  yFrac: number;
  /** Side / diameter in logical pixels */
  size: number;
  /** Starting rotation angle in radians */
  rotationOffset: number;
  /** Rotation speed in radians per second (can be negative) */
  rotationSpeed: number;
  kind: ShapeKind;
  /** Fraction of scrollY applied as Y offset (creates depth illusion) */
  parallaxSpeed: number;
  opacity: number;
  /** Pre-formatted "r,g,b" for use inside rgba() */
  colorRgb: string;
  /** Max horizontal displacement (px) applied when mouse is at full edge — signed */
  mouseParallaxX: number;
  /** Max vertical displacement (px) applied when mouse is at full edge — signed */
  mouseParallaxY: number;
};

// ─── Config ──────────────────────────────────────────────────────────────────

export const geometricConfig = {
  /** Total number of shapes scattered across the background */
  count: 58,
  /** Stroke width in logical pixels */
  lineWidth: 1,
} as const;

// ─── Seeded RNG ──────────────────────────────────────────────────────────────

const makeRng = (seed: number) => {
  let s = seed >>> 0;
  return (): number => {
    s = ((Math.imul(s, 1664525) + 1013904223) >>> 0);
    return s / 4294967296;
  };
};

// ─── Shape generation ────────────────────────────────────────────────────────

// Design-token colours (RGB only, used inside rgba())
const DEFAULT_COLORS = [
  "133,155,231", // smooth accent
  "0,254,182",   // primary
  "132,255,0",   // green
  "228,234,255", // white
] as const;

// Weighted pool: more smooth/primary, less green/white
const COLOR_POOL = [0, 0, 0, 1, 1, 1, 2, 3] as const;

const KINDS: ShapeKind[] = ["triangle", "plus", "circle", "diamond", "square"];

export const generateShapes = (colors: readonly string[] = DEFAULT_COLORS): GeometricShape[] => {
  const rng = makeRng(7919);
  const shapes: GeometricShape[] = [];

  for (let i = 0; i < geometricConfig.count; i++) {
    shapes.push({
      xFrac: rng(),
      yFrac: rng(),
      size: 9 + rng() * 20,
      rotationOffset: rng() * Math.PI * 2,
      // ±0.09 rad/s max → full revolution in ~70 s
      rotationSpeed: (rng() - 0.5) * 0.18,
      kind: KINDS[Math.floor(rng() * KINDS.length)],
      // Slower layers (low speed) feel farther away
      parallaxSpeed: 0.04 + rng() * 0.38,
      opacity: 0.03 + rng() * 0.09,
      colorRgb: colors[COLOR_POOL[Math.floor(rng() * COLOR_POOL.length)]] ?? colors[0] ?? DEFAULT_COLORS[0],
      // Signed mouse offsets: mouse normalised to [-1,1] × these values = px displacement
      mouseParallaxX: (rng() - 0.5) * 60, // ±30 px max
      mouseParallaxY: (rng() - 0.5) * 40, // ±20 px max
    });
  }

  return shapes;
};

// ─── Draw helpers ────────────────────────────────────────────────────────────

/**
 * Draw a single shape centered at the current canvas origin.
 * Call ctx.save() / translate / rotate before, ctx.restore() after.
 */
export const drawShape = (
  ctx: CanvasRenderingContext2D,
  kind: ShapeKind,
  size: number,
): void => {
  const r = size / 2;

  ctx.beginPath();

  switch (kind) {
    case "triangle": {
      // Equilateral triangle, centroid at origin
      const h = Math.sqrt(3) * r;
      ctx.moveTo(0, -(2 * h) / 3);
      ctx.lineTo(r, h / 3);
      ctx.lineTo(-r, h / 3);
      ctx.closePath();
      break;
    }
    case "plus": {
      // Two perpendicular lines (+ sign)
      ctx.moveTo(-r, 0);
      ctx.lineTo(r, 0);
      ctx.moveTo(0, -r);
      ctx.lineTo(0, r);
      break;
    }
    case "circle": {
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      break;
    }
    case "diamond": {
      // Slightly narrower than a square rotated 45°
      ctx.moveTo(0, -r);
      ctx.lineTo(r * 0.62, 0);
      ctx.lineTo(0, r);
      ctx.lineTo(-r * 0.62, 0);
      ctx.closePath();
      break;
    }
    case "square": {
      ctx.rect(-r, -r, size, size);
      break;
    }
  }

  ctx.stroke();
};
