import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { token } = await req.json();

    (await cookies()).set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24
    })

    return NextResponse.json({ ok: true });
}

export async function DELETE() {
    (await cookies()).set("token", "", { maxAge: 0, path: "/" })

    return NextResponse.json({ ok: true });
}