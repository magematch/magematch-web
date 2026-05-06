"use client";

import { useMemo, useState } from "react";

import type { Developer } from "./DeveloperCard";
import DeveloperCard from "./DeveloperCard";

type SkillFilter = "all" | "Magento" | "Hyvä" | "Frontend" | "Backend" | "Architect";
type RateFilter = "all" | "under-50" | "50-70" | "70-plus";
type AvailabilityFilter = "all" | "Immediate" | "Available" | "This week" | "Next week";
type ExpertTypeFilter = "all" | "Freelancer" | "Agency";

type FilterState = {
  skill: SkillFilter;
  country: string;
  rate: RateFilter;
  availability: AvailabilityFilter;
  expertType: ExpertTypeFilter;
};

const initialFilters: FilterState = {
  skill: "all",
  country: "all",
  rate: "all",
  availability: "all",
  expertType: "all",
};

function matchesSkillFilter(developer: Developer, skill: SkillFilter) {
  if (skill === "all") {
    return true;
  }

  const searchable = [developer.title, developer.headline, ...developer.skills]
    .join(" ")
    .toLowerCase();

  if (skill === "Magento") {
    return searchable.includes("magento") || searchable.includes("adobe commerce");
  }

  if (skill === "Hyvä") {
    return searchable.includes("hyvä") || searchable.includes("hyva");
  }

  if (skill === "Frontend") {
    return ["frontend", "hyvä", "hyva", "theme", "tailwind", "headless", "graphql"].some((token) =>
      searchable.includes(token),
    );
  }

  if (skill === "Backend") {
    return ["backend", "php", "node", "api", "integration", "module"].some((token) =>
      searchable.includes(token),
    );
  }

  if (skill === "Architect") {
    return ["architect", "architecture", "enterprise", "lead"].some((token) =>
      searchable.includes(token),
    );
  }

  return true;
}

function matchesRateFilter(developer: Developer, rate: RateFilter) {
  if (rate === "all") {
    return true;
  }

  if (typeof developer.hourlyRateEur !== "number") {
    return false;
  }

  if (rate === "under-50") {
    return developer.hourlyRateEur < 50;
  }

  if (rate === "50-70") {
    return developer.hourlyRateEur >= 50 && developer.hourlyRateEur <= 70;
  }

  if (rate === "70-plus") {
    return developer.hourlyRateEur > 70;
  }

  return true;
}

function getCountry(developer: Developer) {
  return developer.country ?? developer.location.split("·").at(1)?.trim() ?? "Unknown";
}

export default function ExpertSearchPanel({ developers }: { developers: Developer[] }) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const countries = useMemo(() => {
    return [
      "all",
      ...new Set(
        developers
          .map((developer) => getCountry(developer))
          .filter((country) => country && country !== "Unknown"),
      ),
    ];
  }, [developers]);

  const filteredDevelopers = useMemo(() => {
    return developers.filter((developer) => {
      const country = getCountry(developer);
      const expertType = developer.expertType ?? "Freelancer";

      if (!matchesSkillFilter(developer, filters.skill)) {
        return false;
      }

      if (filters.country !== "all" && country !== filters.country) {
        return false;
      }

      if (!matchesRateFilter(developer, filters.rate)) {
        return false;
      }

      if (filters.availability !== "all" && developer.availability !== filters.availability) {
        return false;
      }

      if (filters.expertType !== "all" && expertType !== filters.expertType) {
        return false;
      }

      return true;
    });
  }, [developers, filters]);

  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    return value !== initialFilters[key as keyof FilterState];
  });

  return (
    <>
      <div className="mt-10 rounded-3xl border border-zinc-200/70 bg-white p-5 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_18px_48px_-28px_rgba(15,23,42,0.5)] sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label htmlFor="skill" className="text-sm font-semibold text-zinc-900">
              Skill
            </label>
            <select
              id="skill"
              name="skill"
              value={filters.skill}
              onChange={(event) => handleFilterChange("skill", event.target.value as SkillFilter)}
              className="mt-2 h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="all">All skills</option>
              <option value="Magento">Magento</option>
              <option value="Hyvä">Hyvä</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Architect">Architect</option>
            </select>
          </div>

          <div>
            <label htmlFor="country" className="text-sm font-semibold text-zinc-900">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={filters.country}
              onChange={(event) => handleFilterChange("country", event.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="all">All countries</option>
              {countries
                .filter((country) => country !== "all")
                .map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="rate" className="text-sm font-semibold text-zinc-900">
              Hourly Rate
            </label>
            <select
              id="rate"
              name="rate"
              value={filters.rate}
              onChange={(event) => handleFilterChange("rate", event.target.value as RateFilter)}
              className="mt-2 h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="all">Any rate</option>
              <option value="under-50">Under €50/hr</option>
              <option value="50-70">€50–70/hr</option>
              <option value="70-plus">€70+/hr</option>
            </select>
          </div>

          <div>
            <label htmlFor="availability" className="text-sm font-semibold text-zinc-900">
              Availability
            </label>
            <select
              id="availability"
              name="availability"
              value={filters.availability}
              onChange={(event) =>
                handleFilterChange("availability", event.target.value as AvailabilityFilter)
              }
              className="mt-2 h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="all">Any</option>
              <option value="Immediate">Immediate</option>
              <option value="Available">Available</option>
              <option value="This week">This week</option>
              <option value="Next week">Next week</option>
            </select>
          </div>

          <div>
            <label htmlFor="expertType" className="text-sm font-semibold text-zinc-900">
              Type
            </label>
            <select
              id="expertType"
              name="expertType"
              value={filters.expertType}
              onChange={(event) =>
                handleFilterChange("expertType", event.target.value as ExpertTypeFilter)
              }
              className="mt-2 h-12 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm shadow-zinc-900/5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="all">Freelancer + Agency</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Agency">Agency</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-600">
            Showing <span className="font-semibold text-zinc-900">{filteredDevelopers.length}</span> of {developers.length} experts
          </p>

          <button
            type="button"
            onClick={() => setFilters(initialFilters)}
            disabled={!hasActiveFilters}
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 shadow-sm shadow-zinc-900/5 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear filters
          </button>
        </div>
      </div>

      {filteredDevelopers.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filteredDevelopers.map((developer) => (
            <DeveloperCard
              key={developer.slug}
              developer={developer}
              note={
                developer.slug === "aleksandar-harutyunyan"
                  ? "Worked with Arjun at Valantic"
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <p className="text-xl font-semibold text-zinc-900">No experts match these filters yet</p>
          <p className="mt-2 text-sm text-zinc-600">
            Try broadening your skill, rate, or availability filters to see more profiles.
          </p>
          <button
            type="button"
            onClick={() => setFilters(initialFilters)}
            className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-orange-500 px-5 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-600"
          >
            Reset all filters
          </button>
        </div>
      )}
    </>
  );
}
