import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/company";

const stats = [
  { k: "Continental U.S.", v: "Nationwide freight lanes" },
  { k: "Veteran-owned", v: "Palm Bay, Florida" },
  { k: "53′", v: "Dry van trailers" },
  { k: "Semi-trucks", v: "Freightliner Cascadia" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[520px] overflow-hidden px-4 pb-24 pt-16 text-white sm:min-h-[560px] sm:px-6 sm:pb-32 sm:pt-24"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/nulien/tractor-front.png"
          alt="Nulien Transportation royal blue Freightliner Cascadia tractor"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-slate-950/55"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />
      </div>
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-blue-600/25 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-300">
          Veteran-owned · Licensed & insured
        </p>
        <p className="font-display text-xl font-semibold text-blue-100 sm:text-2xl">
          {COMPANY.tagline}
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Your cargo,{" "}
          <span className="text-blue-300">safely from A to B.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
          {COMPANY.mission} {COMPANY.coverage}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-900/40 outline-none ring-offset-2 ring-offset-slate-950 transition hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            Get a freight quote
          </Link>
          <Link
            href="#fleet"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-base font-semibold text-white outline-none ring-blue-300/60 ring-offset-2 ring-offset-slate-950 backdrop-blur-sm transition hover:border-white/50 hover:bg-white/10 focus-visible:ring-2"
          >
            Meet our fleet
          </Link>
        </div>
        <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4 sm:gap-8">
          {stats.map((row) => (
            <div key={row.k}>
              <dt className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                {row.k}
              </dt>
              <dd className="mt-1 text-sm text-slate-400">{row.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
