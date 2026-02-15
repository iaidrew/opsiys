"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border border-red-500/30 bg-red-500/10 text-sm font-semibold text-red-400 transition-all duration-300 hover:scale-105 hover:bg-red-500/20 animate-hero-badge">
          The Future of Startup Growth
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-hero-heading">
          <span className="block text-white">BUILD YOUR</span>
          <span className="block bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shimmer transition-all duration-300 hover:tracking-widest">
            EMPIRE
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 animate-hero-sub">
          The operating system for ambitious founders. Align your vision,
          remove chaos, and scale faster with clarity and confidence.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-hero-cta">
          <button
            type="button"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/40 active:scale-100"
          >
            Start Building Free
          </button>
          <button
            type="button"
            className="px-8 py-4 rounded-xl border border-white/20 text-white transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:bg-white/5 active:scale-100"
          >
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
