import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

export type ServerSideTRPC = Awaited<ReturnType<typeof createServerSideTRPC>>;

export const createServerSideTRPC = async () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: await createTRPCContext(),
  });
