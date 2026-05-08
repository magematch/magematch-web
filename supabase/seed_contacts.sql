-- Create contacts table for contact form submissions
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  help text,
  budget text,
  timeline text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.contacts enable row level security;

-- Allow anyone to insert (contact form submissions)
create policy if not exists "Anyone can insert contacts"
on public.contacts
for insert
to anon, authenticated
with check (true);

-- Allow only service_role to read/update/delete (admin operations)
create policy if not exists "Service role can manage contacts"
on public.contacts
for all
to service_role
using (true)
with check (true);

-- Create index on email for lookups
create index if not exists contacts_email_idx on public.contacts (email);
create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
