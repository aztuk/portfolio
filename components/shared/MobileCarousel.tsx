import type { ReactNode } from "react";
import { Children } from "react";
import clsx from "clsx";

type MobileCarouselProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
};

export const MobileCarousel = ({
  children,
  className,
  itemClassName,
}: MobileCarouselProps) => {
  const items = Children.toArray(children);

  return (
    <div
      data-mobile-carousel
      className={clsx(
        "-mx-3 overflow-x-auto overscroll-x-contain px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div className="flex touch-pan-x snap-x snap-mandatory gap-4 pr-[14vw]">
        {items.map((child, index) => (
          <div
            key={index}
            className={clsx("min-w-[84vw] snap-start", itemClassName)}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
