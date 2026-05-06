import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "About MageMatch | Magento Developer Marketplace",
  description:
    "MageMatch is a Magento-only marketplace built by a Magento developer, for Magento developers — helping merchants hire trusted Adobe Commerce specialists.",
  keywords: [
    "about magematch",
    "magento developer marketplace",
    "adobe commerce experts",
    "hire magento developer europe",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About MageMatch | Magento Developer Marketplace",
    description:
      "Learn how MageMatch helps merchants hire vetted Adobe Commerce and Magento developers faster.",
    url: "/about",
    siteName: "MageMatch",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About MageMatch | Magento Developer Marketplace",
    description:
      "Learn how MageMatch helps merchants hire vetted Adobe Commerce and Magento developers faster.",
    images: ["/favicon.svg"],
  },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-linear-to-b from-zinc-50 to-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
              About MageMatch
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Built by a Magento developer, for Magento developers
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              Hiring for Adobe Commerce is different. The best outcomes come
              from specialists who understand Magento architecture, performance,
              and real-world ecommerce constraints. MageMatch exists to make that
              match obvious and fast.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/developers"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Browse developers
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 hover:bg-white"
              >
                How it works
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                Our mission
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Build the highest-signal marketplace for Magento talent—where
                merchants can hire confidently, and developers are respected for
                deep craft rather than commodity bidding.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: "For merchants",
                    desc: "Find certified specialists quickly, reduce risk, and ship improvements faster.",
                  },
                  {
                    title: "For developers",
                    desc: "Work with serious clients, clear scopes, and better-fit projects.",
                  },
                  {
                    title: "Magento-only signal",
                    desc: "No generic profiles—skills, packages, and proof are centered on Adobe Commerce.",
                  },
                  {
                    title: "Quality over volume",
                    desc: "We’re intentionally curated. Less noise, better outcomes.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.55)]"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-500/10 ring-1 ring-orange-200">
                      {c.title === "For merchants" ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke="#F97316"
                          strokeWidth="2"
                        >
                          <path d="M3 7h18" />
                          <path d="M5 7l1.5 10h11L19 7" />
                          <path d="M9 11h6" />
                        </svg>
                      ) : c.title === "For developers" ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke="#F97316"
                          strokeWidth="2"
                        >
                          <path d="M8 8l-4 4 4 4" />
                          <path d="M16 8l4 4-4 4" />
                          <path d="M13 5l-2 14" />
                        </svg>
                      ) : c.title === "Magento-only signal" ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke="#F97316"
                          strokeWidth="2"
                        >
                          <path d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke="#F97316"
                          strokeWidth="2"
                        >
                          <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8L12 3z" />
                        </svg>
                      )}
                    </div>
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
              <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                <p className="text-sm font-semibold text-zinc-900">
                  Why we built this
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  The job market is noisy. On general platforms, merchants spend
                  days validating basics, while experienced Magento developers
                  compete with low-signal bids. That’s bad for quality—and for
                  ecommerce outcomes.
                </p>

                <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
                  <p className="text-sm font-semibold text-zinc-900">
                    The MageMatch idea
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-700">
                    A focused marketplace with clear proof (certs, projects),
                    productized services, and a better brief process—built for
                    Magento teams.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                <p className="text-sm font-semibold text-zinc-900">Founder</p>
                <div className="mt-4 flex items-start gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-linear-to-br from-orange-100 to-zinc-100 ring-1 ring-zinc-200">
                    <div className="absolute inset-0 grid place-items-center text-xs font-semibold text-zinc-600">
                      AD
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-zinc-900">
                      Arjun Dhiman
                    </p>
                    <p className="mt-1 text-sm text-zinc-600">
                      Adobe Commerce Certified Master
                    </p>
                    <div className="mt-4">
                      <Link
                        href="/developers/arjun-dhiman"
                        className="inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                      >
                        View profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

