"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

import logo from "../../../assets/images/OPSIYSLOGO.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Opsiys Logo"
            height={80}
            width={150}
            className="h-20 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/tools" className="hover:text-white">Tools</Link>
          <Link href="/ai" className="hover:text-white">AI</Link>
          <Link href="/store" className="hover:text-white">Store</Link>
        </div>

        {/* Auth Section */}
        {user ? (
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full border border-white/20 text-sm hover:border-red-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden md:block px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-red-500 hover:text-white transition"
          >
            Login
          </Link>
        )}

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
