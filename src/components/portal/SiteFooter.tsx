import Link from "next/link";
import { COMPANY, getGoogleMapsUrl } from "@/lib/company";
import { PRIMARY_NAV } from "@/lib/nav";
import { PUBLIC_SITE_ORIGIN } from "@/lib/site";
import { LogoMark } from "./LogoMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-blue-100/80 bg-gradient-to-b from-background to-blue-50/30 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-slate-900">
              <LogoMark className="h-9 w-9 sm:h-10 sm:w-10" />
              <div>
                <div className="font-display text-lg font-bold sm:text-xl">
                  {COMPANY.displayName}
                </div>
                <div className="text-xs font-medium uppercase tracking-wide text-muted">
                  {COMPANY.legalName}
                </div>
              </div>
            </div>
            <nav aria-label="Footer">
              <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[44px] items-center text-base font-medium text-muted outline-none ring-accent/40 transition-colors duration-200 active:text-accent hover:text-accent focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-0 sm:text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex flex-col gap-4 border-t border-border pt-8 sm:border-t-0 sm:pt-0 sm:text-right">
            <p className="max-w-md text-base leading-relaxed text-muted sm:max-w-sm sm:text-sm">
              © {new Date().getFullYear()} {COMPANY.legalName}.{" "}
              <a
                href={PUBLIC_SITE_ORIGIN}
                className="font-medium text-foreground underline decoration-border underline-offset-2 transition-colors duration-200 hover:text-accent hover:decoration-accent"
              >
                {COMPANY.websiteDisplay}
              </a>
              {" · "}
              <a
                href={getGoogleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline decoration-border underline-offset-2 transition-colors duration-200 hover:text-accent hover:decoration-accent"
              >
                {COMPANY.addressLine1}, {COMPANY.addressLine2}
              </a>
              .
            </p>
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center text-base font-semibold text-accent outline-none ring-accent/40 transition-colors duration-200 hover:text-accent-hover focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-0 sm:self-end sm:text-sm"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
