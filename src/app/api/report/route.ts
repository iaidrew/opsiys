import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { startupId } = await req.json();

    if (!startupId) {
      return new Response("Missing startupId", { status: 400 });
    }

    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session?.value) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(
      session.value,
      true
    );

    const userId = decoded.uid;

    /* 🔥 NO ORDER BY → NO INDEX NEEDED */
    const assessmentSnap = await adminDb
      .collection("assessments")
      .where("startupId", "==", startupId)
      .where("userId", "==", userId)
      .get();

    if (assessmentSnap.empty) {
      return new Response("No assessment found", { status: 404 });
    }

    /* Sort manually in Node */
    const assessments = assessmentSnap.docs.map((doc) =>
      doc.data()
    );

    assessments.sort(
      (a: any, b: any) =>
        b.createdAt.toDate() - a.createdAt.toDate()
    );

    const latest = assessments[0];

    const scores = latest?.scores ?? {};
    const averageScore = latest?.averageScore ?? 0;
    const riskIndex = latest?.riskIndex ?? 0;
    const growthSpread = latest?.growthSpread ?? 0;

    if (!process.env.OPENROUTER_API_KEY) {
      return new Response("Missing API Key", { status: 500 });
    }

    const prompt = `
Generate a professional investor-grade startup report.

Startup Metrics:
- Average Score: ${averageScore}
- Risk Index: ${riskIndex}
- Growth Spread: ${growthSpread}
- Category Scores: ${JSON.stringify(scores)}

Structure the report with:

# Executive Summary
# Market & Opportunity
# Product Strength Analysis
# Risk Assessment
# Growth Strategy
# Financial Outlook
# Investment Recommendation

Use clean markdown formatting.
Make it board-room ready.
    `;

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
          stream: true,
          messages: [
            {
              role: "system",
              content:
                "You are an elite startup investment analyst.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!response.body) {
      return new Response("No stream", { status: 500 });
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk
            .split("\n")
            .filter((line) => line.startsWith("data:"));

          for (const line of lines) {
            const jsonStr = line.replace("data:", "").trim();
            if (jsonStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(jsonStr);
              const token =
                parsed.choices?.[0]?.delta?.content;

              if (token) {
                controller.enqueue(
                  encoder.encode(token)
                );
              }
            } catch {}
          }
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });

  } catch (error) {
    console.error("REPORT ERROR:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}