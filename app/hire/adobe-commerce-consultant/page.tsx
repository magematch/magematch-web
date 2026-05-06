import type { Metadata } from "next";
import HireLandingPage, { type HireLandingConfig } from "../../components/HireLandingPage";

export const metadata: Metadata = {
  title: "Hire Adobe Commerce Consultant | Certified AC Experts | MageMatch",
  description:
    "Find experienced Adobe Commerce consultants for architecture reviews, complex builds, third-party integrations, and platform strategy. Matched to your project within 2 hours.",
  keywords: [
    "hire adobe commerce consultant",
    "adobe commerce expert",
    "adobe commerce architect",
    "adobe commerce specialist europe",
    "magento enterprise consultant",
    "adobe commerce implementation",
  ],
  alternates: { canonical: "/hire/adobe-commerce-consultant" },
  openGraph: {
    title: "Hire Adobe Commerce Consultant | MageMatch",
    description:
      "Connect with certified Adobe Commerce consultants matched to your architecture, integration, or implementation needs.",
    url: "/hire/adobe-commerce-consultant",
    siteName: "MageMatch",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Adobe Commerce Consultant | MageMatch",
    description:
      "Connect with certified Adobe Commerce consultants matched to your architecture, integration, or implementation needs.",
    images: ["/favicon.svg"],
  },
};

const config: HireLandingConfig = {
  badge: "Hire Adobe Commerce Consultant",
  canonical: "/hire/adobe-commerce-consultant",
  headline: "Hire an Adobe Commerce Consultant Who Can Lead the Whole Project",
  intro:
    "From architecture reviews to full platform implementations, MageMatch connects you with senior Adobe Commerce consultants who understand complex enterprise requirements — and how to deliver them.",
  benefits: [
    {
      icon: "🏗️",
      title: "Solution Architecture Expertise",
      description:
        "Get consultants who can audit your current setup, recommend the right architecture, and produce a delivery-ready technical plan.",
    },
    {
      icon: "🔗",
      title: "Third-Party Integration Specialists",
      description:
        "ERP, CRM, PIM, POS, payment gateways, and logistics — find consultants with proven integration experience across major platforms.",
    },
    {
      icon: "☁️",
      title: "Adobe Commerce Cloud Ready",
      description:
        "Source experts familiar with Adobe Commerce on Cloud infrastructure, including Fastly CDN, Elasticsearch, and cloud-specific deployment patterns.",
    },
    {
      icon: "📋",
      title: "Scoping and Discovery",
      description:
        "Bring in a consultant for a structured discovery phase before committing to a full build — get accurate estimates and reduced project risk.",
    },
    {
      icon: "🔒",
      title: "Security and Compliance",
      description:
        "Hire consultants who understand PCI-DSS, GDPR, and Adobe Commerce security hardening for high-traffic and regulated commerce environments.",
    },
    {
      icon: "📈",
      title: "Performance and Scalability Reviews",
      description:
        "Identify bottlenecks, improve server response times, and build a store architecture that scales with your growth plans.",
    },
  ],
  faqs: [
    {
      question: "What does an Adobe Commerce consultant do?",
      answer:
        "An Adobe Commerce consultant provides strategic and technical guidance — covering architecture design, integration planning, platform audits, team upskilling, and project leadership. They are distinct from hands-on developers who write code daily.",
    },
    {
      question: "When should I hire a consultant rather than a developer?",
      answer:
        "Hire a consultant when you need architectural direction, a scoping phase before development, a technical review of an existing build, or leadership across a team of developers.",
    },
    {
      question: "Are Adobe Commerce consultants on MageMatch certified?",
      answer:
        "Yes. Many hold Adobe Commerce Architect or Developer certifications. Profiles highlight certifications, years of experience, and reference projects.",
    },
    {
      question: "Can I hire a consultant for a short engagement?",
      answer:
        "Absolutely. Short-term engagements like platform audits, architecture workshops, or discovery phases are common and typically well-suited to a fixed-price package.",
    },
    {
      question: "Do Adobe Commerce consultants on MageMatch work on B2B projects?",
      answer:
        "Yes. The talent pool includes consultants experienced in Adobe Commerce B2B, including quote management, company accounts, shared catalogues, and ERP-facing integrations.",
    },
    {
      question: "How do I brief a consultant through MageMatch?",
      answer:
        "Submit your project brief through the contact form. Include your current setup, goals, and timeline. We'll match you with consultants who have done similar work and can quote accurately.",
    },
  ],
};

export default function HireAdobeCommerceConsultantPage() {
  return <HireLandingPage config={config} />;
}
