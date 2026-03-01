"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const words = ["Infrastructure", "Intelligence", "Execution", "Control"];

export default function Hero() {
  const router = useRouter();
  const { user } = useAuth();

  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout: NodeJS.Timeout;

    if (!deleting) {
      if (display.length < word.length) {
        timeout = setTimeout(() => {
          setDisplay(word.slice(0, display.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(word.slice(0, display.length - 1));
        }, 40);
      } else {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, deleting, index]);

  const handlePrimary = () => {
    if (!user) router.push("/login");
    else router.push("/dashboard");
  };

  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden">

      {/* Cinematic Background */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-red-500/10 blur-[200px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.08)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">

        {/* Badge */}
        <div className="mb-10 text-sm tracking-[0.25em] uppercase text-gray-500">
          Opsiys — AI Operating System
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl xl:text-[7rem] font-black leading-[1] tracking-tight max-w-5xl">
          <span className="block text-white">
            The Control Layer
          </span>

          <span className="block text-gray-300 mt-4">
            For Startup
          </span>

          <span className="block mt-6 text-red-500">
            {display}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-12 text-xl text-gray-400 max-w-2xl leading-relaxed">
          Assess performance. Analyze weaknesses. Generate executive reports.
          Operate your startup with structured intelligence — not chaos.
        </p>

        {/* CTAs */}
        <div className="mt-14 flex flex-col sm:flex-row gap-8 items-start">

          <button
            onClick={handlePrimary}
            className="group relative px-12 py-5 text-lg font-semibold rounded-2xl bg-red-500 text-white overflow-hidden transition-all duration-300 hover:bg-red-600 hover:shadow-[0_0_60px_rgba(239,68,68,0.5)]"
          >
            {user ? "Enter Dashboard" : "Start Building"}
          </button>

          <button
            onClick={() => router.push("/about")}
            className="text-lg text-gray-400 hover:text-white transition"
          >
            Learn how it works →
          </button>

        </div>

      </div>
    </section>
  );
}
