import Link from "next/link";
import { COMPANY, getGoogleMapsUrl } from "@/lib/company";
import { PUBLIC_SITE_ORIGIN } from "@/lib/site";
import { LogoMark } from "./LogoMark";

const quick = [
  { href: "#services", label: "Services" },
  { href: "#fleet", label: "Fleet" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-slate-900">
              <LogoMark className="h-8 w-8" />
              <div>
                <div className="font-display text-lg font-bold">
                  {COMPANY.displayName}
                </div>
                <div className="text-xs font-medium uppercase tracking-wide text-muted">
                  {COMPANY.legalName}
                </div>
              </div>
            </div>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {quick.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-muted outline-none ring-accent/40 transition hover:text-foreground focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <p className="max-w-sm text-sm text-muted sm:text-right">
              © {new Date().getFullYear()} {COMPANY.legalName}.{" "}
              <a
                href={PUBLIC_SITE_ORIGIN}
                className="text-foreground underline decoration-border underline-offset-2 transition hover:text-accent hover:decoration-accent"
              >
                {COMPANY.websiteDisplay}
              </a>
              {" · "}
              <a
                href={getGoogleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-border underline-offset-2 transition hover:text-accent hover:decoration-accent"
              >
                {COMPANY.addressLine1}, {COMPANY.addressLine2}
              </a>
              .
            </p>
            <Link
              href="#top"
              className="text-sm font-medium text-accent outline-none ring-accent/40 hover:text-accent-hover focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2 sm:self-end"
            >
              Back to top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
