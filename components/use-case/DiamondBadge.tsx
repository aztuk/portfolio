import type { CSSProperties } from "react";
import clsx from "clsx";

type DiamondBadgeProps = {
  value?: string;
  color?: string;
  size?: "xs" | "sm" | "md";
  variant?: "transparent" | "filled" | "outline" | "custom";
  className?: string;
  outerClassName?: string;
  diamondClassName?: string;
  textClassName?: string;
  diamondStyle?: CSSProperties;
  "aria-hidden"?: boolean;
};

export const DiamondBadge = ({
  value,
  color = "var(--color-primary)",
  size = "md",
  variant = "transparent",
  className = "",
  outerClassName = "",
  diamondClassName = "",
  textClassName: customTextClassName = "",
  diamondStyle,
  "aria-hidden": ariaHidden,
}: DiamondBadgeProps) => {
  const outer =
    variant === "filled"
      ? "size-[54px]"
      : size === "xs"
        ? "size-[15.556px]"
        : size === "sm"
          ? "size-[46px]"
          : "size-[54px]";
  const inner =
    diamondClassName
      ? ""
      : variant === "filled"
      ? "size-[48px]"
      : size === "xs"
        ? "size-[11px]"
        : size === "sm"
          ? "size-[32px]"
          : "size-[40px]";
  const baseTextClassName =
    variant === "filled"
      ? "type-chart-badge-value"
      : size === "xs"
        ? ""
        : size === "sm"
          ? "type-data-value-sm"
          : "type-data-value";
  const textColor = variant === "filled" ? "var(--color-chart-badge-text)" : color;

  return (
    <div
      className={clsx(
        "relative flex shrink-0 items-center justify-center",
        outer,
        outerClassName,
        className,
      )}
      aria-hidden={ariaHidden}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={clsx(
            "-rotate-45 backdrop-blur-[10px] backdrop-saturate-150",
            inner,
            variant === "transparent" && "bg-dark-smooth/50",
            variant === "outline" && "border border-smooth",
            diamondClassName,
          )}
          style={{
            ...(variant === "filled"
              ? { backgroundColor: `color-mix(in srgb, ${color} 60%, transparent)` }
              : {}),
            ...diamondStyle,
          }}
        />
      </div>
      {value ? (
        <span
          className={clsx("relative whitespace-nowrap", baseTextClassName, customTextClassName)}
          style={{ color: textColor }}
        >
          {value}
        </span>
      ) : null}
    </div>
  );
};
