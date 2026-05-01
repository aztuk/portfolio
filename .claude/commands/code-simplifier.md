Review recently changed files and simplify them. Focus on code quality, reuse, and eliminating unnecessary complexity.

## What to look for

1. **Duplicate logic** — Is any logic already implemented in `lib/`? Use the existing utility instead of reimplementing it.
2. **Over-engineered abstractions** — Is there a simpler way to express the same thing? Prefer direct code over premature abstractions.
3. **Tailwind class bloat** — Are there redundant or conflicting Tailwind classes? Clean them up.
4. **Unused imports** — Remove any imports that aren't referenced.
5. **Inline animation configs** — Any animation constants defined inside a component should be moved to `lib/`.
6. **Violated conventions** — Check against CLAUDE.md:
   - No default exports
   - `type Props = {}` pattern for prop types
   - `clsx` for conditional classes (not template literals)
   - `"use client"` only when actually needed

## Process

1. Identify which files were recently modified (use git diff or ask the user if git isn't initialized).
2. Read each changed file.
3. For each issue found: explain what's wrong, show the simplified version, and apply the fix.
4. After all fixes, run `/verify-app` to confirm nothing broke.

## Constraints

- Do NOT change behavior, only improve structure and clarity.
- Do NOT add features, comments, or docs that weren't there before.
- Do NOT refactor code that wasn't changed (stay in scope).
