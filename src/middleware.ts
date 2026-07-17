import { type NextRequest, NextResponse } from "next/server";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getInternalPathname, localizePathname } from "@/i18n/routing";

const localeCookie = "NEXT_LOCALE";

function preferredLocale(request: NextRequest): Locale {
  const savedLocale = request.cookies.get(localeCookie)?.value;
  if (isLocale(savedLocale)) return savedLocale;

  const acceptedLanguages = request.headers.get("accept-language") ?? "";
  return /(?:^|,)\s*vi(?:-|;|,|$)/i.test(acceptedLanguages)
    ? "vi"
    : defaultLocale;
}

export function middleware(request: NextRequest) {
  const resolved = getInternalPathname(request.nextUrl.pathname);

  if (!resolved) {
    const destination = request.nextUrl.clone();
    destination.pathname = localizePathname(
      request.nextUrl.pathname,
      preferredLocale(request),
    );
    return NextResponse.redirect(destination, 307);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-qunara-locale", resolved.locale);

  if (resolved.pathname === "/") {
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.cookies.set(localeCookie, resolved.locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  if (resolved.pathname === "/about") {
    const destination = request.nextUrl.clone();
    destination.pathname = `/${resolved.locale}/about`;
    const isCanonicalInternalPath = request.nextUrl.pathname === destination.pathname;
    const response = isCanonicalInternalPath
      ? NextResponse.next({ request: { headers: requestHeaders } })
      : NextResponse.rewrite(destination, { request: { headers: requestHeaders } });
    response.cookies.set(localeCookie, resolved.locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  const destination = request.nextUrl.clone();
  destination.pathname = resolved.pathname;

  const response = NextResponse.rewrite(destination, {
    request: { headers: requestHeaders },
  });
  response.cookies.set(localeCookie, resolved.locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
