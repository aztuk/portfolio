import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { ImpactSection } from "@/components/use-case/ImpactSection";
import { MetaInfo } from "@/components/use-case/MetaInfo";
import { UseCaseResultHero } from "@/components/use-case/UseCaseResultHero";
import { RelatedProjects } from "@/components/use-case/RelatedProjects";
import { RetrospectiveSection } from "@/components/use-case/RetrospectiveSection";
import { SolutionSection } from "@/components/use-case/SolutionSection";
import { TensionSection } from "@/components/use-case/TensionSection";
import { UseCaseHero } from "@/components/use-case/UseCaseHero";
import { UseCaseTableOfContents } from "@/components/use-case/UseCaseTableOfContents";
import { PageTransition } from "@/components/shared/PageTransition";
import { getAllUseCases, getUseCaseBySlug } from "@/content/use-cases";
import { siteContent } from "@/content/site";
import { routing } from "@/i18n/routing";
import { getResolvedRelatedUseCases, hasProtectedGalleryItems, redactProtectedGalleryItem } from "@/lib/content";
import { stripHighlightTags } from "@/lib/rich-text";

type UseCasePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const generateStaticParams = () =>
  routing.locales.flatMap((locale) =>
    getAllUseCases("en")
      .filter((useCase) => !useCase.protected)
      .map((useCase) => ({ locale, slug: useCase.slug })),
  );

export const generateMetadata = async ({
  params,
}: UseCasePageProps): Promise<Metadata> => {
  const { locale, slug } = await params;
  const useCase = getUseCaseBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "site" });

  if (!useCase) {
    return { title: t("seoTitle") };
  }

  return {
    title: `${useCase.title} - ${siteContent.name}`,
    description: stripHighlightTags(useCase.overview),
  };
};

const UseCasePage = async ({ params }: UseCasePageProps) => {
  const { locale, slug } = await params;
  const useCase = getUseCaseBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "sections" });

  if (!useCase) {
    notFound();
  }

  const isFullyProtected = useCase.protected === true;
  const hasProtectedItems = hasProtectedGalleryItems(useCase);
  const needsAuth = isFullyProtected || hasProtectedItems;

  let isAuthenticated = !needsAuth;
  if (needsAuth) {
    const cookieStore = await cookies();
    isAuthenticated = cookieStore.get("portfolio_auth")?.value === "1";
  }

  if (isFullyProtected && !isAuthenticated) {
    redirect(`/${locale}/login?from=/${locale}/use-cases/${slug}`);
  }

  const relatedUseCases = getResolvedRelatedUseCases(useCase, locale);
  const safeResultHero = useCase.resultHero
    ? redactProtectedGalleryItem(useCase.resultHero, isAuthenticated)
    : undefined;
  const tableOfContentsItems = [
    { id: "use-case-context", label: t("challenge") },
    ...(useCase.resultHero ? [{ id: "use-case-result", label: useCase.resultHeroLabel ?? t("result") }] : []),
    { id: "use-case-tension", label: useCase.tension.title },
    { id: "use-case-solution", label: t("explorationAndSolution") },
    ...(useCase.impactSection
      ? [{ id: "use-case-impact", label: useCase.impactSection.title }]
      : []),
    ...(useCase.retrospective
      ? [{ id: "use-case-retrospective", label: useCase.retrospective.title }]
      : []),
  ];

  return (
    <PageTransition>
      <UseCaseHero useCase={useCase} />
      <div
        className="mx-auto grid w-full max-w-[1200px] grid-cols-1 px-3 sm:px-5 xl:px-0"
        data-use-case-shell
      >
        <UseCaseTableOfContents
          items={tableOfContentsItems}
          className="col-start-1 row-start-1 hidden xl:block"
        />
        <div className="col-start-1 row-start-1 min-w-0" data-use-case-content>
          <MetaInfo id="use-case-context" useCase={useCase} />
          {safeResultHero && (
            <UseCaseResultHero
              id="use-case-result"
              asset={safeResultHero}
              isAuthenticated={isAuthenticated}
            />
          )}
          <TensionSection id="use-case-tension" tension={useCase.tension} />
          <SolutionSection
            id="use-case-solution"
            solution={useCase.solution}
            isAuthenticated={isAuthenticated}
          />
          {useCase.impactSection && (
            <ImpactSection
              id="use-case-impact"
              impactSection={useCase.impactSection}
            />
          )}
          {useCase.retrospective && (
            <RetrospectiveSection
              id="use-case-retrospective"
              retrospective={useCase.retrospective}
            />
          )}
          <RelatedProjects useCases={relatedUseCases} />
        </div>
      </div>
    </PageTransition>
  );
};

export default UseCasePage;
