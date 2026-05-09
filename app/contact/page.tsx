"use client";

import Link from "next/link";
import { useMemo, useState, type ChangeEvent, type FocusEvent, type FormEvent, type MouseEvent } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TrustSection from "../components/TrustSection";

type LeadFormValues = {
  name: string;
  email: string;
  storeUrl?: string;
  platform: string;
  help: string;
  screenshot?: File | null;
  budget: string;
  timeline: string;
};

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

const initialValues: LeadFormValues = {
  name: "",
  email: "",
  storeUrl: "",
  platform: "",
  help: "",
  screenshot: null,
  budget: "",
  timeline: "",
};

function validateLeadForm(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name should be at least 2 characters.";
  }

  if (!values.platform) {
    errors.platform = "Please select your platform.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your work email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.help.trim()) {
    errors.help = "Tell us what you need help with.";
  } else if (values.help.trim().length < 20) {
    errors.help = "Add a little more detail so we can match the right expert.";
  }

  if (!values.budget) {
    errors.budget = "Select your budget range.";
  }

  if (!values.timeline) {
    errors.timeline = "Select your timeline.";
  }

  return errors;
}

export default function ContactPage() {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LeadFormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const openChatMatcher = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.dispatchEvent(new Event("openChat"));
  };

  const visibleErrors = useMemo(() => {
    const nextErrors: LeadFormErrors = {};

    (Object.keys(errors) as Array<keyof LeadFormValues>).forEach((key) => {
      if (touched[key]) {
        nextErrors[key] = errors[key];
      }
    });

    return nextErrors;
  }, [errors, touched]);

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    const nextValues = {
      ...values,
      [name]: value,
    } as LeadFormValues;

    setErrors(validateLeadForm(nextValues));
  };

  const handleFieldBlur = (
    event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name } = event.target;

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));

    setErrors(validateLeadForm(values));
  };

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const nextErrors = validateLeadForm(values);

    setTouched({
      name: true,
      email: true,
      storeUrl: true,
      platform: true,
      help: true,
      budget: true,
      timeline: true,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setLoading(false);
      return;
    }

    // Submit to API route (saves to Supabase + sends emails)
    try {
      const notes = [
        `Timeline: ${values.timeline}`,
        values.screenshot ? `Screenshot: ${values.screenshot.name}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          store_url: values.storeUrl || "",
          platform: values.platform,
          message: values.help,
          budget: values.budget,
          notes,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Failed to submit form.");
      }

      setSubmittedEmail(values.email);
      setSubmitted(true);
      setValues(initialValues);
      setErrors({});
      setTouched({});
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "mt-2 w-full rounded-2xl border px-4 py-3.5 text-sm text-zinc-900 outline-none ring-orange-500 transition placeholder:text-zinc-400 focus:ring-2";

  const fieldClassName = (field: keyof LeadFormValues) =>
    `${inputClassName} ${visibleErrors[field] ? "border-red-300 bg-red-50/40" : "border-zinc-300 bg-white"}`;

  if (submitted) {
    return (
      <div className="flex min-h-full flex-1 flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 sm:py-20">
          <div className="rounded-4xl border border-orange-200 bg-[linear-gradient(135deg,#FFF7ED_0%,#FFFFFF_55%,#FEF3C7_100%)] p-8 text-center shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_20px_60px_-32px_rgba(15,23,42,0.45)] sm:p-12">
            <p className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              ✅ Thanks — your brief was sent
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-700">
              We&apos;ll review your request and follow up at{" "}
              <span className="font-semibold text-orange-700">{submittedEmail}</span>.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/developers"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Browse developers →
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-orange-200 hover:text-orange-700"
              >
                Back to homepage
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
      <main className="flex-1 bg-linear-to-b from-zinc-50 via-white to-orange-50/30">
        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-700 ring-1 ring-orange-200">
                Magento Hiring
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                Tell us what you need.
              </h1>
              <p className="mt-5 text-base leading-7 text-zinc-600 sm:text-lg">
                Share your goals once. We’ll match you with relevant Magento talent.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {[
                  { title: "Magento-focused", text: "No generic freelancer marketplaces." },
                  { title: "Relevant experts", text: "Developers, architects, Hyvä, and migration specialists." },
                  { title: "Fast response", text: "Most merchants hear back within 2 hours." },
                  { title: "Simple brief", text: "One form with the details we need to match accurately." },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm shadow-zinc-900/5 backdrop-blur"
                  >
                    <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-orange-200 bg-orange-50 p-6">
                <p className="text-sm font-semibold text-zinc-900">Need help right now?</p>
                <p className="mt-2 text-sm leading-6 text-zinc-700">
                  Not ready to fill the full brief? Start with the AI matcher.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <Link
                    href="#chat"
                    onClick={openChatMatcher}
                    className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Open AI matcher
                  </Link>
                  <a
                    href="mailto:hello@magematch.com"
                    className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
                  >
                    Email MageMatch
                  </a>
                </div>
              </div>
            </div>

            <section className="lg:col-span-7 rounded-4xl border border-zinc-200/80 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_24px_64px_-32px_rgba(15,23,42,0.45)] sm:p-8 lg:p-10">
              <div className="flex flex-col gap-3 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                    Project Brief
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 sm:text-base">
                    Share key details so we can match the right expert.
                  </p>
                </div>
                <div className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm text-zinc-700 ring-1 ring-zinc-200">
                  Response target: <span className="font-semibold text-zinc-900">within 2 hours</span>
                </div>
              </div>

              <form onSubmit={handleLeadSubmit} className="mt-6 space-y-5" noValidate>

                <div>
                  <label htmlFor="name" className="text-sm font-semibold text-zinc-900">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    autoComplete="name"
                    className={fieldClassName("name")}
                    placeholder="Your full name"
                    aria-invalid={Boolean(visibleErrors.name)}
                    aria-describedby={visibleErrors.name ? "name-error" : undefined}
                  />
                  {visibleErrors.name ? (
                    <p id="name-error" className="mt-2 text-sm text-red-600">
                      {visibleErrors.name}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="storeUrl" className="text-sm font-semibold text-zinc-900">
                      Store URL
                    </label>
                    <input
                      id="storeUrl"
                      name="storeUrl"
                      type="url"
                      value={values.storeUrl}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      autoComplete="url"
                      className={fieldClassName("storeUrl")}
                      placeholder="https://yourstore.com"
                      aria-invalid={Boolean(visibleErrors.storeUrl)}
                      aria-describedby={visibleErrors.storeUrl ? "storeUrl-error" : undefined}
                    />
                    {visibleErrors.storeUrl ? (
                      <p id="storeUrl-error" className="mt-2 text-sm text-red-600">
                        {visibleErrors.storeUrl}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="platform" className="text-sm font-semibold text-zinc-900">
                      Platform *
                    </label>
                    <select
                      id="platform"
                      name="platform"
                      value={values.platform}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      className={fieldClassName("platform")}
                      aria-invalid={Boolean(visibleErrors.platform)}
                      aria-describedby={visibleErrors.platform ? "platform-error" : undefined}
                    >
                      <option value="">Select your platform</option>
                      <option>Magento 1</option>
                      <option>Magento 2</option>
                      <option>Adobe Commerce</option>
                    </select>
                    {visibleErrors.platform ? (
                      <p id="platform-error" className="mt-2 text-sm text-red-600">
                        {visibleErrors.platform}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-semibold text-zinc-900">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    autoComplete="email"
                    className={fieldClassName("email")}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(visibleErrors.email)}
                    aria-describedby={visibleErrors.email ? "email-error" : undefined}
                  />
                  {visibleErrors.email ? (
                    <p id="email-error" className="mt-2 text-sm text-red-600">
                      {visibleErrors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="help" className="text-sm font-semibold text-zinc-900">
                    What help do you need? *
                  </label>
                  <textarea
                    id="help"
                    name="help"
                    rows={5}
                    value={values.help}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    className={fieldClassName("help")}
                    placeholder="Briefly describe your goal, blockers, and urgency."
                    aria-invalid={Boolean(visibleErrors.help)}
                    aria-describedby={visibleErrors.help ? "help-error" : "help-hint"}
                  />
                  <div className="mt-2 flex items-center justify-between gap-3 text-xs text-zinc-500">
                    <p id="help-hint">Include scope, urgency, and success criteria.</p>
                    <span>{values.help.trim().length} characters</span>
                  </div>
                  {visibleErrors.help ? (
                    <p id="help-error" className="mt-2 text-sm text-red-600">
                      {visibleErrors.help}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="screenshot" className="text-sm font-semibold text-zinc-900">
                    Upload error screenshot (optional)
                  </label>
                  <input
                    id="screenshot"
                    name="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setValues((current) => ({
                        ...current,
                        screenshot: file,
                      }));
                    }}
                    className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3.5 text-sm text-zinc-900 outline-none ring-orange-500 transition placeholder:text-zinc-400 focus:ring-2"
                  />
                  <p className="mt-2 text-xs text-zinc-500">Max 5MB. PNG, JPG, or GIF.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="budget" className="text-sm font-semibold text-zinc-900">
                      Budget *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={values.budget}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      className={fieldClassName("budget")}
                      aria-invalid={Boolean(visibleErrors.budget)}
                      aria-describedby={visibleErrors.budget ? "budget-error" : undefined}
                    >
                      <option value="">Select your budget range</option>
                      <option>€200 – €1,000</option>
                      <option>€1,000 – €2,000</option>
                      <option>€2,000 – €5,000</option>
                      <option>€5,000 – €15,000</option>
                      <option>€15,000+</option>
                      <option>Not sure yet</option>
                    </select>
                    {visibleErrors.budget ? (
                      <p id="budget-error" className="mt-2 text-sm text-red-600">
                        {visibleErrors.budget}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="timeline" className="text-sm font-semibold text-zinc-900">
                      Timeline *
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={values.timeline}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      className={fieldClassName("timeline")}
                      aria-invalid={Boolean(visibleErrors.timeline)}
                      aria-describedby={visibleErrors.timeline ? "timeline-error" : undefined}
                    >
                      <option value="">Select your timeline</option>
                      <option>ASAP / urgent</option>
                      <option>Within 1 week</option>
                      <option>This month</option>
                      <option>Next 1–2 months</option>
                      <option>Just planning</option>
                    </select>
                    {visibleErrors.timeline ? (
                      <p id="timeline-error" className="mt-2 text-sm text-red-600">
                        {visibleErrors.timeline}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-6 text-zinc-500">
                    We use this brief to shortlist relevant Magento experts.
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition cursor-pointer hover:bg-orange-600 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {loading ? "Sending..." : "Submit Brief"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </section>

        <TrustSection compact />
      </main>
      <Footer />
    </div>
  );
}