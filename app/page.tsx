import type { Metadata } from "next";
import Link from "next/link";
import NetworkPattern from "@/components/NetworkPattern";
import { NEWS_ITEMS } from "@/lib/newsData";
import { supabase, type NewsPostRow } from "@/lib/supabaseClient";
import { getSettings, toPairs } from "@/lib/siteContent";
import { DEFAULT_STEPS, getSteps } from "@/lib/stepsData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://node-website-mu.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings.seo_home_title,
    description: settings.seo_home_description,
  };
}

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "NODE — Network of Digital Equity",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      description:
        "NODE is a decentralized, offline-first server that keeps learning materials available on campuses with unreliable connectivity.",
    },
    {
      "@type": "WebSite",
      name: "NODE",
      url: SITE_URL,
    },
  ],
};

export const revalidate = 60;

async function getRecentNews() {
  if (!supabase) return NEWS_ITEMS;
  const { data, error } = await supabase
    .from("news_posts")
    .select("id, title, summary, slug, published, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);
  if (error || !data || data.length === 0) return NEWS_ITEMS;
  return (data as NewsPostRow[]).map((row) => ({
    slug: row.slug,
    date: new Date(row.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    title: row.title,
    summary: row.summary,
  }));
}

export default async function HomePage() {
  const [settings, news, steps] = await Promise.all([
    getSettings(),
    getRecentNews(),
    getSteps(),
  ]);
  const stats = toPairs(settings.home_stats);
  const topSteps = (steps.length > 0 ? steps : DEFAULT_STEPS).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div className="container-page grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] text-navy md:text-5xl">
              {settings.hero_title}
            </h1>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ink/75">
              {settings.hero_body}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={settings.portal_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-navy px-5 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-blue"
              >
                Open the Portal
              </a>
              <Link
                href="/investors"
                className="rounded-md border border-navy/20 px-5 py-3 font-body text-sm font-medium text-navy transition-colors hover:border-navy/40"
              >
                For Partners &amp; Investors
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center">
            <NetworkPattern className="w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* The problem, framed plainly */}
      <section className="border-t border-line bg-white">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1fr_1.2fr] md:py-20">
          <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">
            {settings.problem_heading}
          </h2>
          <p className="font-body text-base leading-relaxed text-ink/75">
            {settings.problem_body}
          </p>
        </div>
      </section>

      {/* How it works teaser */}
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">
              How NODE works
            </h2>
            <Link
              href="/how-it-works"
              className="whitespace-nowrap font-body text-sm font-medium text-blue hover:text-navy"
            >
              Full breakdown
            </Link>
          </div>

          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {topSteps.map((step, i) => (
              <li key={step.id} className="rounded-lg border border-line bg-white p-6">
                <span className="font-display text-sm font-semibold text-gold">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Campus highlight */}
      <section className="border-t border-line bg-white">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-body text-sm font-medium text-blue">
              {settings.home_campus_eyebrow}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy md:text-3xl">
              {settings.home_campus_heading}
            </h2>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink/75">
              {settings.home_campus_body}
            </p>
            <Link
              href="/campus"
              className="mt-6 inline-block font-body text-sm font-medium text-navy hover:text-blue"
            >
              See the campus deployment →
            </Link>
          </div>
          {stats.length > 0 && (
            <div className="grid gap-4 rounded-lg border border-line bg-paper p-8 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold text-navy">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-body text-xs uppercase tracking-wide text-ink/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News teaser */}
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">
                {settings.home_news_heading}
              </h2>
              {settings.home_news_body && (
                <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-ink/70">
                  {settings.home_news_body}
                </p>
              )}
            </div>
            <Link
              href="/news"
              className="whitespace-nowrap font-body text-sm font-medium text-blue hover:text-navy"
            >
              All updates
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {news.slice(0, 3).map((item) => (
              <article key={item.slug} className="rounded-lg border border-line bg-white p-6">
                <p className="font-body text-xs text-ink/50">{item.date}</p>
                <h3 className="mt-2 font-display text-base font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-line bg-navy">
        <div className="container-page flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
              {settings.home_cta_heading}
            </h2>
            <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-white/60">
              {settings.home_cta_body}
            </p>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-md bg-gold px-5 py-3 font-body text-sm font-medium text-navy transition-colors hover:bg-gold/90"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
