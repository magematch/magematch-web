'use client';

import Link from "next/link";
import { useState } from "react";

const navItems: Array<{ href: string; label: string }> = [
  { href: "/developers", label: "Hire Experts" },
  { href: "/apply", label: "List Your Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 shadow-[0_1px_0_0_rgba(15,23,42,0.03)] backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-semibold tracking-tight text-zinc-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="relative">
              <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-orange-500/10 blur-md" />
              <img
                src="/magematch-logo.svg"
                alt="MageMatch"
                className="relative w-55 h-auto"
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/apply"
              className="hidden rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:inline-flex"
            >
              List Your Services
            </Link>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:border-orange-200 hover:text-orange-700 lg:hidden"
            >
              <span className="sr-only">Toggle mobile menu</span>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="border-t border-zinc-200/80 pb-4 pt-4 lg:hidden">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={`${item.label}-${item.href}-mobile`}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-950"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/apply"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              List Your Services
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}

