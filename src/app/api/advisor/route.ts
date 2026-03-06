import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, startupId, mode = "general" } = body;

    if (!message || !startupId) {
      return new Response("Missing data", { status: 400 });
    }

    /* ---------- AUTH ---------- */
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

    /* ---------- LOAD MEMORY (last 10 messages) ---------- */
    const historySnap = await adminDb
      .collection("users")
      .doc(userId)
      .collection("startups")
      .doc(startupId)
      .collection("advisorMessages")
      .orderBy("createdAt", "asc")
      .limitToLast(10)
      .get();

    const history = historySnap.docs.map((doc) => ({
      role: doc.data().role,
      content: doc.data().content,
    }));

    /* ---------- MODE LOGIC ---------- */
    let modeInstruction = "";

    switch (mode) {
      case "growth":
        modeInstruction =
          "Focus on aggressive growth strategies, customer acquisition, revenue expansion and market dominance.";
        break;

      case "risk":
        modeInstruction =
          "Focus on risk mitigation, operational weaknesses, financial sustainability and downside protection.";
        break;

      case "fundraising":
        modeInstruction =
          "Respond like an elite fundraising advisor. Think investor-first, valuation strategy, pitch optimization and capital strategy.";
        break;

      case "scaling":
        modeInstruction =
          "Focus on systems, automation, hiring, delegation, infrastructure and scalability.";
        break;

      default:
        modeInstruction =
          "Act as a balanced strategic startup advisor.";
    }

    /* ---------- BUILD CONVERSATION ---------- */
    const conversation = [
      {
        role: "system",
        content: `
You are a professional AI strategic advisor.

Current Mode: ${mode}

${modeInstruction}

Maintain context from previous conversation.
Respond in structured Markdown using headings, bullet points and clarity.
        `,
      },
      ...history,
      {
        role: "user",
        content: message,
      },
    ];

    /* ---------- CALL OPENROUTER WITH STREAM ---------- */
    const aiResponse = await fetch(
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
          messages: conversation,
        }),
      }
    );

    if (!aiResponse.ok || !aiResponse.body) {
      const errorText = await aiResponse.text();
      console.error("OpenRouter Error:", errorText);
      return new Response("AI Provider Error", { status: 500 });
    }

    const reader = aiResponse.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    let fullReply = "";

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
                fullReply += token;
                controller.enqueue(
                  encoder.encode(token)
                );
              }
            } catch (err) {}
          }
        }

        controller.close();

        /* ---------- SAVE MEMORY ---------- */
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
          content: fullReply,
          createdAt: new Date(),
        });
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });

  } catch (error) {
    console.error("Advisor Route Error:", error);
    return new Response("Server Error", { status: 500 });
  }
}