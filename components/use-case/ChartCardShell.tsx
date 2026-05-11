import type { CSSProperties, ReactNode } from "react";

type ChartCardShellProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export const ChartCardShell = ({
  children,
  className = "",
  style,
}: ChartCardShellProps) => (
  <div
    className={`w-full overflow-hidden rounded-[24px] border border-dark-smooth bg-dark-smooth/20 backdrop-blur-[2px] lg:rounded-[30px] ${className}`}
    style={style}
  >
    {children}
  </div>
);
