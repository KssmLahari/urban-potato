/** Live site (no trailing slash). Used for canonical URLs and JSON-LD. */
export const PUBLIC_SITE_ORIGIN = "https://nulientransportation.com";

/**
 * Canonical URL for metadata, OG tags, and JSON-LD.
 * - Uses NEXT_PUBLIC_SITE_URL when set (optional override).
 * - On Vercel **production**, always uses your custom domain — not *.vercel.app
 *   (VERCEL_URL would otherwise replace your public domain in the canonical URL).
 * - Preview deployments still use the Vercel preview URL.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  const isVercelProduction = process.env.VERCEL_ENV === "production";
  if (isVercelProduction) return PUBLIC_SITE_ORIGIN;

  const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercelUrl) return `https://${vercelUrl}`;

  return PUBLIC_SITE_ORIGIN;
}
