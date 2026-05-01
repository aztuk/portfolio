import type { ReactNode } from "react";
import clsx from "clsx";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={clsx("mx-auto w-full max-w-[1200px]", className)}>
      {children}
    </div>
  );
};
