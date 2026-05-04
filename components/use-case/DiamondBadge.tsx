const DIAMOND_BORDER = "#364781";

type DiamondBadgeProps = {
  value: string;
  color: string;
  size?: "sm" | "md";
  className?: string;
};

export const DiamondBadge = ({ value, color, size = "md", className = "" }: DiamondBadgeProps) => {
  const outer = size === "sm" ? "size-[46px]" : "size-[54px]";
  const inner = size === "sm" ? "size-[32px]" : "size-[38px]";
  const textClassName = size === "sm" ? "type-data-value-sm" : "type-data-value";

  return (
    <div className={`relative flex ${outer} shrink-0 items-center justify-center ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`${inner} -rotate-45 border-2 bg-dark-smooth/50 backdrop-blur-[16px] backdrop-saturate-150`}
          style={{ borderColor: DIAMOND_BORDER }}
        />
      </div>
      <span
        className={`relative whitespace-nowrap ${textClassName}`}
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
};
