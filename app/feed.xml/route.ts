import { NextResponse } from "next/server";
import { seedPostSlugs } from "../../lib/seedPostSlugs";
import { supabase, supabaseAdmin } from "../../lib/supabase";

const BASE_URL = "https://magematch.com";

type RssPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  author: string | null;
  created_at: string | null;
  updated_at: string | null;
};

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(dateStr: string | null): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  return d.toUTCString();
}

export const runtime = "edge";
export const revalidate = 3600; // re-generate at most once per hour

export async function GET() {
  const client = supabaseAdmin ?? supabase;

  const { data } = await client
    .from("posts")
    .select("slug, title, excerpt, author, created_at, updated_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(50);

  const posts = (data as RssPost[] | null) ?? [];

  // Add any seed slugs not yet in DB so crawlers still see them
  const slugsInDb = new Set(posts.map((p) => p.slug));
  const seedOnlyPosts: RssPost[] = seedPostSlugs
    .filter((slug) => !slugsInDb.has(slug))
    .map((slug) => ({
      slug,
      title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      excerpt: null,
      author: "Arjun Dhiman",
      created_at: null,
      updated_at: null,
    }));

  const allPosts = [...posts, ...seedOnlyPosts];

  const items = allPosts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const title = escapeXml(post.title || post.slug);
      const desc = escapeXml(post.excerpt || "Practical Magento and Adobe Commerce guide from MageMatch.");
      const author = escapeXml(post.author || "Arjun Dhiman");
      const pubDate = rfc822(post.created_at);
      return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${desc}</description>
      <author>hello@magematch.com (${author})</author>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>MageMatch Blog — Magento &amp; Adobe Commerce Guides</title>
    <link>${BASE_URL}/blog</link>
    <description>Practical Magento 2 and Adobe Commerce guides from certified developers covering performance, Hyvä, B2B, and more.</description>
    <language>en-gb</language>
    <managingEditor>hello@magematch.com (Arjun Dhiman)</managingEditor>
    <webMaster>hello@magematch.com (MageMatch)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${BASE_URL}/magematch-logo.svg</url>
      <title>MageMatch</title>
      <link>${BASE_URL}</link>
    </image>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
