Run the full quality gate for this project. Execute each check in order and stop on first failure.

## Steps

1. **TypeScript** — run `npm run typecheck` from the project root. Report any type errors with file + line.
2. **Lint** — run `npm run lint`. This uses `--max-warnings=0` so any warning is a failure. Report all issues.
3. **Tests** — run `npm run test`. Report any failing tests with their names and assertion details.

## Reporting

After all checks:
- If everything passes: state clearly "All checks passed — typecheck, lint, and tests are green."
- If anything failed: list each failure with the relevant error output. Do NOT mark the task complete. Instead, fix the issues and re-run the failing check until it passes.

## Notes

- Run all checks from `c:/Users/quent/Documents/Claude/Portfolio/`
- Never skip a check even if a previous one failed — run all three and report all issues at once so they can be fixed together.
