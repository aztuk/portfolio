import type { ComponentType } from "react";
import {
  BracketsCurlyIcon,
  CheckCircleIcon,
  FileTextIcon,
  MapTrifoldIcon,
  NotePencilIcon,
  PackageIcon,
} from "@phosphor-icons/react/ssr";
import clsx from "clsx";

import { HighlightedText } from "@/components/shared/HighlightedText";
import type { AiPageContent } from "@/content/ai/ai-page.content";

type HandoffPackageProps = {
  content: AiPageContent["handoff"];
};

type IconComponent = ComponentType<{
  size?: number;
  weight?: "regular" | "duotone" | "bold";
  className?: string;
  "aria-hidden"?: boolean;
}>;

type HandoffVisual = {
  Icon: IconComponent;
  iconClassName: string;
  markerClassName: string;
};

const getHandoffVisual = (name: string): HandoffVisual => {
  if (name === "Memory.md") {
    return {
      Icon: NotePencilIcon,
      iconClassName: "border-primary/30 bg-primary/[0.12] text-primary",
      markerClassName: "bg-primary",
    };
  }

  if (name === "Roadmap.md") {
    return {
      Icon: MapTrifoldIcon,
      iconClassName: "border-chart-citron/30 bg-chart-citron/[0.12] text-chart-citron",
      markerClassName: "bg-chart-citron",
    };
  }

  if (name === "Validated repo") {
    return {
      Icon: BracketsCurlyIcon,
      iconClassName: "border-green/30 bg-green/[0.12] text-green",
      markerClassName: "bg-green",
    };
  }

  if (name === "Specifications.md") {
    return {
      Icon: CheckCircleIcon,
      iconClassName: "border-accent/35 bg-accent/[0.12] text-accent",
      markerClassName: "bg-accent",
    };
  }

  return {
    Icon: FileTextIcon,
    iconClassName: "border-line/15 bg-line/[0.045] text-muted",
    markerClassName: "bg-muted",
  };
};

export const HandoffPackage = ({ content }: HandoffPackageProps) => {
  return (
    <div className="grid w-full min-w-0 max-w-full gap-6 lg:grid-cols-[minmax(0,1fr)_450px] lg:items-stretch lg:gap-7">
      <div className="grid min-w-0 max-w-full gap-4 lg:gap-4">
        {content.files.map((file, index) => {
          const { Icon, iconClassName, markerClassName } = getHandoffVisual(file.name);
          const isMemory = file.name === "Memory.md";

          return (
            <article
              key={file.name}
              className={clsx(
                "group relative min-w-0 overflow-hidden rounded-[22px] border p-4 shadow-card backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 sm:p-5 lg:rounded-[24px]",
                isMemory
                  ? "border-primary/25 bg-primary/[0.075]"
                  : "border-dark-smooth bg-canvas/78",
              )}
            >
              <div className="relative z-10 flex min-w-0 items-start gap-4">
                <span
                  className={clsx(
                    "flex size-12 shrink-0 items-center justify-center rounded-[16px] border sm:size-14 sm:rounded-[18px]",
                    iconClassName,
                  )}
                >
                  <Icon size={28} weight="duotone" aria-hidden={true} />
                </span>
                <div className="min-w-0 max-w-full">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="type-body-lg-medium min-w-0 break-words text-ink">
                      {file.name}
                    </h3>
                    <span className="type-data-label-sm text-smooth">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="type-body-md mt-2 break-words whitespace-pre-line leading-7 text-muted">
                    <HighlightedText text={file.description} />
                  </p>
                </div>
              </div>
              <span
                className={clsx(
                  "absolute bottom-0 left-0 h-1 w-full opacity-70",
                  markerClassName,
                )}
                aria-hidden="true"
              />
            </article>
          );
        })}
      </div>

      <aside className="relative h-full min-w-0 max-w-full overflow-hidden rounded-[26px] border border-primary/25 bg-primary/10 p-6 shadow-card backdrop-blur-xl sm:p-7 lg:rounded-[30px] lg:p-8">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--color-primary-rgb)_/_0.12)_1px,transparent_1px)] bg-[length:26px_26px] opacity-45"
          aria-hidden="true"
        />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <span className="flex size-14 items-center justify-center rounded-[20px] border border-primary/30 bg-canvas/80 text-primary shadow-card sm:size-16 sm:rounded-[22px]">
              <PackageIcon size={32} weight="duotone" aria-hidden={true} />
            </span>
            <h3 className="type-project-title-medium mt-6 break-words text-ink sm:mt-7">
              {content.packageLabel}
            </h3>
            <p className="type-body-lg mt-4 break-words whitespace-pre-line leading-8 text-muted sm:mt-5">
              <HighlightedText text={content.packageBody} />
            </p>
          </div>

          <div className="mt-9 grid gap-3">
            {content.files.map((file) => {
              const { markerClassName } = getHandoffVisual(file.name);

              return (
                <div key={file.name} className="flex min-w-0 items-center gap-3">
                  <span
                    className={clsx("size-2.5 rounded-full", markerClassName)}
                    aria-hidden="true"
                  />
                  <span className="type-body-sm min-w-0 break-words text-smooth">
                    {file.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
};
