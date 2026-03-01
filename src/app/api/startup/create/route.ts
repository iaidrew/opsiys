import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {

  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = await adminAuth.verifySessionCookie(
    session.value,
    true
  );

  const userId = decoded.uid;
  const body = await req.json();

  const ref = await adminDb
    .collection("users")
    .doc(userId)
    .collection("startups")
    .add({
      ...body,
      createdAt: new Date(),
    });

  return NextResponse.json({ id: ref.id });
}