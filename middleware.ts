import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isChatPage = request.nextUrl.pathname.startsWith("/chat")
  const authToken = request.cookies.get("auth_token")

  // Allow access to chat page if we have an auth token
  if (isChatPage && authToken) {
    return NextResponse.next()
  }

  // Redirect to sign in if accessing chat without auth
  if (isChatPage) {
    return NextResponse.redirect(new URL("/auth/signin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/chat/:path*"],
} 