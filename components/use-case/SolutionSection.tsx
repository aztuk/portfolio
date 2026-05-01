import clsx from "clsx";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Tag } from "@/components/shared/Tag";
import { KeyDecisions } from "@/components/use-case/KeyDecisions";
import { SolutionGallery } from "@/components/use-case/SolutionGallery";
import type { ExploredSolution, SolutionSectionData } from "@/content/use-cases/types";

type SolutionSectionProps = {
  solution: SolutionSectionData;
  isAuthenticated?: boolean;
};

type BulletPointProps = {
  text: string;
  variant: "pro" | "con";
};

const BulletPoint = ({ text, variant }: BulletPointProps) => (
  <div className="relative flex w-full items-center pl-9">
    <div className="absolute left-0 top-[8px] flex size-4 items-center justify-center">
      <div
        className={clsx(
          "size-[11px] rotate-45 border",
          variant === "pro" ? "border-[#aeed6b]" : "border-[#d9746b]",
        )}
      />
    </div>
    <p className="min-w-0 flex-1 font-sans text-lg font-bold leading-[1.7] tracking-[-0.04em] text-muted">
      {text}
    </p>
  </div>
);

type NumberBadgeProps = {
  index: number;
  isSelected: boolean;
};

const NumberBadge = ({ index, isSelected }: NumberBadgeProps) => (
  <div className="absolute -left-[18px] -top-[17px] z-10 flex size-[54px] items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={clsx(
          "size-[38px] -rotate-45 backdrop-blur-[4px]",
          isSelected ? "bg-primary" : "bg-dark-smooth/50",
        )}
      />
    </div>
    <span
      className={clsx(
        "relative font-tektur text-xl font-semibold leading-[0.7]",
        isSelected ? "text-dark" : "text-primary",
      )}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  </div>
);

type SolutionCardProps = {
  item: ExploredSolution;
  isSelected: boolean;
  index: number;
  selectedLabel: string;
  exploredLabel: string;
};

const SolutionCard = ({
  item,
  isSelected,
  index,
  selectedLabel,
  exploredLabel,
}: SolutionCardProps) => (
  <article
    className={clsx(
      "relative flex min-h-[520px] flex-1 min-w-0 self-stretch rounded-[30px] border p-6 shadow-elevation-2 backdrop-blur-[2px]",
      isSelected
        ? "border-primary bg-primary/10"
        : "border-dark-smooth bg-dark-smooth/20",
    )}
  >
    <NumberBadge index={index} isSelected={isSelected} />

    <div className="flex flex-1 flex-col gap-2">
      <div className="min-h-[5.1rem]">
        <p className="line-clamp-2 font-sans text-2xl font-medium leading-[1.7] tracking-[-0.04em] text-muted">
          {item.title}
        </p>
      </div>

      <div className="min-h-[5.75rem]">
        <p className="line-clamp-3 font-sans text-lg font-normal leading-[1.7] tracking-[-0.04em] text-smooth">
          {item.summary}
        </p>
      </div>

      <div className="flex flex-1 flex-col">
        {item.pros.length > 0 && (
          <div className="flex w-full flex-col gap-3 pt-6">
            {item.pros.map((pro) => (
              <BulletPoint key={pro} text={pro} variant="pro" />
            ))}
          </div>
        )}

        {item.cons.length > 0 && (
          <div className="flex w-full flex-col gap-3 pt-6">
            {item.cons.map((con) => (
              <BulletPoint key={con} text={con} variant="con" />
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto flex w-full flex-col pt-8">
        <Tag
          label={isSelected ? selectedLabel : exploredLabel}
          className={clsx(
            "w-full",
            isSelected
              ? "!border-primary bg-primary/10 font-bold text-primary"
              : "border-white/10 bg-white/[0.06] text-white",
          )}
        />
      </div>
    </div>
  </article>
);

export const SolutionSection = async ({ solution, isAuthenticated = true }: SolutionSectionProps) => {
  const t = await getTranslations("sections");
  const hasKeyDecisions = Boolean(solution.keyDecisions?.length);
  const galleryItems = solution.gallery ?? [];

  return (
    <Section>
      <Container>
        <h2 className="font-display text-[40px] font-light leading-[1.2] text-muted">
          {t("explorationAndSolution")}
        </h2>

        <div className="mt-16 flex items-stretch gap-12 pt-6">
          {solution.exploredSolutions.map((item, index) => (
            <SolutionCard
              key={item.id}
              item={item}
              isSelected={item.id === solution.selectedSolutionId}
              index={index}
              selectedLabel={t("selected")}
              exploredLabel={t("explored")}
            />
          ))}
        </div>

        {hasKeyDecisions ? (
          <KeyDecisions items={solution.keyDecisions ?? []} isAuthenticated={isAuthenticated} />
        ) : galleryItems.length > 0 ? (
          <SolutionGallery items={galleryItems} />
        ) : null}
      </Container>
    </Section>
  );
};
