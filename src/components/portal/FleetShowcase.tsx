import Image from "next/image";
import { FLEET_STORY } from "@/lib/company";
import {
  CONTENT_CARD_CLASS,
  MEDIA_CARD_CLASS,
  PAGE_SECTION_CLASS,
  PAGE_TITLE_RULE_CLASS,
} from "@/lib/pageStyles";

const equipment = [
  {
    title: "Semi-truck tractors",
    detail:
      "Modern Freightliner Cascadia sleepers—maintained for the long haul with aerodynamic fairings and the visibility drivers need in real freight environments.",
  },
  {
    title: "53-foot dry van trailers",
    detail:
      "Standard fifty-three-foot vans for dry freight—room for palletized product, retail replenishment, and industrial shipments with secure, weather-tight protection.",
  },
  {
    title: "Reefer trailers",
    detail:
      "Temperature-controlled equipment for loads that require consistent climate handling and monitored transport.",
  },
  {
    title: "Flatbed trailers",
    detail:
      "Open-deck capability for freight that cannot be loaded into enclosed vans, secured with proper tie-down procedures.",
  },
  {
    title: "Continental coverage",
    detail:
      "Licensed for freight throughout the continental United States, with dispatch and routing built around your pickup and delivery windows.",
  },
];

const headingClass =
  "font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl";

export function FleetShowcase({ standalone = false }: { standalone?: boolean }) {
  const title = "Fleet & equipment";
  return (
    <section
      {...(!standalone ? { id: "fleet" } : {})}
      className={
        standalone
          ? PAGE_SECTION_CLASS
          : `scroll-mt-20 ${PAGE_SECTION_CLASS}`
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {standalone ? (
              <h1 className={headingClass}>{title}</h1>
            ) : (
              <h2 className={headingClass}>{title}</h2>
            )}
            <div className={PAGE_TITLE_RULE_CLASS} aria-hidden />
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              {FLEET_STORY.lead} {FLEET_STORY.body}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            className={`relative aspect-[4/3] bg-slate-200 sm:aspect-[16/11] ${MEDIA_CARD_CLASS}`}
          >
            <Image
              src="/images/nulien/cab-profile.png"
              alt="Nulien Transportation blue Freightliner Cascadia cab, side profile"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div
            className={`relative aspect-[4/3] bg-slate-200 sm:aspect-[16/11] ${MEDIA_CARD_CLASS}`}
          >
            <Image
              src="/images/nulien/cab-palm-bay.png"
              alt="Nulien Transportation tractor at Palm Bay, Florida, with palm trees in the background"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div
            className={`relative aspect-[4/3] bg-slate-200 sm:aspect-[16/11] ${MEDIA_CARD_CLASS}`}
          >
            <Image
              src="/images/nulien/reefer-stock.jpg"
              alt="Reefer trailer reference image"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div
            className={`relative aspect-[4/3] bg-slate-200 sm:aspect-[16/11] ${MEDIA_CARD_CLASS}`}
          >
            <Image
              src="/images/nulien/flatbed-stock.jpg"
              alt="Flatbed trailer reference image"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {equipment.map((unit) => (
            <article
              key={unit.title}
              className={CONTENT_CARD_CLASS}
            >
              <h3 className="font-display text-xl font-bold text-slate-900">
                {unit.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{unit.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">
          Reefer and flatbed reference photos are from Wikimedia Commons (CC
          BY 2.0) for temporary portfolio visualization.
        </p>
      </div>
    </section>
  );
}
