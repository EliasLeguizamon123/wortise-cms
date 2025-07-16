import { loginSchema, registerSchema } from '@/lib/zodSchemas.lib';
import { baseProcedure, createTRPCRouter } from '../init';
import { v4 as uuidv4 } from "uuid";
import clientPromise from '@/lib/database.lib';
import { TRPCError } from '@trpc/server';
import bcrypt from "bcryptjs";

export const appRouter = createTRPCRouter({
    register: baseProcedure
        .input(registerSchema)
        .mutation(async ({ input }) => {
            const client = await clientPromise;
            const db = client.db();
            const users = db.collection("users");

            const existingUser = await users.findOne({ email: input.email });

            if (existingUser) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Usuario existente",
                });
            }

            const hashedPassword = await bcrypt.hash(input.password, 10);

            await users.insertOne({
                name: input.name,
                email: input.email,
                password: hashedPassword
            });

            return {
                message: "Usuario registrado exitosamente",
                token: uuidv4(),
            };
        }),
    login: baseProcedure
        .input(loginSchema)
        .mutation(async ({ input }) => {
            const client = await clientPromise;
            const db = client.db();
            const users = db.collection("users");

            const user = await users.findOne({ email: input.email });
            const passwordValid = await bcrypt.compare(input.password, user?.password);

            if (!user || !passwordValid) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Credenciales incorrectas",
                });
            }

            return {
                message: "Login exitoso",
                token: uuidv4(),
            };
        }),
});

export type AppRouter = typeof appRouter;