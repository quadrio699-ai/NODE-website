const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const TRAILING_PUNCTUATION = /[.,;:!?)]+$/;

/**
 * Renders plain text, auto-linking any http(s) URLs found inside it.
 * Used for admin-entered copy (like news summaries) where a plain text
 * field is the simplest thing to fill in, but a pasted link should
 * still be clickable without needing any special syntax.
 */
export default function Linkify({ text }: { text: string }) {
  const parts = text.split(URL_REGEX);

  return (
    <>
      {parts.map((part, i) => {
        if (!/^https?:\/\//.test(part)) {
          return <span key={i}>{part}</span>;
        }

        const trailingMatch = part.match(TRAILING_PUNCTUATION);
        const trailing = trailingMatch ? trailingMatch[0] : "";
        const url = trailing ? part.slice(0, -trailing.length) : part;

        return (
          <span key={i}>
            
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue underline hover:text-navy"
            >
              {url}
            </a>
            {trailing}
          </span>
        );
      })}
    </>
  );
}
