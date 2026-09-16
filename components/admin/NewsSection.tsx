"use client";

import { useEffect, useState } from "react";
import { supabase, type NewsPostRow } from "@/lib/supabaseClient";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function NewsSection() {
  const [posts, setPosts] = useState<NewsPostRow[]>([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSummary, setEditSummary] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
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
      slug: `${slugify(title)}-${Date.now().toString(36)}`,
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
    load();
  }

  async function handleUpdate(id: string) {
    if (!supabase) return;
    const { error } = await supabase
      .from("news_posts")
      .update({ title: editTitle, summary: editSummary })
      .eq("id", id);
    if (error) {
      setMessage(error.message);
      return;
    }
    setEditingId(null);
    load();
  }

  async function togglePublished(post: NewsPostRow) {
    if (!supabase) return;
    await supabase
      .from("news_posts")
      .update({ published: !post.published })
      .eq("id", post.id);
    load();
  }

  async function deletePost(id: string) {
    if (!supabase) return;
    await supabase.from("news_posts").delete().eq("id", id);
    load();
  }

  return (
    <div className="rounded-lg border border-line bg-white p-6">
      <h2 className="font-display text-lg font-semibold text-navy">
        Updates
      </h2>
      <p className="mt-1 max-w-xl font-body text-sm text-ink/60">
        Milestones and progress notes. These fill the &quot;Built in the
        open&quot; section on the home page and the full News page.
      </p>

      <form onSubmit={handleCreate} className="mt-6 space-y-4 rounded-md bg-paper p-5">
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

      <div className="mt-6 divide-y divide-line border-t border-line">
        {posts.map((post) => (
          <div key={post.id} className="py-4">
            {editingId === post.id ? (
              <div className="space-y-4">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-md border border-line px-3.5 py-2.5 font-body text-sm outline-none focus-visible:border-navy"
                />
                <textarea
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-line px-3.5 py-2.5 font-body text-sm outline-none focus-visible:border-navy"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdate(post.id)}
                    className="rounded-md bg-navy px-4 py-2 font-body text-sm font-medium text-white hover:bg-blue"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="font-body text-sm text-ink/60 hover:text-navy"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-body text-sm font-medium text-navy">
                    {post.title}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-ink/50">
                    {post.published ? "Published" : "Hidden"} ·{" "}
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex shrink-0 gap-3">
                  <button
                    onClick={() => {
                      setEditingId(post.id);
                      setEditTitle(post.title);
                      setEditSummary(post.summary);
                    }}
                    className="font-body text-sm text-blue hover:text-navy"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => togglePublished(post)}
                    className="font-body text-sm text-ink/60 hover:text-navy"
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
            )}
          </div>
        ))}
        {posts.length === 0 && (
          <p className="py-6 font-body text-sm text-ink/50">No updates yet.</p>
        )}
      </div>
    </div>
  );
}
