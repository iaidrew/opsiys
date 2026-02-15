"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-red-500/20 blur-[128px] animate-orb-slow" />
      <div className="absolute bottom-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-red-600/15 blur-[120px] animate-orb-slower" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-red-500/10 blur-[140px] animate-orb-pulse" />

      {/* Floating accent orbs - smaller, more subtle */}
      <div className="absolute top-[15%] right-[20%] w-64 h-64 rounded-full bg-red-500/10 blur-[80px] animate-float" />
      <div className="absolute bottom-[25%] left-[15%] w-48 h-48 rounded-full bg-red-400/10 blur-[60px] animate-float-delayed" />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] animate-grid-pulse"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, transparent 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  );
}
