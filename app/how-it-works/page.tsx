import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Learn how MageMatch works for merchants and developers — including the AI brief builder and our pricing/commission model.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-linear-to-b from-zinc-50 to-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
              How it works
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
              A Magento hiring flow designed for outcomes
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              MageMatch helps merchants hire trusted Adobe Commerce / Magento
              specialists with higher signal, clearer scopes, and faster starts.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/developers"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Browse developers
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 hover:bg-white"
              >
                About MageMatch
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                For Merchants
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Hire Magento experts without spending a week filtering noise.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Start with a clear brief",
                    desc: "Turn goals into a Magento-specific scope: version, theme, modules, integrations, and acceptance criteria.",
                  },
                  {
                    title: "Choose specialists, not generalists",
                    desc: "Browse certified Adobe Commerce developers with relevant skills like Hyvä, GraphQL, performance, and headless.",
                  },
                  {
                    title: "Kick off fast with transparent pricing",
                    desc: "Use productized packages (audits, bug fixes, setups) or hourly work for ongoing initiatives.",
                  },
                ].map((i) => (
                  <div
                    key={i.title}
                    className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.55)]"
                  >
                    <p className="text-lg font-semibold text-zinc-900">
                      {i.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {i.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                For Developers
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Get matched with serious Magento work and clean scopes.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "High-intent leads",
                    desc: "Merchants come with clearer goals and Magento context, reducing back-and-forth and scope drift.",
                  },
                  {
                    title: "Productized services welcome",
                    desc: "Offer predictable packages for audits, speed fixes, Hyvä setup, and more—great for quick wins.",
                  },
                  {
                    title: "Quality-first marketplace",
                    desc: "MageMatch is curated. Your certification and project history is a strength—not lost in a crowded feed.",
                  },
                ].map((i) => (
                  <div
                    key={i.title}
                    className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.55)]"
                  >
                    <p className="text-lg font-semibold text-zinc-900">
                      {i.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {i.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-50">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                  AI Brief Builder
                </h2>
                <p className="mt-4 text-base leading-7 text-zinc-600">
                  Magento projects fail when requirements are vague. The AI Brief
                  Builder helps merchants translate “it’s slow” or “checkout is
                  broken” into a structured brief that developers can estimate
                  and ship against.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Magento-aware prompts",
                      desc: "Captures version, hosting, cache, theme, and critical extensions.",
                    },
                    {
                      title: "Scope + acceptance criteria",
                      desc: "Defines what success looks like with testable outcomes and constraints.",
                    },
                    {
                      title: "Risk flags",
                      desc: "Surfaces common pitfalls: custom checkout, conflicting modules, and performance bottlenecks.",
                    },
                    {
                      title: "Faster estimates",
                      desc: "Developers can quote packages or hourly work with far fewer clarifying messages.",
                    },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.55)]"
                    >
                      <div className="h-10 w-10 rounded-2xl bg-orange-500/10 ring-1 ring-orange-200" />
                      <p className="mt-4 text-lg font-semibold text-zinc-900">
                        {c.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-5">
                <div className="rounded-3xl border border-orange-200/80 bg-linear-to-br from-orange-50 via-white to-white p-7 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.55)] sm:p-10">
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Pricing / commission model
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-700">
                    MageMatch is designed to be straightforward:
                  </p>
                  <ul className="mt-5 space-y-3 text-sm text-zinc-700">
                    {[
                      "Merchants see clear package pricing or hourly rates upfront.",
                      "Developers set their own rates and productized services.",
                      "MageMatch earns a marketplace commission on completed work.",
                      "No hidden fees; the goal is alignment and high-quality delivery.",
                    ].map((i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/developers"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-orange-500 px-5 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-600"
                    >
                      Explore developers
                    </Link>
                    <Link
                      href="/"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 shadow-sm shadow-zinc-900/5 transition hover:bg-zinc-50"
                    >
                      Join early access
                    </Link>
                  </div>

                  <p className="mt-4 text-xs text-zinc-500">
                    Commission details will be published as the marketplace
                    opens. This is a static preview page.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

