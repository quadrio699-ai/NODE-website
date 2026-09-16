import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/siteContent";

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <section className="bg-paper">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
            {settings.contact_title}
          </h1>
          <p className="mt-5 max-w-sm font-body text-base leading-relaxed text-ink/75">
            {settings.contact_body}
          </p>
          <a
            href={`mailto:${settings.contact_email}`}
            className="mt-6 inline-block font-body text-sm text-blue hover:text-navy"
          >
            {settings.contact_email}
          </a>
        </div>

        <ContactForm contactEmail={settings.contact_email} />
      </div>
    </section>
  );
}
