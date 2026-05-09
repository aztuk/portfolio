import { NextResponse } from "next/server";

import { siteContent } from "@/content/site";

const resendEndpoint = "https://api.resend.com/emails";
const maxFieldLength = 5000;

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const normalizeField = (value: unknown) =>
  typeof value === "string" ? value.trim().slice(0, maxFieldLength) : "";

const parsePayload = (value: unknown): ContactPayload | null => {
  if (!isRecord(value)) {
    return null;
  }

  const payload = {
    name: normalizeField(value.name),
    email: normalizeField(value.email),
    message: normalizeField(value.message),
    website: normalizeField(value.website),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return null;
  }

  return payload;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const POST = async (request: Request) => {
  const payload = parsePayload(await request.json().catch(() => null));

  if (!payload) {
    return NextResponse.json({ error: "Invalid contact payload." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
  }

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? siteContent.email,
      reply_to: payload.email,
      subject: `Portfolio contact - ${payload.name}`,
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    }),
  });

  if (!response.ok) {
    console.error("Contact email failed", await response.text());
    return NextResponse.json({ error: "Email delivery failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
};
