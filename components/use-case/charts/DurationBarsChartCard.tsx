import { ChartCardShell } from "@/components/use-case/ChartCardShell";
import type { ChartLabels } from "@/components/use-case/charts/BeforeAfterBarCard";
import { ChartCardContent } from "@/components/use-case/charts/ChartPrimitives";
import { BeforeAfterBarsPlot } from "@/components/use-case/charts/BeforeAfterBarsPlot";
import type { DurationBarsChartData } from "@/content/use-cases/types";

const secondary = "var(--color-secondary)";

type DurationBarsChartCardProps = { chart: DurationBarsChartData } & ChartLabels;

export const DurationBarsChartCard = ({ chart, beforeLabel, afterLabel }: DurationBarsChartCardProps) => {
  const maxValue = Math.max(
    0,
    ...chart.items.map((item) => Math.max(item.before.value, item.after.value)),
  );

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <ChartCardContent variant="default" className="justify-end gap-14 p-5 lg:p-8">
        <div className="flex flex-col gap-1">
          <p className="type-data-title w-full text-muted">{chart.title}</p>
          <p className="type-body-lg w-full">
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
              labelClassName="min-h-[42px] w-full text-muted"
            />
          ))}
        </div>
      </ChartCardContent>
    </ChartCardShell>
  );
};
