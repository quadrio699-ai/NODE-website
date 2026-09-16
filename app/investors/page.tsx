import Link from "next/link";

export default function InvestorsPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <p className="font-body text-sm font-medium text-blue">For partners, press &amp; investors</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
            Digital equity, built for the places connectivity forgets.
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink/75">
            NODE started as a way to solve a problem in one place — a
            campus where the internet couldn&apos;t be relied on. The same
            problem exists across schools, estates, and institutions
            wherever connectivity is inconsistent rather than absent.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              The opportunity
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/75">
              Most edtech is built for the best-case connection. NODE is
              built for the worst-case one — and still delivers the same
              value there. That makes it viable in exactly the environments
              where most platforms quietly fail.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              Where we are
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/75">
              A working pilot is live at Lagos State University. Add
              current milestones, partnerships, and figures here as the
              pilot progresses —{" "}
              <Link href="/news" className="text-blue hover:text-navy">
                see the latest updates
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold text-navy">
            Materials
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <span className="rounded-md border border-line bg-white px-5 py-3 font-body text-sm text-ink/50">
              Pitch deck — link once ready
            </span>
            <span className="rounded-md border border-line bg-white px-5 py-3 font-body text-sm text-ink/50">
              Press kit — link once ready
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-navy">
        <div className="container-page flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
            Building something in this space? Let&apos;s talk.
          </h2>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-md bg-gold px-5 py-3 font-body text-sm font-medium text-navy hover:bg-gold/90"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
