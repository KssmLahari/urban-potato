"use client";

import { useEffect, useState } from "react";
import {
  clearStoredConversationId,
  getStoredConversationId,
  storeConversationId,
  useConversationMessages,
} from "@/hooks/useConversationMessages";
import {
  ChatComposer,
  inputClass,
  MessageList,
} from "@/components/chat/MessageList";
import { PAGE_TITLE_RULE_CLASS } from "@/lib/pageStyles";

export function ChatPanel({ configured }: { configured: boolean }) {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [starting, setStarting] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { conversation, messages, loading, error, refresh } =
    useConversationMessages({ conversationId });

  useEffect(() => {
    setConversationId(getStoredConversationId());
    setBootstrapped(true);
  }, []);

  async function startConversation(formData: FormData) {
    setStarting(true);
    setFormError(null);
    try {
      const res = await fetch("/api/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorName: formData.get("visitorName"),
          visitorEmail: formData.get("visitorEmail"),
          message: formData.get("message"),
        }),
      });
      const data = (await res.json()) as {
        conversation?: { id: string };
        error?: string;
      };
      if (!res.ok || !data.conversation?.id) {
        throw new Error(data.error ?? "Could not start chat.");
      }
      storeConversationId(data.conversation.id);
      setConversationId(data.conversation.id);
      await refresh();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Could not start chat.",
      );
    } finally {
      setStarting(false);
    }
  }

  async function sendMessage(body: string) {
    if (!conversationId) return;
    setSending(true);
    setFormError(null);
    try {
      const res = await fetch(`/api/chat/${conversationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "Could not send message.");
      }
      await refresh();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Could not send message.",
      );
    } finally {
      setSending(false);
    }
  }

  if (!configured) {
    return (
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-6 text-slate-800">
        <p className="font-semibold">Chat is not live yet</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Supabase is not connected yet. On{" "}
          <strong>Vercel → Settings → Environment Variables</strong>, add{" "}
          <code className="rounded bg-white/80 px-1">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code className="rounded bg-white/80 px-1">
            NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
          </code>
          , and{" "}
          <code className="rounded bg-white/80 px-1">SUPABASE_SECRET_KEY</code>
          , then <strong>Redeploy</strong>. For local dev, use{" "}
          <code className="rounded bg-white/80 px-1">.env.local</code> (see{" "}
          <code className="rounded bg-white/80 px-1">.env.example</code>).
        </p>
      </div>
    );
  }

  if (!bootstrapped) {
    return (
      <p className="text-center text-sm text-muted">Loading chat…</p>
    );
  }

  if (!conversationId) {
    return (
      <form
        className="rounded-2xl border border-blue-100/85 bg-surface/95 p-5 ring-1 ring-white/70 shadow-md shadow-blue-900/[0.05] sm:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          void startConversation(new FormData(e.currentTarget));
        }}
      >
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          Tell us who you are and what you need. Our dispatch team replies here
          in real time when available.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Your name
            </span>
            <input
              name="visitorName"
              type="text"
              required
              autoComplete="name"
              className={inputClass}
            />
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              name="visitorEmail"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
            />
          </label>
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Message
            </span>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Lane, equipment, pickup timing, or general question…"
              className={`${inputClass} min-h-[7rem] resize-y`}
            />
          </label>
        </div>
        {formError ? (
          <p className="mt-4 text-sm font-medium text-red-600" role="alert">
            {formError}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={starting}
          className="mt-6 min-h-[52px] rounded-full bg-cta px-8 py-3.5 text-base font-bold text-cta-foreground shadow-lg shadow-amber-900/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover disabled:opacity-60"
        >
          {starting ? "Starting chat…" : "Start chat"}
        </button>
      </form>
    );
  }

  return (
    <div className="flex min-h-[min(70dvh,640px)] flex-col rounded-2xl border border-blue-100/85 bg-surface/95 ring-1 ring-white/70 shadow-md shadow-blue-900/[0.05]">
      <div className="border-b border-blue-100/80 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg font-bold text-slate-900">
              {conversation?.visitor_name ?? "Your conversation"}
            </p>
            <p className="text-sm text-muted">
              {conversation?.visitor_email ?? "Messages save in this browser"}
            </p>
          </div>
          <button
            type="button"
            className="text-sm font-medium text-accent underline-offset-2 hover:underline"
            onClick={() => {
              clearStoredConversationId();
              setConversationId(null);
            }}
          >
            New chat
          </button>
        </div>
        <div className={PAGE_TITLE_RULE_CLASS} aria-hidden />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        {loading && messages.length === 0 ? (
          <p className="text-center text-sm text-muted">Loading messages…</p>
        ) : (
          <MessageList messages={messages} viewer="visitor" />
        )}
        {error ? (
          <p className="mt-4 text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        {formError ? (
          <p className="mt-4 text-sm font-medium text-red-600" role="alert">
            {formError}
          </p>
        ) : null}
      </div>

      <div className="border-t border-blue-100/80 px-4 py-4 sm:px-6">
        <ChatComposer
          placeholder="Type your message…"
          disabled={sending || conversation?.status === "closed"}
          onSend={sendMessage}
        />
        {conversation?.status === "closed" ? (
          <p className="mt-2 text-xs text-muted">
            This conversation is closed. Start a new chat to continue.
          </p>
        ) : null}
      </div>
    </div>
  );
}
