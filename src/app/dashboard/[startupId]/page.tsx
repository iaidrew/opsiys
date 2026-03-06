import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

import RadarChartComponent from "@/components/dashboard/RadarChart";
import ExecutiveKPIs from "@/components/dashboard/ExecutiveKPIs";
import TrendChart from "@/components/dashboard/TrendChart";
import BottleneckPanel from "@/components/dashboard/BottleneckPanel";
import ActionPlanPanel from "@/components/dashboard/ActionPlanPanel";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import ExecutiveSummary from "@/components/dashboard/ExecutiveSummary";
import BenchmarkPanel from "@/components/dashboard/BenchmarkPanel";
import AdvisorPanel from "@/components/dashboard/AdvisorPanel";
import InvestorReportPanel from "@/components/dashboard/InvestorReportPanel";

import {
  generateActionPlan,
  generateExecutiveSummary,
  generateBenchmarkData,
} from "@/lib/aiEngine";

export default async function StartupDashboard(props: {
  params: Promise<{ startupId: string }>;
}) {
  /* ✅ Unwrap params Promise */
  const { startupId } = await props.params;

  if (!startupId) {
    redirect("/dashboard/profile");
  }

  /* ✅ cookies() MUST be awaited in your setup */
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session?.value) {
    redirect("/login");
  }

  const decoded = await adminAuth.verifySessionCookie(session.value, true);
  const userId = decoded.uid;

  /* ---------- Advisor Messages ---------- */
  const messagesSnap = await adminDb
    .collection("users")
    .doc(userId)
    .collection("startups")
    .doc(startupId)
    .collection("advisorMessages")
    .orderBy("createdAt", "asc")
    .get();

  const advisorMessages = messagesSnap.docs.map((doc) => ({
    role: doc.data().role,
    content: doc.data().content,
  }));

  /* ---------- Assessments ---------- */
  const assessmentsSnap = await adminDb
    .collection("assessments")
    .where("startupId", "==", startupId)
    .where("userId", "==", userId)
    .orderBy("createdAt", "asc")
    .get();

  if (assessmentsSnap.empty) {
    redirect(`/dashboard/${startupId}/assessment`);
  }

  const assessments = assessmentsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const latest: any = assessments[assessments.length - 1];
  const { scores, averageScore, riskIndex, growthSpread } = latest;

  const actionPlan      = generateActionPlan(scores);
  const executiveSummary = generateExecutiveSummary(scores, averageScore, riskIndex, growthSpread);
  const benchmarkData   = generateBenchmarkData(assessments);

  const trendData = assessments.map((a: any) => ({
    date: a.createdAt.toDate().toLocaleDateString(),
    score: a.averageScore,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .db-page   { font-family: 'DM Sans', sans-serif; }
        .db-page h1, .db-page h2, .db-page h3 { font-family: 'Syne', sans-serif; }

        /* ── Section wrapper ── */
        .db-section {
          background: rgba(10,10,13,0.75);
          border: 1px solid rgba(36,36,42,1);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          position: relative;
          overflow: hidden;
          transition: border-color .25s, box-shadow .25s;
        }
        .db-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(239,68,68,0.35), transparent);
          opacity: 0; transition: opacity .25s;
        }
        .db-section:hover::before { opacity: 1; }
        .db-section:hover {
          border-color: rgba(239,68,68,0.18);
          box-shadow: 0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(239,68,68,0.06);
        }

        /* ── Section label ── */
        .db-label {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(239,68,68,0.07); border: 1px solid rgba(239,68,68,0.18);
          color: #f87171; font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 4px 11px; border-radius: 100px; margin-bottom: 14px;
        }
        .db-label-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #ef4444;
        }

        /* ── Section heading ── */
        .db-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #f0f0f2; margin-bottom: 6px; line-height: 1.2;
        }
        .db-section-sub {
          font-size: 13px; color: #52525b; margin-bottom: 22px; line-height: 1.5;
        }

        /* ── Divider ── */
        .db-div {
          height: 1px; margin: 0;
          background: linear-gradient(90deg, transparent, rgba(36,36,42,1) 30%, rgba(239,68,68,0.12) 50%, rgba(36,36,42,1) 70%, transparent);
        }

        /* ── Grid layouts ── */
        .db-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .db-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 900px) { .db-grid-2, .db-grid-3 { grid-template-columns: 1fr; } }

        /* ── Fade-up animation ── */
        @keyframes db-fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .db-fade { animation: db-fadeUp .5s cubic-bezier(.4,0,.2,1) both; }

        /* ── Gradient text ── */
        .db-grad {
          background: linear-gradient(125deg, #ef4444 0%, #dc2626 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
      `}</style>

      <div className="db-page min-h-screen text-white" style={{ padding: "88px 40px 100px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

          {/* ═══════════════════════════════════
              HERO HEADER
          ═══════════════════════════════════ */}
          <div className="db-fade" style={{ marginBottom: "64px" }}>

            {/* Eyebrow */}
            <div className="db-label" style={{ marginBottom: "20px" }}>
              <span className="db-label-dot" style={{ animation: "none", background: "#ef4444" }} />
              Executive Intelligence Center
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <h1 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                  fontWeight: 800, lineHeight: 1.05,
                  letterSpacing: "-0.025em", color: "#fff",
                  marginBottom: "12px",
                }}>
                  Startup{" "}
                  <span className="db-grad">Intelligence</span>
                </h1>
                <p style={{ color: "#52525b", fontSize: "15px", fontWeight: 300, lineHeight: 1.7, maxWidth: "480px" }}>
                  Strategic performance analysis, benchmarking and AI-powered insights for your startup.
                </p>
              </div>

              {/* Assessment count badge */}
              <div style={{
                background: "rgba(10,10,13,0.9)", border: "1px solid rgba(36,36,42,1)",
                borderRadius: "14px", padding: "14px 22px", textAlign: "center",
                backdropFilter: "blur(12px)",
              }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "26px", fontWeight: 800, color: "#f0f0f2", lineHeight: 1 }}>
                  {assessments.length}
                </div>
                <div style={{ fontSize: "11px", color: "#52525b", marginTop: "4px", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
                  Assessments
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="db-div" style={{ marginTop: "32px" }} />
          </div>

          {/* ═══════════════════════════════════
              EXECUTIVE KPIs
          ═══════════════════════════════════ */}
          <div className="db-section db-fade" style={{ marginBottom: "20px", animationDelay: "60ms" }}>
            <div className="db-label"><span className="db-label-dot"/>Key Performance Indicators</div>
            <p className="db-section-sub">Your latest assessment at a glance</p>
            <ExecutiveKPIs
              average={averageScore}
              risk={riskIndex}
              growthSpread={growthSpread}
            />
          </div>

          {/* ═══════════════════════════════════
              CATEGORY BREAKDOWN + RADAR
          ═══════════════════════════════════ */}
          <div className="db-grid-2" style={{ marginBottom: "20px" }}>

            <div className="db-section db-fade" style={{ animationDelay: "100ms" }}>
              <div className="db-label"><span className="db-label-dot"/>Category Breakdown</div>
              <p className="db-section-sub">Score distribution across all domains</p>
              <CategoryBreakdown scores={scores} />
            </div>

            <div className="db-section db-fade" style={{ animationDelay: "130ms" }}>
              <div className="db-label"><span className="db-label-dot"/>Performance Radar</div>
              <p className="db-section-sub">Multi-dimensional view of your strengths</p>
              <RadarChartComponent scores={scores} />
            </div>

          </div>

          {/* ═══════════════════════════════════
              EXECUTIVE SUMMARY
          ═══════════════════════════════════ */}
          <div className="db-section db-fade" style={{ marginBottom: "20px", animationDelay: "160ms" }}>
            <div className="db-label"><span className="db-label-dot"/>Executive Summary</div>
            <p className="db-section-sub">AI-generated strategic overview</p>
            <ExecutiveSummary summary={executiveSummary} />
          </div>

          {/* ═══════════════════════════════════
              BENCHMARK + TREND
          ═══════════════════════════════════ */}
          <div className={trendData.length > 1 ? "db-grid-2" : ""} style={{ marginBottom: "20px" }}>

            <div className="db-section db-fade" style={{ animationDelay: "190ms" }}>
              <div className="db-label"><span className="db-label-dot"/>Benchmark Analysis</div>
              <p className="db-section-sub">How you compare to industry peers</p>
              <BenchmarkPanel data={benchmarkData} />
            </div>

            {trendData.length > 1 && (
              <div className="db-section db-fade" style={{ animationDelay: "210ms" }}>
                <div className="db-label"><span className="db-label-dot"/>Score Trend</div>
                <p className="db-section-sub">Progress tracked across assessments</p>
                <TrendChart data={trendData} />
              </div>
            )}

          </div>

          {/* ═══════════════════════════════════
              BOTTLENECK + ACTION PLAN
          ═══════════════════════════════════ */}
          <div className="db-grid-2" style={{ marginBottom: "20px" }}>

            <div className="db-section db-fade" style={{ animationDelay: "230ms" }}>
              <div className="db-label"><span className="db-label-dot"/>Bottleneck Detector</div>
              <p className="db-section-sub">Weakest areas dragging your score</p>
              <BottleneckPanel scores={scores} />
            </div>

            <div className="db-section db-fade" style={{ animationDelay: "250ms" }}>
              <div className="db-label"><span className="db-label-dot"/>Action Plan</div>
              <p className="db-section-sub">Prioritised steps to move the needle</p>
              <ActionPlanPanel
                weakestCategory={actionPlan.weakestCategory}
                severity={actionPlan.severity}
                plan={actionPlan.plan}
              />
            </div>

          </div>

          {/* ═══════════════════════════════════
              AI ADVISOR
          ═══════════════════════════════════ */}
          <div className="db-section db-fade" style={{ marginBottom: "20px", animationDelay: "280ms" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "22px" }}>
              <div>
                <div className="db-label" style={{ marginBottom: "8px" }}>
                  <span className="db-label-dot" style={{ animation: "db-fadeUp 2s ease-in-out infinite" }}/>
                  AI Advisor
                </div>
                <p className="db-section-sub" style={{ marginBottom: 0 }}>Ask anything about your startup performance</p>
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)",
                color: "#34d399", fontSize: "11px", fontWeight: 600,
                padding: "4px 12px", borderRadius: "100px", letterSpacing: "0.06em",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399", display: "inline-block" }}/>
                Online
              </div>
            </div>
            <AdvisorPanel
              startupId={startupId}
              initialMessages={advisorMessages}
            />
          </div>

          {/* ═══════════════════════════════════
              INVESTOR REPORT
          ═══════════════════════════════════ */}
          <div className="db-section db-fade" style={{ animationDelay: "310ms" }}>
            <div className="db-label" style={{ marginBottom: "14px" }}>
              <span className="db-label-dot"/>
              Investor Report
            </div>
            <p className="db-section-sub">Export a board-ready analysis of your startup</p>
            <InvestorReportPanel startupId={startupId} />
          </div>

        </div>
      </div>
    </>
  );
}