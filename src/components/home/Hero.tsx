"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Businessman from "../../../assets/Businessman.json"; // place file in src/assets

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

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-red-500/10 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <div className="mb-8 text-sm tracking-[0.25em] uppercase text-gray-500">
            Opsiys — AI Operating System
          </div>

          <h1 className="text-5xl md:text-6xl xl:text-[5.2rem] font-black leading-[1.05] tracking-tight">
            <span className="block text-white">The Control Layer</span>
            <span className="block text-gray-300 mt-3">For Startup</span>
            <span className="block mt-5 text-red-500">
              {display}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="mt-10 text-lg text-gray-400 max-w-xl leading-relaxed">
            Assess performance. Analyze weaknesses. Generate executive reports.
            Operate your startup with structured intelligence — not chaos.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start">
            <button
              onClick={handlePrimary}
              className="px-10 py-4 text-lg font-semibold rounded-2xl bg-red-500 text-white transition-all duration-300 hover:bg-red-600 hover:shadow-[0_0_50px_rgba(239,68,68,0.4)]"
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

        {/* RIGHT LOTTIE */}
        <div className="relative hidden lg:flex justify-center">
          <div className="relative w-[560px] h-[560px] flex items-center justify-center">

            {/* Soft Glow */}
            <div className="absolute inset-0 bg-red-500/20 blur-[120px] rounded-full scale-110 -z-10" />

            <Lottie
              animationData={Businessman}
              loop={true}
              className="w-full h-full"
            />

          </div>
        </div>

      </div>
    </section>
  );
}