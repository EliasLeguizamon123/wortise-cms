import { z } from 'zod';
import { articleCreateSchema } from '@/lib/zodSchemas.lib';
import { baseProcedure, createTRPCRouter } from '../init';
import clientPromise from '@/lib/database.lib';
import { Article, ArticleCreate } from '@/models/Article.model';

export const appRouter = createTRPCRouter({
    create: baseProcedure
        .input(articleCreateSchema)
        .mutation(async({ input, ctx }) => {
            const client = await clientPromise;
            const db = client.db();

            const articles = db.collection("articles");

            const newArticle: ArticleCreate = {
                ...input,
                authorId: ctx.session.user.id,
                createdAt: new Date().toString(),
            }

            const result = await articles.insertOne(newArticle);

            return {
                message: "Articulo creado",
                id: result.insertedId.toString(),
            }
        }),
    getAllArticles: baseProcedure
        .mutation(async () => {
            const client = await clientPromise;
            const db = client.db();
            const articles = db.collection<Article>("articles");
            const allArticles = await articles.find().toArray();

            return allArticles.map(article => ({
                ...article,
                id: article._id.toString(),
            }));
        }),
    getAllMyArticles: baseProcedure
        .query(async ({ ctx }) => {
            const client = await clientPromise;
            const db = client.db();
            const articles = db.collection<Article>("articles");
            const myArticles = await articles.find({ authorId: ctx.session.user.id }).toArray();

            return myArticles.map(article => ({
                ...article,
                id: article._id.toString(),
            }));

        }),
    getArticleById: baseProcedure
        .input(z.string())
        .mutation(async ({ input: id, ctx }) => {
            const client = await clientPromise;
            const db = client.db();
            const articles = db.collection<Article>("articles");
            const article = await articles.findOne({ _id: id, authorId: ctx.session.user.id });

            if (!article) {
                throw new Error("Articulo no encontrado");
            }

            await articles.updateOne(
                { _id: id },
                { $inc: { visitCount: 1 } }
            );

            return {
                ...article,
                id: article._id.toString(),
            };
        }),
    updateArticle: baseProcedure
        .input(z.object({
            id: z.string(),
            data: articleCreateSchema.partial()
        }))
        .mutation(async ( { input, ctx }) => {
            const client = await clientPromise;
            const db = client.db();
            const articles = db.collection<Article>("articles");
            
            const result = await articles.updateOne(
                {
                    _id: input.id,
                    authorId: ctx.session.user.id
                },
                {
                    $set: { ...input.data }
                }
            );

            if (result.modifiedCount === 0) {
                throw new Error("No se encontro el articulo o no tienes permisos");
            }

            return { message: "Articulo actualizado" };
        }),
    deleteArticleById: baseProcedure
        .input(z.string())
        .mutation(async ({ input: id, ctx }) => {
            const client = await clientPromise;
            const db = client.db();
            const articles = db.collection<Article>("articles");

            const result = await articles.deleteOne({
                _id: id,
                authorId: ctx.session.user.id
            })

            if (result.deletedCount === 0) {
                throw new Error("No se encontro el articulo o no tienes permisos");
            }

            return { message: "Articulo eliminado" };
        }),
    likeArticle: baseProcedure
        .input(z.string())
        .mutation(async ({ input: id, ctx }) => {
            const client = await clientPromise;
            const db = client.db();
            const articles = db.collection<Article>("articles");

            await articles.updateOne(
                { _id: id },
                { $addToSet: { likes: ctx.session.user.id } }
            )
        }),
    unlikeArticle: baseProcedure
        .input(z.string())
        .mutation(async ({ input: id, ctx }) => {
            const client = await clientPromise;
            const db = client.db();
            const articles = db.collection<Article>("articles");

            await articles.updateOne(
                { _id: id },
                { $pull: { likes: ctx.session.user.id } }
            )
        }),
    getAuthorsWithArticlesCount: baseProcedure.query(async () => {
        const client = await clientPromise;
        const db = client.db();
        const users = db.collection("user");

        const result = await users.aggregate([
            {
                $lookup: {
                    from: "articles",
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [ "$authorId", { $toString: "$$userId" } ]
                                }
                            }
                        }
                    ],
                    as: "articles"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    articlesCount: { $size: "$articles" }
                }
            }
        ]).toArray();

        return result.map(user => ({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            articlesCount: user.articlesCount
        }));
    })
});

export type AppRouter = typeof appRouter;