"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";

const categories = [
  {
    key: "Marketing",
    title: "Marketing Execution",
    description:
      "Demand generation, positioning clarity, and acquisition efficiency.",
  },
  {
    key: "Product",
    title: "Product Strength",
    description:
      "Value delivery, differentiation, and product-market alignment.",
  },
  {
    key: "Leadership",
    title: "Leadership & Vision",
    description:
      "Founder clarity, decision velocity, and strategic alignment.",
  },
  {
    key: "Revenue",
    title: "Revenue Engine",
    description:
      "Monetization model, pricing strategy, and recurring predictability.",
  },
  {
    key: "Operations",
    title: "Operational Stability",
    description:
      "Execution systems, delegation structure, and process maturity.",
  },
];

const levels = [
  { value: 1, label: "Broken" },
  { value: 2, label: "Weak" },
  { value: 3, label: "Structured" },
  { value: 4, label: "Strong" },
  { value: 5, label: "Dominant" },
];

export default function AssessmentPage() {
  const router = useRouter();
  const { startupId } = useParams();

  const [scores, setScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSelect = (category: string, value: number) => {
    setScores((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(scores).length !== categories.length) {
      setError("Complete all categories before generating report.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startupId,
          scores,
        }),
      });

      if (!res.ok) {
        throw new Error("Assessment submission failed.");
      }

      router.replace(`/dashboard/${startupId}`);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-10 py-24">
      <div className="max-w-6xl mx-auto space-y-16">

        <div className="text-center">
          <h1 className="text-5xl font-black tracking-tight">
            Founder Intelligence Evaluation
          </h1>
          <p className="text-gray-500 mt-4">
            Strategic diagnostic across core execution pillars.
          </p>
        </div>

        {categories.map((category, index) => (
          <motion.div
            key={category.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold mb-2">
              {category.title}
            </h2>

            <p className="text-gray-500 mb-8">
              {category.description}
            </p>

            <div className="grid grid-cols-5 gap-4">
              {levels.map((level) => {
                const active =
                  scores[category.key] === level.value;

                return (
                  <button
                    key={level.value}
                    onClick={() =>
                      handleSelect(category.key, level.value)
                    }
                    className={`py-4 rounded-xl border transition-all
                      ${
                        active
                          ? "bg-red-600 border-red-500 shadow-lg shadow-red-600/30"
                          : "bg-black/40 border-white/10 hover:border-red-500"
                      }
                    `}
                  >
                    <div className="text-lg font-bold">
                      {level.value}
                    </div>
                    <div className="text-xs text-gray-400">
                      {level.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {error && (
          <p className="text-red-500 text-center">
            {error}
          </p>
        )}

        <div className="text-center pt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="px-16 py-5 rounded-2xl bg-red-600 hover:bg-red-500 transition font-bold text-lg shadow-lg shadow-red-600/30"
          >
            {loading
              ? "Generating Intelligence..."
              : "Generate Strategic Report"}
          </motion.button>
        </div>

      </div>
    </div>
  );
}