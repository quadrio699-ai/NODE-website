// Placeholder seed content. Replace dates/copy with real milestones,
// or wire this page up to the `news_posts` table in Supabase (see
// supabase/schema.sql and app/admin/dashboard) once the admin is live.

export type NewsItem = {
  slug: string;
  date: string;
  title: string;
  summary: string;
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    slug: "node-v4-rebuild",
    date: "Update your date",
    title: "NODE reaches its v4 rebuild",
    summary:
      "A rebuilt core with tighter sync handling and a more resilient local server — the foundation for the LASU pilot.",
  },
  {
    slug: "lasu-pilot-live",
    date: "Update your date",
    title: "Pilot deployment begins at LASU",
    summary:
      "NODE goes live on campus, starting with a focused rollout alongside student leadership.",
  },
  {
    slug: "ocw-mirror-plan",
    date: "Update your date",
    title: "Educational content mirroring, mapped out",
    summary:
      "A plan for mirroring open courseware locally, so reference material stays reachable without a live connection.",
  },
];
