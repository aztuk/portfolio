import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { ContactSection } from "@/components/home/ContactSection";
import { UseCaseGrid } from "@/components/home/UseCaseGrid";
import { PageTransition } from "@/components/shared/PageTransition";
import { getAllUseCasesSorted } from "@/lib/content";

type WorksPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: WorksPageProps): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "works" });

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
  };
};

const WorksPage = async ({ params }: WorksPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "works" });
  const useCases = getAllUseCasesSorted(locale);

  return (
    <PageTransition>
      <section className="flex min-h-[40svh] items-end pb-10 pt-32 lg:min-h-[36vh] lg:pb-14 lg:pt-40">
        <Container className="px-5 lg:px-0">
          <h1 className="type-page-title text-ink">{t("heading")}</h1>
        </Container>
      </section>
      <UseCaseGrid useCases={useCases} />
      <ContactSection />
    </PageTransition>
  );
};

export default WorksPage;
