import { auth } from "@/lib/auth.lib";
import { loginSchema } from "@/lib/zodSchemas.lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const result = loginSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { email, password } = result.data;

    const response = await auth.api.signInEmail({
        body: { email, password },
        asResponse: true
    });

    return response;
}
