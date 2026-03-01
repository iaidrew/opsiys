interface Props {
    average: number;
    risk: number;
    growthSpread: number;
  }
  
  export default function ExecutiveKPIs({
    average,
    risk,
    growthSpread,
  }: Props) {
    const items = [
      { label: "Growth Index", value: average, highlight: true },
      { label: "Risk Index", value: risk },
      { label: "Growth Spread", value: growthSpread },
    ];
  
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-8"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
              {item.label}
            </p>
            <div
              className={`text-3xl font-semibold ${
                item.highlight ? "text-red-500" : "text-white"
              }`}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    );
  }