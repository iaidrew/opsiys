"use client";

import { useInView } from "@/hooks/useInView";

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const stats = [
    { value: "1,000+", label: "Startups Launched" },
    { value: "$120M+", label: "Funding Secured" },
    { value: "98%", label: "Success Rate" },
  ];

  return (
    <section ref={ref} className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur
              transition-all duration-500 ease-out
              hover:-translate-y-3
              hover:border-red-500/50
              hover:shadow-xl hover:shadow-red-500/30
              ${inView ? "animate-slide-up-fade opacity-100" : "opacity-0 translate-y-10"}
            `}
            style={inView ? { animationDelay: `${index * 0.15}s` } : undefined}
          >
              <div className="text-4xl font-black mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
          </div>
        ))}
      </div>
    </section>
  );
}
  