import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MobileCarousel } from "@/components/shared/MobileCarousel";
import { RetroCard } from "@/components/use-case/RetroCard";
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
      <Container className="px-6 sm:px-8 lg:px-0">
        <div className="mb-12">
          <h2 className="type-section-title text-muted">
            {retrospective.title}
          </h2>
        </div>

        {/* Card pairs — centered within the 1200px container */}
        <MobileCarousel
          ariaLabel={retrospective.title}
          className="lg:hidden"
          itemClassName="flex flex-col gap-6"
        >
          {retrospective.items.map((item, index) => (
            <div key={index} className="flex flex-col gap-6">
              <RetroCard
                text={item.dont}
                variant="dont"
                label={dontLabel}
                className="h-[180px]"
              />
              <RetroCard
                text={item.do}
                variant="do"
                label={doLabel}
                className="h-[210px]"
              />
            </div>
          ))}
        </MobileCarousel>

        <div className="hidden flex-col items-center gap-12 lg:flex">
          {retrospective.items.map((item, index) => (
            <div key={index} className="w-full">
              <div className="mx-auto flex w-full max-w-[50rem] gap-6">
                <RetroCard text={item.dont} variant="dont" label={dontLabel} />
                <RetroCard text={item.do} variant="do" label={doLabel} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
