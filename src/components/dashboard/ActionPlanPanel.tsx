interface Props {
  weakestCategory: string;
  severity: string;
  plan: string;
}

export default function ActionPlanPanel({
  weakestCategory,
  severity,
  plan,
}: Props) {
  const severityColor =
    severity === "Critical"
      ? "text-red-500"
      : severity === "Warning"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8">
      <h2 className="text-xl font-semibold mb-6">
        Strategic Action Plan
      </h2>

      <div className="space-y-4 text-sm text-gray-300">

        <div className="flex justify-between">
          <span>Primary Constraint</span>
          <span className="text-white font-medium">
            {weakestCategory}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Severity Level</span>
          <span className={severityColor}>
            {severity}
          </span>
        </div>

        <div className="pt-4 border-t border-white/5">
          <p className="leading-relaxed whitespace-pre-line">
            {plan}
          </p>
        </div>

      </div>
    </div>
  );
}