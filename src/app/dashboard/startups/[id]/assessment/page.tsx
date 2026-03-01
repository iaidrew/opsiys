"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const categories = [
  "marketing",
  "product",
  "leadership",
  "revenue",
  "operations",
];

export default function StartupAssessment() {
  const { id } = useParams();
  const router = useRouter();

  const [scores, setScores] = useState<any>({
    marketing: 3,
    product: 3,
    leadership: 3,
    revenue: 3,
    operations: 3,
  });

  const [loading, setLoading] = useState(false);

  const updateScore = (cat: string, value: number) => {
    setScores({ ...scores, [cat]: value });
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);

    await addDoc(
      collection(
        db,
        "users",
        user.uid,
        "startups",
        id as string,
        "assessments"
      ),
      {
        ...scores,
        createdAt: new Date(),
      }
    );

    router.push(`/dashboard/startups/${id}/analytics`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold">
          Startup Health Assessment 🚀
        </h1>

        {categories.map((cat) => (
          <div
            key={cat}
            className="p-6 bg-white/5 border border-white/10 rounded-xl"
          >
            <h2 className="capitalize font-semibold mb-4">
              {cat} Strength
            </h2>

            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => updateScore(cat, num)}
                  className={`px-4 py-2 rounded-lg border ${
                    scores[cat] === num
                      ? "bg-red-600 border-red-600"
                      : "border-white/20"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 bg-red-600 rounded-xl font-semibold"
        >
          {loading ? "Analyzing..." : "Generate Intelligence"}
        </button>

      </div>
    </div>
  );
}
