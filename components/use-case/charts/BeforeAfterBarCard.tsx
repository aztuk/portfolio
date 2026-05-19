import { ChartCardShell, type MethodologyProps } from "@/components/use-case/ChartCardShell";
import {
  ChartCardContent,
  ChartMethodologyNote,
  ChartTitle,
} from "@/components/use-case/charts/ChartPrimitives";
import { BeforeAfterBarsPlot } from "@/components/use-case/charts/BeforeAfterBarsPlot";
import type { BeforeAfterBarChartData } from "@/content/use-cases/types";

const secondary = "var(--color-secondary)";

export type ChartLabels = { beforeLabel: string; afterLabel: string };

type BeforeAfterBarCardProps = { chart: BeforeAfterBarChartData; caption?: string } & ChartLabels & MethodologyProps;

export const BeforeAfterBarCard = ({ chart, caption, beforeLabel, afterLabel, methodology, methodologyIcon }: BeforeAfterBarCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <ChartCardContent variant="default" className="justify-end">
      <div className="flex flex-col">
        <ChartTitle>{chart.title}</ChartTitle>
        {caption && <p className="type-body-lg mt-1 leading-[1.7] text-smooth">{caption}</p>}
      </div>
      <div className="flex w-full flex-col gap-1">
        <BeforeAfterBarsPlot before={chart.before} after={chart.after} showAxisLine={false} />
        <p className="type-body-sm w-full text-center">
          <span className="text-primary">{beforeLabel}</span>
          <span className="text-muted"> / </span>
          <span style={{ color: secondary }}>{afterLabel}</span>
        </p>
      </div>
      {methodology && methodologyIcon && (
        <ChartMethodologyNote methodology={methodology} methodologyIcon={methodologyIcon} />
      )}
    </ChartCardContent>
  </ChartCardShell>
);
