"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChatComposer,
  MessageList,
} from "@/components/chat/MessageList";
import { useConversationMessages } from "@/hooks/useConversationMessages";
import {
  CHAT_SHELL_ACCENT,
  CHAT_SHELL_CLASS,
} from "@/lib/chatStyles";

export function AdminThread({ conversationId }: { conversationId: string }) {
  const router = useRouter();
  const { conversation, messages, loading, error, refresh } =
    useConversationMessages({ conversationId, pollMs: 3000 });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  async function sendReply(body: string) {
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch(
        `/api/admin/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body }),
        },
      );
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "Could not send reply.");
      }
      await refresh();
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Could not send reply.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-4 py-8 sm:px-6">
      <Link
        href="/admin/inbox"
        className="text-sm font-semibold text-accent hover:underline"
      >
        ← Back to inbox
      </Link>

      <div className={`mt-4 ${CHAT_SHELL_CLASS}`}>
        <div className={CHAT_SHELL_ACCENT} aria-hidden />
        <div className="border-b border-blue-100/80 px-4 py-4 sm:px-6">
          <h1 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
            {conversation?.visitor_name ?? "Conversation"}
          </h1>
          <p className="text-sm text-muted">
            {conversation?.visitor_email ?? conversationId}
          </p>
        </div>

        <div className="max-h-[min(55dvh,520px)] overflow-y-auto px-4 py-4 sm:px-6">
          {loading && messages.length === 0 ? (
            <p className="text-sm text-muted">Loading thread…</p>
          ) : (
            <MessageList messages={messages} viewer="admin" />
          )}
          {error ? (
            <p className="mt-4 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div className="border-t border-blue-100/80 px-4 py-4 sm:px-6">
          <ChatComposer
            placeholder="Type your reply to the customer…"
            disabled={sending}
            onSend={sendReply}
            embedded
          />
          {sendError ? (
            <p className="mt-2 text-sm font-medium text-red-600" role="alert">
              {sendError}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
