import { ScrollReveal } from "@/components/portal/ScrollReveal";
import { COMPANY } from "@/lib/company";

const signals = [
  {
    title: "Veteran-owned",
    body: "Led by Natanael Ulien—carrying the same commitment to mission and accountability from service into every shipment.",
  },
  {
    title: "Continental United States",
    body: COMPANY.coverage,
  },
  {
    title: "Straight talk",
    body: "References, insurance certificates, and lane details available on request so you can qualify us like any partner you trust.",
  },
];

export function Testimonials() {
  return (
    <section
      className="relative overflow-hidden border-y border-blue-950/40 bg-gradient-to-br from-slate-900 via-[#0c1424] to-slate-950 px-4 py-14 text-white sm:px-6 sm:py-20"
      aria-labelledby="trust-heading"
    >
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <div>
            <h2
              id="trust-heading"
              className="font-display text-[1.4rem] font-bold leading-tight tracking-tight sm:text-3xl"
            >
              Why teams reach out to {COMPANY.displayName}
            </h2>
            <div
              className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-amber-300 to-blue-500 shadow-sm shadow-amber-500/20"
              aria-hidden
            />
            <p className="mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
              We focus on safe, on-time delivery and honest answers. Ask us about
              capacity, equipment, and how we work with owner-operators.
            </p>
          </div>
        </ScrollReveal>
        <ul className="mt-8 grid list-none gap-4 sm:mt-10 md:grid-cols-3 md:gap-6">
          {signals.map((item, i) => (
            <li key={item.title}>
              <ScrollReveal
                className="rounded-2xl border border-slate-600/70 border-t-amber-400/35 bg-slate-800/45 p-5 shadow-lg shadow-black/25 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 sm:p-7"
                delayMs={140 + i * 80}
              >
                <h3 className="font-display text-lg font-bold text-amber-100 sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {item.body}
                </p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
