# AGENTS.md

Project instructions for Codex-compatible agents working in this repository.

## Core Project Context

- Framework: Next.js 15 App Router
- Language: TypeScript with strict mode
- Styling: Tailwind CSS plus CSS variables
- Animation: Framer Motion plus helpers in `lib/`
- Exports: named exports only

Read `CLAUDE.md` for the fuller project conventions before making broad code changes.

## Auto-Invoke Rule: Figma MCP

Automatically load and follow `skills/figma-portfolio-replica/SKILL.md` whenever a user:

- shares any `figma.com` link
- asks to access, connect, enable, or use Figma MCP
- asks to turn a Figma mockup into code
- asks to update a portfolio section from a Figma design

Do not wait for the user to name the skill explicitly. Treat these requests as an instruction to use the skill.

## Figma MCP Priority

For Figma implementation tasks:

1. Prefer Figma MCP tools if available in the session.
2. Use the Figma URL and node as the source of truth for visual structure.
3. Adapt the result to this repository instead of generating isolated demo code.
4. Reuse existing components, tokens, and motion helpers before creating new ones.

## Expected Inputs

When the request is under-specified, infer what you can from the prompt and repo. Only ask a follow-up when the ambiguity would likely cause implementation in the wrong section or from the wrong Figma node.

Useful inputs:

- `figma_url`
- `portfolio_section`
- `target_files`
- `constraints`

## Shared Chart Components

Chart cards in Discovery (`TensionSection`) and Impact (`ImpactSection`) share three components:

- `components/use-case/ChartCardsLayout.tsx` — MobileCarousel on mobile + 2-col grid on desktop. Use this instead of writing the carousel+grid pattern manually.
- `components/use-case/CaptionedCard.tsx` — wraps any chart with an optional caption below. Use in place of a local wrapper with caption logic.
- `components/use-case/SingleKpiCard.tsx` — the single-KPI chart card shared between both sections.

Never redefine these locally in a section file.

## Verification

When code changes were made for a Figma implementation task, run:

- `npm run typecheck`
- `npm run lint`
- `npm run test`

Do not run automatic visual/browser verification, Playwright screenshots, or visual diff checks unless the user explicitly asks for them in the current request.
