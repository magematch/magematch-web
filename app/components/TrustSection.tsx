import type { ReactNode } from "react";

type TrustItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

const trustItems: TrustItem[] = [
  {
    title: "Verified Experts",
    description:
      "Every listed profile is reviewed for real Magento delivery experience before appearing on MageMatch.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
        <path d="m9.5 12.5 1.8 1.8 3.7-3.8" />
      </svg>
    ),
  },
  {
    title: "Magento Certified Talent",
    description:
      "Work with Adobe Commerce certified developers, architects, and specialists with platform-specific credentials.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M12 12v9" />
        <path d="m8 19 4 2 4-2" />
      </svg>
    ),
  },
  {
    title: "Fast Matching",
    description:
      "Submit one brief and receive relevant experts quickly, with a typical response target of under 2 hours.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
        <path d="M4 6h3" />
      </svg>
    ),
  },
  {
    title: "Global Remote Talent",
    description:
      "Access vetted Magento professionals across multiple regions with reliable remote collaboration workflows.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="M12 3a15 15 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    title: "Trusted by Agencies & Merchants",
    description:
      "Teams and store owners use MageMatch for dependable specialist hiring when quality and speed both matter.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 20s-6-3.5-8.5-7A5 5 0 0 1 11 6l1 1 1-1a5 5 0 0 1 7.5 7c-2.5 3.5-8.5 7-8.5 7z" />
      </svg>
    ),
  },
];

export default function TrustSection({
  compact = false,
}: {
  compact?: boolean;
}) {
  const sectionPadding = compact ? "py-12 sm:py-14" : "py-16 lg:py-20";
  const wrapperPadding = compact ? "p-5 sm:p-6 lg:p-8" : "p-6 sm:p-8 lg:p-10";
  const headingSize = compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl";
  const introSize = compact ? "text-sm sm:text-base" : "text-base sm:text-lg";
  const gridCols = compact ? "sm:grid-cols-2 lg:grid-cols-5" : "sm:grid-cols-2 lg:grid-cols-3";
  const cardPadding = compact ? "p-4" : "p-5";
  const titleSize = compact ? "text-sm" : "text-base";

  return (
    <section className="bg-white">
      <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${sectionPadding}`}>
        <div className={`rounded-4xl border border-zinc-200/70 bg-linear-to-br from-zinc-50 via-white to-orange-50/50 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_20px_56px_-32px_rgba(15,23,42,0.45)] ${wrapperPadding}`}>
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 ring-1 ring-orange-200">
              Trust Signals
            </p>
            <h2 className={`mt-4 font-semibold tracking-tight text-zinc-900 ${headingSize}`}>
              Why merchants trust MageMatch for critical Magento hiring
            </h2>
            <p className={`mt-3 leading-7 text-zinc-600 ${introSize}`}>
              Built for confidence at every step — from expert verification to fast, high-signal matching.
            </p>
          </div>

          <div className={`mt-8 grid gap-4 ${gridCols}`}>
            {trustItems.map((item) => (
              <article
                key={item.title}
                className={`group rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_42px_-28px_rgba(15,23,42,0.45)] ${cardPadding}`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-700 ring-1 ring-orange-200">
                  {item.icon}
                </div>
                <h3 className={`mt-4 font-semibold text-zinc-900 ${titleSize}`}>{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
