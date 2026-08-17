import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const auth = request.cookies.get("Authentication")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // User is authenticated and tries to access login/signup
  if (auth && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // User is NOT authenticated and tries to access a private route
  if (!auth && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - common static files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
