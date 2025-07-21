import { articleCreateSchema } from '@/lib/zodSchemas.lib';
import { baseProcedure, createTRPCRouter } from '../init';
import clientPromise from '@/lib/database.lib';

export const appRouter = createTRPCRouter({
    create: baseProcedure
        .input(articleCreateSchema)
        .mutation(async({ input, ctx }) => {
            const client = await clientPromise;
            const db = client.db();

            const articles = db.collection("articles")

            const newArticle = {
                ...input,
                authorId: ctx.session.user.id,
                createdAt: new Date(),
            }

            const result = await articles.insertOne(newArticle);

            return {
                message: "Articulo creado",
                id: result.insertedId.toString(),
            }
        })
});

export type AppRouter = typeof appRouter;