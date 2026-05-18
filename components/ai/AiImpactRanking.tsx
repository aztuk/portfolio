import {
  AI_IMPACT_CRITERIA,
  AI_IMPACT_SCORES,
  getAiImpactScoreTotal,
} from "@/content/ai/ai-impact.config";
import type { AiPageContent } from "@/content/ai/ai-page.content";
import { HighlightedText } from "@/components/shared/HighlightedText";
import { AiStepIcon } from "@/components/ai/AiStepIcon";

type AiImpactRankingProps = {
  content: AiPageContent["impact"];
};

const CRITERION_COLORS = {
  speedGain: "var(--color-primary)",
  qualityGain: "var(--color-chart-lime)",
  riskControl: "var(--color-chart-citron)",
} satisfies Record<(typeof AI_IMPACT_CRITERIA)[number], string>;

const MAX_IMPACT_SCORE = AI_IMPACT_CRITERIA.length * 5;

export const AiImpactRanking = ({ content }: AiImpactRankingProps) => {
  return (
    <div className="rounded-[26px] border border-dark-smooth bg-canvas/80 p-4 shadow-card backdrop-blur-xl sm:p-6 lg:rounded-[28px] lg:p-8">
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="type-project-title-medium max-w-xl text-ink">
          {content.modelLabel}
        </h3>
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          {AI_IMPACT_CRITERIA.map((criterion) => (
            <div key={criterion} className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: CRITERION_COLORS[criterion] }}
                aria-hidden="true"
              />
              <span className="type-body-xs text-smooth">
                {content.criteriaLabels[criterion]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {AI_IMPACT_SCORES.map((score) => {
          const total = getAiImpactScoreTotal(score);

          return (
            <div
              key={score.taskId}
              className="grid gap-4 rounded-[18px] border border-line/10 bg-line/[0.035] p-4 md:grid-cols-[minmax(240px,1fr)_minmax(260px,1.25fr)_76px] md:items-center"
            >
              <div className="flex min-w-0 items-start gap-4 sm:items-center sm:gap-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary sm:size-11">
                  <AiStepIcon taskId={score.taskId} size={22} />
                </span>
                <div className="min-w-0">
                  <p className="type-body-md-bold text-muted">
                    {content.taskLabels[score.taskId]}
                  </p>
                  <p className="type-body-xs mt-1 max-w-[36rem] whitespace-pre-line text-smooth">
                    <HighlightedText text={content.taskDescriptions[score.taskId]} />
                  </p>
                </div>
              </div>

              <div
                className="flex h-3 w-full overflow-hidden rounded-full bg-dark-smooth/45"
                aria-label={`${content.taskLabels[score.taskId]}: ${total} ${content.maxScoreLabel}`}
              >
                {AI_IMPACT_CRITERIA.map((criterion) => {
                  const value = score.scores[criterion];

                  return (
                    <span
                      key={criterion}
                      className="h-full border-r border-canvas/40 last:border-r-0"
                      style={{
                        width: `${(value / MAX_IMPACT_SCORE) * 100}%`,
                        backgroundColor: CRITERION_COLORS[criterion],
                      }}
                      title={`${content.criteriaLabels[criterion]}: ${value}/5`}
                    />
                  );
                })}
              </div>

              <p className="type-body-sm text-left text-smooth md:text-right">
                <span className="type-body-md-bold text-ink">{total}</span>
                <span className="text-smooth/80"> / {MAX_IMPACT_SCORE}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
