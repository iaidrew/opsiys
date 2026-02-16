"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const questions = [
  {
    category: "Product",
    question: "Do you have clear product-market fit?",
  },
  {
    category: "Market",
    question: "Do you deeply understand your target audience?",
  },
  {
    category: "Revenue",
    question: "Is your revenue model predictable and scalable?",
  },
  {
    category: "Operations",
    question: "Are your processes documented and optimized?",
  },
  {
    category: "Growth",
    question: "Do you have a consistent acquisition channel?",
  },
  {
    category: "Founder",
    question: "Do you track KPIs weekly and make data-driven decisions?",
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(3));

  const handleChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const scores: Record<string, number> = {};

    questions.forEach((q, i) => {
      if (!scores[q.category]) scores[q.category] = 0;
      scores[q.category] += answers[i];
    });

    localStorage.setItem("assessmentScores", JSON.stringify(scores));
    router.push("/dashboard/report");
  };

  return (
    <div className="space-y-10">

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold"
      >
        Growth Intelligence Assessment
      </motion.h1>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl space-y-8">

        {questions.map((q, index) => (
          <div key={index} className="space-y-3">
            <p className="text-lg font-medium">{q.question}</p>

            <div className="flex justify-between text-sm text-gray-400">
              <span>Weak</span>
              <span>Strong</span>
            </div>

            <input
              type="range"
              min="1"
              max="5"
              value={answers[index]}
              onChange={(e) => handleChange(index, Number(e.target.value))}
              className="w-full accent-red-600"
            />
          </div>
        ))}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold shadow-lg shadow-red-600/30"
        >
          Generate Founder Report
        </motion.button>

      </div>
    </div>
  );
}
