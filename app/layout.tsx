import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "./components/Analytics";
import ChatWidget from "./components/ChatWidget";
import { OrganizationJsonLd, WebsiteJsonLd } from "./components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://magematch.com"),
  title: {
    default: "MageMatch — Magento Developer Marketplace",
    template: "%s | MageMatch",
  },
  description:
    "Find vetted Adobe Commerce and Magento 2 developers. Fixed prices, fast delivery, certified experts. The only dedicated marketplace for Magento development.",
  applicationName: "MageMatch",
  keywords: [
    "Magento developer",
    "Adobe Commerce developer",
    "hire Magento developer",
    "Magento 2 expert",
    "Adobe Commerce agency",
    "Hyvä developer",
    "Magento freelancer",
    "Magento marketplace",
    "Adobe Commerce certified",
    "Magento bug fix",
    "Magento performance",
    "headless Magento",
  ],
  authors: [
    {
      name: "Arjun Dhiman",
      url: "https://magematch.com/developers/arjun-dhiman",
    },
  ],
  creator: "MageMatch",
  publisher: "MageMatch",
  alternates: {
    canonical: "https://magematch.com",
    types: {
      "text/plain": [
        { url: "https://magematch.com/llms.txt", title: "MageMatch LLM Summary" },
        { url: "https://magematch.com/llms-full.txt", title: "MageMatch LLM Full Detail" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_EU",
    url: "https://magematch.com",
    siteName: "MageMatch",
    title: "MageMatch — Magento Developer Marketplace",
    description:
      "Find vetted Adobe Commerce and Magento 2 developers. Fixed prices, fast delivery.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MageMatch — Magento Developer Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MageMatch — Magento Developer Marketplace",
    description:
      "Find vetted Adobe Commerce and Magento 2 developers.",
    images: ["/opengraph-image"],
    creator: "@magematch",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  ...((process.env.GOOGLE_SITE_VERIFICATION || process.env.BING_SITE_VERIFICATION)
    ? {
        verification: {
          ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
          ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-white text-zinc-950"
        suppressHydrationWarning
      >
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <Analytics />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
