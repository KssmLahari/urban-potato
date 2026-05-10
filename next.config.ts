import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    /** Allows `quality={100}` on hero `<Image />` without optimizer warnings/fallbacks. */
    qualities: [75, 100],
    /** Avoid long-lived optimizer cache while iterating on files in `public/` during dev. */
    minimumCacheTTL:
      process.env.NODE_ENV === "development"
        ? 0
        : 60 * 60 * 24,
  },
  async headers() {
    const headers: { key: string; value: string }[] = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), accelerometer=()",
      },
    ];

    /**
     * HSTS only on Vercel so local `next dev` over http://localhost does not
     * advertise strict HTTPS for your machine.
     */
    if (process.env.VERCEL === "1") {
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      });
    }

    /**
     * Omit X-Frame-Options: DENY — it breaks some embedded / in-app browsers
     * (iframes). This is a public marketing site; clickjacking risk is low.
     */

    return [{ source: "/(.*)", headers }];
  },
};

export default nextConfig;
