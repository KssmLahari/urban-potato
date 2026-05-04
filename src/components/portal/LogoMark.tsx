/**
 * Mark: semi + 53′ van silhouette on brand blue (reads at 32–40px in header/footer).
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="40" height="40" rx="9" className="fill-blue-800" />
      {/* Van box */}
      <path
        className="fill-white"
        d="M5 17h17v9H5v-9z"
        opacity="0.95"
      />
      {/* Cab + hood */}
      <path
        className="fill-white"
        d="M22 17h2.5l7.5 5.2V26H22v-9z"
      />
      {/* Windshield slice */}
      <path
        className="fill-blue-800"
        d="M24.5 18.2h4.8l3.2 2.2v1.1h-8v-3.3z"
        opacity="0.35"
      />
      {/* Chassis */}
      <path
        className="fill-blue-950"
        d="M5 26h30v2H5v-2z"
        opacity="0.5"
      />
      {/* Wheels */}
      <circle cx="11" cy="29" r="2.6" className="fill-slate-900" />
      <circle cx="20" cy="29" r="2.6" className="fill-slate-900" />
      <circle cx="31" cy="29" r="2.4" className="fill-slate-900" />
      <circle cx="11" cy="29" r="1" className="fill-slate-600" />
      <circle cx="20" cy="29" r="1" className="fill-slate-600" />
      <circle cx="31" cy="29" r="0.85" className="fill-slate-600" />
    </svg>
  );
}
