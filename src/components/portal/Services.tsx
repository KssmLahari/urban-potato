import { COMPANY } from "@/lib/company";

const items = [
  {
    title: "Point-to-point freight",
    body: COMPANY.mission,
  },
  {
    title: "Nationwide reach",
    body: `${COMPANY.coverage} We run semi-truck and 53-foot dry van equipment built for long-haul reliability.`,
  },
  {
    title: "Safety & accountability",
    body: "Clear communication, careful securement, and respect for your timelines—so you always know where your freight stands.",
  },
  {
    title: "Owner-operator partners",
    body: "We partner with owner-operators who own their trucks and share our standards for equipment, professionalism, and on-time service.",
  },
];

const headingClass =
  "font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl";

export function Services({ standalone = false }: { standalone?: boolean }) {
  const title = "How we serve shippers";
  return (
    <section
      {...(!standalone ? { id: "services" } : {})}
      className={
        standalone
          ? "border-b border-border bg-surface px-4 py-16 sm:px-6 sm:py-28"
          : "scroll-mt-20 border-b border-border bg-surface px-4 py-16 sm:px-6 sm:py-28"
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          {standalone ? (
            <h1 className={headingClass}>{title}</h1>
          ) : (
            <h2 className={headingClass}>{title}</h2>
          )}
          <p className="mt-4 text-base text-muted sm:text-lg">
            From Palm Bay, Florida to loading docks across the continental United
            States—one carrier focused on trust and safe delivery.
          </p>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-border bg-background p-5 shadow-md shadow-slate-900/[0.04] transition hover:border-blue-200 hover:shadow-lg sm:p-6 lg:p-8"
            >
              <h3 className="font-display text-xl font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
