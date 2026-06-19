"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

/** Branded floating entry to live chat — shown on all public pages except /chat and /admin. */
export function ChatLauncher() {
  const pathname = usePathname();
  if (!pathname || pathname.startsWith("/admin") || pathname === "/chat") {
    return null;
  }

  return (
    <Link
      href="/chat"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] z-40 flex min-h-[52px] max-w-[min(100vw-2rem,20rem)] items-center gap-2.5 rounded-full border border-blue-200/80 bg-gradient-to-r from-accent to-accent-hover py-3 pl-4 pr-5 text-sm font-bold text-white shadow-lg shadow-blue-900/25 ring-2 ring-amber-300/45 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:ring-amber-300/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      aria-label="Open live chat with dispatch"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 transition group-hover:bg-white/20">
        <ChatIcon className="h-5 w-5" />
      </span>
      <span className="truncate">
        <span className="hidden sm:inline">Chat with dispatch</span>
        <span className="sm:hidden">Live chat</span>
      </span>
    </Link>
  );
}
