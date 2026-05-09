import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Pricing | MageMatch",
  description:
    "See how pricing works on MageMatch for merchants and developers, including 1-hour, 2-hour, and full-day service tiers.",
  keywords: [
    "magematch pricing",
    "magento developer pricing",
    "adobe commerce freelancer rates",
    "magento service packages",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing | MageMatch",
    description:
      "Clear pricing for merchants and developers, including 1-hour, 2-hour, and full-day service tiers.",
    url: "/pricing",
    siteName: "MageMatch",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | MageMatch",
    description:
      "Clear pricing for merchants and developers, including 1-hour, 2-hour, and full-day service tiers.",
    images: ["/favicon.svg"],
  },
};

const merchantItems = [
  "Free to use",
  "No account needed",
  "Pay only when you hire",
  "Fixed price packages or hourly",
];

const developerItems = [
  "Free listing during launch",
  "10% commission on completed work when payments launch",
  "You set your own rates",
  "No monthly fees ever",
];

const packageExamples = [
  { label: "1 Hour Service", price: "$40-100" },
  { label: "2 Hour Service", price: "$80-200" },
  { label: "Full Day Service (8 Hours)", price: "$320-800" },
];

function PricingList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3 text-sm text-zinc-700">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PricingPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-linear-to-b from-zinc-50 to-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-12">
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
              Pricing
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
              Simple pricing for merchants and developers
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              MageMatch keeps pricing straightforward: merchants hire on clear terms,
              and developers set rates without monthly platform fees.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/developers"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Browse developers
              </Link>
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 hover:bg-white"
              >
                List your services
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.55)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                For Merchants
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                Clear costs, no platform friction
              </h2>
              <PricingList items={merchantItems} />
            </div>

            <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.55)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                For Developers
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                Keep control of your pricing
              </h2>
              <PricingList items={developerItems} />
            </div>
          </div>
        </section>

        <section className="bg-zinc-50">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Example Packages
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                Standard service pricing tiers
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                These tiers keep pricing consistent across short service engagements on
                MageMatch. Final pricing can still vary for larger scoped projects.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {packageExamples.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-orange-200/80 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.55)]"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    {item.label}
                  </p>
                  <p className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Start a brief
              </Link>
              <Link
                href="/developers"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 hover:bg-white"
              >
                Explore profiles
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}