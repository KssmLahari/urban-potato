"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getSupabaseBrowser,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase/browser";
import type { Conversation, Message } from "@/lib/chat/types";

const STORAGE_KEY = "nulien_chat_conversation_id";

type UseConversationMessagesOptions = {
  conversationId: string | null;
  pollMs?: number;
};

export function useConversationMessages({
  conversationId,
  pollMs = 4000,
}: UseConversationMessagesOptions) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchThread = useCallback(
    async (options?: { silent?: boolean }) => {
      if (!conversationId) return;
      if (!options?.silent) setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/chat/${conversationId}/messages`, {
          cache: "no-store",
        });
        const data = (await res.json()) as {
          conversation?: Conversation;
          messages?: Message[];
          error?: string;
        };
        if (!res.ok) {
          if (res.status === 404) {
            localStorage.removeItem(STORAGE_KEY);
          }
          throw new Error(data.error ?? "Could not load messages.");
        }
        setConversation(data.conversation ?? null);
        setMessages(data.messages ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load messages.");
      } finally {
        if (!options?.silent) setLoading(false);
      }
    },
    [conversationId],
  );

  useEffect(() => {
    if (!conversationId) {
      setConversation(null);
      setMessages([]);
      return;
    }
    void fetchThread();
  }, [conversationId, fetchThread]);

  useEffect(() => {
    if (!conversationId || !isSupabaseBrowserConfigured()) return;

    const supabase = getSupabaseBrowser();
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const row = payload.new as Message;
          setMessages((prev) => {
            if (prev.some((m) => m.id === row.id)) return prev;
            return [...prev, row].sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime(),
            );
          });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;
    const id = window.setInterval(() => {
      void fetchThread({ silent: true });
    }, pollMs);
    return () => window.clearInterval(id);
  }, [conversationId, fetchThread, pollMs]);

  return useMemo(
    () => ({
      conversation,
      messages,
      loading,
      error,
      refresh: () => fetchThread(),
    }),
    [conversation, messages, loading, error, fetchThread],
  );
}

export function getStoredConversationId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function storeConversationId(id: string) {
  localStorage.setItem(STORAGE_KEY, id);
}

export function clearStoredConversationId() {
  localStorage.removeItem(STORAGE_KEY);
}

export const CHAT_STORAGE_KEY = STORAGE_KEY;
