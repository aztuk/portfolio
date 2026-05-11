"use client";

import { useEffect } from "react";

const normalizeRgb = (value: string) => value.replace(/\s+/g, " ").trim();

const rgbTupleToRgb = (value: string) => {
  const parts = value.trim().split(/\s+/);

  if (parts.length !== 3) {
    return value.trim();
  }

  return `rgb(${parts.join(", ")})`;
};

const readToken = (styles: CSSStyleDeclaration, token: string) =>
  styles.getPropertyValue(token).trim();

export const ThemeDiagnostics = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const root = document.documentElement;

    const runDiagnostics = () => {
      const rootStyles = getComputedStyle(root);
      const expectedPrimary = rgbTupleToRgb(readToken(rootStyles, "--color-primary-rgb"));
      const expectedCanvas = rgbTupleToRgb(readToken(rootStyles, "--color-canvas-rgb"));

      const textProbe = document.createElement("span");
      textProbe.className = "text-primary";
      textProbe.textContent = "theme-probe";

      const backgroundProbe = document.createElement("div");
      backgroundProbe.className = "bg-primary";

      const borderProbe = document.createElement("div");
      borderProbe.className = "border border-primary";

      const fragment = document.createDocumentFragment();
      [textProbe, backgroundProbe, borderProbe].forEach((node) => {
        node.setAttribute(
          "style",
          "position:fixed;left:-9999px;top:-9999px;pointer-events:none;",
        );
        fragment.appendChild(node);
      });

      document.body.appendChild(fragment);

      const textColor = normalizeRgb(getComputedStyle(textProbe).color);
      const backgroundColor = normalizeRgb(getComputedStyle(backgroundProbe).backgroundColor);
      const borderColor = normalizeRgb(getComputedStyle(borderProbe).borderTopColor);
      const bodyColor = normalizeRgb(getComputedStyle(document.body).color);
      const bodyBackground = normalizeRgb(getComputedStyle(document.body).backgroundColor);
      const expectedPrimaryNormalized = normalizeRgb(expectedPrimary);
      const expectedCanvasNormalized = normalizeRgb(expectedCanvas);

      console.groupCollapsed("[theme] diagnostics");
      console.log("token --color-primary:", readToken(rootStyles, "--color-primary"));
      console.log("token --color-primary-rgb:", readToken(rootStyles, "--color-primary-rgb"));
      console.log("token --color-canvas:", readToken(rootStyles, "--color-canvas"));
      console.log("token --color-canvas-rgb:", readToken(rootStyles, "--color-canvas-rgb"));
      console.log("computed .text-primary:", textColor);
      console.log("computed .bg-primary:", backgroundColor);
      console.log("computed .border-primary:", borderColor);
      console.log("computed body color:", bodyColor);
      console.log("computed body background-color:", bodyBackground);

      if (
        textColor !== expectedPrimaryNormalized ||
        backgroundColor !== expectedPrimaryNormalized ||
        borderColor !== expectedPrimaryNormalized
      ) {
        console.warn(
          "[theme] mismatch detected: Tailwind is not applying the current primary token. This usually means stale generated CSS is being served.",
        );
      }

      if (bodyBackground && bodyBackground !== "rgba(0, 0, 0, 0)" && bodyBackground !== expectedCanvasNormalized) {
        console.warn(
          "[theme] canvas mismatch detected: body background-color differs from the current canvas token.",
        );
      }

      console.groupEnd();

      [textProbe, backgroundProbe, borderProbe].forEach((node) => {
        node.remove();
      });
    };

    const timeoutId = window.setTimeout(runDiagnostics, 0);
    const observer = new MutationObserver(() => {
      window.setTimeout(runDiagnostics, 0);
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    const themeObserver = new MutationObserver(() => {
      window.setTimeout(runDiagnostics, 0);
    });

    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return null;
};
