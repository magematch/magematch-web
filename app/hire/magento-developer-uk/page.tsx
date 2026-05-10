import type { Metadata } from "next";
import HireLandingPage, { type HireLandingConfig } from "../../components/HireLandingPage";

export const metadata: Metadata = {
  title: "Hire Magento Developers in the UK | Adobe Commerce Experts | MageMatch",
  description:
    "Hire vetted Magento and Adobe Commerce developers in the UK. Compare certified specialists for checkout, performance, integrations, and upgrades.",
  keywords: [
    "hire magento developer uk",
    "magento developer uk",
    "adobe commerce developer uk",
    "hire adobe commerce developer london",
    "magento specialist united kingdom",
  ],
  alternates: { canonical: "/hire/magento-developer-uk" },
  openGraph: {
    title: "Hire Magento Developers in the UK | MageMatch",
    description:
      "Find vetted Magento and Adobe Commerce developers in the UK for delivery-critical ecommerce projects.",
    url: "/hire/magento-developer-uk",
    siteName: "MageMatch",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Magento Developers in the UK | MageMatch",
    description:
      "Find vetted Magento and Adobe Commerce developers in the UK for delivery-critical ecommerce projects.",
    images: ["/favicon.svg"],
  },
};

const config: HireLandingConfig = {
  badge: "Hire Magento Developers in the UK",
  canonical: "/hire/magento-developer-uk",
  headline: "Hire Magento Developers in the UK With Proven Delivery Experience",
  intro:
    "MageMatch helps ecommerce teams hire Magento and Adobe Commerce developers in the UK faster, with stronger role fit and less sourcing noise.",
  benefits: [
    {
      icon: "🇬🇧",
      title: "UK Market Understanding",
      description:
        "Work with developers familiar with UK ecommerce patterns, payment stacks, and operational expectations.",
    },
    {
      icon: "🏅",
      title: "Certified Adobe Commerce Talent",
      description:
        "Profiles include certifications and relevant Magento delivery history so you can verify capability before outreach.",
    },
    {
      icon: "⚡",
      title: "Faster Hiring Cycle",
      description:
        "Brief-based matching helps teams avoid generic marketplaces and reach relevant Magento specialists sooner.",
    },
    {
      icon: "🧩",
      title: "Specialist Scope Coverage",
      description:
        "Hire for checkout debugging, Hyvä, migrations, performance optimization, and enterprise Adobe Commerce implementation.",
    },
    {
      icon: "💷",
      title: "Transparent Pricing Models",
      description:
        "Compare hourly and fixed-scope approaches to align delivery style with your budget and roadmap constraints.",
    },
    {
      icon: "🔒",
      title: "Vetted Marketplace Signal",
      description:
        "MageMatch focuses on Magento-only talent to reduce screening time and improve hiring confidence.",
    },
  ],
  faqs: [
    {
      question: "How quickly can I hire a Magento developer in the UK?",
      answer:
        "Most teams receive relevant Magento matches quickly after submitting a clear brief with scope, urgency, and budget details.",
    },
    {
      question: "Can I hire for Adobe Commerce enterprise projects in the UK?",
      answer:
        "Yes. You can match with specialists experienced in enterprise Adobe Commerce scopes, including integrations and platform upgrades.",
    },
    {
      question: "Do UK Magento developers on MageMatch support Hyvä and headless projects?",
      answer:
        "Yes. Many profiles include Hyvä and headless delivery experience, along with broader Magento architecture and performance work.",
    },
    {
      question: "What engagement models are available?",
      answer:
        "You can start with short advisory work, sprint-based implementation, or longer retained support based on your roadmap.",
    },
    {
      question: "How do I reduce hiring risk?",
      answer:
        "Use a structured brief, evaluate certification and project evidence, and begin with a defined milestone or trial sprint.",
    },
  ],
};

export default function HireMagentoDeveloperUkPage() {
  return <HireLandingPage config={config} />;
}
