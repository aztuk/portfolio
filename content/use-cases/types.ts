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
  poster: string;
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
};

export type MediaAsset = ImageAsset | VideoAsset;

export type GalleryItem = ImageAsset | VideoAsset | FigmaAsset;

export type TensionPoint = {
  label: string;
  value: string;
  bullets?: string[];
};

export type VerticalBarItem = {
  label: string;
  value: number;
  color: string;
};

export type VerticalBarsChartData = {
  type: "vertical-bars";
  bars: VerticalBarItem[];
};

export type DualProgressRow = {
  title: string;
  description: string;
  display: string;
  percent: number;
  variant: "primary" | "secondary";
};

export type DualProgressChartData = {
  type: "dual-progress";
  rows: DualProgressRow[];
};

export type LineChartPoint = {
  label: string;
  value: number;
  color: string;
};

export type LineChartData = {
  type: "line";
  points: LineChartPoint[];
};

export type RankedBarItem = {
  label: string;
  value: number;
  percent: number;
  isPrimary: boolean;
};

export type RankedBarsChartData = {
  type: "ranked-bars";
  title: string;
  bars: RankedBarItem[];
};

export type CountBarItem = {
  label: string;
  value: number;
  percent: number;
  isPrimary: boolean;
};

export type CountBarsChartData = {
  type: "count-bars";
  title: string;
  subtitle: string;
  bars: CountBarItem[];
};

export type SingleKpiChartData = {
  type: "single-kpi";
  value: string;
  title: string;
  description: string;
};

export type InsightIconName = "piggy-bank" | "lightbulb" | "users-three";

export type InsightMethodologyIconName = "flask" | "clipboard-text" | "chart-bar";

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

export type TensionChartVariant =
  | VerticalBarsChartData
  | DualProgressChartData
  | LineChartData
  | RankedBarsChartData
  | CountBarsChartData
  | SingleKpiChartData
  | InsightChartData;

type CaptionedTensionChartVariant = Exclude<TensionChartVariant, InsightChartData>;

export type TensionChartCard =
  | {
      chart: CaptionedTensionChartVariant;
      caption: string;
    }
  | {
      chart: InsightChartData;
    };

export type TensionSectionData = {
  title: string;
  summary?: string;
  tensions: TensionPoint[];
  coreQuestion: string;
  discoverySignals?: string[];
  artifacts?: ImageAsset[];
  artifact?: ImageAsset;
  artifactCaption?: string;
  chartCards?: TensionChartCard[];
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
};

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
  selectedSolutionId: string;
  gallery?: GalleryItem[];
  keyDecisions?: KeyDecision[];
};

export type ImpactBullet = {
  bold: string;
  regular: string;
};

export type BarChartData = {
  type: "bar";
  title: string;
  before: { display: string; value: number };
  after: { display: string; value: number };
  caption?: string;
};

export type ProgressRow = {
  label: string;
  before: { display: string; percent: number };
  after: { display: string; percent: number };
};

export type ProgressChartData = {
  type: "progress";
  rows: ProgressRow[];
  caption?: string;
};

export type DurationBarItem = {
  label: string;
  before: { display: string; value: number };
  after: { display: string; value: number };
};

export type DurationBarsChartData = {
  type: "duration-bars";
  items: DurationBarItem[];
  caption?: string;
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
  caption?: string;
};

export type ImpactChart =
  | BarChartData
  | ProgressChartData
  | DurationBarsChartData
  | KpiProgressChartData;

export type ImpactSectionData = {
  title: string;
  summary: string;
  bullets: ImpactBullet[];
  charts: ImpactChart[];
};

export type UseCase = {
  title: string;
  slug: string;
  protected?: boolean;
  overview: string;
  challenge: string;
  roles: string[];
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
