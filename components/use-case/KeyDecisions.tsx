"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import { FigmaBadge } from "@/components/shared/FigmaBadge";
import { FigmaEmbed } from "@/components/shared/FigmaEmbed";
import { GalleryPaginationControls } from "@/components/shared/GalleryPaginationControls";
import { LockedAsset } from "@/components/shared/LockedAsset";
import { MediaLightbox } from "@/components/shared/MediaLightbox";
import type { GalleryItem, KeyDecision } from "@/content/use-cases/types";

type KeyDecisionsProps = {
  items: KeyDecision[];
  isAuthenticated?: boolean;
};

type DecisionMediaProps = {
  item: GalleryItem;
  isThumbnail?: boolean;
  isAuthenticated?: boolean;
  sizes?: string;
};

const mediaLabel = (item: GalleryItem) => {
  if (item.type === "figma") return item.title ?? item.caption ?? "Figma preview";
  return item.alt;
};

const getDecisionMediaLayout = (item: GalleryItem) => {
  if (item.format === "mobile") {
    return {
      wrapper: "w-[min(78vw,288px)] max-w-[288px]",
      frame: "aspect-[9/19.5] rounded-[32px]",
      inner: "rounded-[31px]",
      sizes: "(min-width: 1024px) 288px, 78vw",
    };
  }

  return {
    wrapper: "w-[calc(100vw-1rem)] max-w-[1000px] sm:w-[95%]",
    frame: "aspect-[1200/750] rounded-[30px]",
    inner: "rounded-[29px]",
    sizes: "(min-width: 1280px) 1000px, (min-width: 640px) 95vw, calc(100vw - 1rem)",
  };
};

const DecisionMedia = ({
  item,
  isThumbnail = false,
  isAuthenticated = true,
  sizes,
}: DecisionMediaProps) => {
  const reducedMotion = useReducedMotion();

  if (item.protected && !isAuthenticated) {
    return <LockedAsset isThumbnail={isThumbnail} />;
  }

  if (item.type === "video") {
    return (
      <video
        className={clsx(
          "h-full w-full",
          isThumbnail || item.format === "mobile" ? "object-cover object-center" : "object-contain",
        )}
        autoPlay={!isThumbnail && !reducedMotion}
        loop
        muted
        playsInline
        poster={item.poster}
        aria-label={item.alt}
      >
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }

  if (item.type === "figma") {
    if (isThumbnail) {
      if (item.poster) {
        return (
          <>
            <Image
              src={item.poster}
              alt={item.title ?? item.caption ?? "Figma preview"}
              fill
              className="object-contain"
              sizes="82px"
              unoptimized
            />
            <FigmaBadge size="sm" className="pointer-events-none absolute bottom-1 right-1 z-20" />
          </>
        );
      }

      return (
        <span className="flex h-full w-full items-center justify-center bg-dark-smooth/30">
          <FigmaBadge size="sm" />
        </span>
      );
    }

    return <FigmaEmbed item={item} showPageNavigation disableInteraction={item.disableInteraction} />;
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      className={clsx(
        "z-10 object-contain",
        !isThumbnail && "opacity-90",
      )}
      sizes={isThumbnail ? "82px" : sizes}
      unoptimized
    />
    );
  };

type CostColumnProps = {
  title: string;
  items: string[];
  tone: "positive" | "negative";
  withDivider?: boolean;
};

const CostColumn = ({ title, items, tone, withDivider = false }: CostColumnProps) => (
  <div
    className={clsx(
      "flex min-w-0 flex-1 flex-col items-center gap-4 pb-8",
      withDivider && "border-b border-dark-smooth lg:border-b-0 lg:border-r",
    )}
  >
    <p
      className={clsx(
        "type-data-value",
        tone === "positive" ? "text-positive" : "text-negative",
      )}
    >
      {title}
    </p>
    <ul className="type-body-lg flex flex-col items-center text-muted">
      {items.map((item) => (
        <li key={item} className="text-center">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

type KeyDecisionCardProps = {
  item: KeyDecision;
  isAuthenticated?: boolean;
};

const KeyDecisionCard = ({ item, isAuthenticated = true }: KeyDecisionCardProps) => {
  const t = useTranslations("sections");
  const ui = useTranslations("ui");
  const mediaItems = useMemo(() => [item.media, ...item.gallery], [item.gallery, item.media]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const activeMedia = mediaItems[activeIndex] ?? item.media;
  const activeMediaLayout = getDecisionMediaLayout(activeMedia);
  const hasMultipleMedia = mediaItems.length > 1;
  const canOpenActiveMedia =
    activeMedia.type !== "figma" && !(activeMedia.protected && !isAuthenticated);
  const previousSlide = () => setActiveIndex((index) => (index > 0 ? index - 1 : index));
  const nextSlide = () => setActiveIndex((index) => (index < mediaItems.length - 1 ? index + 1 : index));

  return (
    <article className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 border-t border-dark-smooth pt-12 lg:gap-8 lg:pt-16">
      <div className="flex w-full flex-col items-center justify-center rounded-t-[20px]">
        <p className="type-decision-eyebrow text-primary">
          {item.eyebrow}
        </p>
        <h3 className="type-decision-title text-center text-muted">
          {item.title}
        </h3>
        {item.summary ? (
          <p className="type-body-lg max-w-[600px] text-center text-smooth">
            {item.summary}
          </p>
        ) : null}
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <div className={clsx("relative mx-auto", activeMediaLayout.wrapper)}>
          <div className={clsx(
            "relative overflow-hidden border border-dark-smooth bg-canvas",
            activeMediaLayout.frame,
          )}>
            <div className={clsx(
              "relative h-full w-full overflow-hidden bg-canvas",
              activeMediaLayout.inner,
            )}>
              <DecisionMedia
                item={activeMedia}
                isAuthenticated={isAuthenticated}
                sizes={activeMediaLayout.sizes}
              />
              {canOpenActiveMedia && (
                <button
                  type="button"
                  onClick={() => setLightboxIndex(activeIndex)}
                  className="absolute inset-0 z-20 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  aria-label={mediaLabel(activeMedia)}
                />
              )}
            </div>
          </div>

          {hasMultipleMedia && (
            <GalleryPaginationControls
              count={mediaItems.length}
              activeIndex={activeIndex}
              onPrevious={previousSlide}
              onNext={nextSlide}
              onSelect={setActiveIndex}
              previousLabel={ui("previous")}
              nextLabel={ui("next")}
            />
          )}
        </div>

        <p className="type-body-lg max-w-[80%] text-center text-smooth">{mediaLabel(activeMedia)}</p>
      </div>

      <div className="flex w-full flex-col items-stretch gap-8 rounded-bl-[20px] p-5 lg:flex-row lg:gap-0">
        <CostColumn
          title={t("avoidedCost")}
          items={item.avoidedCost}
          tone="positive"
          withDivider
        />
        <CostColumn
          title={t("acceptedCost")}
          items={item.acceptedCost}
          tone="negative"
        />
      </div>
      {lightboxIndex !== null && (
        <MediaLightbox
          items={mediaItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((index) => (index !== null && index > 0 ? index - 1 : index))}
          onNext={() => setLightboxIndex((index) => (index !== null && index < mediaItems.length - 1 ? index + 1 : index))}
          isAuthenticated={isAuthenticated}
        />
      )}
    </article>
  );
};

export const KeyDecisions = ({ items, isAuthenticated = true }: KeyDecisionsProps) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-16 flex flex-col gap-24">
      {items.map((item) => (
        <KeyDecisionCard key={item.id} item={item} isAuthenticated={isAuthenticated} />
      ))}
    </div>
  );
};
