"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import StartupSwitcher from "@/components/dashboard/StartupSwitcher";
import logo from "../../../assets/images/OPSIYSLOGO.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Opsiys Logo"
            width={140}
            height={60}
            className="h-10 w-auto"
          />
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex gap-10 text-sm text-gray-400">
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/tools" className="hover:text-white transition">Tools</Link>
          <Link href="/ai" className="hover:text-white transition">AI</Link>
          <Link href="/store" className="hover:text-white transition">Store</Link>
        </div>

        {/* Auth */}
        {user ? (
          <div className="hidden md:flex items-center gap-4">

            {/* Startup Switcher */}
            <StartupSwitcher />

            {/* Dashboard Button */}
            <Link
              href="/dashboard/profile"
              className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-red-500 hover:text-white transition"
            >
              Dashboard
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full border border-white/10 text-sm hover:border-red-500 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-red-500 hover:text-white transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}