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

## Verification

When code changes were made for a Figma implementation task, run:

- `npm run typecheck`
- `npm run lint`
- `npm run test`
