import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdmin = createRouteMatcher(['/admin(.*)'])

const isPublic = createRouteMatcher(['/', '/products(.*)', '/about'])
export default clerkMiddleware((auth, req) => {
  const isUserAdmin = auth().userId === process.env.ADMIN_ID
  if (isAdmin(req) && !isUserAdmin) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  if (!isPublic(req)) auth().protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
