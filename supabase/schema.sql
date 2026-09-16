-- Run this in the Supabase SQL editor for your project.

create table if not exists news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  slug text not null unique,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table news_posts enable row level security;

-- Anyone can read published posts (used by the public News page).
create policy "Public can read published posts"
  on news_posts for select
  using (published = true);

-- Only authenticated users (you, signed in via the admin dashboard) can
-- create, update, or delete posts.
create policy "Authenticated users can manage posts"
  on news_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

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

-- Anyone can read the team list (used by the public About page).
create policy "Public can read team members"
  on team_members for select
  using (true);

-- Only authenticated users (you, signed in via the admin dashboard) can
-- add, update, or remove team members.
create policy "Authenticated users can manage team"
  on team_members for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
