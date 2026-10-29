import type { Metadata } from "next";
import credits from "@/public/media/credits.json";

export const metadata: Metadata = { title: "Picture credits" };

type Credit = { file: string; title: string; creator: string | null; license: string; licenseUrl: string; page: string; via: string };

/** Every found picture and clip on the site, with its creator, licence and source. */
export default function CreditsPage() {
  const list = (credits as Credit[]).slice().sort((a, b) => a.title.localeCompare(b.title));
  return (
    <main className="px-[var(--m)] pb-40 pt-16">
      <h1 className="display">Picture credits</h1>
      <p className="lead measure mt-10">
        Apart from my own portrait, the pictures on this site come from open collections. They show the places and things around my work, not the work itself.
      </p>
      <ul className="mt-16 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {list.map((c) => (
          <li key={c.file} className="measure">
            <a href={c.page} target="_blank" rel="noopener noreferrer" className="link font-semibold">{c.title}</a>
            <p className="small mt-1 text-muted">
              {c.creator ? `${c.creator}, ` : ""}<a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="link">{c.license}</a>, via {c.via}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
