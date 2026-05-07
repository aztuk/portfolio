"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FigmaBadge, FigmaBadgeIcon } from "@/components/shared/FigmaBadge";
import { GalleryPaginationControls } from "@/components/shared/GalleryPaginationControls";
import { LockedAsset } from "@/components/shared/LockedAsset";
import { MediaLightbox } from "@/components/shared/MediaLightbox";
import type { FigmaAsset, GalleryItem } from "@/content/use-cases/types";
import { buildFigmaEmbedUrl } from "@/lib/figma";

const FIGMA_THUMB_W = 1000;
const FIGMA_LOAD_TIMEOUT_MS = 10_000;

const THUMB_ASPECT: Record<string, string> = {
  web: "aspect-[8/5]",
  "figma-web": "aspect-[8/5]",
  mobile: "aspect-[9/19]",
};

const formatOf = (item: GalleryItem) => item.format ?? "web";

const aspectKey = (item: GalleryItem): string => {
  if (item.type === "figma" && formatOf(item) === "web") return "figma-web";
  return formatOf(item);
};

// ---------------------------------------------------------------------------
// Thumbnail
// ---------------------------------------------------------------------------

const FigmaThumbnail = ({ item, fit = "cover" }: { item: FigmaAsset; fit?: "cover" | "contain" }) => {
  const [status, setStatus] = useState<"loading" | "loaded" | "timeout">("loading");
  const [isMobile, setIsMobile] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023.98px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) {
      clearTimeout(timerRef.current);
      return;
    }
    if (item.poster) return;
    setStatus("loading");
    timerRef.current = setTimeout(() => setStatus("timeout"), FIGMA_LOAD_TIMEOUT_MS);
    return () => clearTimeout(timerRef.current);
  }, [item.src, item.poster, isMobile]);

  if (item.poster) {
    return (
      <Image
        src={item.poster}
        alt={item.title ?? "Aperçu Figma"}
        fill
        className={fit === "contain" ? "object-contain" : "object-cover"}
        sizes={`${FIGMA_THUMB_W}px`}
      />
    );
  }

  if (isMobile) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-canvas">
        <FigmaBadgeIcon />
        <p className="type-body-xs text-muted/60">Figma</p>
      </div>
    );
  }

  return (
    <>
      <iframe
        src={buildFigmaEmbedUrl(item.src, item.mode)}
        title={item.title ?? "Figma prototype"}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        tabIndex={-1}
        onLoad={() => {
          clearTimeout(timerRef.current);
          setStatus("loaded");
        }}
      />

      {/* Spinner while iframe loads */}
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-canvas/90">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      )}

      {/* Placeholder when iframe stays black */}
      {status === "timeout" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-canvas">
          <FigmaBadgeIcon />
          <p className="type-body-xs text-muted/60">Cliquer pour ouvrir</p>
        </div>
      )}
    </>
  );
};

type ThumbnailProps = {
  item: GalleryItem;
  fit?: "cover" | "contain";
  isAuthenticated?: boolean;
  sizes?: string;
};

const Thumbnail = ({
  item,
  fit = "cover",
  isAuthenticated = true,
  sizes,
}: ThumbnailProps) => {
  const reducedMotion = useReducedMotion();

  if (item.protected && !isAuthenticated) {
    return <LockedAsset isThumbnail />;
  }

  if (item.type === "video") {
    return (
      <video
        className={clsx("h-full w-full", fit === "contain" ? "object-contain" : "object-cover")}
        autoPlay={!reducedMotion}
        loop
        muted
        playsInline
        aria-label={item.alt}
        tabIndex={-1}
      >
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }

  if (item.type === "figma") {
    return <FigmaThumbnail item={item} fit={fit} />;
  }

  const isMobile = formatOf(item) === "mobile";
  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      className={fit === "contain" ? "object-contain" : "object-cover"}
      sizes={sizes ?? (isMobile ? "166px" : "532px")}
    />
  );
};


// ---------------------------------------------------------------------------
// Gallery viewer
// ---------------------------------------------------------------------------

type GalleryViewerItemProps = {
  item: GalleryItem;
  index: number;
  onClick: (index: number) => void;
  children?: ReactNode;
  isAuthenticated?: boolean;
};

const GalleryViewerItem = ({
  item,
  index,
  onClick,
  children,
  isAuthenticated = true,
}: GalleryViewerItemProps) => {
  const fmt = formatOf(item);
  const aKey = aspectKey(item);
  const isMobile = fmt === "mobile";
  const isFigma = item.type === "figma";
  const wrapperClassName = isFigma
    ? "aspect-[8/5] w-full max-w-[1000px]"
    : clsx(
      THUMB_ASPECT[aKey],
      isMobile
        ? "h-[min(72svh,620px)] max-h-[620px]"
        : "w-full max-w-[1100px]",
    );

  return (
    <figure className="mt-10 flex min-w-0 flex-col items-center gap-4 lg:mt-16 lg:gap-6">
      <div className={clsx("relative mx-auto", wrapperClassName)}>
        <button
          type="button"
          onClick={() => onClick(index)}
          className={clsx(
            "relative h-full w-full overflow-hidden border border-dark-smooth bg-canvas/60 shadow-elevation-2",
            "cursor-zoom-in transition duration-200 hover:scale-[1.01]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
            isFigma
              ? "rounded-[20px] lg:rounded-[28px]"
              : isMobile
                ? "rounded-[30px] lg:rounded-[36px]"
                : "rounded-[20px] lg:rounded-[28px]",
          )}
        >
          <Thumbnail
            item={item}
            fit="contain"
            isAuthenticated={isAuthenticated}
            sizes={isMobile ? "min(72svh * 9/19, 620px * 9/19)" : "(min-width: 1280px) 1100px, 92vw"}
          />
        </button>
        {isFigma && <FigmaBadge className="pointer-events-none absolute bottom-6 right-6 z-20" />}
        {children}
      </div>
      {item.caption && (
        <p className="type-body-lg max-w-full text-center text-smooth">
          {item.caption}
        </p>
      )}
    </figure>
  );
};

// ---------------------------------------------------------------------------
// Root export
// ---------------------------------------------------------------------------

type SolutionGalleryProps = {
  items: GalleryItem[];
  isAuthenticated?: boolean;
};

export const SolutionGallery = ({ items, isAuthenticated = true }: SolutionGalleryProps) => {
  const t = useTranslations("ui");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const activeItem = items[activeIndex] ?? items[0];

  const open = (index: number) => setLightboxIndex(index);
  const close = useCallback(() => setLightboxIndex(null), []);
  const previousSlide = useCallback(() => setActiveIndex((i) => (i > 0 ? i - 1 : i)), []);
  const nextSlide = useCallback(() => setActiveIndex((i) => (i < items.length - 1 ? i + 1 : i)), [items.length]);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : i)), [items.length]);

  if (!activeItem) return null;

  return (
    <>
      <div className="relative">
        <GalleryViewerItem
          item={activeItem}
          index={activeIndex}
          onClick={open}
          isAuthenticated={isAuthenticated}
        >
          <GalleryPaginationControls
            count={items.length}
            activeIndex={activeIndex}
            onPrevious={previousSlide}
            onNext={nextSlide}
            onSelect={setActiveIndex}
            previousLabel={t("previous")}
            nextLabel={t("next")}
          />
        </GalleryViewerItem>
      </div>

      {lightboxIndex !== null && (
        <MediaLightbox
          items={items}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
          isAuthenticated={isAuthenticated}
        />
      )}
    </>
  );
};
