import { DiamondBadge } from "@/components/use-case/DiamondBadge";
import {
  AxisLabel,
  ChartAxisLine,
  VerticalBar,
} from "@/components/use-case/charts/ChartPrimitives";

const DEFAULT_MAX_BAR_HEIGHT = 176;
const DEFAULT_MIN_BAR_HEIGHT = 18;
const DEFAULT_PLOT_HEIGHT = 218;
const primary = "var(--color-primary)";
const secondary = "var(--color-secondary)";

export type BeforeAfterBarValues = {
  before: { display: string; value: number };
  after: { display: string; value: number };
};

type BeforeAfterBarsPlotProps = BeforeAfterBarValues & {
  label?: string;
  maxValue?: number;
  maxBarHeight?: number;
  minBarHeight?: number;
  plotHeight?: number;
  labelClassName?: string;
};

const getBarHeight = (
  value: number,
  maxValue: number,
  maxBarHeight: number,
  minBarHeight: number,
) => {
  if (value <= 0 || maxValue <= 0) return 0;
  return Math.max(minBarHeight, (value / maxValue) * maxBarHeight);
};

export const BeforeAfterBarsPlot = ({
  before,
  after,
  label,
  maxValue,
  maxBarHeight = DEFAULT_MAX_BAR_HEIGHT,
  minBarHeight = DEFAULT_MIN_BAR_HEIGHT,
  plotHeight = DEFAULT_PLOT_HEIGHT,
  labelClassName = "min-h-[42px] w-full text-muted",
}: BeforeAfterBarsPlotProps) => {
  const scaleMax = maxValue ?? Math.max(before.value, after.value);
  const beforeHeight = getBarHeight(before.value, scaleMax, maxBarHeight, minBarHeight);
  const afterHeight = getBarHeight(after.value, scaleMax, maxBarHeight, minBarHeight);

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-3">
      <div
        className="relative flex w-full items-end justify-center px-2 pb-2"
        style={{ height: `${plotHeight}px` }}
      >
        <ChartAxisLine className="absolute inset-x-0 bottom-0" />
        <div className="relative z-10 flex items-end justify-center gap-2">
          <div
            className="relative flex w-[54px] flex-col items-start"
            style={{ height: `${beforeHeight}px` }}
          >
            <VerticalBar color={primary} radiusClassName="rounded-tl-2xl rounded-tr-2xl" />
            <div className="absolute -left-[27px] -top-[27px] z-10">
              <DiamondBadge value={before.display} color={primary} />
            </div>
          </div>
          <div
            className="relative flex w-[54px] flex-col items-start"
            style={{ height: `${afterHeight}px` }}
          >
            <VerticalBar color={secondary} radiusClassName="rounded-tl-2xl rounded-tr-2xl" />
            <div className="absolute -top-[27px] left-[27px] z-10">
              <DiamondBadge value={after.display} color={secondary} />
            </div>
          </div>
        </div>
      </div>
      {label ? (
        <AxisLabel className={labelClassName}>
          {label.split("\n").map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </AxisLabel>
      ) : null}
    </div>
  );
};
