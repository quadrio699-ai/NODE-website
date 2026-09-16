-- Run this in the Supabase SQL editor for your project.
-- Safe to re-run: every statement guards against existing objects.

-- ---------------------------------------------------------------------
-- News / updates
-- ---------------------------------------------------------------------
create table if not exists news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  slug text not null unique,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table news_posts enable row level security;

drop policy if exists "Public can read published posts" on news_posts;
create policy "Public can read published posts"
  on news_posts for select
  using (published = true);

drop policy if exists "Authenticated users can manage posts" on news_posts;
create policy "Authenticated users can manage posts"
  on news_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------
-- Founder & team
-- ---------------------------------------------------------------------
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text not null,
  photo_url text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table team_members enable row level security;

drop policy if exists "Public can read team members" on team_members;
create policy "Public can read team members"
  on team_members for select
  using (true);

drop policy if exists "Authenticated users can manage team" on team_members;
create policy "Authenticated users can manage team"
  on team_members for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------
-- Editable site copy (key/value)
-- ---------------------------------------------------------------------
create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

drop policy if exists "Public can read settings" on site_settings;
create policy "Public can read settings"
  on site_settings for select
  using (true);

drop policy if exists "Authenticated users can manage settings" on site_settings;
create policy "Authenticated users can manage settings"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------
-- How It Works steps
-- ---------------------------------------------------------------------
create table if not exists how_it_works_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table how_it_works_steps enable row level security;

drop policy if exists "Public can read steps" on how_it_works_steps;
create policy "Public can read steps"
  on how_it_works_steps for select
  using (true);

drop policy if exists "Authenticated users can manage steps" on how_it_works_steps;
create policy "Authenticated users can manage steps"
  on how_it_works_steps for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------
-- Campus FAQs
-- ---------------------------------------------------------------------
create table if not exists faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table faq_items enable row level security;

drop policy if exists "Public can read faqs" on faq_items;
create policy "Public can read faqs"
  on faq_items for select
  using (true);

drop policy if exists "Authenticated users can manage faqs" on faq_items;
create policy "Authenticated users can manage faqs"
  on faq_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
