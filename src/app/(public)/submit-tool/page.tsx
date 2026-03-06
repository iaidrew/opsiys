"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SubmitToolPage() {

  const [name,        setName]        = useState("");
  const [description, setDescription] = useState("");
  const [website,     setWebsite]     = useState("");
  const [category,    setCategory]    = useState("");
  const [pricing,     setPricing]     = useState("free");

  const submitTool = async () => {
    if (!name || !description || !website) {
      alert("Please fill all fields");
      return;
    }
    try {
      await addDoc(collection(db, "aiToolsPending"), {
        name, description, website, category, pricing,
        createdAt: new Date(),
      });
      alert("Tool submitted successfully!");
      setName(""); setDescription(""); setWebsite("");
      setCategory(""); setPricing("free");
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  const pricingOptions = [
    { value: "free",     label: "Free",     desc: "Always free to use",        color: "#34d399" },
    { value: "freemium", label: "Freemium", desc: "Free + paid upgrades",      color: "#fbbf24" },
    { value: "paid",     label: "Paid",     desc: "Requires a subscription",   color: "#f87171" },
  ];

  const categories = ["Design","Writing","Marketing","Coding","Productivity","Video","Research","Audio","Other"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after { box-sizing: border-box; }

        .sp { font-family: 'DM Sans', sans-serif; min-height: 100vh; background: #040406; color: #fff; position: relative; overflow-x: hidden; }
        .sp h1, .sp h2 { font-family: 'Syne', sans-serif; }

        /* BG */
        .sp-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px);
          background-size: 56px 56px; }
        .sp-orb1 { position: fixed; width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(239,68,68,0.11) 0%, transparent 65%);
          top: -280px; right: -180px; filter: blur(60px); pointer-events: none; z-index: 0; }
        .sp-orb2 { position: fixed; width: 450px; height: 450px; border-radius: 50%;
          background: radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%);
          bottom: -80px; left: -130px; filter: blur(75px); pointer-events: none; z-index: 0; }

        /* LAYOUT */
        .sp-inner { position: relative; z-index: 1; max-width: 620px; margin: 0 auto; padding: 80px 28px 100px; }

        /* HEADER */
        .sp-eyebrow { display: inline-flex; align-items: center; gap: 7px;
          background: rgba(239,68,68,0.07); border: 1px solid rgba(239,68,68,0.18);
          color: #f87171; font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 100px; margin-bottom: 18px; }
        @keyframes sp-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .sp-dot { width: 5px; height: 5px; border-radius: 50%; background: #f87171; animation: sp-blink 2s ease-in-out infinite; }

        .sp-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.05;
          letter-spacing: -0.025em; color: #fff; margin-bottom: 10px; }
        .sp-grad { background: linear-gradient(125deg, #ef4444 0%, #dc2626 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .sp-subtitle { color: #71717a; font-size: 14px; line-height: 1.7; font-weight: 300; margin-bottom: 40px; }

        /* DIVIDER */
        .sp-div { height: 1px; margin-bottom: 36px;
          background: linear-gradient(90deg, transparent, rgba(50,50,55,0.8) 20%, rgba(239,68,68,0.14) 50%, rgba(50,50,55,0.8) 80%, transparent); }

        /* CARD WRAPPER */
        .sp-card { background: rgba(10,10,13,0.95); border: 1px solid rgba(36,36,40,1);
          border-radius: 20px; padding: 36px; backdrop-filter: blur(12px); }

        /* FIELD */
        .sp-field { margin-bottom: 20px; }
        .sp-label { display: flex; align-items: center; gap: 7px;
          font-size: 11.5px; font-weight: 600; color: #71717a;
          letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; }
        .sp-label-dot { width: 4px; height: 4px; border-radius: 50%; background: #ef4444; }

        .sp-input, .sp-textarea {
          width: 100%; background: rgba(18,18,22,0.9);
          border: 1px solid rgba(42,42,48,1); border-radius: 11px;
          padding: 13px 16px; color: #e4e4e7;
          font-size: 13.5px; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          outline: none;
        }
        .sp-input::placeholder, .sp-textarea::placeholder { color: #3a3a42; }
        .sp-input:focus, .sp-textarea:focus {
          border-color: rgba(239,68,68,0.45);
          box-shadow: 0 0 0 3px rgba(239,68,68,0.07);
          background: rgba(18,18,22,1);
        }
        .sp-input-icon { position: relative; }
        .sp-input-icon .sp-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: #4a4a56; pointer-events: none; }
        .sp-input-icon .sp-input { padding-left: 40px; }
        .sp-textarea { resize: vertical; min-height: 110px; line-height: 1.65; }

        /* CATEGORY PILLS */
        .sp-cat-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .sp-cat-pill {
          padding: 7px 14px; border-radius: 100px; font-size: 12px; font-weight: 500;
          border: 1px solid rgba(42,42,48,1); background: rgba(18,18,22,0.9);
          color: #71717a; cursor: pointer;
          transition: all 0.18s ease;
        }
        .sp-cat-pill:hover { border-color: rgba(239,68,68,0.35); color: #d4d4d8; }
        .sp-cat-pill.active { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.45); color: #f87171; font-weight: 600; }

        /* PRICING CARDS */
        .sp-pricing-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
        .sp-price-card {
          padding: 14px 12px; border-radius: 12px; cursor: pointer; text-align: center;
          border: 1px solid rgba(42,42,48,1); background: rgba(18,18,22,0.9);
          transition: all 0.18s ease;
        }
        .sp-price-card:hover { border-color: rgba(239,68,68,0.3); }
        .sp-price-card.active { background: rgba(239,68,68,0.07); }
        .sp-price-label { font-size: 13px; font-weight: 700; margin-bottom: 3px; font-family: 'Syne', sans-serif; }
        .sp-price-desc { font-size: 10.5px; color: #52525b; line-height: 1.4; }

        /* SECTION DIVIDER inside card */
        .sp-section-div { height: 1px; background: rgba(36,36,42,1); margin: 28px 0; }

        /* SUBMIT */
        .sp-submit {
          width: 100%; padding: 15px; border-radius: 12px; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700;
          color: #fff; letter-spacing: 0.02em;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          box-shadow: 0 4px 20px rgba(239,68,68,0.28);
          transition: box-shadow 0.22s, transform 0.22s;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          position: relative; overflow: hidden;
        }
        .sp-submit::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }
        .sp-submit:hover::before { left: 100%; }
        .sp-submit:hover { box-shadow: 0 6px 28px rgba(239,68,68,0.42); transform: translateY(-1px); }
        .sp-submit:active { transform: translateY(0); }

        /* NOTE */
        .sp-note { display: flex; align-items: flex-start; gap: 9px;
          background: rgba(239,68,68,0.04); border: 1px solid rgba(239,68,68,0.1);
          border-radius: 10px; padding: 12px 14px; margin-top: 16px; }
        .sp-note-icon { color: #ef4444; flex-shrink: 0; margin-top: 1px; }
        .sp-note p { font-size: 11.5px; color: #71717a; line-height: 1.6; }
        .sp-note strong { color: #a1a1aa; font-weight: 500; }

        @keyframes sp-fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .sp-fadein { animation: sp-fadeUp 0.45s cubic-bezier(.4,0,.2,1) both; }
      `}</style>

      <div className="sp">
        <div className="sp-grid"/><div className="sp-orb1"/><div className="sp-orb2"/>

        <div className="sp-inner">

          {/* Header */}
          <div className="sp-fadein">
            <div className="sp-eyebrow"><span className="sp-dot"/>Submit a Tool</div>
            <h1 className="sp-title">Add Your <span className="sp-grad">AI Tool</span></h1>
            <p className="sp-subtitle">Share a tool with the Opsiys community. All submissions are reviewed before going live.</p>
          </div>

          <div className="sp-div"/>

          {/* Form Card */}
          <div className="sp-card sp-fadein" style={{ animationDelay: "80ms" }}>

            {/* Tool Name */}
            <div className="sp-field">
              <div className="sp-label"><span className="sp-label-dot"/>Tool Name</div>
              <div className="sp-input-icon">
                <svg className="sp-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6M9 13h4"/></svg>
                <input className="sp-input" placeholder="e.g. Midjourney, ChatGPT…" value={name} onChange={e=>setName(e.target.value)}/>
              </div>
            </div>

            {/* Website */}
            <div className="sp-field">
              <div className="sp-label"><span className="sp-label-dot"/>Website URL</div>
              <div className="sp-input-icon">
                <svg className="sp-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                <input className="sp-input" placeholder="https://yourtool.com" value={website} onChange={e=>setWebsite(e.target.value)}/>
              </div>
            </div>

            {/* Description */}
            <div className="sp-field">
              <div className="sp-label"><span className="sp-label-dot"/>Description</div>
              <textarea className="sp-textarea" placeholder="Briefly describe what this tool does and who it's for…" value={description} onChange={e=>setDescription(e.target.value)}/>
            </div>

            <div className="sp-section-div"/>

            {/* Category Pills */}
            <div className="sp-field">
              <div className="sp-label"><span className="sp-label-dot"/>Category</div>
              <div className="sp-cat-grid">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`sp-cat-pill${category === c ? " active" : ""}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="sp-section-div"/>

            {/* Pricing Cards */}
            <div className="sp-field" style={{ marginBottom: 28 }}>
              <div className="sp-label"><span className="sp-label-dot"/>Pricing Model</div>
              <div className="sp-pricing-grid">
                {pricingOptions.map(opt => (
                  <div
                    key={opt.value}
                    onClick={() => setPricing(opt.value)}
                    className={`sp-price-card${pricing === opt.value ? " active" : ""}`}
                    style={pricing === opt.value ? { borderColor: opt.color + "55" } : {}}
                  >
                    <div className="sp-price-label" style={{ color: pricing === opt.value ? opt.color : "#a1a1aa" }}>{opt.label}</div>
                    <div className="sp-price-desc">{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button className="sp-submit" onClick={submitTool}>
              Submit for Review
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            {/* Note */}
            <div className="sp-note">
              <svg className="sp-note-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
              <p><strong>Review process:</strong> Submissions are manually reviewed within 24–48 hours. You'll see your tool live once approved.</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}