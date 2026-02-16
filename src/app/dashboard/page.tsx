"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/login");
      } else {
        setUser(u);
      }
    });

    return () => unsub();
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">
          Welcome, {user.displayName || "Founder"} 🚀
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-lg font-semibold mb-2">Startup Profile</h2>
            <p className="text-gray-400 text-sm">
              Complete your startup details and unlock full analysis.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-lg font-semibold mb-2">Performance Score</h2>
            <p className="text-gray-400 text-sm">
              View your growth metrics and health indicators.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-lg font-semibold mb-2">AI Recommendations</h2>
            <p className="text-gray-400 text-sm">
              Discover tools to improve weak areas.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
