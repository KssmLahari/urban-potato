import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Feedback",
  description: `Share service feedback with ${COMPANY.displayName}.`,
  alternates: { canonical: "/feedback" },
  openGraph: { url: "/feedback" },
};

export default function FeedbackPage() {
  return (
    <section className="border-b border-blue-100/80 bg-gradient-to-b from-background via-blue-50/45 to-amber-50/30 px-4 py-14 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-blue-100/85 bg-surface/95 p-6 ring-1 ring-white/70 shadow-md shadow-blue-900/[0.05] sm:p-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.5rem]">
          Share Feedback
        </h1>
        <div
          className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-amber-300 shadow-sm shadow-amber-500/20"
          aria-hidden
        />
        <p className="mt-6 text-[1.04rem] leading-8 text-slate-700 sm:text-[1.08rem]">
          We value every shipment review. Send feedback about communication,
          on-time performance, and overall service.
        </p>

        <form
          className="mt-8 rounded-2xl border border-blue-100/85 bg-white/85 p-5 sm:p-6"
          action={`mailto:${COMPANY.infoEmail}`}
          method="post"
          encType="text/plain"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Name
              </span>
              <input
                name="name"
                type="text"
                className="min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 focus:ring-2"
              />
            </label>
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
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Star rating
              </span>
              <select
                name="rating"
                defaultValue=""
                className="min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 focus:ring-2"
              >
                <option value="" disabled>
                  Select a rating
                </option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Feedback
              </span>
              <textarea
                name="feedback"
                rows={6}
                placeholder="Tell us what went well and where we can improve."
                className="min-h-[9rem] w-full resize-y rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 focus:ring-2"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 min-h-[52px] w-full rounded-full bg-cta px-8 py-3.5 text-base font-bold text-cta-foreground shadow-lg shadow-amber-900/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover sm:w-auto"
          >
            Open email to send feedback
          </button>
        </form>
      </div>
    </section>
  );
}
