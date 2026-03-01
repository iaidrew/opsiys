interface Props {
    summary: string;
  }
  
  export default function ExecutiveSummary({ summary }: Props) {
    return (
      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-4">
          Executive Summary
        </h2>
  
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {summary}
        </p>
      </div>
    );
  }