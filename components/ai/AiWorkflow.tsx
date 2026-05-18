import { AiStepIcon, getWorkflowTaskId } from "@/components/ai/AiStepIcon";
import { HighlightedText } from "@/components/shared/HighlightedText";
import type { AiPageContent } from "@/content/ai/ai-page.content";

type AiWorkflowProps = {
  steps: AiPageContent["workflow"]["steps"];
};

type WorkflowListProps = {
  items: string[];
  tone: "does" | "doesNot";
};

const WorkflowList = ({ items, tone }: WorkflowListProps) => {
  const markerClassName = tone === "does" ? "bg-primary" : "bg-chart-citron";

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={`mt-[0.65em] size-2 shrink-0 rounded-full ${markerClassName}`}
            aria-hidden="true"
          />
          <span className="type-body-md leading-7 text-muted">
            <HighlightedText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
};

export const AiWorkflow = ({ steps }: AiWorkflowProps) => {
  return (
    <div className="relative w-full">
      <div
        className="absolute bottom-10 left-7 top-10 w-px bg-dark-smooth/80 md:left-[188px]"
        aria-hidden="true"
      />
      {steps.map((step) => {
        const taskId = getWorkflowTaskId(step.title);

        return (
          <div
            key={step.title}
            className="relative grid gap-5 pb-14 pl-20 last:pb-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:pl-0 lg:pb-16"
          >
            <div className="absolute left-7 top-6 z-10 flex size-14 -translate-x-1/2 items-center justify-center md:left-[188px] md:top-8 md:size-16 lg:top-10">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-canvas text-primary shadow-card md:size-16">
                <AiStepIcon taskId={taskId} size={30} />
              </span>
            </div>

            <div className="hidden md:block" aria-hidden="true" />

            <div className="rounded-[22px] border border-dark-smooth bg-canvas/82 p-5 shadow-card backdrop-blur-xl sm:p-6 md:rounded-[24px] md:p-8 lg:p-10">
              <h3 className="type-project-title-medium text-ink md:text-[26px]">
                {step.title}
              </h3>
              <div className="mt-6 grid gap-6 lg:mt-7 lg:grid-cols-2 lg:gap-8">
                <WorkflowList items={step.whatAiDoes} tone="does" />
                <WorkflowList items={step.whatAiDoesNotDo} tone="doesNot" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
