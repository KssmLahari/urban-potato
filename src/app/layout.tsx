import type { Metadata, Viewport } from "next";
import { Archivo, Outfit } from "next/font/google";
import { SiteShell } from "@/components/portal/SiteShell";
import { COMPANY } from "@/lib/company";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const siteUrl = getSiteUrl();

const metaDescription = `${COMPANY.mission} ${COMPANY.displayName} is a veteran-owned carrier based in Palm Bay, Florida, serving the continental United States.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: COMPANY.websiteDisplay,
  title: {
    default: `${COMPANY.displayName} | ${COMPANY.websiteDisplay}`,
    template: `%s | ${COMPANY.websiteDisplay}`,
  },
  description: metaDescription,
  openGraph: {
    title: `${COMPANY.displayName} | ${COMPANY.websiteDisplay}`,
    description: metaDescription,
    type: "website",
    locale: "en_US",
    siteName: COMPANY.websiteDisplay,
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.displayName} | ${COMPANY.websiteDisplay}`,
    description: metaDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#content"
          className="pointer-events-none fixed left-4 top-4 z-[100] -translate-y-16 rounded-full bg-blue-900 px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition focus:pointer-events-auto focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
