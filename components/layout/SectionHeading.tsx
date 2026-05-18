import clsx from "clsx";

import { HighlightedText } from "@/components/shared/HighlightedText";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "compact";
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  size = "default",
}: SectionHeadingProps) => {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const titleClassName =
    size === "compact"
      ? "type-section-heading-compact text-ink"
      : "type-section-heading text-ink";

  return (
    <div className={clsx("max-w-3xl", alignment)}>
      {eyebrow ? (
        <p className="type-chip mb-5 inline-flex rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-ink/60 backdrop-blur-xl">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={titleClassName}>
        {title}
      </h2>
      {description ? (
        <p className="type-body-md mt-6 max-w-2xl whitespace-pre-line text-muted md:type-body-lg">
          <HighlightedText text={description} />
        </p>
      ) : null}
    </div>
  );
};
