import { COMPANY } from "@/lib/company";
import { getSiteUrl } from "@/lib/site";

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.legalName,
  alternateName: COMPANY.displayName,
  description: `${COMPANY.mission} Veteran-owned semi-truck carrier; 53-foot dry van; based in Palm Bay, Florida.`,
  url: "",
  telephone: COMPANY.phoneTel,
  email: COMPANY.infoEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.addressLine1,
    addressLocality: "Palm Bay",
    addressRegion: "FL",
    postalCode: "32908",
    addressCountry: "US",
  },
  areaServed: { "@type": "Country", name: "United States" },
} as const;

export function OrganizationJsonLd() {
  const base = getSiteUrl();
  const data = { ...org, url: base, "@id": `${base}/#organization` };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
