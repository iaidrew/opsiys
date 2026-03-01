"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

export default function ExecutiveReport() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateReport = async () => {
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
        const data = snap.docs[0].data();

        const categories = [
          { name: "Marketing", value: data.marketing },
          { name: "Product", value: data.product },
          { name: "Leadership", value: data.leadership },
          { name: "Revenue", value: data.revenue },
          { name: "Operations", value: data.operations },
        ];

        const overall =
          categories.reduce((acc, c) => acc + c.value, 0) /
          categories.length;

        const strong = categories.filter((c) => c.value >= 4);
        const weak = categories.filter((c) => c.value <= 2);

        const summary = generateSummary(overall, strong, weak);

        const recommendations = generateRecommendations(weak);

        setReport({
          overall,
          strong,
          weak,
          summary,
          recommendations,
        });
      }

      setLoading(false);
    };

    generateReport();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Generating Executive Intelligence...
      </div>
    );

  if (!report)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No Assessment Found
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold">
          Executive Intelligence Report 🧠
        </h1>

        {/* Overall Score */}
        <div className="p-6 rounded-xl bg-red-900/30 border border-red-600">
          <h2 className="text-lg font-semibold mb-2">Startup Health Score</h2>
          <p className="text-4xl font-bold">
            {(report.overall * 2).toFixed(1)} / 10
          </p>
        </div>

        {/* Executive Summary */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h2 className="text-lg font-semibold mb-3">
            Executive Summary
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {report.summary}
          </p>
        </div>

        {/* Strengths */}
        <div className="p-6 bg-green-900/20 border border-green-600 rounded-xl">
          <h3 className="font-semibold mb-3">Strategic Strengths</h3>
          {report.strong.length === 0
            ? "No dominant strengths yet."
            : report.strong.map((s: any) => (
                <p key={s.name}>✔ {s.name}</p>
              ))}
        </div>

        {/* Risks */}
        <div className="p-6 bg-red-900/20 border border-red-600 rounded-xl">
          <h3 className="font-semibold mb-3">Critical Risk Areas</h3>
          {report.weak.length === 0
            ? "No immediate risks detected."
            : report.weak.map((w: any) => (
                <p key={w.name}>⚠ {w.name}</p>
              ))}
        </div>

        {/* Tool Recommendations */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="font-semibold mb-4">
            Recommended Growth Tools
          </h3>
          {report.recommendations.map((tool: any, i: number) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{tool.name}</p>
              <p className="text-sm text-gray-400">{tool.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function generateSummary(overall: number, strong: any[], weak: any[]) {
  if (overall >= 4) {
    return "Your startup shows strong structural foundation with scalable potential. Focus on operational excellence and automation to accelerate growth.";
  }
  if (overall >= 3) {
    return "Your startup demonstrates moderate traction but requires strategic optimization in key areas to unlock full growth potential.";
  }
  return "Your startup is in early stabilization phase. Immediate focus is required on leadership clarity, product validation, and monetization.";
}

function generateRecommendations(weak: any[]) {
  const tools: any[] = [];

  weak.forEach((area) => {
    if (area.name === "Marketing") {
      tools.push({
        name: "Google Analytics (Free)",
        description: "Track user acquisition and optimize marketing funnels.",
      });
    }

    if (area.name === "Product") {
      tools.push({
        name: "Figma",
        description: "Improve product design and user experience.",
      });
    }

    if (area.name === "Revenue") {
      tools.push({
        name: "Stripe Dashboard",
        description: "Optimize revenue streams and subscription flows.",
      });
    }

    if (area.name === "Operations") {
      tools.push({
        name: "Notion",
        description: "Streamline workflow and internal operations.",
      });
    }

    if (area.name === "Leadership") {
      tools.push({
        name: "Trello",
        description: "Improve team coordination and strategic execution.",
      });
    }
  });

  if (tools.length === 0) {
    tools.push({
      name: "Zapier",
      description: "Automate workflows to scale efficiently.",
    });
  }

  return tools;
}
