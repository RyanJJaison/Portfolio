import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MessageForm } from "@/components/contact/MessageForm";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Contact" };

/** One block of the contact page: title on the left, content on the right. */
function Block({ title, note, children }: { index?: string; title: ReactNode; note: string; children: ReactNode }) {
  return (
    <section className="grid grid-cols-12 gap-x-6 gap-y-8 py-14">
      <Reveal className="col-span-12 md:col-span-4">
        <h2 className="display text-5xl sm:text-6xl">{title}</h2>
        <p className="caps mt-4 max-w-xs text-muted">{note}</p>
      </Reveal>
      <div className="col-span-12 md:col-span-7 md:col-start-6">{children}</div>
    </section>
  );
}

export default function ContactPage() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const direct = [
    { label: "Email", value: profile.links.email, href: `mailto:${profile.links.email}`, note: "Best for anything detailed" },
    { label: "Phone", value: profile.links.phone, href: `tel:${profile.links.phone.replace(/\s/g, "")}`, note: "Call or text" },
  ];
  const online = [
    { label: "GitHub", href: profile.links.github, note: "Code behind every project" },
    { label: "LinkedIn", href: profile.links.linkedin, note: "The professional version" },
    { label: "ORCID", href: profile.links.orcid, note: "Research identity" },
  ];
  return (
    <PageShell title={<>Say <em>hello</em></>} kicker="Contact" aside="Open to internships and collaborations in AI/ML">
      <Block index="01" title={<>Reach <em>me</em></>} note="Direct lines. I usually reply within a day.">
        <ul className="">
          {direct.map((d) => (
            <li key={d.label} className="">
              <a href={d.href} className="group grid gap-2 py-6 sm:grid-cols-[6rem_1fr] sm:items-baseline sm:gap-x-4">
                <span className="caps text-accent">{d.label}</span>
                <span className="display text-[clamp(1.5rem,3vw,2.5rem)] [overflow-wrap:anywhere]">
                  {/* Let long addresses wrap at the @ rather than mid-word. */}
                  <span className="hl">{d.value.split("@").map((part, n) => (n ? <span key={n}><wbr />@{part}</span> : part))}</span>
                </span>
                <span className="caps text-muted sm:col-start-2">{d.note} →</span>
              </a>
            </li>
          ))}
        </ul>
        {profile.links.cv && (
          <a href={profile.links.cv} {...ext} className="caps pill mt-8 bg-foreground text-background hover:bg-accent">
            Download résumé (PDF) ↗
          </a>
        )}
      </Block>

      <Block index="02" title={<>Find me <em>online</em></>} note="Where the work and the network live.">
        <ul className="">
          {online.map((i) => (
            <li key={i.label} className="">
              <a href={i.href} {...ext} className="group grid grid-cols-[1fr_auto] items-baseline gap-3 py-5">
                <span className="display text-4xl hl">{i.label}</span>
                <span className="caps text-right text-muted">{i.note} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Block>

      <Block index="03" title={<>Post to <em>reach me</em></>} note="Write here and it lands in my Gmail inbox.">
        <MessageForm />
      </Block>
    </PageShell>
  );
}
