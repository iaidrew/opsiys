import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "No ID token provided" },
        { status: 400 }
      );
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const sessionCookie = await adminAuth.createSessionCookie(
      idToken,
      { expiresIn }
    );

    const response = NextResponse.json({ status: "success" });

    response.cookies.set({
      name: "session",
      value: sessionCookie,
      httpOnly: true,
      secure: false, // 🔥 MUST be false in local dev
      maxAge: expiresIn / 1000,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}