import { registerSchema } from "@/lib/zodSchemas.lib";
import clientPromise from "@/lib/database.lib";

async function main() {
    const client = await clientPromise;
    const db = client.db();

    const users = db.collection("users");

    const userData = {
        name: "Elias",
        email: "elias@example.com",
        password: "1234",
    };

    const parseResult = registerSchema.safeParse(userData);

    if (!parseResult.success) {
        console.error("❌ Datos inválidos:", parseResult.error.format());
        process.exit(1);
    }

    const existing = await users.findOne({ email: userData.email });

    if (existing) {
        console.log("⚠️ Usuario ya existe. Abortando.");
        process.exit(0);
    }

    await users.insertOne(userData);

    console.log("✅ Usuario insertado correctamente en MongoDB Atlas");
    process.exit(0);
}

main().catch((err) => {
    console.error("❌ Error al ejecutar el seed:", err);
    process.exit(1);
});
