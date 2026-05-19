import { ChartCardShell, type MethodologyProps } from "@/components/use-case/ChartCardShell";
import {
  ChartCardContent,
  ChartDivider,
  ChartMethodologyNote,
  ChartTitle,
  ChartValue,
  ProgressBar,
} from "@/components/use-case/charts/ChartPrimitives";
import type { KpiProgressChartData } from "@/content/use-cases/types";

const starClipPath =
  "polygon(50% 0%, 61% 34%, 98% 35%, 68% 56%, 79% 91%, 50% 70%, 21% 91%, 32% 56%, 2% 35%, 39% 34%)";

type StarRatingProps = { value: number; max: number };

const StarRating = ({ value, max }: StarRatingProps) => (
  <div className="flex gap-2">
    {Array.from({ length: max }, (_, index) => {
      const fill = Math.max(0, Math.min(1, value - index));
      return (
        <span
          key={index}
          className="relative block size-6 overflow-hidden sm:size-7"
          style={{ clipPath: starClipPath }}
          aria-hidden="true"
        >
          <span className="absolute inset-0 bg-smooth/70" />
          <span
            className="absolute inset-y-0 left-0 bg-primary"
            style={{ width: `${fill * 100}%` }}
          />
        </span>
      );
    })}
  </div>
);

type KpiProgressChartCardProps = { chart: KpiProgressChartData; caption?: string } & MethodologyProps;

export const KpiProgressChartCard = ({ chart, caption, methodology, methodologyIcon }: KpiProgressChartCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <ChartCardContent variant="default" className="justify-end">
      <div className="flex flex-col">
        <ChartTitle>{chart.title}</ChartTitle>
        {caption && <p className="type-body-lg mt-1 leading-[1.7] text-smooth">{caption}</p>}
      </div>
      <div className="flex w-full flex-col gap-4">
        {chart.rows.map((row, index) => (
          <div key={row.label} className="pb-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="type-body-lg text-muted">{row.label}</span>
              <ChartValue className="text-primary">{row.display}</ChartValue>
            </div>
            {typeof row.percent === "number" ? (
              <ProgressBar className="mt-1" percent={row.percent} color="var(--color-primary)" size="sm" />
            ) : null}
            {row.rating ? (
              <div className="mt-2">
                <StarRating value={row.rating.value} max={row.rating.max} />
              </div>
            ) : null}
            {index < chart.rows.length - 1 ? <ChartDivider className="mt-4" /> : null}
          </div>
        ))}
      </div>
      {methodology && methodologyIcon && (
        <ChartMethodologyNote methodology={methodology} methodologyIcon={methodologyIcon} />
      )}
    </ChartCardContent>
  </ChartCardShell>
);
