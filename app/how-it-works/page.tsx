import Link from "next/link";
import { getSettings, toLines } from "@/lib/siteContent";
import { getSteps } from "@/lib/stepsData";

export const revalidate = 60;

export default async function HowItWorksPage() {
  const [settings, steps] = await Promise.all([getSettings(), getSteps()]);
  const usual = toLines(settings.hiw_usual_list);
  const nodeWay = toLines(settings.hiw_node_list);

  return (
    <>
      <section className="bg-paper">
        <div className="container-page py-16 md:py-20">
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
            {settings.hiw_title}
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink/75">
            {settings.hiw_intro}
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page py-16 md:py-20">
          <ol className="space-y-10">
            {steps.map((step, i) => (
              <li
                key={step.id}
                className="grid gap-3 border-b border-line pb-10 last:border-none last:pb-0 md:grid-cols-[4rem_1fr] md:gap-8"
              >
                <span className="font-display text-2xl font-semibold text-gold">
                  {i + 1}
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
              {settings.hiw_usual_heading}
            </h2>
            <ul className="mt-4 space-y-3 font-body text-sm leading-relaxed text-ink/70">
              {usual.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-navy/15 bg-white p-6">
            <h2 className="font-display text-2xl font-semibold text-navy">
              {settings.hiw_node_heading}
            </h2>
            <ul className="mt-4 space-y-3 font-body text-sm leading-relaxed text-ink/70">
              {nodeWay.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page flex flex-col items-start gap-4 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <p className="max-w-md font-body text-base text-ink/75">
            {settings.hiw_cta_body}
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
