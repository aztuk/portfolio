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

type ChartCardsGridProps = {
  cards: ChartCardData[];
  labels?: ChartLabels;
  mobileClassName?: string;
  gridClassName?: string;
  itemClassName?: string;
};

const renderChart = (chart: ChartVariant, labels?: ChartLabels) => {
  switch (chart.type) {
    case "bars":
      return <BarsCard chart={chart} />;
    case "combined-kpi":
      return <CombinedKpiCard chart={chart} />;
    case "line":
      return <LineChartCard chart={chart} />;
    case "ranked-bars":
      return <RankedBarsCard chart={chart} />;
    case "insight":
      return <InsightChartCard chart={chart} />;
    case "quote":
      return <QuoteCard chart={chart} />;
    case "workflow-mapping":
      return <WorkflowMappingCard chart={chart} />;
    case "before-after-bar":
      return <BeforeAfterBarCard chart={chart} beforeLabel={labels?.beforeLabel ?? ""} afterLabel={labels?.afterLabel ?? ""} />;
    case "before-after-combined-kpi":
      return <BeforeAfterCombinedKpiCard chart={chart} beforeLabel={labels?.beforeLabel ?? ""} afterLabel={labels?.afterLabel ?? ""} />;
    case "duration-bars":
      return <DurationBarsChartCard chart={chart} beforeLabel={labels?.beforeLabel ?? ""} afterLabel={labels?.afterLabel ?? ""} />;
    case "kpi-progress":
      return <KpiProgressChartCard chart={chart} />;
    case "single-kpi":
      return <SingleKpiCard chart={chart} />;
  }
};

export const ChartCardsGrid = ({
  cards,
  labels,
  mobileClassName,
  gridClassName,
  itemClassName,
}: ChartCardsGridProps) => (
  <ChartCardsLayout
    mobileClassName={mobileClassName}
    gridClassName={gridClassName}
    itemClassName={itemClassName}
  >
    {cards.map((card, index) => (
      <CaptionedCard key={index} caption={card.caption}>
        {renderChart(card.chart, labels)}
      </CaptionedCard>
    ))}
  </ChartCardsLayout>
);
