import type { Metadata } from "next";
import HireLandingPage, { type HireLandingConfig } from "../../components/HireLandingPage";

export const metadata: Metadata = {
  title: "Hire Magento Developer | Find Certified Magento 2 Experts | MageMatch",
  description:
    "Hire vetted Magento 2 and Adobe Commerce developers on MageMatch. Find certified PHP engineers with real ecommerce delivery experience — matched to your budget and timeline within 2 hours.",
  keywords: [
    "hire magento developer",
    "magento 2 developer",
    "magento developer europe",
    "certified magento developer",
    "magento php developer",
    "adobe commerce developer for hire",
  ],
  authors: [{ name: "MageMatch", url: "https://magematch.com" }],
  category: "Magento Development",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://magematch.com/hire/magento-developer" },
  openGraph: {
    title: "Hire Magento Developer | MageMatch",
    description:
      "Find certified Magento 2 developers matched to your project within 2 hours. Magento-only marketplace.",
    url: "https://magematch.com/hire/magento-developer",
    siteName: "MageMatch",
    type: "website",
    images: [{ url: "https://magematch.com/opengraph-image", width: 1200, height: 630, alt: "Hire Magento Developer | MageMatch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Magento Developer | MageMatch",
    description:
      "Find certified Magento 2 developers matched to your project within 2 hours. Magento-only marketplace.",
    images: ["https://magematch.com/opengraph-image"],
    creator: "@magematch",
  },
};

const config: HireLandingConfig = {
  badge: "Hire Magento Developer",
  canonical: "/hire/magento-developer",
  headline: "Hire a Magento Developer Who Knows the Platform Inside Out",
  intro:
    "Stop sifting through generic freelancers. MageMatch connects you with certified Magento 2 and Adobe Commerce PHP developers who have shipped real stores, fixed hard bugs, and delivered on time.",
  benefits: [
    {
      icon: "🏆",
      title: "Adobe Commerce Certified",
      description:
        "Every developer on MageMatch holds verified Magento or Adobe Commerce certifications — not just self-reported skill tags.",
    },
    {
      icon: "⚡",
      title: "Matched in Under 2 Hours",
      description:
        "Submit your project brief once and receive a curated shortlist of relevant developers aligned to your stack, budget, and urgency.",
    },
    {
      icon: "🎯",
      title: "Magento-Only Talent Pool",
      description:
        "No WordPress developers moonlighting as Magento experts. Every specialist here lives and breathes Adobe Commerce.",
    },
    {
      icon: "🔍",
      title: "Screened for Real Delivery",
      description:
        "Profiles include experience with Hyvä, GraphQL, headless, performance, integrations, and complex multi-store setups.",
    },
    {
      icon: "💬",
      title: "Fixed Prices or Hourly",
      description:
        "Choose productised packages for predictable jobs like bug fixes and audits, or hourly engagements for longer projects.",
    },
    {
      icon: "🌍",
      title: "EU-Friendly Timezones",
      description:
        "Work with developers in European or near-EU timezones for fast daily standups and responsive communication.",
    },
  ],
  faqs: [
    {
      question: "How quickly can I hire a Magento developer on MageMatch?",
      answer:
        "Most merchants receive a relevant shortlist within 2 hours of submitting a brief. For urgent requests, same-day matching is common.",
    },
    {
      question: "Are the Magento developers on MageMatch Adobe certified?",
      answer:
        "Yes. Profiles highlight Adobe Commerce certifications, years of experience, and specific platform expertise — so you can verify credentials before reaching out.",
    },
    {
      question: "What types of Magento projects can I hire for?",
      answer:
        "Bug fixes, feature development, performance optimisation, theme builds (including Hyvä), migrations, upgrades, custom modules, third-party integrations, and ongoing support retainers.",
    },
    {
      question: "Do developers on MageMatch work on Magento Open Source as well as Adobe Commerce?",
      answer:
        "Yes. The talent pool covers both Magento 2 Open Source and Adobe Commerce (on-prem and cloud), so you can hire for whichever edition your store runs.",
    },
    {
      question: "How does pricing work?",
      answer:
        "Developers set hourly rates or offer fixed-price packages for common jobs. You'll see rate ranges on each profile before committing to any conversation.",
    },
    {
      question: "Is MageMatch only for large businesses?",
      answer:
        "Not at all. MageMatch serves merchants of all sizes — from single-store SMBs needing a one-off bug fix to enterprise teams managing multi-site Adobe Commerce builds.",
    },
  ],
};

export default function HireMagentoDeveloperPage() {
  return <HireLandingPage config={config} />;
}
