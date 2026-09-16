import Link from "next/link";
import NetworkPattern from "@/components/NetworkPattern";
import { NEWS_ITEMS } from "@/lib/newsData";

const PORTAL_URL = "https://project-node.onrender.com";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div className="container-page grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] text-navy md:text-5xl">
              Learning shouldn&apos;t stop where the signal does.
            </h1>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ink/75">
              NODE is a decentralized, offline-first server that keeps course
              materials, mirrors, and campus resources available even when
              the connection isn&apos;t. It runs locally first, and syncs
              when it can.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-navy px-5 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-blue"
              >
                Open the Portal
              </a>
              <Link
                href="/investors"
                className="rounded-md border border-navy/20 px-5 py-3 font-body text-sm font-medium text-navy transition-colors hover:border-navy/40"
              >
                For Partners &amp; Investors
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center">
            <NetworkPattern className="w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* The problem, framed plainly */}
      <section className="border-t border-line bg-white">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1fr_1.2fr] md:py-20">
          <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">
            Connectivity is the gate. NODE removes it.
          </h2>
          <p className="font-body text-base leading-relaxed text-ink/75">
            Most learning platforms assume a stable connection. On many
            campuses, that assumption breaks down daily — power fluctuates,
            data runs out, and access becomes a matter of timing rather than
            ability. NODE flips the order: content lives on a local server
            first, reachable over the campus network with no data plan
            required, and syncs to the cloud whenever a real connection
            appears.
          </p>
        </div>
      </section>

      {/* How it works teaser */}
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">
              How NODE works
            </h2>
            <Link
              href="/how-it-works"
              className="whitespace-nowrap font-body text-sm font-medium text-blue hover:text-navy"
            >
              Full breakdown
            </Link>
          </div>

          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                n: "1",
                title: "Local first",
                body: "A server on the campus network holds course materials and mirrors, reachable without external data.",
              },
              {
                n: "2",
                title: "Access on-site",
                body: "Students and staff connect over the local network from any device — no app install, no signup friction.",
              },
              {
                n: "3",
                title: "Sync when possible",
                body: "When a real connection is available, NODE syncs updates and mirrors new content in the background.",
              },
            ].map((step) => (
              <li key={step.n} className="rounded-lg border border-line bg-white p-6">
                <span className="font-display text-sm font-semibold text-gold">
                  {step.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Campus highlight */}
      <section className="border-t border-line bg-white">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-body text-sm font-medium text-blue">
              Currently deployed
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy md:text-3xl">
              Live in pilot at Lagos State University
            </h2>
            <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink/75">
              NODE&apos;s first deployment is on LASU&apos;s campus, built
              alongside student leadership to reach students where
              connectivity is least reliable — hostels, lecture halls, and
              reading rooms.
            </p>
            <Link
              href="/campus"
              className="mt-6 inline-block font-body text-sm font-medium text-navy hover:text-blue"
            >
              See the campus deployment →
            </Link>
          </div>
          <div className="rounded-lg border border-line bg-paper p-8">
            <p className="font-body text-sm text-ink/60">
              Deployment status, uptime, and reach figures will appear here
              as the pilot progresses.
            </p>
          </div>
        </div>
      </section>

      {/* News teaser */}
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">
              Built in the open
            </h2>
            <Link
              href="/news"
              className="whitespace-nowrap font-body text-sm font-medium text-blue hover:text-navy"
            >
              All updates
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {NEWS_ITEMS.slice(0, 3).map((item) => (
              <article key={item.slug} className="rounded-lg border border-line bg-white p-6">
                <p className="font-body text-xs text-ink/50">{item.date}</p>
                <h3 className="mt-2 font-display text-base font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-line bg-navy">
        <div className="container-page flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
              Building infrastructure for the offline moments.
            </h2>
            <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-white/60">
              Partnering with a campus, an institution, or backing what comes
              next — start here.
            </p>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-md bg-gold px-5 py-3 font-body text-sm font-medium text-navy transition-colors hover:bg-gold/90"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
