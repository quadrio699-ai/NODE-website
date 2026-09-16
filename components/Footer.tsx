import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="font-display text-lg font-medium text-white">NODE</span>
          <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-white/60">
            Network of Digital Equity — a decentralized, offline-first server
            bringing learning materials to campuses with unreliable
            connectivity, starting at LASU.
          </p>
        </div>

        <div>
          <p className="font-body text-xs font-medium uppercase tracking-wide text-gold/90">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 font-body text-sm">
            <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
            <li><Link href="/campus" className="hover:text-white">For Campus</Link></li>
            <li><Link href="/investors" className="hover:text-white">For Investors</Link></li>
            <li><Link href="/news" className="hover:text-white">News</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-body text-xs font-medium uppercase tracking-wide text-gold/90">
            Connect
          </p>
          <ul className="mt-4 space-y-2.5 font-body text-sm">
            <li><Link href="/about" className="hover:text-white">About the Builder</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li>
              <a
                href="https://quadrimarvellous.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Substack Writing
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 font-body text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} NODE. A Quadri Marvellous Initiative project.</p>
          <p>Built for the moments connectivity fails.</p>
        </div>
      </div>
    </footer>
  );
}
