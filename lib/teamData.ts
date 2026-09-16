// Placeholder seed content, shown until real team members are added via
// /admin/dashboard (see the `team_members` table in supabase/schema.sql).

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string | null;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "founder",
    name: "Quadri Marvellous Al-ameen",
    role: "Founder",
    bio: "Self-taught full-stack developer and former physics teacher, building NODE alongside the Quadri Marvellous Initiative from Lagos, Nigeria.",
    photoUrl: null,
  },
];
