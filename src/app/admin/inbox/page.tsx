import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminInboxList } from "@/components/admin/AdminInboxList";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Dispatch Inbox",
  robots: { index: false, follow: false },
};

export default async function AdminInboxPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-[70dvh] bg-gradient-to-b from-background via-blue-50/40 to-amber-50/30">
      <AdminInboxList />
    </div>
  );
}
