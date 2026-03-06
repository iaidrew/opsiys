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
    useState<Message[]>(initialMessages);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("general");

  const chatRef = useRef<HTMLDivElement | null>(null);

  /* ---------- INTERNAL SCROLL ---------- */
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 100;

    if (isNearBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const askAdvisor = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          startupId,
          mode,
        }),
      });

      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let assistantMessage: Message = {
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage.content += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...assistantMessage,
          };
          return updated;
        });
      }

    } catch (err) {
      console.error(err);
      setError("Streaming failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 space-y-6">

      {/* HEADER + MODE SELECTOR */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">
          AI Strategic Advisor
        </h2>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="bg-black border border-white/10 rounded-lg px-3 py-1 text-sm"
        >
          <option value="general">General Advisor</option>
          <option value="growth">Growth Mode</option>
          <option value="risk">Risk Mitigation</option>
          <option value="fundraising">Fundraising</option>
          <option value="scaling">Scaling</option>
        </select>
      </div>

      {/* CHAT AREA */}
      <div
        ref={chatRef}
        className="space-y-6 h-[450px] overflow-y-auto pr-2"
      >
        {messages.length === 0 && (
          <div className="text-gray-500 text-sm">
            Start a conversation.
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`rounded-2xl max-w-[75%] ${
                msg.role === "user"
                  ? "bg-red-600 text-white px-4 py-2"
                  : "bg-zinc-800 text-gray-200 px-5 py-4"
              }`}
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
          <div className="text-gray-400 text-sm animate-pulse">
            Thinking in {mode} mode...
          </div>
        )}
      </div>

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