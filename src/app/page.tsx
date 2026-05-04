import { AboutSection } from "@/components/portal/AboutSection";
import { ContactCTA } from "@/components/portal/ContactCTA";
import { FleetShowcase } from "@/components/portal/FleetShowcase";
import { Hero } from "@/components/portal/Hero";
import { OrganizationJsonLd } from "@/components/portal/OrganizationJsonLd";
import { Services } from "@/components/portal/Services";
import { SiteFooter } from "@/components/portal/SiteFooter";
import { SiteHeader } from "@/components/portal/SiteHeader";
import { Testimonials } from "@/components/portal/Testimonials";

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <SiteHeader />
      <main id="content" className="flex-1 scroll-mt-0 outline-none" tabIndex={-1}>
        <Hero />
        <Services />
        <FleetShowcase />
        <AboutSection />
        <Testimonials />
        <ContactCTA />
      </main>
      <SiteFooter />
    </>
  );
}
