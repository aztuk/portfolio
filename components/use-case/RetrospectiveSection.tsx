import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { RetroCard } from "@/components/use-case/RetroCard";
import { SectionTitle } from "@/components/use-case/SectionTitle";
import type { RetrospectiveSectionData } from "@/content/use-cases/types";

type RetrospectiveSectionProps = {
  retrospective: RetrospectiveSectionData;
  id?: string;
};

export const RetrospectiveSection = async ({
  retrospective,
  id,
}: RetrospectiveSectionProps) => {
  const t = await getTranslations("sections");
  const dontLabel = retrospective.dontLabel ?? t("dontLabel");
  const doLabel = retrospective.doLabel ?? t("doLabel");

  return (
    <Section id={id}>
      <Container className="px-2 sm:px-8 lg:px-0">
        <div className="mb-12">
          <SectionTitle>{retrospective.title}</SectionTitle>
        </div>

        <div
          data-mobile-carousel
          role="region"
          aria-label={retrospective.title}
          className="mx-[calc(50%_-_50vw)] w-screen max-w-none overflow-x-auto overscroll-x-contain pb-1 scroll-smooth snap-x snap-mandatory [scroll-padding-inline:0.5rem] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:[scroll-padding-inline:2rem] lg:mx-0 lg:w-auto lg:overflow-visible lg:snap-none [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-4 lg:flex-col lg:items-center lg:gap-12">
            <div className="w-2 shrink-0 lg:hidden" aria-hidden="true" />
            {retrospective.items.map((item, index) => (
              <div
                key={index}
                className="flex min-w-[78vw] flex-col gap-6 snap-center snap-always lg:w-full lg:min-w-0 lg:flex-row lg:justify-center"
              >
                <div className="mx-auto flex w-full max-w-[50rem] flex-col gap-6 lg:flex-row">
                  <RetroCard
                    text={item.dont}
                    variant="dont"
                    label={dontLabel}
                    className="h-[180px] lg:h-auto"
                  />
                  <RetroCard
                    text={item.do}
                    variant="do"
                    label={doLabel}
                    className="h-[210px] lg:h-auto"
                  />
                </div>
              </div>
            ))}
            <div className="w-2 shrink-0 lg:hidden" aria-hidden="true" />
          </div>
        </div>
      </Container>
    </Section>
  );
};
