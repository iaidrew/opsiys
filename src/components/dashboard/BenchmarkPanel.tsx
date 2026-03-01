interface Props {
    data: any;
  }
  
  export default function BenchmarkPanel({ data }: Props) {
    if (!data.hasComparison) return null;
  
    const trendColor =
      data.trend === "Improving"
        ? "text-green-400"
        : data.trend === "Declining"
        ? "text-red-500"
        : "text-yellow-400";
  
    return (
      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-6">
          Performance Benchmark
        </h2>
  
        <div className="space-y-4 text-sm text-gray-300">
  
          <div className="flex justify-between">
            <span>Current Growth Index</span>
            <span>{data.current.toFixed(1)}</span>
          </div>
  
          <div className="flex justify-between">
            <span>Previous Growth Index</span>
            <span>{data.previous.toFixed(1)}</span>
          </div>
  
          <div className="flex justify-between">
            <span>Trend Direction</span>
            <span className={trendColor}>{data.trend}</span>
          </div>
  
          <div className="flex justify-between">
            <span>Execution Stability</span>
            <span>{data.balance}</span>
          </div>
  
        </div>
      </div>
    );
  }