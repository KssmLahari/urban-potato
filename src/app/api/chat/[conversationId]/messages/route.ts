import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { parseUuid, sanitizeText } from "@/lib/chat/validation";
import type { Message } from "@/lib/chat/types";

type RouteContext = { params: Promise<{ conversationId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Chat backend is not configured yet." },
      { status: 503 },
    );
  }

  const { conversationId: rawId } = await context.params;
  const conversationId = parseUuid(rawId);
  if (!conversationId) {
    return NextResponse.json({ error: "Invalid conversation id." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data: conversation, error: convError } = await supabase
    .from("conversations")
    .select("*")
    .eq("id", conversationId)
    .maybeSingle();

  if (convError) {
    return NextResponse.json({ error: convError.message }, { status: 500 });
  }
  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }

  const { data: messages, error: msgError } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .returns<Message[]>();

  if (msgError) {
    return NextResponse.json({ error: msgError.message }, { status: 500 });
  }

  return NextResponse.json({ conversation, messages: messages ?? [] });
}

export async function POST(request: Request, context: RouteContext) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Chat backend is not configured yet." },
      { status: 503 },
    );
  }

  const { conversationId: rawId } = await context.params;
  const conversationId = parseUuid(rawId);
  if (!conversationId) {
    return NextResponse.json({ error: "Invalid conversation id." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const text = sanitizeText(payload.body, 4000);
  if (!text) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { data: conversation, error: convError } = await supabase
    .from("conversations")
    .select("id, status")
    .eq("id", conversationId)
    .maybeSingle();

  if (convError) {
    return NextResponse.json({ error: convError.message }, { status: 500 });
  }
  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }
  if (conversation.status === "closed") {
    return NextResponse.json(
      { error: "This conversation is closed." },
      { status: 403 },
    );
  }

  const { data: message, error: msgError } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_type: "visitor",
      body: text,
    })
    .select("*")
    .single<Message>();

  if (msgError || !message) {
    return NextResponse.json(
      { error: msgError?.message ?? "Could not send message." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message });
}
