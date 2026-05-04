import clsx from "clsx";
import type { ReactNode } from "react";

type TagProps = {
  label: string;
  className?: string;
  prefix?: ReactNode;
  tone?: "default" | "success";
};

const toneClasses = {
  default: "border-white/10 bg-white/[0.06] text-ink",
  success: "border-green/25 bg-green/10 text-green/85",
} satisfies Record<NonNullable<TagProps["tone"]>, string>;

export const Tag = ({ label, className, prefix, tone = "default" }: TagProps) => {
  return (
    <span
      className={clsx(
        "type-chip inline-flex max-w-full items-center justify-center gap-3 rounded-[18px] border px-3 py-3 text-center",
        toneClasses[tone],
        className,
      )}
    >
      {prefix}
      {label}
    </span>
  );
};
