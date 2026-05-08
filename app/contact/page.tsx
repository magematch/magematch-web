"use client";

import { useForm } from "@formspree/react";
import Link from "next/link";
import { useMemo, useState, type ChangeEvent, type FocusEvent, type FormEvent, type MouseEvent } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TrustSection from "../components/TrustSection";
import { supabase } from "../../lib/supabase";

type LeadFormValues = {
  name: string;
  company: string;
  email: string;
  help: string;
  budget: string;
  timeline: string;
};

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

const initialValues: LeadFormValues = {
  name: "",
  company: "",
  email: "",
  help: "",
  budget: "",
  timeline: "",
};

const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "FORMSPREE_ID";

function validateLeadForm(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name should be at least 2 characters.";
  }

  if (!values.company.trim()) {
    errors.company = "Please enter your company name.";
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
  const [state, handleSubmit] = useForm(formId);
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LeadFormValues, boolean>>>({});

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

    const nextErrors = validateLeadForm(values);

    setTouched({
      name: true,
      company: true,
      email: true,
      help: true,
      budget: true,
      timeline: true,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Save to Supabase contacts table
    try {
      const { error: supabaseError } = await supabase
        .from("contacts")
        .insert({
          name: values.name,
          company: values.company,
          email: values.email,
          help: values.help,
          budget: values.budget,
          timeline: values.timeline,
        });

      if (supabaseError) {
        console.error("Failed to save contact to Supabase:", supabaseError);
      }
    } catch (err) {
      console.error("Error saving contact:", err);
    }

    // Submit to Formspree
    await handleSubmit(event);
  };

  const inputClassName =
    "mt-2 w-full rounded-2xl border px-4 py-3.5 text-sm text-zinc-900 outline-none ring-orange-500 transition placeholder:text-zinc-400 focus:ring-2";

  const fieldClassName = (field: keyof LeadFormValues) =>
    `${inputClassName} ${visibleErrors[field] ? "border-red-300 bg-red-50/40" : "border-zinc-300 bg-white"}`;

  if (state.succeeded) {
    return (
      <div className="flex min-h-full flex-1 flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 sm:py-20">
          <div className="rounded-4xl border border-orange-200 bg-[linear-gradient(135deg,#FFF7ED_0%,#FFFFFF_55%,#FEF3C7_100%)] p-8 text-center shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_20px_60px_-32px_rgba(15,23,42,0.45)] sm:p-12">
            <p className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              ✅ Your lead is in — we’re matching experts now
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-700">
              We&apos;ll review your requirements and reach out at{" "}
              <span className="font-semibold text-orange-700">{values.email}</span>{" "}
              with relevant Magento and Adobe Commerce experts.
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
                Hire Magento Experts
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                Tell us what you need. We’ll match you with Magento specialists fast.
              </h1>
              <p className="mt-5 text-base leading-7 text-zinc-600 sm:text-lg">
                Share your project details once and get a curated shortlist of Magento and Adobe Commerce experts aligned to your budget, timeline, and technical needs.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {[
                  { title: "Magento-only matching", text: "No generic freelancers or unrelated agency profiles." },
                  { title: "Qualified shortlists", text: "Developers, architects, Hyvä specialists, and migration experts." },
                  { title: "Fast response", text: "Most merchants hear back with relevant talent within 2 hours." },
                  { title: "Simple intake", text: "One clean lead form that captures budget, timeline, and project fit." },
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
                  If you’re still scoping the project, use the AI matcher for a faster intake and we’ll convert it into an expert brief for you.
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
                    Hire Magento Experts
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 sm:text-base">
                    Submit your lead and we’ll use the current MageMatch Formspree pipeline to capture and route it.
                  </p>
                </div>
                <div className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm text-zinc-700 ring-1 ring-zinc-200">
                  Response target: <span className="font-semibold text-zinc-900">within 2 hours</span>
                </div>
              </div>

              <form onSubmit={handleLeadSubmit} className="mt-6 space-y-5" noValidate>
                <input type="hidden" name="_subject" value="New MageMatch lead form submission" />
                <input type="hidden" name="source" value="hire-magento-experts-contact-page" />

                <div className="grid gap-5 sm:grid-cols-2">
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

                  <div>
                    <label htmlFor="company" className="text-sm font-semibold text-zinc-900">
                      Company *
                    </label>
                    <input
                      id="company"
                      name="company"
                      value={values.company}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      autoComplete="organization"
                      className={fieldClassName("company")}
                      placeholder="Your company name"
                      aria-invalid={Boolean(visibleErrors.company)}
                      aria-describedby={visibleErrors.company ? "company-error" : undefined}
                    />
                    {visibleErrors.company ? (
                      <p id="company-error" className="mt-2 text-sm text-red-600">
                        {visibleErrors.company}
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
                    placeholder="Example: Magento 2 checkout bug fixes, Hyvä implementation, performance optimization, migration, team augmentation, or a full Adobe Commerce rebuild."
                    aria-invalid={Boolean(visibleErrors.help)}
                    aria-describedby={visibleErrors.help ? "help-error" : "help-hint"}
                  />
                  <div className="mt-2 flex items-center justify-between gap-3 text-xs text-zinc-500">
                    <p id="help-hint">Share scope, urgency, and anything important for matching.</p>
                    <span>{values.help.trim().length} characters</span>
                  </div>
                  {visibleErrors.help ? (
                    <p id="help-error" className="mt-2 text-sm text-red-600">
                      {visibleErrors.help}
                    </p>
                  ) : null}
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
                      <option>Under €2,000</option>
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

                {state.errors ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    Something went wrong while sending your lead. Please try again or email hello@magematch.com.
                  </div>
                ) : null}

                <div className="flex flex-col gap-4 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-6 text-zinc-500">
                    By submitting this form, you’re asking MageMatch to route your request to relevant Magento experts.
                  </p>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {state.submitting ? "Sending..." : "Get Matched with Experts"}
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