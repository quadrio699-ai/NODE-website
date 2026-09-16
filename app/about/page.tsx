import { supabase, type TeamMemberRow } from "@/lib/supabaseClient";
import { TEAM_MEMBERS, type TeamMember } from "@/lib/teamData";

export const revalidate = 60;

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
  const team = await getTeam();

  return (
    <>
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
            Why NODE exists
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink/75">
            NODE is built by Quadri Marvellous Al-ameen, a self-taught
            full-stack developer and physics educator based in Lagos,
            Nigeria — and part of the Quadri Marvellous Initiative, a group
            of civic-tech and infrastructure projects built for
            low-connectivity environments.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              From the classroom
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/75">
              Before building software, Marvellous taught physics. That
              vantage point — watching lessons stall because a page
              wouldn&apos;t load, or resources being unreachable at the
              exact moment students needed them — is what shaped NODE&apos;s
              starting premise: build for the disconnected moment, not
              around it.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              A wider initiative
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/75">
              NODE is one project under the Quadri Marvellous Initiative,
              alongside other civic-tech tools aimed at making
              infrastructure work in low-connectivity conditions rather
              than assuming them away.
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
            <li>
              <a
                href="https://marvellous-dev-portfolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:text-navy"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="https://quadrimarvellous.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:text-navy"
              >
                Writing on Substack
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
