"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { useTranslations } from "next-intl";

import { FigmaBadge, FigmaBadgeIcon } from "@/components/shared/FigmaBadge";
import type { FigmaAsset } from "@/content/use-cases/types";
import { buildFigmaEmbedUrl, isFigmaPrototypeUrl } from "@/lib/figma";

const FIGMA_LOAD_TIMEOUT_MS = 10_000;

type FigmaEmbedStatus = "loading" | "ready" | "timeout";

type FigmaEmbedProps = {
  item: FigmaAsset;
  className?: string;
  iframeClassName?: string;
  showPageNavigation?: boolean;
  disableInteraction?: boolean;
};

const RetryIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path
      d="M1 7a6 6 0 1 0 1.5-3.9M1 1v3h3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FigmaEmbed = ({
  item,
  className,
  iframeClassName,
  showPageNavigation = false,
  disableInteraction = false,
}: FigmaEmbedProps) => {
  const pages = item.pages ?? [];
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [status, setStatus] = useState<FigmaEmbedStatus>("loading");
  const [attempt, setAttempt] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadOnMobile, setLoadOnMobile] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const activePage = pages[activePageIndex];
  const src = activePage?.src ?? item.src;
  const title = activePage?.label ?? item.title ?? "Figma preview";
  const isPrototype = item.mode === "prototype" || isFigmaPrototypeUrl(src);
  const embedMode: NonNullable<FigmaAsset["mode"]> = isPrototype ? "prototype" : (item.mode ?? "file");
  const shouldLoadEmbed = hasMounted && (!isMobile || loadOnMobile);

  useEffect(() => {
    setHasMounted(true);
    const media = window.matchMedia("(max-width: 1023.98px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!shouldLoadEmbed) {
      clearTimeout(timerRef.current);
      return;
    }

    setStatus("loading");
    timerRef.current = setTimeout(() => setStatus("timeout"), FIGMA_LOAD_TIMEOUT_MS);
    return () => clearTimeout(timerRef.current);
  }, [src, attempt, shouldLoadEmbed]);

  const t = useTranslations("figma");
  const retry = () => setAttempt((value) => value + 1);

  return (
    <div className={clsx("relative h-full w-full overflow-hidden bg-canvas", className)}>
      {!shouldLoadEmbed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-canvas px-3 text-center lg:gap-5 lg:px-5">
          {hasMounted ? (
            <>
              <FigmaBadgeIcon />
              <div className="flex max-w-[20rem] flex-col items-center gap-1.5 lg:max-w-[26rem] lg:gap-2">
                <p className="type-body-lg-medium text-muted">
                  {t("mobileDocumentTitle")}
                </p>
                <p className="type-body-xs text-smooth">
                  {t("mobileDocumentDescription")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLoadOnMobile(true)}
                className="type-control rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-primary transition-colors hover:bg-primary/15"
              >
                {t("loadAnyway")}
              </button>
            </>
          ) : (
            <>
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              <p className="type-body-sm text-muted">{t("loading")}</p>
            </>
          )}
        </div>
      )}

      {shouldLoadEmbed && showPageNavigation && pages.length > 1 && (
        <div className="absolute left-4 top-4 z-20 flex max-w-[calc(100%-2rem)] gap-2 overflow-x-auto rounded-full border border-white/10 bg-black/45 p-1 backdrop-blur-md">
          {pages.map((page, index) => (
            <button
              key={`${page.src}-${page.label}`}
              type="button"
              onClick={() => setActivePageIndex(index)}
              className={clsx(
                "type-body-xs shrink-0 rounded-full px-3 py-1.5 transition-colors",
                index === activePageIndex
                  ? "bg-white text-dark"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {page.label}
            </button>
          ))}
        </div>
      )}

      {shouldLoadEmbed && (
        <iframe
          key={`${src}-${attempt}`}
          src={buildFigmaEmbedUrl(src, embedMode)}
          title={title}
          className={clsx("h-full w-full border-0", iframeClassName)}
          onLoad={() => {
            clearTimeout(timerRef.current);
            setStatus("ready");
          }}
        />
      )}

      {shouldLoadEmbed && disableInteraction && (
        <div className="absolute inset-0 z-10" aria-hidden />
      )}

      <FigmaBadge size="md" className="pointer-events-none absolute bottom-3 right-3 z-30" />

      {shouldLoadEmbed && status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-canvas">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="type-body-sm text-muted">{t("loading")}</p>
        </div>
      )}

      {shouldLoadEmbed && status === "ready" && (
        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
          <button
            type="button"
            onClick={retry}
            className="type-body-xs flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-white/70 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
          >
            <RetryIcon />
            {t("blackScreen")}
          </button>
        </div>
      )}

      {shouldLoadEmbed && status === "timeout" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-canvas">
          <FigmaBadgeIcon />
          <p className="type-body-sm text-muted">{t("loadFailed")}</p>
          <button
            type="button"
            onClick={retry}
            className="type-control flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-white transition-colors hover:border-white/40 hover:bg-white/10"
          >
            <RetryIcon />
            {t("retry")}
          </button>
        </div>
      )}
    </div>
  );
};
