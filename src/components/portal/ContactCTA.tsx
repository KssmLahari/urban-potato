"use client";

import {
  COMPANY,
  getAppleMapsUrl,
  getGoogleMapsUrl,
} from "@/lib/company";
import { PUBLIC_SITE_ORIGIN } from "@/lib/site";

const headingClass =
  "font-display text-3xl font-bold tracking-tight sm:text-4xl";

const contactSectionBase =
  "relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white";

export function ContactCTA({ standalone = false }: { standalone?: boolean }) {
  const title = "Let's talk about your freight";
  return (
    <section
      {...(!standalone ? { id: "contact" } : {})}
      className={
        standalone
          ? `${contactSectionBase} px-4 pb-[max(4rem,env(safe-area-inset-bottom,0px))] pt-16 sm:px-6 sm:pb-28 sm:pt-28`
          : `scroll-mt-20 ${contactSectionBase} px-4 py-16 sm:px-6 sm:py-28`
      }
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-blue-600"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-blue-600/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 h-48 w-48 rounded-full bg-amber-400/20 blur-3xl"
        aria-hidden
      />
      <div className="relative z-20 mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            {standalone ? (
              <h1 className={headingClass}>{title}</h1>
            ) : (
              <h2 className={headingClass}>{title}</h2>
            )}
            <div
              className="mt-4 h-1 w-16 max-w-full rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-blue-500 shadow-sm shadow-amber-500/30"
              aria-hidden
            />
            <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
              Share your lane, timing, and equipment needs—we&apos;ll follow up
              with availability and next steps.
            </p>
            <dl className="mt-10 space-y-5 text-slate-300">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-yellow-200">
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
                <dt className="text-xs font-semibold uppercase tracking-wider text-yellow-200">
                  Dispatch inbox
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${COMPANY.infoEmail}`}
                    className="text-lg break-all text-white underline-offset-4 hover:underline"
                  >
                    {COMPANY.infoEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-yellow-200">
                  Owner inbox
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${COMPANY.ownerEmail}`}
                    className="text-lg break-all text-white underline-offset-4 hover:underline"
                  >
                    {COMPANY.ownerEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-yellow-200">
                  Website
                </dt>
                <dd className="mt-1">
                  <a
                    href={PUBLIC_SITE_ORIGIN}
                    className="text-lg text-white underline-offset-4 hover:underline"
                  >
                    {COMPANY.websiteDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-yellow-200">
                  Office
                </dt>
                <dd className="mt-1 text-lg leading-snug">
                  <a
                    href={getGoogleMapsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-white underline decoration-yellow-400/70 underline-offset-4 transition hover:decoration-yellow-200"
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
                      className="text-yellow-300 underline-offset-2 hover:text-white hover:underline"
                    >
                      Google Maps
                    </a>
                    <a
                      href={getAppleMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-300 underline-offset-2 hover:text-white hover:underline"
                    >
                      Apple Maps
                    </a>
                  </div>
                </dd>
              </div>
            </dl>
            <div className="mt-10 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-5 shadow-lg shadow-black/20 ring-1 ring-amber-400/20 backdrop-blur-sm">
              <h3 className="font-display text-lg font-bold text-white">
                Owner-operators
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                We partner with owner-operators who own their trucks and meet our
                standards for safety, communication, and presentation. Mention
                your authority, equipment, and preferred lanes in your message—we
                will respond with partnership options when they align.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Mailbox forwarding can be set so both public inboxes route to{" "}
                {COMPANY.email}.
              </p>
            </div>
          </div>
          <form
            className="rounded-2xl border border-slate-700/90 bg-slate-900/55 p-5 shadow-[inset_0_1px_0_0_rgba(59,130,246,0.12)] shadow-black/30 backdrop-blur-sm sm:p-8"
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
              window.location.href = `mailto:${COMPANY.infoEmail}?subject=${subject}&body=${body}`;
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
                  className="min-h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white outline-none ring-yellow-400/40 focus:ring-2"
                />
              </label>
              <label className="sm:col-span-1">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">
                  Company
                </span>
                <input
                  name="company"
                  type="text"
                  className="min-h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white outline-none ring-yellow-400/40 focus:ring-2"
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
                  className="min-h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white outline-none ring-yellow-400/40 focus:ring-2"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">
                  Lane / freight details
                </span>
                <textarea
                  name="details"
                  rows={5}
                  className="min-h-[8.5rem] w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base text-white outline-none ring-yellow-400/40 focus:ring-2"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 min-h-[52px] w-full rounded-full bg-cta py-3.5 text-base font-bold text-cta-foreground shadow-lg shadow-amber-950/35 transition-all duration-200 active:bg-yellow-500 hover:-translate-y-0.5 hover:bg-cta-hover sm:w-auto sm:px-10"
            >
              Open email to send
            </button>
            <p className="mt-4 text-xs text-slate-500">
              Opens your email app with a pre-filled message to {COMPANY.infoEmail}.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
