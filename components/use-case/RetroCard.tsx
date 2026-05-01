import clsx from "clsx";

type RetroCardProps = {
  text: string;
  variant: "dont" | "do";
  label: string;
};

export const RetroCard = ({ text, variant, label }: RetroCardProps) => {
  const isDont = variant === "dont";

  return (
    <div
      className={clsx(
        "relative flex flex-1 flex-col items-center justify-center",
        "bg-gradient-to-b from-[rgba(72,90,156,0.20)] to-transparent",
        "border-b-8 shadow-elevation-2 backdrop-blur-[2px]",
        "min-w-0 px-8 pb-16 pt-8 sm:px-12",
        isDont
          ? "border-[color:var(--color-negative)]"
          : "border-[color:var(--color-positive)]",
      )}
    >
      <p className="text-center font-sans text-lg font-normal leading-[1.7] tracking-[-0.04em] text-ink">
        {text}
      </p>
      <span
        className={clsx(
          "absolute bottom-1 left-1",
          "whitespace-nowrap font-display text-2xl font-light uppercase leading-[1.2]",
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
