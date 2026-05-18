import Image from "next/image";

import type {
  AiPageContent,
  PrototypingLoopLegendTone,
} from "@/content/ai/ai-page.content";

type PrototypingLoopSectionProps = {
  content: AiPageContent["prototypingLoop"];
};

const LegendSwatch = ({ tone }: { tone: PrototypingLoopLegendTone }) => {
  if (tone === "protocol") {
    return (
      <span className="flex w-9 items-center" aria-hidden="true">
        <span className="h-1 w-full rounded-full bg-accent" />
      </span>
    );
  }

  if (tone === "human") {
    return (
      <span
        className="h-5 w-9 rounded-full border-2 border-primary bg-primary/15"
        aria-hidden="true"
      />
    );
  }

  if (tone === "file") {
    return (
      <span
        className="h-6 w-5 rounded-[5px] border border-dark-smooth bg-paper"
        aria-hidden="true"
      />
    );
  }

  if (tone === "design") {
    return (
      <span
        className="grid size-6 place-items-center rounded-[7px] border border-primary/35 bg-primary/10"
        aria-hidden="true"
      >
        <span className="size-2.5 rounded-full bg-primary" />
      </span>
    );
  }

  if (tone === "code") {
    return (
      <span
        className="h-5 w-8 rounded-[6px] border border-green/35 bg-green/20"
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className="h-5 w-8 rounded-[6px] border border-negative/35 bg-negative/20"
      aria-hidden="true"
    />
  );
};

export const PrototypingLoopSection = ({
  content,
}: PrototypingLoopSectionProps) => {
  return (
    <div className="overflow-hidden rounded-[26px] border border-dark-smooth bg-canvas/80 shadow-card backdrop-blur-xl lg:rounded-[28px]">
      <div className="relative overflow-x-auto overflow-y-hidden bg-paper p-6 sm:p-8 md:p-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--color-line-rgb)_/_0.14)_1px,transparent_1px)] bg-[length:28px_28px] opacity-40"
          aria-hidden="true"
        />
        <Image
          src="/assets/AIworkflow.png"
          alt={content.title}
          width={3710}
          height={2976}
          sizes="(min-width: 1280px) 1180px, calc(100vw - 40px)"
          className="relative h-auto w-full min-w-[720px] rounded-[18px] md:min-w-0 md:rounded-[20px]"
        />
      </div>

      <div className="border-t border-dark-smooth px-5 py-5 sm:px-8 md:px-12 md:py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div
            className="grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center"
            role="list"
            aria-label="Diagram legend"
          >
            {content.legend.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-full border border-line/10 bg-line/[0.035] px-3 py-2"
                role="listitem"
              >
                <LegendSwatch tone={item.tone} />
                <span className="type-body-sm text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
