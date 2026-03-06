import InteractiveAIBot from "@/components/ai/InteractiveAIBot";

export default function AIPage() {
  return (
    <div className="relative min-h-screen px-6 py-28 overflow-hidden">

      <InteractiveAIBot />

      <div className="max-w-6xl mx-auto space-y-32">

        <section className="space-y-8">
          <div className="text-sm uppercase tracking-[0.3em] text-gray-500">
            AI Infrastructure
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight max-w-4xl">
            Intelligence Engine
            <span className="text-red-500"> Built For Founders</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            Opsiys AI transforms raw startup data into strategic clarity.
          </p>
        </section>

      </div>
    </div>
  );
}