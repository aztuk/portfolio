import clsx from "clsx";

type RetroCardProps = {
  text: string;
  variant: "dont" | "do";
  label: string;
  className?: string;
};

export const RetroCard = ({ text, variant, label, className }: RetroCardProps) => {
  const isDont = variant === "dont";

  return (
    <div
      className={clsx(
        "relative flex flex-1 flex-col items-center justify-center",
        "border-b-8 shadow-elevation-2 backdrop-blur-[2px]",
        "min-w-0 px-6 pb-14 pt-8 sm:px-8 lg:px-12 lg:pb-16",
        isDont
          ? "border-[color:var(--color-negative)]"
          : "border-[color:var(--color-positive)]",
        className,
      )}
    >
      <p className="type-body-lg text-center text-ink">
        {text}
      </p>
      <span
        className={clsx(
          "absolute bottom-0 left-2",
          "type-retro-label whitespace-nowrap",
          isDont
            ? "text-[color:var(--color-negative)]"
            : "text-[color:var(--color-positive)]",
        )}
      >
        {label}
      </span>
    </div>
  );
};
