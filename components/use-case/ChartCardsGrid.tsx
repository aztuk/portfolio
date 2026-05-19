import type { CSSProperties } from "react";

import { CaptionedCard } from "@/components/use-case/CaptionedCard";
import { ChartCardsLayout } from "@/components/use-case/ChartCardsLayout";
import { BeforeAfterBarCard } from "@/components/use-case/charts/BeforeAfterBarCard";
import type { ChartLabels } from "@/components/use-case/charts/BeforeAfterBarCard";
import { BeforeAfterCombinedKpiCard } from "@/components/use-case/charts/BeforeAfterCombinedKpiCard";
import { BarsCard } from "@/components/use-case/charts/BarsCard";
import { CombinedKpiCard } from "@/components/use-case/charts/CombinedKpiCard";
import { DurationBarsChartCard } from "@/components/use-case/charts/DurationBarsChartCard";
import { InsightChartCard } from "@/components/use-case/charts/InsightChartCard";
import { KpiProgressChartCard } from "@/components/use-case/charts/KpiProgressChartCard";
import { LineChartCard } from "@/components/use-case/charts/LineChartCard";
import { QuoteCard } from "@/components/use-case/charts/QuoteCard";
import { RankedBarsCard } from "@/components/use-case/charts/RankedBarsCard";
import { SingleKpiCard } from "@/components/use-case/charts/SingleKpiCard";
import { WorkflowMappingCard } from "@/components/use-case/charts/WorkflowMappingCard";
import type { ChartCardData, ChartVariant } from "@/content/use-cases/types";
import type { MethodologyProps } from "@/components/use-case/ChartCardShell";

const getRevealDelayStyle = (index: number, offsetMs = 0) =>
  ({ "--reveal-delay": `${offsetMs + index * 120}ms` } as CSSProperties);

type ChartCardsGridProps = {
  cards: ChartCardData[];
  labels?: ChartLabels;
  mobileClassName?: string;
  gridClassName?: string;
  itemClassName?: string;
  revealDelayOffsetMs?: number;
};

const renderChart = (chart: ChartVariant, labels?: ChartLabels, m?: MethodologyProps, caption?: string) => {
  switch (chart.type) {
    case "bars":
      return <BarsCard chart={chart} caption={caption} {...m} />;
    case "combined-kpi":
      return <CombinedKpiCard chart={chart} caption={caption} {...m} />;
    case "line":
      return <LineChartCard chart={chart} caption={caption} {...m} />;
    case "ranked-bars":
      return <RankedBarsCard chart={chart} caption={caption} {...m} />;
    case "insight":
      return <InsightChartCard chart={chart} caption={caption} />;
    case "quote":
      return <QuoteCard chart={chart} caption={caption} />;
    case "workflow-mapping":
      return <WorkflowMappingCard chart={chart} caption={caption} {...m} />;
    case "before-after-bar":
      return <BeforeAfterBarCard chart={chart} caption={caption} beforeLabel={labels?.beforeLabel ?? ""} afterLabel={labels?.afterLabel ?? ""} {...m} />;
    case "before-after-combined-kpi":
      return <BeforeAfterCombinedKpiCard chart={chart} caption={caption} beforeLabel={labels?.beforeLabel ?? ""} afterLabel={labels?.afterLabel ?? ""} {...m} />;
    case "duration-bars":
      return <DurationBarsChartCard chart={chart} caption={caption} beforeLabel={labels?.beforeLabel ?? ""} afterLabel={labels?.afterLabel ?? ""} {...m} />;
    case "kpi-progress":
      return <KpiProgressChartCard chart={chart} caption={caption} {...m} />;
    case "single-kpi":
      return <SingleKpiCard chart={chart} caption={caption} {...m} />;
  }
};

export const ChartCardsGrid = ({
  cards,
  labels,
  mobileClassName,
  gridClassName,
  itemClassName,
  revealDelayOffsetMs = 0,
}: ChartCardsGridProps) => (
  <ChartCardsLayout
    mobileClassName={mobileClassName}
    gridClassName={gridClassName}
    itemClassName={itemClassName}
  >
    {cards.map((card, index) => (
      <div
        key={index}
        className="discovery-reveal-chart w-full"
        style={getRevealDelayStyle(index, revealDelayOffsetMs)}
      >
        <CaptionedCard>
          {renderChart(card.chart, labels, { methodology: card.methodology, methodologyIcon: card.methodologyIcon }, card.caption)}
        </CaptionedCard>
      </div>
    ))}
  </ChartCardsLayout>
);
