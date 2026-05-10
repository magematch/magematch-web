import type { MetadataRoute } from 'next';
import { seedPostSlugs } from '../lib/seedPostSlugs';
import { supabase, supabaseAdmin } from '../lib/supabase';

type SitemapPost = {
  slug: string;
  updated_at: string | null;
  created_at: string | null;
};

type SitemapDeveloper = {
  slug: string;
  created_at: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://magematch.com';
  const client = supabaseAdmin ?? supabase;

  const { data: posts } = await client
    .from('posts')
    .select('slug, updated_at, created_at')
    .eq('published', true);

  const { data: developers } = await client
    .from('developers')
    .select('slug, created_at')
    .eq('active', true);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/developers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/extensions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hire/magento-developer`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire/adobe-commerce-consultant`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/hire/hyva-developer`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/hire/magento-migration`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/hire/magento-expert-europe`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire/adobe-commerce-developer-europe`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire/magento-developer-uk`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire/magento-developer-germany`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const postMap = new Map<string, SitemapPost>();

  (((posts as SitemapPost[] | null) || [])).forEach((post) => {
    if (post?.slug) {
      postMap.set(post.slug, post);
    }
  });

  seedPostSlugs.forEach((slug) => {
    if (!postMap.has(slug)) {
      postMap.set(slug, {
        slug,
        updated_at: null,
        created_at: null,
      });
    }
  });

  const blogPages: MetadataRoute.Sitemap = Array.from(postMap.values()).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at || post.created_at ? new Date(post.updated_at || post.created_at || new Date()) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const developerPages: MetadataRoute.Sitemap = ((developers as SitemapDeveloper[] | null) || []).map((developer) => ({
    url: `${baseUrl}/developers/${developer.slug}`,
    lastModified: developer.created_at ? new Date(developer.created_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages, ...developerPages];
}