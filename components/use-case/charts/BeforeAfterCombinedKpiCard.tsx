import { ChartCardShell } from "@/components/use-case/ChartCardShell";
import type { ChartLabels } from "@/components/use-case/charts/BeforeAfterBarCard";
import {
  ChartCardContent,
  ChartDivider,
  ChartTitle,
  MetricProgressRow,
} from "@/components/use-case/charts/ChartPrimitives";
import type { BeforeAfterCombinedKpiChartData } from "@/content/use-cases/types";

const secondary = "var(--color-secondary)";
const primary = "var(--color-primary)";

type BeforeAfterCombinedKpiCardProps = { chart: BeforeAfterCombinedKpiChartData } & ChartLabels;

export const BeforeAfterCombinedKpiCard = ({ chart, beforeLabel, afterLabel }: BeforeAfterCombinedKpiCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <ChartCardContent variant="default" className="justify-end p-5 lg:p-8">
      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full flex-col gap-1">
          <ChartTitle tone="inherit" className="text-primary">{beforeLabel}</ChartTitle>
          <div className="flex flex-col gap-1">
            {chart.rows.map((row, index) => (
              <MetricProgressRow
                key={row.label}
                label={row.label}
                value={row.before.display}
                percent={row.before.percent}
                color={primary}
                labelPosition={index === 0 ? "top" : "bottom"}
              />
            ))}
          </div>
        </div>

        <ChartDivider />

        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-col gap-1">
            {chart.rows.map((row, index) => (
            <MetricProgressRow
              key={row.label}
              label={row.label}
              value={row.after.display}
              percent={row.after.percent}
              color={secondary}
              labelPosition={index === 0 ? "top" : "bottom"}
            />
          ))}
          </div>
          <ChartTitle tone="inherit" className="text-secondary">{afterLabel}</ChartTitle>
        </div>
      </div>
    </ChartCardContent>
  </ChartCardShell>
);
