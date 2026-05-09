import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { PersonJsonLd, BreadcrumbListJsonLd } from "../../components/JsonLd";
import { supabase } from "../../../lib/supabase";
import type { Developer } from "../../../lib/supabase-types";

export const runtime = "edge";

type DeveloperProfilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  props: DeveloperProfilePageProps
): Promise<Metadata> {
  const params = await props.params;
  const { data: developer } = await supabase
    .from("developers")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!developer) {
    return {
      title: "Developer Not Found | MageMatch",
    };
  }

  return {
    title: `${developer.name} | ${developer.title}`,
    description: developer.headline,
    keywords: [
      developer.name,
      "magento developer",
      "adobe commerce developer",
      ...developer.skills,
    ],
    alternates: {
      canonical: `https://magematch.com/developers/${developer.slug}`,
    },
    openGraph: {
      title: `${developer.name} | MageMatch`,
      description: developer.headline,
      url: `https://magematch.com/developers/${developer.slug}`,
      siteName: "MageMatch",
      type: "profile",
      images: [`https://magematch.com/developers/${developer.slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${developer.name} | MageMatch`,
      description: developer.headline,
      images: [`https://magematch.com/developers/${developer.slug}/opengraph-image`],
    },
  };
}

export default async function DeveloperProfilePage(
  props: DeveloperProfilePageProps
) {
  const params = await props.params;
  let developer: Developer | null = null;
  let error = false;

  try {
    const { data, error: fetchError } = await supabase
      .from("developers")
      .select("*")
      .eq("slug", params.slug)
      .eq("active", true)
      .single();

    if (fetchError) throw fetchError;
    developer = data as Developer;
  } catch (err) {
    console.error("Failed to fetch developer:", err);
    error = true;
  }

  if (!developer || error) {
    notFound();
  }

  const hourlyRate = developer.hourlyRateEur ?? 0;
  const ratePerDay = Math.round(hourlyRate * 8);
  const ratePerWeek = Math.round(hourlyRate * 40);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <PersonJsonLd
        developer={{
          name: developer.name,
          title: developer.title,
          headline: developer.headline,
          slug: developer.slug,
          skills: developer.skills,
        }}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Developers", href: "/developers" },
          { name: developer.name, href: `/developers/${developer.slug}` },
        ]}
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
                    style={{ backgroundColor: developer.avatarColor }}
                  >
                    <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-white">
                      {developer.avatarInitials}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                        {developer.name}
                      </h1>
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                        {developer.availability}
                      </span>
                    </div>

                    <p className="mt-3 text-base leading-7 text-zinc-700">
                      {developer.title}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600">
                      <span className="inline-flex items-center rounded-full bg-zinc-50 px-2.5 py-1 ring-1 ring-zinc-200">
                        {developer.location}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-orange-700 ring-1 ring-orange-200">
                        €{hourlyRate}/hr
                      </span>
                    </div>

                    <p className="mt-6 max-w-lg text-base leading-7 text-zinc-700">
                      {developer.headline}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href="/contact"
                        className="inline-flex h-11 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-600"
                      >
                        Hire {developer.name.split(" ")[0]}
                      </Link>
                      <a
                        href={`mailto:hello@magematch.com?subject=Enquiry about ${developer.name}`}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 shadow-sm shadow-zinc-900/5 transition hover:bg-zinc-50"
                      >
                        Contact directly
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-zinc-200 pt-8">
                  <h2 className="text-xl font-semibold text-zinc-900">
                    Skills & Expertise
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {developer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 ring-1 ring-orange-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                <h2 className="text-xl font-semibold text-zinc-900">
                  About {developer.name.split(" ")[0]}
                </h2>
                <p className="mt-4 text-base leading-7 text-zinc-700">
                  {developer.headline}
                </p>
                <p className="mt-4 text-base leading-7 text-zinc-700">
                  With expertise in {developer.skills.slice(0, 3).join(", ")}, and more,
                  {developer.name.split(" ")[0]} brings a wealth of experience to
                  Adobe Commerce and Magento projects. Available for both short-term
                  fixes and long-term architectural guidance.
                </p>
              </div>
            </section>

            <aside className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Pricing
                  </h3>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-600">Hourly</span>
                      <span className="text-lg font-semibold text-zinc-900">
                        €{hourlyRate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-600">Day (8h)</span>
                      <span className="text-lg font-semibold text-zinc-900">
                        €{ratePerDay}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-600">Week (40h)</span>
                      <span className="text-lg font-semibold text-zinc-900">
                        €{ratePerWeek}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-zinc-200 pt-6">
                    <p className="text-xs text-zinc-600">
                      💡 Most projects include a fixed quote. Contact for details.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-orange-200/80 bg-linear-to-br from-orange-50 via-white to-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.55)] sm:p-8">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Ready to hire?
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    Send a brief description of your project and get a fixed quote
                    within 2 hours.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-600"
                  >
                    Get a quote →
                  </Link>
                </div>

                <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-8">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Type
                  </h3>
                  <p className="mt-2 text-sm text-zinc-700">
                    {developer.expertType === "Freelancer"
                      ? "Independent Freelancer"
                      : "Agency"}
                  </p>
                  <h3 className="mt-6 text-lg font-semibold text-zinc-900">
                    Location
                  </h3>
                  <p className="mt-2 text-sm text-zinc-700">
                    {developer.country}
                  </p>
                  <h3 className="mt-6 text-lg font-semibold text-zinc-900">
                    Availability
                  </h3>
                  <p className="mt-2 text-sm text-zinc-700">
                    {developer.availability}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
