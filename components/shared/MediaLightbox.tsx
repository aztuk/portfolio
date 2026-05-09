"use client";

import { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { FigmaEmbed } from "@/components/shared/FigmaEmbed";
import { LockedAsset } from "@/components/shared/LockedAsset";
import type { GalleryItem } from "@/content/use-cases/types";

const LIGHTBOX_CLASS: Record<string, string> = {
  web: "w-[calc(100vw-0.75rem)] aspect-[8/5] lg:w-[min(90vw,1200px)]",
  "figma-web": "w-[calc(100vw-0.75rem)] aspect-[8/5] lg:w-[min(90vw,1200px)]",
  mobile: "h-[min(82svh,620px)] max-w-[calc(100vw-0.75rem)] aspect-[9/19] lg:h-[min(85vh,700px)]",
};

const formatOf = (item: GalleryItem) => item.format ?? "web";

const aspectKey = (item: GalleryItem): string => {
  if (item.type === "figma" && formatOf(item) === "web") return "figma-web";
  return formatOf(item);
};

type MediaLightboxMediaProps = {
  item: GalleryItem;
  isAuthenticated?: boolean;
};

const MediaLightboxMedia = ({
  item,
  isAuthenticated = true,
}: MediaLightboxMediaProps) => {
  const reducedMotion = useReducedMotion();

  if (item.protected && !isAuthenticated) {
    return <LockedAsset />;
  }

  if (item.type === "video") {
    return (
      <video
        key={item.src}
        className="h-full w-full object-cover"
        autoPlay={!reducedMotion}
        loop
        muted
        playsInline
        aria-label={item.alt}
      >
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }

  if (item.type === "figma") {
    return <FigmaEmbed item={item} showPageNavigation />;
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={2400}
      height={2400}
      className="block h-auto w-auto max-h-[85svh] max-w-[calc(100vw-1.5rem)]"
      priority
      unoptimized
    />
  );
};

type MediaLightboxProps = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  isAuthenticated?: boolean;
};

export const MediaLightbox = ({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  isAuthenticated = true,
}: MediaLightboxProps) => {
  const t = useTranslations("ui");
  const item = items[index];
  const hasPrev = index > 0 && Boolean(onPrev);
  const hasNext = index < items.length - 1 && Boolean(onNext);
  const fmt = formatOf(item);
  const aKey = aspectKey(item);
  const isMobile = fmt === "mobile";
  const isImage = item.type === "image";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
      if (e.key === "ArrowRight" && hasNext) onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-1.5 backdrop-blur-sm lg:p-0"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:right-5 lg:top-5"
        aria-label={t("close")}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {onPrev && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          disabled={!hasPrev}
          className={clsx(
            "absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2",
            hasPrev ? "hover:bg-white/20" : "cursor-default opacity-30",
          )}
          aria-label={t("previous")}
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden>
            <path d="M9 1L1 9l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <div className="flex max-w-full flex-col items-center gap-3 lg:gap-4" onClick={(e) => e.stopPropagation()}>
        <div
          className={clsx(
            "relative overflow-hidden bg-dark shadow-elevation-2",
            isMobile ? "rounded-[40px]" : "rounded-[32px]",
            !isImage && LIGHTBOX_CLASS[aKey],
          )}
        >
          <MediaLightboxMedia item={item} isAuthenticated={isAuthenticated} />
        </div>

        {item.caption && (
          <p className="type-body-md max-w-[calc(100vw-0.75rem)] px-2 text-center text-smooth">
            {item.caption}
          </p>
        )}
      </div>

      {onNext && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          disabled={!hasNext}
          className={clsx(
            "absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2",
            hasNext ? "hover:bg-white/20" : "cursor-default opacity-30",
          )}
          aria-label={t("next")}
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden>
            <path d="M1 1l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {items.length > 1 && (
        <p className="type-body-sm absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50">
          {index + 1} / {items.length}
        </p>
      )}
    </div>
  );
};
