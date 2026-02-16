"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.replace("/login");
      } else {
        setUser(u);

        // 🔥 Check profile completion
        const snap = await getDoc(doc(db, "profiles", u.uid));
        if (snap.exists()) {
          const data = snap.data();
          const fields = Object.values(data).filter(Boolean);
          const percentage = Math.min(
            100,
            Math.round((fields.length / 7) * 100)
          );
          setProfileCompletion(percentage);
        }
      }
    });

    return () => unsub();
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* 🔥 Animated Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,0,0.15),transparent_40%)] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto"
      >
        {/* Header */}
        <h1 className="text-4xl font-bold mb-2">
          Welcome, {user.displayName || "Founder"} 🚀
        </h1>

        <p className="text-gray-400 mb-8">
          Your startup intelligence command center
        </p>

        {/* Profile Completion Bar */}
        <div className="mb-10">
          <div className="flex justify-between text-sm mb-2">
            <span>Profile Completion</span>
            <span>{profileCompletion}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${profileCompletion}%` }}
              transition={{ duration: 0.8 }}
              className="h-3 rounded-full bg-red-600"
            />
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          <DashboardCard
            title="Startup Profile"
            description="Complete and manage your startup identity."
            link="/dashboard/profile"
          />

          <DashboardCard
            title="Startup Assessment"
            description="Answer deep business questions and unlock analysis."
            link="/dashboard/assessment"
          />

          <DashboardCard
            title="Performance Analytics"
            description="Visualize metrics, strengths & weaknesses."
            link="/dashboard/analytics"
          />

        </div>

        {/* Secondary Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <DashboardCard
            title="AI Report Generator"
            description="Generate a full founder performance report."
            link="/dashboard/report"
          />

          <DashboardCard
            title="AI Tool Recommendations"
            description="Discover 5 free & paid tools tailored to you."
            link="/dashboard/recommendations"
          />

        </div>
      </motion.div>
    </div>
  );
}

function DashboardCard({ title, description, link }: any) {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl cursor-pointer hover:border-red-500/40 transition-all duration-300 shadow-[0_0_30px_rgba(255,0,0,0.05)] hover:shadow-[0_0_60px_rgba(255,0,0,0.2)]"
      >
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-400 text-sm">{description}</p>
      </motion.div>
    </Link>
  );
}
