import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const handleI18n = createMiddleware(routing);

const publicRoutes = [
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
  "/about",
  "/terms",
  "/privacy",
  "/cookies",
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Bỏ locale prefix /en/ hoặc /vi/ khỏi pathname
  const pathnameWithoutLocale = pathname.replace(/^\/(en|vi)/, "") || "/";

  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathnameWithoutLocale === route ||
      pathnameWithoutLocale.startsWith(route + "/"),
  );

  const isAuthRoute = ["/login", "/register"].some(
    (route) =>
      pathnameWithoutLocale === route ||
      pathnameWithoutLocale.startsWith(route + "/"),
  );

  // Không có token mà vào route cần đăng nhập → redirect /login
  if (!refreshToken && !isPublicRoute) {
    const locale = request.cookies.get("NEXT_LOCALE")?.value || "vi";
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // Có token mà vào login/register → redirect /
  if (refreshToken && isAuthRoute) {
    const locale = request.cookies.get("NEXT_LOCALE")?.value || "vi";
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Set locale mặc định
  const localeCookie = request.cookies.get("NEXT_LOCALE");
  const response = handleI18n(request);
  if (!localeCookie) {
    response.cookies.set("NEXT_LOCALE", "vi", { maxAge: 60 * 60 * 24 * 365 });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
