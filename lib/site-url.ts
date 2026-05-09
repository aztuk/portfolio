// Resolves the canonical base URL in priority order:
// 1. NEXT_PUBLIC_SITE_URL (set in Vercel for the production domain)
// 2. VERCEL_URL (injected automatically by Vercel for preview deployments)
// 3. localhost fallback for local dev
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
