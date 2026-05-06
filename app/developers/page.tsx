import type { Metadata } from "next";
import Link from "next/link";
import ExpertSearchPanel from "../components/ExpertSearchPanel";
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
            <p className="text-sm text-zinc-600">
              Filter by skill, country, hourly rate, availability, and team type to find the best-fit expert faster.
            </p>
          </div>

          <ExpertSearchPanel developers={developers} />

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

