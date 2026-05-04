"use client";

import {
  COMPANY,
  getAppleMapsUrl,
  getGoogleMapsUrl,
} from "@/lib/company";

export function ContactCTA() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-slate-950 px-4 py-20 text-white sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s talk about your freight
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Share your lane, timing, and equipment needs—we&apos;ll follow up
              with availability and next steps.
            </p>
            <dl className="mt-10 space-y-5 text-slate-300">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${COMPANY.phoneTel}`}
                    className="text-lg font-medium text-white underline-offset-4 hover:underline"
                  >
                    {COMPANY.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-lg break-all text-white underline-offset-4 hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                  Office
                </dt>
                <dd className="mt-1 text-lg leading-snug">
                  <a
                    href={getGoogleMapsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-white underline decoration-blue-400/80 underline-offset-4 transition hover:decoration-white"
                  >
                    {COMPANY.addressLine1}
                    <br />
                    {COMPANY.addressLine2}
                  </a>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
                    <a
                      href={getGoogleMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 underline-offset-2 hover:text-white hover:underline"
                    >
                      Google Maps
                    </a>
                    <a
                      href={getAppleMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 underline-offset-2 hover:text-white hover:underline"
                    >
                      Apple Maps
                    </a>
                  </div>
                </dd>
              </div>
            </dl>
            <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="font-display text-lg font-bold text-white">
                Owner-operators
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                We partner with owner-operators who own their trucks and meet our
                standards for safety, communication, and presentation. Mention
                your authority, equipment, and preferred lanes in your message—we
                will respond with partnership options when they align.
              </p>
            </div>
          </div>
          <form
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8"
            onSubmit={(e) => {
              const form = e.currentTarget;
              const fd = new FormData(form);
              const name = String(fd.get("name") ?? "").trim();
              const company = String(fd.get("company") ?? "").trim();
              const email = String(fd.get("email") ?? "").trim();
              const details = String(fd.get("details") ?? "").trim();
              const subject = encodeURIComponent(
                `Freight inquiry — ${company || name || "Nulien web form"}`,
              );
              const body = encodeURIComponent(
                `Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\n${details}`,
              );
              window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
              e.preventDefault();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-1">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">
                  Name
                </span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-blue-500/50 placeholder:text-slate-600 focus:ring-2"
                  placeholder="Your name"
                />
              </label>
              <label className="sm:col-span-1">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">
                  Company
                </span>
                <input
                  name="company"
                  type="text"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-blue-500/50 placeholder:text-slate-600 focus:ring-2"
                  placeholder="Company (optional)"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-blue-500/50 placeholder:text-slate-600 focus:ring-2"
                  placeholder="you@company.com"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">
                  Lane / freight details
                </span>
                <textarea
                  name="details"
                  rows={4}
                  className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none ring-blue-500/50 placeholder:text-slate-600 focus:ring-2"
                  placeholder="Origin, destination, dates, commodity, equipment needed…"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-accent py-3 text-base font-semibold text-white transition hover:bg-accent-hover sm:w-auto sm:px-10"
            >
              Open email to send
            </button>
            <p className="mt-4 text-xs text-slate-500">
              Opens your email app with a pre-filled message to {COMPANY.email}.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
