import { ChartCardShell, type MethodologyProps } from "@/components/use-case/ChartCardShell";
import {
  ChartCardContent,
  ChartMethodologyNote,
  ChartTitle,
} from "@/components/use-case/charts/ChartPrimitives";
import type { SingleKpiChartData } from "@/content/use-cases/types";

type SingleKpiCardProps = { chart: SingleKpiChartData; caption?: string } & MethodologyProps;

export const SingleKpiCard = ({ chart, caption, methodology, methodologyIcon }: SingleKpiCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <ChartCardContent variant="default" className="items-center justify-center p-5 text-center lg:p-8">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <p className="type-kpi py-6 text-primary lg:py-10" style={{ fontSize: "clamp(60px, 10vw, 90px)" }}>{chart.value}</p>
        <div className="flex w-full flex-col items-center">
          <ChartTitle align="center">{chart.title}</ChartTitle>
          {caption && <p className="type-body-sm mt-1 w-full max-w-[430px] leading-[1.7] text-smooth">{caption}</p>}
        </div>
      </div>
      {methodology && methodologyIcon && (
        <ChartMethodologyNote methodology={methodology} methodologyIcon={methodologyIcon} />
      )}
    </ChartCardContent>
  </ChartCardShell>
);
