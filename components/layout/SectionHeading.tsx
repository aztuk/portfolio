import clsx from "clsx";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) => {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={clsx("max-w-3xl", alignment)}>
      {eyebrow ? (
        <p className="mb-5 inline-flex rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-ink/60 backdrop-blur-xl">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl leading-[0.94] tracking-[-0.04em] text-ink md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
};
