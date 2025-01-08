import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// Adjust as needed
const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If public route, allow
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Attempt to read token (Edge-compatible)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Authenticated - continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
