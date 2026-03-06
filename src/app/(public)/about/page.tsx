export default function AboutPage() {
  return (
    <div className="relative px-6 py-28">

      <div className="max-w-6xl mx-auto space-y-32">

        {/* HERO */}
        <section className="space-y-8">
          <div className="text-sm uppercase tracking-[0.3em] text-gray-500">
            About Opsiys
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight max-w-4xl">
            The Operating System
            <span className="text-red-500"> for Founder Execution</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            Opsiys is a strategic intelligence layer built for modern founders.
            We transform startup chaos into measurable, structured execution.
          </p>
        </section>

        {/* MISSION */}
        <section className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Startups don’t fail from lack of effort — they fail from lack of clarity.
              Opsiys exists to provide operational visibility, execution control,
              and structured decision-making for founders navigating uncertainty.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
            <h3 className="text-xl font-semibold mb-4 text-red-500">
              Core Principle
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Execution beats ideas. Structure beats chaos.
              Measured progress beats intuition.
            </p>
          </div>
        </section>

        {/* WHY WE BUILT THIS */}
        <section className="space-y-12">
          <h2 className="text-4xl font-black">
            Why Opsiys Exists
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-lg font-semibold mb-4">No Clear Metrics</h3>
              <p className="text-gray-400">
                Founders operate without structured intelligence across teams,
                growth, product, and risk.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-lg font-semibold mb-4">Fragmented Tools</h3>
              <p className="text-gray-400">
                Insights are scattered across dashboards with no unified
                operational layer.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-lg font-semibold mb-4">Reactive Decisions</h3>
              <p className="text-gray-400">
                Decisions are made emotionally instead of structurally.
                Opsiys replaces reaction with strategic clarity.
              </p>
            </div>

          </div>
        </section>

        {/* SYSTEM LAYER */}
        <section className="space-y-10">
          <h2 className="text-4xl font-black">
            The Control Layer
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl">
            Opsiys acts as an execution control layer sitting above your startup.
            It evaluates performance, highlights bottlenecks, and generates
            intelligence-driven action plans — continuously.
          </p>

          <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-white/10 rounded-3xl p-12">
            <p className="text-2xl font-semibold leading-relaxed">
              We don’t replace founders.
              <br />
              We amplify their clarity.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-8 pt-16 border-t border-white/10">
          <h2 className="text-4xl font-black">
            Build With Structured Intelligence
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Move from instinct-driven decisions to measurable execution.
            Operate your startup with clarity, not chaos.
          </p>

          <div>
            <a
              href="/dashboard/profile"
              className="inline-block px-12 py-5 text-lg font-semibold rounded-2xl bg-red-500 text-white hover:bg-red-600 transition"
            >
              Enter Dashboard
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}