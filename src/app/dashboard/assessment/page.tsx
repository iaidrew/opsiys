"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const categories = [
  "Product & Innovation",
  "Marketing & Growth",
  "Revenue & Monetization",
  "Operations & Execution",
  "Leadership & Vision",
];

export default function AssessmentPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);

  const handleSelect = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);

    // Calculate category scores
    const scores: any = {};
    categories.forEach((cat) => {
      const catAnswers = Object.entries(answers)
        .filter(([key]) => key.startsWith(cat))
        .map(([, value]) => value as number);

      const avg =
        catAnswers.reduce((a, b) => a + b, 0) /
        (catAnswers.length || 1);

      scores[cat] = Math.round(avg);
    });

    await setDoc(doc(db, "assessments", user.uid), {
      answers,
      scores,
      createdAt: new Date(),
    });

    setLoading(false);
    router.push("/dashboard/analytics");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">
          Startup Intelligence Assessment 🚀
        </h1>

        {categories.map((category, i) => (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-semibold mb-4">
              {category}
            </h2>

            {[1, 2, 3, 4, 5].map((q) => {
              const questionId = `${category}-Q${q}`;

              return (
                <div
                  key={questionId}
                  className="mb-4 p-4 bg-white/5 border border-white/10 rounded-xl"
                >
                  <p className="mb-3">
                    Question {q}: How strong is your {category.toLowerCase()} in this area?
                  </p>

                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() =>
                          handleSelect(questionId, value)
                        }
                        className={`px-4 py-2 rounded-lg border ${
                          answers[questionId] === value
                            ? "bg-red-600 border-red-600"
                            : "border-white/20"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-red-600 rounded-xl font-semibold hover:bg-red-500 transition"
        >
          {loading ? "Analyzing..." : "Generate My Intelligence Report"}
        </button>
      </motion.div>
    </div>
  );
}
