import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { LogoMark } from "./LogoMark";
import { MobileNav } from "./MobileNav";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#fleet", label: "Fleet" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="#top"
          className="flex min-w-0 items-center gap-2 rounded-lg text-slate-900 outline-none ring-accent/40 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <LogoMark className="h-9 w-9 shrink-0" />
          <span className="font-display truncate text-base font-bold tracking-tight sm:text-lg">
            {COMPANY.displayName}
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((item) => (
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
            href="#contact"
            className="whitespace-nowrap rounded-full bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm outline-none ring-accent/40 transition-colors hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-4"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Request a quote</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
