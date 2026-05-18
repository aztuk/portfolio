import {
  ChatCircleTextIcon,
  CompassIcon,
  CursorClickIcon,
  FileTextIcon,
  FlaskIcon,
  MagnifyingGlassIcon,
  ScalesIcon,
  SparkleIcon,
  TreeStructureIcon,
  WrenchIcon,
} from "@phosphor-icons/react/ssr";

import type { AiImpactTaskId } from "@/content/ai/ai-impact.config";

type AiStepIconProps = {
  taskId: AiImpactTaskId;
  className?: string;
  size?: number;
};

export const getWorkflowTaskId = (title: string): AiImpactTaskId => {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle === "discovery") return "understand";
  if (normalizedTitle === "problem framing") return "structure";
  if (normalizedTitle === "exploration") return "explore";
  if (normalizedTitle === "prototyping") return "prototype";
  if (normalizedTitle === "testing") return "evaluate";
  if (normalizedTitle === "arbitrage") return "decide";
  if (normalizedTitle === "handoff") return "document";

  return "understand";
};

export const AiStepIcon = ({
  taskId,
  className,
  size = 20,
}: AiStepIconProps) => {
  const iconProps = {
    size,
    weight: "duotone" as const,
    className,
    "aria-hidden": true,
  };

  switch (taskId) {
    case "understand":
      return <MagnifyingGlassIcon {...iconProps} />;
    case "structure":
      return <TreeStructureIcon {...iconProps} />;
    case "explore":
      return <CompassIcon {...iconProps} />;
    case "prototype":
      return <CursorClickIcon {...iconProps} />;
    case "evaluate":
      return <FlaskIcon {...iconProps} />;
    case "decide":
      return <ScalesIcon {...iconProps} />;
    case "document":
      return <FileTextIcon {...iconProps} />;
    case "communicate":
      return <ChatCircleTextIcon {...iconProps} />;
    case "produce":
      return <WrenchIcon {...iconProps} />;
    case "polish":
      return <SparkleIcon {...iconProps} />;
  }
};
