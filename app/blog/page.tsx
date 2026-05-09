import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { supabase } from "../../lib/supabase";
import {
  normalizeBlogPost,
  type BlogPost,
  type RawBlogPost,
} from "../../lib/supabase-types";

export const metadata: Metadata = {
  title: "Magento Blog — Adobe Commerce Guides & Tutorials",
  description:
    "Practical Magento 2 and Adobe Commerce guides from certified developers. Performance, Hyvä, headless commerce and more.",
  keywords: [
    "magento blog",
    "adobe commerce tutorials",
    "magento performance guide",
    "magento checkout fixes",
    "hyva guide",
  ],
  alternates: {
    canonical: "https://magematch.com/blog",
  },
  openGraph: {
    title: "Magento Developer Blog | MageMatch",
    description:
      "Practical Magento and Adobe Commerce guides from certified experts.",
    url: "/blog",
    siteName: "MageMatch",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magento Developer Blog | MageMatch",
    description:
      "Practical Magento and Adobe Commerce guides from certified experts.",
    images: ["/favicon.svg"],
  },
};

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let error = false;

  try {
    const { data, error: fetchError } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError;
    posts = ((data as RawBlogPost[]) || []).map(normalizeBlogPost);
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    error = true;
  }

  const [featuredPost, ...restPosts] = posts;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <section>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            Magento Developer Blog
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg">
            Practical guides from Adobe Commerce Certified Masters
          </p>
        </section>

        {error ? (
          <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm font-semibold text-red-900">
              Unable to load blog posts. Please try again later.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-yellow-200 bg-yellow-50 p-6">
            <p className="text-sm font-semibold text-yellow-900">
              No blog posts available at the moment. Check back soon.
            </p>
          </div>
        ) : (
          <>
            {featuredPost && (
              <section className="mt-10">
                <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                  Featured
                </p>
                <article className="mt-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                  <p className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                    {featuredPost.tags?.[0] ?? "magento"}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
                    {featuredPost.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-semibold text-white">
                      {featuredPost.author
                        .split(" ")
                        .map((word: string) => word[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span className="font-medium text-zinc-900">{featuredPost.author}</span>
                    <span>•</span>
                    <span>
                      {new Date(
                        featuredPost.date || featuredPost.created_at || new Date()
                      ).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="mt-6 inline-flex text-sm font-semibold text-orange-700 hover:text-orange-800"
                  >
                    Read more →
                  </Link>
                </article>
              </section>
            )}

            <section className="mt-10 grid gap-6 md:grid-cols-2">
              {restPosts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700 ring-1 ring-orange-200">
                    {post.tags?.[0] ?? "magento"}
                  </p>
                  <h2 className="mt-4 line-clamp-2 text-xl font-semibold leading-8 tracking-tight text-zinc-900">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">
                    {post.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">
                      {post.author
                        .split(" ")
                        .map((word: string) => word[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span className="font-medium text-zinc-900">{post.author}</span>
                    <span>•</span>
                    <span>
                      {new Date(post.date || post.created_at || new Date()).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex text-sm font-semibold text-orange-700 hover:text-orange-800"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
