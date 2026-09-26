import type { Metadata } from "next";
import { getSettings, toPairs } from "@/lib/siteContent";
import { getFaqs } from "@/lib/stepsData";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings.seo_campus_title,
    description: settings.seo_campus_description,
  };
}

export default async function CampusPage() {
  const [settings, faqs] = await Promise.all([getSettings(), getFaqs()]);
  const statusItems = toPairs(settings.campus_status_items);

  return (
    <>
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <p className="font-body text-sm font-medium text-blue">
            {settings.campus_eyebrow}
          </p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
            {settings.campus_title}
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink/75">
            {settings.campus_body}
          </p>
          <a
            href={settings.portal_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-md bg-navy px-5 py-3 font-body text-sm font-medium text-white hover:bg-blue"
          >
            Open the Portal
          </a>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">
            {settings.campus_status_heading}
          </h2>

          {statusItems.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statusItems.map((item) => (
                <div key={item.label} className="rounded-lg border border-line bg-paper p-5">
                  <p className="font-display text-2xl font-semibold text-navy">
                    {item.value}
                  </p>
                  <p className="mt-1 font-body text-xs uppercase tracking-wide text-ink/55">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ink/70">
            {settings.campus_status_body}
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold text-navy md:text-3xl">
            Common questions
          </h2>
          <div className="mt-8 divide-y divide-line border-t border-line">
            {faqs.map((item) => (
              <div key={item.id} className="py-6">
                <h3 className="font-display text-base font-semibold text-navy">
                  {item.question}
                </h3>
                <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ink/70">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
