import { ChartCardShell, type MethodologyProps } from "@/components/use-case/ChartCardShell";
import type { ChartLabels } from "@/components/use-case/charts/BeforeAfterBarCard";
import {
  ChartCardContent,
  ChartMethodologyNote,
  MetricProgressRow,
} from "@/components/use-case/charts/ChartPrimitives";
import type { BeforeAfterCombinedKpiChartData } from "@/content/use-cases/types";

const secondary = "var(--color-secondary)";
const primary = "var(--color-primary)";

type BeforeAfterCombinedKpiCardProps = { chart: BeforeAfterCombinedKpiChartData; caption?: string } & ChartLabels & MethodologyProps;

export const BeforeAfterCombinedKpiCard = ({ chart, caption, beforeLabel, afterLabel, methodology, methodologyIcon }: BeforeAfterCombinedKpiCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <ChartCardContent variant="default" className="justify-end">
      {caption && <p className="type-body-lg w-full leading-[1.7] text-smooth">{caption}</p>}
      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full flex-col gap-1">
          <p className="type-body-lg-bold text-primary">{beforeLabel}</p>
          <div className="flex flex-col gap-1">
            {chart.rows.map((row, index) => (
              <MetricProgressRow
                key={row.label}
                label={row.label}
                value={row.before.display}
                percent={row.before.percent}
                color={primary}
                labelPosition={index === 0 ? "top" : "bottom"}
                labelClassName="type-body-sm text-muted"
                valueClassName="type-body-lg-bold"
              />
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-1">
          <p className="type-body-lg-bold text-secondary">{afterLabel}</p>
          <div className="flex flex-col gap-1">
            {chart.rows.map((row, index) => (
              <MetricProgressRow
                key={row.label}
                label={row.label}
                value={row.after.display}
                percent={row.after.percent}
                color={secondary}
                labelPosition={index === 0 ? "top" : "bottom"}
                labelClassName="type-body-sm text-muted"
                valueClassName="type-body-lg-bold"
              />
            ))}
          </div>
        </div>
      </div>
      {methodology && methodologyIcon && (
        <ChartMethodologyNote methodology={methodology} methodologyIcon={methodologyIcon} />
      )}
    </ChartCardContent>
  </ChartCardShell>
);
