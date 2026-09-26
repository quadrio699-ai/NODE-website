"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { SETTINGS_GROUPS, DEFAULTS } from "@/lib/siteContent";
import SettingsSection from "@/components/admin/SettingsSection";
import ListSection from "@/components/admin/ListSection";
import NewsSection from "@/components/admin/NewsSection";

const TABS = [
  { id: "global", label: "Global" },
  { id: "home", label: "Home" },
  { id: "how", label: "How It Works" },
  { id: "campus", label: "For Campus" },
  { id: "investors", label: "For Investors" },
  { id: "news", label: "News" },
  { id: "about", label: "About & Team" },
  { id: "contact", label: "Contact" },
  { id: "seo", label: "SEO" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState("global");
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULTS);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin");
      } else {
        setChecked(true);
        loadSettings();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadSettings() {
    if (!supabase) return;
    const { data } = await supabase.from("site_settings").select("key, value");
    const saved: Record<string, string> = {};
    for (const row of (data as { key: string; value: string | null }[]) || []) {
      if (row.value !== null) saved[row.key] = row.value;
    }
    setSettings({ ...DEFAULTS, ...saved });
  }

  async function handleSignOut() {
    await supabase?.auth.signOut();
    router.push("/admin");
  }

  if (!supabase) {
    return (
      <section className="bg-paper py-20">
        <div className="container-page">
          <p className="font-body text-sm text-ink/70">
            Supabase isn&apos;t configured yet — add your environment
            variables and run supabase/schema.sql.
          </p>
        </div>
      </section>
    );
  }

  if (!checked) {
    return (
      <section className="bg-paper py-20">
        <div className="container-page font-body text-sm text-ink/60">
          Loading...
        </div>
      </section>
    );
  }

  const group = SETTINGS_GROUPS.find((g) => g.id === tab);

  return (
    <section className="bg-paper py-12">
      <div className="container-page">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-navy">
              Site editor
            </h1>
            <p className="mt-1 font-body text-sm text-ink/60">
              Everything here is live copy — edits show on the site within a
              minute, no redeploy needed.
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="font-body text-sm text-ink/60 hover:text-navy"
          >
            Sign out
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-md px-3.5 py-2 font-body text-sm transition-colors ${
                tab === t.id
                  ? "bg-navy text-white"
                  : "text-ink/70 hover:bg-white hover:text-navy"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-8">
          {group && (
            <SettingsSection
              key={group.id}
              group={group}
              values={settings}
              onSaved={(updated) =>
                setSettings((s) => ({ ...s, ...updated }))
              }
            />
          )}

          {tab === "how" && (
            <ListSection
              table="how_it_works_steps"
              title="How It Works steps"
              description="The numbered steps on the How It Works page. The first three also appear on the home page."
              primaryKey="title"
              fields={[
                { key: "title", label: "Step title", type: "text" },
                { key: "body", label: "Step description", type: "textarea" },
              ]}
              emptyNote="No steps saved yet — the site shows the five built-in default steps until you add your own."
            />
          )}

          {tab === "campus" && (
            <ListSection
              table="faq_items"
              title="Campus FAQs"
              description="The common questions shown at the bottom of the For Campus page."
              primaryKey="question"
              fields={[
                { key: "question", label: "Question", type: "text" },
                { key: "answer", label: "Answer", type: "textarea" },
              ]}
              emptyNote="No FAQs saved yet — the site shows the three built-in defaults until you add your own."
            />
          )}

          {tab === "news" && <NewsSection />}

          {tab === "about" && (
            <ListSection
              table="team_members"
              title="Founder & team"
              description="Everyone shown in the Founder & team section on the About page."
              primaryKey="name"
              secondaryKey="role"
              fields={[
                { key: "name", label: "Name", type: "text" },
                {
                  key: "role",
                  label: "Role",
                  type: "text",
                  placeholder: "Founder, Developer, Contributor...",
                },
                { key: "bio", label: "Bio", type: "textarea" },
                {
                  key: "photo_url",
                  label: "Photo URL",
                  type: "url",
                  required: false,
                  placeholder: "https://...",
                },
              ]}
              emptyNote="No team members yet — the About page shows the default founder card until you add one."
            />
          )}
        </div>
      </div>
    </section>
  );
}
