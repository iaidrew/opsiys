"use client";

export default function LogoStrip() {
  const logos = [
    "D:\opsiys\assets\images\images (2).png",
    "Sequoia Capital",
    "a16z",
    "Accel",
    "Lightspeed",
    "First Round",
    "General Catalyst",
    "Brex",
    "Rippling",
    "Deel",
    "Linear",
    "Webflow",
    "Vercel",
    "Figma",
    "Notion",
  ];

  return (
    <section className="relative py-20 border-y border-white/5 overflow-hidden bg-black">
      
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <div className="whitespace-nowrap flex animate-marquee gap-20 text-lg md:text-xl font-semibold tracking-wide text-gray-500">
        {logos.concat(logos).map((logo, i) => (
          <div
            key={i}
            className="opacity-70 hover:opacity-100 hover:text-white transition duration-300"
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}
