import Link from "next/link";
import { HOME_BAND_CLASS, PAGE_TITLE_RULE_CLASS } from "@/lib/pageStyles";
import { PRIMARY_NAV } from "@/lib/nav";

const blurbs: Record<string, string> = {
  "/services": "How we haul and who we partner with.",
  "/fleet": "Equipment, photos, and coverage.",
  "/about": "Veteran-owned story and values.",
  "/contact": "Phone, email, maps, and quote form.",
};

export function HomeNavCards() {
  return (
    <section className={HOME_BAND_CLASS} aria-labelledby="explore-heading">
      <div className="mx-auto max-w-6xl">
        <h2
          id="explore-heading"
          className="font-display text-[1.4rem] font-bold leading-tight text-slate-900 sm:text-3xl"
        >
          Explore the site
        </h2>
        <div className={PAGE_TITLE_RULE_CLASS} aria-hidden />
        <p className="mt-6 max-w-2xl text-base text-muted sm:text-lg">
          Each topic has its own page—open what you need and share the link with
          your team.
        </p>
        <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {PRIMARY_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex min-h-[7.5rem] flex-col justify-between rounded-2xl border border-blue-100/90 bg-surface p-5 shadow-md shadow-blue-900/[0.06] outline-none ring-accent/25 transition-all duration-300 ease-out active:scale-[0.99] hover:-translate-y-0.5 hover:border-amber-300/90 hover:shadow-lg hover:shadow-amber-900/[0.08] focus-visible:ring-2 sm:min-h-0 sm:p-6"
              >
                <span className="font-display text-lg font-bold text-slate-900 sm:text-xl">
                  {item.label}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {blurbs[item.href]}
                </span>
                <span className="mt-4 text-sm font-bold text-amber-700">
                  Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
