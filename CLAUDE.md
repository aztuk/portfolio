# CLAUDE.md — Editorial Design Portfolio

Project-level knowledge base. Update this file whenever Claude makes a mistake or a new convention is established.

---

## Project Overview

**Name:** editorial-design-portfolio  
**Framework:** Next.js 15 (App Router)  
**Language:** TypeScript 5.7 (strict mode)  
**Styling:** Tailwind CSS 3 + CSS custom properties  
**Animation:** Framer Motion 12 + custom RAF-based animations  
**Testing:** Vitest 2 + Testing Library React  
**Node:** 22+

---

## Directory Structure

```
app/                  # Next.js App Router (layouts, pages, routes)
  globals.css         # Design tokens (CSS vars) + global styles
  layout.tsx          # Root layout with fonts
  page.tsx            # Home page
  use-cases/[slug]/   # Dynamic use-case detail pages
components/
  home/               # Components used only on the home page
  layout/             # Site-wide structural components (Container, Section)
  shared/             # Cross-feature reusable components
  use-case/           # Components for use-case detail pages
content/
  site.ts             # Global site data
  use-cases/          # Use-case data + types
lib/                  # Pure utility functions and animation configs
tests/                # Vitest unit tests
public/assets/        # Static assets (images, videos)
```

---

## Path Aliases

- `@/*` → project root (e.g., `@/components/layout/Container`)

---

## Coding Conventions

### Components
- Named exports only: `export const ComponentName = (...) => { ... }` — never default exports
- Props typed with `type` alias and `Props` suffix: `type ContainerProps = { children: React.ReactNode }`
- One component per file, file name matches component name (PascalCase)
- Use `"use client"` only when the component requires browser APIs or event handlers
- Props destructured in function signature

### Styling
- Tailwind utility classes in `className`
- Use `clsx` for conditional class application (already installed)
- Design tokens via CSS variables — never hardcode colors inline
- All custom colors available as Tailwind classes: `canvas`, `ink`, `muted`, `line`, `accent`, `paper`, `primary`, `green`, `smooth`, `dark`, `dark-smooth`
- Custom shadows: `shadow-soft`, `shadow-card`, `shadow-elevation-2`
- Custom border radius: `rounded-xl2` (1.75rem)
- Custom fonts: `font-sans` (Space Grotesk), `font-display` (Teko)

### Design Tokens (CSS Variables)
```css
--color-canvas:     #2c3a6e        /* dark background */
--color-canvas-rgb: 44 58 110
--color-dark-strong:#283667        /* darker gradient support */
--color-dark-strong-rgb: 40 54 103
--color-dark-deep:  #243160        /* deepest gradient support */
--color-dark-deep-rgb: 36 49 96
--color-paper:      #ffffff        /* light surface/text alias */
--color-paper-rgb:  255 255 255
--color-ink:        #ffffff        /* default white text */
--color-ink-rgb:    255 255 255
--color-muted:      #e4eaff        /* attenuated text */
--color-muted-rgb:  228 234 255
--color-line:       #ffffff        /* borders */
--color-line-rgb:   255 255 255
--color-accent:     #859be7        /* soft accent alias */
--color-accent-rgb: 133 155 231
--color-accent-strong: #6b82d8     /* accent depth for gradients */
--color-accent-strong-rgb: 107 130 216
--color-primary:    #00feb6        /* primary mint */
--color-primary-rgb: 0 254 182
--color-primary-strong: #00c58d    /* primary depth for gradients */
--color-primary-strong-rgb: 0 197 141
--color-green:      #84ff00        /* status chip green */
--color-green-rgb:  132 255 0
--color-green-strong: #62c500      /* green depth for gradients */
--color-green-strong-rgb: 98 197 0
--color-smooth:     #859be7        /* smooth muted blue */
--color-smooth-rgb: 133 155 231
--color-dark:       #2c3a6e        /* dark alias */
--color-dark-rgb:   44 58 110
--color-dark-smooth:#485a9c        /* separators */
--color-dark-smooth-rgb: 72 90 156
```

### Animations
- All animation configs and constants live in `lib/` (e.g., `lib/hero-animation.ts`, `lib/motion.ts`)
- Never define animation configs inline in components — extract to `lib/`
- Always respect `prefers-reduced-motion` — check for it in any animation that runs automatically
- Use Framer Motion for viewport-triggered, entrance, and transition animations
- Use raw `requestAnimationFrame` only for performance-critical continuous animations (e.g., parallax scroll)
- Attach scroll listeners as `{ passive: true }`

### Data / Content
- Content data lives in `content/` — keep it separate from presentation
- Utility functions for content manipulation go in `lib/content.ts`
- Types for content live in `content/use-cases/types.ts`

### TypeScript
- Strict mode is on — no `any`, no `@ts-ignore` without a comment explaining why
- Prefer `type` over `interface`

---

## Available Scripts

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run typecheck    # tsc --noEmit (run before marking tasks done)
npm run lint         # ESLint with --max-warnings=0
npm run test         # Vitest unit tests
```

---

## Workflow Rules

1. **Plan before coding** — use Plan Mode for any non-trivial change. Spend time on the spec.
2. **Self-critique the plan** — after writing a plan, review it as a senior engineer would. Look for edge cases, over-engineering, and missed conventions.
3. **Verify before done** — always run `/verify-app` (or `npm run typecheck && npm run lint && npm run test`) before marking a task complete.
4. **Keep components small** — if a component grows beyond ~100 lines, consider extracting sub-components.
5. **No default exports** — the whole codebase uses named exports. Don't introduce default exports.
6. **Don't add features beyond scope** — implement exactly what was asked.

---

## Error Log

> Add entries here whenever Claude makes a mistake so it won't repeat it.
> Format: `- [date] What went wrong → What to do instead`

_(none yet)_

---

## Auto-Invoke Skill: Figma MCP

Automatically load and follow `skills/figma-portfolio-replica/SKILL.md` whenever the user:

- shares any `figma.com` link
- asks for Figma MCP access
- asks to connect, enable, or use Figma MCP
- asks to recreate a Figma mockup in this portfolio
- asks to update a specific section from a Figma design

Do not wait for the user to explicitly name the skill.

For these requests:

1. Prefer Figma MCP tools when available in the current Claude session.
2. Treat the Figma node and screenshot as the visual source of truth.
3. Adapt the implementation to this repository's components, tokens, and motion helpers.
4. Run `/verify-app` or the equivalent project checks after code changes.

If MCP is unavailable in the current session, say so briefly and continue with the best available Figma-context fallback instead of blocking.
