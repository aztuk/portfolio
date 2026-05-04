import { getTranslations } from "next-intl/server";
import Image from "next/image";
import {
  CalendarDotsIcon,
  ChartBarIcon,
  ChartPieIcon,
  ClipboardTextIcon,
  DiamondIcon,
  FlaskIcon,
  LightbulbIcon,
  ListIcon,
  PiggyBankIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";

import { BulletPoint } from "@/components/use-case/BulletPoint";
import { ChartCardShell } from "@/components/use-case/ChartCardShell";
import { DiamondBadge } from "@/components/use-case/DiamondBadge";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MobileCarousel } from "@/components/shared/MobileCarousel";
import { Tag } from "@/components/shared/Tag";
import type {
  CountBarsChartData,
  DualProgressChartData,
  ImageAsset,
  InsightChartData,
  LineChartData,
  RankedBarsChartData,
  SingleKpiChartData,
  TensionChartCard,
  TensionPoint,
  TensionSectionData,
  VerbatimChartData,
  VerticalBarsChartData,
  WorkflowMappingChartData,
} from "@/content/use-cases/types";

type TensionSectionProps = {
  tension: TensionSectionData;
  id?: string;
};


// ─── Vertical bars chart ──────────────────────────────────────────────────────

const MAX_BAR_H = 144;

const mobileChartTitleClassName = "type-chart-title-mobile";
const mobileChartBodyClassName = "type-chart-body-mobile";
const mobileDataValueClassName = "type-chart-value-mobile";
const mobileDataLabelClassName = "type-chart-label-mobile";

type VerticalBarsCardProps = { chart: VerticalBarsChartData };

const VerticalBarsCard = ({ chart }: VerticalBarsCardProps) => {
  const maxVal = Math.max(...chart.bars.map((b) => b.value));
  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-6 p-5 lg:p-8">
        <p className={`type-data-title w-full text-muted ${mobileChartTitleClassName}`}>
          {chart.title}
        </p>
        <div className="relative flex min-h-0 w-full flex-1 items-end justify-center gap-1 lg:gap-2">
          {/* baseline */}
          <div className="absolute bottom-[37px] left-0 right-0 h-[2px] bg-dark-smooth" />
          {chart.bars.map((bar) => {
            const h = maxVal > 0 ? (bar.value / maxVal) * MAX_BAR_H : 0;
            const lines = bar.label.split("\n");
            return (
              <div key={bar.label} className="relative flex min-w-0 flex-1 flex-col items-center gap-4 lg:gap-5">
                <div className="relative w-7 lg:w-[50px]" style={{ height: `${h}px` }}>
                  <div
                    className="h-full w-full rounded-tl-[11px] rounded-tr-[11px]"
                    style={{ backgroundColor: bar.color }}
                  />
                  <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 lg:-top-[27px]">
                    <DiamondBadge value={`${bar.value}%`} color={bar.color} size="sm" />
                  </div>
                </div>
                <div className="flex min-h-[48px] w-full flex-col items-center justify-start px-px lg:h-[30px] lg:min-h-0 lg:px-0">
                  {lines.map((line) => (
                    <p
                      key={line}
                      className={`type-data-label w-full break-words text-center ${mobileDataLabelClassName}`}
                      style={{ color: bar.color }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ChartCardShell>
  );
};

// ─── Dual progress chart ──────────────────────────────────────────────────────

type DualProgressCardProps = { chart: DualProgressChartData };

const DualProgressCard = ({ chart }: DualProgressCardProps) => {
  const [top, bottom] = chart.rows;
  const topColor = top.variant === "primary" ? "var(--color-primary)" : "var(--color-secondary)";
  const bottomColor = bottom.variant === "primary" ? "var(--color-primary)" : "var(--color-secondary)";

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col justify-center px-5 pb-6 pt-8 lg:px-12 lg:pb-8 lg:pt-12">
        {/* Top row: label → bar */}
        <div className="flex flex-col gap-3 border-b border-dark-smooth pb-4">
          <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div className="flex min-w-0 flex-col">
              <p className={`type-data-title ${mobileChartTitleClassName}`} style={{ color: topColor }}>
                {top.title}
              </p>
              <p className={`type-body-lg text-smooth ${mobileChartBodyClassName}`}>
                {top.description}
              </p>
            </div>
            <span className={`type-data-value shrink-0 whitespace-nowrap ${mobileDataValueClassName}`} style={{ color: topColor }}>
              {top.display}
            </span>
          </div>
          <div className="h-[12px] w-full rounded-[20px] border border-dark bg-dark p-[1px]">
            <div
              className="h-full rounded-[20px] bg-primary"
              style={{ width: `${top.percent}%` }}
            />
          </div>
        </div>

        {/* Bottom row: bar → label */}
        <div className="flex flex-col gap-3 pt-4">
          <div className="h-[12px] w-full rounded-[20px] border border-dark bg-dark p-[1px]">
            <div
              className="h-full rounded-[20px]"
              style={{ width: `${bottom.percent}%`, backgroundColor: bottomColor }}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <div className="flex min-w-0 flex-col">
              <p className={`type-data-title ${mobileChartTitleClassName}`} style={{ color: bottomColor }}>
                {bottom.title}
              </p>
              <p className={`type-body-lg text-smooth ${mobileChartBodyClassName}`}>
                {bottom.description}
              </p>
            </div>
            <span className={`type-data-value shrink-0 whitespace-nowrap ${mobileDataValueClassName}`} style={{ color: bottomColor }}>
              {bottom.display}
            </span>
          </div>
        </div>
      </div>
    </ChartCardShell>
  );
};

// ─── Line chart ───────────────────────────────────────────────────────────────

function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  const d: string[] = [`M ${pts[0].x} ${pts[0].y}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d.push(
      `C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x} ${p2.y}`,
    );
  }
  return d.join(" ");
}

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

type LineChartCardProps = { chart: LineChartData };

const LineChartCard = ({ chart }: LineChartCardProps) => {
  const W = 400;
  const H = 200;
  const xRatios = getLinePointXRatios(chart.points);
  const svgPts = chart.points.map((p, i) => ({
    x: xRatios[i] * W,
    y: (1 - p.value / 100) * H,
  }));
  const path = smoothPath(svgPts);

  const gradId = "tension-line-grad";

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col px-5 pb-6 pt-8 lg:px-12 lg:pb-8 lg:pt-12">
        {/* chart area */}
        <div className="relative flex-1">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                {chart.points.map((p, i) => (
                  <stop
                    key={p.label}
                    offset={`${xRatios[i] * 100}%`}
                    stopColor={p.color}
                  />
                ))}
              </linearGradient>
            </defs>
            <path
              d={path}
              stroke={`url(#${gradId})`}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Badges at each data point */}
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

        {/* x-axis */}
        <div className="relative h-[30px]">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-dark-smooth" />
          {chart.points.map((p, i) => (
            <span
              key={p.label}
              className="type-data-label absolute top-[10px]"
              style={{
                color: p.color,
                left: `${xRatios[i] * 100}%`,
                transform: `translateX(${
                  i === 0 ? "0" : i === chart.points.length - 1 ? "-100%" : "-50%"
                })`,
              }}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </ChartCardShell>
  );
};

// ─── Ranked bars chart ────────────────────────────────────────────────────────

type RankedBarsCardProps = { chart: RankedBarsChartData };

const RankedBarsCard = ({ chart }: RankedBarsCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <div className="flex flex-1 flex-col justify-end gap-5 p-5 lg:gap-6 lg:p-8">
      <p className={`type-data-title text-muted ${mobileChartTitleClassName}`}>
        {chart.title}
      </p>
      <div className="flex flex-1 flex-col gap-5">
        {chart.bars.map((bar) => {
          const color = bar.isPrimary ? "var(--color-primary)" : "var(--color-smooth)";
          return (
            <div key={bar.label} className="flex items-center gap-4 lg:gap-6">
              <DiamondBadge value={`${bar.value}%`} color={color} size="sm" />
              <div className="flex flex-1 flex-col gap-[3px]">
                <p
                  className={`type-data-label-compact ${mobileDataLabelClassName}`}
                  style={{ color }}
                >
                  {bar.label}
                </p>
                <div className="h-[12px] w-full rounded-[20px] border border-dark bg-dark p-[1px]">
                  <div
                    className="h-full rounded-[20px]"
                    style={{ width: `${bar.percent}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </ChartCardShell>
);

// â”€â”€â”€ Count bars chart â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type CountBarsCardProps = { chart: CountBarsChartData };

const CountBarsCard = ({ chart }: CountBarsCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <div className="flex flex-1 flex-col justify-end gap-5 p-5 lg:gap-6 lg:p-8">
      <div className="flex flex-col gap-2 pr-1 lg:flex-row lg:items-baseline lg:gap-4">
        <p className={`type-data-title flex-1 text-muted ${mobileChartTitleClassName}`}>
          {chart.title}
        </p>
        <p className={`type-body-lg shrink-0 text-smooth ${mobileChartBodyClassName}`}>
          {chart.subtitle}
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-between pb-1">
        {chart.bars.map((bar) => {
          const color = bar.isPrimary ? "var(--color-primary)" : "var(--color-smooth)";
          return (
            <div key={bar.label} className="flex items-center gap-4 lg:gap-6">
              <DiamondBadge value={`${bar.value}`} color={color} size="sm" />
              <div className="flex flex-1 flex-col pb-2">
                <p
                  className={`type-data-label h-[21px] ${mobileDataLabelClassName}`}
                  style={{ color }}
                >
                  {bar.label}
                </p>
                <div className="h-[12px] w-full rounded-[20px] border border-dark bg-dark p-[1px]">
                  <div
                    className="h-full rounded-[20px]"
                    style={{ width: `${bar.percent}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </ChartCardShell>
);

// â”€â”€â”€ Single KPI chart â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type SingleKpiCardProps = { chart: SingleKpiChartData };

const SingleKpiCard = ({ chart }: SingleKpiCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <div className="flex flex-1 items-center justify-center p-5 text-center lg:p-8">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <p className="type-kpi text-primary">
          {chart.value}
        </p>
        <div className="flex w-full flex-col items-center">
          <p className={`type-data-title text-muted ${mobileChartTitleClassName}`}>
            {chart.title}
          </p>
          <p className={`type-body-lg max-w-[430px] text-smooth ${mobileChartBodyClassName}`}>
            {chart.description}
          </p>
        </div>
      </div>
    </div>
  </ChartCardShell>
);

// ─── Insight chart ────────────────────────────────────────────────────────────

type InsightChartCardProps = { chart: InsightChartData };

const INSIGHT_ICONS = {
  lightbulb: LightbulbIcon,
  "piggy-bank": PiggyBankIcon,
  "users-three": UsersThreeIcon,
  "calendar-dots": CalendarDotsIcon,
  "clipboard-list": ListIcon,
  "check-badge": SealCheckIcon,
  "shield-check": ShieldCheckIcon,
  "chart-pie": ChartPieIcon,
  "chart-bar": ChartBarIcon,
  flask: FlaskIcon,
  "clipboard-text": ClipboardTextIcon,
} satisfies Record<InsightChartData["icon"], typeof PiggyBankIcon>;

const INSIGHT_METHODOLOGY_ICONS = {
  "chart-bar": ChartBarIcon,
  "clipboard-text": ClipboardTextIcon,
  flask: FlaskIcon,
} satisfies Record<InsightChartData["methodologyIcon"], typeof FlaskIcon>;

const InsightChartCard = ({ chart }: InsightChartCardProps) => {
  const InsightIcon = INSIGHT_ICONS[chart.icon];
  const MethodologyIcon = INSIGHT_METHODOLOGY_ICONS[chart.methodologyIcon];
  const tintedSurface = `${chart.color}26`;

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-5 p-5 lg:gap-6 lg:p-8">
        {/* Head: badge left, icon chip right */}
        <div className="flex items-start justify-between gap-4 lg:gap-6">
          <div
            className="rounded-full px-4 py-3"
            style={{
              backgroundColor: tintedSurface,
              border: `1px solid ${tintedSurface}`,
            }}
          >
            <span
              className="type-data-label whitespace-nowrap"
              style={{ color: chart.color }}
            >
              {chart.label}
            </span>
          </div>
          <div
            className="flex size-[64px] shrink-0 items-center justify-center rounded-[18px] backdrop-blur-[4px]"
            style={{
              backgroundColor: tintedSurface,
              border: `1px solid ${tintedSurface}`,
              color: chart.color,
            }}
          >
            <InsightIcon size={32} weight="duotone" aria-hidden="true" />
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-1 flex-col gap-2">
          <p className="type-data-title text-muted">
            {chart.insightTitle}
          </p>
          <p className="type-body-lg text-smooth">
            {chart.insightDescription}
          </p>
        </div>
        {/* Footer: methodology */}
        <div className="flex items-center gap-4 border-t border-dark-smooth pt-4">
          <MethodologyIcon
            size={24}
            weight="regular"
            className="shrink-0"
            style={{ color: chart.color }}
            aria-hidden="true"
          />
          <p
            className="type-body-lg"
            style={{ color: chart.color }}
          >
            {chart.methodology}
          </p>
        </div>
      </div>
    </ChartCardShell>
  );
};

// ─── Verbatim chart ───────────────────────────────────────────────────────────

type VerbatimCardProps = { chart: VerbatimChartData };

const VerbatimCard = ({ chart }: VerbatimCardProps) => {
  const MethodologyIcon = INSIGHT_METHODOLOGY_ICONS[chart.methodologyIcon];
  const tintedSurface = `${chart.color}26`;
  const initials = chart.personaName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-5 p-5 lg:gap-6 lg:p-8">
        {/* Head: persona chip + name left, fixed "Verbatim" badge right */}
        <div className="flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between lg:gap-6">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex size-[40px] shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: tintedSurface, border: `1px solid ${chart.color}40` }}
            >
              <span
                className="type-data-value-sm"
                style={{ color: chart.color }}
              >
                {initials}
              </span>
            </div>
            <span className="type-body-lg truncate text-smooth">
              {chart.personaName}
            </span>
          </div>
          <div
            className="shrink-0 rounded-full px-3 py-2 lg:px-4 lg:py-3"
            style={{ backgroundColor: tintedSurface, border: `1px solid ${tintedSurface}` }}
          >
            <span
              className="type-data-label whitespace-nowrap"
              style={{ color: chart.color }}
            >
              Verbatim
            </span>
          </div>
        </div>

        {/* Quote block — guillemet overlaps the text from behind */}
        <div className="relative flex flex-1 flex-col justify-center">
          <div className="relative border-l-[6px] border-dark-smooth pl-8">
            <span
              className="type-quote-mark pointer-events-none absolute left-1 top-0 z-0 select-none text-dark-smooth"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <p className="type-body-lg relative z-10 py-5 text-ink">
              {chart.quote}
            </p>
          </div>
        </div>

        {/* Footer: methodology */}
        <div className="flex items-center gap-4 border-t border-dark-smooth pt-4">
          <MethodologyIcon
            size={24}
            weight="regular"
            className="shrink-0"
            style={{ color: chart.color }}
            aria-hidden="true"
          />
          <p
            className="type-body-lg"
            style={{ color: chart.color }}
          >
            {chart.methodology}
          </p>
        </div>
      </div>
    </ChartCardShell>
  );
};

// ─── Chart card wrapper ───────────────────────────────────────────────────────

// ---------------------------------------------------------------------------
// Workflow mapping chart
// ---------------------------------------------------------------------------

type WorkflowMappingCardProps = { chart: WorkflowMappingChartData };

const WorkflowArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    className="hidden shrink-0 text-smooth lg:block"
    aria-hidden="true"
  >
    <path
      d="M2 7h9M7.5 3.5 11 7l-3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WorkflowMappingCard = ({ chart }: WorkflowMappingCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-5 p-5 lg:gap-6 lg:p-8">
      <p className="type-data-title w-full text-muted">
        {chart.title}
      </p>

      <div className="flex flex-1 flex-col justify-center gap-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-1">
          {chart.steps.map((step, index) => (
            <div key={step.label} className="relative flex min-w-0 flex-1 flex-col gap-2.5">
              <div className="flex min-w-0 items-center justify-center rounded-[10px] border-2 border-dark bg-dark/50 px-3 py-2.5 backdrop-blur-[4px]">
                <p className="type-body-lg-medium truncate text-center text-muted">
                  {step.label}
                </p>
              </div>
              {index < chart.steps.length - 1 && (
                <div className="absolute right-[-9px] top-[18px] z-10 translate-x-1/2">
                  <WorkflowArrow />
                </div>
              )}
              <p className="type-control text-center text-smooth">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="relative pb-10">
          <div className="h-4 w-full rounded-[30px] border border-dark bg-dark-smooth" />
          {chart.frictions.map((friction) => (
            <div
              key={friction.label}
              className="absolute top-0 flex flex-col items-center gap-[15px]"
              style={{
                left: `${friction.startPercent}%`,
                width: `${friction.widthPercent}%`,
              }}
            >
              <div className="h-4 w-full rounded-[30px] border-2 border-dark-smooth bg-negative" />
            <div className="flex items-center justify-center gap-1 text-center sm:whitespace-nowrap">
                <DiamondIcon size={18} weight="regular" className="shrink-0 text-negative" aria-hidden="true" />
                <p className="type-control text-negative">
                  {friction.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </ChartCardShell>
);

type ChartCardProps = { card: TensionChartCard };

const ChartCard = ({ card }: ChartCardProps) => (
  <div className="flex min-h-[320px] flex-col lg:min-h-[350px]">
    {card.chart.type === "vertical-bars" && <VerticalBarsCard chart={card.chart} />}
    {card.chart.type === "dual-progress" && <DualProgressCard chart={card.chart} />}
    {card.chart.type === "line" && <LineChartCard chart={card.chart} />}
    {card.chart.type === "ranked-bars" && <RankedBarsCard chart={card.chart} />}
    {card.chart.type === "count-bars" && <CountBarsCard chart={card.chart} />}
    {card.chart.type === "single-kpi" && <SingleKpiCard chart={card.chart} />}
    {card.chart.type === "insight" && <InsightChartCard chart={card.chart} />}
    {card.chart.type === "verbatim" && <VerbatimCard chart={card.chart} />}
    {card.chart.type === "workflow-mapping" && <WorkflowMappingCard chart={card.chart} />}
  </div>
);

type ChartCardsGridProps = { cards: TensionChartCard[] };

const ChartCardsGrid = ({ cards }: ChartCardsGridProps) => {
  const getCaption = (card: TensionChartCard) => ("caption" in card ? card.caption : undefined);

  const renderItem = (card: TensionChartCard, index: number) => {
    const caption = getCaption(card);

    return (
      <div key={index} className="flex min-w-0 flex-col gap-4">
        <ChartCard card={card} />
        {caption ? (
          <p className="type-body-lg text-center text-smooth">
            {caption}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <MobileCarousel className="mt-10 lg:hidden" itemClassName="flex flex-col gap-4">
        {cards.map((card, index) => renderItem(card, index))}
      </MobileCarousel>

      <div className="mt-12 hidden gap-10 lg:grid lg:grid-cols-2">
        {cards.map((card, index) => renderItem(card, index))}
      </div>
    </>
  );
};

type DiscoverySignalsProps = {
  signals: string[];
  label: string;
};

const DiscoverySignals = ({ signals, label }: DiscoverySignalsProps) => {
  if (signals.length === 0) return null;

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <p className="type-chip text-muted/60">
        {label}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {signals.map((signal) => (
          <Tag key={signal} label={signal} />
        ))}
      </div>
    </div>
  );
};

// ─── Existing sub-components ──────────────────────────────────────────────────

type ProblemCardProps = {
  item: TensionPoint;
  index: number;
};

const ProblemCard = ({ item, index }: ProblemCardProps) => (
  <article className="relative flex flex-1 flex-col gap-2 rounded-[24px] py-5 pl-14 pr-4 lg:rounded-[30px] lg:py-6 lg:pl-16 lg:pr-6">
    <div className="absolute left-[-2px] top-2 flex size-[54px] items-center justify-center">
      <div className="absolute size-[38px] -rotate-45 bg-dark-smooth/50 backdrop-blur-[4px]" />
      <p className="type-data-index relative text-primary">
        {String(index + 1).padStart(2, "0")}
      </p>
    </div>

    <p className="type-eyebrow w-full text-muted">
      {item.label}
    </p>

    <p className="type-body-lg-light w-full text-muted">
      {item.value}
    </p>

    {item.bullets && item.bullets.length > 0 && (
      <div className="flex flex-col gap-3 py-6">
        {item.bullets.map((bullet) => (
          <BulletPoint key={bullet}>{bullet}</BulletPoint>
        ))}
      </div>
    )}
  </article>
);

type GalleryItemProps = {
  artifact: ImageAsset;
};

const GalleryItem = ({ artifact }: GalleryItemProps) => (
  <div className="flex w-full max-w-[600px] flex-col items-center gap-4 lg:gap-6 lg:px-5">
    <div className="relative aspect-[8/5] w-full overflow-hidden rounded-[30px] shadow-elevation-2 border border-dark-smooth bg-dark/60 backdrop-blur-[5px]">
      <Image
        src={artifact.src}
        alt={artifact.alt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 560px, (min-width: 768px) 46vw, 100vw"
      />
    </div>
    <p className="type-body-lg text-center text-smooth">
      {artifact.caption ?? artifact.alt}
    </p>
  </div>
);

// ─── Section ──────────────────────────────────────────────────────────────────

export const TensionSection = async ({ tension, id }: TensionSectionProps) => {
  const t = await getTranslations("sections");
  const artifacts =
    tension.artifacts ??
    (tension.artifact
      ? [{ ...tension.artifact, caption: tension.artifact.caption ?? tension.artifactCaption }]
      : []);

  return (
    <Section id={id}>
      <Container>
        <h2 className="type-section-title text-muted">
          {tension.title}
        </h2>

        <div
          className={`mt-12 grid gap-12 ${
            tension.tensions.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
          {tension.tensions.map((item, index) => (
            <ProblemCard key={item.label} item={item} index={index} />
          ))}
        </div>

        {tension.chartCards && tension.chartCards.length > 0 ? (
          <>
            <DiscoverySignals signals={tension.discoverySignals ?? []} label={t("discoveryDone")} />
            <ChartCardsGrid cards={tension.chartCards} />
          </>
        ) : artifacts.length > 0 ? (
          <div className="mt-12 grid items-start justify-items-center gap-y-16 lg:grid-cols-2">
            {artifacts.map((artifact, index) => (
              <GalleryItem key={`${artifact.src}-${index}`} artifact={artifact} />
            ))}
          </div>
        ) : null}

        <div className="my-24 flex items-center justify-center lg:my-40">
          <div className="rotate-3">
            <div className="flex w-full max-w-[700px] items-center justify-center rounded-[28px] border-2 border-primary bg-dark-smooth/60 px-6 py-8 shadow-elevation-2 backdrop-blur-[2px] lg:rounded-[40px] lg:px-10 lg:py-10">
              <p className="type-note text-center text-primary">
                {tension.coreQuestion}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
