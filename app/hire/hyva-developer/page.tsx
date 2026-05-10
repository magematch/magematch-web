import type { Metadata } from "next";
import HireLandingPage, { type HireLandingConfig } from "../../components/HireLandingPage";

export const metadata: Metadata = {
  title: "Hire Hyvä Developer | Hyvä Theme Experts for Magento 2 | MageMatch",
  description:
    "Find experienced Hyvä developers for Magento 2 theme builds, migrations from Luma, and Core Web Vitals optimisation. Hyvä-certified specialists available within 2 hours.",
  keywords: [
    "hire hyva developer",
    "hyva theme developer",
    "hyva magento developer",
    "hyva theme expert",
    "magento 2 frontend developer",
    "luma to hyva migration",
    "hyva react tailwind magento",
  ],
  authors: [{ name: "MageMatch", url: "https://magematch.com" }],
  category: "Hyvä Theme Development",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://magematch.com/hire/hyva-developer" },
  openGraph: {
    title: "Hire Hyvä Developer | MageMatch",
    description:
      "Hire Hyvä-certified Magento 2 frontend developers for new theme builds, Luma migrations, and fast Core Web Vitals scores.",
    url: "https://magematch.com/hire/hyva-developer",
    siteName: "MageMatch",
    type: "website",
    images: [{ url: "https://magematch.com/opengraph-image", width: 1200, height: 630, alt: "Hire Hyvä Developer | MageMatch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Hyvä Developer | MageMatch",
    description:
      "Hire Hyvä-certified Magento 2 frontend developers for new theme builds, Luma migrations, and fast Core Web Vitals scores.",
    images: ["https://magematch.com/opengraph-image"],
    creator: "@magematch",
  },
};

const config: HireLandingConfig = {
  badge: "Hire Hyvä Developer",
  canonical: "/hire/hyva-developer",
  headline: "Hire a Hyvä Developer Who Builds Fast, Modern Magento Storefronts",
  intro:
    "Hyvä replaces the slow Luma frontend with Tailwind CSS and Alpine.js, delivering dramatically better Core Web Vitals and UX. MageMatch connects you with Hyvä-certified developers who have shipped production themes from scratch and migrated complex Luma customisations.",
  ctaLabel: "Find a Hyvä Developer",
  benefits: [
    {
      icon: "🚀",
      title: "Core Web Vitals Improvement",
      description:
        "Hyvä developers target Google's LCP, CLS, and FID thresholds by removing Magento's legacy JavaScript weight and shipping lean, progressive frontends.",
    },
    {
      icon: "🎨",
      title: "Tailwind CSS + Alpine.js Experts",
      description:
        "Find developers who work natively in Tailwind and Alpine — the technologies Hyvä is built on — for faster iteration and maintainable component code.",
    },
    {
      icon: "🔄",
      title: "Luma to Hyvä Migration",
      description:
        "Many merchants have custom Luma widgets, blocks, and third-party extensions. Hire a Hyvä specialist experienced in porting these without losing functionality.",
    },
    {
      icon: "🧩",
      title: "Extension Compatibility",
      description:
        "Not every Magento extension ships with a Hyvä compatibility module. Hire developers who know how to build or source compatibility layers for your stack.",
    },
    {
      icon: "📐",
      title: "Custom Theme Builds",
      description:
        "Commission a Hyvä theme from a blank canvas — built to your brand, your UX requirements, and your performance targets.",
    },
    {
      icon: "🛒",
      title: "Checkout Optimisation",
      description:
        "Pair your Hyvä store with a high-converting checkout using Hyvä Checkout or a custom solution — specialists available for both.",
    },
  ],
  faqs: [
    {
      question: "What is Hyvä and why does it matter?",
      answer:
        "Hyvä is a modern Magento 2 frontend theme built with Tailwind CSS and Alpine.js. It replaces the performance-heavy Luma stack and typically achieves significantly better Google Core Web Vitals scores, leading to improved SEO and conversion rates.",
    },
    {
      question: "Do I need a specialist Hyvä developer or will any Magento developer do?",
      answer:
        "You should hire a dedicated Hyvä developer. Hyvä uses a fundamentally different frontend architecture from Luma — developers need hands-on experience with its component model, Tailwind configuration, and Alpine.js patterns.",
    },
    {
      question: "Can I migrate my existing Luma theme to Hyvä?",
      answer:
        "Yes, but it is a rebuild rather than a direct conversion. Hyvä developers will audit your current customisations and recreate them in the Hyvä stack, often resulting in a cleaner and more maintainable codebase.",
    },
    {
      question: "How long does a Hyvä theme build typically take?",
      answer:
        "A standard Hyvä implementation with modest custom design can take 4–10 weeks. Complex builds with advanced checkout flows, B2B features, or many third-party integrations may take longer. A scoping call with a Hyvä developer will produce a more accurate estimate.",
    },
    {
      question: "Are Hyvä developers available for ongoing support?",
      answer:
        "Yes. Once your Hyvä theme is live you may need updates, new components, or compatibility work as Magento and your extension stack evolve. MageMatch can match you with developers for ongoing retainers.",
    },
    {
      question: "Does MageMatch have certified Hyvä developers?",
      answer:
        "Yes. The MageMatch talent pool includes Hyvä-certified developers who have completed the official Hyvä training programme and shipped production themes.",
    },
  ],
};

export default function HireHyvaDeveloperPage() {
  return <HireLandingPage config={config} />;
}
