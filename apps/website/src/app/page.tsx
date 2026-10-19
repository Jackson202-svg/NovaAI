export const metadata = {
  title: 'NovaAI | Agentic AI for teams',
  description: 'NovaAI brings advanced AI chat, image generation, voice assistants, and productivity workflows to everyone.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-200">
              Built for global teams
            </p>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
              The AI workspace for real work.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Chat, generate images, automate workflows, and collaborate with a secure AI platform that scales from solo creators to enterprise teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white shadow-glow">Get started</button>
              <button className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-semibold text-white">Watch demo</button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow">
            <div className="rounded-2xl bg-slate-950 p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-4 text-sm text-slate-200">
                <div className="rounded-xl bg-slate-800 p-3">Summarize customer onboarding docs...</div>
                <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-100">Generated a launch brief, key risks, and next actions.</div>
                <div className="rounded-xl bg-slate-800 p-3">Drafted a product launch email in 12 seconds.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
