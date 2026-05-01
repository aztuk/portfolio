import { HomeHero } from "@/components/home/HomeHero";
import { UseCaseGrid } from "@/components/home/UseCaseGrid";
import { PageTransition } from "@/components/shared/PageTransition";
import { getAllUseCasesSorted } from "@/lib/content";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  const useCases = getAllUseCasesSorted(locale);

  return (
    <PageTransition>
      <HomeHero />
      <UseCaseGrid useCases={useCases} />
    </PageTransition>
  );
};

export default HomePage;
