export type ProjectType = "mobile" | "web" | "mobile et web";

export type MediaFormat = "web" | "mobile";

export type ImageAsset = {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  format?: MediaFormat;
  protected?: boolean;
};

export type VideoAsset = {
  type: "video";
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
  format?: MediaFormat;
  protected?: boolean;
};

export type FigmaAsset = {
  type: "figma";
  src: string;
  caption?: string;
  title?: string;
  format?: MediaFormat;
  mode?: "prototype" | "file";
  pages?: {
    label: string;
    src: string;
  }[];
  /** Static screenshot shown as thumbnail and as lightbox fallback when the iframe fails to load */
  poster?: string;
  protected?: boolean;
  /** Overlays a transparent blocker so the embed displays as a static preview with no navigation */
  disableInteraction?: boolean;
};

export type MediaAsset = ImageAsset | VideoAsset;

export type GalleryItem = ImageAsset | VideoAsset | FigmaAsset;

export type TensionPoint = {
  label: string;
  value: string;
  bullets?: string[];
};

// ─── Chart data types ─────────────────────────────────────────────────────────

export type VerticalBarItem = {
  label: string;
  value: number;
  color: string;
  displayValue?: string;
};

export type BarsChartData = {
  type: "bars";
  title?: string;
  bars: VerticalBarItem[];
};

export type CombinedKpiRow = {
  title: string;
  description: string;
  display: string;
  percent: number;
  variant: "primary" | "secondary";
};

export type CombinedKpiChartData = {
  type: "combined-kpi";
  rows: CombinedKpiRow[];
};

export type LineChartPoint = {
  label: string;
  value: number;
  color: string;
};

export type LineChartData = {
  type: "line";
  title: string;
  points: LineChartPoint[];
};

export type RankedBarItem = {
  label: string;
  display: string;
  percent: number;
  isPrimary: boolean;
};

export type RankedBarsChartData = {
  type: "ranked-bars";
  title: string;
  subtitle?: string;
  bars: RankedBarItem[];
};

export type SingleKpiChartData = {
  type: "single-kpi";
  value: string;
  title: string;
  description: string;
};

export type InsightIconName = "piggy-bank" | "lightbulb" | "users-three" | "calendar-dots" | "clipboard-list" | "check-badge" | "shield-check" | "chart-pie" | "chart-bar" | "flask" | "clipboard-text";

export type InsightMethodologyIconName = "flask" | "clipboard-text" | "chart-bar";

export type QuoteChartData = {
  type: "quote";
  quote: string;
  personaName: string;
  color: string;
  methodology: string;
  methodologyIcon: InsightMethodologyIconName;
};

export type InsightChartData = {
  type: "insight";
  label: string;
  icon: InsightIconName;
  insightTitle: string;
  insightDescription: string;
  methodology: string;
  methodologyIcon: InsightMethodologyIconName;
  color: string;
};

export type WorkflowMappingStep = {
  label: string;
  detail: string;
  tone?: "default" | "warning";
  arrowAfterTone?: "default" | "warning";
};

export type WorkflowMappingFriction = {
  label: string;
  startPercent: number;
  widthPercent: number;
};

export type WorkflowMappingChartData = {
  type: "workflow-mapping";
  title: string;
  steps: WorkflowMappingStep[];
  frictions: WorkflowMappingFriction[];
};

export type BeforeAfterBarChartData = {
  type: "before-after-bar";
  title: string;
  before: { display: string; value: number };
  after: { display: string; value: number };
};

export type BeforeAfterCombinedKpiRow = {
  label: string;
  before: { display: string; percent: number };
  after: { display: string; percent: number };
};

export type BeforeAfterCombinedKpiChartData = {
  type: "before-after-combined-kpi";
  rows: BeforeAfterCombinedKpiRow[];
};

export type DurationBarItem = {
  label: string;
  before: { display: string; value: number };
  after: { display: string; value: number };
};

export type DurationBarsChartData = {
  type: "duration-bars";
  items: DurationBarItem[];
};

export type KpiProgressRow = {
  label: string;
  display: string;
  percent?: number;
  rating?: { value: number; max: number };
};

export type KpiProgressChartData = {
  type: "kpi-progress";
  title: string;
  rows: KpiProgressRow[];
};

// ─── Unified chart variant ────────────────────────────────────────────────────

export type ChartVariant =
  | BarsChartData
  | CombinedKpiChartData
  | LineChartData
  | RankedBarsChartData
  | InsightChartData
  | QuoteChartData
  | WorkflowMappingChartData
  | BeforeAfterBarChartData
  | BeforeAfterCombinedKpiChartData
  | DurationBarsChartData
  | KpiProgressChartData
  | SingleKpiChartData;

export type ChartCardData = {
  chart: ChartVariant;
  caption?: string;
};

// ─── Section data types ───────────────────────────────────────────────────────

export type TensionSectionData = {
  title: string;
  summary?: string;
  tensions: TensionPoint[];
  coreQuestion: string;
  discoverySignals?: string[];
  artifacts?: ImageAsset[];
  artifact?: ImageAsset;
  artifactCaption?: string;
  chartCards?: ChartCardData[];
};

export type RetrospectiveItem = {
  dont: string;
  do: string;
};

export type RetrospectiveSectionData = {
  title: string;
  summary?: string;
  dontLabel?: string;
  doLabel?: string;
  items: RetrospectiveItem[];
};

export type ExploredSolution = {
  id: string;
  title: string;
  summary: string;
  pros: string[];
  cons: string[];
  media?: GalleryItem
};

export type SelectedSolutionId = string | string[];

export type KeyDecision = {
  id: string;
  eyebrow: string;
  title: string;
  summary?: string;
  media: GalleryItem;
  gallery: GalleryItem[];
  avoidedCost: string[];
  acceptedCost: string[];
};

export type SolutionSectionData = {
  title: string;
  exploredSolutions: ExploredSolution[];
  selectedSolutionId: SelectedSolutionId;
  gallery?: GalleryItem[];
  keyDecisions?: KeyDecision[];
};

export type ImpactBullet = {
  bold: string;
  regular: string;
};

export type ImpactSectionData = {
  title: string;
  summary: string;
  bullets: ImpactBullet[];
  charts: ChartCardData[];
};

export type UseCase = {
  title: string;
  slug: string;
  protected?: boolean;
  overview: string;
  challenge: string;
  roles: { owned: string[]; contributed: string[] };
  year: string;
  timeline: string;
  tools: string[];
  tags: string[];
  projectType: ProjectType;
  previewImage: ImageAsset;
  previewVideo?: VideoAsset;
  previewRatio?: string;
  resultHero?: GalleryItem;
  tension: TensionSectionData;
  solution: SolutionSectionData;
  impactSection?: ImpactSectionData;
  retrospective?: RetrospectiveSectionData;
  relatedUseCaseSlugs: string[];
};
