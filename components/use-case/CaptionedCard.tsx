import type { ReactNode } from "react";

import { ChartCaption } from "@/components/use-case/charts/ChartPrimitives";

type CaptionedCardProps = {
  children: ReactNode;
  caption?: string;
};

export const CaptionedCard = ({ children, caption }: CaptionedCardProps) => (
  <div className="flex w-full flex-col items-stretch justify-start gap-4">
    {children}
    {caption ? <ChartCaption>{caption}</ChartCaption> : null}
  </div>
);
