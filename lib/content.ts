import { getAllUseCases, getUseCaseBySlug } from "@/content/use-cases";
import type { GalleryItem, ProjectType, UseCase } from "@/content/use-cases/types";

const RELATED_USE_CASE_LIMIT = 3;

export const sortUseCasesByYear = (useCases: UseCase[]): UseCase[] =>
  [...useCases].sort((left, right) => Number(right.year) - Number(left.year));

export const getNormalizedPreviewRatio = (projectType: ProjectType): string =>
  projectType === "mobile" ? "aspect-[4/5]" : "aspect-[8/5]";

export const getAllUseCasesSorted = (locale = "en"): UseCase[] =>
  sortUseCasesByYear(getAllUseCases(locale));

export const findUseCaseOrThrow = (slug: string, locale = "en"): UseCase => {
  const useCase = getUseCaseBySlug(slug, locale);

  if (!useCase) {
    throw new Error(`Unknown use case slug: ${slug}`);
  }

  return useCase;
};

const getNormalizedTags = (tags: string[]): Set<string> =>
  new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean));

export const getSharedTagCount = (left: UseCase, right: UseCase): number => {
  const leftTags = getNormalizedTags(left.tags);
  const rightTags = getNormalizedTags(right.tags);

  return [...leftTags].filter((tag) => rightTags.has(tag)).length;
};

export const sortUseCasesBySharedTags = (
  useCase: UseCase,
  candidates: UseCase[],
): UseCase[] =>
  [...candidates].sort((left, right) => {
    const tagDelta = getSharedTagCount(useCase, right) - getSharedTagCount(useCase, left);

    if (tagDelta !== 0) {
      return tagDelta;
    }

    const yearDelta = Number(right.year) - Number(left.year);

    if (yearDelta !== 0) {
      return yearDelta;
    }

    return left.title.localeCompare(right.title);
  });

const collectGalleryItems = (useCase: UseCase): GalleryItem[] => [
  ...(useCase.resultHero ? [useCase.resultHero] : []),
  ...(useCase.solution.gallery ?? []),
  ...(useCase.solution.keyDecisions?.flatMap((d) => [d.media, ...d.gallery]) ?? []),
  ...(useCase.tension.artifacts ?? []),
  ...(useCase.tension.artifact ? [useCase.tension.artifact] : []),
];

export const hasProtectedGalleryItems = (useCase: UseCase): boolean =>
  collectGalleryItems(useCase).some((item) => item.protected);

export const redactProtectedGalleryItem = (
  item: GalleryItem,
  isAuthenticated: boolean,
): GalleryItem => {
  if (!item.protected || isAuthenticated) return item;
  if (item.type === "figma") return { ...item, src: "", pages: undefined };
  return { ...item, src: "" };
};

export const getResolvedRelatedUseCases = (useCase: UseCase, locale = "en"): UseCase[] =>
  sortUseCasesBySharedTags(
    useCase,
    getAllUseCases(locale).filter((candidate) => candidate.slug !== useCase.slug),
  ).slice(0, RELATED_USE_CASE_LIMIT);
