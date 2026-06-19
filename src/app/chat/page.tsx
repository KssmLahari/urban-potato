import type { Metadata } from "next";
import Link from "next/link";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { STAFF_PORTAL } from "@/lib/nav";
import { PAGE_SECTION_CLASS, PAGE_TITLE_RULE_CLASS } from "@/lib/pageStyles";

export const metadata: Metadata = {
  title: "Live Chat",
  description:
    "Message NULIEN TRANSPORTATION LLC dispatch in real time about freight, quotes, and lanes.",
  alternates: { canonical: "/chat" },
  openGraph: { url: "/chat" },
};

/** Read Supabase env at request time (not baked in at build). */
export const dynamic = "force-dynamic";

export default function ChatPage() {
  const configured = isSupabaseConfigured();

  return (
    <section className={PAGE_SECTION_CLASS}>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.5rem]">
          Message dispatch
        </h1>
        <div className={PAGE_TITLE_RULE_CLASS} aria-hidden />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Chat with our team about lanes, equipment, and quotes. Replies appear
          here when we are available.
        </p>
        <div className="mt-10">
          <ChatPanel configured={configured} />
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Staff replying to customers?{" "}
          <Link
            href={STAFF_PORTAL.href}
            className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          >
            Open {STAFF_PORTAL.label}
          </Link>
        </p>
      </div>
    </section>
  );
}
