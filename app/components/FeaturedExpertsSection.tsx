import Link from "next/link";

import { developers } from "../data/developers";

type FeaturedExpert = {
  name: string;
  title: string;
  skills: string[];
  country: string;
  availability: "Immediate" | "Available" | "This week" | "Next week";
  href: string;
  avatarInitials: string;
  avatarColor: string;
  badge: string;
};

const featuredExperts: FeaturedExpert[] = [
  {
    name: developers[0].name,
    title: developers[0].title,
    skills: developers[0].skills.slice(0, 4),
    country: "Bulgaria",
    availability: developers[0].availability,
    href: `/developers/${developers[0].slug}`,
    avatarInitials: developers[0].avatarInitials ?? "AD",
    avatarColor: developers[0].avatarColor ?? "#F97316",
    badge: "Adobe Commerce Master",
  },
  {
    name: developers[1].name,
    title: developers[1].title,
    skills: developers[1].skills.slice(0, 4),
    country: "India",
    availability: developers[1].availability,
    href: `/developers/${developers[1].slug}`,
    avatarInitials: developers[1].avatarInitials ?? "TK",
    avatarColor: developers[1].avatarColor ?? "#7C3AED",
    badge: "7x Adobe Certified",
  },
  {
    name: developers[2].name,
    title: developers[2].title,
    skills: developers[2].skills.slice(0, 4),
    country: "Bulgaria",
    availability: developers[2].availability,
    href: `/developers/${developers[2].slug}`,
    avatarInitials: developers[2].avatarInitials ?? "AH",
    avatarColor: developers[2].avatarColor ?? "#0D9488",
    badge: "Enterprise Commerce Lead",
  },
  {
    name: "Elena Petrova",
    title: "Hyvä Frontend Specialist | Theme Builds & UX Optimization",
    skills: ["Hyvä", "Tailwind", "Magento 2", "Core Web Vitals"],
    country: "Poland",
    availability: "This week",
    href: "/developers",
    avatarInitials: "EP",
    avatarColor: "#2563EB",
    badge: "Curated Hyvä Expert",
  },
  {
    name: "Markus Vogel",
    title: "Adobe Commerce Solutions Architect | Integrations & Scalability",
    skills: ["Adobe Commerce", "Architecture", "ERP", "GraphQL"],
    country: "Germany",
    availability: "Next week",
    href: "/developers",
    avatarInitials: "MV",
    avatarColor: "#111827",
    badge: "Curated Architect",
  },
  {
    name: "Lucia Ramos",
    title: "Magento Migration Specialist | Replatforming & Launch Support",
    skills: ["Migrations", "Magento 2", "Data", "QA"],
    country: "Spain",
    availability: "Immediate",
    href: "/developers",
    avatarInitials: "LR",
    avatarColor: "#DC2626",
    badge: "Curated Migration Lead",
  },
];

export default function FeaturedExpertsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
              Featured Experts
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Meet trusted Magento specialists merchants shortlist first
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg">
              Explore a premium mix of Adobe Commerce engineers, architects, Hyvä experts,
              and migration specialists — all presented with the details decision-makers care about.
            </p>
          </div>

          <Link
            href="/developers"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm shadow-zinc-900/5 transition hover:border-orange-200 hover:text-orange-700"
          >
            Browse all talent
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featuredExperts.map((expert) => {
            const isAvailable =
              expert.availability === "Immediate" || expert.availability === "Available";

            return (
              <article
                key={`${expert.name}-${expert.country}`}
                className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.4)] transition hover:-translate-y-1 hover:shadow-[0_1px_0_0_rgba(15,23,42,0.04),0_26px_60px_-28px_rgba(15,23,42,0.48)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-r from-orange-50 via-white to-zinc-50" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl ring-1 ring-white/70"
                      style={{ backgroundColor: expert.avatarColor }}
                    >
                      <span className="text-base font-semibold tracking-wide text-white">
                        {expert.avatarInitials}
                      </span>
                      <span className="absolute bottom-1 rounded-full bg-black/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/90">
                        Photo
                      </span>
                    </div>

                    <div>
                      <p className="inline-flex rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 ring-1 ring-zinc-200">
                        {expert.badge}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-900">
                        {expert.name}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-600">
                        {expert.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative mt-5 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-700">
                  <span className="inline-flex items-center rounded-full bg-zinc-50 px-3 py-1.5 ring-1 ring-zinc-200">
                    {expert.country}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-1.5 ring-1 ring-zinc-200">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isAvailable ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    {expert.availability}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {expert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-5">
                  <span className="text-xs font-medium text-zinc-500">
                    Premium Magento talent pool
                  </span>
                  <Link
                    href={expert.href}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                  >
                    View Profile
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
