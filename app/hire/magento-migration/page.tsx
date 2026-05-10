import type { Metadata } from "next";
import HireLandingPage, { type HireLandingConfig } from "../../components/HireLandingPage";

export const metadata: Metadata = {
  title: "Magento Migration Experts | Replatform to Magento 2 | MageMatch",
  description:
    "Hire experienced Magento migration specialists for Magento 1 to Magento 2 upgrades, platform replatforming, and Adobe Commerce moves. Safe data migration and zero-downtime launches.",
  keywords: [
    "magento migration expert",
    "magento 1 to magento 2 migration",
    "magento upgrade specialist",
    "replatform to adobe commerce",
    "shopware to magento migration",
    "magento data migration service",
    "magento eol migration",
  ],
  authors: [{ name: "MageMatch", url: "https://magematch.com" }],
  category: "Magento Migration",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://magematch.com/hire/magento-migration" },
  openGraph: {
    title: "Magento Migration Experts | MageMatch",
    description:
      "Find experienced Magento migration specialists for M1→M2 upgrades, replatforming, and data migration — matched within 2 hours.",
    url: "https://magematch.com/hire/magento-migration",
    siteName: "MageMatch",
    type: "website",
    images: [{ url: "https://magematch.com/opengraph-image", width: 1200, height: 630, alt: "Magento Migration Experts | MageMatch" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magento Migration Experts | MageMatch",
    description:
      "Find experienced Magento migration specialists for M1→M2 upgrades, replatforming, and data migration — matched within 2 hours.",
    images: ["https://magematch.com/opengraph-image"],
    creator: "@magematch",
  },
};

const config: HireLandingConfig = {
  badge: "Magento Migration Experts",
  canonical: "/hire/magento-migration",
  headline: "Hire Magento Migration Specialists Who Have Done This Before",
  intro:
    "A platform migration is one of the highest-risk projects in ecommerce. MageMatch connects you with specialists who have delivered successful Magento 1 to Magento 2 upgrades, third-platform replatforms, and Adobe Commerce cloud migrations — safely and on schedule.",
  ctaLabel: "Find a Migration Specialist",
  benefits: [
    {
      icon: "🔁",
      title: "Magento 1 → Magento 2 Upgrades",
      description:
        "With Magento 1 past end-of-life, specialists here handle catalogue, customer, order, and CMS data migration with full audit trails.",
    },
    {
      icon: "🗄️",
      title: "Safe Data Migration",
      description:
        "Products, categories, customers, orders, reviews, and CMS — mapped, validated, and migrated with rollback plans and delta sync during launch.",
    },
    {
      icon: "🔌",
      title: "Extension Audit and Replacement",
      description:
        "Migrating from M1 means your extension stack changes. Hire specialists who can audit current modules and source or build Magento 2 equivalents.",
    },
    {
      icon: "🏎️",
      title: "Zero-Downtime Launch Planning",
      description:
        "Experienced migration teams use DNS cutover strategies, read-only source states, and smoke-test checklists to minimise downtime at launch.",
    },
    {
      icon: "🔀",
      title: "Third-Platform Replatforming",
      description:
        "Moving from Shopify, WooCommerce, Shopware, or another platform to Magento 2 or Adobe Commerce — specialists with cross-platform migration experience.",
    },
    {
      icon: "📅",
      title: "Phased Migration Delivery",
      description:
        "Large catalogues and complex customisations benefit from a phased approach. Hire project managers and developers who structure migrations to reduce risk.",
    },
  ],
  faqs: [
    {
      question: "How long does a Magento 1 to Magento 2 migration take?",
      answer:
        "A mid-complexity migration typically takes 3–6 months. Timelines depend on catalogue size, number of custom extensions, third-party integrations, and design requirements. A scoping engagement will produce a more reliable estimate.",
    },
    {
      question: "Is Magento 1 still safe to run?",
      answer:
        "Magento 1 reached end-of-life in June 2020 and no longer receives official security patches. Running an M1 store in 2026 carries significant security and PCI compliance risks. Migration is strongly recommended.",
    },
    {
      question: "What data can be migrated from Magento 1 to Magento 2?",
      answer:
        "Products, categories, customers, orders, reviews, CMS pages and blocks, URL rewrites, and configuration settings can all be migrated using the official Magento Data Migration Tool, supplemented by custom scripts for complex scenarios.",
    },
    {
      question: "Do migration specialists also handle the new Magento 2 theme?",
      answer:
        "Many do, particularly for smaller projects. Larger migrations often separate backend data migration from frontend theme development. MageMatch can match you with a team that covers both.",
    },
    {
      question: "Can I replatform to Magento 2 from another platform like Shopify?",
      answer:
        "Yes. Specialists on MageMatch have experience migrating from Shopify, WooCommerce, Shopware, PrestaShop, and other platforms to Magento 2 and Adobe Commerce.",
    },
    {
      question: "How do I minimise risk during a Magento migration?",
      answer:
        "Key risk-reduction steps include a thorough pre-migration audit, a parallel-run test environment with real data, a delta sync strategy to capture new orders before cutover, and a clear rollback plan agreed before go-live.",
    },
  ],
};

export default function MagentoMigrationPage() {
  return <HireLandingPage config={config} />;
}
