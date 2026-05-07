import type { Config } from "tailwindcss";

const withAlpha = (variableName: string) =>
  `rgb(var(${variableName}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: withAlpha("--color-canvas-rgb"),
        ink: withAlpha("--color-ink-rgb"),
        muted: withAlpha("--color-muted-rgb"),
        line: withAlpha("--color-line-rgb"),
        accent: withAlpha("--color-accent-rgb"),
        paper: withAlpha("--color-paper-rgb"),
        primary: withAlpha("--color-primary-rgb"),
        green: withAlpha("--color-green-rgb"),
        smooth: withAlpha("--color-smooth-rgb"),
        dark: withAlpha("--color-dark-rgb"),
        "dark-smooth": withAlpha("--color-dark-smooth-rgb"),
        secondary: withAlpha("--color-secondary-rgb"),
        negative: withAlpha("--color-negative-rgb"),
        positive: withAlpha("--color-positive-rgb"),
        "chart-lime": withAlpha("--color-chart-lime-rgb"),
        "chart-citron": withAlpha("--color-chart-citron-rgb"),
        "chart-yellow": withAlpha("--color-chart-yellow-rgb"),
        "chart-amber": withAlpha("--color-chart-amber-rgb"),
        "chart-badge-border": withAlpha("--color-chart-badge-border-rgb"),
        "chart-badge-text": withAlpha("--color-chart-badge-text-rgb"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        tektur: ["var(--font-tektur)", "sans-serif"],
        elite: ["var(--font-elite)", "serif"],
      },
      boxShadow: {
        soft: "0 40px 120px rgb(var(--color-dark-deep-rgb) / 0.48), inset 0 1px 0 rgb(var(--color-line-rgb) / 0.05)",
        card: "0 24px 60px rgb(var(--color-dark-deep-rgb) / 0.34), inset 0 1px 0 rgb(var(--color-line-rgb) / 0.04)",
        "elevation-2": "0px 8px 21px rgb(var(--color-dark-deep-rgb) / 0.15), 0px 5px 13px rgb(var(--color-dark-deep-rgb) / 0.15), 0px 3px 8px rgb(var(--color-dark-deep-rgb) / 0.15), 0px 2px 5px rgb(var(--color-dark-deep-rgb) / 0.15), 0px 1px 3px rgb(var(--color-dark-deep-rgb) / 0.15)",
        "green-glow": "0 0 10px rgb(var(--color-green-rgb) / 0.75)",
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      backgroundImage: {
        "hero-fade":
          "radial-gradient(circle at 12% 10%, rgb(var(--color-accent-rgb) / 0.22), transparent 26%), radial-gradient(circle at 82% 14%, rgb(var(--color-primary-rgb) / 0.14), transparent 22%), linear-gradient(180deg, rgb(var(--color-canvas-rgb) / 1), rgb(var(--color-dark-strong-rgb) / 0.98) 46%, rgb(var(--color-dark-deep-rgb) / 0.95))",
        "accent-panel":
          "linear-gradient(180deg, rgb(var(--color-accent-rgb) / 0.18), rgb(var(--color-dark-rgb) / 0.98))",
        "accent-panel-soft":
          "linear-gradient(180deg, rgb(var(--color-accent-rgb) / 0.18), rgb(var(--color-dark-rgb) / 0.94))",
        "accent-panel-muted":
          "linear-gradient(180deg, rgb(var(--color-accent-rgb) / 0.10), rgb(var(--color-dark-rgb) / 0.72))",
        "preview-panel":
          "linear-gradient(180deg, rgb(var(--color-dark-strong-rgb) / 0.96), rgb(var(--color-dark-deep-rgb) / 0.90))",
        "metric-progress":
          "linear-gradient(90deg, rgb(var(--color-accent-rgb) / 1), rgb(var(--color-primary-rgb) / 0.92))",
        "metric-series":
          "linear-gradient(180deg, rgb(var(--color-primary-rgb) / 0.92), rgb(var(--color-accent-rgb) / 0.55))",
      },
    },
  },
  plugins: [],
};

export default config;
