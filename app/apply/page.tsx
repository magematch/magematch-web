"use client";

import Link from "next/link";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const specialisationOptions = [
  "Magento 2 / Adobe Commerce",
  "Hyvä Theme Development",
  "Headless / GraphQL",
  "Adobe Commerce Cloud",
  "Salesforce Commerce Cloud",
  "Performance Optimization",
  "Migration (M1→M2)",
  "Version Upgrades",
  "ERP/PIM Integrations",
  "Payment Integrations (Adyen etc)",
  "Custom Module Development",
  "DevOps / AWS",
] as const;

type ApplyFormValues = {
  fullName: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  location: string;
  yearsExperience: string;
  hourlyRate: string;
  availability: string;
  specialisations: string[];
  certifications: string;
  about: string;
  topProjects: string;
  whyMagematch: string;
  portfolioUrl: string;
};

type ApplyFormErrors = Partial<Record<keyof ApplyFormValues, string>> & {
  specialisations?: string;
};

const initialValues: ApplyFormValues = {
  fullName: "",
  email: "",
  linkedinUrl: "",
  githubUrl: "",
  location: "",
  yearsExperience: "",
  hourlyRate: "",
  availability: "",
  specialisations: [],
  certifications: "",
  about: "",
  topProjects: "",
  whyMagematch: "",
  portfolioUrl: "",
};

function isValidUrl(value: string) {
  if (!value.trim()) {
    return true;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function validate(values: ApplyFormValues): ApplyFormErrors {
  const errors: ApplyFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.linkedinUrl.trim()) {
    errors.linkedinUrl = "Please add your LinkedIn profile URL.";
  } else if (!isValidUrl(values.linkedinUrl)) {
    errors.linkedinUrl = "Please enter a valid LinkedIn URL.";
  }

  if (values.githubUrl && !isValidUrl(values.githubUrl)) {
    errors.githubUrl = "Please enter a valid GitHub URL.";
  }

  if (!values.location.trim()) {
    errors.location = "Please add your location or country.";
  }

  if (!values.yearsExperience) {
    errors.yearsExperience = "Select your experience range.";
  }

  if (!values.hourlyRate.trim()) {
    errors.hourlyRate = "Add your hourly rate in EUR.";
  }

  if (!values.availability) {
    errors.availability = "Select your availability.";
  }

  if (values.specialisations.length === 0) {
    errors.specialisations = "Select at least one specialisation.";
  }

  if (values.portfolioUrl && !isValidUrl(values.portfolioUrl)) {
    errors.portfolioUrl = "Please enter a valid portfolio URL.";
  }

  if (!values.about.trim()) {
    errors.about = "Write a short bio.";
  } else if (values.about.trim().length > 300) {
    errors.about = "Keep your bio under 300 characters.";
  }

  if (!values.topProjects.trim()) {
    errors.topProjects = "Share 2–3 relevant projects.";
  }

  if (!values.whyMagematch.trim()) {
    errors.whyMagematch = "Tell us why you want to join MageMatch.";
  } else if (values.whyMagematch.trim().length > 200) {
    errors.whyMagematch = "Keep this answer under 200 characters.";
  }

  return errors;
}

export default function ApplyPage() {
  const [values, setValues] = useState<ApplyFormValues>(initialValues);
  const [errors, setErrors] = useState<ApplyFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ApplyFormValues, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Verification step state
  const [verifying, setVerifying] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [codeError, setCodeError] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const visibleErrors = useMemo(() => {
    const nextErrors: ApplyFormErrors = {};

    (Object.keys(errors) as Array<keyof ApplyFormErrors>).forEach((key) => {
      if (key === "specialisations" || touched[key as keyof ApplyFormValues]) {
        nextErrors[key] = errors[key];
      }
    });

    return nextErrors;
  }, [errors, touched]);

  const inputClassName =
    "mt-2 w-full rounded-2xl border px-4 py-3.5 text-sm text-zinc-900 outline-none ring-orange-500 transition placeholder:text-zinc-400 focus:ring-2";

  const fieldClassName = (field: keyof ApplyFormValues) =>
    `${inputClassName} ${visibleErrors[field] ? "border-red-300 bg-red-50/40" : "border-zinc-300 bg-white"}`;

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setValues((current) => ({ ...current, [name]: value }));

    const nextValues = {
      ...values,
      [name]: value,
    } as ApplyFormValues;

    setErrors(validate(nextValues));
  };

  const handleFieldBlur = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name } = event.target;

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));

    setErrors(validate(values));
  };

  const toggleSpecialisation = (item: string) => {
    const nextSpecialisations = values.specialisations.includes(item)
      ? values.specialisations.filter((value) => value !== item)
      : [...values.specialisations, item];

    const nextValues = { ...values, specialisations: nextSpecialisations };
    setValues(nextValues);
    setTouched((current) => ({ ...current, specialisations: true }));
    setErrors(validate(nextValues));
  };

  const startResendCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const sendVerificationCode = async (email: string) => {
    const response = await fetch("/api/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const payload = (await response.json()) as { error?: string };
    if (!response.ok) throw new Error(payload.error || "Failed to send code.");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSubmitError("");

    const nextErrors = validate(values);
    setTouched({
      fullName: true,
      email: true,
      linkedinUrl: true,
      githubUrl: true,
      location: true,
      yearsExperience: true,
      hourlyRate: true,
      availability: true,
      specialisations: true,
      certifications: true,
      about: true,
      topProjects: true,
      whyMagematch: true,
      portfolioUrl: true,
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      await sendVerificationCode(values.email);
      setSubmittedEmail(values.email);
      setVerifying(true);
      startResendCooldown();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setCodeError("");

    if (!/^\d{6}$/.test(codeValue.trim())) {
      setCodeError("Please enter the 6-digit code from your email.");
      return;
    }

    setVerifyLoading(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, verificationCode: codeValue.trim() }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Failed to submit application.");
      }

      setSubmitted(true);
      setValues(initialValues);
      setErrors({});
      setTouched({});
    } catch (error) {
      setCodeError(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setCodeError("");
    try {
      await sendVerificationCode(submittedEmail);
      startResendCooldown();
    } catch (error) {
      setCodeError(error instanceof Error ? error.message : "Could not resend code.");
    }
  };

  if (verifying && !submitted) {
    return (
      <div className="flex min-h-full flex-1 flex-col">
        <Header />
        <main className="mx-auto w-full max-w-md flex-1 px-4 py-16 sm:px-6 sm:py-20">
          <div className="rounded-4xl border border-zinc-200/80 bg-white p-8 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_24px_64px_-32px_rgba(15,23,42,0.45)] sm:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 ring-1 ring-orange-200">
              <span className="text-xl">📧</span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Verify your email
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-zinc-900">{submittedEmail}</span>.
              Enter it below to complete your application.
            </p>

            <div className="mt-6">
              <label htmlFor="codeInput" className="text-sm font-semibold text-zinc-900">
                Verification code
              </label>
              <input
                id="codeInput"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                onKeyDown={(e) => { if (e.key === "Enter") void handleVerify(); }}
                placeholder="123456"
                className={`mt-2 w-full rounded-2xl border px-4 py-3.5 text-center text-2xl font-bold tracking-[0.4em] text-zinc-900 outline-none ring-orange-500 transition placeholder:text-zinc-300 placeholder:tracking-normal focus:ring-2 ${
                  codeError ? "border-red-300 bg-red-50/40" : "border-zinc-300 bg-white"
                }`}
              />
              {codeError ? (
                <p className="mt-2 text-sm text-red-600">{codeError}</p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => void handleVerify()}
              disabled={verifyLoading || codeValue.length !== 6}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {verifyLoading ? "Verifying…" : "Confirm & Submit Application →"}
            </button>

            <div className="mt-4 text-center text-sm text-zinc-500">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={() => void handleResend()}
                disabled={resendCooldown > 0}
                className="font-medium text-orange-600 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => { setVerifying(false); setCodeValue(""); setCodeError(""); }}
              className="mt-3 w-full text-center text-sm text-zinc-400 hover:text-zinc-600"
            >
              ← Back to form
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex min-h-full flex-1 flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 sm:py-20">
          <div className="rounded-4xl border border-orange-200 bg-[linear-gradient(135deg,#FFF7ED_0%,#FFFFFF_55%,#FEF3C7_100%)] p-8 text-center shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_20px_60px_-32px_rgba(15,23,42,0.45)] sm:p-12">
            <p className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              ✅ Application submitted!
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-700">
              We&apos;ll review it within 48 hours and contact you at <span className="font-semibold text-orange-700">{submittedEmail}</span>.
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
        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-12 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-700 ring-1 ring-orange-200">
                For Developers & Agencies
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-4xl">
                Join MageMatch as a Verified Developer
              </h1>
              <p className="mt-5 text-base leading-7 text-zinc-600 sm:text-lg">
                Apply to be listed on the only dedicated marketplace for Adobe Commerce and Magento developers.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {[
                  { title: "Free listing", text: "No monthly fees." },
                  { title: "Qualified leads", text: "Get matched with pre-qualified merchants." },
                  { title: "Set your rates", text: "Choose your own pricing and packages." },
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
            </div>

            <section className="lg:col-span-7 rounded-4xl border border-zinc-200/80 bg-white p-6 shadow-[0_1px_0_0_rgba(15,23,42,0.03),0_24px_64px_-32px_rgba(15,23,42,0.45)] sm:p-8 lg:p-10">
              <div className="border-b border-zinc-200 pb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                  Developer Application
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600 sm:text-base">
                  Share your experience, focus areas, and links so we can review your profile.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-8" noValidate>
                <section className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Section 1 — Personal Info</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="text-sm font-semibold text-zinc-900">Full Name *</label>
                      <input id="fullName" name="fullName" value={values.fullName} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("fullName")} placeholder="Your full name" />
                      {visibleErrors.fullName ? <p className="mt-2 text-sm text-red-600">{visibleErrors.fullName}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-semibold text-zinc-900">Email *</label>
                      <input id="email" name="email" type="email" value={values.email} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("email")} placeholder="you@example.com" />
                      {visibleErrors.email ? <p className="mt-2 text-sm text-red-600">{visibleErrors.email}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="linkedinUrl" className="text-sm font-semibold text-zinc-900">LinkedIn Profile URL *</label>
                      <input id="linkedinUrl" name="linkedinUrl" value={values.linkedinUrl} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("linkedinUrl")} placeholder="https://linkedin.com/in/your-name" />
                      {visibleErrors.linkedinUrl ? <p className="mt-2 text-sm text-red-600">{visibleErrors.linkedinUrl}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="githubUrl" className="text-sm font-semibold text-zinc-900">GitHub Profile URL</label>
                      <input id="githubUrl" name="githubUrl" value={values.githubUrl} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("githubUrl")} placeholder="https://github.com/your-handle" />
                      {visibleErrors.githubUrl ? <p className="mt-2 text-sm text-red-600">{visibleErrors.githubUrl}</p> : null}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="location" className="text-sm font-semibold text-zinc-900">Location / Country *</label>
                      <input id="location" name="location" value={values.location} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("location")} placeholder="City, country" />
                      {visibleErrors.location ? <p className="mt-2 text-sm text-red-600">{visibleErrors.location}</p> : null}
                    </div>
                  </div>
                </section>

                <section className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Section 2 — Experience</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="yearsExperience" className="text-sm font-semibold text-zinc-900">Years of Magento / Adobe Commerce experience *</label>
                      <select id="yearsExperience" name="yearsExperience" value={values.yearsExperience} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("yearsExperience")}>
                        <option value="">Select experience</option>
                        <option value="1">1-2</option>
                        <option value="3">3-5</option>
                        <option value="5">5-8</option>
                        <option value="8">8-12</option>
                        <option value="12">12+</option>
                      </select>
                      {visibleErrors.yearsExperience ? <p className="mt-2 text-sm text-red-600">{visibleErrors.yearsExperience}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="hourlyRate" className="text-sm font-semibold text-zinc-900">Hourly rate in EUR *</label>
                      <input id="hourlyRate" name="hourlyRate" type="number" min="1" value={values.hourlyRate} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("hourlyRate")} placeholder="80" />
                      {visibleErrors.hourlyRate ? <p className="mt-2 text-sm text-red-600">{visibleErrors.hourlyRate}</p> : null}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="availability" className="text-sm font-semibold text-zinc-900">Availability *</label>
                      <select id="availability" name="availability" value={values.availability} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("availability")}>
                        <option value="">Select availability</option>
                        <option>Immediate — full time</option>
                        <option>Available — part time</option>
                        <option>Available — weekends only</option>
                        <option>Currently busy — 2-4 weeks</option>
                      </select>
                      {visibleErrors.availability ? <p className="mt-2 text-sm text-red-600">{visibleErrors.availability}</p> : null}
                    </div>
                  </div>
                </section>

                <section className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Section 3 — Specialisations</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {specialisationOptions.map((item) => {
                      const checked = values.specialisations.includes(item);

                      return (
                        <label
                          key={item}
                          className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm transition ${checked ? "border-orange-300 bg-orange-50" : "border-zinc-200 bg-white hover:border-orange-200"}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleSpecialisation(item)}
                            className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-zinc-700">{item}</span>
                        </label>
                      );
                    })}
                  </div>
                  {visibleErrors.specialisations ? <p className="text-sm text-red-600">{visibleErrors.specialisations}</p> : null}
                </section>

                <section className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Section 4 — Credentials</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="certifications" className="text-sm font-semibold text-zinc-900">Adobe / Magento Certifications</label>
                      <textarea id="certifications" name="certifications" rows={4} value={values.certifications} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("certifications")} placeholder="List your certifications here" />
                    </div>
                    <div>
                      <label htmlFor="portfolioUrl" className="text-sm font-semibold text-zinc-900">Portfolio URL or website</label>
                      <input id="portfolioUrl" name="portfolioUrl" value={values.portfolioUrl} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("portfolioUrl")} placeholder="https://yourstudio.com" />
                      {visibleErrors.portfolioUrl ? <p className="mt-2 text-sm text-red-600">{visibleErrors.portfolioUrl}</p> : null}
                    </div>
                  </div>
                </section>

                <section className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Section 5 — About You</p>
                  </div>
                  <div>
                    <label htmlFor="about" className="text-sm font-semibold text-zinc-900">Brief bio *</label>
                    <textarea id="about" name="about" rows={4} maxLength={300} value={values.about} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("about")} placeholder="Describe your expertise and what makes you stand out..." />
                    <div className="mt-2 flex items-center justify-between gap-3 text-xs text-zinc-500">
                      <span>Keep it concise and specific.</span>
                      <span>{values.about.length}/300</span>
                    </div>
                    {visibleErrors.about ? <p className="mt-2 text-sm text-red-600">{visibleErrors.about}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="topProjects" className="text-sm font-semibold text-zinc-900">Top 2–3 projects you&apos;ve worked on *</label>
                    <textarea id="topProjects" name="topProjects" rows={5} value={values.topProjects} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("topProjects")} placeholder="Client name, what you built, tech stack used..." />
                    {visibleErrors.topProjects ? <p className="mt-2 text-sm text-red-600">{visibleErrors.topProjects}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="whyMagematch" className="text-sm font-semibold text-zinc-900">Why do you want to join MageMatch? *</label>
                    <textarea id="whyMagematch" name="whyMagematch" rows={4} maxLength={200} value={values.whyMagematch} onChange={handleFieldChange} onBlur={handleFieldBlur} className={fieldClassName("whyMagematch")} placeholder="Why MageMatch is a good fit for your services..." />
                    <div className="mt-2 flex items-center justify-between gap-3 text-xs text-zinc-500">
                      <span>Short answers are best.</span>
                      <span>{values.whyMagematch.length}/200</span>
                    </div>
                    {visibleErrors.whyMagematch ? <p className="mt-2 text-sm text-red-600">{visibleErrors.whyMagematch}</p> : null}
                  </div>
                </section>

                {submitError ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </div>
                ) : null}

                <div className="border-t border-zinc-200 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Submitting..." : "Submit Application →"}
                  </button>
                  <p className="mt-4 text-center text-sm leading-6 text-zinc-500">
                    Applications are reviewed within 48 hours. You&apos;ll hear from us at <a href="mailto:hello@magematch.com" className="font-medium text-orange-700 hover:text-orange-800">hello@magematch.com</a>
                  </p>
                </div>
              </form>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}