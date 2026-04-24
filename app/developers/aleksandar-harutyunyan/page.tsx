import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export const metadata: Metadata = {
  title: "Aleksandar Harutyunyan — Adobe Commerce & SFCC Developer",
  description:
    "Hire Aleksandar Harutyunyan — Adobe Commerce and Salesforce B2C Commerce developer with 20+ years of enterprise eCommerce experience.",
};

type ServicePackage = {
  name: string;
  price: string;
  delivery: string;
  description: string;
};

const skills: string[] = [
  "Adobe Commerce",
  "Magento 2",
  "Salesforce Commerce Cloud",
  "PHP",
  "Full-Stack",
  "Adyen",
  "Avalara",
  "Platform Migration",
  "WordPress",
  "WooCommerce",
  "Custom Development",
  "Performance",
];

const certifications: string[] = [
  "Adobe Certified Professional — Adobe Commerce Developer",
  "Salesforce Certified B2C Commerce Developer",
];

const packages: ServicePackage[] = [
  {
    name: "🔍 Adobe Commerce Audit",
    price: "€149",
    delivery: "3 days",
    description: "Full performance + code quality review.",
  },
  {
    name: "🔗 SFCC Integration",
    price: "From €299",
    delivery: "Timeline discussed",
    description: "Salesforce Commerce Cloud development.",
  },
  {
    name: "🐛 Bug Fix Package",
    price: "€99",
    delivery: "Same day",
    description: "1 critical bug, tested and deployed.",
  },
  {
    name: "🔄 Platform Migration",
    price: "From €999",
    delivery: "Timeline discussed",
    description: "Magento 1→2 or Magento→SFCC migration.",
  },
  {
    name: "🚀 Full Store Build",
    price: "From €1,500",
    delivery: "Custom quote",
    description: "Discovery, architecture, build, launch.",
  },
];

const highlights = [
  {
    title: "✦ Adobe Commerce (Magento)",
    description:
      "10+ years across Magento 1 & 2. Built dozens of custom features, platform migrations, and integrated major services like Adyen and Avalara.",
  },
  {
    title: "✦ Salesforce Commerce Cloud",
    description:
      "3+ years frontend and backend development. Custom cartridge creation, integrations, and enterprise-scale B2C solutions.",
  },
  {
    title: "✦ WordPress & WooCommerce",
    description:
      "Custom themes, plugins, and performance tuning for small to medium businesses.",
  },
];

const experience: string[] = [
  "20+ years eCommerce development",
  "Worked at AIOPSGROUP (Valantic) alongside Arjun Dhiman",
  "Adyen & Avalara integration specialist",
  "Enterprise B2C platform experience",
  "Based in Bulgaria (same timezone as EU clients)",
];

export default function AleksandarHarutyunyanProfilePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="flex-1 bg-zinc-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <section className="lg:col-span-8">
              <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <div
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-zinc-200 sm:h-24 sm:w-24"
                    style={{ backgroundColor: "#0D9488" }}
                  >
                    <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-white">
                      AH
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                        Aleksandar Harutyunyan
                      </h1>
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                        Available
                      </span>
                    </div>

                    <p className="mt-3 text-base leading-7 text-zinc-700">
                      Adobe Commerce & Salesforce B2C Commerce Developer | 20+ Years Experience
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600">
                      <span className="inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                        Bulgaria 🇧🇬
                      </span>
                      <span className="inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                        20+ years
                      </span>
                      <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700 ring-1 ring-orange-200">
                        €55/hr
                      </span>
                      <span className="inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                        Adobe Commerce / SFCC
                      </span>
                    </div>

                    <p className="mt-6 text-sm leading-6 text-zinc-600">
                      Experienced web developer with over 20 years in building and maintaining scalable eCommerce platforms. Specialising in Adobe Commerce (Magento) and Salesforce Commerce Cloud (SFCC), delivering reliable, secure, and high-performing systems for enterprise-level clients. Over a decade of Magento 1 & 2 experience — custom features, platform migrations, and major third-party integrations including Adyen and Avalara.
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
                  <h2 className="text-lg font-semibold text-zinc-900">Certifications</h2>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                    {certifications.map((certification) => (
                      <li key={certification} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                        <span>{certification}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="mt-6 rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                <h2 className="text-xl font-semibold text-zinc-900">Highlights</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {highlights.map((highlight) => (
                    <div
                      key={highlight.title}
                      className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm shadow-zinc-900/5"
                    >
                      <p className="text-sm font-semibold text-zinc-900">{highlight.title}</p>
                      <p className="mt-3 text-sm leading-6 text-zinc-600">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-6 rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-900">Productized packages</h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      Clear deliverables. Fast starts. Great for Adobe Commerce and SFCC initiatives.
                    </p>
                  </div>
                  <p className="text-xs font-medium text-zinc-500">Pricing shown in EUR</p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm shadow-zinc-900/5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-zinc-900">{pkg.name}</p>
                          <p className="mt-1 text-xs text-zinc-500">{pkg.delivery}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                          {pkg.price}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-zinc-600">{pkg.description}</p>
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
                <h2 className="text-xl font-semibold text-zinc-900">Notable experience</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {experience.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm shadow-zinc-900/5"
                    >
                      <p className="text-sm font-semibold text-zinc-900">{item}</p>
                    </div>
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
                  <h2 className="text-lg font-semibold text-zinc-900">Contact / Hire Me</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Tell me about your Adobe Commerce, SFCC, or migration project and I’ll outline the right next step.
                  </p>

                  <div className="mt-5 space-y-3">
                    <div>
                      <label htmlFor="brief" className="text-sm font-semibold text-zinc-900">
                        Project brief
                      </label>
                      <textarea
                        id="brief"
                        name="brief"
                        rows={5}
                        placeholder="Adobe Commerce version, SFCC scope, migration goals, integrations, deadlines, links, etc."
                        className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none placeholder:text-zinc-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-semibold text-zinc-900">
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
                      Static preview only. We’ll wire this to real messaging once the marketplace backend is ready.
                    </p>
                  </div>
                </section>

                <section className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)]">
                  <h2 className="text-sm font-semibold text-zinc-900">Typical engagements</h2>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                    {[
                      "Adobe Commerce performance and custom features",
                      "Salesforce Commerce Cloud cartridge development",
                      "Adyen and Avalara integrations",
                      "Magento 1 → 2 and Magento → SFCC migrations",
                      "WordPress and WooCommerce custom builds",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-zinc-900" />
                        <span>{item}</span>
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
