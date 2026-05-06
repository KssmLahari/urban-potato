import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Read the terms and conditions for using ${COMPANY.websiteDisplay}, including quote and reservation request terms.`,
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: { url: "/terms-and-conditions" },
};

const updatedOn = "May 6, 2026";

export default function TermsAndConditionsPage() {
  return (
    <section className="border-b border-blue-100/80 bg-gradient-to-b from-background via-blue-50/45 to-amber-50/30 px-4 py-14 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-blue-100/85 bg-surface/95 p-6 ring-1 ring-white/70 shadow-md shadow-blue-900/[0.05] sm:p-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.5rem]">
          Terms & Conditions
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
            These Terms &amp; Conditions apply to your use of{" "}
            {COMPANY.websiteDisplay}. By using this site, you agree to these
            terms.
          </p>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Informational use
            </h2>
            <p className="mt-3">
              Website content is provided for general informational purposes and
              may be updated at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Transportation compliance notice
            </h2>
            <p className="mt-3">
              {COMPANY.legalName} operates as a U.S. transportation business and
              follows applicable federal and state transportation rules. Nothing
              on this website should be interpreted as legal advice or a substitute
              for signed transportation agreements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Quotes and reservations
            </h2>
            <p className="mt-3">
              Quote and reservation requests submitted through this site are not
              binding until confirmed in writing by {COMPANY.legalName}. Service
              availability, pricing, and scheduling are subject to operational
              review.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Carrier and driver onboarding
            </h2>
            <p className="mt-3">
              Information about owner-operator and carrier onboarding is
              informational only. Eligibility is subject to internal screening,
              insurance verification, safety review, and compliance documentation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Acceptable use
            </h2>
            <p className="mt-3">
              You agree not to misuse this site, interfere with operations, or
              submit false, misleading, or unauthorized information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Limitation of liability
            </h2>
            <p className="mt-3">
              To the maximum extent permitted by law, {COMPANY.legalName} is not
              liable for indirect, incidental, or consequential damages arising
              from use of this site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Governing law
            </h2>
            <p className="mt-3">
              These terms are governed by applicable laws in the State of Florida,
              United States, unless otherwise required by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Contact
            </h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
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
