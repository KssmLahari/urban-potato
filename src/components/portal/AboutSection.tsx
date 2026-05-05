import Link from "next/link";
import { COMPANY, FLEET_STORY, getGoogleMapsUrl } from "@/lib/company";

const pillars = [
  {
    title: "Service after service",
    body: "Military experience shaped how we approach every mile: preparation, integrity, and showing up when we say we will.",
  },
  {
    title: "Safety on every lane",
    body: "Your freight moves in well-kept semi-trucks and 53-foot trailers, with drivers who understand that safe arrival is the job—not an add-on.",
  },
  {
    title: "America, connected",
    body: COMPANY.coverage,
  },
];

const headingClass =
  "font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl";

export function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const title = "Veteran-owned, community-rooted";
  return (
    <section
      {...(!standalone ? { id: "about" } : {})}
      className={
        standalone
          ? "border-b border-border bg-surface px-4 py-16 sm:px-6 sm:py-28"
          : "scroll-mt-20 border-t border-border bg-surface px-4 py-16 sm:px-6 sm:py-28"
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            {standalone ? (
              <h1 className={headingClass}>{title}</h1>
            ) : (
              <h2 className={headingClass}>{title}</h2>
            )}
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              {FLEET_STORY.lead} Founder Natanael Ulien built{" "}
              {COMPANY.displayName} on a simple idea: keep serving the country—
              this time by moving the goods people rely on.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              From our home in Palm Bay, we coordinate semi-truck and 53-foot dry
              van capacity for shippers who want a carrier they can call, trust,
              and book again. See equipment photos and specs on our{" "}
              <Link
                href="/fleet"
                className="font-semibold text-accent underline-offset-2 hover:underline"
              >
                Fleet & equipment
              </Link>{" "}
              page.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              <a
                href={getGoogleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                {COMPANY.addressLine1}, {COMPANY.addressLine2}
              </a>
              .
            </p>
          </div>
          <ul className="flex flex-col gap-6">
            {pillars.map((p) => (
              <li
                key={p.title}
                className="rounded-2xl border-l-4 border-accent bg-background px-6 py-5"
              >
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
