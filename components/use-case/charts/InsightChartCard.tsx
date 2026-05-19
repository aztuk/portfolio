import type { CSSProperties } from "react";
import {
  CalendarDotsIcon,
  ChartBarIcon,
  ChartPieIcon,
  ClipboardTextIcon,
  FlaskIcon,
  LightbulbIcon,
  ListIcon,
  PiggyBankIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";

import { ChartCardShell } from "@/components/use-case/ChartCardShell";
import {
  ChartBodyText,
  ChartCardContent,
  ChartTitle,
  METHODOLOGY_ICONS,
  MethodologyFooter,
  TintedIconTile,
  TintedPill,
} from "@/components/use-case/charts/ChartPrimitives";
import type { InsightChartData } from "@/content/use-cases/types";

type InsightChartCardProps = { chart: InsightChartData; caption?: string };

type InsightColorStyle = CSSProperties & {
  "--theme-chart-color-dark": string;
  "--theme-chart-color-light": string;
};

const insightColor = "var(--theme-chart-color)";

const getInsightColorStyle = (color: InsightChartData["color"]): InsightColorStyle => {
  const darkColor = typeof color === "string" ? color : color.dark;
  const lightColor = typeof color === "string" ? color : color.light;

  return {
    "--theme-chart-color-dark": darkColor,
    "--theme-chart-color-light": lightColor,
  };
};

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

export const InsightChartCard = ({ chart }: InsightChartCardProps) => {
  const InsightIcon = INSIGHT_ICONS[chart.icon];
  const MethodologyIcon = METHODOLOGY_ICONS[chart.methodologyIcon];

  return (
    <ChartCardShell
      className="theme-chart-color-scope flex flex-1 flex-col"
      style={getInsightColorStyle(chart.color)}
    >
      <ChartCardContent variant="default" className="justify-end">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-6">
            <TintedPill color={insightColor}>{chart.label}</TintedPill>
            <TintedIconTile icon={InsightIcon} color={insightColor} />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <ChartTitle>{chart.insightTitle}</ChartTitle>
          <ChartBodyText>{chart.insightDescription}</ChartBodyText>
        </div>
        <MethodologyFooter icon={MethodologyIcon} color={insightColor}>
          {chart.methodology}
        </MethodologyFooter>
      </ChartCardContent>
    </ChartCardShell>
  );
};
