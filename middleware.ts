import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  const path = new URL(request.nextUrl).pathname;

  const protected_routes = ["/admin", "/raport"];
  const auth_routes = ["/auth/login", "/auth/create-account"];
  const admin_routes = ["/admin"];

  const isProtectedRoute = protected_routes.includes(path);
  const isAuthRoute = auth_routes.includes(path);
  const isAdminRoute = admin_routes.includes(path);

  if (isProtectedRoute || isAuthRoute || isAdminRoute) {
    const user = await getUser(supabaseResponse, request);
    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isAuthRoute && user) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isAdminRoute && user?.user_metadata.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  return NextResponse.next();
}

export async function getUser(response: NextResponse, request: NextRequest) {
  const supabaseClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );
  const user = (await supabaseClient.auth.getUser()).data.user;

  return user;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
