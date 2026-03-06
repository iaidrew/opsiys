"use client";

import OPSIYSLogo from "../../../assets/images/OPSIYSLOGO.png";
import Sequoia from "../../../assets/images/sequoia.png";
import A16z from "../../../assets/images/A16z.svg";
import Accellogo from "../../../assets/images/Accellogo.png";
import lightspeed from "../../../assets/images/lightspeed.png";
import firstround from "../../../assets/images/firstround.png";

export default function LogoStrip() {
  const logos = [
    OPSIYSLogo,
    Sequoia,
    A16z,
    Accellogo,
    lightspeed,
    firstround,
  ];

  return (
    <section className="relative py-8 overflow-hidden">
      
      {/* Optional fade edges (remove if you want ultra clean) */}
      <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <div className="flex items-center whitespace-nowrap animate-marquee gap-20">
        {logos.concat(logos).map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center min-w-[220px]"
          >
            <img
              src={logo.src}
              alt="Company Logo"
              className="h-24 md:h-28 lg:h-32 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}