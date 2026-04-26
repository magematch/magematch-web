import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getAllPosts } from "../../lib/blog";

export const metadata: Metadata = {
  title: "Magento Developer Blog | MageMatch",
  description:
    "Practical guides from Adobe Commerce Certified Masters covering Magento performance, debugging, upgrades, and architecture.",
  keywords: [
    "magento blog",
    "adobe commerce tutorials",
    "magento performance guide",
    "magento checkout fixes",
    "hyva guide",
  ],
  alternates: {
    canonical: "/blog",
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
  const posts = await getAllPosts();
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

        {featuredPost ? (
          <section className="mt-10">
            <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
              Featured
            </p>
            <article className="mt-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                {featuredPost.tags[0] ?? "magento"}
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
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="font-medium text-zinc-900">{featuredPost.author}</span>
                <span>•</span>
                <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
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
        ) : null}

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {restPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700 ring-1 ring-orange-200">
                {post.tags[0] ?? "magento"}
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
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="font-medium text-zinc-900">{post.author}</span>
                <span>•</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
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
      </main>

      <Footer />
    </div>
  );
}
