import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";
import TrustSection from "./TrustSection";

// ─── Types ───────────────────────────────────────────────────────────────────

export type Benefit = {
  icon: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type HireLandingConfig = {
  /** Short badge text shown above the H1 */
  badge: string;
  /** Main H1 — keep concise and keyword-rich */
  headline: string;
  /** One or two sentence intro paragraph */
  intro: string;
  /** 3–6 benefit cards */
  benefits: Benefit[];
  /** 4–6 FAQ items — rendered visually + injected as JSON-LD */
  faqs: FaqItem[];
  /** Canonical path e.g. /hire/magento-developer */
  canonical: string;
  /** Primary CTA label */
  ctaLabel?: string;
  /** Where the primary CTA points */
  ctaHref?: string;
  /** Optional social proof line below CTA */
  proof?: string;
};

// ─── FAQ JSON-LD ─────────────────────────────────────────────────────────────

function FaqSchema({ faqs }: { faqs: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled server-only JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Shared landing page component ──────────────────────────────────────────

export default function HireLandingPage({
  config,
}: {
  config: HireLandingConfig;
}) {
  const {
    badge,
    headline,
    intro,
    benefits,
    faqs,
    ctaLabel = "Get Matched with Experts",
    ctaHref = "/contact",
    proof = "Most merchants hear back within 2 hours · Magento-only matching",
  } = config;

  return (
    <>
      <FaqSchema faqs={faqs} />

      <div className="flex min-h-full flex-1 flex-col">
        <Header />

        <main className="flex-1">
          {/* ── Hero ─────────────────────────────────────────────────── */}
          <section className="relative overflow-hidden bg-linear-to-b from-zinc-50 to-white">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-zinc-900/8 blur-3xl" />
            </div>

            <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
              <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                {badge}
              </p>

              <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
                {headline}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 sm:text-xl sm:leading-9">
                {intro}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                >
                  {ctaLabel}
                </Link>
                <Link
                  href="/developers"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-800 shadow-sm shadow-zinc-900/5 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                >
                  Browse talent →
                </Link>
              </div>

              {proof ? (
                <p className="mt-5 text-sm font-medium text-zinc-500">{proof}</p>
              ) : null}
            </div>
          </section>

          {/* ── Metrics strip ────────────────────────────────────────── */}
          <section className="border-y border-zinc-200 bg-zinc-50">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-0 px-4 py-5 sm:px-6">
              {[
                { value: "Magento-only", label: "niche marketplace" },
                { value: "2hr", label: "average match time" },
                { value: "Hyvä", label: "specialist experts available" },
                { value: "EU + Global", label: "timezone coverage" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center">
                  {i > 0 ? (
                    <span className="mx-5 hidden text-zinc-300 sm:inline">|</span>
                  ) : null}
                  <span className="text-sm">
                    <span className="font-bold text-orange-600">{item.value}</span>{" "}
                    <span className="font-medium text-zinc-600">{item.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Benefits ─────────────────────────────────────────────── */}
          <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Why hire through MageMatch?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
              Every part of the platform is optimised for Magento hiring — from
              intake to shortlist to contract.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="group rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_1px_0_0_rgba(15,23,42,0.04),0_22px_52px_-28px_rgba(15,23,42,0.48)]"
                >
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-2xl ring-1 ring-orange-200"
                    aria-hidden="true"
                  >
                    {b.icon}
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-zinc-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA banner ───────────────────────────────────────────── */}
          <section className="bg-orange-500">
            <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-16">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Ready to hire the right Magento specialist?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-orange-50">
                Submit your lead once. We&apos;ll curate a shortlist of qualified
                developers, agencies, or architects aligned to your budget and
                timeline.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-orange-600 shadow-sm transition hover:bg-orange-50"
                >
                  {ctaLabel}
                </Link>
                <Link
                  href="/developers"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Browse developers
                </Link>
              </div>
              <p className="mt-4 text-sm text-orange-100">{proof}</p>
            </div>
          </section>

          <TrustSection compact />

          {/* ── FAQ ──────────────────────────────────────────────────── */}
          <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600">
              Everything you need to know before hiring through MageMatch.
            </p>

            <dl className="mt-8 space-y-4">
              {faqs.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm open:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-zinc-900">
                    <dt>{item.question}</dt>
                    <span
                      className="shrink-0 text-zinc-400 transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-4 text-sm leading-7 text-zinc-600">
                    {item.answer}
                  </dd>
                </details>
              ))}
            </dl>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
