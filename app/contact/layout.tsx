import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Magento Experts | MageMatch Lead Form",
  description:
    "Submit your Magento or Adobe Commerce lead and get matched with relevant developers, architects, and specialists within 2 hours.",
  keywords: [
    "contact magematch",
    "hire magento developer",
    "adobe commerce support",
    "magento project brief",
    "hire magento experts",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Hire Magento Experts | MageMatch Lead Form",
    description:
      "Submit your Magento project requirements and get matched with verified experts within 2 hours.",
    url: "/contact",
    siteName: "MageMatch",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Magento Experts | MageMatch Lead Form",
    description:
      "Submit your Magento project requirements and get matched with verified experts within 2 hours.",
    images: ["/favicon.svg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}