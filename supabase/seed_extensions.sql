-- Seed static extensions into Supabase extensions table
-- Generated from app/data/extensions.ts

create table if not exists public.extensions (
  repo_url text primary key,
  name text not null,
  description text not null,
  stars integer not null default 0,
  author_slug text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.extensions (
  repo_url,
  name,
  description,
  stars,
  author_slug,
  active
)
values
  (
    'https://github.com/arjundhi/magento2-payment',
    'Magento 2 Payment',
    'Payment processing, retry logic, and GraphQL integration for Adyen payment methods and webhooks.',
    0,
    'arjun-dhiman',
    true
  ),
  (
    'https://github.com/arjundhi/magento2-email',
    'Magento 2 Email',
    'Branded transactional email templates and notification enhancements for core Magento customer and sales flows.',
    0,
    'arjun-dhiman',
    true
  ),
  (
    'https://github.com/arjundhi/magento2-customer-password-reset-cli',
    'Customer Password Reset CLI',
    'Adds a Magento CLI command to generate customer password reset tokens and trigger reset emails quickly.',
    0,
    'arjun-dhiman',
    true
  ),
  (
    'https://github.com/arjundhi/magento2-payment-method-surcharge',
    'Payment Method Surcharge',
    'Adds configurable surcharge fees by payment method across checkout, totals, invoices, PDFs, and emails.',
    0,
    'arjun-dhiman',
    true
  ),
  (
    'https://github.com/arjundhi/magento2-catalog-grid-category-tools',
    'Catalog Grid Category Tools',
    'Adds a category filter and category column to Magento admin product listings for faster catalog management.',
    0,
    'arjun-dhiman',
    true
  ),
  (
    'https://github.com/arjundhi/magento2-sales-email-attachments',
    'Sales Email Attachments',
    'Automatically attaches PDFs and policy files to Magento sales transactional emails without template overrides.',
    0,
    'arjun-dhiman',
    true
  )
on conflict (repo_url) do update set
  name = excluded.name,
  description = excluded.description,
  stars = excluded.stars,
  author_slug = excluded.author_slug,
  active = excluded.active,
  updated_at = now();
