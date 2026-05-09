import { getTranslations } from "next-intl/server";

import { BulletPoint } from "@/components/use-case/BulletPoint";
import { ChartCardsGrid } from "@/components/use-case/ChartCardsGrid";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MobileCarousel } from "@/components/shared/MobileCarousel";
import { Tag } from "@/components/shared/Tag";
import { TensionBeforeImage } from "@/components/use-case/TensionBeforeImage";
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
  index: number;
};

const ProblemCard = ({ item, index }: ProblemCardProps) => (
  <article className="relative flex w-full max-w-[400px] flex-1 flex-col gap-2 rounded-[24px] py-6 pl-16 pr-6 lg:rounded-[30px]">
    <div className="absolute left-[-2px] top-[22px] flex size-[54px] items-center justify-center">
      <div className="absolute size-[38px] -rotate-45 bg-dark-smooth/50 backdrop-blur-[4px]" />
      <p className="type-data-index relative text-primary">
        {String(index + 1).padStart(2, "0")}
      </p>
    </div>

    <div className="flex w-full flex-col uppercase leading-[1.2]">
      <p className="type-tension-kicker mb-[-8px] w-full text-primary">
        Friction
      </p>
      <p className="type-tension-persona-title w-full text-muted">{item.label}</p>
    </div>

    <p className="type-body-lg-light w-full text-muted">{item.value}</p>

    {item.bullets && item.bullets.length > 0 && (
      <div className="flex flex-col gap-3 py-6">
        {item.bullets.map((bullet) => (
          <BulletPoint key={bullet}>{bullet}</BulletPoint>
        ))}
      </div>
    )}
  </article>
);

// ─── Discovery signals ────────────────────────────────────────────────────────

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
        {signals.map((signal) => (
          <Tag key={signal} className="shrink-0 px-5 py-2" label={signal} />
        ))}
      </MobileCarousel>
      <div className="hidden flex-wrap justify-center gap-2 lg:flex">
        {signals.map((signal) => (
          <Tag key={signal} label={signal} />
        ))}
      </div>
    </div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

export const TensionSection = async ({ tension, id }: TensionSectionProps) => {
  const t = await getTranslations("sections");
  const beforeImage = tension.artifact
    ? { ...tension.artifact, caption: tension.artifact.caption ?? tension.artifactCaption }
    : tension.artifacts?.[0];

  return (
    <Section id={id} className="py-16 lg:py-20">
      <Container className="px-6 sm:px-8 lg:px-0">
        <h2 className="type-section-title text-muted">{tension.title}</h2>

        {beforeImage ? (
          <TensionBeforeImage item={beforeImage} label={t("before")} aspectRatio={tension.artifactAspectRatio} />
        ) : null}

        {tension.chartCards && tension.chartCards.length > 0 ? (
          <div className="mt-14 flex flex-col items-center gap-6 py-10 lg:mt-16 lg:gap-6 lg:py-16">
            <DiscoverySignals
              signals={tension.discoverySignals ?? []}
              label={t("discoveryDone")}
            />
            <ChartCardsGrid
              cards={tension.chartCards}
              mobileClassName="mt-4"
              gridClassName="mt-0 gap-y-16 lg:gap-x-0"
              itemClassName="flex flex-col lg:px-5"
            />
          </div>
        ) : null}

        <div className="my-20 flex items-center justify-center lg:my-16">
          <div className="rotate-3">
            <div className="flex w-full max-w-[700px] items-center justify-center rounded-[20px] border-2 border-primary bg-dark-smooth/60 p-6 shadow-elevation-2 backdrop-blur-[2px] sm:p-8">
              <p className="type-note text-center text-primary lg:text-[21px]">{tension.coreQuestion}</p>
            </div>
          </div>
        </div>

        <div
          className={`grid justify-items-start gap-8 lg:gap-12 ${
            tension.tensions.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
          {tension.tensions.map((item, index) => (
            <ProblemCard key={item.label} item={item} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
