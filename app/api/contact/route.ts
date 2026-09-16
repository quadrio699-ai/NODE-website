import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "Quadrio699@gmail.com";

export async function POST(req: Request) {
  const { name, email, reason, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Without a Resend key configured, log the submission so nothing is
  // lost during local development, and still return success.
  if (!RESEND_API_KEY) {
    console.log("Contact form submission (RESEND_API_KEY not set):", {
      name,
      email,
      reason,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "NODE Website <onboarding@resend.dev>",
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `NODE contact form: ${reason || "General"} — ${name}`,
      text: `From: ${name} <${email}>\nReason: ${reason}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
