import Link from "next/link";
import { COMPANY, getGoogleMapsUrl } from "@/lib/company";
import { PRIMARY_NAV } from "@/lib/nav";
import { PUBLIC_SITE_ORIGIN } from "@/lib/site";
import { LogoMark } from "./LogoMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-blue-100/80 bg-gradient-to-b from-background to-blue-50/30 px-4 py-7 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl rounded-2xl border border-blue-100/80 bg-white/55 p-5 shadow-sm shadow-blue-900/[0.05] backdrop-blur-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
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
              <ul className="flex flex-col gap-1.5">
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
          <div className="flex flex-col gap-2 border-t border-border pt-4 sm:border-t-0 sm:pt-0 sm:text-right">
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
            <Link
              href="/privacy-policy"
              className="inline-flex min-h-[44px] items-center text-base font-medium text-muted outline-none ring-accent/40 transition-colors duration-200 hover:text-accent focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-0 sm:self-end sm:text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="inline-flex min-h-[44px] items-center text-base font-medium text-muted outline-none ring-accent/40 transition-colors duration-200 hover:text-accent focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-0 sm:self-end sm:text-sm"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/carrier-onboarding"
              className="inline-flex min-h-[44px] items-center text-base font-medium text-muted outline-none ring-accent/40 transition-colors duration-200 hover:text-accent focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-0 sm:self-end sm:text-sm"
            >
              Carrier Onboarding
            </Link>
            <Link
              href="/faq"
              className="inline-flex min-h-[44px] items-center text-base font-medium text-muted outline-none ring-accent/40 transition-colors duration-200 hover:text-accent focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-0 sm:self-end sm:text-sm"
            >
              FAQ
            </Link>
            <Link
              href="/feedback"
              className="inline-flex min-h-[44px] items-center text-base font-medium text-muted outline-none ring-accent/40 transition-colors duration-200 hover:text-accent focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-0 sm:self-end sm:text-sm"
            >
              Feedback
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
