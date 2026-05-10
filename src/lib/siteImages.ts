/**
 * Public URLs under /public/images/nulien — generated / branded fleet visuals.
 * Import these wherever we render <Image> so paths stay one source of truth.
 */

/**
 * In `next dev`, the `/_next/image` optimizer caches resized blobs under `.next`.
 * After swapping files in `public/`, URLs can still show old pixels until the cache
 * is cleared—use `unoptimized` in development so the browser loads `/images/...` directly.
 */
export const bypassImageOptimizerInDev =
  process.env.NODE_ENV === "development";

export const SITE_IMAGES = {
  heroSemiReefer: "/images/nulien/hero-semi-reefer.png",
  usCoverageMap: "/images/nulien/us-coverage-map.svg",
  reeferCapabilities: "/images/nulien/reefer-capabilities.png",
  flatbedHaulingSupport: "/images/nulien/flatbed-hauling-support.png",
  cabProfile: "/images/nulien/cab-profile.png",
  cabPalmBay: "/images/nulien/cab-palm-bay.png",
} as const;
