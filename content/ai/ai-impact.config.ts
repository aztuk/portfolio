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

export type AiImpactScore = {
  taskId: AiImpactTaskId;
  scores: Record<AiImpactCriterionId, number>;
};

export const AI_IMPACT_CRITERIA = [
  "speedGain",
  "qualityGain",
  "riskControl",
] as const satisfies AiImpactCriterionId[];

export const AI_IMPACT_SCORES: AiImpactScore[] = [
  {
    taskId: "understand",
    scores: {
      speedGain: 1,
      qualityGain: 5,
      riskControl: 4,
    },
  },
  {
    taskId: "structure",
    scores: {
      speedGain: 1,
      qualityGain: 3,
      riskControl: 2,
    },
  },
  {
    taskId: "explore",
    scores: {
      speedGain: 2,
      qualityGain: 3,
      riskControl: 2,
    },
  },
  {
    taskId: "prototype",
    scores: {
      speedGain: 5,
      qualityGain: 3,
      riskControl: 4,
    },
  },
  {
    taskId: "evaluate",
    scores: {
      speedGain: 3,
      qualityGain: 4,
      riskControl: 3,
    },
  },
  {
    taskId: "decide",
    scores: {
      speedGain: 3,
      qualityGain: 2,
      riskControl: 2,
    },
  },
  {
    taskId: "document",
    scores: {
      speedGain: 4,
      qualityGain: 4,
      riskControl: 4,
    },
  },
  {
    taskId: "communicate",
    scores: {
      speedGain: 2,
      qualityGain: 3,
      riskControl: 3,
    },
  },
  {
    taskId: "produce",
    scores: {
      speedGain: 3,
      qualityGain: 0,
      riskControl: 0,
    },
  },
  {
    taskId: "polish",
    scores: {
      speedGain: 2,
      qualityGain: 0,
      riskControl: 0,
    },
  },
];

export const getAiImpactScoreTotal = (score: AiImpactScore): number =>
  Object.values(score.scores).reduce((total, value) => total + value, 0);

export const AI_IMPACT_SCORES_SORTED = [...AI_IMPACT_SCORES].sort(
  (left, right) => getAiImpactScoreTotal(right) - getAiImpactScoreTotal(left),
);
