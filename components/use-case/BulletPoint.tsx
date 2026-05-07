import type { ReactNode } from "react";
import clsx from "clsx";

import { DiamondBadge } from "@/components/use-case/DiamondBadge";

type BulletPointProps = {
  children: ReactNode;
  className?: string;
};

export const BulletPoint = ({ children, className }: BulletPointProps) => {
  return (
    <div className={clsx("relative flex w-full items-center gap-[10px] pl-9", className)}>
      <DiamondBadge
        variant="outline"
        size="xs"
        className="absolute left-0 top-[8px]"
        aria-hidden={true}
      />
      <p className="type-body-lg flex-1 text-muted">
        {children}
      </p>
    </div>
  );
};
