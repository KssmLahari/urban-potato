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
      className="border-y border-border bg-slate-900 px-4 py-16 text-white sm:px-6 sm:py-20"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="trust-heading"
          className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Why teams reach out to {COMPANY.displayName}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          We focus on safe, on-time delivery and honest answers. Ask us about
          capacity, equipment, and how we work with owner-operators.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {signals.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-slate-700/80 bg-slate-800/40 p-6 sm:p-7"
            >
              <h3 className="font-display text-lg font-bold text-blue-200">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
