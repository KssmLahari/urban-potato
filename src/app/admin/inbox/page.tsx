import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminInboxList } from "@/components/admin/AdminInboxList";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { PAGE_SECTION_CLASS } from "@/lib/pageStyles";

export const metadata: Metadata = {
  title: "Dispatch Inbox",
  robots: { index: false, follow: false },
};

export default async function AdminInboxPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className={`min-h-[70dvh] ${PAGE_SECTION_CLASS}`}>
      <AdminInboxList />
    </div>
  );
}
