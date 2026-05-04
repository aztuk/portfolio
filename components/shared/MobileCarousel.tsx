import type { ReactNode } from "react";
import { Children } from "react";
import clsx from "clsx";

type MobileCarouselProps = {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
  edgeSpacerClassName?: string;
  inset?: "padded" | "flush";
  itemClassName?: string;
  snapAlign?: "center" | "none" | "start";
  itemWidthClassName?: string;
  trackClassName?: string;
};

export const MobileCarousel = ({
  children,
  ariaLabel,
  className,
  edgeSpacerClassName = "w-[11vw]",
  inset = "flush",
  itemClassName,
  snapAlign = "center",
  itemWidthClassName = "min-w-[78vw]",
  trackClassName,
}: MobileCarouselProps) => {
  const items = Children.toArray(children);

  return (
    <div
      data-mobile-carousel
      aria-label={ariaLabel}
      role={ariaLabel ? "region" : undefined}
      className={clsx(
        "overflow-x-auto scroll-smooth overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        snapAlign !== "none" && "snap-x snap-mandatory",
        inset === "padded"
          ? "-mx-6 px-6 [scroll-padding-inline:24px]"
          : "mx-[calc(50%_-_50vw)] w-screen max-w-none [scroll-padding-inline:1.5rem] sm:[scroll-padding-inline:2rem]",
        className,
      )}
    >
      <div
        className={clsx(
          "flex gap-4",
          trackClassName,
        )}
      >
        <div className={clsx("shrink-0", edgeSpacerClassName)} aria-hidden="true" />
        {items.map((child, index) => (
          <div
            key={index}
            className={clsx(
              itemWidthClassName,
              snapAlign === "center" && "snap-center snap-always",
              snapAlign === "start" && "snap-start snap-always",
              itemClassName,
            )}
          >
            {child}
          </div>
        ))}
        <div className={clsx("shrink-0", edgeSpacerClassName)} aria-hidden="true" />
      </div>
    </div>
  );
};
