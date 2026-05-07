import { ChartCardShell } from "@/components/use-case/ChartCardShell";
import {
  ChartCardContent,
  ChartTitle,
  ChartValue,
} from "@/components/use-case/charts/ChartPrimitives";
import { BeforeAfterBarsPlot } from "@/components/use-case/charts/BeforeAfterBarsPlot";
import type { BeforeAfterBarChartData } from "@/content/use-cases/types";

const secondary = "var(--color-secondary)";

export type ChartLabels = { beforeLabel: string; afterLabel: string };

type BeforeAfterBarCardProps = { chart: BeforeAfterBarChartData } & ChartLabels;

export const BeforeAfterBarCard = ({ chart, beforeLabel, afterLabel }: BeforeAfterBarCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <ChartCardContent variant="default" className="justify-end gap-8 p-5 lg:p-8">
      <ChartTitle>{chart.title}</ChartTitle>
      <div className="flex w-full flex-col gap-3">
        <BeforeAfterBarsPlot before={chart.before} after={chart.after} />
        <p className="w-full text-center">
          <ChartValue className="text-primary">{beforeLabel} / </ChartValue>
          <ChartValue color={secondary}>{afterLabel}</ChartValue>
        </p>
      </div>
    </ChartCardContent>
  </ChartCardShell>
);
