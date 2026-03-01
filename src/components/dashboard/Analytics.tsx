"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface Scores {
  Marketing: number;
  Product: number;
  Leadership: number;
  Revenue: number;
  Operations: number;
}

interface AnalyticsProps {
  scores: Scores;
}

export default function Analytics({ scores }: AnalyticsProps) {
  const data = Object.entries(scores).map(([key, value]) => ({
    category: key,
    score: value,
  }));

  return (
    <div className="bg-white/5 border border-red-500/20 p-10 rounded-2xl">
      <h2 className="text-2xl font-bold text-red-500 mb-8">
        Strategic Performance Map
      </h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#222" />
            <PolarAngleAxis dataKey="category" stroke="#aaa" />
            <Radar
              dataKey="score"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}