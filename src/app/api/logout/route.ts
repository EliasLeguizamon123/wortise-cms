import { auth } from "@/lib/auth.lib"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.json({ error: "No session found" }, { status: 401 })
    }

    await auth.api.revokeSession({
        body: { token: session.session.token },
        headers: await headers(),
    })

    const response = NextResponse.json({ success: true })


    response.cookies.set("better-auth.session_token", "", {
        maxAge: 0,
        path: "/",
    });

    response.cookies.set("user", "", {
        maxAge: 0,
        path: "/",
    })

    return response
}