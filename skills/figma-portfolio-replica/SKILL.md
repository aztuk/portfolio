---
name: figma-portfolio-replica
description: Use this skill when the user shares a Figma link, asks for Figma MCP access, asks to connect to Figma MCP, or wants a Figma mockup translated into a faithful implementation in this portfolio codebase. This skill turns a specific Figma node or screen into production-ready Next.js, React, TypeScript, and Tailwind code that matches the existing project structure and design tokens.
---

# Figma Portfolio Replica

Use this skill for any request that includes:

- a `figma.com` link
- a request to access, connect, enable, or use the Figma MCP server
- a request to recreate a design from Figma in this repository
- a request to update a specific portfolio section from a Figma mockup

## Goal

Translate a Figma node into the closest practical implementation inside this portfolio while preserving:

- layout and spacing
- typography hierarchy
- color and contrast
- component structure
- responsive behavior
- existing project conventions

Do not treat the MCP response as final code. Use it as structured design context, then implement code that fits this repository.

## Required Inputs

Collect or infer these inputs before coding:

- `figma_url`: must ideally include a `node-id`
- `portfolio_section`: what part of the site this affects
- `target_files`: files to update, if already known
- `constraints`: any fidelity, animation, responsive, or reuse constraints

If the user only sends a Figma link, infer the likely section from the surrounding request and continue.

## Workflow

1. Parse the Figma URL and identify the exact node or frame.
2. If Figma MCP is available, use it first:
   - get design context for the node
   - get a screenshot for visual verification
   - prefer Code Connect mappings when available
3. Inspect the repository before editing:
   - identify the current section component
   - reuse existing layout primitives, tokens, and motion helpers
   - avoid duplicating components that already exist
4. Implement the design in code:
   - keep the repo's established structure
   - prefer updating the existing component over creating parallel versions
   - preserve accessibility and responsive behavior
5. Verify fidelity:
   - compare code output to the Figma screenshot
   - call out any intentional deviations
6. Run project verification when code changed:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run test`

## MCP Handling

When the user asks for MCP access, connection, or usage:

- assume they want the Figma MCP workflow activated for the current task
- prefer Figma MCP tools over manual interpretation when the tools are available
- if MCP is not available in the current client session, say so briefly and continue with the Figma link plus screenshot/context fallback

## Fidelity Rules

- Aim for a near-pixel-faithful result on key layout and visual hierarchy.
- Reuse project tokens before introducing new values.
- Do not hardcode arbitrary colors if an existing token can express the same intent.
- Match desktop and mobile behavior, not only a single breakpoint.
- Respect existing animation architecture in `lib/`.
- Avoid generic redesigns. The task is implementation fidelity, not creative reinterpretation.

## Repository Rules

For this repository:

- framework: Next.js App Router
- language: TypeScript
- styling: Tailwind CSS plus CSS variables
- animation: Framer Motion plus `lib/` motion helpers
- exports: named exports only

Before creating new files, check whether the relevant section already exists under:

- `app/`
- `components/home/`
- `components/shared/`
- `components/layout/`
- `lib/`

## Output Style

When responding after implementation:

- name the section that was updated
- mention which Figma node or URL was used
- list any intentional deviations from the design
- mention whether verification ran successfully

## Fallback Behavior

If the Figma link is broad and lacks `node-id`:

- ask for a more specific link only if the ambiguity blocks reliable implementation
- otherwise inspect the likely top-level frame and proceed with the clearest match

If the user gives both a Figma link and a textual section name, trust the textual scope first and use the Figma file to implement only that scope.
