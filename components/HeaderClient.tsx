"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/campus", label: "For Campus" },
  { href: "/investors", label: "For Investors" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
];

export default function HeaderClient({ portalUrl }: { portalUrl: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="h-[3px] w-full bg-gradient-to-r from-navy via-signal to-gold" />
      <div
        className={`bg-paper/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_1px_0_0_rgba(11,31,58,0.08)]" : ""
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.jpg"
              alt="NODE — Network of Digital Equity"
              width={36}
              height={36}
              className="rounded-full"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-medium tracking-tight text-navy">
                NODE
              </span>
              <span className="mt-0.5 hidden font-body text-[10px] font-medium uppercase tracking-[0.12em] text-ink/55 sm:block">
                Network of Digital Equity
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-ink/80 transition-colors hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-navy px-4 py-2 font-body text-sm font-medium text-white transition-colors hover:bg-blue"
            >
              Open the Portal
            </a>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-md md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-navy transition-transform ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-navy transition-opacity ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 bg-navy transition-transform ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-line bg-paper md:hidden">
            <nav className="container-page flex flex-col gap-1 py-3">
              <p className="px-2 pb-2 font-body text-[10px] font-medium uppercase tracking-[0.12em] text-ink/55 sm:hidden">
                Network of Digital Equity
              </p>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-2 py-2.5 font-body text-sm text-ink/80 hover:bg-white hover:text-navy"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-md bg-navy px-4 py-2.5 text-center font-body text-sm font-medium text-white"
              >
                Open the Portal
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
