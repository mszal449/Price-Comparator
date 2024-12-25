import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = ["/raport"];
  const adminRoutes = ["/admin"];

  // Function to check if pathname starts with any route in the array
  const startsWith = (routes: string[]) =>
    routes.some((route) => pathname.startsWith(route));

  if (startsWith(protectedRoutes) || startsWith(adminRoutes)) {
    // Retrieve the token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      // If no token, redirect to login
      const loginUrl = new URL("/auth/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    if (startsWith(adminRoutes) && token.role !== "admin") {
      // If accessing admin routes and not an admin, redirect to unauthorized
      const unauthorizedUrl = new URL("/unauthorized", req.url);
      return NextResponse.redirect(unauthorizedUrl);
    }

    // If authenticated (and has appropriate role for admin routes), allow access
    return NextResponse.next();
  }

  // If the route is not protected, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/raport/:path*", "/admin/:path*", "/api/auth/:path*"],
};
