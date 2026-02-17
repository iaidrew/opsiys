"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";

interface Scores {
  [key: string]: number;
}

const toolDatabase: any = {
  Marketing: [
    {
      name: "Jasper AI",
      type: "Paid",
      description: "AI copywriting for ads & growth campaigns",
    },
    {
      name: "Canva Magic Design",
      type: "Free",
      description: "Instant brand visuals & pitch graphics",
    },
  ],
  Finance: [
    {
      name: "QuickBooks",
      type: "Paid",
      description: "Startup financial tracking & reporting",
    },
    {
      name: "Wave",
      type: "Free",
      description: "Free accounting for early startups",
    },
  ],
  Product: [
    {
      name: "Notion AI",
      type: "Free/Paid",
      description: "Product roadmap & documentation assistant",
    },
  ],
  Team: [
    {
      name: "Slack AI",
      type: "Paid",
      description: "Smarter internal communication",
    },
  ],
};

export default function AnalyticsPage() {
  const router = useRouter();
  const [scores, setScores] = useState<Scores | null>(null);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const [strongAreas, setStrongAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const snap = await getDoc(doc(db, "assessments", user.uid));

        if (!snap.exists()) {
          router.replace("/dashboard/assessment");
          return;
        }

        const data = snap.data().scores as Scores;

        setScores(data);

        const weak: string[] = [];
        const strong: string[] = [];

        Object.entries(data).forEach(([key, value]) => {
          if (value <= 2) weak.push(key);
          if (value >= 4) strong.push(key);
        });

        setWeakAreas(weak);
        setStrongAreas(strong);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Analytics...
      </div>
    );
  }

  if (!scores) return null;

  const chartData = Object.entries(scores).map(([category, value]) => ({
    category,
    score: value,
  }));

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-10">
          Startup Intelligence Report 📊
        </h1>

        {/* Radar Chart */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-10 backdrop-blur-xl">
          <h2 className="text-xl mb-4">Performance Radar</h2>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={chartData}>
              <PolarGrid stroke="#444" />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#ff0000"
                fill="#ff0000"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-10 backdrop-blur-xl">
          <h2 className="text-xl mb-4">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <XAxis dataKey="category" stroke="#aaa" />
              <YAxis domain={[0, 5]} stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="score" fill="#ff0000" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Strength & Weakness */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30">
            <h3 className="text-lg font-semibold mb-3">
              🚀 Strong Areas
            </h3>
            {strongAreas.length === 0 ? (
              <p className="text-gray-400">No strong areas yet.</p>
            ) : (
              strongAreas.map((area) => (
                <p key={area} className="text-green-400">
                  {area}
                </p>
              ))
            )}
          </div>

          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30">
            <h3 className="text-lg font-semibold mb-3">
              ⚠ Areas to Improve
            </h3>
            {weakAreas.length === 0 ? (
              <p className="text-gray-400">
                You're balanced across categories.
              </p>
            ) : (
              weakAreas.map((area) => (
                <p key={area} className="text-red-400">
                  {area}
                </p>
              ))
            )}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            🤖 Personalized AI Recommendations
          </h2>

          {weakAreas.length === 0 ? (
            <p className="text-gray-400">
              You're performing well across categories. Keep scaling 🚀
            </p>
          ) : (
            weakAreas.map((area) => (
              <div
                key={area}
                className="mb-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
              >
                <h3 className="text-lg font-semibold mb-4">
                  Improve: {area}
                </h3>

                {toolDatabase[area]?.map((tool: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-white/10 py-3"
                  >
                    <div>
                      <p className="font-semibold">{tool.name}</p>
                      <p className="text-sm text-gray-400">
                        {tool.description}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        tool.type === "Free"
                          ? "bg-green-500/20 text-green-400"
                          : tool.type === "Paid"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {tool.type}
                    </span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
