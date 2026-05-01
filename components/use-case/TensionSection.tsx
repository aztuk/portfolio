import Image from "next/image";
import {
  ChartBarIcon,
  ClipboardTextIcon,
  FlaskIcon,
  LightbulbIcon,
  PiggyBankIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";

import { BulletPoint } from "@/components/use-case/BulletPoint";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
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
  VerticalBarsChartData,
} from "@/content/use-cases/types";

type TensionSectionProps = {
  tension: TensionSectionData;
};

// ─── Shared helpers ───────────────────────────────────────────────────────────

const DIAMOND_BORDER = "#364781";

type DiamondBadgeProps = {
  value: string;
  color: string;
  size?: "sm" | "md";
};

const DiamondBadge = ({ value, color, size = "md" }: DiamondBadgeProps) => {
  const outer = size === "sm" ? "size-[46px]" : "size-[54px]";
  const inner = size === "sm" ? "size-[32px]" : "size-[38px]";
  return (
    <div className={`relative flex ${outer} shrink-0 items-center justify-center`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`${inner} -rotate-45 border-2 bg-dark-smooth/50 backdrop-blur-[16px] backdrop-saturate-150`}
          style={{ borderColor: DIAMOND_BORDER }}
        />
      </div>
      <span
        className="relative font-tektur text-[15px] font-semibold leading-[0.7] whitespace-nowrap"
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
};

// ─── Chart card shell ─────────────────────────────────────────────────────────

const CardShell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-1 flex-col overflow-hidden rounded-[30px] border border-dark-smooth bg-dark-smooth/20 shadow-elevation-2 backdrop-blur-[2px]">
    {children}
  </div>
);

// ─── Vertical bars chart ──────────────────────────────────────────────────────

const MAX_BAR_H = 174;

type VerticalBarsCardProps = { chart: VerticalBarsChartData };

const VerticalBarsCard = ({ chart }: VerticalBarsCardProps) => {
  const maxVal = Math.max(...chart.bars.map((b) => b.value));
  return (
    <CardShell>
      <div className="flex flex-1 items-end justify-center px-12 pb-8 pt-12">
        <div className="relative flex w-full items-end justify-center gap-6">
          {/* baseline */}
          <div className="absolute bottom-[37px] left-0 right-0 h-[2px] bg-dark-smooth" />
          {chart.bars.map((bar) => {
            const h = maxVal > 0 ? (bar.value / maxVal) * MAX_BAR_H : 0;
            const lines = bar.label.split("\n");
            return (
              <div key={bar.label} className="relative flex flex-1 flex-col items-center gap-5">
                <div className="relative w-[50px]" style={{ height: `${h}px` }}>
                  <div
                    className="h-full w-full rounded-tl-[11px] rounded-tr-[11px]"
                    style={{ backgroundColor: bar.color }}
                  />
                  <div className="absolute -top-[27px] left-1/2 -translate-x-1/2">
                    <DiamondBadge value={`${bar.value}%`} color={bar.color} />
                  </div>
                </div>
                <div className="flex h-[30px] flex-col items-center justify-start">
                  {lines.map((line) => (
                    <p
                      key={line}
                      className="font-tektur text-[15px] font-semibold leading-none text-center"
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
    </CardShell>
  );
};

// ─── Dual progress chart ──────────────────────────────────────────────────────

type DualProgressCardProps = { chart: DualProgressChartData };

const DualProgressCard = ({ chart }: DualProgressCardProps) => {
  const [top, bottom] = chart.rows;
  const topColor = top.variant === "primary" ? "var(--color-primary)" : "var(--color-secondary)";
  const bottomColor = bottom.variant === "primary" ? "var(--color-primary)" : "var(--color-secondary)";

  return (
    <CardShell>
      <div className="flex flex-1 flex-col justify-center px-12 pb-8 pt-12">
        {/* Top row: label → bar */}
        <div className="flex flex-col gap-3 border-b border-dark-smooth pb-4">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <p className="font-sans text-[24px] font-medium leading-[1.7] tracking-[-0.04em]" style={{ color: topColor }}>
                {top.title}
              </p>
              <p className="font-sans text-lg font-normal leading-[1.7] tracking-[-0.04em] text-smooth">
                {top.description}
              </p>
            </div>
            <span className="shrink-0 font-tektur text-[15px] font-semibold leading-[0.7] whitespace-nowrap" style={{ color: topColor }}>
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
          <div className="flex items-baseline justify-between gap-4">
            <div className="flex flex-col">
              <p className="font-sans text-[24px] font-medium leading-[1.7] tracking-[-0.04em]" style={{ color: bottomColor }}>
                {bottom.title}
              </p>
              <p className="font-sans text-lg font-normal leading-[1.7] tracking-[-0.04em] text-smooth">
                {bottom.description}
              </p>
            </div>
            <span className="shrink-0 font-tektur text-[15px] font-semibold leading-[0.7] whitespace-nowrap" style={{ color: bottomColor }}>
              {bottom.display}
            </span>
          </div>
        </div>
      </div>
    </CardShell>
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

type LineChartCardProps = { chart: LineChartData };

const LineChartCard = ({ chart }: LineChartCardProps) => {
  const W = 400;
  const H = 200;
  const n = chart.points.length;
  const svgPts = chart.points.map((p, i) => ({
    x: (i / (n - 1)) * W,
    y: (1 - p.value / 100) * H,
  }));
  const path = smoothPath(svgPts);

  const gradId = "tension-line-grad";

  return (
    <CardShell>
      <div className="flex flex-1 flex-col px-12 pb-8 pt-12">
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
                    offset={`${(i / (n - 1)) * 100}%`}
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
        <div className="relative flex h-[30px] items-center justify-between">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-dark-smooth" />
          {chart.points.map((p, i) => (
            <span
              key={p.label}
              className="font-tektur text-[15px] font-semibold leading-none text-center"
              style={{
                color: p.color,
                width: `${100 / n}%`,
                textAlign: i === 0 ? "left" : i === n - 1 ? "right" : "center",
              }}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </CardShell>
  );
};

// ─── Ranked bars chart ────────────────────────────────────────────────────────

type RankedBarsCardProps = { chart: RankedBarsChartData };

const RankedBarsCard = ({ chart }: RankedBarsCardProps) => (
  <CardShell>
    <div className="flex flex-1 flex-col justify-end gap-6 p-8">
      <p className="font-sans text-[24px] font-medium leading-[1.7] tracking-[-0.04em] text-muted">
        {chart.title}
      </p>
      <div className="flex flex-col justify-between flex-1">
        {chart.bars.map((bar) => {
          const color = bar.isPrimary ? "var(--color-primary)" : "var(--color-smooth)";
          return (
            <div key={bar.label} className="flex items-center gap-6">
              <DiamondBadge value={`${bar.value}%`} color={color} size="sm" />
              <div className="flex flex-1 flex-col pb-2">
                <p
                  className="font-tektur text-[15px] font-semibold leading-none h-[30px]"
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
  </CardShell>
);

// â”€â”€â”€ Count bars chart â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type CountBarsCardProps = { chart: CountBarsChartData };

const CountBarsCard = ({ chart }: CountBarsCardProps) => (
  <CardShell>
    <div className="flex flex-1 flex-col justify-end gap-6 p-8">
      <div className="flex items-baseline gap-4 pr-1 leading-[1.7]">
        <p className="flex-1 font-sans text-[24px] font-medium tracking-[-0.04em] text-muted">
          {chart.title}
        </p>
        <p className="shrink-0 font-sans text-[18px] font-normal tracking-[-0.04em] text-smooth">
          {chart.subtitle}
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-between pb-1">
        {chart.bars.map((bar) => {
          const color = bar.isPrimary ? "var(--color-primary)" : "var(--color-smooth)";
          return (
            <div key={bar.label} className="flex items-center gap-6">
              <DiamondBadge value={`${bar.value}`} color={color} />
              <div className="flex flex-1 flex-col pb-2">
                <p
                  className="h-[30px] font-tektur text-[15px] font-semibold leading-none"
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
  </CardShell>
);

// â”€â”€â”€ Single KPI chart â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type SingleKpiCardProps = { chart: SingleKpiChartData };

const SingleKpiCard = ({ chart }: SingleKpiCardProps) => (
  <CardShell>
    <div className="flex flex-1 items-center justify-center p-8 text-center">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <p className="font-tektur text-[clamp(82px,13vw,130px)] font-semibold leading-none text-primary">
          {chart.value}
        </p>
        <div className="flex w-full flex-col items-center leading-[1.7]">
          <p className="font-sans text-[24px] font-medium tracking-[-0.04em] text-muted">
            {chart.title}
          </p>
          <p className="max-w-[430px] font-sans text-[18px] font-normal tracking-[-0.04em] text-smooth">
            {chart.description}
          </p>
        </div>
      </div>
    </div>
  </CardShell>
);

// ─── Insight chart ────────────────────────────────────────────────────────────

type InsightChartCardProps = { chart: InsightChartData };

const INSIGHT_ICONS = {
  lightbulb: LightbulbIcon,
  "piggy-bank": PiggyBankIcon,
  "users-three": UsersThreeIcon,
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
    <CardShell>
      <div className="flex flex-1 flex-col gap-6 p-8">
        {/* Head: badge left, icon chip right */}
        <div className="flex items-start justify-between gap-6">
          <div
            className="rounded-full px-4 py-3"
            style={{
              backgroundColor: tintedSurface,
              border: `1px solid ${tintedSurface}`,
            }}
          >
            <span
              className="font-tektur text-[15px] font-semibold leading-none whitespace-nowrap"
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
        <div className="flex flex-1 flex-col gap-2 leading-[1.7]">
          <p className="font-sans text-[24px] font-medium tracking-[-0.04em] text-muted">
            {chart.insightTitle}
          </p>
          <p className="font-sans text-lg font-normal tracking-[-0.04em] text-smooth">
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
            className="font-sans text-lg font-normal leading-[1.7] tracking-[-0.04em]"
            style={{ color: chart.color }}
          >
            {chart.methodology}
          </p>
        </div>
      </div>
    </CardShell>
  );
};

// ─── Chart card wrapper ───────────────────────────────────────────────────────

type ChartCardProps = { card: TensionChartCard };

const ChartCard = ({ card }: ChartCardProps) => (
  <div className="flex min-h-[350px] flex-col">
    {card.chart.type === "vertical-bars" && <VerticalBarsCard chart={card.chart} />}
    {card.chart.type === "dual-progress" && <DualProgressCard chart={card.chart} />}
    {card.chart.type === "line" && <LineChartCard chart={card.chart} />}
    {card.chart.type === "ranked-bars" && <RankedBarsCard chart={card.chart} />}
    {card.chart.type === "count-bars" && <CountBarsCard chart={card.chart} />}
    {card.chart.type === "single-kpi" && <SingleKpiCard chart={card.chart} />}
    {card.chart.type === "insight" && <InsightChartCard chart={card.chart} />}
  </div>
);

type ChartCardsGridProps = { cards: TensionChartCard[] };

const ChartCardsGrid = ({ cards }: ChartCardsGridProps) => {
  const pairs: TensionChartCard[][] = [];
  for (let i = 0; i < cards.length; i += 2) {
    pairs.push(cards.slice(i, i + 2));
  }

  const getCaption = (card: TensionChartCard) => ("caption" in card ? card.caption : undefined);

  return (
    <div className="mt-12 flex flex-col gap-10">
      {pairs.map((pair, pi) => (
        <div key={pi} className="flex flex-col gap-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {pair.map((card, ci) => (
              <ChartCard key={ci} card={card} />
            ))}
          </div>
          {pair.some((card) => getCaption(card)) && (
            <div className="grid gap-10 lg:grid-cols-2">
              {pair.map((card, ci) => {
                const caption = getCaption(card);

                return caption ? (
                  <p key={ci} className="text-center font-sans text-lg font-normal leading-[1.7] tracking-[-0.04em] text-muted">
                    {caption}
                  </p>
                ) : (
                  <div key={ci} aria-hidden="true" />
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

type DiscoverySignalsProps = {
  signals: string[];
};

const DiscoverySignals = ({ signals }: DiscoverySignalsProps) => {
  if (signals.length === 0) return null;

  return (
    <div className="mt-12 flex flex-wrap justify-center gap-2">
      {signals.map((signal) => (
        <Tag key={signal} label={signal} />
      ))}
    </div>
  );
};

// ─── Existing sub-components ──────────────────────────────────────────────────

type ProblemCardProps = {
  item: TensionPoint;
  index: number;
};

const ProblemCard = ({ item, index }: ProblemCardProps) => (
  <article className="relative flex flex-1 flex-col gap-2 rounded-[30px] py-6 pl-16 pr-6">
    <div className="absolute left-[-2px] top-2 flex size-[54px] items-center justify-center">
      <div className="absolute size-[38px] -rotate-45 bg-dark-smooth/50 backdrop-blur-[4px]" />
      <p className="relative font-tektur text-[20px] font-semibold leading-none text-primary">
        {String(index + 1).padStart(2, "0")}
      </p>
    </div>

    <p className="w-full font-display text-[24px] font-light uppercase leading-[1.2] text-muted">
      {item.label}
    </p>

    <p className="w-full font-sans text-[18px] font-thin leading-[1.7] tracking-[-0.04em] text-muted">
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
  <div className="flex w-full max-w-[600px] flex-col items-center gap-6 px-5">
    <div className="relative aspect-[8/5] w-full overflow-hidden rounded-[30px] shadow-elevation-2 border border-dark-smooth bg-dark/60 backdrop-blur-[5px]">
      <Image
        src={artifact.src}
        alt={artifact.alt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 560px, (min-width: 768px) 46vw, 100vw"
      />
    </div>
    <p className="text-center font-sans text-[18px] font-normal leading-[1.7] tracking-[-0.04em] text-muted">
      {artifact.caption ?? artifact.alt}
    </p>
  </div>
);

// ─── Section ──────────────────────────────────────────────────────────────────

export const TensionSection = ({ tension }: TensionSectionProps) => {
  const artifacts =
    tension.artifacts ??
    (tension.artifact
      ? [{ ...tension.artifact, caption: tension.artifact.caption ?? tension.artifactCaption }]
      : []);

  return (
    <Section>
      <Container>
        <h2 className="font-display text-[40px] font-light leading-[1.2] text-muted">
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
            <DiscoverySignals signals={tension.discoverySignals ?? []} />
            <ChartCardsGrid cards={tension.chartCards} />
          </>
        ) : artifacts.length > 0 ? (
          <div className="mt-12 grid items-start justify-items-center gap-y-16 lg:grid-cols-2">
            {artifacts.map((artifact, index) => (
              <GalleryItem key={`${artifact.src}-${index}`} artifact={artifact} />
            ))}
          </div>
        ) : null}

        <div className="my-40 flex items-center justify-center">
          <div className="rotate-3">
            <div className="flex w-full max-w-[700px] items-center justify-center rounded-[40px] border-2 border-primary bg-dark-smooth/60 px-10 py-10 shadow-elevation-2 backdrop-blur-[2px]">
              <p className="text-center font-elite text-[18px] leading-[1.7] tracking-[-0.04em] text-primary not-italic">
                {tension.coreQuestion}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
