"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!supabase) {
    return (
      <section className="bg-paper py-20">
        <div className="container-page max-w-md">
          <h1 className="font-display text-2xl font-semibold text-navy">
            Admin not configured yet
          </h1>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink/70">
            Add <code className="rounded bg-white px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
            and{" "}
            <code className="rounded bg-white px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
            to your environment, run <code className="rounded bg-white px-1.5 py-0.5">supabase/schema.sql</code>{" "}
            in your Supabase project, and create yourself a user under
            Authentication in the Supabase dashboard.
          </p>
        </div>
      </section>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <section className="bg-paper py-20">
      <div className="container-page max-w-sm">
        <h1 className="font-display text-2xl font-semibold text-navy">
          Admin sign in
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="font-body text-sm font-medium text-navy">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-line bg-white px-3.5 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-navy"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-body text-sm font-medium text-navy">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-line bg-white px-3.5 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-navy"
            />
          </div>
          {error && <p className="font-body text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-navy px-5 py-2.5 font-body text-sm font-medium text-white hover:bg-blue disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}
