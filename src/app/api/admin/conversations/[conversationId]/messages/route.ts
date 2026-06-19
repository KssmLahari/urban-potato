import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { Conversation, Message } from "@/lib/chat/types";
import { parseUuid, sanitizeText } from "@/lib/chat/validation";
import {
  isChatEmailConfigured,
  sendChatReplyEmail,
} from "@/lib/email/sendChatReplyEmail";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

type RouteContext = { params: Promise<{ conversationId: string }> };

export async function POST(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

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
    .select("id, visitor_name, visitor_email")
    .eq("id", conversationId)
    .maybeSingle<Pick<Conversation, "id" | "visitor_name" | "visitor_email">>();

  if (convError) {
    return NextResponse.json({ error: convError.message }, { status: 500 });
  }
  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }

  const { data: message, error: msgError } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_type: "admin",
      body: text,
    })
    .select("*")
    .single<Message>();

  if (msgError || !message) {
    return NextResponse.json(
      { error: msgError?.message ?? "Could not send reply." },
      { status: 500 },
    );
  }

  await supabase
    .from("conversations")
    .update({ status: "open" })
    .eq("id", conversationId);

  let emailSent = false;
  let emailError: string | undefined;

  if (isChatEmailConfigured()) {
    const emailResult = await sendChatReplyEmail({
      to: conversation.visitor_email,
      visitorName: conversation.visitor_name,
      replyBody: text,
      conversationId,
    });
    emailSent = emailResult.ok;
    if (!emailResult.ok) {
      emailError = emailResult.error;
      console.error("Chat reply email failed:", emailResult.error);
    }
  } else {
    emailError = "Email is not configured (add RESEND_API_KEY in Vercel).";
  }

  return NextResponse.json({
    message,
    emailSent,
    emailError: emailSent ? undefined : emailError,
  });
}
