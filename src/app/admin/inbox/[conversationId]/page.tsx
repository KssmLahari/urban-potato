import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminThread } from "@/components/admin/AdminThread";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { parseUuid } from "@/lib/chat/validation";

export const metadata: Metadata = {
  title: "Conversation",
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ conversationId: string }> };

export default async function AdminConversationPage({ params }: PageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { conversationId: raw } = await params;
  const conversationId = parseUuid(raw);
  if (!conversationId) {
    redirect("/admin/inbox");
  }

  return (
    <div className="min-h-[70dvh] bg-gradient-to-b from-background via-blue-50/40 to-amber-50/30">
      <AdminThread conversationId={conversationId} />
    </div>
  );
}
