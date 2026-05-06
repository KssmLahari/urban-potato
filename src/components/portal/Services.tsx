import Image from "next/image";
import { COMPANY } from "@/lib/company";
import { ScrollReveal } from "@/components/portal/ScrollReveal";
import {
  CONTENT_CARD_CLASS,
  MEDIA_CARD_CLASS,
  MEDIA_IMAGE_HOVER_CLASS,
  PAGE_SECTION_CLASS,
  PAGE_TITLE_RULE_CLASS,
} from "@/lib/pageStyles";

const items = [
  {
    title: "Dry van linehaul",
    body: "53-foot dry van coverage for retail, distribution, and general commodities with secure weather-protected capacity.",
  },
  {
    title: "Temperature-controlled reefer",
    body: "Reefer support for freight that requires consistent temperature handling across pickup, transit, and delivery.",
  },
  {
    title: "Flatbed specialized moves",
    body: "Open-deck hauling for oversized and specialized freight, with securement planning and route-conscious execution.",
  },
  {
    title: "Owner-operator capacity",
    body: `${COMPANY.coverage} We scale with vetted owner-operators who own their trucks and match our service standards.`,
  },
];

const headingClass =
  "font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.5rem]";

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
        <ScrollReveal className="max-w-2xl">
          <div>
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
        </ScrollReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <ScrollReveal
            className={`${MEDIA_CARD_CLASS} bg-background`}
            delayMs={80}
          >
            <article>
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/nulien/reefer-stock-v2.jpg"
                  alt="Reefer semi-trailer on highway"
                  fill
                  className={MEDIA_IMAGE_HOVER_CLASS}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="border-t border-blue-100/70 bg-gradient-to-r from-white to-blue-50/50 px-4 py-3 text-sm font-semibold text-slate-800">
                Reefer trailer capabilities
              </p>
            </article>
          </ScrollReveal>
          <ScrollReveal
            className={`${MEDIA_CARD_CLASS} bg-background`}
            delayMs={160}
          >
            <article>
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/nulien/flatbed-stock-v2.jpg"
                  alt="Flatbed semi-trailer carrying cargo"
                  fill
                  className={MEDIA_IMAGE_HOVER_CLASS}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="border-t border-blue-100/70 bg-gradient-to-r from-white to-amber-50/40 px-4 py-3 text-sm font-semibold text-slate-800">
                Flatbed hauling support
              </p>
            </article>
          </ScrollReveal>
        </div>
        <ul className="mt-14 grid list-none gap-6 sm:grid-cols-2 lg:gap-8">
          {items.map((item, i) => (
            <li key={item.title}>
              <ScrollReveal className={CONTENT_CARD_CLASS} delayMs={280 + i * 60}>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
