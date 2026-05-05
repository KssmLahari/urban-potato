import type { Metadata } from "next";
import { FLEET_STORY } from "@/lib/company";
import { FleetShowcase } from "@/components/portal/FleetShowcase";

export const metadata: Metadata = {
  title: "Fleet & equipment",
  description: `${FLEET_STORY.lead} Semi-trucks, 53-foot dry vans, and nationwide lanes.`,
  alternates: { canonical: "/fleet" },
  openGraph: { url: "/fleet" },
};

export default function FleetPage() {
  return <FleetShowcase standalone />;
}
