"use client";

import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Smart redirect if already logged in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        const role = snap.data()?.role;

        if (role === "ADMIN") {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }
      }
    });
    return () => unsub();
  }, [router]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set display name
      await updateProfile(userCred.user, {
        displayName: name,
      });

      // 🔥 Create Firestore user record
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        role: "USER",
        createdAt: new Date(),
      });

      router.replace("/dashboard");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userRef = doc(db, "users", result.user.uid);
      const snap = await getDoc(userRef);

      // If first time → create user record
      if (!snap.exists()) {
        await setDoc(userRef, {
          name: result.user.displayName,
          email: result.user.email,
          role: "USER",
          createdAt: new Date(),
        });
      }

      router.replace("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* 🔥 Animated Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,0,0.25),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(255,0,0,0.15),transparent_40%)] animate-pulse"></div>

      {/* Floating Orbs */}
      <div className="absolute w-96 h-96 bg-red-600/20 blur-[120px] rounded-full top-10 left-10 animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="absolute w-96 h-96 bg-red-600/10 blur-[120px] rounded-full bottom-10 right-10 animate-[float_10s_ease-in-out_infinite]"></div>

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(255,0,0,0.15)]"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
          Create Account
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 transition-all outline-none text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 transition-all outline-none text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 transition-all outline-none text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 transition-all outline-none text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold shadow-lg shadow-red-600/30"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogle}
            className="w-full py-3 rounded-xl border border-white/20 hover:border-white/40 transition text-white"
          >
            Continue with Google
          </motion.button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-red-500 hover:underline">
              Sign In
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}
