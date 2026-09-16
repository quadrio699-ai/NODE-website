"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type ListField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url";
  required?: boolean;
  placeholder?: string;
};

type Row = Record<string, any> & { id: string; display_order: number };

/**
 * Reusable CRUD editor for any ordered table (steps, FAQs, team members).
 * Handles add, inline edit, reorder, and delete.
 */
export default function ListSection({
  table,
  title,
  description,
  fields,
  primaryKey,
  secondaryKey,
  emptyNote,
}: {
  table: string;
  title: string;
  description: string;
  fields: ListField[];
  primaryKey: string;
  secondaryKey?: string;
  emptyNote: string;
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    if (!supabase) return;
    const { data } = await supabase
      .from(table)
      .select("*")
      .order("display_order", { ascending: true });
    setRows((data as Row[]) || []);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    const missing = fields.some((f) => f.required !== false && !draft[f.key]);
    if (missing) return;

    setSaving(true);
    const payload: Record<string, any> = { display_order: rows.length };
    for (const f of fields) payload[f.key] = draft[f.key] || null;

    const { error } = await supabase.from(table).insert(payload);
    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setDraft({});
    setMessage("Added.");
    load();
  }

  async function handleUpdate(id: string) {
    if (!supabase) return;
    const payload: Record<string, any> = {};
    for (const f of fields) payload[f.key] = editDraft[f.key] || null;
    const { error } = await supabase.from(table).update(payload).eq("id", id);
    if (error) {
      setMessage(error.message);
      return;
    }
    setEditingId(null);
    setMessage("Updated.");
    load();
  }

  async function move(index: number, direction: -1 | 1) {
    if (!supabase) return;
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    const a = rows[index];
    const b = rows[target];
    await supabase.from(table).update({ display_order: target }).eq("id", a.id);
    await supabase.from(table).update({ display_order: index }).eq("id", b.id);
    load();
  }

  async function remove(id: string) {
    if (!supabase) return;
    await supabase.from(table).delete().eq("id", id);
    load();
  }

  function startEdit(row: Row) {
    setEditingId(row.id);
    setEditDraft(
      Object.fromEntries(fields.map((f) => [f.key, row[f.key] ?? ""]))
    );
  }

  function renderInput(
    field: ListField,
    value: string,
    onChange: (v: string) => void
  ) {
    const cls =
      "mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 font-body text-sm outline-none focus-visible:border-navy";
    return field.type === "textarea" ? (
      <textarea
        rows={3}
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cls}
      />
    ) : (
      <input
        type={field.type === "url" ? "url" : "text"}
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cls}
      />
    );
  }

  return (
    <div className="rounded-lg border border-line bg-white p-6">
      <h2 className="font-display text-lg font-semibold text-navy">{title}</h2>
      <p className="mt-1 max-w-xl font-body text-sm text-ink/60">{description}</p>

      <form onSubmit={handleAdd} className="mt-6 space-y-4 rounded-md bg-paper p-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="font-body text-sm font-medium text-navy">
              {field.label}
              {field.required === false && (
                <span className="font-normal text-ink/50"> (optional)</span>
              )}
            </label>
            {renderInput(field, draft[field.key] ?? "", (v) =>
              setDraft((d) => ({ ...d, [field.key]: v }))
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-navy px-5 py-2.5 font-body text-sm font-medium text-white hover:bg-blue disabled:opacity-60"
        >
          {saving ? "Adding..." : "Add"}
        </button>
        {message && <p className="font-body text-sm text-blue">{message}</p>}
      </form>

      <div className="mt-6 divide-y divide-line border-t border-line">
        {rows.map((row, i) => (
          <div key={row.id} className="py-4">
            {editingId === row.id ? (
              <div className="space-y-4">
                {fields.map((field) => (
                  <div key={field.key}>
                    <label className="font-body text-sm font-medium text-navy">
                      {field.label}
                    </label>
                    {renderInput(field, editDraft[field.key] ?? "", (v) =>
                      setEditDraft((d) => ({ ...d, [field.key]: v }))
                    )}
                  </div>
                ))}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdate(row.id)}
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
                    {i + 1}. {row[primaryKey]}
                    {secondaryKey && (
                      <span className="text-ink/50"> — {row[secondaryKey]}</span>
                    )}
                  </p>
                  {fields
                    .filter((f) => f.type === "textarea")
                    .map((f) => (
                      <p
                        key={f.key}
                        className="mt-1 max-w-xl font-body text-xs leading-relaxed text-ink/55"
                      >
                        {row[f.key]}
                      </p>
                    ))}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="font-body text-sm text-ink/50 hover:text-navy disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === rows.length - 1}
                    aria-label="Move down"
                    className="font-body text-sm text-ink/50 hover:text-navy disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => startEdit(row)}
                    className="font-body text-sm text-blue hover:text-navy"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(row.id)}
                    className="font-body text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {rows.length === 0 && (
          <p className="py-6 font-body text-sm text-ink/50">{emptyNote}</p>
        )}
      </div>
    </div>
  );
}
