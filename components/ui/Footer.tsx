import Link from "next/link";
import Image from "next/image";
import { nav, profile } from "@/content/profile";
import { pictures } from "@/content/media";

/** The last photograph is the footer: links on top, the name across the bottom. */
export function Footer() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const pic = pictures.fishingNet;
  return (
    <footer className="relative isolate flex min-h-[88svh] flex-col justify-between overflow-hidden text-paper md:min-h-svh">
      <Image src={pic.src} alt={pic.alt} fill sizes="100vw" className="-z-10 object-cover brightness-[0.55]" />
      <div className="flex flex-wrap justify-between gap-x-10 gap-y-6 px-[var(--m)] pt-8">
        <ul className="grid gap-1">
          {nav.map((n) => (
            <li key={n.href}><Link href={n.href} className="link">{n.label}</Link></li>
          ))}
        </ul>
        <ul className="grid gap-1 md:text-right">
          <li><a href={`mailto:${profile.links.email}`} className="link">{profile.links.email}</a></li>
          <li><a href={`tel:${profile.links.phone.replace(/\s/g, "")}`} className="link">{profile.links.phone}</a></li>
          <li><a href={profile.links.github} {...ext} className="link">GitHub</a> · <a href={profile.links.linkedin} {...ext} className="link">LinkedIn</a> · <a href={profile.links.orcid} {...ext} className="link">ORCID</a></li>
          {profile.links.cv && <li><a href={profile.links.cv} {...ext} className="link">Résumé (PDF)</a></li>}
        </ul>
      </div>
      <div className="px-[var(--m)] pb-6">
        <p className="display whitespace-nowrap !text-[clamp(2.4rem,9.1vw,9.5rem)] !leading-[0.9]" aria-hidden>{profile.name}</p>
        <p className="small mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1">
          <span>© {new Date().getFullYear()} {profile.name} · {pic.caption}</span>
          <Link href="/credits" className="link">Picture credits</Link>
        </p>
      </div>
    </footer>
  );
}
