import type { Metadata } from "next";
import Link from "next/link";
import DeveloperCard from "../components/DeveloperCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { developers } from "../data/developers";

export const metadata: Metadata = {
  title: "Browse Magento Developers | MageMatch",
  description:
    "Browse vetted Adobe Commerce (Magento) developers by skill, price, and availability.",
  keywords: [
    "magento developers",
    "adobe commerce developers",
    "hire magento freelancer",
    "hyva developer",
    "magento experts europe",
  ],
  alternates: {
    canonical: "/developers",
  },
  openGraph: {
    title: "Browse Magento Developers | MageMatch",
    description:
      "Browse vetted Adobe Commerce and Magento developers by skills, budget, and availability.",
    url: "/developers",
    siteName: "MageMatch",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Magento Developers | MageMatch",
    description:
      "Browse vetted Adobe Commerce and Magento developers by skills, budget, and availability.",
    images: ["/favicon.svg"],
  },
};

export default function DevelopersPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1 bg-zinc-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                Developers
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-600">
                Search verified Magento experts by skill, pricing style, and
                availability.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-7">
            <div className="grid gap-4 md:grid-cols-12 md:items-end">
              <div className="md:col-span-6">
                <label
                  htmlFor="skill"
                  className="text-sm font-semibold text-zinc-900"
                >
                  Skill
                </label>
                <div className="mt-2">
                  <input
                    id="skill"
                    name="skill"
                    placeholder="e.g. Hyvä, GraphQL, performance"
                    className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none placeholder:text-zinc-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <label
                  htmlFor="price"
                  className="text-sm font-semibold text-zinc-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <select
                    id="price"
                    name="price"
                    className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    defaultValue="any"
                  >
                    <option value="any">Any</option>
                    <option value="junior">Junior · €40–55/hr</option>
                    <option value="mid">Mid-level · €55–75/hr</option>
                    <option value="senior">Senior · €75–100/hr</option>
                    <option value="architect">Architect · €100–150/hr</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-3">
                <label
                  htmlFor="availability"
                  className="text-sm font-semibold text-zinc-900"
                >
                  Availability
                </label>
                <div className="mt-2">
                  <select
                    id="availability"
                    name="availability"
                    className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    defaultValue="any"
                  >
                    <option value="any">Any</option>
                    <option value="immediate">Immediate</option>
                    <option value="this-week">This week</option>
                    <option value="next-week">Next week</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-600">
                Filters are preview-only for now (static export). We’ll enable
                live search next.
              </p>
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-full bg-orange-500 px-5 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-600"
              >
                Apply filters
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {developers.map((dev) => (
              <DeveloperCard
                key={dev.slug}
                developer={dev}
                note={
                  dev.slug === "aleksandar-harutyunyan"
                    ? "Worked with Arjun at Valantic"
                    : undefined
                }
              />
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-orange-200/80 bg-linear-to-br from-orange-50 via-white to-white p-7 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.55)] sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-zinc-900">
                  More Magento specialists are coming soon
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  We’re onboarding certified Adobe Commerce developers. Join
                  early access to get notified.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/#email"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-orange-500 px-5 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-600"
                >
                  Get early access
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 shadow-sm shadow-zinc-900/5 transition hover:bg-zinc-50"
                >
                  See process
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

