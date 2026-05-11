import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MobileCarousel } from "@/components/shared/MobileCarousel";
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
            sizes="(min-width: 1024px) 307px, (min-width: 640px) 307px, calc(100vw - 48px)"
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
      <Container className="px-6 sm:px-8 lg:px-6">
        <div className="mb-12">
          <SectionTitle>{t("otherUseCases")}</SectionTitle>
        </div>

        <MobileCarousel
          ariaLabel={t("otherUseCases")}
          className="md:hidden"
          itemClassName="flex flex-col"
        >
          {useCases.map((useCase) => (
            <RelatedProjectCard key={useCase.slug} useCase={useCase} />
          ))}
        </MobileCarousel>

        <div className="hidden gap-16 md:grid md:grid-cols-2 lg:gap-20">
          {useCases.map((useCase) => (
            <RelatedProjectCard key={useCase.slug} useCase={useCase} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
