"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { FigmaBadge, FigmaBadgeIcon } from "@/components/shared/FigmaBadge";
import { FigmaEmbed } from "@/components/shared/FigmaEmbed";
import type { FigmaAsset, GalleryItem } from "@/content/use-cases/types";
import { buildFigmaEmbedUrl } from "@/lib/figma";

const THUMB_H = "h-[350px]";
const FIGMA_THUMB_W = 1000;
const FIGMA_LOAD_TIMEOUT_MS = 10_000;

const THUMB_ASPECT: Record<string, string> = {
  web: "aspect-[8/5]",
  "figma-web": "aspect-[8/5]",
  mobile: "aspect-[9/19]",
};

const LIGHTBOX_CLASS: Record<string, string> = {
  web: "w-[min(90vw,1200px)] aspect-[8/5]",
  "figma-web": "w-[min(90vw,1200px)] aspect-[8/5]",
  mobile: "h-[min(85vh,700px)] aspect-[9/19]",
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
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setStatus("loading");
    timerRef.current = setTimeout(() => setStatus("timeout"), FIGMA_LOAD_TIMEOUT_MS);
    return () => clearTimeout(timerRef.current);
  }, [item.src]);

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

type ThumbnailProps = { item: GalleryItem };

const Thumbnail = ({ item }: ThumbnailProps) => {
  if (item.type === "video") {
    return (
      <video
        className="h-full w-full object-cover"
        autoPlay
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
// Lightbox media
// ---------------------------------------------------------------------------

type LightboxMediaProps = { item: GalleryItem };

const LightboxMedia = ({ item }: LightboxMediaProps) => {
  if (item.type === "video") {
    return (
      <video
        key={item.src}
        className="h-full w-full object-cover"
        autoPlay
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

  const isMobile = formatOf(item) === "mobile";
  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      className="object-contain"
      sizes={isMobile ? "min(85vh * 9/19, 700px * 9/19)" : "min(90vw, 1100px)"}
      priority
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
};

const GalleryItemTile = ({ item, index, onClick }: GalleryItemProps) => {
  const fmt = formatOf(item);
  const aKey = aspectKey(item);
  const isMobile = fmt === "mobile";
  const isFigma = item.type === "figma";

  return (
    <div className={clsx("flex min-w-0 flex-col items-center gap-6", isFigma ? "col-span-2 w-full" : "px-5")}>
      <div className={clsx("relative", isFigma && "w-full")}>
        <button
          type="button"
          onClick={() => onClick(index)}
          className={clsx(
            "relative overflow-hidden border-2 border-muted bg-muted shadow-elevation-2",
            "cursor-zoom-in transition-transform duration-200 hover:scale-[1.02]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
            isFigma
              ? "aspect-[8/5] w-full max-w-[1000px] rounded-[40px]"
              : clsx(THUMB_H, THUMB_ASPECT[aKey], isMobile ? "rounded-[28px]" : "rounded-[40px]"),
          )}
        >
          <Thumbnail item={item} />
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
// Lightbox
// ---------------------------------------------------------------------------

type LightboxProps = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const Lightbox = ({ items, index, onClose, onPrev, onNext }: LightboxProps) => {
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;
  const fmt = formatOf(item);
  const aKey = aspectKey(item);
  const isMobile = fmt === "mobile";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Fermer"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={!hasPrev}
        className={clsx(
          "absolute left-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors",
          hasPrev ? "hover:bg-white/20" : "opacity-30 cursor-default",
        )}
        aria-label="Précédent"
      >
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden>
          <path d="M9 1L1 9l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className="flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={clsx(
            "relative overflow-hidden shadow-elevation-2",
            isMobile ? "rounded-[40px]" : "rounded-[32px]",
            LIGHTBOX_CLASS[aKey],
          )}
        >
          <LightboxMedia item={item} />
        </div>

        {item.caption && (
          <p className="type-body-md text-center text-smooth">
            {item.caption}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={!hasNext}
        className={clsx(
          "absolute right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors",
          hasNext ? "hover:bg-white/20" : "opacity-30 cursor-default",
        )}
        aria-label="Suivant"
      >
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden>
          <path d="M1 1l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p className="type-body-sm absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50">
        {index + 1} / {items.length}
      </p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Root export
// ---------------------------------------------------------------------------

type SolutionGalleryProps = {
  items: GalleryItem[];
};

export const SolutionGallery = ({ items }: SolutionGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (index: number) => setLightboxIndex(index);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : i)), [items.length]);

  return (
    <>
      <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-16">
        {items.map((item, index) => (
          <GalleryItemTile key={`${item.src}-${index}`} item={item} index={index} onClick={open} />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
};
