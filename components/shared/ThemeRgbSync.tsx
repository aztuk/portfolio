"use client";

import { useEffect } from "react";

import { tryColorToRgbTuple } from "@/lib/color";

const TOKEN_MAPPINGS = [
  "--color-canvas",
  "--color-dark-strong",
  "--color-dark-deep",
  "--color-paper",
  "--color-ink",
  "--color-muted",
  "--color-line",
  "--color-accent",
  "--color-accent-strong",
  "--color-primary",
  "--color-primary-strong",
  "--color-green",
  "--color-green-strong",
  "--color-smooth",
  "--color-dark",
  "--color-dark-smooth",
  "--color-secondary",
  "--color-negative",
  "--color-positive",
  "--color-chart-lime",
  "--color-chart-citron",
  "--color-chart-yellow",
  "--color-chart-amber",
  "--color-chart-badge-border",
  "--color-chart-badge-text",
  "--blob-1-from",
  "--blob-1-to",
  "--blob-2-from",
  "--blob-2-to",
  "--blob-3-from",
  "--blob-3-to",
  "--blob-vignette",
] as const;

const toRgbVarName = (token: string) => `${token}-rgb`;

export const ThemeRgbSync = () => {
  useEffect(() => {
    const root = document.documentElement;
    const probe = document.createElement("span");

    probe.setAttribute(
      "style",
      "position:fixed;left:-9999px;top:-9999px;pointer-events:none;visibility:hidden;",
    );
    document.body.appendChild(probe);

    const resolveTuple = (colorValue: string) => {
      probe.style.color = "";
      probe.style.color = colorValue;

      const resolvedColor = getComputedStyle(probe).color;

      return tryColorToRgbTuple(resolvedColor) ?? tryColorToRgbTuple(colorValue);
    };

    const sync = () => {
      const styles = getComputedStyle(root);

      TOKEN_MAPPINGS.forEach((token) => {
        const colorValue = styles.getPropertyValue(token).trim();

        if (!colorValue) {
          return;
        }

        const rgbTuple = resolveTuple(colorValue);

        if (!rgbTuple) {
          return;
        }

        root.style.setProperty(toRgbVarName(token), rgbTuple.replaceAll(",", " "));
      });
    };

    sync();

    const observer = new MutationObserver(() => {
      sync();
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    const themeObserver = new MutationObserver(() => {
      sync();
    });

    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
      probe.remove();
    };
  }, []);

  return null;
};
