"use client";

import { startTransition, useActionState, useRef, useState } from "react";
import { sendMessage, type SendState } from "@/app/contact/actions";

type Phase = "write" | "fold" | "sent";
type Flight = { x: number; y: number; key: number };

/** Flight path in px from the folded letter: a small loop, then off the top-right of the screen. */
const FLIGHT = "M0 0 C 70 -20 130 -110 70 -160 C 20 -200 -50 -150 -10 -100 C 40 -40 300 -120 2200 -1400";

/** Message form that posts to Gmail; on success the letter folds into a paper plane and flies off. */
export function MessageForm() {
  const card = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [phase, setPhase] = useState<Phase>("write");
  const [flight, setFlight] = useState<Flight | null>(null);
  const [replyTo, setReplyTo] = useState("");

  function launch(email: string) {
    setReplyTo(email);
    form.current?.reset();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !card.current) {
      setPhase("sent");
      return;
    }
    const r = card.current.getBoundingClientRect();
    setFlight({ x: r.left + r.width / 2, y: r.top + r.height / 2, key: Date.now() });
    setPhase("fold");
    setTimeout(() => setPhase("sent"), 650);
  }

  const [state, action, pending] = useActionState(async (prev: SendState, fd: FormData) => {
    const result = await sendMessage(prev, fd);
    if (result.status === "sent") launch(String(fd.get("email") ?? ""));
    return result;
  }, { status: "idle" });

  const field = "w-full rounded-xl border border-line bg-background px-4 py-3 outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

  return (
    <div className="relative">
      {phase === "sent" ? (
        <div className="card flex min-h-[26rem] flex-col items-start justify-center gap-5 p-8 sm:p-10" role="status">
          <p className="caps text-accent">(Sent) Letter on its way</p>
          <p className="display text-4xl sm:text-5xl">Thanks for <em>writing</em></p>
          <p className="max-w-md text-lg leading-relaxed text-muted">
            Your message just landed in my inbox. I&apos;ll reply to <span className="text-foreground">{replyTo || "you"}</span> soon.
          </p>
          <button type="button" onClick={() => { setPhase("write"); setFlight(null); }} className="caps pill mt-2 bg-background hover:bg-foreground hover:text-background">
            Write another
          </button>
        </div>
      ) : (
        <div ref={card} className={`card p-6 sm:p-8 ${phase === "fold" ? "letter-fold" : ""}`}>
          {/* Submit by hand so a failed send keeps what the visitor typed (form actions reset the form). */}
          <form
            ref={form}
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              startTransition(() => action(fd));
            }}
            className="grid gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="caps text-muted">Your name</span>
                <input name="name" required maxLength={100} autoComplete="name" placeholder="Ada Lovelace" className={field} />
              </label>
              <label className="grid gap-2">
                <span className="caps text-muted">Your email</span>
                <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com" className={field} />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="caps text-muted">Message</span>
              <textarea name="message" required maxLength={5000} rows={6} placeholder="Hi Ryan, I'd like to talk about…" className={`${field} resize-y`} />
            </label>
            {/* Honeypot for bots; hidden from people and screen readers. */}
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className={`text-sm ${state.status === "error" ? "text-risk" : "text-muted"}`} aria-live="polite">
                {state.status === "error" ? state.message : "Goes straight to my Gmail."}
              </p>
              <button type="submit" disabled={pending} className="caps pill bg-foreground text-background hover:bg-accent disabled:opacity-60">
                {pending ? "Sending…" : "Send it →"}
              </button>
            </div>
          </form>
        </div>
      )}

      {flight && (
        <div key={flight.key} className="plane-flight" style={{ left: flight.x, top: flight.y }} aria-hidden>
          <svg className="absolute left-0 top-0 overflow-visible" width="1" height="1">
            <defs>
              <mask id={`trail-${flight.key}`} maskUnits="userSpaceOnUse" x="-500" y="-2000" width="3500" height="3000">
                <path d={FLIGHT} pathLength={1} className="plane-trail-reveal" fill="none" stroke="#fff" strokeWidth="6" />
              </mask>
            </defs>
            <path d={FLIGHT} className="plane-trail" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 7" strokeLinecap="round" mask={`url(#trail-${flight.key})`} />
          </svg>
          <svg className="plane" style={{ offsetPath: `path("${FLIGHT}")` }} width="40" height="32" viewBox="0 0 40 32">
            <path d="M2 15 L38 3 L16 19 Z" fill="var(--surface)" stroke="var(--foreground)" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M16 19 L38 3 L23 29 Z" fill="var(--accent-soft)" stroke="var(--foreground)" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M16 19 L19 26 L23 29" fill="none" stroke="var(--foreground)" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
