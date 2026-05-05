import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { PRIMARY_NAV } from "@/lib/nav";
import { LogoMark } from "./LogoMark";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-[var(--header-h)] max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-h-[44px] min-w-0 items-center gap-2 rounded-lg py-1 text-slate-900 outline-none ring-accent/40 transition-opacity active:opacity-70 hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <LogoMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
          <span className="font-display truncate text-[0.95rem] font-bold leading-tight tracking-tight sm:text-lg">
            {COMPANY.displayName}
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted outline-none ring-accent/40 transition-colors hover:text-foreground focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <MobileNav />
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center whitespace-nowrap rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/15 outline-none ring-accent/40 transition-colors active:bg-blue-800 hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-offset-2 md:min-h-0 md:min-w-0 md:px-4 md:py-2"
          >
            <span className="md:hidden">Quote</span>
            <span className="hidden md:inline">Request a quote</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
