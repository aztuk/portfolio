import { ChartCardShell } from "@/components/use-case/ChartCardShell";
import {
  ChartBodyText,
  ChartCardContent,
  ChartTitle,
} from "@/components/use-case/charts/ChartPrimitives";
import type { SingleKpiChartData } from "@/content/use-cases/types";

type SingleKpiCardProps = { chart: SingleKpiChartData };

export const SingleKpiCard = ({ chart }: SingleKpiCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <ChartCardContent variant="centered" className="p-5 text-center lg:p-8">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <p className="type-kpi text-primary">{chart.value}</p>
        <div className="flex w-full flex-col items-center">
          <ChartTitle align="center">{chart.title}</ChartTitle>
          <ChartBodyText className="max-w-[430px]">{chart.description}</ChartBodyText>
        </div>
      </div>
    </ChartCardContent>
  </ChartCardShell>
);
