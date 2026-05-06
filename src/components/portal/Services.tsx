import Image from "next/image";
import { COMPANY } from "@/lib/company";
import {
  CONTENT_CARD_CLASS,
  MEDIA_CARD_CLASS,
  PAGE_SECTION_CLASS,
  PAGE_TITLE_RULE_CLASS,
} from "@/lib/pageStyles";

const items = [
  {
    title: "53-foot dry van",
    body: "Reliable over-the-road dry freight with secure, weather-protected trailer capacity for retail and general commodities.",
  },
  {
    title: "Reefer trailer service",
    body: "Temperature-controlled hauling for products that need a cold chain from pickup to delivery.",
  },
  {
    title: "Flatbed hauling",
    body: "Open-deck transport for oversized or specialized freight with proper securement and route planning.",
  },
  {
    title: "Owner-operator partners",
    body: `${COMPANY.coverage} We partner with owner-operators who own their trucks and share our safety and service standards.`,
  },
];

const headingClass =
  "font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl";

export function Services({ standalone = false }: { standalone?: boolean }) {
  const title = "How we serve shippers";
  return (
    <section
      {...(!standalone ? { id: "services" } : {})}
      className={
        standalone
          ? PAGE_SECTION_CLASS
          : `scroll-mt-20 ${PAGE_SECTION_CLASS}`
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          {standalone ? (
            <h1 className={headingClass}>{title}</h1>
          ) : (
            <h2 className={headingClass}>{title}</h2>
          )}
          <div className={PAGE_TITLE_RULE_CLASS} aria-hidden />
          <p className="mt-6 text-base text-muted sm:text-lg">
            From Palm Bay, Florida to loading docks across the continental United
            States—one carrier focused on trust and safe delivery.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <article className={`${MEDIA_CARD_CLASS} bg-background`}>
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/nulien/reefer-stock.jpg"
                alt="Reefer semi-trailer on highway"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="border-t border-blue-100/70 bg-gradient-to-r from-white to-blue-50/50 px-4 py-3 text-sm font-semibold text-slate-800">
              Reefer trailer capabilities
            </p>
          </article>
          <article className={`${MEDIA_CARD_CLASS} bg-background`}>
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/nulien/flatbed-stock.jpg"
                alt="Flatbed semi-trailer carrying cargo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="border-t border-blue-100/70 bg-gradient-to-r from-white to-amber-50/40 px-4 py-3 text-sm font-semibold text-slate-800">
              Flatbed hauling support
            </p>
          </article>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {items.map((item) => (
            <li
              key={item.title}
              className={CONTENT_CARD_CLASS}
            >
              <h3 className="font-display text-xl font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
