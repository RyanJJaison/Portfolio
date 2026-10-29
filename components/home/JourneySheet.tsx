import Link from "next/link";
import { journey } from "@/content/journey";
import { credentials } from "@/content/experience";
import { canalVideo, pictures } from "@/content/media";

type Row = { name: string; when: string; note: string };

const GROUPS: { name: string; rows: Row[] }[] = [
  {
    name: "School",
    rows: journey.filter((j) => j.kind === "education" && !j.title.startsWith("B.Tech")).map((j) => ({ name: j.title, when: j.period, note: j.place ?? "" })),
  },
  {
    name: "University",
    rows: journey.filter((j) => j.title.startsWith("B.Tech")).map((j) => ({ name: j.title, when: j.period, note: `${j.place}. ${j.body}` })),
  },
  {
    name: "Work",
    rows: journey.filter((j) => j.kind === "work").map((j) => ({ name: j.title, when: j.period, note: j.place ?? "" })),
  },
  {
    name: "Credentials",
    rows: credentials.map((c) => ({ name: c.title, when: c.status, note: c.period })),
  },
];

/** The journey printed as one tall sheet, laid over a moving picture of the Kerala backwaters. */
export function JourneySheet() {
  const poster = pictures.canalPoster;
  return (
    <section aria-labelledby="journey-title" className="relative isolate overflow-hidden px-[10px] py-24 md:px-[var(--m)] md:py-32">
      <video className="absolute inset-0 -z-10 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={poster.src} aria-hidden>
        <source src={canalVideo} type="video/webm" />
      </video>
      <div className="scallop mx-auto max-w-[640px] bg-paper px-7 py-14 text-center md:ml-[50%] md:px-16 md:py-16">
        <h2 id="journey-title" className="head">The road so far</h2>
        <p className="small mt-3 text-muted">Kottayam to Kochi to Bangalore</p>
        {GROUPS.map((g) => (
          <div key={g.name} className="mt-14">
            <h3 className="display lead">{g.name}</h3>
            <ul className="mx-auto mt-5 grid max-w-[420px] gap-4 text-left">
              {g.rows.map((r) => (
                <li key={r.name}>
                  <p className="flex items-baseline justify-between gap-6">
                    <span className="font-semibold">{r.name}</span>
                    <span className="nums small shrink-0 text-right">{r.when}</span>
                  </p>
                  <p className="small text-muted">{r.note}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="mt-14">Second year, B.Tech AI<br />Open to internships</p>
        <Link href="/journey" className="link mt-6 inline-flex min-h-11 items-center">The whole journey, on a map →</Link>
      </div>
      <p className="small absolute bottom-3 left-[var(--m)] bg-paper px-3 py-1">{poster.caption}</p>
    </section>
  );
}
