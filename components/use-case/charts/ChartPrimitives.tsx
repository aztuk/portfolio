import type { ComponentType, CSSProperties, ReactNode } from "react";

type Align = "left" | "center";

type ChartCardContentProps = {
  children: ReactNode;
  variant?: "default" | "centered" | "bottom" | "compact";
  className?: string;
};

const contentVariants: Record<NonNullable<ChartCardContentProps["variant"]>, string> = {
  default: "gap-6 p-5 lg:gap-8 lg:p-8",
  centered: "items-center justify-center gap-6 px-5 pb-6 pt-10 sm:px-8 lg:px-12 lg:pb-8 lg:pt-12",
  bottom: "justify-end gap-6 px-5 pb-6 pt-10 sm:px-8 lg:gap-8 lg:px-12 lg:pb-8 lg:pt-12",
  compact: "gap-5 p-5 lg:gap-6 lg:p-8",
};

export const ChartCardContent = ({
  children,
  variant = "default",
  className = "",
}: ChartCardContentProps) => (
  <div className={`flex flex-1 flex-col ${contentVariants[variant]} ${className}`}>
    {children}
  </div>
);

type ChartTitleProps = {
  children: ReactNode;
  align?: Align;
  tone?: "muted" | "inherit";
  className?: string;
};

export const ChartTitle = ({
  children,
  align = "left",
  tone = "muted",
  className = "",
}: ChartTitleProps) => (
  <p
    className={`type-data-title type-chart-title type-chart-title-mobile w-full ${
      tone === "muted" ? "text-muted" : ""
    } ${
      align === "center" ? "text-center" : ""
    } ${className}`}
  >
    {children}
  </p>
);

type ChartBodyTextProps = {
  children: ReactNode;
  tone?: "smooth" | "ink" | "muted" | "inherit";
  className?: string;
};

const bodyTextToneClasses: Record<NonNullable<ChartBodyTextProps["tone"]>, string> = {
  smooth: "text-smooth",
  ink: "text-ink",
  muted: "text-muted",
  inherit: "",
};

export const getTintedSurface = (color: string, amount = 15) => {
  const varMatch = color.match(/var\(--(.+?)\)/);
  if (varMatch) {
    return `rgb(var(--${varMatch[1]}-rgb) / ${amount / 100})`;
  }
  return `color-mix(in srgb, ${color} ${amount}%, transparent)`;
};

export const ChartBodyText = ({
  children,
  tone = "smooth",
  className = "",
}: ChartBodyTextProps) => (
  <p className={`type-body-lg ${bodyTextToneClasses[tone]} ${className}`}>{children}</p>
);

type ChartValueProps = {
  children: ReactNode;
  color?: string;
  className?: string;
};

export const ChartValue = ({ children, color, className = "" }: ChartValueProps) => (
  <span
    className={`type-data-value shrink-0 whitespace-nowrap ${className}`}
    style={color ? { color } : undefined}
  >
    {children}
  </span>
);

type ChartCaptionProps = {
  children: ReactNode;
  className?: string;
};

export const ChartCaption = ({ children, className = "" }: ChartCaptionProps) => (
  <p className={`type-body-lg w-full text-center text-smooth ${className}`}>
    {children}
  </p>
);

type ChartDividerProps = {
  className?: string;
};

export const ChartDivider = ({ className = "" }: ChartDividerProps) => (
  <div className={`h-0.5 w-full shrink-0 bg-dark-smooth ${className}`} />
);

export const ChartAxisLine = ChartDivider;

type ProgressBarProps = {
  percent: number;
  color: string;
  size?: "sm" | "md";
  className?: string;
};

export const ProgressBar = ({ percent, color, size = "md", className = "" }: ProgressBarProps) => (
  <div className={`w-full rounded-[20px] border border-dark bg-dark p-px ${className}`}>
    <div
      className={`${size === "sm" ? "h-2" : "h-3"} rounded-[20px]`}
      style={{ width: `${percent}%`, backgroundColor: color }}
    />
  </div>
);

type AxisLabelProps = {
  children: ReactNode;
  color?: string;
  size?: "sm" | "md";
  className?: string;
  style?: CSSProperties;
};

export const AxisLabel = ({
  children,
  color,
  size = "md",
  className = "",
  style,
}: AxisLabelProps) => (
  <span
    className={`${size === "sm" ? "type-data-label-sm" : "type-chart-axis-label"} text-center ${className}`}
    style={{ ...style, ...(color ? { color } : {}) }}
  >
    {children}
  </span>
);

type TintedPillProps = {
  children: ReactNode;
  color: string;
  className?: string;
};

export const TintedPill = ({ children, color, className = "" }: TintedPillProps) => {
  const surface = getTintedSurface(color);

  return (
    <div
      className={`rounded-[18px] p-3 ${className}`}
      style={{ backgroundColor: surface, border: `1px solid ${surface}` }}
    >
      <span className="type-data-label whitespace-nowrap" style={{ color }}>
        {children}
      </span>
    </div>
  );
};

type TintedIconTileProps = {
  icon: ComponentType<{ size?: number; weight?: "duotone"; "aria-hidden"?: boolean }>;
  color: string;
  className?: string;
};

export const TintedIconTile = ({ icon: Icon, color, className = "" }: TintedIconTileProps) => {
  const surface = getTintedSurface(color);

  return (
    <div
      className={`flex size-[64px] shrink-0 items-center justify-center rounded-[18px] backdrop-blur-[4px] ${className}`}
      style={{ backgroundColor: surface, border: `1px solid ${surface}`, color }}
    >
      <Icon size={32} weight="duotone" aria-hidden={true} />
    </div>
  );
};

type MethodologyFooterProps = {
  icon: ComponentType<{ size?: number; weight?: "regular"; className?: string; style?: CSSProperties; "aria-hidden"?: boolean }>;
  color: string;
  children: ReactNode;
  className?: string;
  textClassName?: string;
};

export const MethodologyFooter = ({
  icon: Icon,
  color,
  children,
  className = "",
  textClassName = "",
}: MethodologyFooterProps) => (
  <div className={`flex items-center gap-4 border-t border-dark-smooth pt-4 ${className}`}>
    <Icon
      size={24}
      weight="regular"
      className="shrink-0"
      style={{ color }}
      aria-hidden={true}
    />
    <p className={`type-body-lg ${textClassName}`} style={{ color }}>
      {children}
    </p>
  </div>
);

type MetricProgressRowProps = {
  label: ReactNode;
  value: ReactNode;
  percent?: number;
  color: string;
  labelPosition?: "top" | "bottom";
  labelClassName?: string;
  className?: string;
};

export const MetricProgressRow = ({
  label,
  value,
  percent,
  color,
  labelPosition = "top",
  labelClassName = "type-body-lg text-smooth",
  className = "",
}: MetricProgressRowProps) => {
  const labelRow = (
    <div className="flex items-baseline justify-between gap-4">
      <span className={labelClassName}>{label}</span>
      <ChartValue color={color}>{value}</ChartValue>
    </div>
  );

  const progress = typeof percent === "number" ? (
    <ProgressBar percent={percent} color={color} size="sm" />
  ) : null;

  return (
    <div className={`flex flex-col gap-[2px] ${className}`}>
      {labelPosition === "top" ? labelRow : progress}
      {labelPosition === "top" ? progress : labelRow}
    </div>
  );
};

type VerticalBarProps = {
  color: string;
  className?: string;
  radiusClassName?: string;
};

export const VerticalBar = ({
  color,
  className = "",
  radiusClassName = "rounded-tl-[11px] rounded-tr-[11px]",
}: VerticalBarProps) => (
  <div
    className={`w-full flex-1 ${radiusClassName} ${className}`}
    style={{ backgroundColor: color }}
  />
);
