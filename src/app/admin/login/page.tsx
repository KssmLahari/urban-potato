import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAllowedAdminEmails, isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/inbox");
  }

  return (
    <div className="min-h-[70dvh] bg-gradient-to-b from-background via-blue-50/40 to-amber-50/30 px-4 py-16">
      <AdminLoginForm allowedEmails={getAllowedAdminEmails()} />
    </div>
  );
}
