type DiamondBadgeProps = {
  value: string;
  color: string;
  size?: "sm" | "md";
  variant?: "transparent" | "filled";
  className?: string;
};

export const DiamondBadge = ({
  value,
  color,
  size = "md",
  variant = "transparent",
  className = "",
}: DiamondBadgeProps) => {
  const outer = variant === "filled" ? "size-[54px]" : size === "sm" ? "size-[46px]" : "size-[54px]";
  const inner = variant === "filled" ? "size-[48px]" : size === "sm" ? "size-[32px]" : "size-[40px]";
  const textClassName =
    variant === "filled"
      ? "type-chart-badge-value"
      : size === "sm"
        ? "type-data-value-sm"
        : "type-data-value";
  const textColor = variant === "filled" ? "var(--color-chart-badge-text)" : color;

  return (
    <div className={`relative flex ${outer} shrink-0 items-center justify-center ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`${inner} -rotate-45 backdrop-blur-[4px] backdrop-saturate-150 ${
            variant === "transparent" ? "bg-dark-smooth/50" : ""
          }`}
          style={{
            backgroundColor:
              variant === "filled"
                ? `color-mix(in srgb, ${color} 60%, transparent)`
                : undefined,
          }}
        />
      </div>
      <span
        className={`relative whitespace-nowrap ${textClassName}`}
        style={{ color: textColor }}
      >
        {value}
      </span>
    </div>
  );
};
