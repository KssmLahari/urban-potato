import Image from "next/image";
import { FLEET_STORY } from "@/lib/company";

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
    title: "Continental coverage",
    detail:
      "Licensed for freight throughout the continental United States, with dispatch and routing built around your pickup and delivery windows.",
  },
];

export function FleetShowcase() {
  return (
    <section
      id="fleet"
      className="scroll-mt-20 bg-background px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Fleet & equipment
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {FLEET_STORY.lead} {FLEET_STORY.body}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-slate-200 shadow-sm sm:aspect-[16/11]">
            <Image
              src="/images/nulien/cab-profile.png"
              alt="Nulien Transportation blue Freightliner Cascadia cab, side profile"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-slate-200 shadow-sm sm:aspect-[16/11]">
            <Image
              src="/images/nulien/cab-palm-bay.png"
              alt="Nulien Transportation tractor at Palm Bay, Florida, with palm trees in the background"
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
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-blue-200 lg:p-8"
            >
              <h3 className="font-display text-xl font-bold text-slate-900">
                {unit.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{unit.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
