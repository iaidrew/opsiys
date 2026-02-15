"use client";

import { useEffect, useState } from "react";

export default function PremiumBackground() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Spotlight */}
      <div
        className="absolute pointer-events-none w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          left: position.x - 250,
          top: position.y - 250,
          background:
            "radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Shooting Star */}
      <div className="absolute top-20 left-[-200px] w-[200px] h-[2px] bg-gradient-to-r from-red-500 to-transparent animate-shoot" />

      <style jsx global>{`
        @keyframes shoot {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateX(120vw) translateY(40vh);
            opacity: 0;
          }
        }

        .animate-shoot {
          animation: shoot 6s linear infinite;
        }
      `}</style>
    </>
  );
}
