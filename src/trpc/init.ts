import { auth } from '@/lib/auth.lib';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { headers } from 'next/headers';

export const createTRPCContext = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    return {
        session,
    };
};

const t = initTRPC.context<TRPCContext>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

export const baseProcedure = t.procedure.use(async (otps) => {
    const { ctx } = otps;

    if (!ctx.session) {
        throw new Error("No autorizado");
    }

    return otps.next({
        ctx: {
            ...ctx,
            session: ctx.session,
        }
    })
});

export type TRPCContext = inferAsyncReturnType<typeof createTRPCContext>;