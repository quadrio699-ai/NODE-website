"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, type NewsPostRow, type TeamMemberRow } from "@/lib/supabaseClient";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [posts, setPosts] = useState<NewsPostRow[]>([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [team, setTeam] = useState<TeamMemberRow[]>([]);
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [memberBio, setMemberBio] = useState("");
  const [memberPhoto, setMemberPhoto] = useState("");
  const [savingMember, setSavingMember] = useState(false);
  const [teamMessage, setTeamMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin");
      } else {
        setChecked(true);
        loadPosts();
        loadTeam();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPosts() {
    if (!supabase) return;
    const { data } = await supabase
      .from("news_posts")
      .select("id, title, summary, slug, published, created_at")
      .order("created_at", { ascending: false });
    setPosts((data as NewsPostRow[]) || []);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !title || !summary) return;
    setSaving(true);
    const { error } = await supabase.from("news_posts").insert({
      title,
      summary,
      slug: slugify(title),
      published: true,
    });
    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setTitle("");
    setSummary("");
    setMessage("Update posted.");
    loadPosts();
  }

  async function togglePublished(post: NewsPostRow) {
    if (!supabase) return;
    await supabase
      .from("news_posts")
      .update({ published: !post.published })
      .eq("id", post.id);
    loadPosts();
  }

  async function deletePost(id: string) {
    if (!supabase) return;
    await supabase.from("news_posts").delete().eq("id", id);
    loadPosts();
  }

  async function loadTeam() {
    if (!supabase) return;
    const { data } = await supabase
      .from("team_members")
      .select("id, name, role, bio, photo_url, display_order, created_at")
      .order("display_order", { ascending: true });
    setTeam((data as TeamMemberRow[]) || []);
  }

  async function handleCreateMember(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !memberName || !memberRole || !memberBio) return;
    setSavingMember(true);
    const { error } = await supabase.from("team_members").insert({
      name: memberName,
      role: memberRole,
      bio: memberBio,
      photo_url: memberPhoto || null,
      display_order: team.length,
    });
    setSavingMember(false);
    if (error) {
      setTeamMessage(error.message);
      return;
    }
    setMemberName("");
    setMemberRole("");
    setMemberBio("");
    setMemberPhoto("");
    setTeamMessage("Team member added.");
    loadTeam();
  }

  async function deleteMember(id: string) {
    if (!supabase) return;
    await supabase.from("team_members").delete().eq("id", id);
    loadTeam();
  }

  async function handleSignOut() {
    await supabase?.auth.signOut();
    router.push("/admin");
  }

  if (!supabase || !checked) {
    return <section className="bg-paper py-20"><div className="container-page">Loading...</div></section>;
  }

  return (
    <section className="bg-paper py-16">
      <div className="container-page">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold text-navy">
            Dashboard
          </h1>
          <button
            onClick={handleSignOut}
            className="font-body text-sm text-ink/60 hover:text-navy"
          >
            Sign out
          </button>
        </div>

        <form onSubmit={handleCreate} className="mt-8 max-w-xl space-y-4 rounded-lg border border-line bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-navy">Post an update</h2>
          <div>
            <label className="font-body text-sm font-medium text-navy">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 font-body text-sm outline-none focus-visible:border-navy"
            />
          </div>
          <div>
            <label className="font-body text-sm font-medium text-navy">Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              rows={3}
              className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 font-body text-sm outline-none focus-visible:border-navy"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-navy px-5 py-2.5 font-body text-sm font-medium text-white hover:bg-blue disabled:opacity-60"
          >
            {saving ? "Posting..." : "Publish update"}
          </button>
          {message && <p className="font-body text-sm text-blue">{message}</p>}
        </form>

        <div className="mt-10 divide-y divide-line border-t border-line">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-body text-sm font-medium text-navy">{post.title}</p>
                <p className="font-body text-xs text-ink/50">
                  {post.published ? "Published" : "Hidden"} ·{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => togglePublished(post)}
                  className="font-body text-sm text-blue hover:text-navy"
                >
                  {post.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="font-body text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="py-6 font-body text-sm text-ink/50">No updates yet.</p>
          )}
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold text-navy">
          Founder &amp; team
        </h2>

        <form onSubmit={handleCreateMember} className="mt-8 max-w-xl space-y-4 rounded-lg border border-line bg-white p-6">
          <h3 className="font-display text-lg font-semibold text-navy">Add a team member</h3>
          <div>
            <label className="font-body text-sm font-medium text-navy">Name</label>
            <input
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              required
              className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 font-body text-sm outline-none focus-visible:border-navy"
            />
          </div>
          <div>
            <label className="font-body text-sm font-medium text-navy">Role</label>
            <input
              value={memberRole}
              onChange={(e) => setMemberRole(e.target.value)}
              placeholder="Founder, Developer, Contributor..."
              required
              className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 font-body text-sm outline-none focus-visible:border-navy"
            />
          </div>
          <div>
            <label className="font-body text-sm font-medium text-navy">Bio</label>
            <textarea
              value={memberBio}
              onChange={(e) => setMemberBio(e.target.value)}
              required
              rows={3}
              className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 font-body text-sm outline-none focus-visible:border-navy"
            />
          </div>
          <div>
            <label className="font-body text-sm font-medium text-navy">
              Photo URL <span className="font-normal text-ink/50">(optional)</span>
            </label>
            <input
              value={memberPhoto}
              onChange={(e) => setMemberPhoto(e.target.value)}
              placeholder="https://..."
              className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 font-body text-sm outline-none focus-visible:border-navy"
            />
          </div>
          <button
            type="submit"
            disabled={savingMember}
            className="rounded-md bg-navy px-5 py-2.5 font-body text-sm font-medium text-white hover:bg-blue disabled:opacity-60"
          >
            {savingMember ? "Adding..." : "Add to team"}
          </button>
          {teamMessage && <p className="font-body text-sm text-blue">{teamMessage}</p>}
        </form>

        <div className="mt-10 divide-y divide-line border-t border-line">
          {team.map((member) => (
            <div key={member.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-body text-sm font-medium text-navy">
                  {member.name} <span className="text-ink/50">— {member.role}</span>
                </p>
                <p className="mt-0.5 max-w-md font-body text-xs text-ink/50">{member.bio}</p>
              </div>
              <button
                onClick={() => deleteMember(member.id)}
                className="whitespace-nowrap font-body text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          ))}
          {team.length === 0 && (
            <p className="py-6 font-body text-sm text-ink/50">
              No team members yet — the About page will show the default
              founder placeholder until you add one.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
