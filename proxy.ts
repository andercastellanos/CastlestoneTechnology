import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Auth-gated areas. auth.protect() only runs for these matches; the other
// routes in the matcher below (/sign-in, /sign-up, /account-pending,
// /client-login, /api/*) run Clerk but stay public at the proxy level.
const isProtectedRoute = createRouteMatcher([
  "/portal(.*)",
  "/va(.*)",
  "/admin(.*)",
  "/dashboard(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

// Clerk runs ONLY on app routes. The public marketing site (/, /es, /services,
// /blog, /pricing, /contact, /book-demo, /company, /privacy, /terms and their
// Spanish twins) is deliberately excluded: with a development Clerk instance,
// clerkMiddleware redirects cookieless text/html requests (Googlebot included)
// through Clerk's handshake, which made Search Console report those pages as
// "Excluded by 'noindex' tag". ClerkProvider in SiteRoot does not need the
// proxy on these pages because it is not rendered with `dynamic`.
//
// `:path*` matches zero or more segments, so "/portal/:path*" also covers
// "/portal" itself.
export const config = {
  matcher: [
    "/portal/:path*",
    "/va/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
    "/sign-in/:path*",
    "/sign-up/:path*",
    "/account-pending/:path*",
    "/client-login/:path*",
    "/api/:path*",
  ],
}
