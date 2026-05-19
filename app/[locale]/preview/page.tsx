export const dynamic = "force-dynamic";

import { ChartCardsGrid } from "@/components/use-case/ChartCardsGrid";
import type { ChartCardData } from "@/content/use-cases/types";

const primary = "var(--color-primary)";
const secondary = "var(--color-secondary)";
const accent = "var(--color-accent)";
const green = "var(--color-green)";

const PREVIEW_CARDS: ChartCardData[] = [
  {
    caption: "bars",
    chart: {
      type: "bars",
      title: "Feature adoption by segment",
      bars: [
        { label: "Power users", value: 82, color: primary, displayValue: "82%" },
        { label: "Regular users", value: 54, color: accent, displayValue: "54%" },
        { label: "Occasional", value: 31, color: secondary, displayValue: "31%" },
      ],
    },
    methodology: "Anonymized usage data",
    methodologyIcon: "chart-bar",
  },
  {
    caption: "combined-kpi",
    chart: {
      type: "combined-kpi",
      rows: [
        { title: "Task completion", description: "Users completing core flow", display: "+34%", percent: 78, variant: "primary" },
        { title: "Error rate", description: "Form validation failures", display: "−18%", percent: 22, variant: "secondary" },
      ],
    },
    methodology: "Workflow analysis",
    methodologyIcon: "clipboard-text",
  },
  {
    caption: "line",
    chart: {
      type: "line",
      title: "Weekly active sessions",
      points: [
        { label: "Jan", value: 20, color: accent },
        { label: "Feb", value: 35, color: accent },
        { label: "Mar", value: 50, color: accent },
        { label: "Apr", value: 45, color: accent },
        { label: "May", value: 72, color: primary },
        { label: "Jun", value: 88, color: primary },
      ],
    },
    methodology: "Anonymized usage data",
    methodologyIcon: "chart-bar",
  },
  {
    caption: "ranked-bars",
    chart: {
      type: "ranked-bars",
      title: "Top pain points reported",
      bars: [
        { label: "Slow load times", display: "68%", percent: 68, isPrimary: true },
        { label: "Confusing navigation", display: "52%", percent: 52, isPrimary: false },
        { label: "Missing filters", display: "41%", percent: 41, isPrimary: false },
        { label: "No bulk actions", display: "29%", percent: 29, isPrimary: false },
      ],
    },
    methodology: "User interviews (n=24) (% of users mentioning each issue)",
    methodologyIcon: "flask",
  },
  {
    caption: "insight",
    chart: {
      type: "insight",
      label: "Key finding",
      icon: "lightbulb",
      insightTitle: "Users skip the tutorial",
      insightDescription: "84% of new users dismiss onboarding within 10 seconds, then struggle with advanced features in week 2.",
      methodology: "Funnel analysis",
      methodologyIcon: "chart-bar",
      color: primary,
    },
  },
  {
    caption: "quote",
    chart: {
      type: "quote",
      quote: "I didn't realize I could bulk-export until a colleague showed me three months in.",
      personaName: "Operations manager, mid-market",
      color: green,
      methodology: "Contextual interviews",
      methodologyIcon: "flask",
    },
  },
  {
    caption: "workflow-mapping",
    chart: {
      type: "workflow-mapping",
      title: "Current approval workflow",
      steps: [
        { label: "Submit request", detail: "Via email", tone: "default" },
        { label: "Manager review", detail: "2–5 days", tone: "warning", arrowAfterTone: "warning" },
        { label: "Finance sign-off", detail: "1–3 days", tone: "warning", arrowAfterTone: "warning" },
        { label: "Execution", detail: "Same day", tone: "default" },
      ],
      frictions: [
        { label: "Bottleneck", startPercent: 25, widthPercent: 50 },
      ],
    },
    methodology: "Workflow mapping",
    methodologyIcon: "clipboard-text",
  },
  {
    caption: "before-after-bar",
    chart: {
      type: "before-after-bar",
      title: "Time to complete report",
      before: { display: "47 min", value: 47 },
      after: { display: "12 min", value: 12 },
    },
    methodology: "Timed task study (n=18)",
    methodologyIcon: "flask",
  },
  {
    caption: "before-after-combined-kpi",
    chart: {
      type: "before-after-combined-kpi",
      rows: [
        { label: "Setup time", before: { display: "45 min", percent: 90 }, after: { display: "8 min", percent: 16 } },
        { label: "Error rate", before: { display: "22%", percent: 44 }, after: { display: "4%", percent: 8 } },
      ],
    },
    methodology: "Workflow analysis",
    methodologyIcon: "clipboard-text",
  },
  {
    caption: "duration-bars",
    chart: {
      type: "duration-bars",
      title: "Task duration comparison",
      items: [
        { label: "Configure rule", before: { display: "40 min", value: 40 }, after: { display: "10 min", value: 10 } },
        { label: "Review output", before: { display: "25 min", value: 25 }, after: { display: "8 min", value: 8 } },
        { label: "Export report", before: { display: "15 min", value: 15 }, after: { display: "3 min", value: 3 } },
      ],
    },
    methodology: "Workflow estimates",
    methodologyIcon: "clipboard-text",
  },
  {
    caption: "kpi-progress",
    chart: {
      type: "kpi-progress",
      title: "Design system adoption",
      rows: [
        { label: "Components covered", display: "92%", percent: 92 },
        { label: "Teams onboarded", display: "7 / 8", percent: 87 },
        { label: "Avg. satisfaction", display: "4.6 / 5", rating: { value: 4.6, max: 5 } },
      ],
    },
    methodology: "Ticket analysis",
    methodologyIcon: "clipboard-text",
  },
  {
    caption: "single-kpi",
    chart: {
      type: "single-kpi",
      value: "−62%",
      title: "Reduction in support tickets",
      description: "After redesigning the onboarding flow, weekly tickets dropped from 130 to 50.",
    },
    methodology: "Support data",
    methodologyIcon: "chart-bar",
  },
];

type PreviewPageProps = {
  params: Promise<{ locale: string }>;
};

const PreviewPage = async ({ params }: PreviewPageProps) => {
  await params;

  return (
    <div className="min-h-screen px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="type-data-title mb-2 text-smooth">Hidden preview</p>
        <h1 className="type-display mb-12 text-ink">Chart card types</h1>
        <ChartCardsGrid
          cards={PREVIEW_CARDS}
          labels={{ beforeLabel: "Before", afterLabel: "After" }}
          mobileClassName="mt-4"
          gridClassName="lg:mt-4 lg:gap-4"
          itemClassName="flex flex-col"
        />
      </div>
    </div>
  );
};

export default PreviewPage;
