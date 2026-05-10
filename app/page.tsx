import type { Metadata } from "next";
import Link from "next/link";
import FeaturedExpertsSection from "./components/FeaturedExpertsSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TrustSection from "./components/TrustSection";
import { supabase } from "../lib/supabase";
import {
  normalizeBlogPost,
  type BlogPost,
  type Developer,
  type RawBlogPost,
} from "../lib/supabase-types";

export const metadata: Metadata = {
  title: "AI-Powered Magento & Adobe Commerce Talent, Matched Globally—Faster",
  description:
    "MageMatch uses AI to match you with top Magento and Adobe Commerce experts worldwide. Our developers leverage AI tools for faster delivery, smarter solutions, and 24/7 progress—so your business moves at the speed of innovation.",
  keywords: [
    "hire magento developer",
    "adobe commerce developer",
    "magento 2 developer",
    "hyva developer",
    "magento freelancer europe",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI-Powered Magento & Adobe Commerce Talent, Matched Globally—Faster",
    description:
      "MageMatch uses AI to match you with top Magento and Adobe Commerce experts worldwide. Our developers leverage AI tools for faster delivery, smarter solutions, and 24/7 progress—so your business moves at the speed of innovation.",
    url: "/",
    siteName: "MageMatch",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Magento & Adobe Commerce Talent, Matched Globally—Faster",
    description:
      "MageMatch uses AI to match you with top Magento and Adobe Commerce experts worldwide. Our developers leverage AI tools for faster delivery, smarter solutions, and 24/7 progress—so your business moves at the speed of innovation.",
    images: ["/favicon.svg"],
  },
};

export default function Home() {
  const latestPostsPromise = fetchLatestPosts();
  const featuredDevelopersPromise = fetchFeaturedDevelopers();

  return (
    <HomeContent
      latestPostsPromise={latestPostsPromise}
      featuredDevelopersPromise={featuredDevelopersPromise}
    />
  );
}

async function fetchLatestPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) throw error;
    return ((data as RawBlogPost[]) || []).map(normalizeBlogPost);
  } catch (err) {
    console.error("Failed to fetch latest posts:", err);
    return [];
  }
}

async function fetchFeaturedDevelopers(): Promise<Developer[]> {
  try {
    const { data, error } = await supabase
      .from("developers")
      .select("*")
      .eq("featured", true)
      .eq("active", true)
      .limit(3);

    if (error) throw error;
    return (data as Developer[]) || [];
  } catch (err) {
    console.error("Failed to fetch featured developers:", err);
    return [];
  }
}

async function HomeContent({
  latestPostsPromise,
  featuredDevelopersPromise,
}: {
  latestPostsPromise: Promise<BlogPost[]>;
  featuredDevelopersPromise: Promise<Developer[]>;
}) {
  const latestPosts = await latestPostsPromise;
  const featuredDevelopers = await featuredDevelopersPromise;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      {/* AI Callout Bar */}
      <div className="w-full bg-linear-to-r from-orange-100 via-white to-orange-50 py-2 text-center text-sm font-semibold text-orange-700 shadow-sm">
        <span className="inline-flex items-center gap-2 justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
          Powered by AI—smarter matching, faster delivery, global results
        </span>
      </div>
      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-b from-zinc-50 to-white">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/15 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-zinc-900/10 blur-3xl sm:h-96 sm:w-96" />
          </div>

          <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
            <div className="grid items-start gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                  Niche marketplace for Magento & Adobe Commerce talent
                </p>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-4xl">
                  AI-Powered Magento &amp; Adobe Commerce Talent, Matched Globally—Faster
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl sm:leading-9">
                  MageMatch uses AI to instantly match you with the world’s best Magento and Adobe Commerce experts. Our developers leverage AI tools for rapid delivery, smarter solutions, and 24/7 project momentum—wherever you are.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
                  Skip generic platforms. MageMatch’s AI-driven approach means you get relevant, AI-empowered talent and faster results—globally.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/developers"
                    className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  >
                    Hire Experts
                  </Link>
                  <a
                    href="mailto:hello@magematch.com?subject=Join%20MageMatch%20as%20Talent"
                    className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-800 shadow-sm shadow-zinc-900/5 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  >
                    Join as Talent
                  </a>
                </div>

                <p className="mt-5 text-sm font-semibold text-orange-600">
                  ⚡ Merchants get matched with relevant talent within 2 hours
                </p>

                <div className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { k: "Magento-only", v: "No irrelevant profiles" },
                    { k: "Trusted talent", v: "Developers, agencies, architects" },
                    { k: "Specialist search", v: "Hyvä, migration, performance" },
                    { k: "Fast shortlist", v: "Profiles + fixed quotes" },
                  ].map((s) => (
                    <div
                      key={s.k}
                      className="rounded-2xl border border-zinc-200/70 bg-white/70 p-5 shadow-sm shadow-zinc-900/5 backdrop-blur"
                    >
                      <p className="text-sm font-semibold text-zinc-900">
                        {s.k}
                      </p>
                      <p className="mt-1 text-sm text-zinc-600">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-6 lg:p-7">
                  <div className="flex flex-col gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        Featured Magento talent
                      </p>
                      <p className="mt-1 text-sm text-zinc-600">
                        See the type of specialists merchants hire through MageMatch.
                      </p>
                    </div>
                    <div className="grid gap-2 text-xs text-zinc-600 sm:text-right">
                      <span>✓ Adobe Commerce certified</span>
                      <span>✓ EU-friendly response times</span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700 sm:grid-cols-3">
                    <div>
                      <p className="font-semibold text-zinc-900">Developers</p>
                      <p className="mt-1">Hands-on Magento delivery and bug fixes.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900">Architects</p>
                      <p className="mt-1">Complex builds, integrations, and technical leadership.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900">Agencies</p>
                      <p className="mt-1">Teams for migrations, rebuilds, and ongoing support.</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm font-semibold text-zinc-900">
                      Featured developers
                    </p>
                    <p className="mt-1 text-sm text-zinc-600">
                      Compare verified Magento specialists and pick the best fit for your project.
                    </p>
                  </div>

                  <div className="mt-5 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {featuredDevelopers.map((developer) => (
                      <article
                        key={developer.slug}
                        className="h-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex h-full flex-col">
                          <div className="flex items-start gap-3">
                            <div
                              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold text-white"
                              style={{ backgroundColor: developer.avatarColor ?? "#F97316" }}
                            >
                              {developer.avatarInitials ??
                                developer.name
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((part: string) => part[0])
                                  .join("")}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-zinc-900">
                                <Link
                                  href={`/developers/${developer.slug}`}
                                  className="hover:text-orange-700"
                                >
                                  {developer.name}
                                </Link>
                              </h3>
                              <p className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-zinc-600">
                                {developer.title}
                              </p>
                            </div>
                          </div>

                          {typeof developer.hourlyRateEur === "number" ? (
                            <p className="mt-2 inline-flex w-fit rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 ring-1 ring-orange-200">
                              €{developer.hourlyRateEur}/hr
                            </p>
                          ) : null}

                          <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-700 ring-1 ring-zinc-200">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                developer.availability === "Immediate" || developer.availability === "Available"
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                            />
                            {developer.availability}
                          </div>

                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {developer.skills.slice(0, 3).map((skill: string) => (
                              <span
                                key={skill}
                                className="rounded-full bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-700 ring-1 ring-zinc-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="mt-auto pt-2">
                            <Link
                              href={`/developers/${developer.slug}`}
                              className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-semibold text-orange-700 transition hover:bg-orange-50"
                            >
                              View profile →
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-zinc-200 pt-4">
                    <Link
                      href="/developers"
                      className="inline-flex text-sm font-semibold text-orange-700 hover:text-orange-800"
                    >
                      View all developers →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedExpertsSection developers={featuredDevelopers} />

        <TrustSection />

        <section className="bg-zinc-100/80">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Why MageMatch’s AI-Driven Approach Wins
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
              MageMatch uses AI to match you with the right Magento talent, scope projects with clarity, and accelerate delivery. Our platform and developers both leverage AI—so you get smarter solutions, faster outcomes, and a global edge.
            </p>
            <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
              <div className="grid grid-cols-2 border-b border-zinc-200">
                <div className="bg-zinc-50 px-5 py-4 text-sm font-semibold text-zinc-900 sm:px-7">
                  ❌ Generic platforms
                </div>
                <div className="bg-orange-50/70 px-5 py-4 text-sm font-semibold text-orange-700 sm:px-7">
                  ✅ MageMatch
                </div>
              </div>
              <div className="grid gap-y-0">
                {[
                  ["Mixed stack freelancers", "Magento & Adobe Commerce specialists only"],
                  ["You write the brief alone", "AI-guided brief builder for faster matching"],
                  ["Developers rely on manual work", "All MageMatch experts use AI tools for rapid delivery"],
                  ["Hard to find Hyvä / migration expertise", "Dedicated niche experts across Hyvä, upgrades, performance, and migrations"],
                  ["Slow filtering and outreach", "Relevant profiles and quotes within 2 hours"],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-2 border-t border-zinc-200 text-sm"
                  >
                    <div className="px-5 py-4 text-zinc-600 sm:px-7">{row[0]}</div>
                    <div className="px-5 py-4 font-medium text-zinc-900 sm:px-7">{row[1]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-orange-50">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 px-4 py-6 text-center sm:flex-row sm:gap-0 sm:px-6">
            {[
              { value: "Magento", label: "Niche-only marketplace" },
              { value: "2hr", label: "Merchant response target" },
              { value: "Hyvä", label: "Specialist talent available" },
              { value: "EU", label: "Trusted timezone coverage" },
            ].map((item, index) => (
              <div key={item.label} className="flex items-center">
                {index > 0 ? <span className="mx-4 hidden text-[#FED7AA] sm:inline">|</span> : null}
                <span className="text-sm">
                  <span className="font-bold text-[#F97316]">{item.value}</span>{" "}
                  <span className="font-medium text-[#374151]">{item.label}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                How MageMatch works
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                From brief to shortlist, the flow is built to help merchants
                understand, compare, and hire Magento talent faster.
              </p>
            </div>
            <Link
              href="/how-it-works"
              className="hidden text-sm font-semibold text-orange-700 hover:text-orange-800 sm:inline-flex"
            >
              Learn more →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Submit a Magento-specific brief",
                desc: "Tell us your platform, urgency, and project type so we can narrow the right specialist profile fast.",
              },
              {
                step: "02",
                title: "Review matched experts",
                desc: "Get relevant developers, agencies, or architects with the right Adobe Commerce, Hyvä, migration, or performance experience.",
              },
              {
                step: "03",
                title: "Hire with confidence",
                desc: "Compare profiles, availability, and fixed-price options—then choose the talent that fits your store best.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#F97316] text-[18px] font-semibold text-white">
                  {s.step}
                </div>
                <p className="mt-4 text-lg font-semibold text-zinc-900">
                  {s.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-50">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Trusted by Magento merchants who need answers fast
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {[
                {
                  quote:
                    "We did not need a general freelancer. We needed a Magento specialist who understood the problem immediately — and MageMatch got us there fast.",
                  author: "Sarah M., Fashion Store Owner, Netherlands",
                },
                {
                  quote:
                    "Finally a marketplace where Hyvä, Adobe Commerce, migrations, and performance are normal filters — not things we have to explain first.",
                  author: "Thomas K., B2B Store Manager, Germany",
                },
              ].map((t) => (
                <article
                  key={t.author}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-base tracking-wide text-amber-500">★★★★★</p>
                  <p className="mt-4 text-4xl leading-none text-zinc-300">“</p>
                  <p className="mt-2 text-base leading-7 text-zinc-700">{t.quote}</p>
                  <p className="mt-4 text-sm font-semibold text-zinc-900">— {t.author}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-orange-500">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Need Magento talent without the search friction?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-orange-50 sm:text-lg">
              Hire developers, agencies, architects, and specialists from one
              trusted Magento marketplace.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/developers"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-orange-600 shadow-sm transition hover:bg-orange-50"
              >
                Hire Experts
              </Link>
              <a
                href="mailto:hello@magematch.com?subject=Join%20MageMatch%20as%20Talent"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Join as Talent
              </a>
            </div>
            <p className="mt-4 text-sm text-orange-100">
              Trusted niche marketplace · 2-hour matching goal · Magento-only focus
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                  Magento Guides & Tutorials
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                  Free resources from our certified developers
                </p>
              </div>
              <Link
                href="/blog"
                className="text-sm font-semibold text-orange-700 hover:text-orange-800"
              >
                View all articles →
              </Link>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700 ring-1 ring-orange-200">
                    {post.tags[0] ?? "magento"}
                  </p>
                  <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-8 tracking-tight text-zinc-900">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">
                    {post.description}
                  </p>
                  <p className="mt-5 text-xs text-zinc-500">
                    {new Date(post.date || post.created_at || new Date()).toLocaleDateString()} · {post.readTime}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-orange-700 hover:text-orange-800"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
