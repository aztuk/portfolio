"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { ArrowLeftIcon } from "@phosphor-icons/react";

import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { Link } from "@/i18n/navigation";

export type UseCaseTableOfContentsItem = {
  id: string;
  label: string;
};

type UseCaseTableOfContentsProps = {
  items: UseCaseTableOfContentsItem[];
  className?: string;
};

const getActiveIndex = (items: UseCaseTableOfContentsItem[]) => {
  const anchorOffset = 160;
  const candidates = items
    .map((item, index) => {
      const element = document.getElementById(item.id);

      if (!element) {
        return null;
      }

      return {
        index,
        top: element.getBoundingClientRect().top,
      };
    })
    .filter((item): item is { index: number; top: number } => Boolean(item));

  const passed = candidates.filter((item) => item.top <= anchorOffset);

  if (passed.length > 0) {
    return passed[passed.length - 1].index;
  }

  return candidates[0]?.index ?? 0;
};

export const UseCaseTableOfContents = ({
  items,
  className,
}: UseCaseTableOfContentsProps) => {
  const t = useTranslations("navigation");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateActiveIndex = () => {
      setActiveIndex(getActiveIndex(items));
    };

    updateActiveIndex();
    window.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      window.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <aside
      className={clsx(
        "use-case-toc-rail sticky top-28 z-30 mt-[max(7rem,calc(50svh-190px))] w-[60px] self-start min-[2000px]:w-[200px]",
        className,
      )}
      data-toc-rail
      aria-label={t("useCaseNav")}
    >
      <nav className="w-[60px] min-[2000px]:w-[200px]">
        <div className="mb-8 flex justify-center min-[2000px]:justify-end min-[2000px]:pr-6">
          <Link
            href="/"
            className="type-nav-chip inline-flex size-8 items-center justify-center gap-2 text-right text-smooth/70 transition-colors hover:text-ink min-[2000px]:h-auto min-[2000px]:w-auto"
            aria-label={t("backHome")}
          >
            <ArrowLeftIcon size={18} weight="regular" aria-hidden="true" />
            <span className="sr-only min-[2000px]:not-sr-only">
              {t("backHome")}
            </span>
          </Link>
        </div>
        <ol className="relative flex flex-col items-center gap-4 min-[2000px]:items-end min-[2000px]:gap-3 min-[2000px]:pr-6">
          <span
            className="absolute bottom-2 left-1/2 top-2 w-px -translate-x-1/2 bg-dark-smooth min-[2000px]:left-auto min-[2000px]:right-[4px] min-[2000px]:translate-x-0"
            aria-hidden="true"
          />
          {items.map((item, index) => {
            const isPast = index < activeIndex;
            const isActive = index === activeIndex;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  aria-label={item.label}
                  className={clsx(
                    "type-nav-item group relative flex h-7 w-[60px] items-center justify-center transition-colors duration-200 min-[2000px]:block min-[2000px]:h-auto min-[2000px]:w-auto min-[2000px]:py-1",
                    isActive && "text-primary",
                    isPast && !isActive && "text-ink",
                    !isPast && !isActive && "text-smooth",
                  )}
                >
                  <span
                    className={clsx(
                      "absolute left-1/2 top-1/2 z-10 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border transition-colors duration-200 min-[2000px]:-right-[24px] min-[2000px]:left-auto min-[2000px]:translate-x-0",
                      isActive && "border-primary bg-primary",
                      isPast && !isActive && "border-ink bg-ink",
                      !isPast && !isActive && "border-smooth bg-dark",
                    )}
                    aria-hidden="true"
                  />
                  <span className="sr-only max-w-[170px] text-right min-[2000px]:not-sr-only min-[2000px]:block">
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
        <div className="mt-8 flex justify-center min-[2000px]:justify-end min-[2000px]:pr-6">
          <LocaleSwitcher variant="inline" />
        </div>
      </nav>
    </aside>
  );
};
