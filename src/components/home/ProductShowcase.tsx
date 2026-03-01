"use client";

import { motion } from "framer-motion";

export default function ProductShowcase() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <div className="inline-block px-4 py-2 mb-6 rounded-full border border-red-500/30 bg-red-500/10 text-sm font-semibold text-red-400">
            LIVE COMMAND CENTER
          </div>

          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Control Your Startup
            <br />
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
              In One Dashboard
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-8">
            Track performance, analyze assessments, monitor KPIs and generate executive reports —
            all from a single intelligent operating system.
          </p>

          <button className="px-8 py-4 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold shadow-lg shadow-red-500/20">
            Explore Dashboard
          </button>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative">

          {/* Main Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-red-500/10"
          >
            <div className="space-y-6">

              <div className="h-4 w-32 bg-white/10 rounded"></div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-500/20 rounded-xl h-20"></div>
                <div className="bg-white/5 rounded-xl h-20"></div>
                <div className="bg-white/5 rounded-xl h-20"></div>
              </div>

              <div className="bg-white/5 rounded-xl h-40"></div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl h-24"></div>
                <div className="bg-red-500/20 rounded-xl h-24"></div>
              </div>

            </div>
          </motion.div>

          {/* Floating Metric Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute -left-8 -bottom-8 bg-black border border-white/10 rounded-2xl px-6 py-4 shadow-lg"
          >
            <div className="text-sm text-gray-400">Growth Score</div>
            <div className="text-2xl font-bold text-red-400">8.4 / 10</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -right-8 top-10 bg-black border border-white/10 rounded-2xl px-6 py-4 shadow-lg"
          >
            <div className="text-sm text-gray-400">Active KPIs</div>
            <div className="text-2xl font-bold text-white">12</div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
