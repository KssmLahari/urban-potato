import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Carrier Onboarding",
  description: `Owner-operator and carrier onboarding information for ${COMPANY.displayName}, including documentation and compliance expectations.`,
  alternates: { canonical: "/carrier-onboarding" },
  openGraph: { url: "/carrier-onboarding" },
};

const requirements = [
  "Active operating authority and legal business registration",
  "Valid insurance certificates meeting current load requirements",
  "Equipment details (type, condition, and operating readiness)",
  "Driver qualification and safety documentation as requested",
  "Reliable communication for dispatch, updates, and delivery confirmations",
];

export default function CarrierOnboardingPage() {
  return (
    <section className="border-b border-blue-100/80 bg-gradient-to-b from-background via-blue-50/45 to-amber-50/30 px-4 py-14 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-blue-100/85 bg-surface/95 p-6 ring-1 ring-white/70 shadow-md shadow-blue-900/[0.05] sm:p-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.5rem]">
          Carrier Onboarding
        </h1>
        <div
          className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-amber-300 shadow-sm shadow-amber-500/20"
          aria-hidden
        />
        <p className="mt-6 text-[1.04rem] leading-8 text-slate-700 sm:text-[1.08rem]">
          We work with owner-operators and partner carriers who maintain strong
          safety standards, operational reliability, and professional customer
          communication. Qualification is reviewed case-by-case.
        </p>

        <h2 className="mt-8 font-display text-xl font-bold text-slate-900">
          Typical onboarding requirements
        </h2>
        <ul className="mt-3 list-disc space-y-2.5 pl-5 text-[1.04rem] leading-8 text-slate-700 sm:text-[1.08rem]">
          {requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="mt-8 font-display text-xl font-bold text-slate-900">
          Next step
        </h2>
        <p className="mt-3 text-[1.04rem] leading-8 text-slate-700 sm:text-[1.08rem]">
          Send your company profile and equipment details to{" "}
          <a
            href={`mailto:${COMPANY.infoEmail}`}
            className="font-medium text-accent underline underline-offset-2"
          >
            {COMPANY.infoEmail}
          </a>
          . Our team will follow up with documentation requests and partnership
          terms if alignment is confirmed.
        </p>
      </div>
    </section>
  );
}
