interface Props {
    scores: Record<string, number>;
  }
  
  export default function BottleneckPanel({ scores }: Props) {
    const sorted = Object.entries(scores).sort(
      (a, b) => a[1] - b[1]
    );
  
    const [category, score] = sorted[0];
  
    let severity = "Stable";
    let color = "text-green-400";
  
    if (score <= 2) {
      severity = "Critical";
      color = "text-red-500";
    } else if (score === 3) {
      severity = "Moderate";
      color = "text-yellow-400";
    }
  
    return (
      <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-8 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Execution Bottleneck
          </h2>
          <span className={`text-sm font-medium ${color}`}>
            {severity}
          </span>
        </div>
  
        <p className="text-gray-500 text-sm">
          Primary structural constraint limiting growth velocity.
        </p>
  
        <div className="text-2xl font-semibold text-red-500">
          {category}
        </div>
      </div>
    );
  }