import type { ReactNode } from "react";

type ChartCardShellProps = {
  children: ReactNode;
  className?: string;
};

export const ChartCardShell = ({ children, className = "" }: ChartCardShellProps) => (
  <div
    className={`overflow-hidden rounded-[30px] border border-dark-smooth bg-dark-smooth/20 shadow-elevation-2 backdrop-blur-[2px] ${className}`}
  >
    {children}
  </div>
);
