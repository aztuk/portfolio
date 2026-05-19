import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PreviewMedia } from "@/components/shared/PreviewMedia";
import { Tag } from "@/components/shared/Tag";
import { SectionTitle } from "@/components/use-case/SectionTitle";
import type { UseCase } from "@/content/use-cases/types";
import { Link } from "@/i18n/navigation";

type RelatedProjectsProps = {
  useCases: UseCase[];
};

const RelatedProjectCard = ({ useCase }: { useCase: UseCase }) => {
  const href = `/use-cases/${useCase.slug}` as never;

  return (
    <Link href={href} className="group flex flex-col items-center pb-[70px] lg:pb-[90px]">
      {/* Image — overlaps 90px into the text below */}
      <div className="relative z-10 mb-[-70px] flex w-full items-center justify-center lg:mb-[-90px]">
        <div
          className="relative aspect-[307/371] w-full overflow-hidden rounded-[24px] bg-transparent sm:max-w-[307px] lg:h-[371px] lg:w-[307px] lg:max-w-none lg:rounded-[30px]"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
          }}
        >
          <PreviewMedia
            previewImage={useCase.previewImage}
            previewVideo={useCase.previewVideo}
            mediaClassName="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 307px, (min-width: 640px) 307px, calc(100vw - 1rem)"
          />
        </div>
      </div>

      {/* Text */}
      <div className="relative z-20 flex w-full flex-col items-center gap-[16px]">
        <h3 className="type-project-title-medium max-w-[380px] text-center text-muted">
          {useCase.title}
        </h3>
        {useCase.tags.length > 0 && (
          <div className="flex w-full flex-wrap items-center justify-center gap-[4px] pt-[26px]">
            {useCase.tags.slice(0, 4).map((tag) => (
              <Tag key={tag} label={tag} tone="white" />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export const RelatedProjects = async ({ useCases }: RelatedProjectsProps) => {
  const t = await getTranslations("sections");

  if (useCases.length === 0) {
    return null;
  }

  return (
    <Section className="pb-16 pt-28 lg:pb-20 lg:pt-40">
      <Container className="px-2 sm:px-8 lg:px-6">
        <div className="mb-12">
          <SectionTitle>{t("otherUseCases")}</SectionTitle>
        </div>

        <div
          data-mobile-carousel
          role="region"
          aria-label={t("otherUseCases")}
          className="mx-[calc(50%_-_50vw)] w-screen max-w-none overflow-x-auto overscroll-x-contain pb-1 scroll-smooth snap-x snap-mandatory [scroll-padding-inline:0.5rem] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:[scroll-padding-inline:2rem] md:mx-0 md:w-auto md:overflow-visible md:snap-none [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-4 md:grid md:grid-cols-2 md:gap-16 lg:gap-20">
            <div className="w-2 shrink-0 md:hidden" aria-hidden="true" />
            {useCases.map((useCase) => (
              <div
                key={useCase.slug}
                className="flex min-w-[78vw] flex-col snap-center snap-always md:min-w-0"
              >
                <RelatedProjectCard useCase={useCase} />
              </div>
            ))}
            <div className="w-2 shrink-0 md:hidden" aria-hidden="true" />
          </div>
        </div>
      </Container>
    </Section>
  );
};
