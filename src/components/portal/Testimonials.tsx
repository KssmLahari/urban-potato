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
      className="border-y border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-14 text-white sm:px-6 sm:py-20"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="trust-heading"
          className="font-display text-[1.4rem] font-bold leading-tight tracking-tight sm:text-3xl"
        >
          Why teams reach out to {COMPANY.displayName}
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-400 sm:text-lg">
          We focus on safe, on-time delivery and honest answers. Ask us about
          capacity, equipment, and how we work with owner-operators.
        </p>
        <ul className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3 md:gap-6">
          {signals.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-slate-700/90 bg-slate-800/50 p-5 shadow-lg shadow-black/20 sm:p-7"
            >
              <h3 className="font-display text-lg font-bold text-blue-200 sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
