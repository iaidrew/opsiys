"use client";

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  /* -------------------------------
     🔥 AUTH STATE REDIRECT
  --------------------------------*/
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));

      if (snap.exists()) {
        const role = snap.data().role;

        if (role === "ADMIN") {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }
      } else {
        router.replace("/dashboard");
      }
    });

    return () => unsub();
  }, [router]);

  /* -------------------------------
     🔐 EMAIL LOGIN
  --------------------------------*/
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const snap = await getDoc(
        doc(db, "users", userCredential.user.uid)
      );

      const role = snap.data()?.role;

      if (role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    } catch (err: any) {
      setError(err.message.replace("Firebase:", ""));
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------
     🌐 GOOGLE LOGIN
  --------------------------------*/
  const handleGoogle = async () => {
    try {
      setError("");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userRef = doc(db, "users", result.user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          name: result.user.displayName,
          email: result.user.email,
          role: "USER",
          createdAt: new Date(),
        });
      }

      const role = snap.exists() ? snap.data().role : "USER";

      if (role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    } catch (err: any) {
      setError(err.message.replace("Firebase:", ""));
    }
  };

  /* -------------------------------
     🔄 PASSWORD RESET
  --------------------------------*/
  const handleResetPassword = async () => {
    if (!email) {
      setError("Enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError("");
    } catch (err: any) {
      setError(err.message.replace("Firebase:", ""));
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* 🔥 Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,0,0.25),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(255,0,0,0.15),transparent_40%)] animate-pulse"></div>

      <div className="absolute w-96 h-96 bg-red-600/20 blur-[120px] rounded-full top-10 left-10 animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="absolute w-96 h-96 bg-red-600/10 blur-[120px] rounded-full bottom-10 right-10 animate-[float_10s_ease-in-out_infinite]"></div>

      {/* 🔥 Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(255,0,0,0.15)]"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
          Welcome Back
        </h1>

        <div className="space-y-4">

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

          {/* 🔥 Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-sm"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* 🔥 Reset Confirmation */}
          {resetSent && (
            <p className="text-green-400 text-sm">
              Password reset email sent 🚀
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold shadow-lg shadow-red-600/30"
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogle}
            className="w-full py-3 rounded-xl border border-white/20 hover:border-white/40 transition text-white"
          >
            Continue with Google
          </motion.button>

          <div className="text-right">
            <button
              onClick={handleResetPassword}
              className="text-sm text-red-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?{" "}
            <Link href="/register" className="text-red-500 hover:underline">
              Create one
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}
