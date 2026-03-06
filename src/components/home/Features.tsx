"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function Features() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      title: "Growth Tools",
      href: "/tools",
      description: "Strategic frameworks and battle-tested systems to scale from zero to structured execution.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path fill="#ef4444" d="M12 2.5c0 0 2 4.5 2 8 0 2.5-.8 4.5-2 6.5-.6 1-1.5 2-2 2.5v2.5h8v-2.5c-.5-.5-1.4-1.5-2-2.5-1.2-2-2-4-2-6.5 0-3.5 2-8 2-8z" />
        </svg>
      ),
      tag: "Scale faster", num: "01",
    },
    {
      title: "AI Co-Pilot",
      href: "/ai",
      description: "An intelligent layer embedded into your workflow to guide decisions and accelerate growth.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path fill="#ef4444" d="M12 3c-1.5 0-2.8.8-3.5 2A4 4 0 005 8c0 1 .4 2 1.2 2.6C5 12 4 14 4 16v2h3v-1.5c0-1.4.8-2.5 2-3 .2-.6.5-1.2 1-1.6v-.2c-.6-.4-1-1.1-1-1.9 0-.9.5-1.6 1.2-1.9.2-1.5 1.4-2.6 2.8-2.6s2.6 1.1 2.8 2.6c.7.3 1.2 1 1.2 1.9 0 .8-.4 1.5-1 1.9v.2c.5.4.8 1 1 1.6 1.2.5 2 1.6 2 3V18h3v-2c0-2-.9-4-2.2-5.4.8-.6 1.2-1.6 1.2-2.6a4 4 0 00-3.5-3C14.8 3.8 13.5 3 12 3z" />
        </svg>
      ),
      tag: "AI-powered", num: "02",
    },
    {
      title: "Command Center",
      href: "/analytics",
      description: "Real-time dashboards that transform raw metrics into executive clarity.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path fill="#ef4444" d="M4 18h4v-6H4v6zm6 0h4V6h-4v12zm6 0h4v-9h-4v9z" />
        </svg>
      ),
      tag: "Live metrics", num: "03",
    },
    {
      title: "Resource Vault",
      href: "/resources",
      description: "Founder-grade playbooks, templates and assets built for long-term leverage.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path fill="#ef4444" d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
        </svg>
      ),
      tag: "Ready to use", num: "04",
    },
  ];

  return (
    <>
      <style>{`
        .feat-section { position: relative; }

        .feat-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(239,68,68,0.07); border: 1px solid rgba(239,68,68,0.2);
          color: #f87171; font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          padding: 5px 13px; border-radius: 100px; margin-bottom: 24px;
        }
        @keyframes feat-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .feat-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #ef4444;
          animation: feat-blink 2s ease-in-out infinite;
        }

        .feat-heading {
          font-family: var(--font-syne), 'Syne', sans-serif;
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 800; line-height: 1.02;
          letter-spacing: -0.03em; color: #fff; margin-bottom: 18px;
        }
        .feat-heading-red { color: #ef4444; }

        .feat-sub {
          color: #52525b; font-size: 15px; line-height: 1.75;
          font-weight: 300; max-width: 520px;
        }

        .feat-section-div {
          height: 1px; margin: 52px 0;
          background: linear-gradient(90deg, transparent, rgba(239,68,68,0.2) 30%, rgba(239,68,68,0.2) 70%, transparent);
        }

        /* ── Card ── */
        .feat-card {
          background: rgba(10,10,13,0.92);
          border: 1px solid rgba(28,28,32,1);
          border-radius: 20px; padding: 36px 32px 30px;
          position: relative; overflow: hidden;
          transition: transform 0.3s cubic-bezier(.4,0,.2,1), border-color 0.3s, box-shadow 0.3s;
          display: flex; flex-direction: column;
        }
        .feat-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #ef4444, transparent);
          opacity: 0.12; transition: opacity 0.3s;
        }
        .feat-card::after {
          content: '';
          position: absolute; bottom: -50px; right: -50px;
          width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 70%);
          opacity: 0; transition: opacity 0.4s; pointer-events: none;
        }
        .feat-card:hover::before { opacity: 0.85; }
        .feat-card:hover::after  { opacity: 1; }
        .feat-card:hover {
          border-color: rgba(239,68,68,0.22);
          transform: translateY(-4px);
          box-shadow: 0 20px 44px rgba(0,0,0,0.65), 0 0 0 1px rgba(239,68,68,0.07);
        }

        .feat-num {
          font-family: var(--font-syne), 'Syne', sans-serif;
          font-size: 13px; font-weight: 800; color: #ef4444;
          letter-spacing: 0.05em; margin-bottom: 20px;
          display: block; position: relative; z-index: 1;
        }

        .feat-icon-wrap {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px; flex-shrink: 0;
          background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.18);
          position: relative; z-index: 1;
          transition: background 0.25s, border-color 0.25s;
        }
        .feat-card:hover .feat-icon-wrap {
          background: rgba(239,68,68,0.14); border-color: rgba(239,68,68,0.38);
        }

        .feat-card-title {
          font-family: var(--font-syne), 'Syne', sans-serif;
          font-size: 19px; font-weight: 700; color: #f0f0f2;
          margin-bottom: 10px; line-height: 1.2; position: relative; z-index: 1;
        }

        .feat-card-desc {
          font-size: 13.5px; color: #6b6b72; line-height: 1.75;
          flex: 1; margin-bottom: 24px; position: relative; z-index: 1;
        }

        .feat-card-div { height: 1px; background: rgba(28,28,32,1); margin-bottom: 20px; }

        .feat-tag {
          position: absolute; top: 28px; right: 28px;
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 100px;
          border: 1px solid rgba(239,68,68,0.15);
          color: rgba(239,68,68,0.45); background: rgba(239,68,68,0.05);
          z-index: 1; transition: border-color 0.25s, color 0.25s;
        }
        .feat-card:hover .feat-tag {
          border-color: rgba(239,68,68,0.35); color: #f87171;
        }

        .feat-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11.5px; font-weight: 700; color: #f87171;
          text-decoration: none; letter-spacing: 0.07em; text-transform: uppercase;
          position: relative; z-index: 1; transition: gap 0.2s, color 0.2s;
        }
        .feat-cta:hover { gap: 13px; color: #ef4444; }
        .feat-cta-arr {
          display: inline-flex; align-items: center; justify-content: center;
          width: 22px; height: 22px; border-radius: 50%;
          border: 1px solid rgba(239,68,68,0.25); background: rgba(239,68,68,0.07);
          transition: background 0.2s, border-color 0.2s;
        }
        .feat-cta:hover .feat-cta-arr {
          background: rgba(239,68,68,0.18); border-color: rgba(239,68,68,0.55);
        }
      `}</style>

      <section ref={ref} className="feat-section py-32 px-6">
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

          {/* ── Header ── */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="feat-eyebrow">
              <span className="feat-eyebrow-dot" />
              Capabilities
            </div>
            <h2 className="feat-heading">
              Your Complete.<br />
              <span className="feat-heading-red">Startup Operating System.</span>
            </h2>
            <p className="feat-sub">
              A structured environment to design, execute and scale with clarity.
              Every tool built to compound your momentum.
            </p>
          </div>

          {/* Divider */}
          <div
            className={`feat-section-div transition-all duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "120ms" }}
          />

          {/* ── Cards ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(460px, 1fr))", gap: "16px" }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feat-card transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: inView ? `${140 + index * 80}ms` : undefined }}
              >
                <span className="feat-tag">{feature.tag}</span>
                <span className="feat-num">{feature.num}</span>
                <div className="feat-icon-wrap">{feature.icon}</div>
                <h3 className="feat-card-title">{feature.title}</h3>
                <p className="feat-card-desc">{feature.description}</p>
                <div className="feat-card-div" />
                <Link href={feature.href} className="feat-cta">
                  Explore
                  <span className="feat-cta-arr">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}