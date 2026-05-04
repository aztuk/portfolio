import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const roots = ["app", "components"];

const typographyClassPattern =
  /(?<!-)font-(?:sans|display|tektur|elite|thin|light|normal|medium|semibold|bold)|(?:^|\s)(?:sm:|md:|lg:|xl:|2xl:)?text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b|(?:^|\s)(?:sm:|md:|lg:|xl:|2xl:)?text-\[(?:clamp|\d|[0-9.]+rem)|(?:^|\s)(?:sm:|md:|lg:|xl:|2xl:)?leading-(?:\[[^\]]+\]|none|tight|snug|normal|relaxed|loose|[0-9]+)\b|(?:^|\s)(?:sm:|md:|lg:|xl:|2xl:)?tracking-(?:\[[^\]]+\]|tighter|tight|normal|wide|wider|widest)\b|letterSpacing/;

const quotedStringPattern = /(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/g;

const getFiles = (directory: string): string[] => {
  const entries = readdirSync(directory);

  return entries.flatMap((entry) => {
    const absolutePath = path.join(directory, entry);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      return getFiles(absolutePath);
    }

    return absolutePath.endsWith(".tsx") ? [absolutePath] : [];
  });
};

describe("typography tokens", () => {
  it("keeps visible typography classes behind type-* tokens", () => {
    const offenders = roots
      .flatMap((root) => getFiles(path.join(process.cwd(), root)))
      .flatMap((filePath) => {
        const source = readFileSync(filePath, "utf8");
        const matches: string[] = [];

        for (const match of source.matchAll(quotedStringPattern)) {
          const value = match[2];

          if (typographyClassPattern.test(value) && !value.includes("type-")) {
            matches.push(
              `${path.relative(process.cwd(), filePath)}: ${value.replace(/\s+/g, " ").trim()}`,
            );
          }

          typographyClassPattern.lastIndex = 0;
        }

        return matches;
      });

    expect(offenders).toEqual([]);
  });
});
