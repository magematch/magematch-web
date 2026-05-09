import type { MetadataRoute } from 'next';
import { supabase, supabaseAdmin } from '../lib/supabase';

type SitemapPost = {
  slug: string;
  updated_at: string | null;
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
    .select('slug, updated_at')
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
  ];

  const blogPages: MetadataRoute.Sitemap = ((posts as SitemapPost[] | null) || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
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