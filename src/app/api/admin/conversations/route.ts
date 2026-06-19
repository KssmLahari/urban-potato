import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Conversation, ConversationWithPreview, Message } from "@/lib/chat/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Chat backend is not configured yet." },
      { status: 503 },
    );
  }

  const supabase = getSupabaseAdmin();
  const { data: conversations, error } = await supabase
    .from("conversations")
    .select("*")
    .order("updated_at", { ascending: false })
    .returns<Conversation[]>();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const list = conversations ?? [];
  const withPreview: ConversationWithPreview[] = await Promise.all(
    list.map(async (conversation) => {
      const { data: latest } = await supabase
        .from("messages")
        .select("body, created_at")
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle<Pick<Message, "body" | "created_at">>();

      return {
        ...conversation,
        last_message: latest?.body ?? null,
        last_message_at: latest?.created_at ?? null,
      };
    }),
  );

  return NextResponse.json({ conversations: withPreview });
}
