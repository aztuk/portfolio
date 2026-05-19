import type { CSSProperties, ReactNode } from "react";

import type { InsightMethodologyIconName } from "@/content/use-cases/types";

export type MethodologyProps = {
  methodology?: string;
  methodologyIcon?: InsightMethodologyIconName;
};

type ChartCardShellProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export const ChartCardShell = ({ children, className = "", style }: ChartCardShellProps) => (
  <div
    className={`w-full overflow-hidden rounded-[24px] border border-dark-smooth bg-canvas lg:rounded-[30px] ${className}`}
    style={style}
  >
    {children}
  </div>
);
