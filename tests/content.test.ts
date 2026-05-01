import { describe, expect, it } from "vitest";

import { getAllUseCases } from "@/content/use-cases";
import type { UseCase } from "@/content/use-cases/types";
import {
  getAllUseCasesSorted,
  getNormalizedPreviewRatio,
  getResolvedRelatedUseCases,
  sortUseCasesBySharedTags,
} from "@/lib/content";

const makeUseCase = (
  base: UseCase,
  overrides: Pick<UseCase, "slug" | "title" | "tags" | "year">,
): UseCase => ({
  ...base,
  relatedUseCaseSlugs: [],
  ...overrides,
});

describe("content helpers", () => {
  it("sorts use cases by descending year", () => {
    const sorted = getAllUseCasesSorted();
    const years = sorted.map((useCase) => Number(useCase.year));

    expect(years).toEqual([...years].sort((left, right) => right - left));
  });

  it("returns normalized ratios by project type", () => {
    expect(getNormalizedPreviewRatio("mobile")).toBe("aspect-[4/5]");
    expect(getNormalizedPreviewRatio("web")).toBe("aspect-[8/5]");
  });

  it("resolves up to three related use cases without returning the current case", () => {
    const [firstUseCase] = getAllUseCases();
    const related = getResolvedRelatedUseCases(firstUseCase);
    const expectedRelatedCount = Math.min(getAllUseCases().length - 1, 3);

    expect(related).toHaveLength(expectedRelatedCount);
    expect(related.some((useCase) => useCase.slug === firstUseCase.slug)).toBe(false);
  });

  it("prioritizes related use cases by shared tag count", () => {
    const [baseUseCase] = getAllUseCases();
    const current = makeUseCase(baseUseCase, {
      slug: "current",
      title: "Current",
      tags: ["Mobile", "Growth", "B2C"],
      year: "2020",
    });
    const candidates = [
      makeUseCase(baseUseCase, {
        slug: "one-shared",
        title: "One shared",
        tags: ["Mobile", "SaaS"],
        year: "2026",
      }),
      makeUseCase(baseUseCase, {
        slug: "three-shared",
        title: "Three shared",
        tags: ["B2C", "Mobile", "Growth"],
        year: "2021",
      }),
      makeUseCase(baseUseCase, {
        slug: "two-shared-newer",
        title: "Two shared newer",
        tags: ["Growth", "Mobile", "Ops"],
        year: "2024",
      }),
      makeUseCase(baseUseCase, {
        slug: "two-shared-older",
        title: "Two shared older",
        tags: ["B2C", "Mobile", "Ops"],
        year: "2022",
      }),
    ];

    expect(sortUseCasesBySharedTags(current, candidates).map((useCase) => useCase.slug)).toEqual([
      "three-shared",
      "two-shared-newer",
      "two-shared-older",
      "one-shared",
    ]);
  });

  it("keeps each use case within the expected content limits", () => {
    const useCases = getAllUseCases();

    for (const useCase of useCases) {
      expect(useCase.tension.tensions.length).toBeGreaterThanOrEqual(2);
      expect(useCase.tension.tensions.length).toBeLessThanOrEqual(3);

      if (useCase.retrospective) {
        expect(useCase.retrospective.items.length).toBeGreaterThanOrEqual(3);
        expect(useCase.retrospective.items.length).toBeLessThanOrEqual(5);
      }
    }
  });

  it("supports optional key decisions on solution sections", () => {
    const useCases = getAllUseCases();

    for (const useCase of useCases) {
      expect(
        useCase.solution.keyDecisions === undefined ||
          Array.isArray(useCase.solution.keyDecisions),
      ).toBe(true);
    }
  });
});
