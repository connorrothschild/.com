import Link from "next/link";

export default function VibeCodingPage() {
  return (
    <div className="max-w-[800px] mx-auto px-8 py-16">
      <header className="mb-16">
        <h1 className="text-[48px] lg:text-[64px] leading-[1.1] tracking-[-0.02em] text-white mb-4">
          Vibe Coding
        </h1>
        <p className="text-[16px] leading-[1.4] text-white/50 mb-8 font-mono uppercase tracking-tight">
          The Evolution and Impact of AI-Assisted Development
        </p>
      </header>

      <div className="space-y-12">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-white/80 mb-6">
            Vibe coding represents a fundamental shift in how software is
            developed. What started as GitHub Copilot's autocomplete suggestions
            has evolved into a cultural phenomenon where developers write code
            through natural language prompts and conversational interactions
            with AI.
          </p>

          <p className="text-lg leading-relaxed text-white/80 mb-8">
            This collection explores both the remarkable progress and the
            significant challenges that have emerged as AI coding tools have
            become mainstream.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Link
            href="/vibe-coding/history"
            className="group block p-8 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
          >
            <h2 className="text-2xl mb-4 text-white group-hover:text-white/80 transition-colors">
              History
            </h2>
            <p className="text-white/60 leading-relaxed">
              From GitHub Copilot's launch in 2021 to the current landscape of
              AI coding tools. Explore the key milestones, cultural shifts, and
              technological advances that shaped vibe coding into what it is
              today.
            </p>
          </Link>

          <Link
            href="/vibe-coding/failures"
            className="group block p-8 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
          >
            <h2 className="text-2xl mb-4 text-white group-hover:text-white/80 transition-colors">
              Failures
            </h2>
            <p className="text-white/60 leading-relaxed">
              Security vulnerabilities, unintended consequences, and documented
              failures that have emerged as AI coding tools have become more
              widely adopted. Learn from the mistakes and challenges of the
              past.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
