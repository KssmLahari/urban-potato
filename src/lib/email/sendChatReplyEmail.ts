import { Resend } from "resend";
import { COMPANY } from "@/lib/company";
import { getSiteUrl } from "@/lib/site";

export function isChatEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendChatReplyEmail(options: {
  to: string;
  visitorName: string;
  replyBody: string;
  conversationId: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not set." };
  }

  const from =
    process.env.CHAT_EMAIL_FROM ??
    `${COMPANY.displayName} <onboarding@resend.dev>`;
  const chatUrl = `${getSiteUrl()}/chat?thread=${options.conversationId}`;
  const safeName = escapeHtml(options.visitorName);
  const safeBody = escapeHtml(options.replyBody).replace(/\n/g, "<br />");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: options.to,
    replyTo: COMPANY.infoEmail,
    subject: `Reply from ${COMPANY.displayName} dispatch`,
    text: [
      `Hi ${options.visitorName},`,
      "",
      options.replyBody,
      "",
      "Continue the conversation on our website:",
      chatUrl,
      "",
      COMPANY.displayName,
      COMPANY.infoEmail,
      COMPANY.phoneDisplay,
    ].join("\n"),
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0f172a;max-width:560px">
        <p style="margin:0 0 16px">Hi ${safeName},</p>
        <div style="margin:0 0 20px;padding:16px 18px;border-left:4px solid #fbbf24;background:#f8fafc;border-radius:8px">
          ${safeBody}
        </div>
        <p style="margin:0 0 16px">You can reply on our website anytime:</p>
        <p style="margin:0 0 24px">
          <a href="${chatUrl}" style="display:inline-block;background:#fbbf24;color:#0f172a;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:999px">
            Open chat
          </a>
        </p>
        <p style="margin:0;font-size:14px;color:#64748b">
          ${escapeHtml(COMPANY.displayName)} · ${escapeHtml(COMPANY.infoEmail)} · ${escapeHtml(COMPANY.phoneDisplay)}
        </p>
      </div>
    `.trim(),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
