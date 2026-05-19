export type AiImpactCriterionId =
  | "speedGain"
  | "qualityGain"
  | "riskControl";

export type AiImpactTaskId =
  | "understand"
  | "structure"
  | "explore"
  | "prototype"
  | "evaluate"
  | "decide"
  | "document"
  | "communicate"
  | "produce"
  | "polish";

export type AiImpactLevel = "low" | "medium" | "high";

export type AiImpactAssessment = {
  taskId: AiImpactTaskId;
  levels: Record<AiImpactCriterionId, AiImpactLevel>;
};

export const AI_IMPACT_CRITERIA = [
  "speedGain",
  "qualityGain",
  "riskControl",
] as const satisfies AiImpactCriterionId[];

export const AI_IMPACT_ASSESSMENTS: AiImpactAssessment[] = [
  {
    taskId: "understand",
    levels: {
      speedGain: "medium",
      qualityGain: "high",
      riskControl: "medium",
    },
  },
  {
    taskId: "structure",
    levels: {
      speedGain: "medium",
      qualityGain: "high",
      riskControl: "medium",
    },
  },
  {
    taskId: "explore",
    levels: {
      speedGain: "high",
      qualityGain: "high",
      riskControl: "medium",
    },
  },
  {
    taskId: "prototype",
    levels: {
      speedGain: "high",
      qualityGain: "medium",
      riskControl: "medium",
    },
  },
  {
    taskId: "evaluate",
    levels: {
      speedGain: "medium",
      qualityGain: "high",
      riskControl: "medium",
    },
  },
  {
    taskId: "decide",
    levels: {
      speedGain: "medium",
      qualityGain: "high",
      riskControl: "medium",
    },
  },
  {
    taskId: "document",
    levels: {
      speedGain: "high",
      qualityGain: "high",
      riskControl: "high",
    },
  },
  {
    taskId: "communicate",
    levels: {
      speedGain: "medium",
      qualityGain: "medium",
      riskControl: "medium",
    },
  },
  {
    taskId: "produce",
    levels: {
      speedGain: "low",
      qualityGain: "low",
      riskControl: "low",
    },
  },
  {
    taskId: "polish",
    levels: {
      speedGain: "low",
      qualityGain: "low",
      riskControl: "low",
    },
  },
];
