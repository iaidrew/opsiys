/* =========================================
   ACTION PLAN ENGINE
========================================= */

export function generateActionPlan(
  scores: Record<string, number>
) {
  const entries = Object.entries(scores).sort(
    (a, b) => a[1] - b[1]
  );

  const weakestCategory = entries[0][0];
  const weakestScore = entries[0][1];

  let severity = "Moderate";

  if (weakestScore <= 2) severity = "Critical";
  else if (weakestScore === 3) severity = "Warning";

  const plan = `Focus immediate strategic effort on improving ${weakestCategory}. 
Implement structured execution processes, assign ownership accountability, 
and define measurable KPIs to elevate performance stability.`;

  return {
    weakestCategory,
    severity,
    plan,
  };
}

/* =========================================
   EXECUTIVE SUMMARY ENGINE
========================================= */

export function generateExecutiveSummary(
  scores: Record<string, number>,
  averageScore: number,
  riskIndex: number,
  growthSpread: number
) {
  const entries = Object.entries(scores).sort(
    (a, b) => a[1] - b[1]
  );

  const weakest = entries[0];
  const strongest = entries[entries.length - 1];

  let performanceLevel = "developing";

  if (averageScore >= 4) performanceLevel = "strong";
  else if (averageScore < 3) performanceLevel = "fragile";

  return `
Your startup is currently in a ${performanceLevel} performance state with an overall growth index of ${averageScore.toFixed(
    1
  )}. 

The primary structural constraint is ${weakest[0]}, which is suppressing execution velocity and increasing systemic risk.

Your strongest pillar is ${strongest[0]}, presenting leverage potential for accelerated scaling.

The current risk index of ${riskIndex.toFixed(
    1
  )} and growth spread of ${growthSpread.toFixed(
    1
  )} indicate performance imbalance that should be strategically optimized.
`;
}

/* =========================================
   BENCHMARK ENGINE
========================================= */

export function generateBenchmarkData(
  assessments: any[]
) {
  if (!assessments || assessments.length < 2) {
    return {
      hasComparison: false,
    };
  }

  const latest = assessments[assessments.length - 1];
  const previous = assessments[assessments.length - 2];

  const trend =
    latest.averageScore > previous.averageScore
      ? "Improving"
      : latest.averageScore < previous.averageScore
      ? "Declining"
      : "Stable";

  const balance =
    latest.growthSpread <= 1.5
      ? "Balanced"
      : latest.growthSpread <= 3
      ? "Moderate Imbalance"
      : "High Imbalance";

  return {
    hasComparison: true,
    current: latest.averageScore,
    previous: previous.averageScore,
    trend,
    balance,
  };
}