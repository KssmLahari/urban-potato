import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAllowedAdminEmails, isAdminAuthenticated } from "@/lib/admin-auth";
import { PAGE_SECTION_CLASS } from "@/lib/pageStyles";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/inbox");
  }

  return (
    <div className={`min-h-[70dvh] ${PAGE_SECTION_CLASS}`}>
      <AdminLoginForm allowedEmails={getAllowedAdminEmails()} />
    </div>
  );
}
