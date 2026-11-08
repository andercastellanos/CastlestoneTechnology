import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Auth-gated areas. Everything else (/, /sign-in, /sign-up, /account-pending,
// /api/webhooks/clerk, /api/twilio/*, marketing) stays PUBLIC by default —
// auth.protect() only runs for these matches.
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

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
