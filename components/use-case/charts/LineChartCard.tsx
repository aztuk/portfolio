import { DiamondBadge } from "@/components/use-case/DiamondBadge";
import { ChartCardShell, type MethodologyProps } from "@/components/use-case/ChartCardShell";
import {
  AxisLabel,
  ChartCardContent,
  ChartMethodologyNote,
  ChartTitle,
} from "@/components/use-case/charts/ChartPrimitives";
import type { LineChartData } from "@/content/use-cases/types";

type LineChartCardProps = { chart: LineChartData; caption?: string } & MethodologyProps;

type LinePoint = {
  x: number;
  y: number;
};

const getIndexedXRatio = (index: number, total: number) => {
  if (total < 2) return 0.5;
  return index / (total - 1);
};

const parseDayLabel = (label: string) => {
  const match = label.trim().match(/^[DJ](\d+)$/i);
  return match ? Number(match[1]) : null;
};

const getLinePointXRatios = (points: LineChartData["points"]) => {
  const temporalValues = points.map((point) => parseDayLabel(point.label));
  const numericValues = temporalValues.filter((value): value is number => value !== null);

  if (numericValues.length === points.length) {
    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);
    if (max > min) {
      return numericValues.map((value) => (value - min) / (max - min));
    }
  }

  return points.map((_, index) => getIndexedXRatio(index, points.length));
};

const getSegmentPath = (points: LinePoint[], index: number) => {
  const p0 = points[Math.max(0, index - 1)];
  const p1 = points[index];
  const p2 = points[index + 1];
  const p3 = points[Math.min(points.length - 1, index + 2)];
  const c1x = p1.x + (p2.x - p0.x) / 6;
  const c1y = p1.y + (p2.y - p0.y) / 6;
  const c2x = p2.x - (p3.x - p1.x) / 6;
  const c2y = p2.y - (p3.y - p1.y) / 6;

  return `M ${p1.x} ${p1.y} C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x} ${p2.y}`;
};

export const LineChartCard = ({ chart, caption, methodology, methodologyIcon }: LineChartCardProps) => {
  const W = 496;
  const H = 205;
  const xRatios = getLinePointXRatios(chart.points);
  const svgPts: LinePoint[] = chart.points.map((p, i) => ({
    x: xRatios[i] * W,
    y: (1 - p.value / 100) * H,
  }));

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <ChartCardContent variant="default" className="justify-end">
        <div className="flex flex-col">
          <ChartTitle className="sm:leading-[1.7] sm:tracking-[-0.03em]">{chart.title}</ChartTitle>
          {caption && <p className="type-body-lg mt-1 leading-[1.7] text-smooth">{caption}</p>}
        </div>

        <div className="relative flex h-[220px] w-full shrink-0 flex-col justify-end gap-3 sm:h-[246px]">
          <div className="relative min-h-0 w-full flex-1">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="none"
              aria-hidden
            >
              {svgPts.slice(0, -1).map((_, i) => (
                <path
                  key={`${chart.points[i].label}-${chart.points[i + 1].label}`}
                  d={getSegmentPath(svgPts, i)}
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth="3"
                  style={{ stroke: chart.points[i + 1].color }}
                />
              ))}
            </svg>

            {svgPts.map((pt, i) => (
              <div
                key={chart.points[i].label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(pt.x / W) * 100}%`,
                  top: `${(pt.y / H) * 100}%`,
                }}
              >
                <DiamondBadge
                  value={`${chart.points[i].value}%`}
                  color={chart.points[i].color}
                />
              </div>
            ))}
          </div>

          <div className="relative h-[15px] w-full shrink-0">
            {chart.points.map((p, i) => (
              <AxisLabel
                key={p.label}
                className="absolute top-0 whitespace-nowrap"
                color={p.color}
                style={{
                  left: `${xRatios[i] * 100}%`,
                  transform: `translateX(${
                    i === 0 ? "0" : i === chart.points.length - 1 ? "-100%" : "-50%"
                  })`,
                }}
              >
                {p.label}
              </AxisLabel>
            ))}
          </div>
        </div>
        {methodology && methodologyIcon && (
          <ChartMethodologyNote methodology={methodology} methodologyIcon={methodologyIcon} />
        )}
      </ChartCardContent>
    </ChartCardShell>
  );
};
