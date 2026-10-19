"use server";

import nodemailer from "nodemailer";
import { profile } from "@/content/profile";

export type SendState = { status: "idle" | "sent" | "error"; message?: string; at?: number };

const LIMITS = { name: 100, email: 200, message: 5000 };

/** Sends a visitor's message to the Gmail inbox. Needs GMAIL_USER and GMAIL_APP_PASSWORD in the environment. */
export async function sendMessage(_prev: SendState, formData: FormData): Promise<SendState> {
  // Honeypot: real visitors never see this field, bots fill it in.
  if (formData.get("company")) return { status: "sent", at: Date.now() };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) return { status: "error", message: "Please fill in every field." };
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message)
    return { status: "error", message: "That message is a little too long." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "error", message: "That email address doesn't look right." };

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("Contact form: GMAIL_USER or GMAIL_APP_PASSWORD is not set");
    return { status: "error", message: `Messages are offline right now. Email me at ${profile.links.email} instead.` };
  }

  try {
    const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transport.sendMail({
      from: `"Portfolio contact" <${user}>`,
      to: profile.links.email,
      replyTo: { name, address: email },
      subject: `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
      text: `${message}\n\n— ${name} <${email}>`,
    });
    return { status: "sent", at: Date.now() };
  } catch (err) {
    console.error("Contact form: send failed", err);
    return { status: "error", message: `Something went wrong. Email me at ${profile.links.email} instead.` };
  }
}
