"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function InvestorReportPanel({
  startupId,
}: {
  startupId: string;
}) {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setReport("");
    setLoading(true);

    const res = await fetch("/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startupId }),
    });

    if (!res.body) {
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      setReport((prev) => prev + chunk);
    }

    setLoading(false);
  };

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          AI Investor Report
        </h2>

        <button
          onClick={generateReport}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 rounded-xl text-sm font-medium hover:bg-blue-500 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {report && (
        <div className="prose prose-invert max-w-none text-sm">
          <ReactMarkdown>
            {report}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}