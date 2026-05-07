"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import clsx from "clsx";

type GalleryPaginationControlsProps = {
  count: number;
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  previousLabel: string;
  nextLabel: string;
  className?: string;
};

export const GalleryPaginationControls = ({
  count,
  activeIndex,
  onPrevious,
  onNext,
  onSelect,
  previousLabel,
  nextLabel,
  className,
}: GalleryPaginationControlsProps) => {
  if (count <= 1) return null;

  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < count - 1;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={clsx(
          "absolute left-3 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-dark/70 text-white shadow-elevation-2 backdrop-blur-md transition",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          "sm:left-5 sm:size-12",
          hasPrevious ? "hover:bg-dark/90" : "cursor-default opacity-35",
        )}
        aria-label={previousLabel}
      >
        <CaretLeftIcon size={28} weight="bold" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        className={clsx(
          "absolute right-3 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-dark/70 text-white shadow-elevation-2 backdrop-blur-md transition",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          "sm:right-5 sm:size-12",
          hasNext ? "hover:bg-dark/90" : "cursor-default opacity-35",
        )}
        aria-label={nextLabel}
      >
        <CaretRightIcon size={28} weight="bold" aria-hidden="true" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-30 flex max-w-[calc(100%-7rem)] -translate-x-1/2 flex-wrap justify-center gap-1.5 rounded-full bg-dark/65 px-2.5 py-2 shadow-elevation-2 backdrop-blur-md">
        {Array.from({ length: count }).map((_, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Page ${index + 1}`}
              aria-current={isActive}
              className={clsx(
                "size-2.5 rounded-full transition",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                isActive ? "bg-white" : "bg-white/35 hover:bg-white/65",
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
