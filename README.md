# NODE — Network of Digital Equity

Public marketing site for Project NODE, built with Next.js 14 (App
Router), TypeScript, and Tailwind CSS. Matches the stack you're already
using elsewhere (Next.js, Supabase, Vercel).

## Pages

- `/` — Home
- `/how-it-works` — How the offline-first sync works
- `/campus` — For LASU students and staff
- `/investors` — For partners, press, and investors
- `/news` — Updates (pulls from Supabase once configured, falls back to
  placeholder content otherwise)
- `/about` — The builder's story and the Quadri Marvellous Initiative
- `/contact` — Contact form (sends via Resend once configured)
- `/admin` — Admin sign-in
- `/admin/dashboard` — Post, publish/unpublish, and delete news updates

## 1. Install and run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

- **Supabase**: create a project at supabase.com, then copy the URL and
  anon key from Settings → API.
- **Resend**: create an API key at resend.com for the contact form (optional
  for local dev — submissions log to the console if left blank).

## 3. Set up the database

In your Supabase project's SQL editor, run the contents of
`supabase/schema.sql`. This creates the `news_posts` table with the right
read/write permissions.

Then, in Supabase → Authentication → Users, create one user for
yourself (email + password) — that's what you'll use to sign in at
`/admin`.

## 4. Update the placeholder content

A few spots are intentionally marked as placeholders for you to fill in
with real details once you have them:

- `lib/newsData.ts` — fallback news items (shown until you add real
  posts via `/admin/dashboard`)
- `app/campus/page.tsx` — the "Deployment status" box
- `app/investors/page.tsx` — the "Materials" links (pitch deck, press
  kit) and current milestones
- `components/Header.tsx` and `app/campus/page.tsx` /
  `app/page.tsx` — the `PORTAL_URL` constant, pointing at your live
  Tier 2 deployment

## 5. Deploy

Push this to a GitHub repo, then import it in Vercel. Add the same
environment variables from `.env.local` under Project Settings →
Environment Variables. You'll get a free `*.vercel.app` subdomain by
default, matching the plan to launch there for now.

## Brand

- Colors: navy `#0B1F3A`, blue `#1E5FA8`, signal blue `#2F86D6`, gold
  `#C9973E`, paper `#F6F8FB` (see `tailwind.config.ts`)
- Type: Space Grotesk (headings), IBM Plex Sans (body)
- Logo: `public/logo.jpg`
