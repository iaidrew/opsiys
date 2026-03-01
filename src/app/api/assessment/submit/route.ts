import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {

  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session?.value) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const decoded = await adminAuth.verifySessionCookie(
    session.value,
    true
  );

  const userId = decoded.uid;
  const { startupId, scores } = await req.json();

  if (!startupId || !scores) {
    return NextResponse.json(
      { error: "Invalid data" },
      { status: 400 }
    );
  }

  const values = Object.values(scores) as number[];

const average =
  values.reduce((acc, val) => acc + val, 0) /
  values.length;

const sorted = [...values].sort(
  (a: number, b: number) => a - b
);

const riskIndex = (sorted[0] + sorted[1]) / 2;

const growthSpread =
  sorted[sorted.length - 1] - sorted[0];

  await adminDb.collection("assessments").add({
    userId,
    startupId,
    scores,
    averageScore: Number(average.toFixed(2)),
    riskIndex: Number(riskIndex.toFixed(2)),
    growthSpread,
    createdAt: new Date(),
  });

  return NextResponse.json({ status: "success" });
}