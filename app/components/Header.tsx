'use client';

import Link from "next/link";
import type { MouseEvent } from "react";

const navItems: Array<{ href: string; label: string }> = [
  { href: "/developers", label: "Developers" },
  { href: "/extensions", label: "Extensions" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const handleOpenChat = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.dispatchEvent(new Event('openChat'));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-semibold tracking-tight text-zinc-900"
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

          <nav className="hidden items-center gap-6 sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/developers"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-200 shadow-sm shadow-zinc-900/5 transition hover:bg-zinc-50 sm:inline-flex"
            >
              Browse talent
            </Link>
            <Link
              href="#chat"
              onClick={handleOpenChat}
              className="inline-flex rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-orange-600/20 transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              Hire a Magento Expert
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pb-3 sm:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

