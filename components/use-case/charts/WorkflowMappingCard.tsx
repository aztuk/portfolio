import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";

import { ChartCardShell, type MethodologyProps } from "@/components/use-case/ChartCardShell";
import {
  ChartCardContent,
  ChartMethodologyNote,
  ChartTitle,
} from "@/components/use-case/charts/ChartPrimitives";
import type { WorkflowMappingChartData, WorkflowMappingStep } from "@/content/use-cases/types";

type WorkflowMappingCardProps = { chart: WorkflowMappingChartData; caption?: string } & MethodologyProps;

const WorkflowArrow = ({ tone }: { tone?: WorkflowMappingStep["arrowAfterTone"] }) => {
  const color = tone === "warning" ? "text-negative" : "text-muted";

  return (
    <div className={`flex min-h-[51px] flex-1 items-center justify-center ${color}`}>
      <ArrowDownIcon size={22} weight="regular" className="shrink-0 lg:hidden" aria-hidden="true" />
      <ArrowRightIcon size={24} weight="regular" className="hidden shrink-0 lg:block" aria-hidden="true" />
    </div>
  );
};

const WorkflowStepItem = ({ step }: { step: WorkflowMappingStep }) => {
  const isWarning = step.tone === "warning";

  return (
    <div className="flex shrink-0 flex-col items-center justify-center gap-1 rounded-[10px]">
      <div
        className={`flex w-full items-center justify-center rounded-[10px] border p-2.5 backdrop-blur-[4px] ${
          isWarning ? "border-negative bg-negative/20" : "border-dark-smooth bg-dark-smooth/20"
        }`}
      >
        <p className="type-body-sm whitespace-nowrap text-center font-medium text-muted">{step.label}</p>
      </div>
      <p className="type-body-sm whitespace-nowrap text-center text-smooth">{step.detail}</p>
    </div>
  );
};


export const WorkflowMappingCard = ({ chart, caption, methodology, methodologyIcon }: WorkflowMappingCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <ChartCardContent variant="default" className="justify-end">
      <div className="flex flex-col">
        <ChartTitle>{chart.title}</ChartTitle>
        {caption && <p className="type-body-lg mt-1 leading-[1.7] text-smooth">{caption}</p>}
      </div>

      <div className="flex w-full flex-col items-center gap-2 lg:flex-row lg:items-start lg:gap-1">
          {chart.steps.map((step, index) => (
            <div key={step.label} className="flex w-full items-center gap-2 lg:w-auto lg:flex-1 lg:items-start lg:gap-1">
              <WorkflowStepItem step={step} />
              {index < chart.steps.length - 1 ? (
                <WorkflowArrow tone={step.arrowAfterTone} />
              ) : null}
            </div>
          ))}
      </div>
      {methodology && methodologyIcon && (
        <ChartMethodologyNote methodology={methodology} methodologyIcon={methodologyIcon} />
      )}
    </ChartCardContent>
  </ChartCardShell>
);
