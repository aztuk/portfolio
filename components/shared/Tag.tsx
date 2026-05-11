import clsx from "clsx";
import type { ReactNode } from "react";

type TagProps = {
  label: string;
  className?: string;
  prefix?: ReactNode;
  tone?: "default" | "success" | "white" | "canvas";
};

const toneClasses = {
  default:
    "border-[var(--chip-default-border)] bg-[var(--chip-default-bg)] text-[var(--chip-default-text)]",
  success:
    "border-[var(--chip-success-border)] bg-[var(--chip-success-bg)] text-[var(--chip-success-text)]",
  white:
    "border-[var(--chip-default-border)] bg-[var(--chip-default-bg)] text-[var(--chip-default-text)]",
  canvas:
    "border-[var(--chip-canvas-border)] bg-[var(--chip-canvas-bg)] text-[var(--chip-canvas-text)]",
} satisfies Record<NonNullable<TagProps["tone"]>, string>;

export const Tag = ({ label, className, prefix, tone = "default" }: TagProps) => {
  return (
    <span
      className={clsx(
        "type-chip inline-flex max-w-full items-center justify-center gap-3 rounded-full border px-4 py-3 text-center",
        toneClasses[tone],
        className,
      )}
    >
      {prefix}
      {label}
    </span>
  );
};
