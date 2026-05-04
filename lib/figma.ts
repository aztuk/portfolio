import type { FigmaAsset } from "@/content/use-cases/types";

type FigmaEmbedMode = NonNullable<FigmaAsset["mode"]>;

const PROTOTYPE_EMBED_PARAMS: Record<string, string> = {
  "embed-host": "share",
  scaling: "min-zoom",
  "content-scaling": "responsive",
  "footer": "false",
  "viewport-controls": "false",
  "disable-default-keyboard-nav": "true",
  "show-proto-sidebar": "false",
  "hotspot-hints": "false",
  "device-frame": "false",
  "hide-ui": "1",
};

const FILE_EMBED_PARAMS: Record<string, string> = {
  "embed-host": "share",
};

const PROTOTYPE_PASSTHROUGH_PARAMS = new Set([
  "node-id",
  "starting-point-node-id",
  "page-id",
  "version-id",
]);

const FILE_PASSTHROUGH_PARAMS = new Set([
  "page-id",
  "viewport",
]);

/**
 * Accepts any Figma URL (share link or embed src) and returns a clean embed
 * URL with display params adapted to prototype or file navigation mode.
 */
export const isFigmaPrototypeUrl = (src: string): boolean => {
  try {
    return new URL(src).pathname.includes("/proto/");
  } catch {
    return src.includes("/proto/");
  }
};

export const buildFigmaEmbedUrl = (src: string, mode?: FigmaEmbedMode): string => {
  try {
    const url = new URL(src);
    const inferredMode: FigmaEmbedMode =
      mode === "prototype" || isFigmaPrototypeUrl(src) ? "prototype" : "file";

    url.hostname = "embed.figma.com";

    const passthroughParams =
      inferredMode === "prototype" ? PROTOTYPE_PASSTHROUGH_PARAMS : FILE_PASSTHROUGH_PARAMS;
    const kept: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      if (passthroughParams.has(key)) kept[key] = value;
    });

    // Guarantee a starting point so the embed never falls back to frame 0
    if (inferredMode === "prototype" && !kept["starting-point-node-id"] && kept["node-id"]) {
      kept["starting-point-node-id"] = kept["node-id"];
    }

    url.search = "";
    const embedParams =
      inferredMode === "prototype" ? PROTOTYPE_EMBED_PARAMS : FILE_EMBED_PARAMS;

    Object.entries({ ...kept, ...embedParams }).forEach(([k, v]) => {
      url.searchParams.set(k, v);
    });

    return url.toString();
  } catch {
    return src;
  }
};
