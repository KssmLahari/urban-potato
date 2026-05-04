"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#fleet", label: "Fleet" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 0);
    return () => {
      document.documentElement.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        menuButtonRef.current?.focus();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={menuButtonRef}
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-slate-800 outline-none ring-accent/40 transition hover:bg-background focus-visible:ring-2"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
            />
          </svg>
        )}
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
            aria-hidden
            tabIndex={-1}
            onClick={close}
          />
          <div
            id={panelId}
            className="fixed inset-x-0 top-16 z-50 border-b border-border bg-background/95 px-4 py-6 shadow-lg backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile primary">
              {nav.map((item, i) => (
                <Link
                  key={item.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-900 outline-none ring-accent/40 transition hover:bg-surface focus-visible:ring-2"
                  onClick={close}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mt-2 rounded-full bg-accent px-4 py-3 text-center text-base font-semibold text-white outline-none ring-offset-2 ring-accent/50 transition hover:bg-accent-hover focus-visible:ring-2"
                onClick={close}
              >
                Request a quote
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
