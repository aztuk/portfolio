import { customizableDashboard } from "@/content/use-cases/customizable-dashboard";
import type { UseCase } from "@/content/use-cases/types";
import { designSystem } from "./design-system";

type UseCaseEntry = UseCase | Record<string, UseCase>;

const useCasesData = [customizableDashboard, designSystem] as UseCaseEntry[];

const resolveLocale = (data: UseCaseEntry, locale: string): UseCase => {
  if ("slug" in data) {
    return data as UseCase;
  }

  const localized = data as Record<string, UseCase>;
  return localized[locale] ?? localized.en;
};

export const getAllUseCases = (locale = "en"): UseCase[] =>
  useCasesData.map((data) => resolveLocale(data, locale));

export const getUseCaseBySlug = (slug: string, locale = "en"): UseCase | undefined =>
  getAllUseCases(locale).find((useCase) => useCase.slug === slug);

export const getRelatedUseCases = (useCase: UseCase, locale = "en"): UseCase[] =>
  useCase.relatedUseCaseSlugs
    .map((slug) => getUseCaseBySlug(slug, locale))
    .filter((candidate): candidate is UseCase => Boolean(candidate));
