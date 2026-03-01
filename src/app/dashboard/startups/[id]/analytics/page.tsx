"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  RadarChart,
  Radar,
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

export default function StartupAnalytics() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessment = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(
          db,
          "users",
          user.uid,
          "startups",
          id as string,
          "assessments"
        ),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        const latest = snap.docs[0].data();

        const formatted = [
          { subject: "Marketing", value: latest.marketing },
          { subject: "Product", value: latest.product },
          { subject: "Leadership", value: latest.leadership },
          { subject: "Revenue", value: latest.revenue },
          { subject: "Operations", value: latest.operations },
        ];

        setData(formatted);
      }

      setLoading(false);
    };

    fetchAssessment();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading Analytics...
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No Assessment Data Found
      </div>
    );

  const overall =
    data.reduce((acc: number, item: any) => acc + item.value, 0) /
    data.length;

  const strong = data.filter((d: any) => d.value >= 4);
  const weak = data.filter((d: any) => d.value <= 2);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold">
          Startup Intelligence Dashboard 🚀
        </h1>

        {/* Overall Score */}
        <div className="p-6 rounded-xl bg-red-900/30 border border-red-600">
          <h2 className="text-lg font-semibold mb-2">Overall Health</h2>
          <p className="text-4xl font-bold">
            {(overall * 2).toFixed(1)} / 10
          </p>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <h2 className="mb-4 font-semibold">Performance Radar</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 5]} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <h2 className="mb-4 font-semibold">Category Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="subject" stroke="#fff" />
                <YAxis domain={[0, 5]} stroke="#fff" />
                <Tooltip />
                <Bar dataKey="value" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Insights */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="p-6 bg-green-900/20 border border-green-600 rounded-xl">
            <h3 className="font-semibold mb-3">Strong Areas</h3>
            {strong.length === 0 ? (
              <p>No strong areas yet.</p>
            ) : (
              strong.map((s: any) => (
                <p key={s.subject}>✔ {s.subject}</p>
              ))
            )}
          </div>

          <div className="p-6 bg-red-900/20 border border-red-600 rounded-xl">
            <h3 className="font-semibold mb-3">Needs Improvement</h3>
            {weak.length === 0 ? (
              <p>Balanced performance across areas.</p>
            ) : (
              weak.map((w: any) => (
                <p key={w.subject}>⚠ {w.subject}</p>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
