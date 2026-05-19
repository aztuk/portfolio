import type { ReactNode } from "react";
import { Children } from "react";
import clsx from "clsx";

type ChartCardsLayoutProps = {
  children: ReactNode;
  mobileClassName?: string;
  gridClassName?: string;
  itemClassName?: string;
};

export const ChartCardsLayout = ({
  children,
  mobileClassName = "",
  gridClassName = "",
  itemClassName = "flex flex-col",
}: ChartCardsLayoutProps) => {
  const items = Children.toArray(children);

  return (
    <div
      data-mobile-carousel
      className={clsx(
        "overflow-x-auto scroll-smooth overscroll-x-contain pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "snap-x snap-mandatory lg:snap-none",
        "mx-[calc(50%_-_50vw)] w-screen max-w-none [scroll-padding-inline:0.5rem] sm:[scroll-padding-inline:2rem]",
        "lg:mx-0 lg:w-auto lg:overflow-visible lg:pb-0",
        mobileClassName,
      )}
    >
      <div
        className={clsx(
          "flex gap-4 lg:grid lg:grid-cols-2",
          gridClassName,
        )}
      >
        <div className="w-2 shrink-0 lg:hidden" aria-hidden="true" />
        {items.map((child, index) => (
          <div
            key={index}
            className={clsx(
              "min-w-[78vw] snap-center snap-always lg:min-w-0",
              itemClassName,
            )}
          >
            {child}
          </div>
        ))}
        <div className="w-2 shrink-0 lg:hidden" aria-hidden="true" />
      </div>
    </div>
  );
};
