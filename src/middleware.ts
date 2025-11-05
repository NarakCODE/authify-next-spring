import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/configs/i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Check for locale in cookie
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  const locale =
    localeCookie && i18n.locales.includes(localeCookie as never)
      ? localeCookie
      : i18n.defaultLocale;

  // Redirect to locale-prefixed URL
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  ],
};
