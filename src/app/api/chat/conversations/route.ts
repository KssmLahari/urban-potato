import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { parseEmail, sanitizeText } from "@/lib/chat/validation";
import type { Conversation, Message } from "@/lib/chat/types";

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

  const payload = body as Record<string, unknown>;
  const visitorName = sanitizeText(payload.visitorName, 120);
  const visitorEmail = parseEmail(payload.visitorEmail);
  const message = sanitizeText(payload.message, 4000);

  if (!visitorName || !visitorEmail || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();

  const { data: conversation, error: convError } = await supabase
    .from("conversations")
    .insert({
      visitor_name: visitorName,
      visitor_email: visitorEmail,
      status: "open",
    })
    .select("*")
    .single<Conversation>();

  if (convError || !conversation) {
    return NextResponse.json(
      { error: convError?.message ?? "Could not start conversation." },
      { status: 500 },
    );
  }

  const { data: firstMessage, error: msgError } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversation.id,
      sender_type: "visitor",
      body: message,
    })
    .select("*")
    .single<Message>();

  if (msgError || !firstMessage) {
    return NextResponse.json(
      { error: msgError?.message ?? "Could not send message." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    conversation,
    message: firstMessage,
  });
}
