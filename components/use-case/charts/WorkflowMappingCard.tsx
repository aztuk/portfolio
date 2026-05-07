import { ArrowDownIcon, ArrowRightIcon, DiamondIcon } from "@phosphor-icons/react/ssr";

import { ChartCardShell } from "@/components/use-case/ChartCardShell";
import {
  ChartCardContent,
  ChartTitle,
} from "@/components/use-case/charts/ChartPrimitives";
import type { WorkflowMappingChartData, WorkflowMappingStep } from "@/content/use-cases/types";

type WorkflowMappingCardProps = { chart: WorkflowMappingChartData };

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
        className={`flex w-full items-center justify-center rounded-[10px] border-2 p-2.5 backdrop-blur-[4px] ${
          isWarning ? "border-negative bg-negative/50" : "border-dark bg-dark/50"
        }`}
      >
        <p className="type-body-lg-medium whitespace-nowrap text-center text-muted">{step.label}</p>
      </div>
      <p className="type-control whitespace-nowrap text-center text-smooth">{step.detail}</p>
    </div>
  );
};

const WarningLabel = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center gap-1 text-center text-negative">
    <DiamondIcon size={18} weight="regular" className="shrink-0" aria-hidden="true" />
    <p className="type-control whitespace-nowrap">{label}</p>
  </div>
);

export const WorkflowMappingCard = ({ chart }: WorkflowMappingCardProps) => (
  <ChartCardShell className="flex flex-1 flex-col">
    <ChartCardContent variant="default" className="justify-end gap-8 p-6 sm:p-8 lg:p-8">
      <ChartTitle>{chart.title}</ChartTitle>

      <div className="flex w-full flex-col items-start justify-center gap-6">
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

        <div className="relative w-full pb-9">
          <div className="h-4 w-full rounded-[30px] border border-dark bg-dark-smooth" />
          {chart.frictions.map((friction) => (
            <div
              key={friction.label}
              className="absolute top-0 h-4 rounded-[30px] border-2 border-dark-smooth bg-negative"
              style={{
                left: `${friction.startPercent}%`,
                width: `${friction.widthPercent}%`,
              }}
            />
          ))}
          {chart.frictions.map((friction) => (
            <div
              key={`${friction.label}-label`}
              className="absolute top-[22px] -translate-x-1/2"
              style={{ left: `${friction.startPercent + friction.widthPercent / 2}%` }}
            >
              <WarningLabel label={friction.label} />
            </div>
          ))}
        </div>
      </div>
    </ChartCardContent>
  </ChartCardShell>
);
