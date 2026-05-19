import { ChartCardShell, type MethodologyProps } from "@/components/use-case/ChartCardShell";
import { DiamondBadge } from "@/components/use-case/DiamondBadge";
import {
  ChartCardContent,
  ChartMethodologyNote,
  ChartTitle,
  ProgressBar,
} from "@/components/use-case/charts/ChartPrimitives";
import type { RankedBarsChartData } from "@/content/use-cases/types";

type RankedBarsCardProps = { chart: RankedBarsChartData; caption?: string } & MethodologyProps;

export const RankedBarsCard = ({ chart, caption, methodology, methodologyIcon }: RankedBarsCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <ChartCardContent variant="default" className="justify-end">
      <div className="flex flex-col w-full">
        <ChartTitle>{chart.title}</ChartTitle>
        {caption && <p className="type-body-lg mt-1 leading-[1.7] text-smooth">{caption}</p>}
      </div>

      <div className="flex flex-col gap-2">
        {chart.bars.map((bar) => {
          const color = bar.isPrimary ? "var(--color-primary)" : "var(--color-smooth)";
          return (
            <div key={bar.label} className="relative flex items-center w-full">
              <div className="absolute left-0 top-[4px]">
                <DiamondBadge value={bar.display} color={color} size="md" />
              </div>
              <div className="flex flex-1 flex-col items-center pl-[39px] pt-2 pb-4">
                <div className="flex h-[30px] w-full items-start pl-5 mb-[-8px]">
                  <p className="type-body-sm flex-1 min-w-0" style={{ color }}>
                    {bar.label}
                  </p>
                </div>
                <ProgressBar percent={bar.percent} color={color} />
              </div>
            </div>
          );
        })}
      </div>
      {methodology && methodologyIcon && (
        <ChartMethodologyNote methodology={methodology} methodologyIcon={methodologyIcon} />
      )}
    </ChartCardContent>
  </ChartCardShell>
);
