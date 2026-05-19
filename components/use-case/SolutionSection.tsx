import { ArrowFatDown, ThumbsDown, ThumbsUp } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
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

  const nonSelectedSolutions = solution.exploredSolutions.filter(
    (s) => !selectedSolutionIds.includes(s.id),
  );
  const getDesktopPosition = (item: ExploredSolution): DesktopPosition | undefined => {
    if (selectedSolutionIds.includes(item.id)) return "center";
    if (nonSelectedSolutions[0]?.id === item.id) return "left";
    if (nonSelectedSolutions[1]?.id === item.id) return "right";
    return undefined;
  };
  const getDesktopDisplayIndex = (position: DesktopPosition | undefined) => {
    if (position === "left") return 0;
    if (position === "center") return 1;
    if (position === "right") return 2;
    return undefined;
  };

  return (
    <Section id={id}>
      <Container className="px-2 sm:px-8 lg:px-0">
        <SectionTitle>{t("explorationAndSolution")}</SectionTitle>

        <div
          data-mobile-carousel
          className="mx-[calc(50%_-_50vw)] mt-10 w-screen max-w-none overflow-x-auto overscroll-x-contain pb-1 pt-4 scroll-smooth snap-x snap-mandatory [scroll-padding-inline:0.5rem] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:[scroll-padding-inline:2rem] lg:mx-0 lg:mt-16 lg:grid lg:w-auto lg:grid-cols-[1fr_390px_1fr] lg:overflow-visible lg:py-6 lg:snap-none [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-4 lg:contents">
            <div className="w-2 shrink-0 lg:hidden" aria-hidden="true" />
            {solution.exploredSolutions.map((item, index) => {
              const desktopPosition = getDesktopPosition(item);

              return (
                <div
                  key={item.id}
                  className={clsx(
                    "flex min-w-[78vw] flex-col snap-center snap-always lg:min-w-0",
                    desktopPosition === "left" && "lg:col-start-1 lg:row-start-1",
                    desktopPosition === "center" &&
                      "z-10 lg:col-start-2 lg:row-start-1 lg:w-[450px] lg:max-w-none lg:-translate-y-1 lg:justify-self-center",
                    desktopPosition === "right" && "lg:col-start-3 lg:row-start-1",
                    desktopPosition === undefined && "lg:hidden",
                  )}
                >
                  <SolutionCard
                    item={item}
                    isSelected={selectedSolutionIds.includes(item.id)}
                    index={index}
                    displayIndex={getDesktopDisplayIndex(desktopPosition)}
                    selectedLabel={t("selected")}
                    exploredLabel={t("explored")}
                    desktopPosition={desktopPosition}
                  />
                </div>
              );
            })}
            <div className="w-2 shrink-0 lg:hidden" aria-hidden="true" />
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
