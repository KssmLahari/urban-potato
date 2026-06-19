import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicKey, getSupabaseUrl } from "@/lib/supabase/env";

let browserClient: SupabaseClient | null = null;

export function isSupabaseBrowserConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabasePublicKey());
}

/** Browser client for Realtime subscriptions (read-only via RLS). */
export function getSupabaseBrowser(): SupabaseClient {
  const url = getSupabaseUrl();
  const key = getSupabasePublicKey();

  if (!url || !key) {
    throw new Error("Supabase browser env vars are not configured.");
  }

  if (!browserClient) {
    browserClient = createClient(url, key);
  }

  return browserClient;
}
