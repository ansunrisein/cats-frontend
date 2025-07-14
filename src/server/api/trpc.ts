import { initTRPC } from "@trpc/server";

export async function createTRPCContext() {
  return {};
}

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
