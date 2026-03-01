"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  scores: Record<string, number>;
}

export default function RadarChartComponent({ scores }: Props) {
  const data = Object.entries(scores).map(([key, value]) => ({
    category: key,
    score: value,
  }));

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-14 backdrop-blur-xl shadow-[0_0_60px_rgba(255,0,0,0.08)]">
      <h2 className="text-2xl font-bold mb-8">
        Core Strength Map
      </h2>

      <div className="h-96">
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: "#aaa", fontSize: 12 }}
            />
            <Radar
              dataKey="score"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}