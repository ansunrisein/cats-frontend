import { z } from "zod";
import { unstable_cache } from "next/cache";
import { publicProcedure, router } from "../trpc";
import { Cat } from "../../models/cat";
import { getCat, getCats } from "../../services/cat";

const inputSchema = z.object({
  limit: z.number(),
  breed: z.string().nullable(),
});

export type CatsApiParams = z.infer<typeof inputSchema>;

export const catsRouter = router({
  list: publicProcedure
    .input(inputSchema)
    .query(({ input }) => getCatsCached(input)),
  cat: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(
      unstable_cache(async ({ input }): Promise<Cat> => getCat(input.id), [], {
        revalidate: 10,
      }),
    ),
});

const getCatsCached = unstable_cache(getCats, undefined, { revalidate: 10 });
