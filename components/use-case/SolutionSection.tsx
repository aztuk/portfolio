import clsx from "clsx";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Tag } from "@/components/shared/Tag";
import { KeyDecisions } from "@/components/use-case/KeyDecisions";
import { SolutionGallery } from "@/components/use-case/SolutionGallery";
import type { ExploredSolution, SolutionSectionData } from "@/content/use-cases/types";
import { redactProtectedGalleryItem } from "@/lib/content";

type SolutionSectionProps = {
  solution: SolutionSectionData;
  isAuthenticated?: boolean;
  id?: string;
};

type BulletPointProps = {
  text: string;
  variant: "pro" | "con";
};

const BulletPoint = ({ text, variant }: BulletPointProps) => (
  <div className="relative ml-2 flex w-[calc(100%-0.5rem)] items-center pl-9">
    <div className="absolute left-0 top-[8px] flex size-4 items-center justify-center">
      <div
        className={clsx(
          "size-[11px] rotate-45 border",
          variant === "pro" ? "border-[#aeed6b]" : "border-[#d9746b]",
        )}
      />
    </div>
    <p className="type-body-lg min-w-0 flex-1 text-muted">
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
        "type-data-index-tight relative",
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
      "relative flex min-w-0 flex-1 self-stretch rounded-[24px] border p-5 pt-8 shadow-elevation-2 backdrop-blur-[2px] lg:min-h-[520px] lg:rounded-[30px] lg:p-6",
      isSelected
        ? "border-primary bg-primary/10"
        : "border-dark-smooth bg-dark-smooth/20",
    )}
  >
    <NumberBadge index={index} isSelected={isSelected} />

    <div className="flex flex-1 flex-col gap-2">
      <div className="flex min-h-[5.1rem] items-center">
        <p className="type-body-xl-medium line-clamp-2 text-muted">
          {item.title}
        </p>
      </div>

      <div className="min-h-[5.75rem]">
        <p className="type-body-lg line-clamp-3 text-smooth">
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
              ? "type-chip-bold !border-primary bg-primary/10 text-primary"
              : "border-white/10 bg-white/[0.06] text-white",
          )}
        />
      </div>
    </div>
  </article>
);

export const SolutionSection = async ({
  solution,
  isAuthenticated = true,
  id,
}: SolutionSectionProps) => {
  const t = await getTranslations("sections");
  const hasKeyDecisions = Boolean(solution.keyDecisions?.length);
  const galleryItems = solution.gallery ?? [];

  return (
    <Section id={id}>
      <Container className="px-6 sm:px-8 lg:px-0">
        <h2 className="type-section-title text-muted">
          {t("explorationAndSolution")}
        </h2>

        <div className="mt-10 flex flex-col items-stretch gap-8 pt-4 lg:mt-16 lg:flex-row lg:gap-12 lg:pt-6">
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
          <KeyDecisions
            items={(solution.keyDecisions ?? []).map((d) => ({
              ...d,
              media: redactProtectedGalleryItem(d.media, isAuthenticated),
              gallery: d.gallery.map((g) => redactProtectedGalleryItem(g, isAuthenticated)),
            }))}
            isAuthenticated={isAuthenticated}
          />
        ) : galleryItems.length > 0 ? (
          <SolutionGallery
            items={galleryItems.map((g) => redactProtectedGalleryItem(g, isAuthenticated))}
            isAuthenticated={isAuthenticated}
          />
        ) : null}
      </Container>
    </Section>
  );
};
