// Supabase table type definitions

export type DeveloperAvailability = "Immediate" | "This week" | "Next week" | "Available";

export type Developer = {
  id: string;
  slug: string;
  name: string;
  title: string;
  headline: string;
  location: string;
  country: string;
  expertType: "Freelancer" | "Agency";
  avatarInitials: string;
  avatarColor: string;
  badgeText: string;
  hourlyRateEur: number;
  availability: DeveloperAvailability;
  skills: string[];
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  authorRole: string;
  authorUrl?: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  readTime: string;
  date?: string; // For compatibility with file-based blog
  created_at?: string;
  updated_at?: string;
};

export type RawBlogPost = Partial<BlogPost> & {
  excerpt?: string;
  author_role?: string;
  read_time?: string;
};

export function normalizeBlogPost(post: RawBlogPost): BlogPost {
  return {
    id: post.id || "",
    slug: post.slug || "",
    title: post.title || "",
    description: post.description || post.excerpt || "",
    content: post.content || "",
    author: post.author || "",
    authorRole: post.authorRole || post.author_role || "",
    authorUrl: post.authorUrl,
    tags: post.tags || [],
    featured: Boolean(post.featured),
    published: Boolean(post.published),
    readTime: post.readTime || post.read_time || "",
    date: post.date,
    created_at: post.created_at,
    updated_at: post.updated_at,
  };
}

export type Contact = {
  id: string;
  name: string;
  company: string;
  email: string;
  help: string;
  budget: string;
  timeline: string;
  created_at: string;
};

export type Signup = {
  id: string;
  email: string;
  type: "merchant" | "developer";
  source: string;
  created_at: string;
};

export type Brief = {
  id: string;
  merchant_email: string;
  platform: string;
  problem_type: string;
  description: string;
  urgency: string;
  budget: string;
  specialist_skills?: string[];
  recommended_level?: string;
  estimated_timeline?: string;
  full_conversation: unknown[];
  created_at: string;
};
