import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { parseEmail } from "@/lib/chat/validation";
import type { Conversation, Message } from "@/lib/chat/types";

/** Let a customer reopen their thread from any device using the email they used in chat. */
export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Chat backend is not configured yet." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const visitorEmail = parseEmail(
    (body as Record<string, unknown>).visitorEmail,
  );
  if (!visitorEmail) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { data: conversation, error: convError } = await supabase
    .from("conversations")
    .select("*")
    .eq("visitor_email", visitorEmail)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle<Conversation>();

  if (convError) {
    return NextResponse.json({ error: convError.message }, { status: 500 });
  }
  if (!conversation) {
    return NextResponse.json(
      { error: "No chat found for that email. Start a new conversation below." },
      { status: 404 },
    );
  }

  const { data: messages, error: msgError } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversation.id)
    .order("created_at", { ascending: true })
    .returns<Message[]>();

  if (msgError) {
    return NextResponse.json({ error: msgError.message }, { status: 500 });
  }

  return NextResponse.json({
    conversation,
    messages: messages ?? [],
  });
}
