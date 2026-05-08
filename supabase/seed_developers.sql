-- Seed static developers into Supabase developers table
-- Generated from app/data/developers.ts

alter table public.developers
  add column if not exists slug text,
  add column if not exists name text,
  add column if not exists title text,
  add column if not exists headline text,
  add column if not exists location text,
  add column if not exists country text,
  add column if not exists "expertType" text,
  add column if not exists "avatarInitials" text,
  add column if not exists "avatarColor" text,
  add column if not exists "badgeText" text,
  add column if not exists "hourlyRateEur" integer,
  add column if not exists availability text,
  add column if not exists skills text[] default '{}'::text[],
  add column if not exists featured boolean default false,
  add column if not exists active boolean default true,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

create unique index if not exists developers_slug_key on public.developers (slug);

with seed (
  slug,
  name,
  country,
  "expertType",
  "avatarInitials",
  "avatarColor",
  "badgeText",
  title,
  location,
  availability,
  "hourlyRateEur",
  skills,
  headline,
  featured,
  active
) as (
values
  (
    'arjun-dhiman',
    'Arjun Dhiman',
    'Bulgaria',
    'Freelancer',
    'AD',
    '#F97316',
    '🏆 Adobe Certified Master',
    'Adobe Commerce Certified Master | 13+ Years',
    '13+ Years · Sofia, Bulgaria',
    'Immediate',
    55,
    ARRAY['Magento 2','Adobe Commerce','Hyvä','PHP','GraphQL','Headless Commerce','AWS','Docker']::text[],
    'Architect-level Adobe Commerce specialist focused on performance, clean implementations, and pragmatic delivery for high-traffic ecommerce.',
    true,
    true
  ),
  (
    'tinkesh-kumar',
    'Tinkesh Kumar',
    'India',
    'Freelancer',
    'TK',
    '#7C3AED',
    '7x Adobe Certified',
    '7x Adobe Commerce Certified | Magento 2 & NodeJS Developer',
    '11+ Years · Noida, India',
    'Available',
    45,
    ARRAY['Magento 2','Adobe Commerce','NodeJS','PHP','Azure']::text[],
    'Magento 2, NodeJS, payment gateway, and extension specialist with 11+ years delivering custom eCommerce solutions and troubleshooting complex builds.',
    true,
    true
  ),
  (
    'aleksandar-harutyunyan',
    'Aleksandar Harutyunyan',
    'Bulgaria',
    'Agency',
    'AH',
    '#0D9488',
    'Adobe + Salesforce Certified',
    'Adobe Commerce & Salesforce B2C Commerce Developer | 20+ Years Experience',
    '20+ Years · Bulgaria 🇧🇬',
    'Available',
    55,
    ARRAY['Adobe Commerce','SFCC','PHP','Adyen','Avalara']::text[],
    'Enterprise eCommerce developer with 20+ years across Adobe Commerce, Salesforce Commerce Cloud, platform migrations, and major integrations.',
    true,
    true
  )
)
insert into public.developers (
  slug,
  name,
  country,
  "expertType",
  "avatarInitials",
  "avatarColor",
  "badgeText",
  title,
  location,
  availability,
  "hourlyRateEur",
  skills,
  headline,
  featured,
  active
)
select
  slug,
  name,
  country,
  "expertType",
  "avatarInitials",
  "avatarColor",
  "badgeText",
  title,
  location,
  availability,
  "hourlyRateEur",
  skills,
  headline,
  featured,
  active
from seed
on conflict (slug) do update set
  name = excluded.name,
  country = excluded.country,
  "expertType" = excluded."expertType",
  "avatarInitials" = excluded."avatarInitials",
  "avatarColor" = excluded."avatarColor",
  "badgeText" = excluded."badgeText",
  title = excluded.title,
  location = excluded.location,
  availability = excluded.availability,
  "hourlyRateEur" = excluded."hourlyRateEur",
  skills = excluded.skills,
  headline = excluded.headline,
  featured = excluded.featured,
  active = excluded.active,
  updated_at = now();
