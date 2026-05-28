// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const handleI18n = createMiddleware(routing);

// Các route không cần đăng nhập
const publicRoutes = [
  "/login",
  "/register",
  "/about",
  "/terms",
  "/privacy",
  "/cookies",
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Bỏ qua locale prefix (/en/login → /login)
  const pathnameWithoutLocale = pathname.replace(/^\/(en|vi)/, "") || "/";

  const isPublicRoute = publicRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );
  const isAuthRoute = ["/login", "/register"].some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  // Có token mà vào login/register → redirect /
  if (refreshToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Không có token mà vào route cần đăng nhập → redirect /login
  if (!refreshToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
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
