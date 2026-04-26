import type { Metadata } from "next";
import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { developers } from "./data/developers";
import { getAllPosts } from "../lib/blog";

export const metadata: Metadata = {
  title: "Hire Magento Developers in Europe | MageMatch",
  description:
    "Find trusted Adobe Commerce (Magento) developers. Vetted specialists for Magento 2, Hyvä, performance, headless, and custom builds.",
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
    title: "Hire Magento Developers in Europe | MageMatch",
    description:
      "Find trusted Adobe Commerce (Magento) developers for bug fixes, speed optimization, Hyvä, and custom development.",
    url: "/",
    siteName: "MageMatch",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Magento Developers in Europe | MageMatch",
    description:
      "Find trusted Adobe Commerce (Magento) developers for bug fixes, speed optimization, Hyvä, and custom development.",
    images: ["/favicon.svg"],
  },
};

export default function Home() {
  const latestPostsPromise = getAllPosts();

  return <HomeContent latestPostsPromise={latestPostsPromise} />;
}

async function HomeContent({
  latestPostsPromise,
}: {
  latestPostsPromise: ReturnType<typeof getAllPosts>;
}) {
  const latestPosts = (await latestPostsPromise).slice(0, 3);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-b from-zinc-50 to-white">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/15 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-zinc-900/10 blur-3xl sm:h-96 sm:w-96" />
          </div>

          <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="grid items-start gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                  Curated marketplace for Adobe Commerce / Magento
                </p>
                <h1 className="mt-6 text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
                  Find a Trusted Magento Developer
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
                  Hire proven Magento 2 and Adobe Commerce experts for audits,
                  bug fixes, Hyvä builds, headless commerce, and full store
                  deliveries—without the noise of general freelancing platforms.
                </p>
                <p className="mt-3 text-sm font-semibold text-orange-600">
                  ⚡ Average response time: 2 hours
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/developers"
                    className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  >
                    Browse developers →
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center text-sm font-semibold text-zinc-700 hover:text-orange-700"
                  >
                    How it works →
                  </Link>
                </div>
                <p className="mt-4 text-sm text-zinc-500">
                  Built by Adobe Commerce Certified Masters
                </p>

                <div className="mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    { k: "Vetted talent", v: "Magento-only" },
                    { k: "Fast starts", v: "Immediate availability" },
                    { k: "Clear pricing", v: "Fixed packages from €99" },
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
                <div className="rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-6">
                  <p className="text-sm font-semibold text-zinc-900">
                    Featured developers
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">
                    Compare three verified Magento specialists and pick the best fit for your project.
                  </p>
                  <div className="mt-5 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {developers.map((developer) => (
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
                                  .map((part) => part[0])
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
                            {developer.skills.slice(0, 3).map((skill) => (
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

        <section className="bg-zinc-100/80">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              Why merchants choose MageMatch over Upwork
            </h2>
            <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
              <div className="grid grid-cols-2 border-b border-zinc-200">
                <div className="bg-zinc-50 px-5 py-4 text-sm font-semibold text-zinc-900 sm:px-7">
                  ❌ Upwork
                </div>
                <div className="bg-orange-50/70 px-5 py-4 text-sm font-semibold text-orange-700 sm:px-7">
                  ✅ MageMatch
                </div>
              </div>
              <div className="grid gap-y-0">
                {[
                  ["500 random developers", "Magento-only experts"],
                  ["Hourly unknown costs", "Fixed price packages"],
                  ["No vetting", "Adobe Certified only"],
                  ["Race to the bottom prices", "Fair, transparent rates"],
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
              { value: "3", label: "Adobe Certified Developers" },
              { value: "2hr", label: "Average Response" },
              { value: "3", label: "Verified Experts" },
              { value: "EU", label: "Timezone Coverage" },
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
                How it works
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                Share your goals, get matched with Magento specialists, and
                launch with confidence—fast.
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
                title: "Describe the work",
                desc: "Use our brief builder to turn messy requirements into a clear Magento scope.",
              },
              {
                step: "02",
                title: "Meet vetted developers",
                desc: "Browse specialists by skill, availability, and track record—Magento only.",
              },
              {
                step: "03",
                title: "Start and ship",
                desc: "Kick off quickly with developers from €40/hr and fixed packages from €99.",
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
              What store owners say
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {[
                {
                  quote:
                    "Arjun fixed our checkout in 4 hours. We were losing €2,000/day in sales.",
                  author: "Sarah M., Fashion Store Owner, Netherlands",
                },
                {
                  quote:
                    "Finally a platform that understands Magento. No more explaining what Hyvä is.",
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
              Ready to fix your Magento store?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-orange-50 sm:text-lg">
              Get matched with a verified developer in under 2 hours.
            </p>
            <div className="mt-8">
              <Link
                href="/developers"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-orange-600 shadow-sm transition hover:bg-orange-50"
              >
                Start Free Match →
              </Link>
            </div>
            <p className="mt-4 text-sm text-orange-100">
              No account needed · Free to use · Pay only when you hire
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
                    {new Date(post.date).toLocaleDateString()} · {post.readTime}
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
