import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export const metadata: Metadata = {
  title: "Tinkesh Kumar — Magento 2 & NodeJS Developer",
  description:
    "Hire Tinkesh Kumar — 7x Adobe Commerce Certified Magento 2 & NodeJS developer with 11+ years in custom development, payment gateways, and theme integration.",
};

type ServicePackage = {
  name: string;
  price: string;
  delivery: string;
  description: string;
};

const skills: string[] = [
  "Magento 2",
  "Adobe Commerce",
  "NodeJS",
  "PHP",
  "Payment Gateways",
  "Theme Integration",
  "Magento Extensions",
  "eCommerce",
  "Custom Development",
  "Azure",
];

const certifications: string[] = [
  "7x Adobe Commerce Certified",
  "4x Microsoft Azure Certified",
  "Adobe Commerce Architect Master",
  "Fabrics Data Engineer",
];

const packages: ServicePackage[] = [
  {
    name: "🔍 Magento Audit",
    price: "€129",
    delivery: "3 days",
    description: "Performance + security review.",
  },
  {
    name: "🐛 Bug Fix Package",
    price: "€89",
    delivery: "Same day",
    description: "1 critical bug, tested and deployed.",
  },
  {
    name: "⚙️ Extension Development",
    price: "From €249",
    delivery: "Timeline discussed",
    description: "Custom Magento extension, tested.",
  },
  {
    name: "🔗 Payment Gateway Integration",
    price: "From €199",
    delivery: "Timeline discussed",
    description: "Any payment provider, full integration.",
  },
  {
    name: "🚀 Full Store Build",
    price: "From €1,200",
    delivery: "Custom quote",
    description: "Discovery, build, test, launch.",
  },
];

const experience: string[] = [
  "10+ Magento projects over 4 years",
  "Payment Gateway Implementations specialist",
  "Theme Integration & Customization expert",
  "Worked at OSSCube (Happiest Minds division)",
  "Currently at Nagarro",
];

export default function TinkeshKumarProfilePage() {
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
                    style={{ backgroundColor: "#7C3AED" }}
                  >
                    <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-white">
                      TK
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                        Tinkesh Kumar
                      </h1>
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                        Available
                      </span>
                    </div>

                    <p className="mt-3 text-base leading-7 text-zinc-700">
                      7x Adobe Commerce Certified | Magento 2 & NodeJS Developer
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600">
                      <span className="inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                        Noida, India
                      </span>
                      <span className="inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                        11+ years
                      </span>
                      <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700 ring-1 ring-orange-200">
                        €45/hr
                      </span>
                      <span className="inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                        Magento 2 / NodeJS
                      </span>
                    </div>

                    <p className="mt-6 text-sm leading-6 text-zinc-600">
                      An astute professional with 11+ years of experience in Magento/Magento 2 development, eCommerce, PHP, and payment gateway implementations. Expert in custom solutions, troubleshooting complex software problems, and handling 10+ Magento projects. Strong background in theme integration, customization, and client servicing.
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
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-900">
                      Productized packages
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      Clear deliverables. Fast starts. Great for common Adobe Commerce needs.
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
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Highlights from recent Magento work, delivery history, and platform specialization.
                </p>

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
                    Tell me about your Magento project, blockers, and timeline. I’ll suggest a practical approach and next step.
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
                        placeholder="Magento version, payment gateway, module request, deadlines, links, etc."
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
                      "Magento payment gateway integrations",
                      "Theme integration and front-end customisation",
                      "Custom module and extension development",
                      "Troubleshooting critical Magento issues",
                      "Azure-backed eCommerce delivery support",
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
