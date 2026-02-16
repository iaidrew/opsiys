"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    startupName: "",
    industry: "",
    stage: "",
    revenue: "",
    teamSize: "",
    targetMarket: "",
    problemStatement: "",
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      const snap = await getDoc(doc(db, "profiles", user.uid));

      if (snap.exists()) {
        setForm(snap.data() as any);
      }

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      setSaving(true);

      await setDoc(doc(db, "profiles", user.uid), {
        ...form,
        updatedAt: new Date(),
      });

      alert("Profile saved successfully 🚀");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_80px_rgba(255,0,0,0.1)]"
      >
        <h1 className="text-3xl font-bold mb-8">
          Startup Profile 🚀
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <Input label="Startup Name" name="startupName" form={form} setForm={setForm} />
          <Input label="Industry" name="industry" form={form} setForm={setForm} />
          <Input label="Startup Stage" name="stage" form={form} setForm={setForm} />
          <Input label="Monthly Revenue ($)" name="revenue" form={form} setForm={setForm} />
          <Input label="Team Size" name="teamSize" form={form} setForm={setForm} />
          <Input label="Target Market" name="targetMarket" form={form} setForm={setForm} />

        </div>

        <div className="mt-6">
          <label className="text-sm text-gray-400">Problem Statement</label>
          <textarea
            rows={4}
            value={form.problemStatement}
            onChange={(e) =>
              setForm({ ...form, problemStatement: e.target.value })
            }
            className="w-full mt-2 p-4 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 outline-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saving}
          className="mt-8 w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold shadow-lg shadow-red-600/30"
        >
          {saving ? "Saving..." : "Save Profile"}
        </motion.button>
      </motion.div>
    </div>
  );
}

function Input({ label, name, form, setForm }: any) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="w-full mt-2 p-4 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 outline-none"
      />
    </div>
  );
}
