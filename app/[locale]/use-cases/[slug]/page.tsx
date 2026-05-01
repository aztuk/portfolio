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
import { PageTransition } from "@/components/shared/PageTransition";
import { getAllUseCases, getUseCaseBySlug } from "@/content/use-cases";
import { siteContent } from "@/content/site";
import { routing } from "@/i18n/routing";
import { getResolvedRelatedUseCases, hasProtectedGalleryItems } from "@/lib/content";

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
    description: useCase.overview,
  };
};

const UseCasePage = async ({ params }: UseCasePageProps) => {
  const { locale, slug } = await params;
  const useCase = getUseCaseBySlug(slug, locale);

  if (!useCase) {
    notFound();
  }

  const needsAuth = useCase.protected || hasProtectedGalleryItems(useCase);
  let isAuthenticated = !needsAuth;
  if (needsAuth) {
    const cookieStore = await cookies();
    isAuthenticated = Boolean(cookieStore.get("portfolio_auth"));
  }

  if (useCase.protected && !isAuthenticated) {
    redirect(`/${locale}/login?from=/${locale}/use-cases/${slug}`);
  }

  const relatedUseCases = getResolvedRelatedUseCases(useCase, locale);

  return (
    <PageTransition>
      <UseCaseHero useCase={useCase} />
      <MetaInfo useCase={useCase} />
      {useCase.resultHero && (
        <UseCaseResultHero asset={useCase.resultHero} isAuthenticated={isAuthenticated} />
      )}
      <TensionSection tension={useCase.tension} />
      <SolutionSection solution={useCase.solution} isAuthenticated={isAuthenticated} />
      {useCase.impactSection && <ImpactSection impactSection={useCase.impactSection} />}
      {useCase.retrospective && <RetrospectiveSection retrospective={useCase.retrospective} />}
      <RelatedProjects useCases={relatedUseCases} />
    </PageTransition>
  );
};

export default UseCasePage;
