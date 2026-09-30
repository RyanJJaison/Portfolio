import Link from "next/link";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { journey } from "@/content/journey";
import { credentials } from "@/content/experience";
import { BinaryPortrait } from "@/components/home/BinaryPortrait";
import { ProjectCard } from "@/components/projects/ProjectCard";

function Block({ title, href, cta, children }: { title: string; href: string; cta: string; children: React.ReactNode }) {
  return (
    <section className="mt-24">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <Link href={href} className="text-sm text-accent hover:underline">{cta} →</Link>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="font-mono text-sm text-accent">hello, world</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-6 max-w-md text-lg text-muted">{profile.tagline}</p>
          <p className="mt-2 text-sm text-muted">B.Tech AI, Christ University, Bangalore · AWS Certified AI Practitioner</p>
          <div className="mt-8 flex gap-4 text-sm">
            <Link href="/projects" className="rounded-full bg-accent px-5 py-2 font-medium text-black">View projects</Link>
            <Link href="/journey" className="rounded-full border border-line px-5 py-2 hover:border-accent">My journey</Link>
          </div>
        </div>
        <div className="relative order-first mx-auto w-full max-w-xs md:order-none md:max-w-lg">
          <BinaryPortrait label={`Portrait of ${profile.name} drawn in binary digits`} />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent" />
        </div>
      </section>

      <Block title="Skills" href="/lab" cta="What I'm learning now">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.name} className="rounded-xl border border-line p-5">
              <h3 className="font-mono text-sm text-accent">{g.name}</h3>
              <p className="mt-2 text-sm text-muted">{g.skills.join(", ")}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Featured projects" href="/projects" cta="All projects">
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </Block>

      <Block title="Journey" href="/journey" cta="Full journey">
        <ul className="space-y-3 text-sm">
          {journey.filter((j) => !j.placeholder).map((j) => (
            <li key={j.title} className="flex flex-wrap gap-x-4">
              <span className="w-48 font-mono text-xs text-muted">{j.period}</span>
              <span>{j.title}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Credentials" href="/journey" cta="More">
        <ul className="space-y-3 text-sm">
          {credentials.map((c) => (
            <li key={c.title} className="flex flex-wrap items-center gap-3">
              <span>{c.title}</span>
              <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-accent">{c.status}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Get in touch" href="/contact" cta="Contact">
        <p className="max-w-xl text-muted">Open to internships and collaborations in AI/ML.</p>
      </Block>
    </main>
  );
}
