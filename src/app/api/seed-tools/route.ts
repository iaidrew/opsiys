import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const tools = [
      {
        name: "ChatGPT",
        description: "AI assistant for writing, coding and research.",
        website: "https://chat.openai.com",
        category: "Productivity",
        pricing: "freemium",
        createdAt: new Date(),
      },
      {
        name: "Midjourney",
        description: "AI image generation platform.",
        website: "https://midjourney.com",
        category: "Design",
        pricing: "paid",
        createdAt: new Date(),
      },
      {
        name: "Runway",
        description: "AI video generation platform.",
        website: "https://runwayml.com",
        category: "Video",
        pricing: "freemium",
        createdAt: new Date(),
      },
      {
        name: "Copy.ai",
        description: "AI marketing copy generator.",
        website: "https://copy.ai",
        category: "Marketing",
        pricing: "freemium",
        createdAt: new Date(),
      },
      {
        name: "Perplexity",
        description: "AI search engine.",
        website: "https://perplexity.ai",
        category: "Research",
        pricing: "free",
        createdAt: new Date(),
      },

      
        // — Productivity
        {
          name: "ChatGPT",
          description: "AI assistant for writing, coding, and research.",
          website: "https://chat.openai.com",
          category: "Productivity",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Claude",
          description: "Advanced AI assistant by Anthropic for reasoning and writing.",
          website: "https://claude.ai",
          category: "Productivity",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Gemini",
          description: "Google’s multimodal AI model for productivity and research.",
          website: "https://gemini.google.com",
          category: "Productivity",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Notion AI",
          description: "AI writing, summarization, and planning inside Notion.",
          website: "https://notion.so/product/ai",
          category: "Productivity",
          pricing: "paid",
          createdAt: new Date(),
        },
        {
          name: "Microsoft Copilot",
          description: "AI assistant integrated into Microsoft 365 apps.",
          website: "https://copilot.microsoft.com",
          category: "Productivity",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Perplexity",
          description: "AI search engine delivering instant answers.",
          website: "https://perplexity.ai",
          category: "Productivity",
          pricing: "free",
          createdAt: new Date(),
        },
        {
          name: "Fireflies.ai",
          description: "AI meeting assistant that transcribes and summarizes calls.",
          website: "https://fireflies.ai",
          category: "Productivity",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Zoom AI Companion",
          description: "AI-enhanced meeting summaries and insights.",
          website: "https://zoom.us",
          category: "Productivity",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Otter.ai",
          description: "AI meeting transcription and notes.",
          website: "https://otter.ai",
          category: "Productivity",
          pricing: "freemium",
          createdAt: new Date(),
        },
        // — Marketing
        {
          name: "Copy.ai",
          description: "AI marketing copy generator.",
          website: "https://copy.ai",
          category: "Marketing",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Jasper",
          description: "AI content and brand voice platform.",
          website: "https://jasper.ai",
          category: "Marketing",
          pricing: "paid",
          createdAt: new Date(),
        },
        {
          name: "Writesonic",
          description: "AI content generation for blogs, landing pages, and ads.",
          website: "https://writesonic.com",
          category: "Marketing",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Brandfetch",
          description: "AI brand data and asset generator.",
          website: "https://brandfetch.com",
          category: "Marketing",
          pricing: "free",
          createdAt: new Date(),
        },
        {
          name: "Lumen5",
          description: "AI video creator for social media marketing.",
          website: "https://lumen5.com",
          category: "Marketing",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Phrasee",
          description: "AI for optimizing marketing language and emails.",
          website: "https://phrasee.co",
          category: "Marketing",
          pricing: "paid",
          createdAt: new Date(),
        },
        {
          name: "MarketMuse",
          description: "AI content strategy and SEO optimization tool.",
          website: "https://marketmuse.com",
          category: "Marketing",
          pricing: "paid",
          createdAt: new Date(),
        },
        // — Design / Images
        {
          name: "Midjourney",
          description: "AI image generation platform.",
          website: "https://midjourney.com",
          category: "Design",
          pricing: "paid",
          createdAt: new Date(),
        },
        {
          name: "Stable Diffusion",
          description: "Open-source AI image generation model.",
          website: "https://stability.ai",
          category: "Design",
          pricing: "free",
          createdAt: new Date(),
        },
        {
          name: "DALL·E",
          description: "AI image generator by OpenAI.",
          website: "https://openai.com/dall-e",
          category: "Design",
          pricing: "paid",
          createdAt: new Date(),
        },
        {
          name: "Leonardo AI",
          description: "AI image generation and asset creation.",
          website: "https://leonardo.ai",
          category: "Design",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Canva AI",
          description: "AI design tools inside Canva.",
          website: "https://canva.com",
          category: "Design",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Remove.bg",
          description: "AI background removal tool.",
          website: "https://remove.bg",
          category: "Design",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Runway",
          description: "AI tools for creators including image & video editing.",
          website: "https://runwayml.com",
          category: "Design",
          pricing: "freemium",
          createdAt: new Date(),
        },
        // — Video
        {
          name: "Pika",
          description: "AI video generation from text prompts.",
          website: "https://pika.art",
          category: "Video",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Synthesia",
          description: "AI avatar-based video creation tool.",
          website: "https://synthesia.io",
          category: "Video",
          pricing: "paid",
          createdAt: new Date(),
        },
        {
          name: "Descript",
          description: "AI audio and video editing platform.",
          website: "https://descript.com",
          category: "Video",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Veedy",
          description: "AI-powered video production platform.",
          website: "https://veedy.tech",
          category: "Video",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Veed.io",
          description: "AI video editing online platform.",
          website: "https://veed.io",
          category: "Video",
          pricing: "freemium",
          createdAt: new Date(),
        },
        // — Audio & Speech
        {
          name: "ElevenLabs",
          description: "AI voice generation and cloning platform.",
          website: "https://elevenlabs.io",
          category: "Audio",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Murf AI",
          description: "AI text-to-speech voice generator.",
          website: "https://murf.ai",
          category: "Audio",
          pricing: "paid",
          createdAt: new Date(),
        },
        {
          name: "Play.ht",
          description: "AI voice generator with realistic voices.",
          website: "https://play.ht",
          category: "Audio",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Podcastle",
          description: "AI tools for podcasters including transcription.",
          website: "https://podcastle.ai",
          category: "Audio",
          pricing: "freemium",
          createdAt: new Date(),
        },
        {
          name: "Cleanvoice AI",
          description: "AI audio cleaning and enhancement tool.",
          website: "https://cleanvoice.ai",
          category: "Audio",
          pricing: "freemium",
          createdAt: new Date(),
        }
        // — Development / Code

    ];

    const batch = adminDb.batch();

    tools.forEach((tool) => {
      const ref = adminDb.collection("aiTools").doc();
      batch.set(ref, tool);
    });

    await batch.commit();

    return Response.json({
      message: "AI tools seeded successfully",
      count: tools.length,
    });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Seed failed" }, { status: 500 });
  }
}