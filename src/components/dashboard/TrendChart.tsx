"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: {
    date: string;
    score: number;
  }[];
}

export default function TrendChart({ data }: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
      <h2 className="text-2xl font-bold mb-8">
        Performance Trajectory
      </h2>

      <div className="h-96">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#222" />
            <XAxis
              dataKey="date"
              stroke="#666"
              tick={{ fill: "#aaa", fontSize: 12 }}
            />
            <YAxis
              domain={[1, 5]}
              stroke="#666"
              tick={{ fill: "#aaa" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #333",
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}