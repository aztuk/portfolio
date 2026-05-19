import {
  AI_IMPACT_ASSESSMENTS,
  AI_IMPACT_CRITERIA,
} from "@/content/ai/ai-impact.config";
import type { AiImpactCriterionId, AiImpactLevel } from "@/content/ai/ai-impact.config";
import type { AiPageContent } from "@/content/ai/ai-page.content";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { AiStepIcon } from "@/components/ai/AiStepIcon";
import clsx from "clsx";

type AiImpactRankingProps = {
  content: AiPageContent["impact"];
};

const LEVEL_VISUALS = {
  low: {
    icon: "○",
    className: "border-line/10 bg-line/[0.025] text-smooth/70",
    iconClassName: "opacity-45",
  },
  medium: {
    icon: "◐",
    className: "border-accent/25 bg-accent/[0.075] text-muted",
    iconClassName: "opacity-75",
  },
  high: {
    icon: "●",
    className: "border-primary/35 bg-primary/[0.12] text-ink",
    iconClassName: "opacity-100",
  },
} satisfies Record<
  AiImpactLevel,
  {
    icon: string;
    className: string;
    iconClassName: string;
  }
>;

type QualitativeBadgeProps = {
  criterion: AiImpactCriterionId;
  level: AiImpactLevel;
  content: AiPageContent["impact"];
};

const QualitativeBadge = ({
  criterion,
  level,
  content,
}: QualitativeBadgeProps) => {
  const visual = LEVEL_VISUALS[level];

  return (
    <div
      className={clsx(
        "flex min-w-0 items-center justify-center rounded-full border px-3 py-2 text-center",
        visual.className,
      )}
      aria-label={`${content.criteriaLabels[criterion]}: ${content.levelLabels[level]}`}
    >
      <span className="inline-flex shrink-0 items-center gap-1.5">
        <span
          className={clsx("type-body-xs leading-none", visual.iconClassName)}
          aria-hidden="true"
        >
          {visual.icon}
        </span>
        <span className="type-body-xs">{content.levelLabels[level]}</span>
      </span>
    </div>
  );
};

export const AiImpactRanking = ({ content }: AiImpactRankingProps) => {
  return (
    <div className="rounded-[26px] border border-dark-smooth bg-canvas/80 p-4 shadow-card backdrop-blur-xl sm:p-6 lg:rounded-[28px] lg:p-8">
      <div className="mb-7 max-w-3xl">
        <h3 className="type-project-title-medium text-ink">{content.modelLabel}</h3>
        <p className="type-body-md mt-3 leading-7 text-smooth">
          {content.explanation}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid gap-4 px-4 lg:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.2fr)]">
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="grid min-w-0 grid-cols-3 gap-2">
            {AI_IMPACT_CRITERIA.map((criterion) => (
              <p
                key={criterion}
                className="type-data-label-sm text-center text-smooth"
              >
                {content.criteriaLabels[criterion]}
              </p>
            ))}
          </div>
        </div>

        {AI_IMPACT_ASSESSMENTS.map((assessment) => (
          <div
            key={assessment.taskId}
            className="grid gap-4 rounded-[18px] border border-line/10 bg-line/[0.035] p-4 lg:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.2fr)] lg:items-center"
          >
            <div className="flex min-w-0 items-start gap-4 sm:items-center sm:gap-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary sm:size-11">
                <AiStepIcon taskId={assessment.taskId} size={22} />
              </span>
              <div className="min-w-0">
                <p className="type-body-md-bold text-muted">
                  {content.taskLabels[assessment.taskId]}
                </p>
                <p className="type-body-xs mt-1 max-w-[34rem] whitespace-pre-line text-smooth">
                  <HighlightedText
                    text={content.taskDescriptions[assessment.taskId]}
                  />
                </p>
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-3 gap-2">
              {AI_IMPACT_CRITERIA.map((criterion) => (
                <div key={criterion} className="min-w-0">
                  <QualitativeBadge
                    criterion={criterion}
                    level={assessment.levels[criterion]}
                    content={content}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
