import Link from "next/link";

export type DeveloperAvailability = "Immediate" | "This week" | "Next week";

export type Developer = {
  slug: string;
  name: string;
  title: string;
  location: string;
  country?: string;
  expertType?: "Freelancer" | "Agency";
  availability: DeveloperAvailability | "Available";
  headline?: string;
  skills: string[];
  hourlyRateEur?: number;
  featured?: boolean;
  avatarInitials?: string;
  avatarColor?: string;
  badgeText?: string;
};

type Props = {
  developer: Developer;
  variant?: "default" | "featured";
  note?: string;
};

export default function DeveloperCard({
  developer,
  variant = "default",
  note,
}: Props) {
  const isFeatured = variant === "featured" || developer.featured;
  const isAvailable = developer.availability === "Immediate" || developer.availability === "Available";
  const topBadge = developer.badgeText ?? (isFeatured ? "🏆 Adobe Certified Master" : null);

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border bg-white transition",
        "shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_12px_32px_-18px_rgba(15,23,42,0.35)]",
        "hover:-translate-y-0.5 hover:shadow-[0_1px_0_0_rgba(15,23,42,0.04),0_18px_48px_-20px_rgba(15,23,42,0.45)]",
        isFeatured
          ? "border-orange-200/80 ring-1 ring-orange-100/60"
          : "border-zinc-200/80",
      ].join(" ")}
    >
      {topBadge ? (
        <div className="border-b border-orange-200/80 bg-orange-50/70 px-5 py-2 text-sm font-semibold text-orange-800 sm:px-6">
          {topBadge}
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl ring-1 ring-zinc-200"
            style={{ backgroundColor: developer.avatarColor ?? "#F97316" }}
          >
            <div className="absolute inset-0 grid place-items-center text-xs font-semibold text-white">
              {developer.avatarInitials ??
                developer.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="text-base font-semibold leading-6 tracking-tight text-zinc-900">
                <Link
                  href={`/developers/${developer.slug}`}
                  className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                >
                  {developer.name}
                </Link>
              </h3>
              {isFeatured ? (
                <span className="rounded-full bg-orange-50/80 px-2.5 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200/70">
                  Featured
                </span>
              ) : null}
            </div>

            <p className="mt-1 line-clamp-2 text-sm text-zinc-600">
              {developer.title}
            </p>

            {note ? (
              <p className="mt-2 inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 ring-1 ring-teal-200">
                {note}
              </p>
            ) : null}

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
              <span className="inline-flex items-center gap-1 rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
                  {isAvailable ? (
                    <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-75" />
                  ) : null}
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {developer.availability}
              </span>
              <span className="inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                {developer.location}
              </span>
              {typeof developer.hourlyRateEur === "number" ? (
                <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-base font-bold text-orange-700 ring-1 ring-orange-200">
                  €{developer.hourlyRateEur}/hr
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {developer.headline ? (
          <p className="mt-4 text-sm leading-6 text-zinc-700">
            {developer.headline}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {developer.skills.slice(0, 7).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200"
            >
              {skill}
            </span>
          ))}
          {developer.skills.length > 7 ? (
            <span className="rounded-full bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200">
              +{developer.skills.length - 7} more
            </span>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-500">
            Verified Magento specialists
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700">
            View profile
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

