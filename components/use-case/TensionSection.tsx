import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";

import { ChartCardsGrid } from "@/components/use-case/ChartCardsGrid";
import { Container } from "@/components/layout/Container";
import { DiscoveryMetricsReveal } from "@/components/use-case/DiscoveryMetricsReveal";
import { Section } from "@/components/layout/Section";
import { MobileCarousel } from "@/components/shared/MobileCarousel";
import { Tag } from "@/components/shared/Tag";
import { TensionBeforeImage } from "@/components/use-case/TensionBeforeImage";
import { SectionTitle } from "@/components/use-case/SectionTitle";
import type {
  TensionPoint,
  TensionSectionData,
} from "@/content/use-cases/types";

const getRevealDelayStyle = (index: number) =>
  ({ "--reveal-delay": `${index * 80}ms` } as CSSProperties);

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

// ─── Discovery signals ────────────────────────────────────────────────────────

type CoreQuestionCardProps = {
  question: string;
  label: string;
};

const CoreQuestionCard = ({ question, label }: CoreQuestionCardProps) => (
  <div className="mt-14 flex w-full flex-col items-center justify-center bg-[var(--core-question-bg)] px-6 py-10 text-center sm:px-10 lg:mt-16 lg:px-20 lg:py-20">
    <p className="type-about-kicker text-primary">{label}</p>
    <p className="type-about-body max-w-[880px] whitespace-pre-line text-muted">
      {question}
    </p>
  </div>
);

type DiscoverySignalsProps = {
  signals: string[];
  label: string;
};

const DiscoverySignals = ({ signals, label }: DiscoverySignalsProps) => {
  if (signals.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-8">
      <p className="type-chip text-muted/60">{label}</p>
      <MobileCarousel
        ariaLabel={label}
        className="lg:hidden"
        edgeSpacerClassName="w-6 sm:w-8"
        itemClassName="flex"
        itemWidthClassName="w-auto shrink-0"
        snapAlign="none"
      >
        {signals.map((signal, index) => (
          <span
            key={signal}
            className="discovery-reveal-signal inline-flex shrink-0"
            style={getRevealDelayStyle(index)}
          >
            <Tag className="shrink-0 px-5 py-2" label={signal} />
          </span>
        ))}
      </MobileCarousel>
      <div className="hidden flex-wrap justify-center gap-2 lg:flex">
        {signals.map((signal, index) => (
          <span
            key={signal}
            className="discovery-reveal-signal inline-flex"
            style={getRevealDelayStyle(index)}
          >
            <Tag label={signal} />
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

export const TensionSection = async ({ tension, id }: TensionSectionProps) => {
  const t = await getTranslations("sections");
  const frictionLabel = t("friction");
  const discoverySignalCount = tension.discoverySignals?.length ?? 0;
  const chartRevealDelayOffsetMs = 240 + discoverySignalCount * 80;
  const beforeImage = tension.artifact
    ? { ...tension.artifact, caption: tension.artifact.caption ?? tension.artifactCaption }
    : tension.artifacts?.[0];

  return (
    <Section id={id} className="py-16 lg:py-20">
      <Container className="px-6 sm:px-8 lg:px-0">
        <SectionTitle>{tension.title}</SectionTitle>

        {beforeImage ? (
          <TensionBeforeImage item={beforeImage} label={t("before")} aspectRatio={tension.artifactAspectRatio} />
        ) : null}

        {tension.chartCards && tension.chartCards.length > 0 ? (
          <div className="mt-14 flex flex-col items-center gap-6 py-10 lg:mt-16 lg:gap-6 lg:py-16">
            <DiscoveryMetricsReveal label={t("viewDiscoveryMetrics")}>
              <div
                className="flex flex-col items-center gap-6"
              >
                <DiscoverySignals
                  signals={tension.discoverySignals ?? []}
                  label={t("discoveryDone")}
                />
                <ChartCardsGrid
                  cards={tension.chartCards}
                  mobileClassName="mt-4"
                  gridClassName="mt-0 gap-y-16 lg:gap-x-0"
                  itemClassName="flex flex-col lg:px-5"
                  revealDelayOffsetMs={chartRevealDelayOffsetMs}
                />
              </div>
            </DiscoveryMetricsReveal>
          </div>
        ) : null}

        <div className="flex flex-wrap justify-center gap-10">
          {tension.tensions.map((item) => (
            <ProblemCard key={item.label} item={item} frictionLabel={frictionLabel} />
          ))}
        </div>

        <CoreQuestionCard question={tension.coreQuestion} label={t("coreQuestion")} />
      </Container>
    </Section>
  );
};
