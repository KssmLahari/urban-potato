import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about freight service, reservations, and onboarding with ${COMPANY.displayName}.`,
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq" },
};

const faqs = [
  {
    q: "What areas do you cover?",
    a: "We support freight lanes throughout the continental United States.",
  },
  {
    q: "How do I request a quote or reservation?",
    a: "Use the Contact or Reservation page and share lane, equipment, and timing details. Dispatch follows up with availability.",
  },
  {
    q: "What equipment do you support?",
    a: "We coordinate 53-foot dry van, reefer, and flatbed requirements based on shipment needs.",
  },
  {
    q: "Do you work with owner-operators?",
    a: "Yes. Qualified owner-operators and partner carriers can apply through the Carrier Onboarding page.",
  },
  {
    q: "How quickly do you respond?",
    a: "We aim for fast turnaround on quote and reservation requests during business hours.",
  },
];

export default function FaqPage() {
  return (
    <section className="border-b border-blue-100/80 bg-gradient-to-b from-background via-blue-50/45 to-amber-50/30 px-4 py-14 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-blue-100/85 bg-surface/95 p-6 ring-1 ring-white/70 shadow-md shadow-blue-900/[0.05] sm:p-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.5rem]">
          Frequently Asked Questions
        </h1>
        <div
          className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-amber-300 shadow-sm shadow-amber-500/20"
          aria-hidden
        />
        <p className="mt-6 text-[1.04rem] leading-8 text-slate-700 sm:text-[1.08rem]">
          Quick answers to common shipping, reservation, and onboarding questions.
          If you need a direct response, email{" "}
          <a
            href={`mailto:${COMPANY.infoEmail}`}
            className="font-medium text-accent underline underline-offset-2"
          >
            {COMPANY.infoEmail}
          </a>
          .
        </p>

        <div className="mt-8 space-y-4">
          {faqs.map((item) => (
            <article
              key={item.q}
              className="rounded-xl border border-blue-100/85 bg-white/85 p-5"
            >
              <h2 className="font-display text-lg font-bold text-slate-900">
                {item.q}
              </h2>
              <p className="mt-2 text-[1.02rem] leading-7 text-slate-700">
                {item.a}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
