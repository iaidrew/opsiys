"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CreateStartupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [revenue, setRevenue] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!name || !industry || !stage) {
      setError("Please fill required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/startup/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          industry,
          stage,
          revenue: Number(revenue) || 0,
          teamSize: Number(teamSize) || 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create startup.");
      }

      const data = await res.json();

      // Redirect to new dashboard
      router.replace(`/dashboard/${data.id}`);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-10 py-20">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl"
        >
          <h1 className="text-3xl font-black mb-8">
            Create Startup Profile
          </h1>

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Startup Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 transition outline-none"
            />

            <input
              type="text"
              placeholder="Industry *"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 transition outline-none"
            />

            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 transition outline-none"
            >
              <option value="">Select Stage *</option>
              <option value="Idea">Idea</option>
              <option value="MVP">MVP</option>
              <option value="Early Revenue">Early Revenue</option>
              <option value="Growth">Growth</option>
              <option value="Scale">Scale</option>
            </select>

            <input
              type="number"
              placeholder="Monthly Revenue (optional)"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 transition outline-none"
            />

            <input
              type="number"
              placeholder="Team Size (optional)"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 transition outline-none"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreate}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold shadow-lg shadow-red-600/30"
            >
              {loading ? "Creating..." : "Create Startup"}
            </motion.button>

          </div>
        </motion.div>

      </div>
    </div>
  );
}