import { getTranslations } from "next-intl/server";

import { ChartCardsGrid } from "@/components/use-case/ChartCardsGrid";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { ImpactSectionData } from "@/content/use-cases/types";

type ImpactSectionProps = {
  impactSection: ImpactSectionData;
  id?: string;
};

const DiamondBullet = () => (
  <div className="absolute left-0 top-[8px] flex size-[15.556px] items-center justify-center">
    <div className="size-[11px] rotate-45 border border-smooth" />
  </div>
);

export const ImpactSection = async ({ impactSection, id }: ImpactSectionProps) => {
  const t = await getTranslations("sections");
  const labels = { beforeLabel: t("before"), afterLabel: t("after") };

  return (
    <Section id={id}>
      <Container className="px-6 sm:px-8 lg:px-0">
        <h2 className="type-section-title text-muted">
          {impactSection.title}
        </h2>

        <div className="mt-10 flex max-w-[800px] flex-col gap-5 lg:mt-12 lg:gap-6">
          <p className="type-body-lg text-ink">
            {impactSection.summary}
          </p>
          <ul className="flex flex-col gap-3 py-6">
            {impactSection.bullets.map((bullet) => (
              <li key={bullet.bold} className="relative flex items-start gap-2.5 pl-9">
                <DiamondBullet />
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <p className="type-body-lg-bold w-full text-muted">
                    {bullet.bold}
                  </p>
                  <p className="type-body-sm w-full text-smooth">
                    {bullet.regular}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ChartCardsGrid
          cards={impactSection.charts}
          labels={labels}
          mobileClassName="mt-4"
          gridClassName="mt-4 gap-y-10 lg:gap-x-16"
          itemClassName="flex flex-col"
        />
      </Container>
    </Section>
  );
};
