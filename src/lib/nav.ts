/** Primary routes — used in header, mobile menu, and footer. */

export const PRIMARY_NAV = [
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/reservation", label: "Quote" },
  { href: "/chat", label: "Chat" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Staff-only — linked in footer and on /chat (not in main header nav). */
export const STAFF_PORTAL = {
  href: "/admin/login",
  label: "Dispatch inbox",
} as const;
