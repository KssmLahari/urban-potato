import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { Services } from "@/components/portal/Services";

export const metadata: Metadata = {
  title: "Services",
  description: `${COMPANY.displayName} offers point-to-point dry van freight, continental coverage, and owner-operator partnerships—${COMPANY.mission}`,
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

export default function ServicesPage() {
  return <Services standalone />;
}
