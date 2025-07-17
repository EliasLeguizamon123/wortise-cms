import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies"

export async function middleware(request: Request) {
    const session = getSessionCookie(request)

    if ( !session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [ "/" ], // rutas protegidas
};