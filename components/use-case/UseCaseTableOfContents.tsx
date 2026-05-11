"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

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
        "use-case-toc-rail sticky top-28 z-30 mt-[max(7rem,calc(50svh-190px))] w-[200px] self-start",
        className,
      )}
      data-toc-rail
    >
      <nav className="w-[200px]">
        <ol className="relative flex flex-col items-end gap-3 pr-6">
          <span
            className="absolute bottom-2 right-[4px] top-2 w-px bg-dark-smooth"
            aria-hidden="true"
          />
          {items.map((item, index) => {
            const isPast = index < activeIndex;
            const isActive = index === activeIndex;

            return (
              <li key={item.id} className="w-full">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  aria-label={item.label}
                  className={clsx(
                    "type-nav-item group relative block h-auto w-full py-1 text-right transition-colors duration-200",
                    isActive && "text-primary",
                    isPast && !isActive && "text-ink",
                    !isPast && !isActive && "text-smooth",
                  )}
                >
                  <span
                    className={clsx(
                      "absolute -right-[24px] top-1/2 z-10 size-2 -translate-y-1/2 rotate-45 border transition-colors duration-200",
                      isActive && "border-primary bg-primary",
                      isPast && !isActive && "border-ink bg-ink",
                      !isPast && !isActive && "border-smooth bg-dark",
                    )}
                    aria-hidden="true"
                  />
                  <span className="block max-w-[170px] text-right">
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
};
