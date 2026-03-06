"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractiveAIBot() {
  const botRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let direction = 1;
    let position = 0;
    let frameId: number;

    const animate = () => {
      if (!botRef.current) return;

      position += 0.5 * direction;

      if (position > 200) direction = -1;
      if (position < -200) direction = 1;

      botRef.current.style.transform = `
        translateX(${position}px)
        translateY(${Math.sin(position / 20) * 10}px)
      `;

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      {/* Floating AI Bot */}
      <div
        ref={botRef}
        onClick={() => setOpen(!open)}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 w-28 h-28 cursor-pointer z-50 transition-transform duration-300 hover:scale-110"
      >
        <img
          src="/ai-bot.gif"
          alt="AI Bot"
          className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(239,68,68,0.7)]"
        />
      </div>

      {/* AI Panel */}
      {open && (
        <div className="fixed bottom-44 left-1/2 -translate-x-1/2 w-96 bg-zinc-900 border border-red-500/40 rounded-2xl p-6 shadow-2xl z-50">
          <h3 className="text-lg font-semibold mb-3 text-red-500">
            AI Assistant
          </h3>
          <p className="text-gray-400 text-sm">
            Hello Founder 👋  
            I can help you understand how the Opsiys Intelligence Engine works.
          </p>
          <button
            onClick={() => setOpen(false)}
            className="mt-4 text-sm text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}