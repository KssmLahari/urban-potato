"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { COMPANY } from "@/lib/company";

const stats = [
  { k: "Coverage", v: "Continental U.S. lanes" },
  { k: "Response", v: "Fast quote turnaround" },
  { k: "Equipment", v: "53′ dry van, reefer, flatbed" },
  { k: "Ownership", v: "Veteran-owned in Florida" },
];

export function Hero() {
  const truckLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let rafId = 0;

    const updateParallax = () => {
      const y = window.scrollY;
      const isSmallScreen = window.innerWidth < 640;
      const truckOffset = isSmallScreen
        ? Math.min(y * 0.035, 14)
        : Math.min(y * 0.08, 36);
      const layer = truckLayerRef.current;
      if (layer) {
        layer.style.setProperty("--hero-parallax-y", `${truckOffset}px`);
      }
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[min(100dvh,940px)] overflow-hidden px-4 pb-[max(4.25rem,env(safe-area-inset-bottom,0px))] pt-[max(4rem,env(safe-area-inset-top,0px))] text-white sm:px-6 sm:pb-28 sm:pt-24 md:pt-28"
    >
      <div ref={truckLayerRef} className="hero-truck-parallax absolute inset-0">
        <Image
          src="/images/nulien/hero-truck-stock.jpg"
          alt="Modern semi-truck on highway"
          fill
          priority
          quality={100}
          className="hero-truck-motion object-cover object-[62%_52%] sm:object-[72%_52%] md:object-center"
          sizes="100vw"
        />
        {/* Stronger scrim on small screens so type stays readable over the truck */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-950/74 via-slate-950/54 to-slate-950/26 sm:bg-gradient-to-r sm:from-slate-950 sm:via-slate-950/78 sm:to-slate-950/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] sm:opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />
      </div>
      <div className="pointer-events-none absolute -left-16 top-1/3 h-48 w-48 rounded-full bg-amber-300/20 blur-3xl sm:h-64 sm:w-64" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl sm:top-1/3 sm:h-72 sm:w-72 md:bg-blue-400/20" />
      <div className="hero-content-motion relative mx-auto max-w-6xl">
        <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100 backdrop-blur-sm sm:mb-4 sm:text-sm sm:tracking-widest">
          Veteran-owned · Licensed & insured
        </p>
        <p className="font-display text-lg font-semibold leading-snug text-blue-100 sm:text-xl md:text-2xl">
          {COMPANY.tagline}
        </p>
        <div
          className="mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-amber-300 to-blue-500 shadow-sm shadow-amber-500/20 sm:mt-5"
          aria-hidden
        />
        <h1 className="mt-5 max-w-[20ch] font-display text-[1.85rem] font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] min-[400px]:max-w-none min-[400px]:text-4xl sm:text-5xl lg:text-6xl">
          Your cargo,{" "}
          <span className="text-amber-200 drop-shadow-md sm:text-amber-100">
            delivered right and on time.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-100 sm:mt-6 sm:text-lg md:text-xl">
          {COMPANY.mission} {COMPANY.coverage}
        </p>
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap">
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-cta px-8 py-3.5 text-base font-bold text-cta-foreground shadow-lg shadow-amber-900/30 outline-none ring-offset-2 ring-offset-slate-950 transition-all duration-200 active:scale-[0.99] active:bg-amber-500 hover:-translate-y-0.5 hover:bg-cta-hover focus-visible:ring-2 focus-visible:ring-amber-300 sm:w-auto sm:min-h-[48px]"
          >
            Get a freight quote
          </Link>
          <Link
            href="/fleet"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border-2 border-amber-200/65 bg-white/10 px-8 py-3.5 text-base font-semibold text-white shadow-md outline-none ring-amber-200/40 ring-offset-2 ring-offset-slate-950 backdrop-blur-md transition-all duration-200 active:scale-[0.99] hover:-translate-y-0.5 hover:border-amber-100/90 hover:bg-amber-300/15 focus-visible:ring-2 sm:w-auto sm:min-h-[48px]"
          >
            Meet our fleet
          </Link>
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-3 border-t border-white/15 pt-10 sm:mt-16 sm:grid-cols-4 sm:gap-4">
          {stats.map((row) => (
            <div
              key={row.k}
              className="rounded-xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.09]"
            >
              <dt className="font-display text-lg font-bold leading-snug text-white drop-shadow-sm sm:text-xl md:text-2xl">
                {row.k}
              </dt>
              <dd className="mt-1.5 text-sm leading-snug text-slate-300 sm:text-slate-400">
                {row.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
