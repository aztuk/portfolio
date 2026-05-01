"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import { FigmaBadge } from "@/components/shared/FigmaBadge";
import { FigmaEmbed } from "@/components/shared/FigmaEmbed";
import { LockedAsset } from "@/components/shared/LockedAsset";
import type { GalleryItem, KeyDecision } from "@/content/use-cases/types";

type KeyDecisionsProps = {
  items: KeyDecision[];
  isAuthenticated?: boolean;
};

type DecisionMediaProps = {
  item: GalleryItem;
  isThumbnail?: boolean;
  isAuthenticated?: boolean;
};

const mediaLabel = (item: GalleryItem) => {
  if (item.type === "figma") return item.title ?? item.caption ?? "Figma preview";
  return item.alt;
};

const DecisionMedia = ({ item, isThumbnail = false, isAuthenticated = true }: DecisionMediaProps) => {
  if (item.protected && !isAuthenticated) {
    return <LockedAsset isThumbnail={isThumbnail} />;
  }

  if (item.type === "video") {
    return (
      <video
        className="h-full w-full object-cover"
        autoPlay={!isThumbnail}
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

    return <FigmaEmbed item={item} showPageNavigation />;
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
      sizes={isThumbnail ? "82px" : "(min-width: 1280px) 1242px, 100vw"}
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
      withDivider && "border-b border-dark-smooth md:border-b-0 md:border-r",
    )}
  >
    <p
      className={clsx(
        "font-tektur text-xl font-semibold leading-[0.7]",
        tone === "positive" ? "text-positive" : "text-negative",
      )}
    >
      {title}
    </p>
    <ul className="flex flex-col items-center font-sans text-lg font-normal leading-[1.7] tracking-[-0.04em] text-muted">
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
  const mediaItems = useMemo(() => [item.media, ...item.gallery], [item.gallery, item.media]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = mediaItems[activeIndex] ?? item.media;
  const hasMultipleMedia = mediaItems.length > 1;

  return (
    <article className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 border-t border-dark-smooth pt-16">
      <div className="flex w-full flex-col items-center justify-center rounded-t-[20px] leading-[1.7]">
        <p className="font-tektur text-xl font-semibold text-primary">
          {item.eyebrow}
        </p>
        <h3 className="text-center font-sans text-[32px] font-medium leading-[1.7] tracking-[-0.04em] text-muted">
          {item.title}
        </h3>
        {item.summary ? (
          <p className="max-w-[980px] text-center font-sans text-2xl font-light leading-[1.7] tracking-[-0.04em] text-smooth">
            {item.summary}
          </p>
        ) : null}
      </div>

      <div className="relative flex w-full flex-col items-center">
        <div className="relative flex w-full justify-center">
          <div
            className={clsx(
              "relative aspect-[1200/750] max-w-[1200px] overflow-hidden rounded-[30px] border border-dark-smooth bg-[rgb(53_69_128/31%)] shadow-elevation-2 backdrop-blur-md",
              "w-[95%]",
            )}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[29px] bg-[rgb(53_69_128/31%)]">
              <DecisionMedia item={activeMedia} isAuthenticated={isAuthenticated} />
            </div>
          </div>

          {hasMultipleMedia && (
          <div className="absolute left-[calc(97.5%+16px)] top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 rounded-[14px] p-1">
            {mediaItems.map((media, index) => {
              const isActive = index === activeIndex;
              const label = mediaLabel(media);

              return (
                <div key={`${media.src}-${index}`} className="group relative size-16 shrink-0 lg:size-[82px]">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Afficher ${label}`}
                    aria-current={isActive}
                    className={clsx(
                      "relative size-full overflow-hidden rounded-[10px] border border-dark-smooth bg-[rgb(53_69_128)] shadow-elevation-2 transition duration-200",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                      isActive
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-canvas"
                        : "hover:scale-[1.04] hover:ring-1 hover:ring-muted/60",
                    )}
                  >
                    <DecisionMedia item={media} isThumbnail isAuthenticated={isAuthenticated} />
                  </button>
                  <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 z-30 hidden w-max max-w-[300px] -translate-y-1/2 rounded-[10px] border border-dark-smooth bg-dark/80 px-4 py-3 text-left font-sans text-sm leading-snug text-muted opacity-0 shadow-elevation-2 backdrop-blur-md transition group-hover:opacity-100 group-focus-within:opacity-100 lg:block">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col items-stretch gap-8 rounded-bl-[20px] p-5 md:flex-row md:gap-0">
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
