import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// During local setup, before env vars are added, `supabase` is null and
// callers should fall back to static content instead of throwing.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export type NewsPostRow = {
  id: string;
  title: string;
  summary: string;
  slug: string;
  published: boolean;
  created_at: string;
};

export type TeamMemberRow = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
  display_order: number;
  created_at: string;
};

export type StepRow = {
  id: string;
  title: string;
  body: string;
  display_order: number;
  created_at: string;
};

export type FaqRow = {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  created_at: string;
};
