import { ChartCardShell, type MethodologyProps } from "@/components/use-case/ChartCardShell";
import {
  ChartCardContent,
  ChartDivider,
  ChartMethodologyNote,
  ProgressBar,
} from "@/components/use-case/charts/ChartPrimitives";
import type { CombinedKpiChartData, CombinedKpiRow } from "@/content/use-cases/types";

type CombinedKpiCardProps = { chart: CombinedKpiChartData; caption?: string } & MethodologyProps;

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
        <p className="type-body-lg-bold min-w-0 flex-1">{row.title}</p>
        <span className="type-body-lg-bold shrink-0 whitespace-nowrap">{row.display}</span>
      </div>

      <ProgressBar percent={row.percent} color={color} />

      <p className="type-body-sm w-full text-smooth">{row.description}</p>
    </div>
  );
};

export const CombinedKpiCard = ({ chart, caption, methodology, methodologyIcon }: CombinedKpiCardProps) => {
  const [top, bottom] = chart.rows;

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <ChartCardContent variant="default" className="items-center justify-end">
        {caption && <p className="type-body-lg w-full leading-[1.7] text-smooth">{caption}</p>}
        <div className="flex w-full flex-col items-center gap-8">
          <KpiRow row={top} />
          <ChartDivider />
          <KpiRow row={bottom} />
        </div>
        {methodology && methodologyIcon && (
          <ChartMethodologyNote methodology={methodology} methodologyIcon={methodologyIcon} />
        )}
      </ChartCardContent>
    </ChartCardShell>
  );
};
