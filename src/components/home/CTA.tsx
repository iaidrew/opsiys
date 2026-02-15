"use client";

import { useInView } from "@/hooks/useInView";

export default function CTA() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className={`relative rounded-3xl border border-red-500/30 bg-black p-16 text-center overflow-hidden transition-all duration-700 ${
            inView ? "animate-slide-up-fade opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-red-500/10 blur-3xl animate-orb-pulse" />

          <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                <span className="block text-white">Ready to Build</span>
                <span className="block text-red-500">Something Epic?</span>
              </h2>
  
              <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                Join founders who are turning ideas into systems, and systems into
                scalable businesses.
              </p>
  
              <button className="px-10 py-4 rounded-2xl bg-red-500 text-white font-semibold text-lg hover:bg-red-600 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/40 active:scale-100">
                Launch Your Startup
              </button>
          </div>
        </div>
      </div>
    </section>
  );
}
  