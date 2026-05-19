import { ChartCardShell, type MethodologyProps } from "@/components/use-case/ChartCardShell";
import type { ChartLabels } from "@/components/use-case/charts/BeforeAfterBarCard";
import { ChartCardContent, ChartMethodologyNote } from "@/components/use-case/charts/ChartPrimitives";
import { BeforeAfterBarsPlot } from "@/components/use-case/charts/BeforeAfterBarsPlot";
import type { DurationBarsChartData } from "@/content/use-cases/types";

const secondary = "var(--color-secondary)";

type DurationBarsChartCardProps = { chart: DurationBarsChartData; caption?: string } & ChartLabels & MethodologyProps;

export const DurationBarsChartCard = ({ chart, caption, beforeLabel, afterLabel, methodology, methodologyIcon }: DurationBarsChartCardProps) => {
  const maxValue = Math.max(
    0,
    ...chart.items.map((item) => Math.max(item.before.value, item.after.value)),
  );

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <ChartCardContent variant="default" className="justify-end">
        <div className="flex flex-col gap-1">
          <p className="type-data-title w-full text-muted">{chart.title}</p>
          {caption && <p className="type-body-lg mt-1 leading-[1.7] text-smooth">{caption}</p>}
          <p className="type-body-lg w-full text-center">
            <span className="text-primary">{beforeLabel}</span>
            <span className="text-muted"> / </span>
            <span style={{ color: secondary }}>{afterLabel}</span>
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-3">
          {chart.items.map((item) => (
            <BeforeAfterBarsPlot
              key={item.label}
              before={item.before}
              after={item.after}
              label={item.label}
              maxValue={maxValue}
              plotHeight={190}
              labelClassName="min-h-[24px] w-full text-muted"
              showAxisLine={false}
            />
          ))}
        </div>
        {methodology && methodologyIcon && (
          <ChartMethodologyNote methodology={methodology} methodologyIcon={methodologyIcon} />
        )}
      </ChartCardContent>
    </ChartCardShell>
  );
};
