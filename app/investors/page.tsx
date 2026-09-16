import Link from "next/link";
import { getSettings, toPairs } from "@/lib/siteContent";

export const revalidate = 60;

export default async function InvestorsPage() {
  const settings = await getSettings();
  const metrics = toPairs(settings.investors_metrics);

  const materials = [
    { label: "Pitch deck", url: settings.investors_deck_url },
    { label: "Press kit", url: settings.investors_presskit_url },
  ];

  return (
    <>
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <p className="font-body text-sm font-medium text-blue">
            {settings.investors_eyebrow}
          </p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
            {settings.investors_title}
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink/75">
            {settings.investors_body}
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              {settings.investors_opportunity_heading}
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/75">
              {settings.investors_opportunity_body}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">
              {settings.investors_status_heading}
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/75">
              {settings.investors_status_body}{" "}
              <Link href="/news" className="text-blue hover:text-navy">
                See the latest updates
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {metrics.length > 0 && (
        <section className="border-t border-line bg-white">
          <div className="container-page grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <p className="font-display text-3xl font-semibold text-gold">
                  {metric.value}
                </p>
                <p className="mt-1 font-body text-xs uppercase tracking-wide text-ink/55">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold text-navy">
            Materials
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {materials.map((item) =>
              item.url ? (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-navy/20 bg-white px-5 py-3 font-body text-sm font-medium text-navy hover:border-navy/40"
                >
                  {item.label} →
                </a>
              ) : (
                <span
                  key={item.label}
                  className="rounded-md border border-line bg-white px-5 py-3 font-body text-sm text-ink/50"
                >
                  {item.label} — coming soon
                </span>
              )
            )}
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
