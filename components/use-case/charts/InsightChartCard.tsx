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
  MethodologyFooter,
  TintedIconTile,
  TintedPill,
} from "@/components/use-case/charts/ChartPrimitives";
import type { InsightChartData } from "@/content/use-cases/types";

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

export const INSIGHT_METHODOLOGY_ICONS = {
  "chart-bar": ChartBarIcon,
  "clipboard-text": ClipboardTextIcon,
  flask: FlaskIcon,
} satisfies Record<InsightChartData["methodologyIcon"], typeof FlaskIcon>;

export const InsightChartCard = ({ chart }: InsightChartCardProps) => {
  const InsightIcon = INSIGHT_ICONS[chart.icon];
  const MethodologyIcon = INSIGHT_METHODOLOGY_ICONS[chart.methodologyIcon];

  return (
    <ChartCardShell className="flex flex-1 flex-col">
      <ChartCardContent variant="default" className="justify-end gap-8 p-8">
        <div className="flex items-start justify-between gap-6">
          <TintedPill color={chart.color}>{chart.label}</TintedPill>
          <TintedIconTile icon={InsightIcon} color={chart.color} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <ChartTitle>{chart.insightTitle}</ChartTitle>
          <ChartBodyText>{chart.insightDescription}</ChartBodyText>
        </div>
        <MethodologyFooter icon={MethodologyIcon} color={chart.color}>
          {chart.methodology}
        </MethodologyFooter>
      </ChartCardContent>
    </ChartCardShell>
  );
};
