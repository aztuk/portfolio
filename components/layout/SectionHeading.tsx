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
        <p className="type-chip mb-5 inline-flex rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-ink/60 backdrop-blur-xl">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="type-section-heading text-ink">
        {title}
      </h2>
      {description ? (
        <p className="type-body-md mt-6 max-w-2xl text-muted md:type-body-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
};
