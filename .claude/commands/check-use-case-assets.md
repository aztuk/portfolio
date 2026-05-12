Audit all use-case asset references against the project's asset naming and placement convention.

## Convention reminder

Assets live under `public/assets/use-cases/<project-slug>/` with this layout:

```
public/assets/use-cases/<slug>/
  ALL_<name>.<ext>        # shared — prefix ALL_
  FR/
    FR_<name>.<ext>       # French-specific — prefix FR_
  EN/
    EN_<name>.<ext>       # English-specific — prefix EN_
```

Valid naming segments (part after the locale prefix):

| Segment | Section |
|---|---|
| `Thumbnail` | Use-case preview card |
| `Hero` | Result hero (below Context) |
| `option_A / option_B / option_C` | Explored solutions |
| `Tension_<descriptor>` | Tension section |
| `KD<X>-<Y>` | Key Decision X, gallery position Y (0 = main media) |

## Steps

For **each** use-case content file in `content/use-cases/` (one file = one project, each file exports both a FR and an EN variant):

### 1. Collect all asset `src` paths

Scan every field that holds an image or video path: `previewImage.src`, `resultHero.src`, `tension.artifact.src` (or `tension.artifacts[*].src`), `exploredSolutions[*].image.src`, `keyDecisions[*].media.src`, `keyDecisions[*].gallery[*].src`, and any `poster` fields.

Group them by locale: paths containing `/FR/` or starting with `FR_` → FR set; `/EN/` or `EN_` → EN set; `/ALL_` → shared set.

### 2. Check file existence

For every collected path, verify the file exists on disk under `public/`. Report every missing file as an error with the content file and field where it is referenced.

### 3. Check prefix / folder consistency

- A file prefixed `FR_` must live inside a `FR/` subdirectory — flag if not.
- A file prefixed `EN_` must live inside an `EN/` subdirectory — flag if not.
- A file prefixed `ALL_` must live at the project root (not inside `FR/` or `EN/`) — flag if not.

### 4. Check FR ↔ EN mirror parity

For every `FR_<name>.<ext>` found, a matching `EN_<name>.<ext>` must exist (same name after prefix, same extension). Report unpaired files on either side.

### 5. Check naming segment compliance

The filename part after the locale prefix must match one of: `Thumbnail`, `Hero`, `option_A`, `option_B`, `option_C`, `Tension_*`, `KD<digit(s)>-<digit(s)>`. Flag any filename that does not match.

### 6. Check content completeness (structural)

For each locale variant of a use-case, verify:
- `previewImage` → exactly one `Thumbnail` asset exists.
- `resultHero` → exactly one `Hero` asset exists.
- Each `keyDecisions[i]` main media → named `KD<i+1>-0`.
- Each `keyDecisions[i].gallery[j]` → named `KD<i+1>-<j+1>`.

## Reporting

After all checks, output one section per use-case project:

```
## <project-name>
✅ All checks passed
```

or, if issues were found:

```
## <project-name>
❌ Missing files:
   - public/assets/use-cases/design-system/EN/EN_Hero.png (referenced in resultHero EN)
⚠️  Mirror parity:
   - FR_KD2-1.png has no EN counterpart
⚠️  Naming violations:
   - EN_before.png does not match any valid segment
⚠️  Folder mismatch:
   - FR_Thumbnail.png is at project root, expected inside FR/
```

At the end print a one-line summary: total projects checked, total errors, total warnings.

## Notes

- Read each content file fully — both locale exports live in the same `.ts` file.
- Use the file system (Glob / Bash `ls`) to list what actually exists on disk — don't trust path strings alone.
- Do not auto-fix. Report only. Let the user decide how to reorganise assets.
- This skill is read-only: no file writes, no content edits.
