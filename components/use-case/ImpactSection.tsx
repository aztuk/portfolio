import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type {
  BarChartData,
  DurationBarsChartData,
  ImpactChart,
  ImpactSectionData,
  KpiProgressChartData,
  ProgressChartData,
} from "@/content/use-cases/types";

type ImpactSectionProps = {
  impactSection: ImpactSectionData;
};

const MAX_BAR_HEIGHT = 160;
const MAX_GROUP_BAR_HEIGHT = 132;
const secondary = "var(--color-secondary)";
const starClipPath =
  "polygon(50% 0%, 61% 34%, 98% 35%, 68% 56%, 79% 91%, 50% 70%, 21% 91%, 32% 56%, 2% 35%, 39% 34%)";

const DiamondBullet = () => (
  <div className="absolute left-0 top-[8px] flex size-4 items-center justify-center">
    <div className="size-[11px] rotate-45 border border-smooth" />
  </div>
);

type ChartCardProps = {
  children: ReactNode;
  caption?: string;
};

const ChartCard = ({ children, caption }: ChartCardProps) => (
  <div className="flex flex-col items-center justify-center gap-6">
    {children}
    {caption ? (
      <p className="w-full text-center font-sans text-lg font-normal leading-[1.7] text-muted">
        {caption}
      </p>
    ) : null}
  </div>
);

type MetricBadgeProps = {
  children: ReactNode;
  tone: "before" | "after";
  className?: string;
};

const MetricBadge = ({ children, tone, className = "" }: MetricBadgeProps) => (
  <div
    className={`absolute z-10 flex size-[54px] items-center justify-center ${className}`}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="size-[38px] -rotate-45 border-2 border-[#364781] bg-dark-smooth/50 backdrop-blur-[4px]" />
    </div>
    <span
      className="relative whitespace-nowrap font-tektur text-[15px] font-semibold leading-[0.7]"
      style={{ color: tone === "before" ? "var(--color-primary)" : secondary }}
    >
      {children}
    </span>
  </div>
);

type BarChartCardProps = {
  chart: BarChartData;
};

const BarChartCard = ({ chart }: BarChartCardProps) => {
  const max = Math.max(chart.before.value, chart.after.value);
  const beforeHeight = max > 0 ? (chart.before.value / max) * MAX_BAR_HEIGHT : 0;
  const afterHeight = max > 0 ? (chart.after.value / max) * MAX_BAR_HEIGHT : 0;

  return (
    <ChartCard caption={chart.caption}>
      <div className="flex h-[400px] w-full flex-col items-center justify-end gap-6 rounded-[30px] border border-dark-smooth bg-dark-smooth/20 px-8 pb-8 pt-12 shadow-elevation-2 backdrop-blur-[2px] sm:px-12">
        <div className="relative flex w-full items-end justify-center gap-2 border-b-2 border-dark-smooth px-12 pb-2">
          <div
            className="relative flex w-[54px] flex-col items-start"
            style={{ height: `${beforeHeight}px` }}
          >
            <div className="w-full flex-1 rounded-tl-2xl rounded-tr-2xl bg-primary" />
            <MetricBadge tone="before" className="-left-[27px] -top-[27px]">
              {chart.before.display}
            </MetricBadge>
          </div>
          <div
            className="relative flex w-[54px] flex-col items-start"
            style={{ height: `${afterHeight}px` }}
          >
            <div
              className="w-full flex-1 rounded-tl-2xl rounded-tr-2xl"
              style={{ backgroundColor: secondary }}
            />
            <MetricBadge tone="after" className="left-[27px] -top-[27px]">
              {chart.after.display}
            </MetricBadge>
          </div>
          <span className="absolute bottom-[-36px] left-12 font-tektur text-[15px] font-semibold leading-[0.7] text-primary">
            Avant
          </span>
          <span
            className="absolute bottom-[-36px] right-12 font-tektur text-[15px] font-semibold leading-[0.7]"
            style={{ color: secondary }}
          >
            Après
          </span>
        </div>
        <p className="w-full text-center font-sans text-lg font-normal leading-[1.7] text-muted">
          {chart.title}
        </p>
      </div>
    </ChartCard>
  );
};

type DurationBarsChartCardProps = {
  chart: DurationBarsChartData;
};

const DurationBarsChartCard = ({ chart }: DurationBarsChartCardProps) => (
  <ChartCard caption={chart.caption}>
    <div className="flex h-[400px] w-full flex-col items-center justify-end gap-6 rounded-[30px] border border-dark-smooth bg-dark-smooth/20 px-6 pb-8 pt-12 shadow-elevation-2 backdrop-blur-[2px] sm:px-12">
      <p className="font-tektur text-2xl font-semibold leading-[0.7] text-primary">
        Avant <span className="text-smooth">/</span>{" "}
        <span style={{ color: secondary }}>Après</span>
      </p>
      <div className="flex min-h-0 w-full flex-1 items-end justify-center gap-3 rounded-[30px] sm:gap-4">
        {chart.items.map((item) => {
          const max = Math.max(item.before.value, item.after.value);
          const beforeHeight =
            max > 0 ? (item.before.value / max) * MAX_GROUP_BAR_HEIGHT : 0;
          const afterHeight =
            max > 0 ? (item.after.value / max) * MAX_GROUP_BAR_HEIGHT : 0;

          return (
            <div
              key={item.label}
              className="relative flex min-w-0 flex-1 flex-col items-center gap-5"
            >
              <div className="relative z-10 flex items-end justify-center gap-1">
                <div
                  className="relative flex w-10 flex-col items-start sm:w-[50px]"
                  style={{ height: `${beforeHeight}px` }}
                >
                  <div className="w-full flex-1 rounded-tl-[11px] rounded-tr-[11px] bg-primary" />
                  <MetricBadge tone="before" className="-left-[29px] -top-[27px]">
                    {item.before.display}
                  </MetricBadge>
                </div>
                <div
                  className="relative flex w-10 flex-col items-start sm:w-[50px]"
                  style={{ height: `${afterHeight}px` }}
                >
                  <div
                    className="w-full flex-1 rounded-tl-[11px] rounded-tr-[11px]"
                    style={{ backgroundColor: secondary }}
                  />
                  <MetricBadge tone="after" className="left-[18px] -top-[27px] sm:left-[23px]">
                    {item.after.display}
                  </MetricBadge>
                </div>
              </div>
              <div className="absolute bottom-[38px] left-0 right-0 h-0.5 bg-dark-smooth" />
              <p className="min-h-[36px] w-full text-center font-tektur text-[12px] font-semibold leading-[1.2] text-muted sm:text-[15px]">
                {item.label.split("\n").map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </ChartCard>
);

type ProgressChartCardProps = {
  chart: ProgressChartData;
};

const ProgressChartCard = ({ chart }: ProgressChartCardProps) => (
  <ChartCard caption={chart.caption}>
    <div className="flex h-[400px] w-full flex-col items-center justify-center gap-6 rounded-[30px] border border-dark-smooth bg-dark-smooth/20 px-8 pb-8 pt-12 shadow-elevation-2 backdrop-blur-[2px] sm:px-12">
      <div className="flex w-full flex-col gap-3 border-b border-dark-smooth pb-6">
        <p className="w-full text-center font-tektur text-[15px] font-semibold leading-[0.7] text-primary">
          Avant
        </p>
        <div className="flex flex-col gap-1">
          {chart.rows.map((row) => (
            <div key={row.label} className="flex flex-col gap-[2px]">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-sans text-lg font-normal leading-[1.7] text-smooth">
                  {row.label}
                </span>
                <span className="font-tektur text-[15px] font-semibold leading-[0.7] text-primary">
                  {row.before.display}
                </span>
              </div>
              <div className="h-[10px] w-full rounded-[20px] border border-dark bg-dark p-px">
                <div
                  className="h-full rounded-[20px] bg-primary"
                  style={{ width: `${row.before.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-1">
          {chart.rows.map((row) => (
            <div key={row.label} className="flex flex-col gap-[2px]">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-sans text-lg font-normal leading-[1.7] text-smooth">
                  {row.label}
                </span>
                <span
                  className="font-tektur text-[15px] font-semibold leading-[0.7]"
                  style={{ color: secondary }}
                >
                  {row.after.display}
                </span>
              </div>
              <div className="h-[10px] w-full rounded-[20px] border border-dark bg-dark p-px">
                <div
                  className="h-full rounded-[20px]"
                  style={{
                    width: `${row.after.percent}%`,
                    backgroundColor: secondary,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p
          className="w-full text-center font-tektur text-[15px] font-semibold leading-[0.7]"
          style={{ color: secondary }}
        >
          Après
        </p>
      </div>
    </div>
  </ChartCard>
);

type StarRatingProps = {
  value: number;
  max: number;
};

const StarRating = ({ value, max }: StarRatingProps) => (
  <div className="flex gap-2">
    {Array.from({ length: max }, (_, index) => {
      const fill = Math.max(0, Math.min(1, value - index));

      return (
        <span
          key={index}
          className="relative block size-8 overflow-hidden sm:size-10"
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

type KpiProgressChartCardProps = {
  chart: KpiProgressChartData;
};

const KpiProgressChartCard = ({ chart }: KpiProgressChartCardProps) => (
  <ChartCard caption={chart.caption}>
    <div className="flex h-[400px] w-full flex-col items-center gap-8 rounded-[30px] border border-dark-smooth bg-dark-smooth/20 px-8 pb-8 pt-12 shadow-elevation-2 backdrop-blur-[2px] sm:px-12">
      <p className="w-full font-sans text-2xl font-medium leading-[1.7] text-muted">
        {chart.title}
      </p>
      <div className="flex w-full flex-col gap-4">
        {chart.rows.map((row, index) => (
          <div
            key={row.label}
            className={index < chart.rows.length - 1 ? "border-b border-dark-smooth pb-4" : "pb-4"}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-sans text-lg font-normal leading-[1.7] text-muted">
                {row.label}
              </span>
              <span className="whitespace-nowrap font-tektur text-[15px] font-semibold leading-[0.7] text-primary">
                {row.display}
              </span>
            </div>
            {typeof row.percent === "number" ? (
              <div className="mt-1 h-[10px] w-full rounded-[20px] border border-dark bg-dark p-px">
                <div
                  className="h-full rounded-[20px] bg-primary"
                  style={{ width: `${row.percent}%` }}
                />
              </div>
            ) : null}
            {row.rating ? (
              <div className="mt-2">
                <StarRating value={row.rating.value} max={row.rating.max} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  </ChartCard>
);

const renderChart = (chart: ImpactChart, index: number) => {
  switch (chart.type) {
    case "bar":
      return <BarChartCard key={`${chart.title}-${index}`} chart={chart} />;
    case "progress":
      return <ProgressChartCard key={`progress-${index}`} chart={chart} />;
    case "duration-bars":
      return <DurationBarsChartCard key={`duration-bars-${index}`} chart={chart} />;
    case "kpi-progress":
      return <KpiProgressChartCard key={`${chart.title}-${index}`} chart={chart} />;
  }
};

export const ImpactSection = ({ impactSection }: ImpactSectionProps) => {
  return (
    <Section>
      <Container>
        <h2 className="font-display text-[40px] font-light leading-[1.2] text-muted">
          {impactSection.title}
        </h2>

        <div className="mt-12 flex flex-col gap-6">
          <p className="font-sans text-lg font-normal leading-[1.7] text-ink">
            {impactSection.summary}
          </p>
          <ul className="flex flex-col gap-3 py-6">
            {impactSection.bullets.map((bullet) => (
              <li key={bullet.bold} className="relative pl-9">
                <DiamondBullet />
                <span className="font-sans text-lg font-bold leading-[1.7] text-muted">
                  {bullet.bold}{" "}
                </span>
                <span className="font-sans text-lg font-normal leading-[1.7] text-muted">
                  {bullet.regular}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {impactSection.charts.map(renderChart)}
        </div>
      </Container>
    </Section>
  );
};
