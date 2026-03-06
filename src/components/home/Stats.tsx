"use client";

import { useEffect, useState } from "react";

export default function Stats() {
  const [stats, setStats] = useState({
    founders: 0,
    assessments: 0,
    avgScore: 0,
    completionRate: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
  
        if (!res.ok) {
          console.error("API failed");
          return;
        }
  
        const data = await res.json();
        setStats(data);
  
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchStats();
  }, []);

  return (
    <section className="relative py-36 px-6 border-t border-white/10">

      <div className="max-w-7xl mx-auto">

        <div className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">
          Live Ecosystem Metrics
        </div>

        <h2 className="text-4xl md:text-6xl font-black mb-16">
          Real Founder Intelligence
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          <StatCard number={loading ? "—" : stats.founders} label="Registered Founders" />
          <StatCard number={loading ? "—" : stats.assessments} label="Assessments Completed" />
          <StatCard number={loading ? "—" : stats.avgScore} label="Avg Startup Health Score" />
          <StatCard number={loading ? "—" : `${stats.completionRate}%`} label="Assessment Completion Rate" />

        </div>
      </div>
    </section>
  );
}

function StatCard({
  number,
  label,
}: {
  number: number | string;
  label: string;
}) {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-3xl p-10 transition-all duration-500 hover:border-red-500/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-500/20">

      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

      <div className="relative z-10">
        <div className="text-5xl md:text-6xl font-black text-red-500 mb-4">
          {number}
        </div>

        <div className="text-gray-400 text-lg">
          {label}
        </div>
      </div>
    </div>
  );
}