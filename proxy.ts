import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIES } from "@/constants/api-registery";

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

    if (!token && !pathName.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && pathName.startsWith("/login")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}