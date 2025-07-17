import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const isProtectedRoute = req.nextUrl.pathname === "/";
    // const session = await auth.api.getSession({
    //     headers: await headers()
    // })

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [ "/" ], // protected routes
};
