import { getTranslations } from "next-intl/server";
import { ChartCardsGrid } from "@/components/use-case/ChartCardsGrid";
import { Container } from "@/components/layout/Container";
import { DiscoveryMetricsReveal } from "@/components/use-case/DiscoveryMetricsReveal";
import { Section } from "@/components/layout/Section";
import { QuestionCallout } from "@/components/use-case/QuestionCallout";
import { TensionBeforeImage } from "@/components/use-case/TensionBeforeImage";
import { SectionTitle } from "@/components/use-case/SectionTitle";
import type {
  TensionPoint,
  TensionSectionData,
} from "@/content/use-cases/types";


type TensionSectionProps = {
  tension: TensionSectionData;
  id?: string;
};

// ─── Problem card ─────────────────────────────────────────────────────────────

type ProblemCardProps = {
  item: TensionPoint;
  frictionLabel: string;
};

const ProblemCard = ({ item, frictionLabel }: ProblemCardProps) => (
  <article className="relative flex w-[400px] flex-col items-center gap-2 rounded-[24px] border border-dark-smooth bg-canvas px-7 py-8 text-center lg:rounded-[30px] lg:px-8 lg:py-10">
    <div className="flex w-full flex-col uppercase leading-[1.2]">
      <p className="type-tension-kicker mb-[-8px] w-full text-primary">
        {frictionLabel}
      </p>
      <p className="type-tension-persona-title w-full text-muted">{item.label}</p>
    </div>

    <p className="type-body-lg-light w-full text-muted">{item.value}</p>

    {item.bullets && item.bullets.length > 0 && (
      <div className="flex flex-col gap-3 py-6">
        {item.bullets.map((bullet) => (
          <p key={bullet} className="type-body-lg text-muted">
            {bullet}
          </p>
        ))}
      </div>
    )}
  </article>
);


// ─── Section ──────────────────────────────────────────────────────────────────

export const TensionSection = async ({ tension, id }: TensionSectionProps) => {
  const t = await getTranslations("sections");
  const frictionLabel = t("friction");
  const beforeImage = tension.artifact
    ? { ...tension.artifact, caption: tension.artifact.caption ?? tension.artifactCaption }
    : tension.artifacts?.[0];

  return (
    <Section id={id} className="py-16 lg:py-20">
      <Container className="px-2 sm:px-8 lg:px-0">
        <SectionTitle>{tension.title}</SectionTitle>

        {beforeImage ? (
          <TensionBeforeImage item={beforeImage} label={t("before")} aspectRatio={tension.artifactAspectRatio} />
        ) : null}

        {tension.chartCards && tension.chartCards.length > 0 ? (
          <div className="mt-14 flex flex-col items-center gap-6 py-10 lg:mt-16 lg:gap-6 lg:py-16">
            <DiscoveryMetricsReveal label={t("viewDiscoveryMetrics")}>
              <ChartCardsGrid
                cards={tension.chartCards}
                mobileClassName="mt-4"
                gridClassName="lg:mt-0 lg:gap-4"
                itemClassName="flex flex-col lg:px-5"
              />
            </DiscoveryMetricsReveal>
          </div>
        ) : null}

        <div className="flex flex-wrap justify-center gap-10">
          {tension.tensions.map((item) => (
            <ProblemCard key={item.label} item={item} frictionLabel={frictionLabel} />
          ))}
        </div>

        <QuestionCallout question={tension.coreQuestion} label={t("coreQuestion")} />
      </Container>
    </Section>
  );
};
