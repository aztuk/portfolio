import clsx from "clsx";

type FigmaBadgeSize = "sm" | "md" | "lg";

type FigmaBadgeIconProps = {
  size?: FigmaBadgeSize;
};

type FigmaBadgeProps = FigmaBadgeIconProps & {
  className?: string;
};

const iconSizeClass: Record<FigmaBadgeSize, string> = {
  sm: "h-[21px] w-[14px]",
  md: "h-[42px] w-[28px]",
  lg: "h-[48px] w-[32px]",
};

const badgeSizeClass: Record<FigmaBadgeSize, string> = {
  sm: "h-8 w-8 rounded-[10px]",
  md: "h-16 w-16 rounded-2xl",
  lg: "h-[72px] w-[72px] rounded-[20px]",
};

export const FigmaBadgeIcon = ({ size = "md" }: FigmaBadgeIconProps) => (
  <svg
    viewBox="0 0 38 57"
    fill="none"
    aria-label="Figma"
    role="img"
    className={iconSizeClass[size]}
  >
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z" fill="#1ABCFE" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0Z" fill="#0ACF83" />
    <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19Z" fill="#FF7262" />
    <path d="M0 9.5a9.5 9.5 0 0 0 9.5 9.5H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#F24E1E" />
    <path d="M0 28.5a9.5 9.5 0 0 0 9.5 9.5H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#A259FF" />
  </svg>
);

export const FigmaBadge = ({ size = "md", className }: FigmaBadgeProps) => (
  <div
    className={clsx(
      "flex rotate-[-10deg] items-center justify-center bg-white shadow-card",
      badgeSizeClass[size],
      className,
    )}
  >
    <FigmaBadgeIcon size={size} />
  </div>
);
