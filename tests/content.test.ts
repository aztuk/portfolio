import { describe, expect, it } from "vitest";

import { getAllUseCases } from "@/content/use-cases";
import {
  getAllUseCasesSorted,
  getNormalizedPreviewRatio,
  getResolvedRelatedUseCases,
} from "@/lib/content";

describe("content helpers", () => {
  it("sorts use cases by ascending order field", () => {
    const sorted = getAllUseCasesSorted();
    const orders = sorted.map((useCase) => useCase.order);

    expect(orders).toEqual([...orders].sort((left, right) => left - right));
  });

  it("returns normalized ratios by project type", () => {
    expect(getNormalizedPreviewRatio("mobile")).toBe("aspect-[4/5]");
    expect(getNormalizedPreviewRatio("web")).toBe("aspect-[8/5]");
  });

  it("resolves related use cases from the assigned order", () => {
    const [firstUseCase] = getAllUseCases();
    const related = getResolvedRelatedUseCases(firstUseCase);
    const expected = getAllUseCasesSorted()
      .filter((useCase) => useCase.slug !== firstUseCase.slug)
      .slice(0, 2)
      .map((useCase) => useCase.slug);

    expect(related.map((useCase) => useCase.slug)).toEqual(expected);
    expect(related).toHaveLength(2);
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
