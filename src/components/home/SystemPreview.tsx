"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SystemPreview() {
  const router = useRouter();
  const { user } = useAuth();

  const goTo = (path: string) => {
    if (!user) {
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  return (
    <section className="relative py-40 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Section Label */}
        <div className="mb-8 text-sm tracking-[0.3em] uppercase text-gray-500">
          Intelligence Engine
        </div>

        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">
          Your Startup.
          <span className="block text-red-500 mt-4">
            Structured Into Intelligence.
          </span>
        </h2>

        <p className="mt-8 text-xl text-gray-400 max-w-2xl leading-relaxed">
          Every assessment feeds analytics.
          Every analytics cycle generates executive insight.
          Every insight improves execution.
        </p>

        {/* Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">

          {/* Assessment */}
          <div
            onClick={() => goTo("/dashboard/assessment")}
            className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-10 transition-all duration-500 hover:border-red-500/50 hover:-translate-y-2"
          >
            <div className="text-5xl font-black text-red-500 mb-6">01</div>
            <h3 className="text-2xl font-bold mb-4">
              Assess
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Rate leadership, product, marketing, finance and operations.
              Structured inputs become measurable performance signals.
            </p>
          </div>

          {/* Analytics */}
          <div
            onClick={() => goTo("/dashboard/analytics")}
            className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-10 transition-all duration-500 hover:border-red-500/50 hover:-translate-y-2"
          >
            <div className="text-5xl font-black text-red-500 mb-6">02</div>
            <h3 className="text-2xl font-bold mb-4">
              Analyze
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Transform raw assessments into KPI heatmaps, growth scores,
              and structured performance dashboards.
            </p>
          </div>

          {/* Report */}
          <div
            onClick={() => goTo("/dashboard/report")}
            className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-10 transition-all duration-500 hover:border-red-500/50 hover:-translate-y-2"
          >
            <div className="text-5xl font-black text-red-500 mb-6">03</div>
            <h3 className="text-2xl font-bold mb-4">
              Generate
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Produce executive-level startup intelligence reports —
              board-ready insights powered by structured data.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
