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
`supabase/schema.sql`. This creates all five tables — `site_settings`,
`news_posts`, `team_members`, `how_it_works_steps`, and `faq_items` —
with public read and authenticated-only write. The script is safe to
re-run if you pull updates later.

Then, in Supabase → Authentication → Users, create one user for
yourself (email + password) — that's what you'll use to sign in at
`/admin`.

## 4. Edit the site from `/admin`

Sign in at `/admin` and everything behind the sticky header is editable —
no code changes, no redeploy. The dashboard is tabbed by site section:

| Tab | What you can edit |
| --- | --- |
| **Global** | The NODE server / portal link (every "Open the Portal" button), footer text, contact email |
| **Home** | Hero headline and copy, the problem section, campus callout, stats box, "Built in the open" heading, closing CTA |
| **How It Works** | Page headline and intro, the comparison lists, plus add/edit/reorder/delete the numbered steps |
| **For Campus** | Headline, intro, deployment status text and figures, plus add/edit/reorder/delete FAQs |
| **For Investors** | Headline, opportunity and traction sections, traction figures, pitch deck and press kit links |
| **News** | Page headings, plus post, edit, publish/unpublish, and delete updates |
| **About & Team** | The story sections, "Elsewhere" links, plus add/edit/reorder/delete founder and team members |
| **Contact** | Page headline and intro |

Two conventions worth knowing:

- **Figure boxes** (stats, deployment figures, traction metrics) take one
  item per line as `Label | Value` — e.g. `Active users | 480`. Leave the
  field blank to hide the box entirely.
- **Link lists** take one per line as `Label | URL`.

Anything left unsaved falls back to a sensible default, so the site never
renders blank. Changes appear within about a minute (pages revalidate on a
60-second window).

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
