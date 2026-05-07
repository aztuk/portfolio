import type { ReactNode } from "react";
import clsx from "clsx";

type BulletPointProps = {
  children: ReactNode;
  className?: string;
};

export const BulletPoint = ({ children, className }: BulletPointProps) => {
  return (
    <div className={clsx("relative flex w-full items-center gap-[10px] pl-9", className)}>
      <span className="absolute left-0 top-[8px] block size-[15.5px] -rotate-45 border border-smooth" />
      <p className="type-body-lg flex-1 text-muted">
        {children}
      </p>
    </div>
  );
};
