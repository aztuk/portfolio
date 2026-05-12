import { ArrowFatDown, ThumbsDown, ThumbsUp } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MobileCarousel } from "@/components/shared/MobileCarousel";
import { Tag } from "@/components/shared/Tag";
import { KeyDecisions } from "@/components/use-case/KeyDecisions";
import { QuestionCallout } from "@/components/use-case/QuestionCallout";
import { SolutionGallery } from "@/components/use-case/SolutionGallery";
import { SectionTitle } from "@/components/use-case/SectionTitle";
import type { ExploredSolution, SolutionSectionData } from "@/content/use-cases/types";
import { redactProtectedGalleryItem } from "@/lib/content";

type SolutionSectionProps = {
  solution: SolutionSectionData;
  isAuthenticated?: boolean;
  id?: string;
};

type ProsConsProps = {
  pros: string[];
  cons: string[];
};

const ProsCons = ({ pros, cons }: ProsConsProps) => (
  <div className="flex w-full shrink-0 flex-col items-center gap-3">
    <div className="flex flex-col items-center gap-2">
      {pros.map((pro) => (
        <div
          key={pro}
          className="flex items-center gap-3 px-3 py-1"
        >
          <ThumbsUp size={18} weight="light" className="shrink-0 text-green" />
          <p className="type-body-lg whitespace-nowrap text-muted">{pro}</p>
        </div>
      ))}
    </div>
    <div className="flex flex-col items-center gap-2">
      {cons.map((con) => (
        <div
          key={con}
          className="flex items-center gap-3 px-3 py-1"
        >
          <ThumbsDown size={18} weight="light" className="shrink-0 text-[#d9746b]" />
          <p className="type-body-lg whitespace-nowrap text-muted">{con}</p>
        </div>
      ))}
    </div>
  </div>
);

type DesktopPosition = "left" | "center" | "right";

type NumberBadgeProps = {
  index: number;
  displayIndex?: number;
  isSelected: boolean;
  desktopPosition?: DesktopPosition;
};

const NumberBadge = ({ index, displayIndex, isSelected, desktopPosition }: NumberBadgeProps) => (
  <div
    className={clsx(
      "absolute z-10 flex items-center justify-center",
      // Mobile: always top-left corner
      "-left-[18px] -top-[17px]",
      // Desktop position overrides
      desktopPosition === "left" && "lg:left-[28px] lg:-top-[27px]",
      desktopPosition === "right" &&
        "lg:left-auto lg:right-[28px] lg:-top-[27px] lg:translate-x-0",
      desktopPosition === "center" && "lg:left-1/2 lg:-translate-x-1/2 lg:-top-[34px]",
      // Size: larger for selected on desktop
      isSelected ? "size-[54px] lg:size-[80px]" : "size-[54px]",
    )}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={clsx(
          "-rotate-45 backdrop-blur-[4px]",
          isSelected
            ? "size-[38px] bg-primary lg:size-[57px]"
            : "size-[38px] bg-[var(--diamond-bg)]",
        )}
      />
    </div>
    <span
      className={clsx(
        "relative",
        isSelected
          ? "type-data-index-tight-selected text-[var(--solution-selected-badge-text)]"
          : "type-data-index-tight text-ink",
      )}
    >
      {String((displayIndex ?? index) + 1).padStart(2, "0")}
    </span>
  </div>
);

type SolutionCardProps = {
  item: ExploredSolution;
  isSelected: boolean;
  index: number;
  displayIndex?: number;
  selectedLabel: string;
  exploredLabel: string;
  desktopPosition?: DesktopPosition;
};

const SolutionCard = ({
  item,
  isSelected,
  index,
  displayIndex,
  selectedLabel,
  exploredLabel,
  desktopPosition,
}: SolutionCardProps) => {
  const isCenter = desktopPosition === "center";
  const isRight = desktopPosition === "right";
  const isLeft = desktopPosition === "left";
  const hasDesktopPosition = desktopPosition !== undefined;

  return (
    <article
      className={clsx(
        "relative flex h-full min-w-0 flex-col rounded-[24px] border lg:rounded-[30px]",
        isSelected && "shadow-elevation-2 backdrop-blur-[2px]",
        // Mobile padding
        "p-5 pt-8",
        // Desktop padding per position
        isCenter && "lg:p-8",
        isLeft && "lg:py-8 lg:pl-8 lg:pr-14",
        isRight && "lg:py-8 lg:pl-14 lg:pr-8",
        isLeft && "lg:-rotate-2",
        isRight && "lg:rotate-2",
        // Colors
        isSelected ? "border-primary bg-[var(--solution-selected-bg)]" : "border-dark-smooth bg-canvas",
      )}
    >
      <NumberBadge index={index} displayIndex={displayIndex} isSelected={isSelected} desktopPosition={desktopPosition} />

      {/* Head */}
      <div
        className={clsx(
          "flex shrink-0 flex-col gap-2",
          hasDesktopPosition && "lg:items-center lg:py-8 lg:text-center",
        )}
      >
        <p className="type-body-xl-medium text-muted">{item.title}</p>
        <p className="type-body-lg text-smooth">{item.summary}</p>
      </div>

      {/* Wireframe wrapper — flex-1, image stays fixed size */}
      <div className="flex flex-1 flex-col items-center justify-center py-4">
        {item.media?.type === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.media.src}
            alt={item.media.alt}
            className={clsx(
              "shrink-0 object-contain",
              isCenter ? "h-[131px] w-[210px] lg:h-[172px] lg:w-[276px]" : "h-[131px] w-[210px]",
            )}
          />
        )}
      </div>

      {/* Pros / Cons */}
      <ProsCons pros={item.pros} cons={item.cons} />

      {/* Status chip */}
      <div className="shrink-0 pt-6 lg:pt-8">
        <Tag
          label={isSelected ? selectedLabel : exploredLabel}
          className={clsx(
            "w-full !rounded-full !py-4",
            isSelected
              ? "type-chip-bold !border-primary bg-primary/10 text-primary"
              : "border-[var(--chip-default-border)] bg-[var(--chip-default-bg)] text-[var(--chip-default-text)]",
          )}
        />
      </div>
    </article>
  );
};

export const SolutionSection = async ({
  solution,
  isAuthenticated = true,
  id,
}: SolutionSectionProps) => {
  const t = await getTranslations("sections");
  const hasKeyDecisions = Boolean(solution.keyDecisions?.length);
  const galleryItems = solution.gallery ?? [];
  const selectedSolutionIds = Array.isArray(solution.selectedSolutionId)
    ? solution.selectedSolutionId
    : [solution.selectedSolutionId];

  // Desktop layout: split into left / center / right
  const selectedIndex = solution.exploredSolutions.findIndex((s) =>
    selectedSolutionIds.includes(s.id),
  );
  const centerSolution =
    selectedIndex >= 0 ? solution.exploredSolutions[selectedIndex] : null;
  const nonSelectedSolutions = solution.exploredSolutions.filter(
    (s) => !selectedSolutionIds.includes(s.id),
  );
  const leftSolution = nonSelectedSolutions[0] ?? null;
  const rightSolution = nonSelectedSolutions[1] ?? null;

  return (
    <Section id={id}>
      <Container className="px-6 sm:px-8 lg:px-0">
        <SectionTitle>{t("explorationAndSolution")}</SectionTitle>

        {/* Mobile: standard carousel */}
        <MobileCarousel className="mt-10 pt-4 lg:hidden" itemClassName="flex flex-col">
          {solution.exploredSolutions.map((item, index) => (
            <SolutionCard
              key={item.id}
              item={item}
              isSelected={selectedSolutionIds.includes(item.id)}
              index={index}
              selectedLabel={t("selected")}
              exploredLabel={t("explored")}
            />
          ))}
        </MobileCarousel>

        {/*
         * Desktop: CSS grid [1fr 390px 1fr].
         * Center card stays in flow so its full content height is measured.
         * Its 450px width still overflows the 390px column by 30px on each side.
         * The outer py-6 reserves room for the floating number badge.
         */}
        <div className="relative mt-16 hidden py-6 lg:grid lg:grid-cols-[1fr_390px_1fr]">
          {/* Left card */}
          <div className="flex min-w-0 flex-col lg:col-start-1 lg:row-start-1">
            {leftSolution && (
              <SolutionCard
                item={leftSolution}
                isSelected={false}
                index={solution.exploredSolutions.indexOf(leftSolution)}
                displayIndex={0}
                selectedLabel={t("selected")}
                exploredLabel={t("explored")}
                desktopPosition="left"
              />
            )}
          </div>

          {centerSolution && (
            <div className="z-10 flex w-[450px] max-w-none -translate-y-1 justify-self-center lg:col-start-2 lg:row-start-1">
              <SolutionCard
                item={centerSolution}
                isSelected
                index={selectedIndex}
                displayIndex={1}
                selectedLabel={t("selected")}
                exploredLabel={t("explored")}
                desktopPosition="center"
              />
            </div>
          )}

          {/* Right card */}
          <div className="flex min-w-0 flex-col lg:col-start-3 lg:row-start-1">
            {rightSolution && (
              <SolutionCard
                item={rightSolution}
                isSelected={false}
                index={solution.exploredSolutions.indexOf(rightSolution)}
                displayIndex={2}
                selectedLabel={t("selected")}
                exploredLabel={t("explored")}
                desktopPosition="right"
              />
            )}
          </div>

        </div>

        {solution.why ? (
          <QuestionCallout question={solution.why} label={t("why")} />
        ) : null}

        {/* Callout: only shown when there are key decisions below */}
        {hasKeyDecisions && (
          <div className="mt-10 flex items-center justify-center gap-3 pb-16">
            <ArrowFatDown size={32} weight="fill" className="shrink-0 text-primary" />
            <p className="type-body-xl-medium text-primary">
              {t("keyDecisionsCallout", { count: solution.keyDecisions?.length ?? 0 })}
            </p>
            <ArrowFatDown size={32} weight="fill" className="shrink-0 text-primary" />
          </div>
        )}

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
