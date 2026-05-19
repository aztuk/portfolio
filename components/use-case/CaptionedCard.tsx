import type { ReactNode } from "react";

type CaptionedCardProps = {
  children: ReactNode;
};

export const CaptionedCard = ({ children }: CaptionedCardProps) => (
  <div className="flex w-full flex-col items-stretch justify-start">
    {children}
  </div>
);
