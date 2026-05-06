import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { ContactCTA } from "@/components/portal/ContactCTA";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${COMPANY.displayName} for freight quotes and owner-operator inquiries. ${COMPANY.phoneDisplay} · ${COMPANY.infoEmail}`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return <ContactCTA standalone />;
}
