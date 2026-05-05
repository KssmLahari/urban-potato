import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import { AboutSection } from "@/components/portal/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description: `Veteran-owned ${COMPANY.displayName} in Palm Bay, Florida—${COMPANY.mission}`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return <AboutSection standalone />;
}
