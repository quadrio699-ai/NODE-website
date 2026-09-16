"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      reason: (form.elements.namedItem("reason") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-paper">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
            Get in touch
          </h1>
          <p className="mt-5 max-w-sm font-body text-base leading-relaxed text-ink/75">
            Campus partnerships, press inquiries, or backing what comes
            next — reach out and we&apos;ll follow up directly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="font-body text-sm font-medium text-navy">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1.5 w-full rounded-md border border-line bg-white px-3.5 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-navy"
            />
          </div>

          <div>
            <label htmlFor="email" className="font-body text-sm font-medium text-navy">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-md border border-line bg-white px-3.5 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-navy"
            />
          </div>

          <div>
            <label htmlFor="reason" className="font-body text-sm font-medium text-navy">
              I&apos;m reaching out about
            </label>
            <select
              id="reason"
              name="reason"
              className="mt-1.5 w-full rounded-md border border-line bg-white px-3.5 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-navy"
            >
              <option>Campus partnership</option>
              <option>Investing or funding</option>
              <option>Press</option>
              <option>Something else</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="font-body text-sm font-medium text-navy">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1.5 w-full rounded-md border border-line bg-white px-3.5 py-2.5 font-body text-sm text-ink outline-none focus-visible:border-navy"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-md bg-navy px-5 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-blue disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          {status === "sent" && (
            <p className="font-body text-sm text-blue">
              Message sent. We&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="font-body text-sm text-red-600">
              Something went wrong — email us directly at{" "}
              <a href="mailto:Quadrio699@gmail.com" className="underline">
                Quadrio699@gmail.com
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
