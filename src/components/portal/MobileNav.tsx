"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { PRIMARY_NAV } from "@/lib/nav";

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
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-200/90 bg-white text-slate-800 shadow-sm shadow-blue-900/[0.06] outline-none ring-accent/40 transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 hover:bg-blue-50/70 focus-visible:ring-2"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"
            />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
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
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-[2px]"
            aria-hidden
            tabIndex={-1}
            onClick={close}
          />
          <div
            id={panelId}
            className="fixed inset-x-0 z-50 max-h-[min(85dvh,calc(100dvh-var(--header-h)))] overflow-y-auto border-b border-blue-100/90 bg-gradient-to-b from-white/98 via-background to-blue-50/50 px-4 py-4 shadow-xl shadow-blue-900/15 backdrop-blur-md supports-[backdrop-filter]:bg-white/92"
            style={{ top: "var(--header-h)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <nav
              className="flex flex-col gap-1 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
              aria-label="Mobile primary"
            >
              {PRIMARY_NAV.map((item, i) => (
                <Link
                  key={item.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  className="rounded-xl px-4 py-4 text-lg font-semibold text-slate-900 outline-none ring-accent/40 transition-colors duration-200 active:bg-blue-100/60 hover:bg-blue-50/80 focus-visible:ring-2"
                  onClick={close}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-3 flex min-h-[52px] items-center justify-center rounded-xl bg-cta px-4 py-3.5 text-center text-base font-bold text-cta-foreground shadow-lg shadow-amber-900/25 outline-none ring-offset-2 ring-amber-300/40 transition-all duration-200 active:bg-amber-500 hover:-translate-y-0.5 hover:bg-cta-hover focus-visible:ring-2"
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
