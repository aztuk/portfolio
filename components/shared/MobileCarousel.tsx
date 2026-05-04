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
        "-mx-6 snap-x snap-mandatory overflow-x-auto scroll-smooth overscroll-x-contain px-6 pb-1 [-webkit-overflow-scrolling:touch] [scroll-padding-inline:24px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div className="flex gap-4 pr-[18vw]">
        {items.map((child, index) => (
          <div
            key={index}
            className={clsx("min-w-[78vw] snap-start snap-always", itemClassName)}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
