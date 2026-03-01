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

import {
  generateActionPlan,
  generateExecutiveSummary,
  generateBenchmarkData,
} from "@/lib/aiEngine";

export default async function StartupDashboard(props: {
  params: Promise<{ startupId: string }>;
}) {
  /* ✅ Next 15 fix */
  const { startupId } = await props.params;

  if (!startupId) redirect("/dashboard/profile");

  /* ---------- Auth ---------- */
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session?.value) redirect("/login");

  const decoded = await adminAuth.verifySessionCookie(
    session.value,
    true
  );

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

  const advisorMessages =
    messagesSnap.docs.map((doc) => ({
      role: doc.data().role,
      content: doc.data().content,
    })) ?? [];

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

  const actionPlan = generateActionPlan(scores);
  const executiveSummary = generateExecutiveSummary(
    scores,
    averageScore,
    riskIndex,
    growthSpread
  );
  const benchmarkData = generateBenchmarkData(assessments);

  const trendData = assessments.map((a: any) => ({
    date: a.createdAt.toDate().toLocaleDateString(),
    score: a.averageScore,
  }));

  return (
    <div className="min-h-screen bg-black text-white px-10 py-24">
      <div className="max-w-6xl mx-auto space-y-20">

        <div>
          <h1 className="text-5xl font-black mb-4">
            Executive Intelligence Center
          </h1>
          <p className="text-gray-500">
            Strategic performance analysis of your startup.
          </p>
        </div>

        <ExecutiveKPIs
          average={averageScore}
          risk={riskIndex}
          growthSpread={growthSpread}
        />

        <CategoryBreakdown scores={scores} />

        <ExecutiveSummary summary={executiveSummary} />

        <BenchmarkPanel data={benchmarkData} />

        <BottleneckPanel scores={scores} />

        <ActionPlanPanel
          weakestCategory={actionPlan.weakestCategory}
          severity={actionPlan.severity}
          plan={actionPlan.plan}
        />

        {/* ✅ Advisor now properly receives startupId */}
        <AdvisorPanel
          startupId={startupId}
          initialMessages={advisorMessages}
        />

        <RadarChartComponent scores={scores} />

        {trendData.length > 1 && (
          <TrendChart data={trendData} />
        )}

      </div>
    </div>
  );
}