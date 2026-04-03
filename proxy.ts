import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIES } from "@/constants/api-registery";
import { Log } from "@/lib/utils";

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};

export function proxy(req: NextRequest) {
    const pathName = req.nextUrl.pathname;
    
    if (
        pathName.startsWith("/_next") ||
        pathName.startsWith("/favicon") ||
        pathName.includes(".")
    ) {
        return NextResponse.next();
    }

    const token = req.cookies.get(ADMIN_COOKIES.refreshToken)?.value;
    Log('checking in proxy', {
        token,
        pathName,
        one: pathName.startsWith("/login"),
        two: !token,
        three: req.nextUrl.searchParams.get('redirect'),
    })

    if (req.nextUrl.searchParams.get('redirect') && pathName === "/login") {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (!token && !pathName.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}