import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import clientPromise from "./database.lib";

const client = await clientPromise;

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true
    },
    database: mongodbAdapter(client.db())
});