import type { Metadata } from "next";
import Link from "next/link";
import ExpertSearchPanel from "../components/ExpertSearchPanel";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { supabase } from "../../lib/supabase";
import type { Developer } from "../../lib/supabase-types";

export const metadata: Metadata = {
  title: "Hire a Magento Developer — Verified Experts",
  description:
    "Browse vetted Adobe Commerce and Magento 2 developers. Fixed prices, immediate availability, Adobe certified.",
  keywords: [
    "magento developers",
    "adobe commerce developers",
    "hire magento freelancer",
    "hyva developer",
    "magento experts europe",
  ],
  alternates: {
    canonical: "https://magematch.com/developers",
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

export default async function DevelopersPage() {
  let developers: Developer[] = [];
  let error = false;

  try {
    const { data, error: fetchError } = await supabase
      .from("developers")
      .select("*")
      .eq("active", true)
      .order("featured", { ascending: false });

    if (fetchError) throw fetchError;
    developers = data as Developer[];
  } catch (err) {
    console.error("Failed to fetch developers:", err);
    error = true;
  }
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1 bg-zinc-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                Developers
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-600">
                Search verified Magento experts by skill, pricing style, and availability.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-7">
            <p className="text-sm text-zinc-600">
              Filter by skill, country, hourly rate, availability, and team type to find the best-fit expert faster.
            </p>
          </div>

          {error ? (
            <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-6">
              <p className="text-sm font-semibold text-red-900">
                Unable to load developers. Please try again later.
              </p>
            </div>
          ) : developers.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-yellow-200 bg-yellow-50 p-6">
              <p className="text-sm font-semibold text-yellow-900">
                No developers available at the moment. Check back soon.
              </p>
            </div>
          ) : (
            <ExpertSearchPanel developers={developers} />
          )}

          <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.35)] sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-zinc-900">
                  Are you a Magento developer?
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  Get listed on MageMatch for free during launch.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/apply"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-orange-500 px-5 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-600"
                >
                  Apply Now →
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 shadow-sm shadow-zinc-900/5 transition hover:bg-zinc-50"
                >
                  See pricing
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

