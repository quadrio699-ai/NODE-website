import { supabase } from "@/lib/supabaseClient";

export type FieldType = "text" | "textarea" | "url" | "lines";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  default: string;
};

export type SettingsGroup = {
  id: string;
  label: string;
  description: string;
  fields: FieldDef[];
};

// Every editable piece of copy on the site lives here. The `default` is
// what shows before anything is saved in the admin dashboard.
export const SETTINGS_GROUPS: SettingsGroup[] = [
  {
    id: "global",
    label: "Global",
    description:
      "Applies across the whole site — the header button, the footer, and every 'Open the Portal' link.",
    fields: [
      {
        key: "portal_url",
        label: "NODE server / portal link",
        type: "url",
        help: "Where every 'Open the Portal' button points. Update this whenever the deployment moves.",
        default: "https://project-node.onrender.com",
      },
      {
        key: "footer_blurb",
        label: "Footer description",
        type: "textarea",
        default:
          "Network of Digital Equity — a decentralized, offline-first server bringing learning materials to campuses with unreliable connectivity, starting at LASU.",
      },
      {
        key: "social_links",
        label: "Social links",
        type: "lines",
        help: "One per line, as 'Label | URL'. Recognized labels (Instagram, X, LinkedIn) get their icon automatically — anything else gets a plain link icon. Leave blank to hide the row.",
        default: "",
      },
      {
        key: "contact_email",
        label: "Contact email",
        type: "text",
        default: "Quadrio699@gmail.com",
      },
    ],
  },
  {
    id: "home",
    label: "Home",
    description: "The landing page — hero, the problem framing, and the closing call to action.",
    fields: [
      {
        key: "hero_title",
        label: "Hero headline",
        type: "text",
        default: "Learning shouldn't stop where the signal does.",
      },
      {
        key: "hero_body",
        label: "Hero paragraph",
        type: "textarea",
        default:
          "NODE is a decentralized, offline-first server that keeps course materials, mirrors, and campus resources available even when the connection isn't. It runs locally first, and syncs when it can.",
      },
      {
        key: "problem_heading",
        label: "Problem section heading",
        type: "text",
        default: "Connectivity is the gate. NODE removes it.",
      },
      {
        key: "problem_body",
        label: "Problem section paragraph",
        type: "textarea",
        default:
          "Most learning platforms assume a stable connection. On many campuses, that assumption breaks down daily — power fluctuates, data runs out, and access becomes a matter of timing rather than ability. NODE flips the order: content lives on a local server first, reachable over the campus network with no data plan required, and syncs to the cloud whenever a real connection appears.",
      },
      {
        key: "home_campus_eyebrow",
        label: "Campus callout — small label",
        type: "text",
        default: "Currently deployed",
      },
      {
        key: "home_campus_heading",
        label: "Campus callout — heading",
        type: "text",
        default: "Live in pilot at Lagos State University",
      },
      {
        key: "home_campus_body",
        label: "Campus callout — paragraph",
        type: "textarea",
        default:
          "NODE's first deployment is on LASU's campus, built alongside student leadership to reach students where connectivity is least reliable — hostels, lecture halls, and reading rooms.",
      },
      {
        key: "home_stats",
        label: "Campus callout — stats box",
        type: "lines",
        help: "One per line, as 'Label | Value' — e.g. 'Active users | 480'. Leave blank to hide the box.",
        default: "",
      },
      {
        key: "home_news_heading",
        label: "Built in the open — heading",
        type: "text",
        help: "The heading above the three most recent updates on the home page.",
        default: "Built in the open",
      },
      {
        key: "home_news_body",
        label: "Built in the open — intro line",
        type: "textarea",
        default: "",
      },
      {
        key: "home_cta_heading",
        label: "Closing CTA — heading",
        type: "text",
        default: "Building infrastructure for the offline moments.",
      },
      {
        key: "home_cta_body",
        label: "Closing CTA — paragraph",
        type: "textarea",
        default:
          "Partnering with a campus, an institution, or backing what comes next — start here.",
      },
    ],
  },
  {
    id: "how",
    label: "How It Works",
    description:
      "The explainer page. Steps are managed separately in the 'How It Works steps' list below the settings.",
    fields: [
      {
        key: "hiw_title",
        label: "Page headline",
        type: "text",
        default: "Built to work before the internet does.",
      },
      {
        key: "hiw_intro",
        label: "Page intro",
        type: "textarea",
        default:
          "NODE inverts the usual order. Instead of treating a live connection as a given and offline mode as an afterthought, the local server is the primary source of truth — the internet is just how it stays up to date.",
      },
      {
        key: "hiw_usual_heading",
        label: "Comparison — left heading",
        type: "text",
        default: "The usual way",
      },
      {
        key: "hiw_usual_list",
        label: "Comparison — left points",
        type: "lines",
        help: "One point per line.",
        default:
          "Every page load depends on a live connection.\nNo connection means no access — full stop.\nData costs fall on the student, every visit.",
      },
      {
        key: "hiw_node_heading",
        label: "Comparison — right heading",
        type: "text",
        default: "The NODE way",
      },
      {
        key: "hiw_node_list",
        label: "Comparison — right points",
        type: "lines",
        help: "One point per line.",
        default:
          "Content is already on the local network.\nOffline moments don't block access to what's already synced.\nData is only needed for the sync, not every visit.",
      },
      {
        key: "hiw_cta_body",
        label: "Closing line",
        type: "textarea",
        default:
          "Curious about the technical details for your institution or organization?",
      },
    ],
  },
  {
    id: "campus",
    label: "For Campus",
    description:
      "The student and staff page. FAQs are managed separately in the 'Campus FAQs' list below the settings.",
    fields: [
      {
        key: "campus_eyebrow",
        label: "Small label",
        type: "text",
        default: "For LASU students & staff",
      },
      {
        key: "campus_title",
        label: "Page headline",
        type: "text",
        default: "NODE is live on campus.",
      },
      {
        key: "campus_body",
        label: "Page intro",
        type: "textarea",
        default:
          "Built with student leadership at Lagos State University, starting in the places connectivity is least reliable — hostels, lecture halls, and reading rooms.",
      },
      {
        key: "campus_status_heading",
        label: "Deployment status — heading",
        type: "text",
        default: "Deployment status",
      },
      {
        key: "campus_status_body",
        label: "Deployment status — details",
        type: "textarea",
        help: "Coverage area, active users, hours of availability, planned expansion.",
        default:
          "Add current rollout details here — coverage area, number of active users, hours of availability, and any planned expansion.",
      },
      {
        key: "campus_status_items",
        label: "Deployment status — figures",
        type: "lines",
        help: "One per line, as 'Label | Value' — e.g. 'Uptime | 98%'. Leave blank to hide.",
        default: "",
      },
    ],
  },
  {
    id: "investors",
    label: "For Investors",
    description: "The partners, press, and investors page.",
    fields: [
      {
        key: "investors_eyebrow",
        label: "Small label",
        type: "text",
        default: "For partners, press & investors",
      },
      {
        key: "investors_title",
        label: "Page headline",
        type: "text",
        default: "Digital equity, built for the places connectivity forgets.",
      },
      {
        key: "investors_body",
        label: "Page intro",
        type: "textarea",
        default:
          "NODE started as a way to solve a problem in one place — a campus where the internet couldn't be relied on. The same problem exists across schools, estates, and institutions wherever connectivity is inconsistent rather than absent.",
      },
      {
        key: "investors_opportunity_heading",
        label: "Opportunity — heading",
        type: "text",
        default: "The opportunity",
      },
      {
        key: "investors_opportunity_body",
        label: "Opportunity — paragraph",
        type: "textarea",
        default:
          "Most edtech is built for the best-case connection. NODE is built for the worst-case one — and still delivers the same value there. That makes it viable in exactly the environments where most platforms quietly fail.",
      },
      {
        key: "investors_status_heading",
        label: "Traction — heading",
        type: "text",
        default: "Where we are",
      },
      {
        key: "investors_status_body",
        label: "Traction — paragraph",
        type: "textarea",
        default:
          "A working pilot is live at Lagos State University. Add current milestones, partnerships, and figures here as the pilot progresses.",
      },
      {
        key: "investors_metrics",
        label: "Traction — figures",
        type: "lines",
        help: "One per line, as 'Label | Value'. Leave blank to hide.",
        default: "",
      },
      {
        key: "investors_deck_url",
        label: "Pitch deck link",
        type: "url",
        help: "Leave blank to show it as 'coming soon' instead of a live link.",
        default: "",
      },
      {
        key: "investors_presskit_url",
        label: "Press kit link",
        type: "url",
        help: "Leave blank to show it as 'coming soon' instead of a live link.",
        default: "",
      },
    ],
  },
  {
    id: "news",
    label: "News page",
    description:
      "Headings for the updates page. The updates themselves are managed in the Updates tab.",
    fields: [
      {
        key: "news_title",
        label: "Page headline",
        type: "text",
        default: "Updates",
      },
      {
        key: "news_intro",
        label: "Page intro",
        type: "textarea",
        default:
          "Milestones, deployments, and progress on NODE, posted as they happen.",
      },
    ],
  },
  {
    id: "about",
    label: "About / Story",
    description:
      "The story behind NODE. Founder and team members are managed in the Team tab.",
    fields: [
      {
        key: "about_title",
        label: "Page headline",
        type: "text",
        default: "Why NODE exists",
      },
      {
        key: "about_intro",
        label: "Page intro",
        type: "textarea",
        default:
          "NODE is built by Quadri Marvellous Al-ameen, a self-taught full-stack developer and physics educator based in Lagos, Nigeria — and part of the Quadri Marvellous Initiative, a group of civic-tech and infrastructure projects built for low-connectivity environments.",
      },
      {
        key: "about_story_heading",
        label: "Story — heading",
        type: "text",
        default: "From the classroom",
      },
      {
        key: "about_story_body",
        label: "Story — paragraph",
        type: "textarea",
        default:
          "Before building software, Marvellous taught physics. That vantage point — watching lessons stall because a page wouldn't load, or resources being unreachable at the exact moment students needed them — is what shaped NODE's starting premise: build for the disconnected moment, not around it.",
      },
      {
        key: "about_initiative_heading",
        label: "Initiative — heading",
        type: "text",
        default: "A wider initiative",
      },
      {
        key: "about_initiative_body",
        label: "Initiative — paragraph",
        type: "textarea",
        default:
          "NODE is one project under the Quadri Marvellous Initiative, alongside other civic-tech tools aimed at making infrastructure work in low-connectivity conditions rather than assuming them away.",
      },
      {
        key: "about_links",
        label: "Elsewhere links",
        type: "lines",
        help: "One per line, as 'Label | URL'.",
        default:
          "Portfolio | https://marvellous-dev-portfolio.vercel.app\nWriting on Substack | https://quadrimarvellous.substack.com",
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    description: "The contact page copy.",
    fields: [
      {
        key: "contact_title",
        label: "Page headline",
        type: "text",
        default: "Get in touch",
      },
      {
        key: "contact_body",
        label: "Page intro",
        type: "textarea",
        default:
          "Campus partnerships, press inquiries, or backing what comes next — reach out and we'll follow up directly.",
      },
    ],
  },
    {
    id: "seo",
    label: "SEO",
    description:
      "Search engine settings for the homepage and individual pages.",
    fields: [
      {
        key: "seo_site_title",
        label: "Site title",
        type: "text",
        help: "The main title Google and social platforms can use for NODE.",
        default: "NODE — Network of Digital Equity",
      },
      {
        key: "seo_site_description",
        label: "Site description",
        type: "textarea",
        help: "A short description of NODE for search engines and social sharing.",
        default:
          "Project NODE is a decentralized, offline-first student server that keeps educational materials available on campuses when internet connectivity is unreliable.",
      },
      {
        key: "seo_home_title",
        label: "Home page title",
        type: "text",
        default:
          "NODE — Offline-First Student Server for Campus Learning",
      },
      {
        key: "seo_home_description",
        label: "Home page description",
        type: "textarea",
        default:
          "Project NODE is a decentralized, offline-first student server that keeps educational materials available on campus when internet connectivity is unreliable.",
      },
      {
        key: "seo_how_title",
        label: "How It Works title",
        type: "text",
        default: "How NODE Works — Offline-First Learning Infrastructure",
      },
      {
        key: "seo_how_description",
        label: "How It Works description",
        type: "textarea",
        default:
          "Learn how Project NODE stores educational content locally, serves students over a campus network, and synchronizes with the internet when connectivity returns.",
      },
      {
        key: "seo_campus_title",
        label: "For Campus title",
        type: "text",
        default:
          "NODE for Campuses — Reliable Learning Without Constant Internet",
      },
      {
        key: "seo_campus_description",
        label: "For Campus description",
        type: "textarea",
        default:
          "See how Project NODE helps students access course materials and campus resources locally, even when internet connectivity is unreliable.",
      },
      {
        key: "seo_investors_title",
        label: "For Investors title",
        type: "text",
        default:
          "Project NODE — Digital Infrastructure for Low-Connectivity Environments",
      },
      {
        key: "seo_investors_description",
        label: "For Investors description",
        type: "textarea",
        default:
          "Explore Project NODE's offline-first infrastructure, campus deployment, partnerships and plans for expanding reliable digital access.",
      },
      {
        key: "seo_news_title",
        label: "News title",
        type: "text",
        default: "NODE News & Updates — Project Progress and Deployments",
      },
      {
        key: "seo_news_description",
        label: "News description",
        type: "textarea",
        default:
          "Follow Project NODE's deployments, milestones, partnerships, announcements and progress toward more reliable digital access for students.",
      },
      {
        key: "seo_about_title",
        label: "About title",
        type: "text",
        default: "About Project NODE — Network of Digital Equity",
      },
      {
        key: "seo_about_description",
        label: "About description",
        type: "textarea",
        default:
          "Learn why Project NODE was created, the problem it addresses, and the people building an offline-first approach to educational access.",
      },
      {
        key: "seo_contact_title",
        label: "Contact title",
        type: "text",
        default:
          "Contact Project NODE — Partnerships, Press & Inquiries",
      },
      {
        key: "seo_contact_description",
        label: "Contact description",
        type: "textarea",
        default:
          "Contact Project NODE about campus partnerships, press inquiries, deployments, collaboration and opportunities to support the project.",
      },
    ],
  },
];

export const ALL_FIELDS: FieldDef[] = SETTINGS_GROUPS.flatMap((g) => g.fields);

export const DEFAULTS: Record<string, string> = Object.fromEntries(
  ALL_FIELDS.map((f) => [f.key, f.default])
);

export type Settings = Record<string, string>;

/**
 * Reads saved settings from Supabase and layers them over the defaults,
 * so an unsaved (or blank-on-purpose) key always falls back sensibly.
 */
export async function getSettings(): Promise<Settings> {
  if (!supabase) return { ...DEFAULTS };

  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error || !data) return { ...DEFAULTS };

  const saved: Settings = {};
  for (const row of data as { key: string; value: string | null }[]) {
    if (row.value !== null) saved[row.key] = row.value;
  }

  return { ...DEFAULTS, ...saved };
}

/** Splits a "lines" field into trimmed, non-empty lines. */
export function toLines(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Parses "Label | Value" lines into pairs. */
export function toPairs(value: string | undefined): { label: string; value: string }[] {
  return toLines(value).map((line) => {
    const [label, ...rest] = line.split("|");
    return { label: label.trim(), value: rest.join("|").trim() };
  });
}
