"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { ConversationWithPreview } from "@/lib/chat/types";
import {
  CHAT_INBOX_ITEM_CLASS,
  PAGE_TITLE_RULE_CLASS,
} from "@/lib/chatStyles";

export function AdminInboxList() {
  const router = useRouter();
  const [conversations, setConversations] = useState<ConversationWithPreview[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/conversations", {
        cache: "no-store",
      });
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = (await res.json()) as {
        conversations?: ConversationWithPreview[];
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? "Could not load inbox.");
      }
      setConversations(data.conversations ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load inbox.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), 5000);
    return () => window.clearInterval(id);
  }, [load]);

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Dispatch inbox
          </h1>
          <div className={PAGE_TITLE_RULE_CLASS} aria-hidden />
          <p className="mt-2 text-sm text-muted">
            Customer chat threads from the website.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void signOut()}
          className="rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-amber-300/80 hover:bg-blue-50"
        >
          Sign out
        </button>
      </div>

      {loading ? (
        <p className="mt-10 text-sm text-muted">Loading conversations…</p>
      ) : null}
      {error ? (
        <p className="mt-10 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      {!loading && !error && conversations.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-blue-200/90 bg-gradient-to-br from-blue-50/50 to-amber-50/40 p-8 text-center text-sm text-muted">
          No messages yet. When a customer starts a chat on{" "}
          <Link href="/chat" className="font-semibold text-accent hover:underline">
            /chat
          </Link>
          , it will appear here.
        </p>
      ) : null}

      <ul className="mt-8 flex flex-col gap-3">
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <Link
              href={`/admin/inbox/${conversation.id}`}
              className={CHAT_INBOX_ITEM_CLASS}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">
                    {conversation.visitor_name}
                  </p>
                  <p className="text-sm text-muted">{conversation.visitor_email}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                    conversation.status === "open"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {conversation.status}
                </span>
              </div>
              {conversation.last_message ? (
                <p className="mt-3 line-clamp-2 text-sm text-slate-700">
                  {conversation.last_message}
                </p>
              ) : null}
              {conversation.last_message_at ? (
                <p className="mt-2 text-xs text-muted">
                  {new Date(conversation.last_message_at).toLocaleString()}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
