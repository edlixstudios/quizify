import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === "/signin") {
        return NextResponse.redirect(new URL("/", req.url));
    }
}
