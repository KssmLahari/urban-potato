import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Read the privacy policy for ${COMPANY.displayName}, including what information we collect and how we use contact and reservation request data.`,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { url: "/privacy-policy" },
};

const updatedOn = "May 6, 2026";

export default function PrivacyPolicyPage() {
  return (
    <section className="border-b border-blue-100/80 bg-gradient-to-b from-background via-blue-50/45 to-amber-50/30 px-4 py-14 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-blue-100/85 bg-surface/95 p-6 ring-1 ring-white/70 shadow-md shadow-blue-900/[0.05] sm:p-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.5rem]">
          Privacy Policy
        </h1>
        <div
          className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-amber-300 shadow-sm shadow-amber-500/20"
          aria-hidden
        />
        <p className="mt-4 text-base text-muted sm:text-[1.03rem]">
          Last updated: {updatedOn}
        </p>

        <div className="mt-8 space-y-8 text-[1.04rem] leading-8 text-slate-700 sm:text-[1.08rem]">
          <p>
            {COMPANY.legalName} operates {COMPANY.websiteDisplay}. In this policy,
            &quot;we,&quot; &quot;our,&quot; and &quot;us&quot; refer to{" "}
            {COMPANY.legalName}. This page explains what information we collect
            through the website and how we use it.
          </p>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Information we collect
            </h2>
            <p className="mt-3">
              We collect information you choose to provide, such as your name,
              company details, email address, phone number, lane details, and
              reservation or quote request notes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              How we use information
            </h2>
            <p className="mt-3">
              We use submitted information to respond to inquiries, provide
              quotes, coordinate dispatch and reservations, and communicate about
              services relevant to your request.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Data sharing
            </h2>
            <p className="mt-3">
              We do not sell personal information. We may share information with
              operational partners (such as owner-operators or service providers)
              only when needed to evaluate or perform requested transportation
              services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Data retention
            </h2>
            <p className="mt-3">
              We keep contact and request records only as long as needed for
              business, legal, and service operations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Driver and carrier applicant data
            </h2>
            <p className="mt-3">
              If you submit owner-operator or carrier onboarding details, we use
              that information only for qualification, safety review, dispatch
              coordination, and legal/compliance recordkeeping.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Contact
            </h2>
            <p className="mt-3">
              For questions about this policy, contact us at{" "}
              <a
                href={`mailto:${COMPANY.infoEmail}`}
                className="font-medium text-accent underline underline-offset-2"
              >
                {COMPANY.infoEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
