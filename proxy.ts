import {
  convexAuthNextjsMiddleware,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/locales";

const authProxy = convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const { pathname } = request.nextUrl;
    const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
    const isLoginRoute = pathname === "/admin/login";

    if (isAdminRoute && !isLoginRoute && !(await convexAuth.isAuthenticated())) {
      const next = `${pathname}${request.nextUrl.search}`;
      return nextjsMiddlewareRedirect(
        request,
        `/admin/login?next=${encodeURIComponent(next)}`
      );
    }

    if (isLoginRoute && (await convexAuth.isAuthenticated())) {
      return nextjsMiddlewareRedirect(request, "/admin");
    }

    return localeProxy(request);
  },
  {
    cookieConfig: { maxAge: 60 * 60 * 4 },
  }
);

function localeProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (firstSegment === "api") return NextResponse.next();
  if (firstSegment === "admin") return NextResponse.next();
  if (isLocale(firstSegment)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  return authProxy(request, event);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
