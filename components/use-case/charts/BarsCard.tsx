import { DiamondBadge } from "@/components/use-case/DiamondBadge";
import { ChartCardShell, type MethodologyProps } from "@/components/use-case/ChartCardShell";
import {
  AxisLabel,
  ChartCardContent,
  ChartMethodologyNote,
  ChartTitle,
  VerticalBar,
} from "@/components/use-case/charts/ChartPrimitives";
import type { BarsChartData } from "@/content/use-cases/types";

type BarsCardProps = { chart: BarsChartData; caption?: string } & MethodologyProps;

export const BarsCard = ({ chart, caption, methodology, methodologyIcon }: BarsCardProps) => {
  const maxVal = Math.max(...chart.bars.map((b) => b.value));

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <ChartCardContent>
        {(chart.title || caption) && (
          <div className="flex flex-col">
            {chart.title && <ChartTitle>{chart.title}</ChartTitle>}
            {caption && <p className="type-body-lg mt-1 leading-[1.7] text-smooth">{caption}</p>}
          </div>
        )}

        <div className="relative flex w-full items-end gap-4 lg:gap-6 [--col-max:170px] lg:[--col-max:210px]">

          {chart.bars.map((bar) => {
            const ratio = maxVal > 0 ? bar.value / maxVal : 0;
            return (
              <div
                key={bar.label}
                className="relative flex min-h-[92px] min-w-0 flex-1 flex-col items-center gap-2"
                style={{ height: `calc(${ratio} * var(--col-max))` }}
              >
                <div className="relative w-9 flex-1 lg:w-[50px] min-h-[28px]">
                  <VerticalBar color={bar.color} className="absolute inset-0" />
                  <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-[27px]">
                    <DiamondBadge
                      value={bar.displayValue ?? `${bar.value}%`}
                      color={bar.color}
                    />
                  </div>
                </div>

                <AxisLabel className="min-h-[24px] w-full" color={bar.color}>
                  {bar.label.split("\n").map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </AxisLabel>
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
};
