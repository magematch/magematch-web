import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Magento Experts",
  description:
    "Share your Magento or Adobe Commerce project brief and get matched with a vetted developer in hours.",
  alternates: {
    canonical: "https://magematch.com/contact",
  },
  openGraph: {
    title: "Contact Magento Experts | MageMatch",
    description:
      "Tell us your Magento project requirements and get fast expert matches with fixed-price options.",
    url: "https://magematch.com/contact",
    type: "website",
    siteName: "MageMatch",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Magento Experts | MageMatch",
    description:
      "Tell us your Magento project requirements and get matched quickly.",
    images: ["/opengraph-image"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}