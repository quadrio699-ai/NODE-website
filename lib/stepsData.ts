import { supabase, type StepRow, type FaqRow } from "@/lib/supabaseClient";

export type Step = { id: string; title: string; body: string };
export type Faq = { id: string; question: string; answer: string };

export const DEFAULT_STEPS: Step[] = [
  {
    id: "d1",
    title: "A local-first server",
    body: "A lightweight server runs on the campus network itself, holding course materials, mirrored resources, and campus content — reachable without leaving the local network.",
  },
  {
    id: "d2",
    title: "Access without data",
    body: "Students and staff connect over the campus WiFi or LAN. The portal loads the same way whether or not a mobile data connection exists.",
  },
  {
    id: "d3",
    title: "Content mirrored locally",
    body: "Frequently needed material — open courseware, reference resources, campus documents — is mirrored on the local server, so it doesn't need to be fetched live each time.",
  },
  {
    id: "d4",
    title: "Sync in the background",
    body: "When a real internet connection is available, NODE syncs new content and updates quietly in the background, keeping the local mirror current.",
  },
  {
    id: "d5",
    title: "Resilient by design",
    body: "If the connection drops again, nothing already synced disappears. The local copy keeps working on its own.",
  },
];

export const DEFAULT_FAQS: Faq[] = [
  {
    id: "f1",
    question: "Do I need data to use NODE?",
    answer:
      "No. Once you're connected to the campus network, NODE is reachable without a mobile data plan. A connection is only needed if you're accessing it from off-campus.",
  },
  {
    id: "f2",
    question: "Do I need to install anything?",
    answer:
      "No installation. NODE runs in your browser, on any device connected to the campus network.",
  },
  {
    id: "f3",
    question: "What happens if the network drops mid-session?",
    answer:
      "Anything already loaded or synced stays available. You may lose access to content that hasn't synced yet until the connection returns.",
  },
];

export async function getSteps(): Promise<Step[]> {
  if (!supabase) return DEFAULT_STEPS;
  const { data, error } = await supabase
    .from("how_it_works_steps")
    .select("id, title, body, display_order, created_at")
    .order("display_order", { ascending: true });
  if (error || !data || data.length === 0) return DEFAULT_STEPS;
  return (data as StepRow[]).map((r) => ({
    id: r.id,
    title: r.title,
    body: r.body,
  }));
}

export async function getFaqs(): Promise<Faq[]> {
  if (!supabase) return DEFAULT_FAQS;
  const { data, error } = await supabase
    .from("faq_items")
    .select("id, question, answer, display_order, created_at")
    .order("display_order", { ascending: true });
  if (error || !data || data.length === 0) return DEFAULT_FAQS;
  return (data as FaqRow[]).map((r) => ({
    id: r.id,
    question: r.question,
    answer: r.answer,
  }));
}
