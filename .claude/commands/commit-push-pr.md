Commit all staged/unstaged changes, push to the current branch, and open a GitHub pull request.

## Pre-flight checks

1. Confirm git is initialized: `git status`. If not, tell the user to run `git init` and set up a remote first, then stop.
2. Run `/verify-app` first. Do NOT commit if typecheck, lint, or tests are failing.

## Steps

1. **Stage changes** — `git add -A` (but warn the user and skip if any `.env` or credentials files are detected)
2. **Write commit message** — Analyze the diff and write a conventional commit message:
   - Format: `type(scope): short description`
   - Types: `feat`, `fix`, `refactor`, `style`, `test`, `chore`, `docs`
   - Keep the subject line under 72 characters
   - Add a body if the change is non-obvious
3. **Commit** — `git commit -m "..."`
4. **Push** — `git push -u origin <current-branch>` (create upstream if first push)
5. **Create PR** — Use `gh pr create` with:
   - Title: same as commit subject
   - Body: bullet-point summary of what changed and why

## Notes

- Never force-push (`--force`) unless the user explicitly asks
- Never skip hooks (`--no-verify`)
- If there are no changes to commit, say so and stop
- Include `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` in the commit message body
