import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply as Magento Developer",
  description:
    "Join MageMatch as a vetted Magento or Adobe Commerce expert. Apply to get matched with merchant projects.",
  alternates: {
    canonical: "https://magematch.com/apply",
  },
  openGraph: {
    title: "Apply as Magento Developer | MageMatch",
    description:
      "Apply to join MageMatch and get high-quality Adobe Commerce and Magento development projects.",
    url: "https://magematch.com/apply",
    type: "website",
    siteName: "MageMatch",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply as Magento Developer | MageMatch",
    description:
      "Join the MageMatch network of verified Magento developers.",
    images: ["/opengraph-image"],
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}