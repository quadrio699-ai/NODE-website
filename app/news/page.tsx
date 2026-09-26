import type { Metadata } from "next";
import { supabase, type NewsPostRow } from "@/lib/supabaseClient";
import { NEWS_ITEMS, type NewsItem } from "@/lib/newsData";
import { getSettings } from "@/lib/siteContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings.seo_news_title,
    description: settings.seo_news_description,
  };
}

async function getNews(): Promise<NewsItem[]> {
  if (!supabase) return NEWS_ITEMS;

  const { data, error } = await supabase
    .from("news_posts")
    .select("id, title, summary, slug, published, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

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

export default async function NewsPage() {
  const [items, settings] = await Promise.all([getNews(), getSettings()]);

  return (
    <section className="bg-paper">
      <div className="container-page py-16 md:py-20">
        <h1 className="font-display text-4xl font-semibold text-navy md:text-5xl">
          {settings.news_title}
        </h1>
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-ink/75">
          {settings.news_intro}
        </p>

        <div className="mt-12 divide-y divide-line border-t border-line">
          {items.map((item) => (
            <article key={item.slug} className="grid gap-2 py-8 md:grid-cols-[10rem_1fr] md:gap-8">
              <p className="font-body text-sm text-ink/50">{item.date}</p>
              <div>
                <h2 className="font-display text-xl font-semibold text-navy">
                  {item.title}
                </h2>
                <p className="mt-2 max-w-2xl font-body text-base leading-relaxed text-ink/70">
                  {item.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
