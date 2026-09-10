import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="card overflow-hidden">
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 px-6 py-10 text-white sm:px-8 sm:py-12">
          <p className="mb-3 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-sky-200 ring-1 ring-white/15">
            RoadStar Hackathon 2026
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            File a trucking incident in under 2 minutes
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">
            IncidentPad helps drivers capture what happened, check safety
            steps, and share a clean summary with dispatch or the shipper —
            without phone tag or messy notes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/new" className="btn-primary w-full sm:w-auto">
              Start new incident
            </Link>
            <Link
              href="/reports"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              View reports
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            The problem
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            When something goes wrong on the road — delay, breakdown, cargo
            damage, or a near-miss — drivers juggle calls, texts, and photos
            while dispatch waits for a clear picture. Details get lost;
            response slows down.
          </p>
        </div>
        <div className="card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            The solution
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            A mobile-first wizard: pick the type, fill essentials, tick a
            safety checklist, then copy or print a shareable summary in one
            tap. Demo data lives in your browser — no backend required.
          </p>
        </div>
      </section>

      <section className="card p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">How it works</h2>
        <ol className="mt-4 space-y-3">
          {[
            "Choose incident type (delay, breakdown, cargo, safety, other).",
            "Add location, time, severity, and who to notify.",
            "Confirm safety checklist — optionally mark photos noted.",
            "Review, submit, and copy a ready-to-share summary.",
          ].map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-slate-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Link href="/new" className="btn-primary w-full sm:w-auto">
            File an incident now
          </Link>
        </div>
      </section>
    </div>
  );
}
