import { parseUuid } from "@/lib/chat/validation";

const THREAD_PARAM = "thread";

export function getThreadIdFromSearchParams(
  params: URLSearchParams | null,
): string | null {
  if (!params) return null;
  return parseUuid(params.get(THREAD_PARAM));
}

export function buildChatThreadUrl(conversationId: string): string {
  if (typeof window === "undefined") {
    return `/chat?${THREAD_PARAM}=${conversationId}`;
  }
  const url = new URL(window.location.href);
  url.pathname = "/chat";
  url.searchParams.set(THREAD_PARAM, conversationId);
  url.hash = "";
  return url.toString();
}

export function syncThreadUrl(conversationId: string | null): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (conversationId) {
    url.searchParams.set(THREAD_PARAM, conversationId);
  } else {
    url.searchParams.delete(THREAD_PARAM);
  }
  window.history.replaceState({}, "", url);
}
