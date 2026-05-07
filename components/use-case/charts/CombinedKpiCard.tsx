import { ChartCardShell } from "@/components/use-case/ChartCardShell";
import {
  ChartBodyText,
  ChartCardContent,
  ChartDivider,
  ChartTitle,
  ChartValue,
  ProgressBar,
} from "@/components/use-case/charts/ChartPrimitives";
import type { CombinedKpiChartData, CombinedKpiRow } from "@/content/use-cases/types";

type CombinedKpiCardProps = { chart: CombinedKpiChartData };

const colorForVariant = (variant: CombinedKpiRow["variant"]) =>
  variant === "primary" ? "var(--color-primary)" : "var(--color-secondary)";

type KpiRowProps = {
  row: CombinedKpiRow;
};

const KpiRow = ({ row }: KpiRowProps) => {
  const color = colorForVariant(row.variant);

  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="flex w-full items-baseline gap-3" style={{ color }}>
        <ChartTitle tone="inherit" className="min-w-0 flex-1 sm:leading-[1.7] sm:tracking-[-0.04em]">
          {row.title}
        </ChartTitle>
        <ChartValue className="type-chart-value-mobile sm:leading-[0.7]">
          {row.display}
        </ChartValue>
      </div>

      <ProgressBar percent={row.percent} color={color} />

      <ChartBodyText className="type-chart-body-mobile w-full sm:text-[15px] sm:leading-[1.7] sm:tracking-[-0.04em]">
        {row.description}
      </ChartBodyText>
    </div>
  );
};

export const CombinedKpiCard = ({ chart }: CombinedKpiCardProps) => {
  const [top, bottom] = chart.rows;

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <ChartCardContent variant="default" className="items-center justify-end p-6 sm:p-8 lg:p-8">
        <div className="flex w-full flex-col items-center gap-8">
          <KpiRow row={top} />
          <ChartDivider />
          <KpiRow row={bottom} />
        </div>
      </ChartCardContent>
    </ChartCardShell>
  );
};
