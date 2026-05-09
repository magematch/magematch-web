import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { PersonJsonLd } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "Arjun Dhiman | Adobe Commerce Certified Master",
  description:
    "Hire Arjun Dhiman — Adobe Commerce Certified Master with 13+ years in Magento 2, Hyvä, performance, GraphQL, headless commerce, and scalable architecture.",
  keywords: [
    "arjun dhiman",
    "adobe commerce certified master",
    "hire magento architect",
    "hyva expert",
    "magento performance consultant",
  ],
  alternates: {
    canonical: "https://magematch.com/developers/arjun-dhiman",
  },
  openGraph: {
    title: "Arjun Dhiman | Adobe Commerce Certified Master",
    description:
      "Hire Arjun Dhiman for Magento architecture, Hyvä, performance, GraphQL, and enterprise Adobe Commerce delivery.",
    url: "https://magematch.com/developers/arjun-dhiman",
    siteName: "MageMatch",
    type: "profile",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjun Dhiman | Adobe Commerce Certified Master",
    description:
      "Hire Arjun Dhiman for Magento architecture, Hyvä, performance, GraphQL, and enterprise Adobe Commerce delivery.",
    images: ["/opengraph-image"],
  },
};

type ServicePackage = {
  name: string;
  price: string;
  delivery: string;
  description: string;
};

type OpenSourceExtension = {
  name: string;
  description: string;
  repoUrl: string;
};

const skills: string[] = [
  "Magento 2",
  "Adobe Commerce",
  "Hyvä",
  "PHP",
  "GraphQL",
  "Headless Commerce",
  "AWS",
  "Docker",
  "Salesforce Commerce Cloud",
];

const certifications: string[] = [
  "Adobe Certified Master - Adobe Commerce Architect",
  "Adobe Certified Expert - Adobe Commerce Developer",
  "Adobe Certified Professional - Adobe Commerce Developer",
];

const packages: ServicePackage[] = [
  {
    name: "🔍 Magento Speed Audit",
    price: "€199",
    delivery: "Delivered in 3 days",
    description:
      "Includes: Lighthouse report, Core Web Vitals analysis, top 10 fixes with recommendations.",
  },
  {
    name: "🐛 Bug Fix Package",
    price: "€99",
    delivery: "Same day response",
    description:
      "Includes: 1 critical bug, tested fix, deployment to staging.",
  },
  {
    name: "🎨 Hyvä Theme Setup",
    price: "€799",
    delivery: "5–7 days",
    description:
      "Includes: Hyvä installation, basic customisation, mobile responsive.",
  },
  {
    name: "⚙️ Custom Module Development",
    price: "From €299",
    delivery: "Timeline discussed",
    description:
      "Includes: Requirements analysis, development, testing, documentation.",
  },
  {
    name: "🚀 Full Store Build",
    price: "From €1,500",
    delivery: "Custom quote",
    description:
      "Includes: Full discovery, build, testing, launch support.",
  },
];

const projects: Array<{ name: string; notes: string }> = [
  { name: "Conn's", notes: "Ecommerce optimization, stability improvements, and platform enhancements." },
  { name: "Rossignol", notes: "Adobe Commerce delivery support with performance and integrations focus." },
  { name: "Hudson Store", notes: "Magento development and refinements for a high-quality shopping experience." },
];

const extensions: OpenSourceExtension[] = [
  {
    name: "Magento 2 Performance Toolkit",
    description: "Collection of scripts and checks to identify and fix bottlenecks.",
    repoUrl: "https://github.com/magematch",
  },
  {
    name: "Checkout UX Enhancer",
    description: "Improves checkout usability patterns for conversion-oriented stores.",
    repoUrl: "https://github.com/magematch",
  },
  {
    name: "Catalog Automation Helpers",
    description: "Utilities for automating repetitive product and category operations.",
    repoUrl: "https://github.com/magematch",
  },
];

export default function ArjunDhimanProfilePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <PersonJsonLd
        developer={{
          name: "Arjun Dhiman",
          title: "Adobe Commerce Certified Master",
          headline:
            "Hire Arjun Dhiman — Adobe Commerce Certified Master with 13+ years in Magento 2, Hyvä, performance, GraphQL, headless commerce, and scalable architecture.",
          slug: "arjun-dhiman",
          skills,
        }}
      />
      <Header />

      <main className="flex-1 bg-zinc-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <section className="lg:col-span-8">
              <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <div
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-zinc-200 sm:h-24 sm:w-24"
                    style={{ backgroundColor: "#F97316" }}
                  >
                    <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-white">
                      AD
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                        Arjun Dhiman
                      </h1>
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                        Available immediately
                      </span>
                    </div>

                    <p className="mt-3 text-base leading-7 text-zinc-700">
                      Adobe Commerce Certified Master | 13+ Years
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600">
                      <span className="inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                        Sofia, Bulgaria
                      </span>
                      <span className="inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                        Immediate
                      </span>
                      <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700 ring-1 ring-orange-200">
                        €55/hr
                      </span>
                      <span className="inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                        Adobe Commerce / Magento
                      </span>
                    </div>

                    <p className="mt-6 text-sm leading-6 text-zinc-600">
                      I help merchants and agencies ship stable, fast Adobe
                      Commerce builds. Expect clean architecture, pragmatic
                      delivery, and performance-first thinking.
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                      >
                        Contact / Hire Me
                      </Link>
                      <Link
                        href="/developers"
                        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 shadow-sm shadow-zinc-900/5 transition hover:bg-zinc-50"
                      >
                        Back to developers
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <section className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.55)]">
                  <h2 className="text-lg font-semibold text-zinc-900">Skills</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_16px_40px_-28px_rgba(15,23,42,0.55)]">
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Certifications
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                    {certifications.map((c) => (
                      <li key={c} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="mt-6 rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-900">
                      Productized packages
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      Clear deliverables. Fast starts. Great for common Adobe
                      Commerce needs.
                    </p>
                  </div>
                  <p className="text-xs font-medium text-zinc-500">
                    Pricing shown in EUR
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {packages.map((p) => (
                    <div
                      key={p.name}
                      className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm shadow-zinc-900/5"
                    >
                      {p.name.includes("Bug Fix Package") ? (
                        <div className="mb-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                          Most Popular 🔥
                        </div>
                      ) : null}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">
                            {p.name}
                          </p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {p.delivery}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                          {p.price}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-zinc-600">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <Link
                    href="#contact"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-zinc-900/20 transition hover:bg-zinc-800 sm:w-auto"
                  >
                    Start a conversation
                  </Link>
                </div>
              </section>

              <section className="mt-6 rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                <h2 className="text-xl font-semibold text-zinc-900">
                  Recent projects
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Highlights from recent ecommerce work across brands and
                  platforms.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {projects.map((proj) => (
                    <div
                      key={proj.name}
                      className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm shadow-zinc-900/5"
                    >
                      <p className="text-sm font-semibold text-zinc-900">
                        {proj.name}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {proj.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-6 rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-900">
                      Open Source Contributions
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      Free Magento extensions and tools published for the community.
                    </p>
                  </div>
                  <Link
                    href="/extensions"
                    className="text-sm font-semibold text-orange-700 hover:text-orange-800"
                  >
                    View all extensions →
                  </Link>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {extensions.map((extension) => (
                    <a
                      key={extension.repoUrl}
                      href={extension.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm shadow-zinc-900/5 transition hover:-translate-y-0.5 hover:border-orange-200"
                    >
                      <p className="text-sm font-semibold text-zinc-900">
                        {extension.name}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {extension.description}
                      </p>
                      <p className="mt-3 text-xs font-medium text-orange-700">
                        GitHub →
                      </p>
                    </a>
                  ))}
                </div>
              </section>
            </section>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <section
                  id="contact"
                  className="rounded-3xl border border-orange-200/80 bg-linear-to-br from-orange-50 via-white to-white p-7 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.55)]"
                >
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Contact / Hire Me
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Tell me what you’re building and what “done” looks like. I’ll
                    respond with next steps and a suggested approach.
                  </p>
                  <p className="mt-3 text-sm text-zinc-600">
                    Or email Arjun directly at{' '}
                    <a
                      href="mailto:arjun@magematch.com"
                      className="font-semibold text-orange-600 hover:text-orange-700"
                    >
                      arjun@magematch.com
                    </a>
                  </p>

                  <div className="mt-5 space-y-3">
                    <div>
                      <label
                        htmlFor="brief"
                        className="text-sm font-semibold text-zinc-900"
                      >
                        Project brief
                      </label>
                      <textarea
                        id="brief"
                        name="brief"
                        rows={5}
                        placeholder="Magento version, theme (Hyvä/Luma), problem statement, deadlines, links, etc."
                        className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none placeholder:text-zinc-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-zinc-900"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        className="mt-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none placeholder:text-zinc-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                    <button
                      type="button"
                      className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                    >
                      Send request
                    </button>
                    <p className="text-xs text-zinc-500">
                      Static preview only. We’ll wire this to real messaging
                      once the marketplace backend is ready.
                    </p>
                  </div>
                </section>

                <section className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)]">
                  <h2 className="text-sm font-semibold text-zinc-900">
                    Typical engagements
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                    {[
                      "Performance audits + speed fixes",
                      "Hyvä implementations and refactors",
                      "Checkout and payments debugging",
                      "GraphQL & headless storefront support",
                      "AWS/Docker infra + CI improvements",
                    ].map((i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-zinc-900" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

