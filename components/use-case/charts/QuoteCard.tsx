import { UserIcon } from "@phosphor-icons/react/ssr";

import { ChartCardShell } from "@/components/use-case/ChartCardShell";
import {
  ChartBodyText,
  ChartCardContent,
  MethodologyFooter,
  TintedPill,
  getTintedSurface,
} from "@/components/use-case/charts/ChartPrimitives";
import { METHODOLOGY_ICONS } from "@/components/use-case/charts/ChartPrimitives";
import type { QuoteChartData } from "@/content/use-cases/types";

type QuoteCardProps = { chart: QuoteChartData; caption?: string };

export const QuoteCard = ({ chart }: QuoteCardProps) => {
  const MethodologyIcon = METHODOLOGY_ICONS[chart.methodologyIcon];
  const tintedSurface = getTintedSurface(chart.color);

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <ChartCardContent variant="default" className="justify-end">
        <div className="flex flex-col gap-1">
          <div className="flex w-full items-start gap-6">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: tintedSurface, color: chart.color }}
              >
                <UserIcon size={24} weight="fill" aria-hidden="true" />
              </div>
              <span className="type-data-value truncate text-ink">{chart.personaName}</span>
            </div>
            <TintedPill color={chart.color} className="ml-auto shrink-0 rounded-[18px] px-3 py-3">
              Verbatim
            </TintedPill>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center py-5">
          <div className="relative w-full border-l-[6px] border-dark-smooth py-5 pl-[30px]">
            <span
              className="type-quote-mark pointer-events-none absolute left-1 top-[-10px] z-0 select-none text-dark-smooth"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <ChartBodyText tone="ink" className="relative z-10 w-full">
              {chart.quote}
            </ChartBodyText>
          </div>
        </div>

        <MethodologyFooter
          icon={MethodologyIcon}
          color={chart.color}
          textClassName="whitespace-nowrap"
        >
          {chart.methodology}
        </MethodologyFooter>
      </ChartCardContent>
    </ChartCardShell>
  );
};
