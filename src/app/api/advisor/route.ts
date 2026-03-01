import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, startupId } = body;

    if (!message || !startupId) {
      return NextResponse.json(
        { error: "Missing message or startupId." },
        { status: 400 }
      );
    }

    /* ---------------- AUTH ---------------- */
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

    /* ---------------- OPENROUTER CALL ---------------- */
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "arcee-ai/trinity-large-preview:free",
          temperature: 0.4,
          messages: [
            {
              role: "system",
              content: `
You are a highly intelligent strategic advisor.
Respond clearly using Markdown formatting.
Use headings, bullet points and structure.
              `,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    /* 🚨 CRITICAL CHECK */
    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter Error:", errorText);

      return NextResponse.json(
        { error: "AI provider error." },
        { status: 500 }
      );
    }

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "No AI response." },
        { status: 500 }
      );
    }

    /* ---------------- SAVE MESSAGES ---------------- */
    const basePath = adminDb
      .collection("users")
      .doc(userId)
      .collection("startups")
      .doc(startupId)
      .collection("advisorMessages");

    await basePath.add({
      role: "user",
      content: message,
      createdAt: new Date(),
    });

    await basePath.add({
      role: "assistant",
      content: reply,
      createdAt: new Date(),
    });

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Advisor API Error:", error);

    return NextResponse.json(
      { error: "Advisor failed." },
      { status: 500 }
    );
  }
}