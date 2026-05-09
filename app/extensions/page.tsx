import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { supabase, supabaseAdmin } from "../../lib/supabase";

export const metadata: Metadata = {
  title: "Free Magento Extensions | MageMatch",
  description:
    "Open-source Magento tools built by certified MageMatch developers. Free forever.",
  keywords: [
    "free magento extensions",
    "open source magento modules",
    "adobe commerce extensions",
    "magento github modules",
  ],
  alternates: {
    canonical: "/extensions",
  },
  openGraph: {
    title: "Free Magento Extensions | MageMatch",
    description:
      "Explore open-source Magento extensions built by certified Adobe Commerce developers.",
    url: "/extensions",
    siteName: "MageMatch",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Magento Extensions | MageMatch",
    description:
      "Explore open-source Magento extensions built by certified Adobe Commerce developers.",
    images: ["/favicon.svg"],
  },
};

const compatibilityBadges = [
  "Magento 2.4.x",
  "Open Source",
  "Adobe Commerce",
];

type Extension = {
  repo_url: string;
  name: string;
  description: string;
  stars: number;
  author_slug?: string;
};

async function fetchExtensions(): Promise<{ data: Extension[]; error: boolean }> {
  try {
    const client = supabaseAdmin ?? supabase;

    const { data, error } = await client
      .from("extensions")
      .select("*")
      .eq("active", true)
      .order("stars", { ascending: false })
      .order("name", { ascending: true });

    if (error) throw error;

    return {
      data: (data as Extension[]) || [],
      error: false,
    };
  } catch (err) {
    console.error("Failed to fetch extensions:", err);
    return {
      data: [],
      error: true,
    };
  }
}

export default async function ExtensionsPage() {
  const { data: extensions, error } = await fetchExtensions();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1 bg-zinc-50">
        <section className="bg-linear-to-b from-zinc-50 to-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
              Free Magento Extensions
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
              Free Magento Extensions
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              Open-source tools built by our certified developers. Free forever.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
              <p className="text-sm font-semibold text-red-900">
                We couldn&apos;t load extensions right now. Please refresh and try again.
              </p>
            </div>
          ) : extensions.length === 0 ? (
            <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6">
              <p className="text-sm font-semibold text-yellow-900">
                No extensions are currently available.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {extensions.map((extension) => (
                <article
                  key={extension.repo_url}
                  className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.45)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-zinc-900">
                        {extension.name}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {extension.description}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-full bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200">
                      ★ {extension.stars}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {compatibilityBadges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700 ring-1 ring-orange-200"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm text-zinc-600">
                    Built by{" "}
                    <Link
                      href={
                        extension.author_slug
                          ? `/developers/${extension.author_slug}`
                          : "/developers/arjun-dhiman"
                      }
                      className="font-semibold text-orange-700 hover:text-orange-800"
                    >
                      Arjun Dhiman
                    </Link>
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={extension.repo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
                    >
                      GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}