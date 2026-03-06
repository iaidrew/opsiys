"use client";

import { useEffect, useState } from "react";
import {
  collection, query, limit, getDocs, startAfter,
  orderBy, QueryDocumentSnapshot, DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface Tool {
  id: string; name: string; description: string;
  website: string; category: string; pricing: string; logo?: string;
}

const PM: Record<string, { label: string; color: string; bg: string; border: string }> = {
  free:     { label: "Free",     color: "#34d399", bg: "rgba(52,211,153,0.09)",  border: "rgba(52,211,153,0.2)" },
  freemium: { label: "Freemium", color: "#fbbf24", bg: "rgba(251,191,36,0.09)",  border: "rgba(251,191,36,0.2)" },
  paid:     { label: "Paid",     color: "#f87171", bg: "rgba(248,113,113,0.09)", border: "rgba(248,113,113,0.2)" },
};

const CAT_ICON: Record<string, string> = {
  Productivity: "⚡", Design: "🎨", Video: "🎬", Writing: "✍️",
  Marketing: "📣", Coding: "{}", Research: "🔬", Audio: "🎙️",
};

const ACCENTS = ["#ef4444","#f97316","#eab308","#22c55e","#3b82f6","#8b5cf6","#ec4899","#14b8a6"];

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function ToolsPage() {
  const [tools, setTools]     = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("all");
  const [pricing,  setPricing]  = useState("all");

  const categories  = ["all","Productivity","Design","Video","Writing","Marketing","Coding","Research"];
  const pricingOpts = ["all","free","freemium","paid"];

  async function fetchTools(reset = false) {
    try {
      setLoading(true);
      const q = lastDoc && !reset
        ? query(collection(db,"aiTools"), orderBy("createdAt","desc"), startAfter(lastDoc), limit(16))
        : query(collection(db,"aiTools"), orderBy("createdAt","desc"), limit(16));
      const snapshot = await getDocs(q);
      const newTools: Tool[] = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Tool,"id">) }));
      if (reset) {
        setTools(newTools);
      } else {
        const merged = [...tools, ...newTools];
        setTools(Array.from(new Map(merged.map((t) => [t.id, t])).values()));
      }
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchTools(true); }, []);

  const filtered = tools.filter((t) => {
    const name = t.name || "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || t.category === category) &&
      (pricing  === "all" || t.pricing  === pricing)
    );
  });

  const hasFilters = search || category !== "all" || pricing !== "all";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .tp * { font-family: 'DM Sans', sans-serif; }
        .tp h1, .tp h3 { font-family: 'Syne', sans-serif; }

        .tp-grid-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .tp-orb1 {
          position: fixed; width: 750px; height: 750px; border-radius: 50%;
          background: radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 65%);
          top: -300px; right: -200px; filter: blur(64px); pointer-events: none; z-index: 0;
        }
        .tp-orb2 {
          position: fixed; width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(239,68,68,0.055) 0%, transparent 70%);
          bottom: -80px; left: -160px; filter: blur(80px); pointer-events: none; z-index: 0;
        }

        .tp-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(239,68,68,0.07); border: 1px solid rgba(239,68,68,0.18);
          color: #f87171; font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 100px; margin-bottom: 16px;
        }
        @keyframes tp-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .tp-ldot { width:5px;height:5px;border-radius:50%;background:#f87171;animation:tp-blink 2s ease-in-out infinite; }

        .tp-grad {
          background: linear-gradient(125deg, #ef4444 0%, #dc2626 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .tp-sbtn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg,#ef4444,#dc2626);
          color: #fff; font-family: 'DM Sans',sans-serif;
          font-size: 13px; font-weight: 600;
          padding: 11px 22px; border-radius: 11px;
          box-shadow: 0 4px 18px rgba(239,68,68,0.26);
          transition: box-shadow .2s, transform .2s;
        }
        .tp-sbtn:hover { box-shadow: 0 6px 26px rgba(239,68,68,0.4); transform: translateY(-1px); }

        .tp-div {
          height: 1px; margin: 24px 0 36px;
          background: linear-gradient(90deg, transparent, rgba(50,50,55,0.8) 20%, rgba(239,68,68,0.14) 50%, rgba(50,50,55,0.8) 80%, transparent);
        }

        .tp-fi-wrap { position: relative; }
        .tp-fi-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: #4a4a52; pointer-events: none; }
        .tp-input, .tp-select {
          width: 100%; background: rgba(12,12,15,0.95);
          border: 1px solid rgba(38,38,42,1); border-radius: 10px;
          padding: 11px 15px 11px 39px; color: #d4d4d8;
          font-size: 13px; font-family: 'DM Sans',sans-serif;
          transition: border-color .18s, box-shadow .18s;
        }
        .tp-input::placeholder { color: #3a3a3f; }
        .tp-input:focus, .tp-select:focus {
          outline: none; border-color: rgba(239,68,68,0.45);
          box-shadow: 0 0 0 3px rgba(239,68,68,0.06);
        }
        .tp-select {
          appearance: none; cursor: pointer; padding-right: 32px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%234a4a52' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
          background-color: rgba(12,12,15,0.95);
        }

        .tp-clear {
          background: none; border: none; color: rgba(239,68,68,0.5);
          font-size: 12px; cursor: pointer; text-decoration: underline;
          text-underline-offset: 3px; font-family: 'DM Sans',sans-serif;
        }
        .tp-clear:hover { color: #ef4444; }

        @keyframes tp-fadeUp { from{opacity:0;transform:translateY(13px)} to{opacity:1;transform:translateY(0)} }

        .tp-card {
          background: rgba(10,10,12,0.98);
          border: 1px solid rgba(32,32,36,1);
          border-radius: 15px; padding: 22px;
          display: flex; flex-direction: column;
          text-decoration: none; cursor: pointer;
          transition: transform .24s cubic-bezier(.4,0,.2,1), border-color .24s, box-shadow .24s;
          position: relative; overflow: hidden;
          animation: tp-fadeUp .36s cubic-bezier(.4,0,.2,1) both;
        }
        .tp-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--ac, #ef4444); opacity: 0; transition: opacity .24s;
          border-radius: 15px 15px 0 0;
        }
        .tp-card:hover::after { opacity: 0.7; }
        .tp-card:hover {
          border-color: rgba(239,68,68,0.2); transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(0,0,0,0.55), 0 4px 10px rgba(239,68,68,0.05);
        }

        .tp-logo {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne',sans-serif; font-size: 12px; font-weight: 800;
          margin-bottom: 15px; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.05); letter-spacing: -0.02em;
        }
        .tp-name { font-family: 'Syne',sans-serif; font-size: 15px; font-weight: 700; color: #f0f0f2; margin-bottom: 9px; line-height: 1.2; }
        .tp-desc {
          font-size: 12.5px; color: #6b6b72; line-height: 1.7; margin-bottom: 18px; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .tp-foot {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px; border-top: 1px solid rgba(28,28,32,1);
        }
        .tp-cat { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; color: #4a4a52; }
        .tp-pill { font-size: 10.5px; font-weight: 700; padding: 3px 10px; border-radius: 100px; border: 1px solid; }
        .tp-visit { display: inline-flex; align-items: center; gap: 5px; color: #2e2e34; font-size: 11px; margin-top: 10px; transition: color .2s; }
        .tp-card:hover .tp-visit { color: #ef4444; }

        .tp-load-btn {
          display: inline-flex; align-items: center; gap: 9px;
          background: transparent; border: 1px solid rgba(239,68,68,0.28);
          color: #ef4444; font-family: 'DM Sans',sans-serif;
          font-size: 13px; font-weight: 600;
          padding: 12px 36px; border-radius: 11px; cursor: pointer;
          transition: border-color .2s, box-shadow .2s;
        }
        .tp-load-btn:hover { border-color: rgba(239,68,68,0.58); box-shadow: 0 0 24px rgba(239,68,68,0.11); }
        .tp-load-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .tp-h1 { font-size: clamp(2.2rem,4vw,3.6rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.025em; color: #fff; margin-bottom: 12px; }
        .tp-sub { color: #71717a; font-size: 14.5px; line-height: 1.75; font-weight: 300; max-width: 460px; }
        .tp-filters { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 16px; }
        @media(max-width:700px){ .tp-filters { grid-template-columns: 1fr; } }
        .tp-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; }
        .tp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(255px,1fr)); gap: 16px; }
        .tp-empty { text-align: center; padding: 80px 0; }
        .tp-loadwrap { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 56px; }
        .tp-spin-wrap { display: flex; align-items: center; gap: 8px; }
        @keyframes tp-spin { to { transform: rotate(360deg); } }
        .tp-spin { animation: tp-spin 0.9s linear infinite; }
      `}</style>

      <section className="tp min-h-screen bg-[#040406] relative overflow-hidden">
        <div className="tp-grid-bg" />
        <div className="tp-orb1" />
        <div className="tp-orb2" />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1160px", margin: "0 auto", padding: "80px 40px 88px" }}>

          {/* ── Header ── */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between", gap: "24px", marginBottom: "24px" }}>
            <div>
              <div className="tp-eyebrow">
                <span className="tp-ldot" />
                AI Ecosystem · Live Directory
              </div>
              <h1 className="tp-h1">
                AI Tools <span className="tp-grad">Directory</span>
              </h1>
              <p className="tp-sub">
                Discover powerful AI tools for founders, creators and businesses.
                Search, filter and explore the ecosystem.
              </p>
            </div>
            <Link href="/submit-tool" className="tp-sbtn">
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.45)", display: "inline-block" }} />
              Submit a Tool
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="tp-div" />

          {/* ── Filters ── */}
          <div className="tp-filters">
            <div className="tp-fi-wrap">
              <svg className="tp-fi-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <input className="tp-input" placeholder="Search AI tools..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="tp-fi-wrap">
              <svg className="tp-fi-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
              <select className="tp-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => <option key={c} value={c} style={{ background: "#0a0a0c" }}>{c === "all" ? "All Categories" : c}</option>)}
              </select>
            </div>
            <div className="tp-fi-wrap">
              <svg className="tp-fi-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
              <select className="tp-select" value={pricing} onChange={(e) => setPricing(e.target.value)}>
                {pricingOpts.map((p) => <option key={p} value={p} style={{ background: "#0a0a0c" }}>{p === "all" ? "All Pricing" : p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
          </div>

          {/* Meta */}
          <div className="tp-meta">
            <span style={{ color: "#333338", fontSize: 12 }}>Showing {filtered.length} tool{filtered.length !== 1 ? "s" : ""}</span>
            {hasFilters && (
              <button className="tp-clear" onClick={() => { setSearch(""); setCategory("all"); setPricing("all"); }}>✕ Clear</button>
            )}
          </div>

          {/* ── Grid ── */}
          {filtered.length === 0 && !loading ? (
            <div className="tp-empty">
              <div style={{ fontSize: 32, opacity: 0.15, marginBottom: 12 }}>🔍</div>
              <p style={{ color: "#4a4a52", fontSize: 15, fontWeight: 500 }}>No tools found</p>
              <p style={{ color: "#2e2e34", fontSize: 12, marginTop: 4 }}>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="tp-grid">
              {filtered.map((tool, i) => {
                const pm = PM[tool.pricing];
                const ac = ACCENTS[i % ACCENTS.length];
                return (
                  <a
                    key={tool.id + i}
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tp-card"
                    style={{ "--ac": ac, animationDelay: `${Math.min(i * 42, 440)}ms` } as React.CSSProperties}
                  >
                    {tool.logo ? (
                      <img src={tool.logo} alt={tool.name} className="tp-logo" style={{ objectFit: "cover" }} />
                    ) : (
                      <div className="tp-logo" style={{ background: `${ac}14`, color: ac }}>{getInitials(tool.name)}</div>
                    )}
                    <div className="tp-name">{tool.name}</div>
                    <p className="tp-desc">{tool.description}</p>
                    <div className="tp-foot">
                      <span className="tp-cat">
                        <span>{CAT_ICON[tool.category] || "🤖"}</span>
                        <span>{tool.category}</span>
                      </span>
                      {pm && <span className="tp-pill" style={{ color: pm.color, background: pm.bg, borderColor: pm.border }}>{pm.label}</span>}
                    </div>
                    <div className="tp-visit">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      Visit website
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* ── Load More ── */}
          <div className="tp-loadwrap">
            <button onClick={() => fetchTools()} disabled={loading} className="tp-load-btn">
              {loading ? (
                <span className="tp-spin-wrap">
                  <svg className="tp-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 00-9-9" /></svg>
                  Loading...
                </span>
              ) : (
                <>Load More Tools <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg></>
              )}
            </button>
            <span style={{ color: "#222226", fontSize: 11 }}>Showing {filtered.length} tools</span>
          </div>

        </div>
      </section>
    </>
  );
}