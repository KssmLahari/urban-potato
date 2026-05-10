import Image from "next/image";
import { COMPANY, FLEET_STORY } from "@/lib/company";
import { SITE_IMAGES } from "@/lib/siteImages";
import { ScrollReveal } from "@/components/portal/ScrollReveal";
import {
  CONTENT_CARD_CLASS,
  MEDIA_CARD_CLASS,
  MEDIA_IMAGE_HOVER_CLASS,
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
    title: "Dispatch-ready coverage",
    detail:
      "Licensed across the continental United States, with dispatch and routing built around appointment windows and delivery commitments.",
  },
];

const headingClass =
  "font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.5rem]";

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
          <ScrollReveal className="max-w-2xl">
            <div>
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
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {(
            [
              {
                src: SITE_IMAGES.cabProfile,
                alt: "Nulien Transportation blue tractor cab with yellow fleet lettering, side profile",
              },
              {
                src: SITE_IMAGES.cabPalmBay,
                alt: "Nulien Transportation blue tractor with yellow fleet lettering, Palm Bay area setting",
              },
              {
                src: SITE_IMAGES.reeferCapabilities,
                alt: "Nulien Transportation reefer trailer on the highway",
              },
              {
                src: SITE_IMAGES.flatbedHaulingSupport,
                alt: "Nulien Transportation flatbed with secured heavy freight",
              },
            ] as const
          ).map((photo, i) => (
            <ScrollReveal
              key={photo.src}
              className={`relative aspect-[4/3] bg-slate-200 sm:aspect-[16/11] ${MEDIA_CARD_CLASS}`}
              delayMs={80 + i * 70}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className={MEDIA_IMAGE_HOVER_CLASS}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {equipment.map((unit, i) => (
            <ScrollReveal
              key={unit.title}
              className={CONTENT_CARD_CLASS}
              delayMs={260 + i * 55}
            >
              <h3 className="font-display text-xl font-bold text-slate-900">
                {unit.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{unit.detail}</p>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delayMs={120}>
          <p className="mt-6 text-xs text-muted">
            Blue cab, homepage hero, reefer, and flatbed images are
            custom-generated artwork featuring {COMPANY.displayName}.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
