import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Quote Request",
  description: `Request a freight quote from ${COMPANY.displayName}. Share pickup, delivery, and freight details to get pricing and availability.`,
  alternates: { canonical: "/reservation" },
  openGraph: { url: "/reservation" },
};

export default function ReservationPage() {
  return (
    <section className="border-b border-blue-100/80 bg-gradient-to-b from-background via-blue-50/45 to-amber-50/30 px-4 py-14 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.5rem]">
          Freight quote request
        </h1>
        <div
          className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-amber-300 shadow-sm shadow-amber-500/20"
          aria-hidden
        />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Share your pickup lane, delivery timing, equipment type, and cargo
          details. Our dispatch team reviews requests quickly and replies with
          pricing and next steps.
        </p>

        <form
          className="mt-10 rounded-2xl border border-blue-100/85 bg-surface/95 p-5 ring-1 ring-white/70 shadow-md shadow-blue-900/[0.05] sm:p-6"
          action={`mailto:${COMPANY.infoEmail}`}
          method="post"
          encType="text/plain"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Company
              </span>
              <input
                name="company"
                type="text"
                className="min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 focus:ring-2"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Contact name
              </span>
              <input
                name="contact"
                type="text"
                className="min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 focus:ring-2"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                className="min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 focus:ring-2"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Equipment needed
              </span>
              <select
                name="equipment"
                defaultValue=""
                className="min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 focus:ring-2"
              >
                <option value="" disabled>
                  Select equipment
                </option>
                <option value="53-foot dry van">53-foot dry van</option>
                <option value="Reefer trailer">Reefer trailer</option>
                <option value="Flatbed trailer">Flatbed trailer</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Pickup window
              </span>
              <input
                name="pickup"
                type="text"
                placeholder="City, state and date/time"
                className="min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 focus:ring-2"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Delivery deadline
              </span>
              <input
                name="delivery"
                type="text"
                placeholder="City, state and date/time"
                className="min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 focus:ring-2"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Freight details
              </span>
              <textarea
                name="details"
                rows={6}
                placeholder="Commodity, weight, pallet count, special handling, appointment requirements"
                className="min-h-[9rem] w-full resize-y rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 focus:ring-2"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 min-h-[52px] w-full rounded-full bg-cta px-8 py-3.5 text-base font-bold text-cta-foreground shadow-lg shadow-amber-900/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover sm:w-auto"
          >
            Open email to send quote request
          </button>
          <p className="mt-4 text-xs text-muted">
            This opens your email app and drafts a quote request to{" "}
            {COMPANY.infoEmail}.
          </p>
        </form>
      </div>
    </section>
  );
}
