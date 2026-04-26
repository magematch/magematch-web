import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact MageMatch | Get Matched in 2 Hours",
  description:
    "Have a project in mind? Tell us about it and we'll match you with the right developer within 2 hours.",
  keywords: [
    "contact magematch",
    "hire magento developer",
    "adobe commerce support",
    "magento project brief",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact MageMatch | Get Matched in 2 Hours",
    description:
      "Submit your Magento project brief and get matched with verified developers within 2 hours.",
    url: "/contact",
    siteName: "MageMatch",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact MageMatch | Get Matched in 2 Hours",
    description:
      "Submit your Magento project brief and get matched with verified developers within 2 hours.",
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