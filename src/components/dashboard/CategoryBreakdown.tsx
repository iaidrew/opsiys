interface Props {
    scores: Record<string, number>;
  }
  
  export default function CategoryBreakdown({ scores }: Props) {
    const entries = Object.entries(scores);
  
    const getStatus = (score: number) => {
      if (score <= 2) return { label: "Weak", color: "text-red-500" };
      if (score === 3) return { label: "Moderate", color: "text-yellow-400" };
      return { label: "Strong", color: "text-green-400" };
    };
  
    return (
      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-6">
          Category Performance
        </h2>
  
        <div className="space-y-4">
          {entries.map(([category, score]) => {
            const status = getStatus(score);
  
            return (
              <div
                key={category}
                className="flex justify-between items-center border-b border-white/5 pb-3"
              >
                <div className="text-sm text-gray-300">
                  {category}
                </div>
  
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium">
                    {score.toFixed(1)}
                  </div>
  
                  <div className={`text-xs font-medium ${status.color}`}>
                    {status.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }