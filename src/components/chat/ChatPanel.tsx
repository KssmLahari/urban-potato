"use client";

import { useSearchParams } from "next/navigation";
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
import {
  buildChatThreadUrl,
  getThreadIdFromSearchParams,
  syncThreadUrl,
} from "@/lib/chat/threadUrl";
import {
  CHAT_CTA_BUTTON_CLASS,
  CHAT_FORM_CLASS,
  CHAT_SHELL_ACCENT,
  CHAT_SHELL_CLASS,
  PAGE_TITLE_RULE_CLASS,
} from "@/lib/chatStyles";

export function ChatPanel({ configured }: { configured: boolean }) {
  const searchParams = useSearchParams();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [starting, setStarting] = useState(false);
  const [resuming, setResuming] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const { conversation, messages, loading, error, refresh } =
    useConversationMessages({ conversationId });

  useEffect(() => {
    const fromUrl = getThreadIdFromSearchParams(searchParams);
    const fromStorage = getStoredConversationId();
    const id = fromUrl ?? fromStorage;
    setConversationId(id);
    if (id) {
      storeConversationId(id);
      syncThreadUrl(id);
    }
    setBootstrapped(true);
  }, [searchParams]);

  useEffect(() => {
    if (!conversationId) return;
    storeConversationId(conversationId);
    syncThreadUrl(conversationId);
  }, [conversationId]);

  function openConversation(id: string) {
    storeConversationId(id);
    syncThreadUrl(id);
    setConversationId(id);
    setShowResume(false);
    setFormError(null);
  }

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
        resumed?: boolean;
      };
      if (!res.ok || !data.conversation?.id) {
        throw new Error(data.error ?? "Could not start chat.");
      }
      openConversation(data.conversation.id);
      await refresh();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Could not start chat.",
      );
    } finally {
      setStarting(false);
    }
  }

  async function resumeConversation(formData: FormData) {
    setResuming(true);
    setFormError(null);
    try {
      const res = await fetch("/api/chat/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorEmail: formData.get("visitorEmail"),
        }),
      });
      const data = (await res.json()) as {
        conversation?: { id: string };
        error?: string;
      };
      if (!res.ok || !data.conversation?.id) {
        throw new Error(data.error ?? "Could not find your chat.");
      }
      openConversation(data.conversation.id);
      await refresh();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Could not find your chat.",
      );
    } finally {
      setResuming(false);
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

  async function copyChatLink() {
    if (!conversationId) return;
    try {
      await navigator.clipboard.writeText(buildChatThreadUrl(conversationId));
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      setFormError("Could not copy link. Bookmark this page instead.");
    }
  }

  function startNewChat() {
    clearStoredConversationId();
    syncThreadUrl(null);
    setConversationId(null);
    setFormError(null);
    setShowResume(false);
  }

  if (!configured) {
    return (
      <div className={`${CHAT_FORM_CLASS} border-amber-200/80 bg-gradient-to-br from-amber-50/90 to-blue-50/40`}>
        <div className={CHAT_SHELL_ACCENT} aria-hidden />
        <div className="p-1">
          <p className="font-display text-lg font-bold text-slate-900">
            Chat is not live yet
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Supabase is not connected yet. On{" "}
            <strong>Vercel → Settings → Environment Variables</strong>, add the
            Supabase keys, then <strong>Redeploy</strong>.
          </p>
        </div>
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
      <div className="space-y-6">
        {showResume ? (
          <form
            className={CHAT_FORM_CLASS}
            onSubmit={(e) => {
              e.preventDefault();
              void resumeConversation(new FormData(e.currentTarget));
            }}
          >
            <p className="font-display text-lg font-bold text-slate-900">
              Continue your chat
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Enter the same email you used before. You&apos;ll see dispatch
              replies and your message history.
            </p>
            <label className="mt-6 block">
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
            {formError ? (
              <p className="mt-4 text-sm font-medium text-red-600" role="alert">
                {formError}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={resuming}
                className={CHAT_CTA_BUTTON_CLASS}
              >
                {resuming ? "Opening chat…" : "Open my chat"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResume(false);
                  setFormError(null);
                }}
                className="min-h-[52px] rounded-full border border-blue-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50"
              >
                Back
              </button>
            </div>
          </form>
        ) : (
          <form
            className={CHAT_FORM_CLASS}
            onSubmit={(e) => {
              e.preventDefault();
              void startConversation(new FormData(e.currentTarget));
            }}
          >
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Tell us who you are and what you need. Our dispatch team replies
              here and by email — come back anytime with the same email to see
              answers on the website too.
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
              className={`mt-6 ${CHAT_CTA_BUTTON_CLASS}`}
            >
              {starting ? "Starting chat…" : "Start chat"}
            </button>
            <p className="mt-4 text-sm text-muted">
              Already chatted with us?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowResume(true);
                  setFormError(null);
                }}
                className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                Continue with your email
              </button>
            </p>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className={`min-h-[min(70dvh,640px)] ${CHAT_SHELL_CLASS}`}>
      <div className={CHAT_SHELL_ACCENT} aria-hidden />
      <div className="border-b border-blue-100/80 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg font-bold text-slate-900">
              {conversation?.visitor_name ?? "Your conversation"}
            </p>
            <p className="text-sm text-muted">
              {conversation?.visitor_email ?? "Your chat thread"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void copyChatLink()}
              className="rounded-full border border-blue-200 bg-white/80 px-3 py-1.5 text-sm font-semibold text-accent shadow-sm hover:border-amber-300/80 hover:bg-blue-50"
            >
              {linkCopied ? "Link copied!" : "Copy chat link"}
            </button>
            <button
              type="button"
              className="rounded-full border border-blue-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-blue-50"
              onClick={startNewChat}
            >
              New chat
            </button>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Bookmark or copy this link to see dispatch replies later — even on
          another phone or computer.
        </p>
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
          embedded
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
