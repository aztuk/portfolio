import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
};

export const SectionTitle = ({ children }: SectionTitleProps) => (
  <div className="flex w-full items-center gap-4">
    <div className="h-px flex-1 bg-dark-smooth" aria-hidden="true" />
    <h2 className="type-section-title shrink-0 text-muted">{children}</h2>
    <div className="h-px flex-1 bg-dark-smooth" aria-hidden="true" />
  </div>
);
