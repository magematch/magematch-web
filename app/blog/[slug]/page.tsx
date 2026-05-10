import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { BlogPostJsonLd, BreadcrumbListJsonLd } from "../../components/JsonLd";
import { supabase } from "../../../lib/supabase";
import {
  normalizeBlogPost,
  type BlogPost,
  type RawBlogPost,
} from "../../../lib/supabase-types";
import ReadingProgress from "./ReadingProgress";

export const runtime = "edge";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function normalizeMarkdownContent(content: string): string {
  return content
    .replace(/\r\n/g, "\n")
    .replace(/^-(\S)/gm, "- $1")
    .replace(/^##(\S)/gm, "## $1")
    .replace(/^###(\S)/gm, "### $1");
}

async function renderMarkdownToHtml(content: string): Promise<string> {
  const normalized = normalizeMarkdownContent(content);
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(normalized);

  return String(result);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { data: post } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!post) {
      return { title: "Blog post not found" };
    }

    const typedPost = normalizeBlogPost(post as RawBlogPost);

    return {
      title: `${typedPost.title} | MageMatch Blog`,
      description: typedPost.description,
      keywords: [...(typedPost.tags || []), "magento", "adobe commerce"],
      authors: [{ name: typedPost.author, url: typedPost.authorUrl || "https://magematch.com/developers/arjun-dhiman" }],
      category: typedPost.tags?.[0] || "Magento",
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://magematch.com/blog/${typedPost.slug}`,
      },
      openGraph: {
        title: typedPost.title,
        description: typedPost.description,
        url: `https://magematch.com/blog/${typedPost.slug}`,
        siteName: "MageMatch",
        type: "article",
        publishedTime: typedPost.created_at,
        modifiedTime: typedPost.updated_at || typedPost.created_at,
        authors: [typedPost.author],
        tags: typedPost.tags || [],
        images: [{
          url: `https://magematch.com/blog/${typedPost.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: typedPost.title,
        }],
      },
      twitter: {
        card: "summary_large_image",
        title: typedPost.title,
        description: typedPost.description,
        images: [`https://magematch.com/blog/${typedPost.slug}/opengraph-image`],
        creator: "@magematch",
      },
    };
  } catch (err) {
    console.error("Failed to fetch blog post metadata:", err);
    return { title: "Blog post not found" };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  try {
    const { data: post } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!post) {
      notFound();
    }

    const typedPost = normalizeBlogPost(post as RawBlogPost);
    const postDate = typedPost.date || typedPost.created_at || new Date().toISOString();
    const renderedContentHtml = await renderMarkdownToHtml(typedPost.content || "");

    return (
      <div className="flex min-h-full flex-1 flex-col">
        <BlogPostJsonLd
          post={{
            title: typedPost.title,
            description: typedPost.description,
            author: typedPost.author,
            authorUrl: typedPost.authorUrl,
            created_at: postDate,
            updated_at: typedPost.updated_at,
            slug: typedPost.slug,
            tags: typedPost.tags,
          }}
        />
        <BreadcrumbListJsonLd
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: typedPost.title, href: `/blog/${typedPost.slug}` },
          ]}
        />
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
                  {typedPost.tags?.[0] ?? "magento"}
                </p>

                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                  {typedPost.title}
                </h1>
                <p className="mt-4 text-base leading-7 text-zinc-600">{typedPost.description}</p>

                <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white">
                      {typedPost.author
                        .split(" ")
                        .map((word: string) => word[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {typedPost.author}
                      </p>
                      <p className="text-xs text-zinc-600">{typedPost.authorRole}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-zinc-600">
                    Published on {new Date(postDate).toLocaleDateString()} • {typedPost.readTime}
                  </p>
                </div>

                <div className="mt-8 max-w-none">
                  <div
                    className="text-base leading-8 text-zinc-700 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-zinc-900 sm:[&_h2]:text-3xl [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-zinc-900 [&_p]:mt-5 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-zinc-900 [&_em]:italic [&_em]:text-zinc-800 [&_blockquote]:mt-6 [&_blockquote]:rounded-r-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-orange-400 [&_blockquote]:bg-orange-50/60 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_pre]:mt-5 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:bg-zinc-900 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-7 [&_pre]:text-zinc-100 [&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_code]:font-medium [&_code]:text-zinc-800 [&_a]:font-semibold [&_a]:text-orange-700 [&_a]:underline [&_a]:decoration-orange-300 [&_a]:decoration-2 [&_a]:underline-offset-2 hover:[&_a]:text-orange-800 hover:[&_a]:decoration-orange-500"
                    dangerouslySetInnerHTML={{ __html: renderedContentHtml }}
                  />
                </div>

                <div className="mt-10 rounded-3xl border border-orange-200/80 bg-linear-to-br from-orange-50 via-white to-white p-6 sm:p-8">
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
                    Need help with this Magento issue?
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Talk to a vetted Magento expert for debugging, performance, integrations, or upgrade planning.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                      Get expert help →
                    </Link>
                    <Link
                      href="/developers"
                      className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:border-orange-200 hover:text-orange-700"
                    >
                      Browse developers
                    </Link>
                  </div>
                </div>

                <div className="mt-12 border-t border-zinc-200 pt-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white">
                      {typedPost.author
                        .split(" ")
                        .map((word: string) => word[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{typedPost.author}</p>
                      <p className="text-sm text-zinc-600">{typedPost.authorRole}</p>
                      {typedPost.authorUrl && (
                        <Link
                          href={typedPost.authorUrl}
                          className="text-xs font-semibold text-orange-700 hover:text-orange-800"
                        >
                          View profile →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <aside className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-zinc-900">Share this post</h3>
                  <div className="mt-4 flex gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        typedPost.title
                      )}&url=${encodeURIComponent(`https://magematch.com/blog/${typedPost.slug}`)}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white transition hover:bg-orange-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      𝕏
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        `https://magematch.com/blog/${typedPost.slug}`
                      )}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      in
                    </a>
                  </div>
                </div>

                <div className="rounded-3xl border border-orange-200/80 bg-linear-to-br from-orange-50 via-white to-white p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-zinc-900">Need a Magento expert?</h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    Browse verified Adobe Commerce developers and architects.
                  </p>
                  <Link
                    href="/developers"
                    className="mt-4 flex items-center justify-center rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Browse experts →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    );
  } catch (err) {
    console.error("Failed to fetch blog post:", err);
    notFound();
  }
}
