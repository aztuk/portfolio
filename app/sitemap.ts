import type { MetadataRoute } from "next";

import { getAllUseCases } from "@/content/use-cases";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicUseCases = getAllUseCases("en").filter((uc) => !uc.protected);

  const homeEntries = routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  const useCaseEntries = routing.locales.flatMap((locale) =>
    publicUseCases.map((useCase) => ({
      url: `${siteUrl}/${locale}/use-cases/${useCase.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [...homeEntries, ...useCaseEntries];
}
