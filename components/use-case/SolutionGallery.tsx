"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { useReducedMotion } from "framer-motion";
import { FigmaBadge, FigmaBadgeIcon } from "@/components/shared/FigmaBadge";
import { LockedAsset } from "@/components/shared/LockedAsset";
import { MediaLightbox } from "@/components/shared/MediaLightbox";
import type { FigmaAsset, GalleryItem } from "@/content/use-cases/types";
import { buildFigmaEmbedUrl } from "@/lib/figma";

const THUMB_H = "h-[260px] sm:h-[320px] lg:h-[350px]";
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

const FigmaThumbnail = ({ item }: { item: FigmaAsset }) => {
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
        className="object-cover"
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

type ThumbnailProps = { item: GalleryItem; isAuthenticated?: boolean };

const Thumbnail = ({ item, isAuthenticated = true }: ThumbnailProps) => {
  const reducedMotion = useReducedMotion();

  if (item.protected && !isAuthenticated) {
    return <LockedAsset isThumbnail />;
  }

  if (item.type === "video") {
    return (
      <video
        className="h-full w-full object-cover"
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
    return <FigmaThumbnail item={item} />;
  }

  const isMobile = formatOf(item) === "mobile";
  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      className="object-cover"
      sizes={isMobile ? "166px" : "532px"}
    />
  );
};


// ---------------------------------------------------------------------------
// Gallery tile
// ---------------------------------------------------------------------------

type GalleryItemProps = {
  item: GalleryItem;
  index: number;
  onClick: (index: number) => void;
  isAuthenticated?: boolean;
};

const GalleryItemTile = ({ item, index, onClick, isAuthenticated = true }: GalleryItemProps) => {
  const fmt = formatOf(item);
  const aKey = aspectKey(item);
  const isMobile = fmt === "mobile";
  const isFigma = item.type === "figma";

  return (
    <div className={clsx("flex min-w-0 flex-col items-center gap-4 lg:gap-6", isFigma ? "w-full lg:col-span-2" : "lg:px-5")}>
      <div className={clsx("relative", isFigma && "w-full")}>
        <button
          type="button"
          onClick={() => onClick(index)}
          className={clsx(
            "relative overflow-hidden border-2 border-muted bg-muted shadow-elevation-2",
            "cursor-zoom-in transition-transform duration-200 hover:scale-[1.02]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
            isFigma
              ? "aspect-[8/5] w-full max-w-[1000px] rounded-[24px] lg:rounded-[40px]"
              : clsx(THUMB_H, THUMB_ASPECT[aKey], isMobile ? "rounded-[28px]" : "rounded-[40px]"),
          )}
        >
          <Thumbnail item={item} isAuthenticated={isAuthenticated} />
        </button>
        {isFigma && <FigmaBadge className="pointer-events-none absolute bottom-3 right-3 z-20" />}
      </div>
      {item.caption && (
        <p className="type-body-lg max-w-full text-center text-smooth">
          {item.caption}
        </p>
      )}
    </div>
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (index: number) => setLightboxIndex(index);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : i)), [items.length]);

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-y-10 lg:mt-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-16">
        {items.map((item, index) => (
          <GalleryItemTile key={`${item.src}-${index}`} item={item} index={index} onClick={open} isAuthenticated={isAuthenticated} />
        ))}
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
