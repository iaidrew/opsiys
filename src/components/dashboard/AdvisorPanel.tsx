"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  startupId: string;
  initialMessages?: Message[];
}

export default function AdvisorPanel({
  startupId,
  initialMessages = [],
}: Props) {
  const [messages, setMessages] =
    useState<Message[]>(initialMessages || []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ---------------- ASK ADVISOR ---------------- */
  const askAdvisor = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError("");
    setInput("");

    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          startupId,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.reply) {
        throw new Error(data.error || "AI error");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err: any) {
      setError("Failed to get response from advisor.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 space-y-6">

      <h2 className="text-xl font-semibold">
        AI Strategic Advisor
      </h2>

      {/* CHAT HISTORY */}
      <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2">

        {messages.length === 0 && (
          <div className="text-gray-500 text-sm">
            Start a conversation with your AI advisor.
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "user"
                ? "flex justify-end"
                : "flex justify-start"
            }
          >
            <div
              className={
                msg.role === "user"
                  ? "bg-red-600 text-white px-4 py-2 rounded-2xl max-w-[75%]"
                  : "bg-zinc-800 px-5 py-4 rounded-2xl max-w-[75%]"
              }
            >
                <div className="prose prose-invert max-w-none text-sm">
                    <ReactMarkdown>
                        {msg.content}
                        </ReactMarkdown>
                        </div>
              
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-left text-gray-400 text-sm">
            Thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* INPUT */}
      <div className="flex gap-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-500"
          disabled={loading}
        />

        <button
          onClick={askAdvisor}
          disabled={loading}
          className="px-6 py-2 bg-red-600 rounded-xl text-sm font-medium hover:bg-red-500 transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>

    </div>
  );
}