import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    // Count users
    const usersSnap = await adminDb.collection("users").get();
    const founders = usersSnap.size;

    // Count assessments (top-level collection)
    const assessmentsSnap = await adminDb.collection("assessments").get();
    const assessments = assessmentsSnap.size;

    let totalScore = 0;

    assessmentsSnap.forEach((doc) => {
      const data = doc.data();
      if (data.averageScore) {
        totalScore += data.averageScore;
      }
    });

    const avgScore =
      assessments > 0
        ? Math.round(totalScore / assessments)
        : 0;

    const completionRate =
      founders > 0
        ? Math.round((assessments / founders) * 100)
        : 0;

    return Response.json({
      founders,
      assessments,
      avgScore,
      completionRate,
    });

  } catch (error) {
    console.error("Stats API Error:", error);

    return Response.json(
      { founders: 0, assessments: 0, avgScore: 0, completionRate: 0 },
      { status: 200 }
    );
  }
}