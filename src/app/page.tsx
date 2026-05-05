import type { Metadata } from "next";
import { Hero } from "@/components/portal/Hero";
import { HomeNavCards } from "@/components/portal/HomeNavCards";
import { OrganizationJsonLd } from "@/components/portal/OrganizationJsonLd";
import { Testimonials } from "@/components/portal/Testimonials";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <HomeNavCards />
      <Testimonials />
    </>
  );
}
