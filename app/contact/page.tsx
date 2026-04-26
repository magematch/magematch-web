"use client";

import { useForm } from "@formspree/react";
import Link from "next/link";
import { useState, type MouseEvent } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("FORMSPREE_ID");
  const [email, setEmail] = useState("");

  const openChatMatcher = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.dispatchEvent(new Event("openChat"));
  };

  if (state.succeeded) {
    return (
      <div className="flex min-h-full flex-1 flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 sm:py-20">
          <div className="rounded-3xl border border-orange-200 bg-orange-50 p-8 text-center shadow-sm">
            <p className="text-2xl font-semibold tracking-tight text-zinc-900">
              ✅ Message sent!
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-700">
              We&apos;ll match you with a developer within 2 hours. Check your email
              at <span className="font-semibold text-orange-700">{email}</span>.
            </p>
            <div className="mt-8">
              <Link
                href="/developers"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Browse developers →
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg">
            Have a project in mind? Tell us about it and we&apos;ll match you with the
            right developer within 2 hours.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <section className="lg:col-span-7 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-zinc-900">
                Name *
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none ring-orange-500 transition placeholder:text-zinc-400 focus:ring-2"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold text-zinc-900">
                Email *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none ring-orange-500 transition placeholder:text-zinc-400 focus:ring-2"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="storeUrl" className="text-sm font-semibold text-zinc-900">
                Store URL
              </label>
              <input
                id="storeUrl"
                name="storeUrl"
                type="url"
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none ring-orange-500 transition placeholder:text-zinc-400 focus:ring-2"
                placeholder="https://yourstore.com"
              />
            </div>

            <div>
              <label htmlFor="platform" className="text-sm font-semibold text-zinc-900">
                Platform *
              </label>
              <select
                id="platform"
                name="platform"
                required
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none ring-orange-500 transition focus:ring-2"
              >
                <option value="" disabled>
                  Select your platform
                </option>
                <option>Magento 2 Open Source</option>
                <option>Adobe Commerce</option>
                <option>Adobe Commerce Cloud</option>
                <option>Not sure</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-semibold text-zinc-900">
                Message / Problem Description *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none ring-orange-500 transition placeholder:text-zinc-400 focus:ring-2"
                placeholder="Tell us what you need help with, timelines, and business impact."
              />
            </div>

            <div>
              <label htmlFor="budget" className="text-sm font-semibold text-zinc-900">
                Budget
              </label>
              <select
                id="budget"
                name="budget"
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none ring-orange-500 transition focus:ring-2"
              >
                <option value="">Select a budget range</option>
                <option>Under €500</option>
                <option>€500 – €2,000</option>
                <option>€2,000 – €5,000</option>
                <option>€5,000+</option>
              </select>
            </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {state.submitting ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </section>

          <aside className="lg:col-span-5 rounded-3xl border border-orange-200 bg-orange-50 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-zinc-900">Why MageMatch?</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-700">
              <li>• Magento-only specialists, no generic freelancers.</li>
              <li>• Adobe Commerce certified experts for complex stores.</li>
              <li>• Fast matching based on your exact stack and budget.</li>
            </ul>

            <div className="mt-8 space-y-3 rounded-2xl border border-orange-200 bg-white p-5 text-sm text-zinc-700">
              <p>
                <span className="font-semibold text-zinc-900">Response time:</span>{" "}
                2 hours
              </p>
              <p>
                <a
                  href="mailto:hello@magematch.com"
                  className="font-semibold text-orange-700 hover:text-orange-800"
                >
                  hello@magematch.com
                </a>
              </p>
              <p>
                <Link
                  href="#chat"
                  onClick={openChatMatcher}
                  className="font-semibold text-orange-700 hover:text-orange-800"
                >
                  Or use our AI matcher →
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}