import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/zodSchemas.lib";
import clientPromise from "@/lib/database.lib";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parseResult = registerSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json(
                { error: "Datos inválidos", details: parseResult.error.format() },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db();
        const users = db.collection("users");

        const existing = await users.findOne({ email: body.email });

        if (existing) {
            return NextResponse.json(
                { message: "Usuario ya existe" },
                { status: 409 }
            );
        }

        await users.insertOne(body);

        return NextResponse.json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error("Error creando usuario:", error);

        return NextResponse.json(
            { error: "Error interno", details: error },
            { status: 500 }
        );
    }
}
