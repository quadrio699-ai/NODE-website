import Link from "next/link";

const STEPS = [
  {
    n: "1",
    title: "A local-first server",
    body: "A lightweight server runs on the campus network itself, holding course materials, mirrored resources, and campus content — reachable without leaving the local network.",
  },
  {
    n: "2",
    title: "Access without data",
    body: "Students and staff connect over the campus WiFi or LAN. The portal loads the same way whether or not a mobile data connection exists.",
  },
  {
    n: "3",
    title: "Content mirrored locally",
    body: "Frequently needed material — open courseware, reference resources, campus documents — is mirrored on the local server, so it doesn't need to be fetched live each time.",
  },
  {
    n: "4",
    title: "Sync in the background",
    body: "When a real internet connection is available, NODE syncs new content and updates quietly in the background, keeping the local mirror current.",
  },
  {
    n: "5",
    title: "Resilient by design",
    body: "If the connection drops again, nothing already synced disappears. The local copy keeps working on its own.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
            Built to work before the internet does.
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink/75">
            NODE inverts the usual order. Instead of treating a live
            connection as a given and offline mode as an afterthought, the
            local server is the primary source of truth — the internet is
            just how it stays up to date.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page py-16 md:py-20">
          <ol className="space-y-10">
            {STEPS.map((step) => (
              <li key={step.n} className="grid gap-3 border-b border-line pb-10 last:border-none last:pb-0 md:grid-cols-[4rem_1fr] md:gap-8">
                <span className="font-display text-2xl font-semibold text-gold">
                  {step.n}
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-navy">
                    {step.title}
                  </h2>
                  <p className="mt-2 max-w-2xl font-body text-base leading-relaxed text-ink/70">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              The usual way
            </h2>
            <ul className="mt-4 space-y-3 font-body text-sm leading-relaxed text-ink/70">
              <li>Every page load depends on a live connection.</li>
              <li>No connection means no access — full stop.</li>
              <li>Data costs fall on the student, every visit.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-navy/15 bg-white p-6">
            <h2 className="font-display text-2xl font-semibold text-navy">
              The NODE way
            </h2>
            <ul className="mt-4 space-y-3 font-body text-sm leading-relaxed text-ink/70">
              <li>Content is already on the local network.</li>
              <li>Offline moments don&apos;t block access to what&apos;s already synced.</li>
              <li>Data is only needed for the sync, not every visit.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page flex flex-col items-start gap-4 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <p className="max-w-md font-body text-base text-ink/75">
            Curious about the technical details for your institution or
            organization?
          </p>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-md bg-navy px-5 py-3 font-body text-sm font-medium text-white hover:bg-blue"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}
