import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  authorRole: string;
  authorUrl: string;
  readTime?: string;
  tags: string[];
  featured?: boolean;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

async function getPostFilenames() {
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);
}

function parsePost(slug: string, fileContent: string): BlogPost {
  const { data, content } = matter(fileContent);
  const frontmatter = data as BlogFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    author: frontmatter.author,
    authorRole: frontmatter.authorRole,
    authorUrl: frontmatter.authorUrl,
    readTime: frontmatter.readTime ?? readingTime(content).text,
    tags: frontmatter.tags ?? [],
    featured: Boolean(frontmatter.featured),
    content,
  };
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const filenames = await getPostFilenames();
  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const fullPath = path.join(BLOG_DIR, filename);
      const fileContent = await fs.readFile(fullPath, "utf-8");
      const post = parsePost(slug, fileContent);
      const { content: _content, ...meta } = post;
      return meta;
    })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
    const fileContent = await fs.readFile(fullPath, "utf-8");
    return parsePost(slug, fileContent);
  } catch {
    return null;
  }
}

export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.featured);
}

export async function getRelatedPosts(
  tags: string[],
  limit = 2
): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts
    .filter((post) => post.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit);
}

export function getTableOfContents(content: string) {
  return content
    .split("\n")
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const text = line.replace(/^##\s+/, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      return { id, text };
    });
}