function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.53 10.5 20.8 2h-1.72l-6.32 7.39L7.72 2H2l7.63 11.12L2 22h1.72l6.68-7.81L15.98 22h5.72l-8.17-11.5Zm-2.37 2.77-.77-1.1L4.3 3.3h2.64l4.98 7.13.77 1.1 6.48 9.27h-2.64l-5.37-7.53Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.5 14.5 14.5 9.5M11 6.5l1-1a3.5 3.5 0 0 1 5 5l-1 1M13 17.5l-1 1a3.5 3.5 0 0 1-5-5l1-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function iconFor(label: string) {
  const key = label.trim().toLowerCase();
  if (key === "instagram") return <InstagramIcon />;
  if (key === "x" || key === "twitter") return <XIcon />;
  if (key === "linkedin") return <LinkedInIcon />;
  return <LinkIcon />;
}

export default function SocialLinks({
  links,
  className = "",
}: {
  links: { label: string; value: string }[];
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <div className={["flex items-center gap-3", className].filter(Boolean).join(" ")}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.value}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold/60 hover:text-gold"
        >
          {iconFor(link.label)}
        </a>
      ))}
    </div>
  );
}
