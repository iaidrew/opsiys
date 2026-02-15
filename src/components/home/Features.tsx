"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function Features() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      title: "Growth Tools",
      href: "/tools",
      description: "Strategic frameworks and battle-tested templates to scale from zero to hero.",
      icon: (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
            <defs>
              <linearGradient id="feat-rocket-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <path fill="url(#feat-rocket-grad)" d="M12 2.5c0 0 2 4.5 2 8 0 2.5-.8 4.5-2 6.5-.6 1-1.5 2-2 2.5v2.5h8v-2.5c-.5-.5-1.4-1.5-2-2.5-1.2-2-2-4-2-6.5 0-3.5 2-8 2-8z" />
            <path fill="url(#feat-rocket-grad)" opacity="0.9" d="M10 14l-2 5h2v-5zm4 0v5h2l-2-5z" />
            <path fill="url(#feat-rocket-grad)" opacity="0.7" d="M12 18v4" stroke="url(#feat-rocket-grad)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      ),
    },
    {
      title: "AI Co-Pilot",
      href: "/ai",
      description: "Next-gen AI that writes boilerplate code and matches you with investors.",
      icon: (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
            <defs>
              <linearGradient id="feat-brain-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <path fill="url(#feat-brain-grad)" d="M12 3c-1.5 0-2.8.8-3.5 2A4 4 0 005 8c0 1 .4 2 1.2 2.6C5 12 4 14 4 16v2h3v-1.5c0-1.4.8-2.5 2-3 .2-.6.5-1.2 1-1.6v-.2c-.6-.4-1-1.1-1-1.9 0-.9.5-1.6 1.2-1.9.2-1.5 1.4-2.6 2.8-2.6s2.6 1.1 2.8 2.6c.7.3 1.2 1 1.2 1.9 0 .8-.4 1.5-1 1.9v.2c.5.4.8 1 1 1.6 1.2.5 2 1.6 2 3V18h3v-2c0-2-.9-4-2.2-5.4.8-.6 1.2-1.6 1.2-2.6a4 4 0 00-3.5-3C14.8 3.8 13.5 3 12 3z" />
            <path fill="url(#feat-brain-grad)" opacity="0.85" d="M9 11c.6 0 1 .4 1 1v1H8v-1c0-.6.4-1 1-1zm6 0c.6 0 1 .4 1 1v1h-2v-1c0-.6.4-1 1-1z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Command Center",
      href: "/analytics",
      description: "Real-time dashboards and metrics to track progress and make decisions.",
      icon: (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/20">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
            <path fill="#3b82f6" d="M4 18h4v-6H4v6zm6 0h4V6h-4v12zm6 0h4v-9h-4v9z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Resource Vault",
      href: "/resources",
      description: "Exclusive templates and playbooks built by real founders.",
      icon: (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
            <path fill="#10b981" d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
            <path fill="#10b981" opacity="0.8" d="M4 8h16v12H4V8z" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? "animate-slide-up-fade opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-2 mb-6 rounded-full border border-red-500/30 bg-red-500/10 text-sm font-semibold text-red-400">
            POWERFUL FEATURES
          </span>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="block text-white">Your Complete</span>
            <span className="block bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shimmer">
              Startup Toolkit
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Everything you need to build, launch, and scale — in one system.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur transition-all duration-500 ease-out hover:-translate-y-3 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/20 ${
                inView ? "animate-slide-up-fade opacity-100" : "opacity-0 translate-y-10"
              }`}
              style={inView ? { animationDelay: `${0.2 + index * 0.1}s` } : undefined}
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {feature.description}
              </p>
              <Link
                href={feature.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-semibold text-sm transition-all duration-300 hover:bg-red-500 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 active:scale-100 group/btn"
              >
                <span>Explore Feature</span>
                <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">&gt;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
