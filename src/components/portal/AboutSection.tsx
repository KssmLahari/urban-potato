import Link from "next/link";
import Image from "next/image";
import { COMPANY, FLEET_STORY, getGoogleMapsUrl } from "@/lib/company";
import { SITE_IMAGES } from "@/lib/siteImages";
import { ScrollReveal } from "@/components/portal/ScrollReveal";
import {
  MEDIA_CARD_CLASS,
  MEDIA_IMAGE_HOVER_CLASS,
  PAGE_SECTION_CLASS,
  PAGE_TITLE_RULE_CLASS,
} from "@/lib/pageStyles";

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
  "font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.5rem]";

export function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const title = "Veteran-owned, community-rooted";
  return (
    <section
      {...(!standalone ? { id: "about" } : {})}
      className={
        standalone
          ? PAGE_SECTION_CLASS
          : `scroll-mt-20 border-t border-blue-100/80 ${PAGE_SECTION_CLASS}`
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <ScrollReveal>
            <div>
              {standalone ? (
                <h1 className={headingClass}>{title}</h1>
              ) : (
                <h2 className={headingClass}>{title}</h2>
              )}
              <div className={PAGE_TITLE_RULE_CLASS} aria-hidden />
              <p className="mt-8 text-base leading-relaxed text-muted sm:text-lg">
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
          </ScrollReveal>
          <div className="flex flex-col gap-6">
            <ScrollReveal
              className={`${MEDIA_CARD_CLASS} bg-slate-100`}
              delayMs={100}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={SITE_IMAGES.cabPalmBay}
                  alt="Nulien Transportation blue tractor with yellow fleet lettering, Palm Bay area"
                  fill
                  className={MEDIA_IMAGE_HOVER_CLASS}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </ScrollReveal>
            <ul className="flex flex-col gap-6">
              {pillars.map((p, i) => (
                <li key={p.title} className="list-none">
                  <ScrollReveal
                    className="rounded-2xl border border-blue-100/80 border-l-4 border-l-blue-600 bg-surface/95 px-6 py-5 shadow-md shadow-blue-900/[0.05] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-amber-200/90 hover:shadow-lg"
                    delayMs={200 + i * 70}
                  >
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-muted">{p.body}</p>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
