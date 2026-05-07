import { Children } from "react";
import type { ReactNode } from "react";

import { MobileCarousel } from "@/components/shared/MobileCarousel";

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
}: ChartCardsLayoutProps) => (
  <>
    <MobileCarousel className={`lg:hidden ${mobileClassName}`} itemClassName={itemClassName}>
      {children}
    </MobileCarousel>
    <div className={`hidden lg:grid lg:grid-cols-2 ${gridClassName}`}>
      {Children.map(children, (child, index) => (
        <div key={index} className={itemClassName}>
          {child}
        </div>
      ))}
    </div>
  </>
);
