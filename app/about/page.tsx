import type { Metadata } from "next";
import { supabase, type TeamMemberRow } from "@/lib/supabaseClient";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/teamData";
import { getSettings, toPairs } from "@/lib/siteContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings.seo_about_title,
    description: settings.seo_about_description,
  };
}

async function getTeam(): Promise<TeamMember[]> {
  if (!supabase) return TEAM_MEMBERS;

  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, role, bio, photo_url, display_order, created_at")
    .order("display_order", { ascending: true });

  if (error || !data || data.length === 0) return TEAM_MEMBERS;

  return (data as TeamMemberRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    photoUrl: row.photo_url,
  }));
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function AboutPage() {
  const [team, settings] = await Promise.all([getTeam(), getSettings()]);
  const links = toPairs(settings.about_links);

  return (
    <>
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
            {settings.about_title}
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink/75">
            {settings.about_intro}
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              {settings.about_story_heading}
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/75">
              {settings.about_story_body}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              {settings.about_initiative_heading}
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/75">
              {settings.about_initiative_body}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold text-navy">
            Founder &amp; team
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <div key={person.id} className="rounded-lg border border-line bg-paper p-6">
                <div className="flex items-center gap-3">
                  {person.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={person.photoUrl}
                      alt={person.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-display text-sm font-semibold text-white">
                      {initials(person.name)}
                    </div>
                  )}
                  <div>
                    <p className="font-display text-base font-semibold text-navy">
                      {person.name}
                    </p>
                    <p className="font-body text-xs font-medium text-blue">
                      {person.role}
                    </p>
                  </div>
                </div>
                <p className="mt-4 font-body text-sm leading-relaxed text-ink/70">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold text-navy">
            Elsewhere
          </h2>
          <ul className="mt-6 space-y-3 font-body text-sm">
            {links.map((link) => (
              <li key={link.value}>
                <a
                  href={link.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue hover:text-navy"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
