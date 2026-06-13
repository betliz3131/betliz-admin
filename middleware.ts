import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // login sayfasını serbest bırak
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // supabase session cookie kontrolü (genel kontrol)
  const hasSession =
    req.cookies.get("sb-access-token") ||
    req.cookies.get("supabase-auth-token");

  // login yoksa login'e at
  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// hangi sayfalarda çalışacak
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};