import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import { ChartCardShell } from "@/components/use-case/ChartCardShell";
import { DiamondBadge } from "@/components/use-case/DiamondBadge";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MobileCarousel } from "@/components/shared/MobileCarousel";
import type {
  BarChartData,
  DurationBarsChartData,
  ImpactChart,
  ImpactSectionData,
  KpiProgressChartData,
  ProgressChartData,
  SingleKpiChartData,
} from "@/content/use-cases/types";

type ImpactSectionProps = {
  impactSection: ImpactSectionData;
  id?: string;
};

const MAX_BAR_HEIGHT = 160;
const MAX_GROUP_BAR_HEIGHT = 112;
const MIN_GROUP_BAR_HEIGHT = 18;
const BAR_LABEL_ROW_HEIGHT = 28;
const DURATION_PLOT_HEIGHT = 190;
const AXIS_BAR_OFFSET = "calc(4px + 0.125rem)";
const secondary = "var(--color-secondary)";
const primary = "var(--color-primary)";
const starClipPath =
  "polygon(50% 0%, 61% 34%, 98% 35%, 68% 56%, 79% 91%, 50% 70%, 21% 91%, 32% 56%, 2% 35%, 39% 34%)";

const DiamondBullet = () => (
  <div className="absolute left-0 top-[8px] flex size-[15.556px] items-center justify-center">
    <div className="size-[11px] rotate-45 border border-smooth" />
  </div>
);

type ChartCardProps = {
  children: ReactNode;
  caption?: string;
};

const ChartCard = ({ children, caption }: ChartCardProps) => (
  <div className="flex flex-col items-center justify-start gap-6">
    {children}
    {caption ? (
      <p className="type-body-lg w-full text-center text-smooth">
        {caption}
      </p>
    ) : null}
  </div>
);


type ChartLabels = { beforeLabel: string; afterLabel: string };

type BarChartCardProps = {
  chart: BarChartData;
} & ChartLabels;

const BarChartCard = ({ chart, beforeLabel, afterLabel }: BarChartCardProps) => {
  const max = Math.max(chart.before.value, chart.after.value);
  const beforeHeight = max > 0 ? (chart.before.value / max) * MAX_BAR_HEIGHT : 0;
  const afterHeight = max > 0 ? (chart.after.value / max) * MAX_BAR_HEIGHT : 0;

  return (
    <ChartCard caption={chart.caption}>
      <ChartCardShell className="flex min-h-[360px] w-full flex-col items-center justify-end gap-6 px-5 pb-6 pt-10 sm:px-8 lg:h-[400px] lg:px-12 lg:pb-8 lg:pt-12">
        <p className="type-data-title w-full text-center text-muted">
          {chart.title}
        </p>
        <div
          className="grid min-h-[220px] w-full flex-1 grid-cols-1"
          style={{ gridTemplateRows: `minmax(0, 1fr) ${BAR_LABEL_ROW_HEIGHT}px` }}
        >
          <div className="relative min-h-0">
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-dark-smooth" />
            <div
              className="absolute left-1/2 z-10 flex -translate-x-1/2 items-end justify-center gap-1"
              style={{ bottom: AXIS_BAR_OFFSET }}
            >
              <div
                className="relative flex w-[54px] flex-col items-start"
                style={{ height: `${beforeHeight}px` }}
              >
                <div className="w-full flex-1 rounded-tl-2xl rounded-tr-2xl bg-primary" />
                <div className="absolute -left-[27px] -top-[27px] z-10">
                  <DiamondBadge value={chart.before.display} color={primary} />
                </div>
              </div>
              <div
                className="relative flex w-[54px] flex-col items-start"
                style={{ height: `${afterHeight}px` }}
              >
                <div
                  className="w-full flex-1 rounded-tl-2xl rounded-tr-2xl"
                  style={{ backgroundColor: secondary }}
                />
                <div className="absolute -top-[27px] left-[27px] z-10">
                  <DiamondBadge value={chart.after.display} color={secondary} />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto grid w-[112px] grid-cols-2 items-end gap-1">
            <span className="type-data-value text-center text-primary">
              {beforeLabel}
            </span>
            <span
              className="type-data-value text-center"
              style={{ color: secondary }}
            >
              {afterLabel}
            </span>
          </div>
        </div>
      </ChartCardShell>
    </ChartCard>
  );
};

type DurationBarsChartCardProps = {
  chart: DurationBarsChartData;
} & ChartLabels;

type DurationBarProps = {
  display: string;
  value: number;
  maxValue: number;
  color: string;
};

const getDurationBarHeight = (value: number, maxValue: number) => {
  if (value <= 0 || maxValue <= 0) {
    return 0;
  }

  return Math.max(MIN_GROUP_BAR_HEIGHT, (value / maxValue) * MAX_GROUP_BAR_HEIGHT);
};

const DurationBar = ({ display, value, maxValue, color }: DurationBarProps) => {
  const height = getDurationBarHeight(value, maxValue);

  return (
    <div
      className="relative flex w-8 flex-col items-start sm:w-10"
      style={{ height: `${height}px` }}
    >
      <div
        className="w-full flex-1 rounded-tl-[11px] rounded-tr-[11px]"
        style={{ backgroundColor: color }}
      />
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)]">
        <DiamondBadge value={display} color={color} size="sm" />
      </div>
    </div>
  );
};

const DurationBarsChartCard = ({ chart, beforeLabel, afterLabel }: DurationBarsChartCardProps) => {
  const maxValue = Math.max(
    0,
    ...chart.items.map((item) => Math.max(item.before.value, item.after.value)),
  );

  return (
    <ChartCard caption={chart.caption}>
      <ChartCardShell className="flex min-h-[360px] w-full flex-col items-center justify-end gap-6 px-5 pb-6 pt-10 sm:px-8 lg:h-[400px] lg:px-12 lg:pb-8 lg:pt-12">
        <p className="type-data-comparison text-primary">
          {beforeLabel} <span className="text-smooth">/</span>{" "}
          <span style={{ color: secondary }}>{afterLabel}</span>
        </p>
        <div className="flex min-h-0 w-full flex-1 items-end justify-center gap-2 rounded-[30px] sm:gap-5">
          {chart.items.map((item) => (
            <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center gap-3">
              <div
                className="relative flex w-full items-end justify-center"
                style={{ height: `${DURATION_PLOT_HEIGHT}px` }}
              >
                <div className="absolute inset-x-2 bottom-0 h-0.5 bg-dark-smooth sm:inset-x-4" />
                <div
                  className="absolute left-1/2 z-10 flex -translate-x-1/2 items-end justify-center gap-1"
                  style={{ bottom: AXIS_BAR_OFFSET }}
                >
                  <DurationBar
                    display={item.before.display}
                    value={item.before.value}
                    maxValue={maxValue}
                    color={primary}
                  />
                  <DurationBar
                    display={item.after.display}
                    value={item.after.value}
                    maxValue={maxValue}
                    color={secondary}
                  />
                </div>
              </div>
              <p className="type-data-label-sm min-h-[36px] w-full text-center text-muted">
                {item.label.split("\n").map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </ChartCardShell>
    </ChartCard>
  );
};

type ProgressChartCardProps = {
  chart: ProgressChartData;
} & ChartLabels;

const ProgressChartCard = ({ chart, beforeLabel, afterLabel }: ProgressChartCardProps) => (
  <ChartCard caption={chart.caption}>
    <ChartCardShell className="flex min-h-[360px] w-full flex-col items-center justify-center gap-6 px-5 pb-6 pt-10 sm:px-8 lg:h-[400px] lg:px-12 lg:pb-8 lg:pt-12">
      <div className="flex w-full flex-col gap-3 border-b border-dark-smooth pb-6">
        <p className="type-data-value w-full text-center text-primary">
          {beforeLabel}
        </p>
        <div className="flex flex-col gap-1">
          {chart.rows.map((row) => (
            <div key={row.label} className="flex flex-col gap-[2px]">
              <div className="flex items-baseline justify-between gap-4">
                <span className="type-body-lg text-smooth">
                  {row.label}
                </span>
                <span className="type-data-value text-primary">
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
                <span className="type-body-lg text-smooth">
                  {row.label}
                </span>
                <span
                  className="type-data-value"
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
          className="type-data-value w-full text-center"
          style={{ color: secondary }}
        >
          {afterLabel}
        </p>
      </div>
    </ChartCardShell>
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
    <ChartCardShell className="flex min-h-[360px] w-full flex-col items-center gap-6 px-5 pb-6 pt-10 sm:px-8 lg:h-[400px] lg:gap-8 lg:px-12 lg:pb-8 lg:pt-12">
      <p className="type-data-title w-full text-muted">
        {chart.title}
      </p>
      <div className="flex w-full flex-col gap-4">
        {chart.rows.map((row, index) => (
          <div
            key={row.label}
            className={index < chart.rows.length - 1 ? "border-b border-dark-smooth pb-4" : "pb-4"}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="type-body-lg text-muted">
                {row.label}
              </span>
              <span className="type-data-value whitespace-nowrap text-primary">
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
    </ChartCardShell>
  </ChartCard>
);

type SingleKpiChartCardProps = {
  chart: SingleKpiChartData;
};

const SingleKpiChartCard = ({ chart }: SingleKpiChartCardProps) => (
  <ChartCard caption={chart.caption}>
    <ChartCardShell className="flex min-h-[360px] w-full items-center justify-center px-5 py-10 text-center sm:px-8 lg:h-[400px] lg:px-12 lg:py-12">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <p className="type-kpi text-primary">
          {chart.value}
        </p>
        <div className="flex w-full flex-col items-center">
          <p className="type-data-title text-muted">
            {chart.title}
          </p>
          <p className="type-body-lg max-w-[430px] text-smooth">
            {chart.description}
          </p>
        </div>
      </div>
    </ChartCardShell>
  </ChartCard>
);

const renderChart = (chart: ImpactChart, index: number, labels: ChartLabels) => {
  switch (chart.type) {
    case "bar":
      return <BarChartCard key={`${chart.title}-${index}`} chart={chart} {...labels} />;
    case "progress":
      return <ProgressChartCard key={`progress-${index}`} chart={chart} {...labels} />;
    case "duration-bars":
      return <DurationBarsChartCard key={`duration-bars-${index}`} chart={chart} {...labels} />;
    case "kpi-progress":
      return <KpiProgressChartCard key={`${chart.title}-${index}`} chart={chart} />;
    case "single-kpi":
      return <SingleKpiChartCard key={`${chart.title}-${index}`} chart={chart} />;
  }
};

export const ImpactSection = async ({ impactSection, id }: ImpactSectionProps) => {
  const t = await getTranslations("sections");
  const labels: ChartLabels = { beforeLabel: t("before"), afterLabel: t("after") };

  return (
    <Section id={id}>
      <Container>
        <h2 className="type-section-title text-muted">
          {impactSection.title}
        </h2>

        <div className="mt-10 flex max-w-[800px] flex-col gap-5 lg:mt-12 lg:gap-6">
          <p className="type-body-lg text-ink">
            {impactSection.summary}
          </p>
          <ul className="flex flex-col gap-3 py-6">
            {impactSection.bullets.map((bullet) => (
              <li key={bullet.bold} className="relative flex items-start gap-2.5 pl-9">
                <DiamondBullet />
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <p className="type-body-lg-bold w-full text-muted">
                    {bullet.bold}
                  </p>
                  <p className="type-body-sm w-full text-smooth">
                    {bullet.regular}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <MobileCarousel className="mt-4 lg:hidden" itemClassName="flex flex-col">
          {impactSection.charts.map((chart, index) => renderChart(chart, index, labels))}
        </MobileCarousel>

        <div className="mt-4 hidden gap-8 lg:grid lg:grid-cols-2">
          {impactSection.charts.map((chart, index) => renderChart(chart, index, labels))}
        </div>
      </Container>
    </Section>
  );
};
