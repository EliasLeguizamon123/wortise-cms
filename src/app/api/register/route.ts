import { auth } from "@/lib/auth.lib";
import { registerSchema } from "@/lib/zodSchemas.lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, email, password } = result.data;

    const response = await auth.api.signUpEmail({
        body: { email, password, name },
        asResponse: true
    });

    return response;
}
