import type { NextRequest } from "next/server";

import { authMiddleware } from "@concise-docs/auth/middleware";

export async function middleware(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  return authResponse;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
