import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getTableOfContents,
} from "../../../lib/blog";
import ReadingProgress from "./ReadingProgress";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function slugify(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

const mdxComponents = {
  h2: ({ children }: { children: React.ReactNode }) => {
    const text = String(children);
    return (
      <h2 id={slugify(text)} className="mt-10 text-2xl font-semibold tracking-tight text-zinc-900">
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="mt-8 text-xl font-semibold text-zinc-900">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mt-5 text-base leading-8 text-zinc-700">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="mt-5 list-disc space-y-3 pl-6 text-base leading-8 text-zinc-700">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="mt-5 list-decimal space-y-3 pl-6 text-base leading-8 text-zinc-700">{children}</ol>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="mt-6 rounded-r-xl border-l-4 border-orange-300 bg-orange-50 px-5 py-4 text-zinc-800">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="font-semibold text-orange-700 underline decoration-orange-300 underline-offset-4 hover:text-orange-800">
      {children}
    </a>
  ),
};

function splitAtMidpoint(content: string) {
  const paragraphs = content.split("\n\n");
  if (paragraphs.length < 6) {
    return { firstHalf: content, secondHalf: "" };
  }

  const midpoint = Math.floor(paragraphs.length / 2);
  return {
    firstHalf: paragraphs.slice(0, midpoint).join("\n\n"),
    secondHalf: paragraphs.slice(midpoint).join("\n\n"),
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found",
    };
  }

  return {
    title: `${post.title} | MageMatch Blog`,
    description: post.description,
    keywords: [...post.tags, "magento", "adobe commerce", "mageMatch blog"],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: "MageMatch",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: ["/favicon.svg"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/favicon.svg"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { firstHalf, secondHalf } = splitAtMidpoint(post.content);

  const firstMdx = await compileMDX({
    source: firstHalf,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  const secondMdx = secondHalf
    ? await compileMDX({
        source: secondHalf,
        components: mdxComponents,
        options: {
          parseFrontmatter: false,
        },
      })
    : null;

  const toc = getTableOfContents(post.content);
  const related = (await getRelatedPosts(post.tags, 4))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  const encodedTitle = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(`https://magematch.com/blog/${post.slug}`);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <ReadingProgress />
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <Link href="/blog" className="inline-flex text-sm font-semibold text-orange-700 hover:text-orange-800">
          ← Back to blog
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
              <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700 ring-1 ring-orange-200">
                {post.tags[0] ?? "magento"}
              </p>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-base leading-7 text-zinc-600">{post.description}</p>

              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white">
                    {post.author
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <Link href={post.authorUrl} className="text-sm font-semibold text-zinc-900 hover:text-orange-700">
                      {post.author}
                    </Link>
                    <p className="text-xs text-zinc-600">{post.authorRole}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">
                  Published on {new Date(post.date).toLocaleDateString()} • {post.readTime}
                </p>
              </div>

              <div className="mt-8">{firstMdx.content}</div>

              <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-6">
                <p className="text-xl font-semibold text-zinc-900">Need help with this?</p>
                <p className="mt-2 text-sm leading-6 text-zinc-700">
                  Get matched with a Magento developer for your exact issue.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Get matched with a Magento developer →
                </Link>
              </div>

              {secondMdx ? <div className="mt-10">{secondMdx.content}</div> : null}

              <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-6">
                <p className="text-xl font-semibold text-zinc-900">Need help with this?</p>
                <p className="mt-2 text-sm leading-6 text-zinc-700">
                  Skip trial-and-error and work with a certified Magento expert.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Get matched with a Magento developer →
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-zinc-200 pt-6">
                <span className="text-sm font-semibold text-zinc-900">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-orange-300 hover:text-orange-700"
                >
                  Twitter / X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-orange-300 hover:text-orange-700"
                >
                  LinkedIn
                </a>
              </div>

              <section className="mt-10 border-t border-zinc-200 pt-8">
                <p className="text-sm font-semibold text-zinc-900">Related posts</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {related.map((item) => (
                    <article
                      key={item.slug}
                      className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
                    >
                      <p className="text-xs uppercase tracking-wide text-orange-700">
                        {item.tags[0] ?? "magento"}
                      </p>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="mt-2 block text-sm font-semibold text-zinc-900 hover:text-orange-700"
                      >
                        {item.title}
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-zinc-900">Table of contents</p>
              <ul className="mt-4 space-y-2 text-sm">
                {toc.length ? (
                  toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-zinc-600 hover:text-orange-700">
                        {item.text}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-zinc-500">No headings found.</li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
