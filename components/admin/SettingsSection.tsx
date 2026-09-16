"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { SettingsGroup } from "@/lib/siteContent";

export default function SettingsSection({
  group,
  values,
  onSaved,
}: {
  group: SettingsGroup;
  values: Record<string, string>;
  onSaved: (updated: Record<string, string>) => void;
}) {
  const [draft, setDraft] = useState<Record<string, string>>(() =>
    Object.fromEntries(group.fields.map((f) => [f.key, values[f.key] ?? f.default]))
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setMessage(null);

    const rows = group.fields.map((f) => ({
      key: f.key,
      value: draft[f.key] ?? "",
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("site_settings").upsert(rows, {
      onConflict: "key",
    });

    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("Saved. Changes appear on the site within a minute.");
    onSaved(draft);
  }

  function update(key: string, value: string) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  return (
    <form onSubmit={handleSave} className="rounded-lg border border-line bg-white p-6">
      <h2 className="font-display text-lg font-semibold text-navy">{group.label}</h2>
      <p className="mt-1 max-w-xl font-body text-sm text-ink/60">
        {group.description}
      </p>

      <div className="mt-6 space-y-5">
        {group.fields.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={field.key}
              className="font-body text-sm font-medium text-navy"
            >
              {field.label}
            </label>
            {field.help && (
              <p className="mt-0.5 font-body text-xs text-ink/50">{field.help}</p>
            )}
            {field.type === "textarea" || field.type === "lines" ? (
              <textarea
                id={field.key}
                rows={field.type === "lines" ? 4 : 3}
                value={draft[field.key] ?? ""}
                onChange={(e) => update(field.key, e.target.value)}
                className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 font-body text-sm outline-none focus-visible:border-navy"
              />
            ) : (
              <input
                id={field.key}
                type={field.type === "url" ? "url" : "text"}
                value={draft[field.key] ?? ""}
                onChange={(e) => update(field.key, e.target.value)}
                className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 font-body text-sm outline-none focus-visible:border-navy"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-navy px-5 py-2.5 font-body text-sm font-medium text-white hover:bg-blue disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
        {message && <p className="font-body text-sm text-blue">{message}</p>}
      </div>
    </form>
  );
}
