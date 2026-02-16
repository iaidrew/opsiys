"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function StartupProfilePage() {
  const [form, setForm] = useState({
    startupName: "",
    industry: "",
    stage: "",
    teamSize: "",
    revenue: "",
    funding: "",
    productScore: 5,
    marketingScore: 5,
    salesScore: 5,
    financeScore: 5,
    operationsScore: 5,
    leadershipScore: 5,
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Profile Data:", form);
    alert("Profile saved. Next: Assessment Phase 🚀");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">
          Startup Profile
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Basic Info */}
          <Input label="Startup Name" name="startupName" onChange={handleChange} />
          <Input label="Industry" name="industry" onChange={handleChange} />
          <Input label="Stage (Idea / MVP / Scaling)" name="stage" onChange={handleChange} />
          <Input label="Team Size" name="teamSize" onChange={handleChange} />
          <Input label="Monthly Revenue ($)" name="revenue" onChange={handleChange} />
          <Input label="Funding Raised ($)" name="funding" onChange={handleChange} />

        </div>

        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-semibold">Performance Self-Assessment</h2>

          <Slider label="Product Strength" name="productScore" value={form.productScore} setForm={setForm} />
          <Slider label="Marketing Strength" name="marketingScore" value={form.marketingScore} setForm={setForm} />
          <Slider label="Sales Process" name="salesScore" value={form.salesScore} setForm={setForm} />
          <Slider label="Financial Planning" name="financeScore" value={form.financeScore} setForm={setForm} />
          <Slider label="Operations" name="operationsScore" value={form.operationsScore} setForm={setForm} />
          <Slider label="Leadership & Vision" name="leadershipScore" value={form.leadershipScore} setForm={setForm} />

        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="mt-10 w-full py-4 rounded-2xl bg-red-600 hover:bg-red-500 transition font-semibold text-lg shadow-lg shadow-red-600/30"
        >
          Generate Report
        </motion.button>
      </motion.div>
    </div>
  );
}

/* Reusable Input */
function Input({ label, name, onChange }: any) {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-400">{label}</label>
      <input
        name={name}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 outline-none"
      />
    </div>
  );
}

/* Slider Component */
function Slider({ label, name, value, setForm }: any) {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-400">
        {label}: {value}/10
      </label>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) =>
          setForm((prev: any) => ({
            ...prev,
            [name]: Number(e.target.value),
          }))
        }
        className="w-full accent-red-600"
      />
    </div>
  );
}
