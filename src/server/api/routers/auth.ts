import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { createSession, getCurrentSession } from "@/server/services/session";

const USERNAME = "admin";
const PASSWORD = "admin";

export const authRouter = router({
  me: publicProcedure.query(async () => {
    const session = await getCurrentSession();

    if (!session) {
      return null;
    }

    return {
      username: session.username,
    };
  }),

  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const isValid =
        input.username === USERNAME && input.password === PASSWORD;

      if (!isValid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid credentials",
        });
      }

      await createSession({
        username: input.username,
      });

      return { success: true };
    }),
});
