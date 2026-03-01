"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function Features() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      title: "Growth Tools",
      href: "/tools",
      description:
        "Strategic frameworks and battle-tested systems to scale from zero to structured execution.",
      icon: (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              fill="#ef4444"
              d="M12 2.5c0 0 2 4.5 2 8 0 2.5-.8 4.5-2 6.5-.6 1-1.5 2-2 2.5v2.5h8v-2.5c-.5-.5-1.4-1.5-2-2.5-1.2-2-2-4-2-6.5 0-3.5 2-8 2-8z"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "AI Co-Pilot",
      href: "/ai",
      description:
        "An intelligent layer embedded into your workflow to guide decisions and accelerate growth.",
      icon: (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              fill="#a855f7"
              d="M12 3c-1.5 0-2.8.8-3.5 2A4 4 0 005 8c0 1 .4 2 1.2 2.6C5 12 4 14 4 16v2h3v-1.5c0-1.4.8-2.5 2-3 .2-.6.5-1.2 1-1.6v-.2c-.6-.4-1-1.1-1-1.9 0-.9.5-1.6 1.2-1.9.2-1.5 1.4-2.6 2.8-2.6s2.6 1.1 2.8 2.6c.7.3 1.2 1 1.2 1.9 0 .8-.4 1.5-1 1.9v.2c.5.4.8 1 1 1.6 1.2.5 2 1.6 2 3V18h3v-2c0-2-.9-4-2.2-5.4.8-.6 1.2-1.6 1.2-2.6a4 4 0 00-3.5-3C14.8 3.8 13.5 3 12 3z"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "Command Center",
      href: "/analytics",
      description:
        "Real-time dashboards that transform raw metrics into executive clarity.",
      icon: (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path fill="#3b82f6" d="M4 18h4v-6H4v6zm6 0h4V6h-4v12zm6 0h4v-9h-4v9z" />
          </svg>
        </div>
      ),
    },
    {
      title: "Resource Vault",
      href: "/resources",
      description:
        "Founder-grade playbooks, templates and assets built for long-term leverage.",
      icon: (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              fill="#10b981"
              d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
            />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          className={`text-center mb-24 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gray-500">
            Capabilities
          </p>

          <h2 className="mt-6 text-4xl md:text-6xl font-semibold leading-tight">
            Your Complete
            <br />
            <span className="text-gray-400">
              Startup Operating System
            </span>
          </h2>

          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">
            A structured environment to design, execute and scale with clarity.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/10 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={
                inView ? { transitionDelay: `${index * 100}ms` } : undefined
              }
            >
              <div className="mb-6">{feature.icon}</div>

              <h3 className="text-2xl font-semibold mb-4 text-white">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                {feature.description}
              </p>

              <Link
                href={feature.href}
                className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Explore →
              </Link>

              {/* Subtle glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-red-500/10 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
